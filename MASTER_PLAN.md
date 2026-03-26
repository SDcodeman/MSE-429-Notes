# MSE491 Study Page Pipeline — Master Plan

## What This Is
A multi-stage pipeline that converts lecture slides (PDFs) from MSE429/MSE492 (Advanced Kinematics for Robotics) into interactive HTML study pages. Designed for incremental processing — new slides can be dropped in at any time.

## Subject Matter
- **MSE429**: Advanced Kinematics for Robotics System
- **MSE492**: Continuation — Manipulator Kinematics, Jacobians, Dynamics
- **Topics**: Rotation matrices, homogeneous transforms, DH parameters, forward/inverse kinematics, Jacobians, velocity propagation, static forces

## Directory Structure
```
MSE491/
├── MASTER_PLAN.md          ← You are here. Read this first.
├── manifest.json           ← Tracks every file + its processing status
├── Slides/                 ← Raw input PDFs (user drops files here)
├── raw_text/               ← pdftotext output (pre-extracted, agents read THIS not PDFs directly)
├── extracted/              ← Stage 1 output: structured markdown per chapter
├── audit_reports/          ← Audit logs from every stage
├── enrichment/             ← Stage 3 output: supplementary proofs, links, resources
├── verified/               ← Stage 4 output: final "source of truth" markdown
└── html_output/            ← Stage 5 output: interactive HTML study site
    ├── assets/
    │   ├── style.css       ← All component styles (callouts, quizzes, flashcards, tooltips, etc.)
    │   ├── main.js         ← All interactive component logic (13 init functions)
    │   ├── nav.js          ← Sidebar navigation data + page ordering
    │   ├── images/         ← Slide PNGs with headers/footers removed (66 files, ~19MB)
    │   └── images_originals/ ← Full-page backups before cropping
    ├── index.html          ← Landing page with card grid
    └── *.html              ← 12 chapter/tutorial/assessment pages
```

## Pipeline Stages

### Stage 0: Dedup & Triage
**Agent**: Dedup Agent
**Input**: `Slides/` folder + `manifest.json`
**Process**:
1. Hash all PDFs (md5) to detect true duplicates
2. For files with `(1)` suffixes — compare against originals, confirm duplicate or flag differences
3. For files with `rev2` — mark as superseding the original
4. Update `manifest.json`: mark duplicates as `skip`, flag the canonical version of each
**Output**: Updated `manifest.json` with dedup decisions
**Auditor**: None needed — deterministic hash comparison

### Stage 1: Extraction
**Agent**: Extraction Agent (one sub-agent per file)
**Input**: One PDF from `Slides/`
**Process**:
1. Read the pre-extracted text file from `raw_text/` (generated via `pdftotext -layout`). This is the PRIMARY source — cheap on context.
2. For pages with important diagrams/figures, use the Read tool on the PDF with SMALL page ranges (max 3-5 pages per read) to visually inspect. DO NOT read all pages as images — it blows up context.
3. Cross-reference the text with selective image reads to ensure equations and notation are captured correctly.
4. Extract into structured markdown with these sections:
   - `## Topic Title`
   - `### Definitions` — every defined term
   - `### Theorems & Properties` — stated results with conditions
   - `### Derivations` — step-by-step with reasoning for each step
   - `### Worked Examples` — full problem statement + solution steps
   - `### Key Equations` — numbered reference list
   - `### Diagrams` — text descriptions of figures (what they show, labels, relationships)
3. Use LaTeX notation for all math (`$inline$` and `$$display$$`)
4. Preserve slide numbering as references (e.g., "Ch2-14")
5. **CRITICAL**: Tag EVERY element with its source PDF page number using this format:
   `<!-- source: FILENAME.pdf#page=N -->` immediately before each section/definition/equation/example.
   This metadata is used in HTML generation to create clickable links back to the original PDF.
**Output**: `extracted/{COURSE}_{TYPE}_{NUM}.md` (e.g., `extracted/MSE429_Chapter_2.md`)
**Context management**: Each file is its own sub-agent. Never load more than one PDF at a time.

### Stage 2: Extraction Audit
**Agent**: Audit Agent (one per extracted file)
**Input**: Original PDF + corresponding `extracted/*.md`
**Process**:
1. Re-read the PDF independently
2. Checklist comparison:
   - [ ] All slides accounted for (no missing content)
   - [ ] All equations present and correctly transcribed
   - [ ] All worked examples complete (problem + full solution)
   - [ ] All definitions captured
   - [ ] Diagram descriptions match actual figures
   - [ ] No hallucinated content (nothing added that isn't in slides)
3. Flag issues with specific slide references
**Output**: `audit_reports/extraction_audit_{FILE}.md` — pass/fail + issues list
**On failure**: Extraction agent re-runs on flagged sections only

### Stage 3: Enrichment
**Agent**: Enrichment Agent (one per chapter)
**Input**: Audited `extracted/*.md`
**Process**:
1. Identify concepts that need deeper explanation than slides provide
2. Search for:
   - Formal proofs of stated theorems (e.g., rotation matrix orthogonality proof)
   - Alternative derivations that may be clearer
   - YouTube videos explaining the concepts (robotics kinematics has great visual content)
   - Textbook references (Craig's "Introduction to Robotics" is likely the course textbook)
3. Add enrichment as clearly marked addendum sections:
   - `### [ENRICHMENT] Proof: {theorem name}`
   - `### [ENRICHMENT] Video: {description}` with URL
   - `### [ENRICHMENT] Alternative Explanation: {concept}`
**Output**: `enrichment/{COURSE}_{TYPE}_{NUM}_enriched.md`
**Constraint**: Enrichment is additive only — never modifies extracted content

### Stage 4: Content Verification
**Agent**: Verification Agent (one per file)
**Input**: `enrichment/*_enriched.md`
**Process**:
1. Mathematical correctness check:
   - Verify matrix multiplications in worked examples
   - Check derivation steps follow logically
   - Validate that DH parameter tables produce correct transforms
   - Confirm Jacobian computations
2. Cross-reference consistency:
   - Notation consistent across chapters
   - Forward references to later chapters are noted
   - Prerequisites from earlier chapters are linked
3. Merge into final verified file
**Output**: `verified/{COURSE}_{TYPE}_{NUM}.md` — the "source of truth"
**Output**: `audit_reports/verification_{FILE}.md` — what was checked + any corrections made

### Stage 5: HTML Generation
**Agent**: HTML Generator Agent (one per verified file)
**Input**: `verified/*.md` (kept open as reference throughout)
**Process**:
1. **ALL PAGES ARE INTER-NAVIGATABLE — NOT STANDALONE.** This is a single cohesive study site, not isolated files.
2. Generate HTML files that share a common navigation framework:
   - **KaTeX** for equation rendering (faster than MathJax, works offline)
   - **Collapsible sections**: proofs and derivations default-collapsed, click to expand
   - **Step-by-step walkthroughs**: derivations shown one step at a time with "Next Step" button
   - **Worked examples**: problem shown first, solution behind "Show Solution" button
   - **Equation highlighting**: hover over equation to highlight where it's used
   - **Enrichment callouts**: visually distinct boxes for supplementary content
   - **Video embeds**: YouTube iframes for enrichment videos
   - **Print-friendly**: CSS media query for clean printing
   - **Self-test quizzes**: MCQ questions after key sections with instant feedback (correct/incorrect + explanation). 3-4 per chapter, quiz score tracker.
   - **Flashcard decks**: Click-to-flip cards for key definitions/equations at end of each chapter. Prev/next navigation + shuffle. Keyboard accessible.
   - **Interactive rotation demo**: Canvas-based 2D rotation visualizer (Chapter 2 only). Slider to change angle, live matrix display, preset buttons.
   - **Section progress tracking**: Auto-injected checkmarks on each h2 section (chapters) or problem callout (tutorials). Progress bar at top of page. State saved to localStorage.
   - **Concept confidence checks**: "Got it / Need review / Not yet" buttons after major concept sections. State saved to localStorage.
   - **Quick reference panel**: Floating button (bottom-right) that opens a slide-out panel with key equations for the current chapter. Always accessible while reading.
   - **Figure images**: Extracted from PDF slides via `pdftoppm -r 200 -png`. Stored in `html_output/assets/images/`. Each `.figure-desc` gets a corresponding `<img>` above it in a `.figure` div. Images are click-to-zoom (lightbox). Text descriptions kept as captions.
3. Use shared CSS/JS files (`html_output/assets/style.css`, `html_output/assets/main.js`) — NOT inline per page
4. Copy equations character-for-character from verified markdown — NO rewriting
5. **Navigation system** (present on EVERY page):
   - **Persistent sidebar**: lists all chapters, tutorials, assignments, exam — current page highlighted. Always visible.
   - **Prev/Next buttons**: at top and bottom of every page, linking to adjacent content in sequence
   - **Breadcrumbs**: e.g., Home > MSE429 > Chapter 2 > Section 2.3
   - **Cross-references**: when a chapter references a concept from another chapter (e.g., "recall the rotation matrix from Ch2"), make it a clickable link to that section
   - **Related practice**: at the bottom of each chapter page, link to the tutorials/assignments that cover that chapter's material
   - **index.html**: master landing page with course overview, chapter map, and links to everything
**Output**: `html_output/{COURSE}_{TYPE}_{NUM}.html`
**Output**: `html_output/index.html` — master landing page and navigation hub
**Output**: `html_output/assets/style.css` + `html_output/assets/main.js` — shared resources

### Stage 5b: Image Cleanup
**Agent**: Image Processing Script (automated)
**Input**: Raw full-page images in `html_output/assets/images/` (extracted via `pdftoppm`)
**Process**:
1. Back up originals to `html_output/assets/images_originals/`
2. Detect SFU header bar (dark red rows), section title text (blue), footer text — crop them off
3. For tutorials/assignments: trim header/footer and auto-crop whitespace (handwritten content IS the diagram)
4. Horizontally trim excess whitespace margins
**Output**: Clean slide images with institutional chrome removed, full content preserved
**Note**: Run `pdftoppm` first for new images, THEN run the crop script

**IMPORTANT — Design Philosophy**:
The slide images are the PRIMARY content. The HTML around them SUPPLEMENTS with interactivity (tooltips, why-boxes, quizzes, progress tracking). Do NOT crop slide body text/equations out of images — that's the lecture content the student needs to see. Only remove institutional chrome (SFU header, section title bar, footer).

**What doesn't work (tried and reverted)**:
- Cropping images to "diagram only" by removing text that matches the HTML. This over-crops and destroys the slide context. The HTML is supplementary, not a replacement for slides.
- Auto-detecting diagrams by pixel color (many diagrams are black-only)
- Detecting "colored pixels" to find diagram regions (blue keyword text gets false-detected)
- `scripts/image_refine.py` and `scripts/crop_manifest.json` exist but are NOT used — they over-cropped. Kept for reference only.

### Stage 5c: Deep Annotation
**Agent**: Annotation Agent (one per chapter)
**Input**: `html_output/*.html` (chapter pages)
**Process**:
1. Identify concepts, terms, and equations that benefit from a "Why?" explanation
2. Add inline tooltips (`.tooltip-term`) on technical terms with brief definitions + source links
3. Add expandable "Why?" boxes (`.why-box`) after key equations/theorems explaining:
   - WHY the equation takes that form (intuition, not just restatement)
   - WHERE it comes from (derivation sketch or textbook reference)
   - WHEN it breaks down (edge cases, assumptions)
4. Every explanation MUST cite a real source:
   - Textbook: Craig's "Introduction to Robotics" (chapter + section)
   - Wikipedia: specific article URL for standard results
   - Research papers: for advanced results
   - Course textbook PDF page: `../Slides/FILENAME.pdf#page=N`
5. DO NOT fabricate explanations. If unsure, cite the course slides as the source.
6. Use WebSearch to find authoritative explanations for each concept.
**Output**: Updated `html_output/*.html` with tooltip and why-box annotations
**HTML patterns**:
```html
<!-- Tooltip on a term -->
<span class="tooltip-term" tabindex="0">rotation matrix
  <span class="tooltip-content">
    A 3×3 orthogonal matrix (R^T R = I, det R = +1) describing pure rotation.
    <span class="tooltip-source">Craig, <em>Intro to Robotics</em>, §2.2</span>
  </span>
</span>

<!-- Why? box after an equation -->
<div class="why-box">
  <button class="why-toggle">Why does R^T = R^{-1} for rotation matrices?</button>
  <div class="why-content"><div class="why-content-inner">
    <p>Rotation preserves vector lengths and angles. Mathematically, this means...</p>
    <div class="why-source">Source: <a href="https://en.wikipedia.org/wiki/Rotation_matrix#Properties">Wikipedia: Rotation matrix § Properties</a></div>
  </div></div>
</div>
```
**Constraint**: Annotations are ADDITIVE — never remove or modify existing content

### Stage 6: HTML Audit
**Agent**: HTML Audit Agent (one per file)
**Input**: `html_output/*.html` + corresponding `verified/*.md`
**Process**:
1. Equation-by-equation comparison: every equation in markdown appears in HTML
2. Check all interactive elements function (collapsibles, step-throughs, show/hide)
3. Verify no content was dropped or reordered
4. Check ALL inter-page links work (sidebar, prev/next, cross-references, related practice links)
5. Verify sidebar highlights the correct current page
6. Verify breadcrumbs are accurate
7. Verify KaTeX renders without errors
**Output**: `audit_reports/html_audit_{FILE}.md`
**On failure**: HTML generator re-runs on flagged sections

## Processing Order
Chapters should be processed in order since later chapters reference earlier ones:
1. MSE429 Chapter 2 (Spatial Descriptions & Transforms)
2. MSE492 Chapter 3 (Manipulator Kinematics / DH Parameters)
3. MSE492 Chapter 4 rev2 (likely Inverse Kinematics)
4. MSE492 Chapter 5 rev2 (Jacobians, Velocities, Static Forces)
5. Tutorials 1, 3, 4, 5 (in order — practice problems)
6. Assignments 1, 2 (more complex problems)
7. Midterm 1 (exam-style problems)

## How to Add New Files (Step-by-Step for Any Agent)

### Pre-flight
1. Read this MASTER_PLAN.md fully
2. Read manifest.json to understand current state
3. Check `Slides/` for new files not in manifest

### For Each New PDF:
```bash
# 1. Hash it and add to manifest.json
md5 -q "Slides/NEW_FILE.pdf"
# Add entry with status: "canonical", all stages: false

# 2. Pre-extract text
pdftotext -layout "Slides/NEW_FILE.pdf" "raw_text/OUTPUT_NAME.txt"

# 3. Count pages
pdfinfo "Slides/NEW_FILE.pdf" | grep Pages
```

### Then Run Stages 1-6:
- **Stage 1 (Extraction)**: Launch sub-agent. It reads raw_text + selective PDF image reads (max 3-5 pages). Writes to `extracted/`.
- **Stage 2 (Extraction Audit)**: Launch audit agent. Reads extracted markdown + raw_text + spot-checks PDF. Writes to `audit_reports/`.
- **Stage 3 (Enrichment)**: For chapters only. WebSearch for proofs, videos, explanations. Writes to `enrichment/`. NEVER modify original.
- **Stage 4 (Verification)**: Math correctness check. Writes to `verified/`. This is the SOURCE OF TRUTH.
- **Stage 5 (HTML Generation)**: From verified markdown. Uses shared template in `html_output/assets/`. Must also:
  - Update `html_output/assets/nav.js` — add new page to NAV_DATA and PAGE_ORDER
  - Update `html_output/index.html` — add card for new page
  - Add `<div class="progress-bar-container">` after breadcrumbs (JS auto-injects section checks)
  - For chapters: add 3-4 self-test quizzes, flashcard deck, concept checks, quick reference panel
  - For tutorials/assessments: progress bar only (JS auto-tracks `.callout-example` blocks)
  - Extract figure images: `pdftoppm -f PAGE -l PAGE -png -r 200 -singlefile "Slides/FILE.pdf" "html_output/assets/images/PREFIX_pPAGE"`
  - Insert `<div class="figure"><img src="assets/images/PREFIX_pPAGE.png" loading="lazy"></div>` before each `.figure-desc`
- **Stage 5b (Image Cleanup)**: Run Pillow crop script to remove SFU headers, footers, section titles. Backs up originals to `images_originals/`. Do NOT crop slide body text — slides are the primary content, HTML supplements them.
- **Stage 5c (Deep Annotation)**: For chapters only. Add `.tooltip-term` on key terms and `.why-box` after major equations/theorems. MUST cite real sources (Craig textbook, Wikipedia, course slides). Use WebSearch to find authoritative explanations.
- **Stage 6 (HTML Audit)**: Grep-based structural checks (div balance, source links, toggle IDs, KaTeX).

### After Processing:
- Update manifest.json stage flags
- Update this progress log
- For tutorials/assignments: skip Stages 3-4 (no enrichment/verification needed)

### Technical Gotchas:
- PDF pages are LARGE IMAGES. Never read more than 3-5 pages at a time via image reader.
- Handwritten PDFs (tutorials): pdftotext gets ~40 lines. Must use `pdftoppm` to PNG then read images.
- HTML files are 70-80KB+. HTML audit agent can't read full files. Use grep-based structural checks.
- KaTeX uses $ and $$ delimiters. Don't HTML-escape dollar signs in equations.

## Key Constraints
- **One PDF per sub-agent** — never load multiple PDFs in a single context
- **Markdown is the source of truth** — HTML is generated FROM it, never the reverse
- **Equations are sacred** — copy verbatim from verified markdown into HTML, never paraphrase
- **Auditors are independent** — they re-read originals, not just review previous agent's work
- **Incremental** — manifest tracks state, nothing gets reprocessed unless source changes

## Shared HTML Template Spec
All HTML pages should use:
- **KaTeX 0.16+** via CDN for math rendering
- **Responsive layout** — works on laptop and tablet
- **Dark/light mode toggle**
- **Consistent color scheme**:
  - Definitions: blue left-border callout
  - Theorems: green left-border callout
  - Examples: orange left-border callout
  - Enrichment: purple left-border callout
  - Warnings/common mistakes: red left-border callout
- **Navigation**: sticky sidebar TOC + prev/next chapter links
- **Search**: Ctrl+F works naturally since content is in the DOM (not canvas-rendered)
- **PDF source links**: EVERY piece of content (definition, equation, example, theorem, derivation step) must link back to the original PDF at the exact page. Clicking opens the PDF at that page. Format: `Slides/FILENAME.pdf#page=N`. This is NON-NEGOTIABLE.

## Interactive Component Reference

All components are in `html_output/assets/style.css` and `html_output/assets/main.js`.

### CSS Classes → JS Init Functions
| Component | CSS Class | JS Function | Pages |
|-----------|-----------|-------------|-------|
| Theme toggle | `.theme-toggle` | `initThemeToggle()` | All |
| Collapsible sections | `.collapsible`, `.collapsible-header`, `.collapsible-body` | `initCollapsibles()` | All |
| Step-by-step derivations | `.derivation-steps`, `.derivation-step`, `.step-btn` | `initDerivationSteps()` | Chapters |
| Show/hide solutions | `.solution-toggle`, `.solution-content` | `initSolutionToggles()` | Tutorials, assessments |
| Sidebar navigation | `.sidebar` | `initSidebarToggle()`, `initSidebarHighlight()` | All |
| Self-test quizzes | `.quiz`, `.quiz-option`, `.quiz-feedback` | `initQuizzes()` | Chapters (3-4 per ch) |
| Flashcard decks | `.flashcard-deck`, `.flashcard`, `.flashcard-face` | `initFlashcards()` | Chapters (1 per ch) |
| Rotation demo | `.rotation-demo`, `canvas`, `.theta-slider` | `initRotationDemos()` | Ch2 only |
| Section progress | `.progress-bar-container`, `.section-check` | `initSectionProgress()` | All pages |
| Concept confidence | `.concept-check`, `.confidence-btn` | `initConceptChecks()` | Chapters |
| Quick reference | `.quick-ref-toggle`, `.quick-ref-panel` | `initQuickRef()` | Chapters |
| Figure zoom | `.figure`, `.figure img`, `.zoomed` | `initFigureZoom()` | All with images |
| Tooltips | `.tooltip-term`, `.tooltip-content`, `.tooltip-source` | Pure CSS (hover) | Chapters |
| Why? boxes | `.why-box`, `.why-toggle`, `.why-content` | `initWhyBoxes()` | Chapters |

### Data Attributes
- `data-correct="true/false"` on `.quiz-option` — marks correct answer
- `data-correct` / `data-incorrect` on `.quiz-feedback` — feedback text
- `data-concept="name"` on `.concept-check` — localStorage key
- `data-level="yes/review/no"` on `.confidence-btn` — confidence level
- `data-angle="N"` on `.rotation-preset-btn` — preset angle
- `data-target="id"` on `.solution-toggle` — links to solution div

### localStorage Keys
- `mse491-theme` — light/dark mode
- `mse491-progress-{pageId}` — section completion checkmarks
- `mse491-confidence-{pageId}` — concept confidence ratings

### Current Annotation Counts (as of 2026-03-06)
| Chapter | Tooltips | Why? Boxes | Quizzes | Flashcards |
|---------|----------|------------|---------|------------|
| Ch2 | 6 | 4 | 4 | 6 cards |
| Ch3 | 6 | 3 | 3 | 5 cards |
| Ch4 | 6 | 3 | 3 | 4 cards |
| Ch5 | 5 | 3 | 4 | 6 cards |

## Documentation Protocol
**EVERY agent MUST update documentation before finishing:**
1. Update `manifest.json` — set the relevant stage flag to `true` for the file it processed
2. Update this `MASTER_PLAN.md` — append to the `## Progress Log` section below
3. Write enough context that a completely new agent can pick up where you left off
4. If you hit a blocker, document it in the progress log before stopping

## Progress Log
<!-- Agents: append your updates here in reverse-chronological order -->

### 2026-03-06 — IMAGE PHILOSOPHY CORRECTION
- **Tried**: Cropping slide images to "diagram only" by removing text that duplicated HTML content
  - Dispatched 4 agents to classify 46 chapter images → crop manifest → Pillow script
  - Result: over-cropped. Destroyed slide context.
- **Reverted**: Restored all images to Pass 1 state (headers/footers removed, full slide content preserved)
- **Lesson learned**: Slides ARE the primary content. HTML supplements them with interactivity (tooltips, why-boxes, quizzes). Don't try to replace slides with HTML or crop out slide text.
- Scripts `image_refine.py` and `crop_manifest.json` kept in `scripts/` for reference but NOT used

### 2026-03-06 — IMAGE CROPPING + DEEP ANNOTATIONS + PIPELINE EXPANSION
- **Image cropping (Stage 5b)**: Wrote Python script using Pillow to auto-crop all 66 images:
  - Detects SFU red header bar → crops below it
  - Detects section title text (blue) → crops below it
  - Detects footer ("MSE 429 - ...") → crops above it
  - Auto-trims whitespace margins on all edges
  - Originals backed up to `html_output/assets/images_originals/`
  - Size reduction: 23.1MB → 18.5MB (20% smaller)
- **Deep annotations (Stage 5c)**: New pipeline stage added
  - `.tooltip-term` — hover tooltips on technical terms with definitions + source citations
  - `.why-box` — expandable "Why?" explanations with real source links (Craig textbook, Wikipedia, course slides)
  - CSS + JS infrastructure added to shared assets
  - Chapter 2: 5 tooltips + 3 Why boxes (position vector, rotation matrix, roll/pitch/yaw, gimbal lock, Euler parameters, free vector; transpose property, translate-before-rotate, T inverse, gimbal lock cause)
  - Chapters 3-5: annotation agents launched in parallel
- **MASTER_PLAN.md updated**: Added Stage 5b (Image Cleanup) and Stage 5c (Deep Annotation) with full specs, HTML patterns, and processing instructions

### 2026-03-05 — IMAGES EXTRACTED + SCROLLING FIX
- **Scrolling fixed FOR REAL**: The root cause was KaTeX CDN's `.katex-display > .katex { overflow-x: auto }`. Added `!important` overrides on `.katex-display`, `.katex-display > .katex`, and `.katex-display > .katex > .katex-html` to force `overflow: visible`.
- **66 figure images extracted** from PDFs using `pdftoppm` at 200 DPI, stored in `html_output/assets/images/`
- **67 `<img>` tags inserted** into 11 HTML pages (auto-inserted via Python script before each `.figure-desc` block)
- Images are click-to-zoom (lightbox effect via CSS `.zoomed` class + JS `initFigureZoom()`)
- Text descriptions preserved as captions below each image
- Image sources: Ch2 (12 from 12 pages), Ch3 (13 from 13 pages), Ch4 (14 from 11 pages), Ch5 (10 from 10 pages), tutorials (10), assignments (7), midterm (1)
- Added `.figure` CSS class with responsive sizing, border, hover shadow, zoom overlay
- **Total image disk size: 24MB** (200 DPI PNGs — good quality for studying)

### 2026-03-05 — INTERACTIVE COMPONENTS ADDED
- **CSS fix**: Removed `overflow-x: auto` from `.katex-display` — equations in callout boxes no longer scroll unnecessarily
- **New interactive features added to all pages**:
  - Self-test quizzes (MCQ with instant feedback): 3-4 per chapter, score tracking
  - Flashcard decks (click-to-flip, prev/next, shuffle): one per chapter, 4-6 cards each
  - Interactive 2D rotation demo (Chapter 2): canvas-based, slider + presets + live matrix display
  - Section progress tracking: auto-injected checkmarks on h2/problem sections, progress bar, localStorage persistence
  - Concept confidence checks: "Got it / Need review / Not yet" after major sections
  - Quick reference panels: floating button with key equations per chapter
- **Files modified**: style.css (new component styles), main.js (6 new init functions), all 12 HTML pages (progress bars + chapter-specific interactive elements)
- **MASTER_PLAN.md updated**: Stage 5 spec now includes all interactive component types

### 2026-03-05 — PIPELINE COMPLETE FOR ALL CURRENT FILES
- **All 11 canonical files processed through entire pipeline**
- 4 chapters: all 6 stages complete (extracted → audited → enriched → verified → HTML → HTML audited)
- 7 tutorials/assignments/midterm: 4 stages complete (extracted → audited → HTML → HTML audited; enrichment + verification skipped by design)
- 12 HTML pages + index.html + 3 shared assets = complete study site
- 11 audit reports covering every stage
- 3 slide errors caught and corrected
- manifest.json fully up to date — every canonical file shows ALL COMPLETE
- **To add new files**: follow "How to Add New Files" section above

### 2026-03-05 — Stage 6: Tutorial/Assessment HTML Audit — COMPLETE
- All 7 tutorial/assessment HTML pages pass structural audit
- Div balance, KaTeX links, toggle ID matching, PDF source links — all verified
- Report: `audit_reports/html_audit_tutorials_assessments.md`
- **manifest.json**: All 7 marked `html_audited: true`, `enriched: skipped`, `content_verified: skipped`

### 2026-03-05 — Stage 6: Chapter HTML Audit — COMPLETE
- All 40 structural checks PASS across 4 chapter HTML files
- Div tags balanced, KaTeX linked, PDF source links correct, solution toggle IDs match
- Report: `audit_reports/html_audit_chapters.md`
- **manifest.json**: All 4 chapters marked `html_audited: true` — FULLY DONE through entire pipeline

### 2026-03-05 — Stage 5: HTML Generation — COMPLETE
- ALL 12 HTML pages generated:
  - 4 chapters: Ch2 (1097 lines, 84K), Ch3 (970, 68K), Ch4 (1106, 76K), Ch5 (1116, 76K)
  - 4 tutorials: Tut1 (227, 16K), Tut3 (281, 20K), Tut4 (279, 20K), Tut5 (310, 24K)
  - 3 assessments: A1 (293, 20K), A2 (289, 20K), Midterm (293, 20K)
  - index.html landing page (144, 8K)
- Shared assets: style.css (9K), main.js (4K), nav.js (3K)
- Features: KaTeX math, collapsible proofs, step-by-step derivations, solution toggles, PDF source links, sidebar navigation, dark/light mode, responsive, print-friendly
- **manifest.json**: All 11 canonical files marked `html_generated: true`

### 2026-03-05 — Stage 4: Content Verification — COMPLETE
- All 4 chapters verified. 3 errors found in ORIGINAL SLIDES and corrected:
  1. Ch2: Z-Y-Z Euler angles degenerate case (beta=180) — sign error in gamma formula. Fixed.
  2. Ch4: Pieper's method z-equation — sign error in k_2 term (page 25). Fixed.
  3. Ch5: Jacobian ${}^3 J_3$ entry — $L_2 s_2$ should be $L_1 s_2$ (page 20). Fixed.
- Ch3: DH matrix verified via SymPy. One course label typo fixed.
- All enrichment proofs verified mathematically sound.
- Verified files in `verified/` are now the SOURCE OF TRUTH for HTML generation.
- Reports in `audit_reports/verification_*.md`
- **manifest.json**: All 4 chapters marked `content_verified: true`
- **Next**: Stage 5 — HTML generation from verified files. CSS/JS template already built.

### 2026-03-05 — Stage 2: Tutorial fixes — COMPLETE
- Tutorial 1 Problem 1.4: All 4 matrices corrected and computationally validated
- Tutorial 3: FK matrix, Stanford rotation, solutions table all fixed
- Both tutorials now marked `extraction_audited: true`

### 2026-03-05 — Stage 3: Chapter Enrichment — COMPLETE
- All 4 chapters enriched with proofs, videos, alternative explanations, tools
- Ch2: 659→1040 lines (+381). 3 proofs, 8 explanations, 8 videos, comparison table
- Ch3: 380→642 lines (+262). 2 proofs, 5 videos, DH common mistakes, standard vs modified DH
- Ch4: 679→933 lines (+254). 2 proofs, 5 videos, workspace/Pieper explanations
- Ch5: 961→1199 lines (+238). 2 proofs, 5 videos, manipulability ellipsoid, slide typo flagged
- All in `enrichment/` folder. Original content untouched in each file.
- **manifest.json**: All 4 chapters marked `enriched: true`
- **Next**: Stage 4 (content verification) for chapters, then Stage 5 (HTML generation)

### 2026-03-05 — Stage 2 Batch 2: Tutorial/Assignment Audit — CONDITIONAL PASS
- 5 of 7 PASS. Tutorial 1 (Problem 1.4 corrupt matrices) and Tutorial 3 (Problem 3.1 matrix errors) need fixes.
- Fix agents launched for both. Non-blocking issues flagged for Stage 4.
- Detailed report: `audit_reports/extraction_audit_tutorials_assignments.md`

### 2026-03-05 — Stage 1 Batch 2: Tutorials/Assignments/Midterm Extraction — COMPLETE
- **All 7 remaining files extracted** (tutorials by image read via pdftoppm, assignments/midterm mixed)
- Tutorial 1: 241 lines, 11 tags (5 problems) → `extracted/MSE429_Tutorial_1.md`
- Tutorial 3: 341 lines, 14 tags (4 problems) → `extracted/MSE429_Tutorial_3.md`
- Tutorial 4: 260 lines, 14 tags (5 problems) → `extracted/MSE429_Tutorial_4.md`
- Tutorial 5: 364 lines, 17 tags (6 problems) → `extracted/MSE429_Tutorial_5.md`
- Assignment 1: 240 lines, 11 tags (7 problems) → `extracted/MSE429_Assignment_1.md`
- Assignment 2: 221 lines, 7 tags (6 problems + rubric) → `extracted/MSE429_Assignment_2.md`
- Midterm 1: 302 lines, 17 tags (3 problems + point values) → `extracted/MSE429_Midterm_1.md`
- **All 11 canonical files now extracted.** manifest.json updated.
- **Next**: Stage 3 (enrichment) for chapters, Stage 2 audits for tutorials/assignments can run in parallel

### 2026-03-05 — Stage 2: Chapter Extraction Audits — COMPLETE
- All 4 chapters PASSED audit. Reports in `audit_reports/`
- Ch2: 1 equation error fixed (dot product subscript, line 67)
- Ch3: Minor pedagogical additions flagged — correct, not blocking
- Ch4: Section renumbering noted; z-equation sign flagged for Stage 4 math verification
- Ch5: Caught TYPO IN ORIGINAL SLIDES (slide 20: $L_2 s_2$ should be $L_1 s_2$) — flagged for Stage 4
- Ch4 extraction was also updated by a late-finishing agent: 614→679 lines, 63→72 source tags, DH table corrected
- **manifest.json**: All 4 chapters marked `extraction_audited: true`
- **Next**: Waiting on tutorial/assignment extraction, then Stage 3 (enrichment)

### 2026-03-05 — Stage 1: Chapter Extraction — COMPLETE
- **All 4 chapters extracted successfully** (attempt 2 — text-first strategy)
- Ch2: 659 lines, 48 source tags (29 pages) → `extracted/MSE429_Chapter_2.md`
- Ch3: 380 lines, 45 source tags (22 pages) → `extracted/MSE492_Chapter_3.md`
- Ch4: 614 lines, 63 source tags (30 pages) → `extracted/MSE492_Chapter_4.md`
- Ch5: 961 lines, 59 source tags (48 pages) → `extracted/MSE492_Chapter_5.md`
- **Lesson learned**: PDF pages are images. pdftotext first, selective image reads only for diagrams (max 3-5 pages). Documented in Stage 1 process.
- **raw_text/ also pre-extracted for tutorials/assignments/midterm** (7 files ready)
- **manifest.json**: All 4 chapters marked `extracted: true` with stats
- **Next**: Stage 2 (extraction audits for chapters) + Stage 1 batch 2 (tutorials/assignments/midterm) launching in parallel

### 2026-03-05 — Stage 1: Extraction — attempt 1 FAILED
- **Issue**: PDF pages render as large images. Reading 20 pages at once exceeds multi-image dimension limit (2000px). All 4 agents failed.
- **Fix applied**: Pre-extracted text via `pdftotext -layout` into `raw_text/`. Agents read text files + selective image reads.

### 2026-03-05 — Stage 0: Dedup & Triage — COMPLETE
- **Agent**: Orchestrator (main context)
- **Result**: 17 PDFs hashed. 5 exact duplicates marked `skip`. 1 anomaly flagged (Assignment 1 (1) has different hash). Ch4 original superseded by rev2.
- **Canonical files to process**: 11 (4 chapters, 4 tutorials, 2 assignments, 1 midterm)
- **manifest.json**: Updated with MD5 hashes, skip/canonical status, dedup reasons
- **Next**: Stage 1 — Extraction agents launching for all 4 chapters in parallel
