// Self-hosted upstream technology marks; generic concepts use our own neutral symbols.
const marks: Record<string, string[]> = {
  Flutter: ["flutter"],
  Dart: ["dart"],
  Riverpod: ["riverpod"],
  Hive: ["hive"],
  React: ["react"],
  "Next.js": ["nextjs"],
  TypeScript: ["typescript"],
  "Tailwind CSS": ["tailwindcss"],
  "HTML5/CSS3": ["html5", "css3"],
  "Node.js": ["nodejs"],
  Supabase: ["supabase"],
  PostgreSQL: ["postgresql"],
  Firebase: ["firebase"],
  TensorFlow: ["tensorflow"],
  TFLite: ["tensorflow"],
  Python: ["python"],
  OpenCV: ["opencv"],
  "scikit-learn": ["scikitlearn"],
  Git: ["git"],
  "GitHub Actions": ["githubactions"],
  Docker: ["docker"],
  Postman: ["postman"],
  "VS Code": ["vscode"],
  "Linux CLI": ["linux"],
  "REST / GraphQL": ["graphql"],
};
export function TechMark({ name }: { name: string }) {
  const files = marks[name];
  return (
    <span
      className={`tech-mark${files?.length === 2 ? " tech-mark-pair" : ""}`}
      aria-hidden="true"
    >
      {files ? (
        files.map((file) => (
          <img
            key={file}
            src={`/tech/${file}.svg`}
            width={24}
            height={24}
            alt=""
            loading="lazy"
            decoding="async"
          />
        ))
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          focusable="false"
        >
          {name === "Drift" ? (
            <>
              <ellipse cx="12" cy="5" rx="8" ry="3" />
              <path d="M4 5v7c0 4 16 4 16 0V5M4 12v7c0 4 16 4 16 0v-7" />
            </>
          ) : name === "Offline-First" ? (
            <>
              <path d="M6 15a5 5 0 0 1-1-10 7 7 0 0 1 13 2 4 4 0 0 1 0 8M12 11v10m-4-4 4 4 4-4" />
            </>
          ) : name === "Performance Profiling" ? (
            <>
              <path d="M4 18a10 10 0 1 1 16 0M12 12l5-5M5 13H3m18 0h-2M12 4V2" />
              <circle cx="12" cy="13" r="2" />
            </>
          ) : name === "Design Systems" ? (
            <>
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <circle cx="17.5" cy="17.5" r="3.5" />
            </>
          ) : name === "Clean Architecture" ? (
            <>
              <path d="m12 2 10 5-10 5L2 7l10-5Zm-10 10 10 5 10-5M2 17l10 5 10-5" />
            </>
          ) : (
            <>
              <rect x="2" y="8" width="6" height="8" rx="1" />
              <rect x="16" y="8" width="6" height="8" rx="1" />
              <path d="M8 10h8m-3-3 3 3-3 3M16 14H8m3-3-3 3 3 3" />
            </>
          )}
        </svg>
      )}
    </span>
  );
}
