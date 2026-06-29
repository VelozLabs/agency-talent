import { useState } from "react";
import { Home } from "@/pages/Home";
import { Trends } from "@/pages/Trends";
import { Upload } from "@/pages/Upload";

type View = "home" | "trends" | "upload";

const TABS: { id: View; label: string }[] = [
  { id: "home", label: "Timeline" },
  { id: "trends", label: "Is it working" },
  { id: "upload", label: "Log session" },
];

export default function App() {
  const [view, setView] = useState<View>("home");

  return (
    <div className="min-h-full">
      <header className="border-b border-line">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-6">
          <span className="text-ink text-sm font-bold tracking-widest">TRAINING</span>
          <nav className="flex gap-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setView(t.id)}
                className={[
                  "px-3 py-1 text-xs uppercase tracking-wider rounded",
                  view === t.id ? "bg-panel-2 text-ink" : "text-muted hover:text-ink",
                ].join(" ")}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {view === "home" && <Home />}
        {view === "trends" && <Trends />}
        {view === "upload" && <Upload />}
      </main>
    </div>
  );
}
