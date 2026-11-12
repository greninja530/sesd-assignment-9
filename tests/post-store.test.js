import test from "node:test";
import assert from "node:assert/strict";
import { createPost, deletePost, updatePost } from "../src/post-store.js";

const post = { id: "one", title: "First note", content: "A thought.", createdAt: "2025-01-01T00:00:00.000Z" };

test("creates a trimmed post without mutating the existing array", () => {
  const posts = [post];
  const result = createPost(posts, { title: "  Second note ", content: " A short story. " }, "two", "2025-02-01T00:00:00.000Z");

  assert.deepEqual(result, [
    post,
    { id: "two", title: "Second note", content: "A short story.", createdAt: "2025-02-01T00:00:00.000Z" },
  ]);
  assert.equal(posts.length, 1);
});

test("rejects a post with a blank title", () => {
  assert.throws(() => createPost([], { title: "  ", content: "Some words" }, "one"), /title is required/i);
});

test("rejects a post with blank Markdown content", () => {
  assert.throws(() => createPost([], { title: "A title", content: " \n " }, "one"), /content is required/i);
});

test("deletes only the selected post without mutating the original array", () => {
  const posts = [post, { ...post, id: "two", title: "Second note" }];
  const result = deletePost(posts, "one");

  assert.deepEqual(result, [{ ...post, id: "two", title: "Second note" }]);
  assert.equal(posts.length, 2);
});

test("leaves the array unchanged when the deleted ID does not exist", () => {
  const posts = [post];

  assert.deepEqual(deletePost(posts, "missing"), posts);
});

test("updates a post while preserving its ID and creation date", () => {
  const result = updatePost([post], "one", { title: "  Updated ", content: " New **Markdown**. " });

  assert.deepEqual(result, [{ ...post, title: "Updated", content: "New **Markdown**." }]);
});

test("rejects updates for a missing post", () => {
  assert.throws(() => updatePost([], "missing", { title: "Title", content: "Content" }), /not found/i);
});
