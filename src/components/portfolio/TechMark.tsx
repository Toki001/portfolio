// Self-hosted technology marks; Drift uses a neutral database symbol.
const marks: Record<string, string> = {
  Flutter: "flutter",
  Dart: "dart",
  Riverpod: "riverpod",
  SQLite: "sqlite",
  React: "react",
  "Next.js": "nextjs",
  TypeScript: "typescript",
  "Tailwind CSS": "tailwindcss",
  Vite: "vite",
  Python: "python",
  FastAPI: "fastapi",
  "Node.js": "nodejs",
  NestJS: "nestjs",
  GraphQL: "graphql",
  PyTorch: "pytorch",
  TensorFlow: "tensorflow",
  OpenCV: "opencv",
  "ONNX Runtime": "onnx",
  "scikit-learn": "scikitlearn",
  PostgreSQL: "postgresql",
  MySQL: "mysql",
  "Drizzle ORM": "drizzle",
  SQLAlchemy: "sqlalchemy",
  Redis: "redis",
  Git: "git",
  "GitHub Actions": "githubactions",
  Docker: "docker",
  Playwright: "playwright",
  Vitest: "vitest",
  pytest: "pytest",
};
export function TechMark({ name }: { name: string }) {
  const file = marks[name];
  return (
    <span className="tech-mark" aria-hidden="true">
      {file ? (
        <img
          src={`/tech/${file}.svg`}
          width={24}
          height={24}
          alt=""
          loading="lazy"
          decoding="async"
        />
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
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v7c0 4 16 4 16 0V5M4 12v7c0 4 16 4 16 0v-7" />
        </svg>
      )}
    </span>
  );
}
