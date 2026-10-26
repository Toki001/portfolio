import { useEffect, useLayoutEffect, useRef } from "react";
import { canAnimate, createMotionScope, motion } from "../motion/animate";
export function useProjectReflow(key: string) {
  const ref = useRef<HTMLDivElement>(null),
    before = useRef<Map<Element, DOMRect> | null>(null);
  const scope = useRef(createMotionScope());
  useEffect(() => () => scope.current.cancel(), []);
  const capture = (pointer: boolean) => {
    before.current =
      pointer && canAnimate()
        ? new Map(
            Array.from(ref.current?.children ?? []).map((el) => [
              el,
              el.getBoundingClientRect(),
            ]),
          )
        : null;
  };
  useLayoutEffect(() => {
    const old = before.current;
    before.current = null;
    scope.current.cancel();
    if (!old || !ref.current || !canAnimate()) return;
    for (const element of ref.current.children) {
      const previous = old.get(element),
        next = element.getBoundingClientRect();
      const from = previous
        ? `translate3d(${previous.left - next.left}px,${previous.top - next.top}px,0) scale(${previous.width / next.width},${previous.height / next.height})`
        : "translate3d(0,24px,0) scale(.98)";
      scope.current.play(
        element,
        [
          { transform: from, opacity: previous ? 1 : 0.4 },
          { transform: "translate3d(0,0,0) scale(1)", opacity: 1 },
        ],
        { duration: motion.reflow },
      );
    }
  }, [key]);
  return { ref, capture };
}
