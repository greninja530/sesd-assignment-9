import test from "node:test";
import assert from "node:assert/strict";
import { renderMarkdown } from "../src/markdown.js";

test("renders basic Markdown blocks and inline formatting", () => {
  assert.equal(
    renderMarkdown("# Heading\n\nA **bold** note with `code`.\n\n- one\n- two"),
    "<h4>Heading</h4><p>A <strong>bold</strong> note with <code>code</code>.</p><ul><li>one</li><li>two</li></ul>",
  );
});

test("escapes raw HTML rather than interpreting it", () => {
  assert.equal(renderMarkdown('<img src=x onerror="alert(1)">'), "<p>&lt;img src=x onerror=&quot;alert(1)&quot;&gt;</p>");
});
