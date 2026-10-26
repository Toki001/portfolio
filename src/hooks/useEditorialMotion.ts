import { useEffect, useRef } from "react";
import { canAnimate, createMotionScope } from "../motion/animate";

export function useEditorialMotion() {
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = document.documentElement;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const scope = createMotionScope();
    let frame = 0;
    const stop = () => {
      scope.cancel();
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
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          scope.play(entry.target, [
            { transform: "translateY(18px)", opacity: 0 },
            { transform: "translateY(0)", opacity: 1 },
          ]);
        }
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((el) => observer.observe(el));
    const update = () => {
      frame = 0;
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
      observer.disconnect();
      scope.cancel();
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
