import { useEffect, useRef, useState } from "react";
import { canAnimate } from "../motion/animate";
export function useProjectScene() {
  const ref = useRef<HTMLDivElement>(null),
    selectRef = useRef<(index: number, instant: boolean) => void>(() => {});
  const [active, setActive] = useState(0),
    [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const deck = ref.current;
    if (!deck) return;
    const cards = Array.from(
      deck.querySelectorAll<HTMLElement>(".featured-card"),
    );
    const markers = Array.from(
      deck.querySelectorAll<HTMLElement>(".scene-marker"),
    );
    const query = matchMedia(
      "(min-width:1100px) and (min-height:720px) and (hover:hover) and (pointer:fine)",
    );
    let heights: number[] = [],
      sceneTop = 160;
    let positions: number[] = [],
      frame = 0,
      current = 0,
      on = false,
      disposed = false;
    const reset = () => cards.forEach((card) => (card.style.transform = ""));
    const draw = () => {
      frame = 0;
      if (!on || !positions.length || document.hidden) {
        reset();
        return;
      }
      const cursor = scrollY + sceneTop + 20;
      const next = Math.max(
        0,
        positions.findLastIndex((position) => position <= cursor),
      );
      if (next !== current) {
        current = next;
        setActive(next);
      }
      if (!canAnimate()) {
        reset();
        return;
      }
      if (
        scrollY + innerHeight < positions[0] ||
        scrollY > positions.at(-1)! + innerHeight
      )
        return;
      cards.forEach((card, index) => {
        const range =
          (positions[index + 1] ?? positions[index] + heights[index]) -
          positions[index];
        const passed = Math.min(
          1,
          Math.max(0, (cursor - positions[index]) / range),
        );
        const arriving = Math.min(
          1,
          Math.max(0, (positions[index] - cursor) / (innerHeight * 0.9)),
        );
        card.style.transform = `perspective(1400px) translate3d(0,${-passed * 16}px,${-arriving * 40}px) rotateX(${-passed * 4}deg) rotateY(${arriving * 4}deg) scale(${1 - passed * 0.05 - arriving * 0.02})`;
      });
    };
    const request = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const measure = () => {
      if (disposed) return;
      on = query.matches && document.documentElement.dataset.motion === "full";
      setEnabled(on);
      sceneTop = parseFloat(getComputedStyle(cards[0]).top) || 160;
      heights = cards.map((card) => card.offsetHeight);
      positions = markers.map(
        (marker) => marker.getBoundingClientRect().top + scrollY,
      );
      request();
    };
    const select = (index: number, instant: boolean) => {
      if (!on || !positions[index]) return;
      window.scrollTo({
        top: positions[index] - sceneTop,
        behavior: instant || !canAnimate() ? "instant" : "smooth",
      });
    };
    selectRef.current = select;
    const focus = (event: FocusEvent) => {
      const card =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(".featured-card")
          : null;
      if (card && cards.includes(card)) select(cards.indexOf(card), true);
    };
    const resize = new ResizeObserver(measure);
    resize.observe(deck);
    measure();
    document.fonts.ready.then(measure);
    addEventListener("scroll", request, { passive: true });
    addEventListener("resize", measure);
    addEventListener("portfolio:motionchange", measure);
    query.addEventListener("change", measure);
    deck.addEventListener("focusin", focus);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      reset();
      resize.disconnect();
      selectRef.current = () => {};
      removeEventListener("scroll", request);
      removeEventListener("resize", measure);
      removeEventListener("portfolio:motionchange", measure);
      query.removeEventListener("change", measure);
      deck.removeEventListener("focusin", focus);
    };
  }, []);
  return {
    ref,
    active,
    enabled,
    select: (index: number, instant = false) =>
      selectRef.current(index, instant),
  };
}
