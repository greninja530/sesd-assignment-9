import { createPost, deletePost, updatePost } from "./post-store.js";
import { escapeHtml, renderMarkdown } from "./markdown.js";
import { initialPosts } from "./posts.js";

let posts = [...initialPosts];
let editingId = null;

const postList = document.querySelector("#post-list");
const postCount = document.querySelector("#post-count");
const form = document.querySelector("#post-form");
const titleInput = document.querySelector("#post-title");
const contentInput = document.querySelector("#post-content");
const formMessage = document.querySelector("#form-message");
const submitButton = document.querySelector("#submit-post");
const cancelButton = document.querySelector("#cancel-edit");

function renderPosts() {
  const sortedPosts = [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  postCount.textContent = `${String(posts.length).padStart(2, "0")} ${posts.length === 1 ? "NOTE" : "NOTES"}`;

  if (sortedPosts.length === 0) {
    postList.innerHTML = '<p class="empty-state">No notes yet. Leave the first one below.</p>';
    return;
  }

  postList.innerHTML = sortedPosts.map((post) => {
    const date = new Date(post.createdAt);
    const dateLabel = date.toLocaleDateString(undefined, { month: "long", day: "2-digit", year: "numeric" });
    const safeTitle = escapeHtml(post.title);
    const safeDate = escapeHtml(dateLabel);
    const safeId = escapeHtml(post.id);

    return `<article class="post-card" data-post-id="${safeId}">
      <div class="post-meta"><time datetime="${escapeHtml(date.toISOString())}">${safeDate}</time><span class="post-dot" aria-hidden="true"></span><span>JOURNAL</span></div>
      <h3>${safeTitle}</h3>
      <div class="post-content">${renderMarkdown(post.content)}</div>
      <div class="post-actions">
        <button class="text-button" type="button" data-action="edit">EDIT</button>
        <button class="text-button" type="button" data-action="delete">DELETE</button>
      </div>
    </article>`;
  }).join("");
}

function resetForm() {
  form.reset();
  editingId = null;
  submitButton.innerHTML = 'Add note <span aria-hidden="true">↗</span>';
  cancelButton.hidden = true;
  formMessage.textContent = "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const draft = { title: titleInput.value, content: contentInput.value };

  try {
    const successMessage = editingId ? "Your note has been updated." : "Your note has been added.";
    if (editingId) {
      posts = updatePost(posts, editingId, draft);
    } else {
      posts = createPost(posts, draft, globalThis.crypto.randomUUID());
    }
    resetForm();
    formMessage.textContent = successMessage;
    renderPosts();
  } catch (error) {
    formMessage.textContent = error.message;
  }
});

postList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const card = button.closest("[data-post-id]");
  const id = card.dataset.postId;

  if (button.dataset.action === "delete") {
    const post = posts.find((item) => item.id === id);
    if (post && window.confirm(`Delete "${post.title}"?`)) {
      posts = deletePost(posts, id);
      if (editingId === id) {
        resetForm();
      }
      renderPosts();
    }
  } else if (button.dataset.action === "edit") {
    const post = posts.find((item) => item.id === id);
    if (post) {
      editingId = id;
      titleInput.value = post.title;
      contentInput.value = post.content;
      submitButton.innerHTML = 'Save changes <span aria-hidden="true">↗</span>';
      cancelButton.hidden = false;
      formMessage.textContent = "Editing this note.";
      titleInput.focus();
      document.querySelector("#editor-title").scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
});

cancelButton.addEventListener("click", resetForm);

renderPosts();
