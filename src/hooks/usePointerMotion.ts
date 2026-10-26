import { useEffect } from "react";
import { canUsePointerMotion } from "../motion/animate";

// One delegated, critically damped pointer follower. No React updates or idle loop.
export function usePointerMotion() {
  useEffect(() => {
    let active: HTMLElement | null = null,
      layer: HTMLElement | null = null,
      light: HTMLElement | null = null;
    let rect: DOMRect | null = null,
      frame = 0,
      last = 0,
      x = 0,
      y = 0,
      vx = 0,
      vy = 0,
      tx = 0,
      ty = 0,
      leaving = false;
    const clear = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
      if (layer) layer.style.transform = "";
      if (light) {
        light.style.transform = "";
        light.style.opacity = "";
      }
      if (active) delete active.dataset.pointerActive;
      active = layer = light = null;
      rect = null;
      x = y = vx = vy = tx = ty = 0;
    };
    const draw = (time: number) => {
      frame = 0;
      if (!active || !layer || !rect || !canUsePointerMotion()) {
        clear();
        return;
      }
      const dt = last ? Math.min((time - last) / 1000, 0.04) : 1 / 60;
      last = time;
      // Exact critical-damping step; velocity survives retargeting and reversal.
      const omega = 24,
        decay = Math.exp(-omega * dt);
      const dx = x - tx,
        dy = y - ty,
        cx = (vx + omega * dx) * dt,
        cy = (vy + omega * dy) * dt;
      x = tx + (dx + cx) * decay;
      y = ty + (dy + cy) * decay;
      vx = (vx - omega * cx) * decay;
      vy = (vy - omega * cy) * decay;
      const kind = active.dataset.pointerSurface;
      layer.style.transform =
        kind === "magnetic"
          ? `translate3d(${x * 6}px,${y * 6}px,0)`
          : `perspective(1000px) rotateX(${-y * 3}deg) rotateY(${x * 4}deg) translate3d(${x * 3}px,${y * 3}px,0)`;
      if (light) {
        light.style.transform = `translate3d(${((x + 1) * rect.width) / 2 - 100}px,${((y + 1) * rect.height) / 2 - 100}px,0)`;
        light.style.opacity = leaving ? "0" : "1";
      }
      if (
        Math.abs(x - tx) + Math.abs(y - ty) + Math.abs(vx) + Math.abs(vy) >
        0.004
      )
        frame = requestAnimationFrame(draw);
      else if (leaving) clear();
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !canUsePointerMotion()) {
        clear();
        return;
      }
      const surface =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>("[data-pointer-surface]")
          : null;
      if (!surface) {
        if (active) {
          leaving = true;
          tx = ty = 0;
          request();
        }
        return;
      }
      if (active !== surface) {
        clear();
        active = surface;
        layer = surface.querySelector<HTMLElement>("[data-pointer-layer]");
        light = surface.querySelector<HTMLElement>("[data-pointer-light]");
        rect = surface.getBoundingClientRect();
        layer?.getAnimations().forEach((animation) => animation.cancel());
        surface.dataset.pointerActive = "true";
      }
      if (!rect) return;
      tx = Math.max(
        -1,
        Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1),
      );
      ty = Math.max(
        -1,
        Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1),
      );
      leaving = false;
      request();
    };
    const leave = () => {
      if (active) {
        leaving = true;
        tx = ty = 0;
        request();
      }
    };
    const mode = () => {
      if (!canUsePointerMotion()) clear();
    };
    addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    addEventListener("scroll", clear, { passive: true });
    addEventListener("resize", clear);
    addEventListener("portfolio:motionchange", mode);
    document.addEventListener("focusin", clear);
    return () => {
      clear();
      removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
      removeEventListener("scroll", clear);
      removeEventListener("resize", clear);
      removeEventListener("portfolio:motionchange", mode);
      document.removeEventListener("focusin", clear);
    };
  }, []);
}
