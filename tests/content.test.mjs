import { test } from "node:test";
import assert from "node:assert/strict";
import { validateProjects } from "../src/content/validation.ts";
const valid = () => ({
  id: "peso-flow",
  slug: "peso-flow",
  title: "PesoFlow",
  description: "Local finance app",
  links: { source: "https://github.com/Toki001/PesoFlow" },
  media: [],
});
test("allows projects without invented optional links or media", () =>
  assert.doesNotThrow(() => validateProjects([valid()])));
test("rejects duplicate and unstable slugs", () => {
  assert.throws(() => validateProjects([valid(), valid()]), /Duplicate/);
  assert.throws(
    () => validateProjects([{ ...valid(), slug: "Peso Flow" }]),
    /slug/,
  );
});
test("rejects unsafe external links", () =>
  assert.throws(
    () =>
      validateProjects([
        { ...valid(), links: { live: "javascript:alert(1)" } },
      ]),
    /Unsafe/,
  ));
test("requires useful media descriptions and dimensions", () =>
  assert.throws(
    () =>
      validateProjects([
        {
          ...valid(),
          media: [{ src: "/a.webp", alt: "", width: 0, height: 20 }],
        },
      ]),
    /media/,
  ));
