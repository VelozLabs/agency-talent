import type { Config } from "tailwindcss";

// Dark, data-dense terminal aesthetic. The UI Designer talent may refine these
// tokens via design/CONCEPT.md — treat this as the implementation baseline.
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0e14",
        panel: "#11151f",
        "panel-2": "#161b27",
        line: "#222a39",
        ink: "#e6edf3",
        muted: "#8b97a8",
        faint: "#5a6677",
        actual: "#4ade80", // solid past sessions
        planned: "#3b4763", // ghosted future sessions
        accent: "#5eb1ff",
        warn: "#f0b429",
        danger: "#f06a6a",
      },
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
