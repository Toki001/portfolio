// Real text stays in DOM order. Responsive rows are measured only after hydration.
export function ScrollText({
  children,
  variant = "headline",
  accentEnd = false,
}: {
  children: string;
  variant?: "headline" | "body";
  accentEnd?: boolean;
}) {
  const tokens = children.split(/(\s+)/);
  return (
    <span className={`scroll-copy scroll-copy-${variant}`} data-reveal="lines">
      {tokens.map((word, i) =>
        /^\s+$/.test(word) ? (
          word
        ) : (
          <span className="reveal-word" key={i}>
            <span className="reveal-word-inner">
              {accentEnd && i === tokens.length - 1 && word.endsWith(".") ? (
                <>
                  {word.slice(0, -1)}
                  <span className="heading-period">.</span>
                </>
              ) : (
                word
              )}
            </span>
          </span>
        ),
      )}
    </span>
  );
}
export function SectionLabel({ children }: { children: string }) {
  return (
    <p className="editorial-label" data-reveal="label">
      <span className="editorial-rule" aria-hidden="true" />
      <span className="editorial-label-text">{children}</span>
    </p>
  );
}
