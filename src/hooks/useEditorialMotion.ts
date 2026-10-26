import { useEffect, useRef } from "react";
import { canAnimate, createMotionScope } from "../motion/animate";

import { createEditorialReveals } from "../motion/editorial";

export function useEditorialMotion() {
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const scope = createMotionScope();
    const reveals = createEditorialReveals(scope);
    let frame = 0;
    const stop = () => {
      scope.cancel();
      reveals.finish();
      cancelAnimationFrame(frame);
      frame = 0;
      // The whole page uses finite CSS/WAAPI effects. Cancelling restores static styles.
      document.getAnimations().forEach((animation) => animation.cancel());
    };
    const notify = () =>
      window.dispatchEvent(new Event("portfolio:motionchange"));
    const preference = () => {
      root.dataset.motion = reduced.matches ? "reduced" : "full";
      if (reduced.matches) stop();
      notify();
    };
    const keyboard = (event: KeyboardEvent) => {
      if (
        ![
          "Tab",
          "Enter",
          "Escape",
          " ",
          "ArrowLeft",
          "ArrowRight",
          "ArrowDown",
          "ArrowUp",
        ].includes(event.key)
      )
        return;
      root.dataset.input = "keyboard";
      stop();
      notify();
    };
    const pointer = () => {
      if (root.dataset.input === "pointer") return;
      root.dataset.input = "pointer";
      notify();
    };
    const visibility = () => {
      if (document.hidden) stop();
      notify();
    };
    const update = () => {
      frame = 0;
      root.dataset.scrolled = scrollY > 24 ? "true" : "false";
      reveals.draw(scrollY);
      if (!canAnimate()) return;
      const max = root.scrollHeight - innerHeight;
      if (progress.current)
        progress.current.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`;
    };
    const request = () => {
      if (!frame && canAnimate()) frame = requestAnimationFrame(update);
    };
    preference();
    update();
    addEventListener("scroll", request, { passive: true });
    addEventListener("resize", request);
    addEventListener("keydown", keyboard, { capture: true });
    addEventListener("pointerdown", pointer, { passive: true, capture: true });
    addEventListener("pointermove", pointer, { passive: true });
    reduced.addEventListener("change", preference);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      reveals.destroy();
      scope.cancel();
      reveals.finish();
      cancelAnimationFrame(frame);
      removeEventListener("scroll", request);
      removeEventListener("resize", request);
      removeEventListener("keydown", keyboard, { capture: true });
      removeEventListener("pointerdown", pointer, { capture: true });
      removeEventListener("pointermove", pointer);
      reduced.removeEventListener("change", preference);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);
  return progress;
}
