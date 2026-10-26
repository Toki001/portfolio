import { useEffect, useRef } from "react";
import { canUsePointerMotion } from "../motion/animate";
export function useHeroHandoff() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const hero = ref.current,
      portrait = hero?.querySelector<HTMLElement>("[data-hero-depth]");
    if (!hero || !portrait) return;
    let frame = 0,
      height = hero.offsetHeight;
    const draw = () => {
      frame = 0;
      if (!canUsePointerMotion() || innerWidth < 1100 || innerHeight < 650) {
        portrait.style.transform = "";
        return;
      }
      if (scrollY > height) {
        if (portrait.style.transform) portrait.style.transform = "";
        return;
      }
      const progress = Math.min(1, Math.max(0, scrollY / height));
      portrait.style.transform =
        progress > 0
          ? `translate3d(0,${-progress * 24}px,0) scale(${1 - progress * 0.025})`
          : "";
    };
    const request = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const measure = () => {
      height = hero.offsetHeight;
      request();
    };
    const complete = () => {
      hero.dataset.introComplete = "true";
    };
    const end = (event: AnimationEvent) => {
      if (
        event.target ===
        hero.querySelector(".hero-title > .motion-mask:last-child .motion-line")
      )
        complete();
    };
    const mode = () => {
      if (
        document.documentElement.dataset.motion === "reduced" ||
        document.documentElement.dataset.input === "keyboard" ||
        document.hidden
      )
        complete();
      draw();
    };
    hero.addEventListener("animationend", end);
    const resize = new ResizeObserver(measure);
    resize.observe(hero);
    addEventListener("scroll", request, { passive: true });
    addEventListener("resize", measure);
    addEventListener("portfolio:motionchange", mode);
    draw();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      portrait.style.transform = "";
      removeEventListener("scroll", request);
      removeEventListener("resize", measure);
      removeEventListener("portfolio:motionchange", mode);
      hero.removeEventListener("animationend", end);
    };
  }, []);
  return ref;
}
