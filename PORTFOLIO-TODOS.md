# The upgrades that would make this portfolio substantially stronger

Prioritize evidence over adding more projects or visual effects. These are future improvements, not claims made by the website.

## 1. Record a 60–90 second FocusFix demonstration

- Show a clean install, start work, take a break, finish, inspect the session, and export.
- Use a fresh demo account and synthetic activity. Keep personal recordings and other people's information out of the capture.
- Narrate your actual contribution, one engineering decision, and one limitation. Add captions and a transcript.
- Deliverable: a public video, three real screenshots, and a working tutorial link replacing the current placeholder.
- Why it matters: a reviewer can understand the product without installing it.

## 2. Publish the complete workload evaluation

- Reproduce the mean baseline and every model with one documented command.
- Report participant-held-out results, sample size, feature definitions, leakage controls, variability, and failure cases.
- Distinguish any personalized model experiment from unseen-participant generalization.
- Include an ablation: which features contribute, and does complexity improve on the baseline?
- If the baseline wins, explain what you tried and what evidence would change your next decision.
- Deliverable: a small reproducible repository, one results table, and an evaluation case study replacing the early-result chart.
- Why it matters: it turns an AI interest into inspectable engineering judgment.

## 3. Run a small, well-defined user pilot

- Choose a specific user group and one problem. Interview five potential users before adding features.
- Track opt-in activation and repeat use, with a clear denominator and observation window. Record what confused people and what changed as a result.
- Measure a practical outcome without treating activity counts as validated productivity or fatigue.
- Keep any formal research separate and follow the relevant institutional process.
- Deliverable: an anonymized pilot note, a before/after product change, and a few permissioned user quotations if available.
- Why it matters: it demonstrates product sense, execution, and learning from real use.

## 4. Make Journal Agent your strongest applied-AI case study

- Create a synthetic journal dataset with relevance labels and cases where the correct result is no match.
- Compare exact-text retrieval with AI-expanded concept retrieval. Report precision, missed matches, false positives, latency, and failure behavior.
- Demonstrate stale-analysis protection, model unavailability, cancelled searches, and transcript edits.
- Record a local-only demo. Publish selected source after reviewing it for personal data.
- Deliverable: a short architecture diagram, evaluation table, runnable demo, and code walkthrough.
- Why it matters: it shows how you handle reliability around a real model, beyond a polished interface.

## 5. Tell one engineering story in depth

- Pick a concrete bug or tradeoff from FocusFix: recording lifecycle, consent boundaries, correcting sessions, or retry-safe synchronization.
- Explain the original failure, alternatives considered, final design, and evidence that the fix works.
- Include a small diagram and focused code references. Separate generated assistance from the decisions you understand and own.
- Deliverable: a readable technical note that you can defend in an interview.
- Why it matters: strong reviewers want to know how you reason, not just what tools appear in a skills list.

## 6. Update your resume and public repositories

- Add FocusFix and Journal Agent to the resume; keep research outcomes accurate.
- Pin two or three best repositories with clear READMEs, setup instructions, limitations, and screenshots.
- Make the build or evaluation reproducible on a clean machine. Add a small relevant CI check where it catches real breakage.
- Ensure project names, dates, status, and links agree across your resume, portfolio, GitHub, and LinkedIn.
- Deliverable: a coherent application package with no dead ends.

## 7. Publish the site when the evidence is ready

- Review the downloadable resume/report and visible contact details for public use.
- Push this repository and enable GitHub Pages from the root of `main`, or use another static host.
- Add a personal domain if desired. After the final URL is known, add canonical and social-preview metadata with absolute URLs.
- Run a mobile/keyboard check and a performance/accessibility audit on the deployed URL.
- Deliverable: one stable link you can put on every application.

## Suggested order

**First week:** video, real screenshots, updated resume, and repository cleanup.

**Next two weeks:** a full reproducible model evaluation and one engineering write-up.

**Following weeks:** the small user pilot and Journal Agent retrieval evaluation. Publish measured outcomes only after you have them.
