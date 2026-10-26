import type { ReactNode } from "react";
export function TextMask({ children }: { children: ReactNode }) {
  return (
    <span className="motion-mask">
      <span className="motion-line">{children}</span>
    </span>
  );
}
