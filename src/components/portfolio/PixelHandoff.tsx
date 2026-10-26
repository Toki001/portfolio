export function PixelHandoff() {
  return (
    <div className="pixel-handoff" data-reveal="pixels" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <i key={i} />
      ))}
    </div>
  );
}
