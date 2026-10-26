// Original editorial symbols, not third-party product logos or pretend controls.
export function ToolGlyph({ kind }: { kind: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" focusable="false">
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {kind === "editor" ? (
          <>
            <path d="m40 32-24 28 24 28m40-56 24 28-24 28M68 22 52 98" />
            <circle cx="60" cy="60" r="8" className="glyph-accent" />
          </>
        ) : kind === "vcs" ? (
          <>
            <path d="M34 28v64m0-32c0-22 52-4 52-34" />
            <circle cx="34" cy="24" r="9" />
            <circle cx="34" cy="96" r="9" />
            <circle cx="86" cy="24" r="9" className="glyph-accent" />
          </>
        ) : kind === "design" ? (
          <>
            <rect x="18" y="18" width="48" height="48" rx="3" />
            <circle cx="77" cy="77" r="26" />
            <path d="m76 18 26 26M91 18h11v11" />
            <circle cx="66" cy="66" r="6" className="glyph-accent" />
          </>
        ) : kind === "db" ? (
          <>
            <ellipse cx="60" cy="28" rx="36" ry="13" />
            <path d="M24 28v31c0 18 72 18 72 0V28M24 59v31c0 18 72 18 72 0V59" />
            <circle cx="85" cy="90" r="8" className="glyph-accent" />
          </>
        ) : kind === "ai" ? (
          <>
            <path d="M60 16v88M16 60h88M29 29l62 62m0-62L29 91" />
            <path
              d="m60 35 8 17 17 8-17 8-8 17-8-17-17-8 17-8z"
              className="glyph-accent"
            />
          </>
        ) : (
          <>
            <rect x="14" y="40" width="30" height="40" rx="7" />
            <rect x="76" y="40" width="30" height="40" rx="7" />
            <path d="M44 52h32m-9-9 9 9-9 9M76 68H44m9-9-9 9 9 9" />
            <circle cx="91" cy="60" r="5" className="glyph-accent" />
          </>
        )}
      </g>
    </svg>
  );
}
