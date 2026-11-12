export function createPost(posts, draft, id, createdAt = new Date().toISOString()) {
  const title = String(draft.title ?? "").trim();
  const content = String(draft.content ?? "").trim();

  if (!title) {
    throw new Error("A title is required.");
  }
  if (!content) {
    throw new Error("Post content is required.");
  }
  if (!id) {
    throw new Error("A post ID is required.");
  }

  return [...posts, { id, title, content, createdAt }];
}

export function updatePost(posts, id, draft) {
  const title = String(draft.title ?? "").trim();
  const content = String(draft.content ?? "").trim();

  if (!title) {
    throw new Error("A title is required.");
  }
  if (!content) {
    throw new Error("Post content is required.");
  }

  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) {
    throw new Error("Post not found.");
  }

  return posts.map((post) =>
    post.id === id ? { ...post, title, content } : post,
  );
}

export function deletePost(posts, id) {
  return posts.filter((post) => post.id !== id);
}
