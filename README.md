# Kristian Janci — Portfolio

A static, responsive portfolio focused on AI engineering. FocusFix leads the work; Journal Agent, local AI tools, and behavioral research provide supporting evidence.

## Preview

Open `index.html` directly, or serve this directory:

```sh
python3 -m http.server 8173 --bind 127.0.0.1
```

Visit http://127.0.0.1:8173. No installation, API key, build step, backend, or account is needed. Google Fonts are optional; the layout falls back to system fonts offline. Clipboard copying may require localhost or HTTPS; the visible email link always works.

## Files

- `index.html`: copy, project case studies, contact links, and native detail dialogs.
- `styles.css`: responsive layouts, visual design, print styles, and motion preferences.
- `script.js`: mathematical canvas art, scroll-driven case study, dialog controls, and email copying.
- `assets/`: original portrait, FocusFix icon, monogram, resume, and research report.
- `PORTFOLIO-TODOS.md`: prioritized improvements to the underlying portfolio evidence.
- `SOURCES.md`: factual provenance and design research.

## Update the content

- Replace `assets/kristian-janci-resume.pdf` when the resume includes the current native apps. Keep its filename to preserve links.
- The tutorial is intentionally labeled **Video coming soon**. Replace that resource with a real video link or accessible video player once recorded. Do not add a fake play button.
- The FocusFix interface study is a portfolio illustration with sample data. It is not a screenshot, a live app, or a measured result.
- The chart shows only the early four-feature linear regression comparison from the research proposal. Replace it with the full evaluation after results are ready.
- Personal prototypes are described without source links until their repositories are made public and reviewed.
- Check GPA, graduation date, project status, and internship availability before publishing.

## Accessibility and motion

Semantic sections, a skip link, visible focus outlines, native dialogs, labeled controls, reduced-motion styles, and a persistent Pause motion control are included. The point sculpture stops when off screen or the document is hidden. All main content remains visible if JavaScript is disabled. The small project detail dialogs need JavaScript; core project descriptions and links remain in the page.

At phone widths the case study uses readable stacked content and manual scene buttons instead of pinning an interface across the screen. Motion preferences do not disable those buttons.

## Hosting

This folder is ready for static hosting. For GitHub Pages, configure the repository to deploy from `main` and `/ (root)`, then push only after reviewing the public content. Paths are relative so a repository site works without rewriting asset URLs. No hosted site or GitHub Pages configuration has been created by this task.

## Commit convention

Each added or changed file is committed individually. Subsequent revisions receive additional commits for the specific files changed. Local commits do not automatically push to GitHub.
