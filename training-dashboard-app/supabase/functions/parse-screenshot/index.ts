// parse-screenshot — Ladder summary/week-ahead screenshot → structured lift JSON.
//
// AI Engineer's guidance, baked in:
//   * Default model is claude-haiku-4-5 (this is a near-trivial extraction on a regular
//     layout); PARSER_MODEL is the escape hatch up to sonnet/opus if the review UI shows misreads.
//   * Structured outputs (output_config.format json_schema) enforce shape. The human review
//     step IS the accuracy guarantee — no confidence scoring / retry / auto-correction here.
//   * One disposable Edge Function with an inline prompt. Throwaway scaffolding.
//
// Returns: { exercises: [{ exercise, sets: [{ reps, load, rpe }] }] }

import Anthropic from "npm:@anthropic-ai/sdk@^0.65";

const MODEL = Deno.env.get("PARSER_MODEL") ?? "claude-haiku-4-5";

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    exercises: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          exercise: { type: "string" },
          sets: {
            type: "array",
            items: {
              type: "object",
              additionalProperties: false,
              properties: {
                reps: { type: ["integer", "null"] },
                load: { type: ["number", "null"] },
                rpe: { type: ["number", "null"] },
              },
              required: ["reps", "load", "rpe"],
            },
          },
        },
        required: ["exercise", "sets"],
      },
    },
  },
  required: ["exercises"],
};

const PROMPT =
  "This is a screenshot of a Ladder strength-training session summary. Extract every " +
  "exercise and each logged set. For each set give reps, load (the weight number as shown), " +
  "and RPE if present (null if not). Do not invent sets that aren't visible.";

Deno.serve(async (req) => {
  if (req.method !== "POST") return new Response("method not allowed", { status: 405 });

  const key = Deno.env.get("ANTHROPIC_API_KEY");
  if (!key) return json({ error: "ANTHROPIC_API_KEY not set" }, 500);

  let body: { image_base64?: string; media_type?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid JSON body" }, 400);
  }
  if (!body.image_base64) return json({ error: "image_base64 required" }, 400);

  const client = new Anthropic({ apiKey: key });
  const resp = await client.messages.create({
    model: MODEL,
    max_tokens: 2048,
    output_config: { format: { type: "json_schema", schema: SCHEMA } },
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image",
            source: {
              type: "base64",
              media_type: (body.media_type as "image/png") ?? "image/png",
              data: body.image_base64,
            },
          },
          { type: "text", text: PROMPT },
        ],
      },
    ],
  });

  const text = resp.content.find((b) => b.type === "text");
  if (!text || text.type !== "text") return json({ error: "no text block returned" }, 502);

  // output_config.format guarantees the text block is schema-valid JSON.
  return json(JSON.parse(text.text), 200);
});

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}
