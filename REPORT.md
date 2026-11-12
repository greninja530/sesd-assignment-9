# Mini Blog Application — Project Report

## Versions and functionality

**Version 1:** A responsive webpage showing three hardcoded sample posts.

**Version 2:** Posts are managed with a JavaScript array. Visitors can add, edit, and delete notes, and write content using a safe subset of Markdown. Changes are held in memory and reset on refresh.

## Unit testing

`npm test` runs the built-in Node.js test runner. Tests cover post creation, input validation, deletion, editing, and safe Markdown rendering.

## Version control

Development was organized into `version-1`, `version-2`, and `testing` branches. The final `main` branch incorporates the tested implementation. Keeping the original static version on its own branch preserves a clear baseline, while feature and test branches make the work easier to review and maintain.

## Deployment

The source and all development branches are published at <https://github.com/greninja530/sesd-assignment-9>. The repository includes a GitHub Actions workflow for GitHub Pages. At the time of this report, GitHub has not run the workflow and the Pages URL is not live. Enable **Settings → Pages → GitHub Actions** in the repository to allow the workflow to publish the site.
