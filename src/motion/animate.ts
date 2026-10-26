// One motion vocabulary; static DOM styles are always the final, readable state.
export const motion = {
  micro: 160,
  ui: 220,
  reflow: 280,
  reveal: 650,
  hero: 780,
  stagger: 60,
  out: "cubic-bezier(0.23,1,0.32,1)",
  scene: "cubic-bezier(0.77,0,0.175,1)",
  drawer: "cubic-bezier(0.32,0.72,0,1)",
} as const;
export function canAnimate() {
  return (
    typeof document !== "undefined" &&
    document.documentElement.dataset.motion === "full" &&
    document.documentElement.dataset.input !== "keyboard" &&
    !document.hidden
  );
}
export function canUsePointerMotion() {
  return (
    canAnimate() && matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}
export function createMotionScope() {
  const running = new Set<Animation>();
  const owners = new WeakMap<Element, Animation>();
  return {
    play(
      element: Element,
      frames: Keyframe[],
      options: KeyframeAnimationOptions = {},
    ) {
      if (!canAnimate()) return;
      owners.get(element)?.cancel();
      const animation = element.animate(frames, {
        duration: motion.reveal,
        easing: motion.out,
        ...options,
      });
      animation.id = "portfolio-motion";
      owners.set(element, animation);
      running.add(animation);
      animation.finished.then(
        () => running.delete(animation),
        () => running.delete(animation),
      );
      return animation;
    },
    cancel() {
      for (const animation of running) animation.cancel();
      running.clear();
    },
  };
}
