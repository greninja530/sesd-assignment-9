# Fieldnotes — Mini Blog

A small, responsive blog/CMS demo. The initial entries are hardcoded sample data; new notes and edits use an in-memory JavaScript array and are intentionally cleared on refresh. Note content supports a safe subset of Markdown: headings, emphasis, inline code, blockquotes, and ordered or unordered lists. Raw HTML is escaped.

## Run locally

Use Node.js 20 or later:

```powershell
npm test
```

Because this is a browser ES-module app, serve the folder over HTTP rather than opening `index.html` directly. For example, with Python installed:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Versions and branches

- `version-1` — hardcoded sample posts and the static layout.
- `version-2` — dynamic post creation, editing, deletion, and Markdown display.
- `testing` — automated tests for post operations and Markdown output.
- `main` — final version, including the testing branch.

Version control let the static baseline remain available while features were developed in a separate branch. The testing branch added checks before its work was merged into `main`, preserving the development history and making changes easier to review or revert.

## Deploy

The site is static and can be hosted on GitHub Pages. Push this repository to GitHub, enable **Settings → Pages → GitHub Actions**, and push to `main`; the included workflow publishes the site. Until it is pushed to a GitHub repository, the app is deployment-ready but has no public URL.
