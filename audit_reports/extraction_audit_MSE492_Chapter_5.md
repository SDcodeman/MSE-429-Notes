# Extraction Audit: MSE492 Chapter 5 -- Jacobians: Velocities and Static Forces

**Audit Date**: 2026-03-05
**Auditor**: Extraction Audit Agent (Stage 2)
**Source PDF**: `Slides/MSE492 - Chapter5-rev2.pdf` (48 pages)
**Raw Text**: `raw_text/MSE492_Chapter5-rev2.txt` (1189 lines)
**Extracted Markdown**: `extracted/MSE492_Chapter_5.md` (961 lines)

---

## Overall Verdict: PASS (with minor issues noted)

---

## Audit Checklist

### 1. Page Coverage
- **Status**: PASS
- All 48 pages accounted for. Source tags found for pages 1 through 48 inclusive.
- Total source tags in main body: 48 (one per page, pages 1-48)
- Additional source tags in Key Equations Summary section: 11 (referencing back to original pages)
- Total source tags: 59
- Page 48 correctly noted as blank end slide.

### 2. Both Jacobian Methods Present
- **Status**: PASS
- **Method 1 -- Joint Directions and Derivatives** (Section 5.7.4, pages 22-25): Present and complete. Includes general formula, worked example with partial derivatives, joint direction extraction from homogeneous transforms.
- **Method 2 -- Joint Directions and Cross Products** (Section 5.7.6, pages 26-31): Present and complete. Includes revolute and prismatic joint formulas, position difference vectors, cross product computations, full worked example.
- Both methods produce the same 6x2 Jacobian result, confirmed in the extraction (line 498).

### 3. Velocity Propagation Formulas
- **Status**: PASS
- **Revolute joints** (Section 5.6.1, pages 13-14):
  - Angular velocity: ${}^{i+1}\boldsymbol{\omega}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\;{}^{i}\boldsymbol{\omega}_i + \dot{\theta}_{i+1}\;{}^{i+1}\hat{Z}_{i+1}$ -- CORRECT
  - Linear velocity: ${}^{i+1}\boldsymbol{v}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}({}^{i}\boldsymbol{v}_i + {}^{i}\boldsymbol{\omega}_i \times {}^{i}\boldsymbol{P}_{i+1})$ -- CORRECT
- **Prismatic joints** (Section 5.6.2, page 15):
  - Angular velocity: ${}^{i+1}\boldsymbol{\omega}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\;{}^{i}\boldsymbol{\omega}_i$ (no joint contribution) -- CORRECT
  - Linear velocity: ${}^{i+1}\boldsymbol{v}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}({}^{i}\boldsymbol{v}_i + {}^{i}\boldsymbol{\omega}_i \times {}^{i}\boldsymbol{P}_{i+1}) + \dot{d}_{i+1}\;{}^{i+1}\hat{Z}_{i+1}$ -- CORRECT
- Intermediate derivation steps present (frame {i} to frame {i+1} transformation).

### 4. Singularity Analysis
- **Status**: PASS
- **Definition** (Section 5.8, page 41): Present. Explains rank deficiency, loss of DoF, inverse Jacobian blow-up.
- **Singularity condition** (Section 5.8.2, page 43): $|{}^{ref}\boldsymbol{J}_w| = |A_{3\times 3}|\;|C_{3\times 3}| = 0$ -- CORRECT
- **Main arm singularities** (Section 5.8.3, page 44): Boundary and interior types described.
- **Wrist singularities** (Section 5.8.4, page 45): Linear dependence of $\hat{Z}_4$, $\hat{Z}_5$, $\hat{Z}_6$ described. Geometric interpretation (axes 4 and 6 align) included.
- **Worked example** (Section 5.8.1, page 42): Two-link singularity with inverse Jacobian, $s_2 \to 0$ blow-up demonstrated.

### 5. Static Force Analysis
- **Status**: PASS
- **Force transformation** ${}^{r_2}_{r_1}TF_{b\to a}$ (Section 5.9.1, page 46): Full derivation with skew-symmetric matrix. Matrix form present and correct.
- **Inverse static force problem** (Section 5.9.2, page 47): Conservation of power derivation present. Final result: $\boldsymbol{\tau} = {}^{0}\boldsymbol{J}_{ee}^\top\;{}^{0}\boldsymbol{F}_{ee}$ -- CORRECT
- **Duality note** (page 46): Comparison between TF and TV transformation matrices (skew matrix position) correctly noted.

### 6. Worked Examples
- **Status**: PASS
- **Train and Car example** (Section 5.2.2, page 5): Three velocity calculations complete with solutions.
- **Two-link planar manipulator -- velocity propagation** (Section 5.6.3, pages 16-18): 4-step solution complete (links 1, 2, 3, and transformation to base frame).
- **Jacobian via derivatives** (Section 5.7.5, pages 24-25): Complete with partial derivatives, joint directions, resulting 6x2 Jacobian.
- **Jacobian via cross products** (Section 5.7.7, pages 29-31): Complete with position difference vectors, cross products, resulting 6x2 Jacobian.
- **Singularity example** (Section 5.8.1, page 42): Inverse Jacobian formula and joint rate expressions present.

### 7. Velocity Transformation Matrices
- **Status**: PASS
- **Same-frame** $TV_{b\to a}$ (Section 5.7.9, page 33): Complete derivation with skew-symmetric matrix.
- **Wrist-to-EE** $TV_{ee\to w}$ (Section 5.7.10, page 34): Complete derivation.
- **Cross-frame** ${}^{r_2}_{r_1}TV_{b\to a}$ (Section 5.7.13, page 37): Complete derivation with rotation matrix.
- **General frame change** ${}^{0}_{ref}TV_{ee\to w}$ (Section 5.7.14, page 38): Complete derivation.
- **Full forward velocity formula**: ${}^{0}\boldsymbol{V}_{ee} = TV_{ee\to w}\;{}^{0}\boldsymbol{J}_w\;\dot{\boldsymbol{q}}$ (Section 5.7.12, page 36) -- CORRECT

### 8. LaTeX Equations
- **Status**: PASS (minor formatting note)
- All equations use proper LaTeX with `$inline$` and `$$display$$`.
- Bold vectors use `\boldsymbol{}`.
- Frame superscripts/subscripts use `{}^{A}_{B}` notation correctly.
- Skew-symmetric matrices displayed as full 3x3 forms.
- Boxed key results use `\boxed{}`.
- 19 boxed equations found -- comprehensive coverage of key results.

### 9. Source Page Tags
- **Status**: PASS
- Format: `<!-- source: MSE492 - Chapter5-rev2.pdf#page=N -->` consistently used.
- All 48 pages tagged in main body.
- Key Equations Summary section also has source tags referencing original pages.

### 10. Hallucination Check
- **Status**: PASS
- All content traced to corresponding raw text pages.
- Section numbering matches source (5.1, 5.2, 5.3, 5.5, 5.6, 5.7, 5.8, 5.9 -- note: section 5.4 is absent in the original source material, not a gap in extraction).
- Figure descriptions are textual placeholders (properly marked with `> **[Figure: ...]**`), not fabricated diagrams.
- Notes and warnings are sourced from the original slides.
- The "Key Equations Summary" at the end (lines 874-961) is an extraction-added reference table, not in the original slides. This is acceptable per the MASTER_PLAN extraction guidelines ("Key Equations -- numbered reference list").

---

## Issues Found

### ISSUE-1: Inconsistency in ${}^{3}\boldsymbol{J}_3$ x-component (Source Error)
- **Severity**: LOW (source material error, faithfully reproduced)
- **Location**: Lines 280 vs 326 of extracted markdown
- **Detail**: The velocity propagation result (page 17, line 280) correctly shows ${}^{3}v_{3_x} = L_1 s_2 \dot{\theta}_1$. However, the Jacobian section (page 20, line 326) shows the top-left entry of ${}^{3}\boldsymbol{J}_3$ as $L_2 s_2$ instead of $L_1 s_2$.
- **Verification**: The raw text confirms the source PDF has `L2 s2` on page 20 (line 444 of raw text) and `L1 s2` on page 17 (line 371 of raw text).
- **Mathematical check**: From the propagation: ${}^{3}v_{3_x} = L_1 s_2 \dot{\theta}_1$, so the Jacobian entry should be $L_1 s_2$. The value $L_2 s_2$ on slide 20 is a **typo in the original source material**.
- **Action**: Flag for enrichment/verification stage. Do NOT modify the extraction (it faithfully represents the source). The verification agent should add a correction note.

### ISSUE-2: Raw text `s_1` vs `s_2` in inverse Jacobian denominator (Extraction Correct)
- **Severity**: NONE (extraction is correct despite garbled raw text)
- **Location**: Line 753 of extracted markdown; line 1052 of raw text
- **Detail**: The raw text shows `L1L2 s1` in the inverse Jacobian determinant (pdftotext rendering artifact), but the extraction correctly has `L_1 L_2 s_2`. The context of the slide (singularity at $\theta_2 = 0$ where $s_2 \to 0$) confirms `s_2` is correct. No action needed.

### ISSUE-3: Missing Section 5.4
- **Severity**: NONE (absent in source)
- **Detail**: Section numbering jumps from 5.3 to 5.5. Verified against raw text: the source PDF itself has no section 5.4. This is not content loss.

---

## Structural Summary

| Section | Topic | Pages | Status |
|---------|-------|-------|--------|
| 5.1 | Introduction | 3 | Complete |
| 5.2 | Notation (Position Vector, Angular Velocity) | 4-6 | Complete |
| 5.3 | Linear and Rotational Velocity of Rigid Bodies | 7-10 | Complete |
| 5.5 | Convention -- Motion of Robot Links | 11 | Complete |
| 5.6 | Velocity Propagation (Revolute + Prismatic + Example) | 12-18 | Complete |
| 5.7 | Jacobians and Forward Velocity Problem | 19-39 | Complete |
| -- | Method 1: Derivatives | 22-25 | Complete |
| -- | Method 2: Cross Products | 26-31 | Complete |
| -- | Wrist Jacobian and Remarks | 32-36 | Complete |
| -- | Velocity Transformations (4 variants) | 33-38 | Complete |
| -- | Jacobian ${}^{ref}\boldsymbol{J}_w$ | 35, 39 | Complete |
| 5.7.16 | Inverse Velocity Problem | 40 | Complete |
| 5.8 | Singularities (Definition, Example, Conditions, Arm, Wrist) | 41-45 | Complete |
| 5.9 | Static Forces (Force Transformation, Inverse Static Problem) | 46-47 | Complete |
| -- | Key Equations Summary | N/A | Complete (added by extraction) |

---

## Statistics
- **Extracted markdown**: 961 lines
- **Source tags**: 59 total (48 unique pages in body + 11 in summary)
- **Boxed equations**: 19
- **Worked examples**: 5 (Train/Car, Velocity Propagation 2-link, Jacobian via Derivatives, Jacobian via Cross Products, Singularity 2-link)
- **Figures described**: 13
- **Velocity transformation matrices**: 4 distinct forms

---

## Conclusion

The extraction of Chapter 5 is thorough and accurate. All 48 pages are represented with source tags. Both Jacobian methods, velocity propagation formulas, singularity analysis, and static force analysis are complete. The one identified issue (ISSUE-1: `L_2 s_2` vs `L_1 s_2` in ${}^{3}\boldsymbol{J}_3$) is a **typo in the original source material** that was faithfully reproduced -- it should be flagged for the verification stage but does not constitute an extraction error.
