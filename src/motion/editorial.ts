import { canAnimate, createMotionScope, motion } from "./animate";
type Scope = ReturnType<typeof createMotionScope>;

// One observer; real responsive text rows, finite entrances and cached handoff geometry.
export function createEditorialReveals(scope: Scope) {
  const targets = [
    ...document.querySelectorAll<HTMLElement>("[data-reveal]"),
  ].filter(
    (el) =>
      !el.parentElement?.closest(
        '[data-reveal="sequence"], [data-reveal="row"]',
      ),
  );
  const copies = [...document.querySelectorAll<HTMLElement>(".scroll-copy")];
  const done = new WeakSet<Element>();
  let alive = true,
    measureFrame = 0,
    lastY = scrollY,
    fast = false;
  const handoffs = [
    ...document.querySelectorAll<HTMLElement>("[data-handoff]"),
  ].map((el) => ({ el, top: 0, height: 0 }));
  const measure = () => {
    measureFrame = 0;
    for (const copy of copies) {
      let last = -Infinity,
        row = -1;
      // Reads precede attribute writes; line indices never affect document layout.
      const words = [...copy.querySelectorAll<HTMLElement>(".reveal-word")];
      const tops = words.map((word) => word.offsetTop);
      words.forEach((word, i) => {
        if (Math.abs(tops[i] - last) > 2) {
          row++;
          last = tops[i];
        }
        word.dataset.line = String(row);
      });
      copy.dataset.lines = String(row + 1);
    }
    for (const item of handoffs) {
      let top = 0,
        node: HTMLElement | null = item.el;
      while (node) {
        top += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      item.top = top;
      item.height = item.el.offsetHeight;
    }
  };
  const requestMeasure = () => {
    if (!measureFrame && alive) measureFrame = requestAnimationFrame(measure);
  };
  const settle = (el: HTMLElement) => {
    done.add(el);
    el.dataset.revealState = "done";
  };
  const draw = (y: number) => {
    fast = Math.abs(y - lastY) > innerHeight * 0.65;
    lastY = y;
    const enabled = canAnimate() && innerWidth >= 768 && innerHeight >= 650;
    for (const { el, top, height } of handoffs) {
      const progress =
        enabled && y + 120 > top && y < top + height
          ? Math.min(1, (y + 120 - top) / (height + 120))
          : 0;
      if (progress)
        el.style.transform = `translate3d(0,${-progress * 24}px,0) scale(${1 - progress * 0.025})`;
      else if (el.style.transform) el.style.transform = "";
    }
  };
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || !(entry.target instanceof HTMLElement))
          continue;
        const el = entry.target;
        observer.unobserve(el);
        if (done.has(el)) continue;
        settle(el);
        if (
          !canAnimate() ||
          fast ||
          entry.boundingClientRect.bottom < 120 ||
          entry.boundingClientRect.top < -innerHeight * 0.25
        )
          continue;
        const compact = innerWidth < 600;
        const text = el.matches(".scroll-copy")
          ? [el]
          : [...el.querySelectorAll<HTMLElement>(".scroll-copy")];
        const labels = el.matches(".editorial-label")
          ? [el]
          : [...el.querySelectorAll<HTMLElement>(".editorial-label")];
        for (const label of labels) {
          const rule = label.querySelector(".editorial-rule"),
            content = label.querySelector(".editorial-label-text");
          if (rule)
            scope.play(
              rule,
              [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
              { duration: 350 },
            );
          if (content)
            scope.play(
              content,
              [
                { transform: "translateX(12px)", opacity: 0.5 },
                { transform: "translateX(0)", opacity: 1 },
              ],
              { duration: 300 },
            );
        }
        if (el.dataset.reveal === "row") {
          const rule = el.querySelector(".editorial-row-rule");
          if (rule)
            scope.play(
              rule,
              [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
              { duration: compact ? 360 : 480 },
            );
          el.querySelectorAll(
            ".capability-index, .tool-index, .tool-category, [data-row-copy]",
          ).forEach((item, i) =>
            scope.play(
              item,
              [
                {
                  transform: `translate3d(${i ? 12 : 0}px,${i ? 0 : 10}px,0)`,
                  opacity: 0,
                },
                { transform: "translate3d(0,0,0)", opacity: 1 },
              ],
              {
                duration: compact ? 340 : 440,
                delay: i * 45,
                fill: "backwards",
              },
            ),
          );
        }
        el.querySelectorAll(".engineering-layer").forEach((layer, i) =>
          scope.play(
            layer,
            [
              { transform: "translate3d(-18px,10px,0)", opacity: 0 },
              { transform: "translate3d(0,0,0)", opacity: 1 },
            ],
            {
              duration: compact ? 380 : 500,
              delay: 140 + i * 65,
              fill: "backwards",
            },
          ),
        );
        const connector = el.querySelector(".engineering-connector");
        if (connector)
          scope.play(
            connector,
            [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }],
            { duration: 500, delay: 140, fill: "backwards" },
          );
        const symbol = el.querySelector(".tool-symbol");
        if (symbol)
          scope.play(
            symbol,
            [
              { transform: "rotate(-8deg) scale(.94)", opacity: 0.3 },
              { transform: "rotate(0) scale(1)", opacity: 1 },
            ],
            { duration: compact ? 340 : 440, delay: 80 },
          );
        let headlineRow = 0;
        for (const copy of text) {
          const body = copy.classList.contains("scroll-copy-body");
          for (const word of copy.querySelectorAll<HTMLElement>(
            ".reveal-word",
          )) {
            const inner = word.firstElementChild!;
            const row =
              Number(word.dataset.line ?? 0) + (body ? 0 : headlineRow);
            scope.play(
              inner,
              [
                {
                  transform: `translateY(${compact ? "105%" : "112%"}) rotateZ(${body ? 0 : 1.5}deg)`,
                },
                { transform: "translateY(0) rotateZ(0deg)" },
              ],
              {
                duration: body ? (compact ? 360 : 460) : compact ? 500 : 720,
                delay:
                  (labels.length ? 70 : 0) +
                  Math.min(row, 4) * (compact ? 55 : 75),
                fill: "backwards",
              },
            );
          }
          if (!body) headlineRow += Number(copy.dataset.lines ?? 1);
        }
        if (el.dataset.reveal === "pixels") {
          el.querySelectorAll("i").forEach((pixel, index) =>
            scope.play(
              pixel,
              [
                { transform: "translateY(105%)" },
                { transform: "translateY(0)" },
              ],
              { duration: 460, delay: ((index * 5) % 12) * 20 },
            ),
          );
        } else {
          const lines = el.querySelectorAll(".motion-line");
          if (lines.length)
            lines.forEach((line, index) =>
              scope.play(
                line,
                [
                  { transform: "translateY(110%) rotateX(12deg)" },
                  { transform: "translateY(0) rotateX(0deg)" },
                ],
                { delay: index * motion.stagger, fill: "backwards" },
              ),
            );
          else if (el.dataset.reveal === "media")
            scope.play(el, [
              { transform: "translateY(28px) scale(.97) rotateY(3deg)" },
              { transform: "translateY(0) scale(1) rotateY(0deg)" },
            ]);
          else if (!text.length && !labels.length)
            scope.play(
              el,
              [
                { transform: "translateY(14px)", opacity: 0 },
                { transform: "translateY(0)", opacity: 1 },
              ],
              { duration: 420 },
            );
        }
      }
    },
    { threshold: 0, rootMargin: "0px 0px -7% 0px" },
  );
  measure();
  for (const el of targets) {
    if (canAnimate() && el.getBoundingClientRect().top > innerHeight * 0.9)
      el.dataset.revealState = "waiting";
    observer.observe(el);
  }
  const resize = new ResizeObserver(requestMeasure);
  for (const copy of copies) resize.observe(copy);
  document.fonts.ready.then(() => {
    if (alive) requestMeasure();
  });
  addEventListener("resize", requestMeasure);
  return {
    draw,
    finish() {
      for (const el of targets) settle(el);
      for (const { el } of handoffs) el.style.transform = "";
    },
    destroy() {
      alive = false;
      observer.disconnect();
      resize.disconnect();
      cancelAnimationFrame(measureFrame);
      removeEventListener("resize", requestMeasure);
      for (const el of targets) delete el.dataset.revealState;
      for (const { el } of handoffs) el.style.transform = "";
    },
  };
}
