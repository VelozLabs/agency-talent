-- Atomic "save parsed Ladder session" — the human-in-the-loop confirm path.
-- Backend Architect's rule: re-confirming an existing session OVERWRITES its child
-- rows in ONE transaction, never appends, so the review UI can't generate duplicates.
-- security invoker → runs as the caller; user_id is auth.uid() and RLS applies.

create or replace function save_ladder_session(
  p_date      date,
  p_status    session_status,
  p_source    data_source,
  p_exercises jsonb
) returns uuid
language plpgsql
security invoker
as $$
declare
  v_uid     uuid := auth.uid();
  v_session uuid;
  v_ex      uuid;
  ex        jsonb;
  st        jsonb;
  idx       int := 0;
  setno     int;
begin
  if v_uid is null then
    raise exception 'not authenticated';
  end if;

  -- Idempotent on (user_id, date, source): re-upload updates the same session row.
  insert into training_session (user_id, date, status, source)
    values (v_uid, p_date, p_status, p_source)
  on conflict (user_id, date, source)
    do update set status = excluded.status, updated_at = now()
  returning id into v_session;

  -- Overwrite: clear existing children (cascades to set_entry), then reinsert.
  delete from exercise_entry where session_id = v_session;

  for ex in select * from jsonb_array_elements(p_exercises) loop
    insert into exercise_entry (user_id, session_id, exercise_name, order_index)
      values (v_uid, v_session, ex ->> 'exercise', idx)
    returning id into v_ex;

    setno := 0;
    for st in select * from jsonb_array_elements(ex -> 'sets') loop
      setno := setno + 1;
      insert into set_entry (user_id, exercise_entry_id, set_number, reps, load, rpe)
        values (
          v_uid, v_ex, setno,
          nullif(st ->> 'reps', '')::int,
          nullif(st ->> 'load', '')::numeric,
          nullif(st ->> 'rpe', '')::numeric
        );
    end loop;

    idx := idx + 1;
  end loop;

  return v_session;
end;
$$;
