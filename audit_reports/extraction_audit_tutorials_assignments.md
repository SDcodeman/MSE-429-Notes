# Extraction Audit: Tutorials, Assignments, and Midterm
**Date**: 2026-03-05
**Auditor**: Extraction Audit Agent (Stage 2)
**Method**: Cross-referenced each extracted markdown against corresponding raw_text file and original PDF metadata. PDF image rendering was unavailable (pdftoppm not installed), so audit relies on raw text cross-checks, structural validation, and mathematical consistency checks.

---

## Tutorial 1: CONDITIONAL PASS
- **Source**: `Slides/MSE429 - Tutorial 1 (Solutions).pdf` (5 pages)
- **Extraction**: `extracted/MSE429_Tutorial_1.md` (241 lines, 11 source tags)
- **Problems expected**: 5, **found**: 5 (1.1-1.5)
- **Source tags**: 11 tags covering all 5 pages. Correct page references.
- **Solutions present**: Yes, all 5 problems have complete solutions.
- **LaTeX**: Generally well-formed. Rotation matrix notation, cross products, dot products all rendered correctly.

### Issues:
1. **Problem 1.1 sign ambiguity**: Raw text (pdftotext) shows all matrix entries as positive, but extraction has negative signs on R(2,1)=0.4755, R(2,3)=-0.7759, R(3,1)=-0.30902. The extraction is likely CORRECT (the matrix must satisfy det(R)=1 and orthogonality), and pdftotext is known to drop minus signs from handwritten PDFs. However, there is an internal inconsistency: line 9 shows R(2,1)=0.4755 (positive) but line 21 uses (-0.4755)^2 with a negative sign. One of these is wrong.
2. **Problem 1.4 (wedge transforms)**: Extraction quality is poor.
   - Lines 158: Initial all-zeros matrix followed by "Reading from the image more carefully" self-correction. This workflow artifact should not be in the final extraction.
   - Lines 168-172: Same "Reading more carefully" correction pattern for B_C_T.
   - B_C_T matrix (line 172) has first column all zeros and third row nearly all zeros -- this makes the rotation sub-matrix singular, which is invalid for a rotation matrix.
   - A_C_T matrix (line 178) has first column all zeros -- same singularity issue.
   - C_A_T matrix (line 182) is shown as a 3x4 matrix instead of 4x4 (missing bottom row).
   - **Verdict**: Problem 1.4 matrices need re-extraction. The handwritten wedge geometry was not accurately captured.
3. **Problem 1.5**: Rotation matrix (line 212) has overline notation `$0.5\overline{46}1$` which is unusual -- this was then corrected on line 216 without the overline. Minor formatting artifact.

### Recommendation: Re-extract Problem 1.4 matrices from the PDF (needs pdftoppm/image inspection). Other problems are acceptable.

---

## Tutorial 3: CONDITIONAL PASS
- **Source**: `Slides/MSE429 - Tutorials 3 (Solutions).pdf` (6 pages)
- **Extraction**: `extracted/MSE429_Tutorial_3.md` (341 lines, 14 source tags)
- **Problems expected**: 4, **found**: 4 (3.1-3.4)
- **Source tags**: 14 tags covering all 6 pages. Page references correct.
- **Solutions present**: Yes, all 4 problems with complete step-by-step solutions.
- **LaTeX**: Mostly well-formed. DH parameter table is clean. Stanford manipulator transforms are extensive.

### Issues:
1. **Problem 3.1 forward kinematics matrix** (line 21): The ${}^{0}_{3}T$ matrix has suspicious entries:
   - Position (1,4): `$C_1(C_2L_1 + L_1)$` -- the first `L_1` should likely be `L_2` (i.e., `$C_1(C_2L_2 + L_1)$`). For a 3-link planar arm, the x-position should involve both link lengths.
   - Position (2,4): `$S_1(C_1L_1 + L_1)$` -- `C_1` should be `C_2` and the first `L_1` should be `L_2`.
   - Position (1,2): `$-C_{12}S_3$` seems wrong for a 3R planar manipulator; expected `$-S_{123}$`.
   - These may be OCR/extraction errors from handwritten content, or they may faithfully reproduce errors in the original tutorial solution. Flag for Stage 4 mathematical verification.
2. **Problem 3.3 (Stanford FK)**: The rotation matrix elements (lines 174-190) are extremely complex. Some elements use `d_3` inconsistently (line 182: `$S_1 d_3(-S_5 S_6)$` -- `d_3` appears in a rotation matrix element, which is wrong; it should not depend on `d_3`). Likely an extraction transcription error.
3. **Problem 3.4 numerical solutions table** (lines 333-339): Has 5 rows for variables but only 4 solutions listed, and the table is missing $\theta_6$ values. The original solution may have been truncated or the table incomplete in the source.

### Recommendation: Flag Problem 3.1 matrix and Problem 3.3 rotation elements for Stage 4 math verification. Problem 3.4 table incompleteness should be checked against PDF.

---

## Tutorial 4: PASS
- **Source**: `Slides/MSE429 - Tutorials 4 (Solutions).pdf` (6 pages)
- **Extraction**: `extracted/MSE429_Tutorial_4.md` (260 lines, 14 source tags)
- **Problems expected**: 5, **found**: 5 (4.1-4.5)
- **Source tags**: 14 tags covering all 6 pages. Page references correct.
- **Solutions present**: Yes, all 5 problems with complete derivations.
- **LaTeX**: Well-formed. Velocity propagation equations are clearly structured. Cross products and matrix multiplications look correct.

### Issues:
1. **Problem 4.3** (lines 82-103): Solution is abbreviated compared to Problems 4.1 and 4.2 -- only the general formula is stated without full numerical computation. This may faithfully reflect the original (which may have been a conceptual problem rather than a numerical one).
2. **Problem 4.5** (lines 246-260): Some intermediate results are shown with placeholder dots (`$\cdot$`) rather than full values (lines 248, 252). This is likely because the handwritten solution was partially illegible or abbreviated. The final result (line 260) is provided.
3. Minor: Line 155 has `$L_1 S_2 \dot{\theta}_1$` in the x-component of ${}^{2}\vec{v}_2$ -- this should be checked (for the rotation `2_1_R * cross product`, the x-component should be `$L_1 S_2 \dot{\theta}_1$`, which is consistent with `S_2` from the (1,2) entry of `2_1_R`). Looks correct.

### Recommendation: No blocking issues. The abbreviated sections faithfully reflect the source content.

---

## Tutorial 5: PASS
- **Source**: `Slides/MSE429 - Tutorials 5 (Solutions).pdf` (9 pages)
- **Extraction**: `extracted/MSE429_Tutorial_5.md` (364 lines, 17 source tags)
- **Problems expected**: 6, **found**: 6 (5.1-5.6)
- **Source tags**: 17 tags covering all 9 pages. Page references correct.
- **Solutions present**: Yes, all 6 problems with extensive Jacobian derivations.
- **LaTeX**: Well-formed. The Jacobian matrices, partial derivatives, and cross-product computations are clearly structured.

### Issues:
1. **Problem 5.4** (lines 216-234): The extraction contains "Wait" self-correction notes (lines 218, 224, 228) where the extraction agent second-guessed its reading. These workflow artifacts should ideally be cleaned up, but the final values provided are what matters.
2. **Problem 5.4 ${}^{3}\hat{Z}_4$**: Shows three different values (lines 222, 226, 230) due to self-correction. The final value `$\begin{Bmatrix} -S_4 \\ C_4 \\ 0 \end{Bmatrix}$` on line 230 is the one that should be used, and this is consistent with the DH structure.
3. **Problem 5.5**: The inverse `$[C]^{-1}$` is left as `$\begin{bmatrix} \cdots \end{bmatrix}$` (line 297) -- the full matrix was likely illegible in the handwritten solution.
4. **Problem 5.6**: The $\tau_4$ expression (line 358) is `$\tau_4 = ({}^{3}m_x \cdot 0)$` which simplifies to zero. The note at line 364 provides the physical explanation.

### Recommendation: Clean up "Wait" self-correction artifacts in a future pass. No content-blocking issues.

---

## Assignment 1: PASS
- **Source**: `Slides/MSE 429 - Assignment 1 (Solutions).pdf` (6 pages)
- **Extraction**: `extracted/MSE429_Assignment_1.md` (240 lines, 11 source tags)
- **Problems expected**: 7, **found**: 7 (Problems 1-7)
- **Source tags**: 11 tags covering all 6 pages. Page references correct.
- **Solutions present**: Yes, all 7 problems with full solutions.
- **LaTeX**: Well-formed. Transformation matrices, Euler angle formulas, rotation matrices all properly formatted.

### Issues:
1. **Sign discrepancies with raw text**: The raw text (pdftotext) shows some matrix entries without negative signs that appear in the extraction (e.g., Problem 4 transform: raw text `0.963` vs extracted `-0.963`; raw text `0.298` vs extracted `-0.298`). The extracted version is likely correct -- pdftotext frequently drops minus signs, and the extracted rotation matrix must satisfy orthogonality constraints.
2. **Problem 4 solution ambiguity** (lines 159-166): There appears to be a self-correction where the intermediate result `$\begin{bmatrix} -4.89 \\ 2.11 \\ 3.60 \end{bmatrix}$` is first shown with the translation added separately, then the "Wait" comment corrects it. The final answer should clarify whether the translation is already included. The final answer on line 167 presents the result as including the translation.
3. **Problem 1**: The extracted matrices use decimal approximations (e.g., `-0.8000`, `0.6000`) which match the expected values for a 3-4-5 right triangle ($\cos(\arctan(4/3)) = 3/5 = 0.6$, $\sin(\arctan(4/3)) = 4/5 = 0.8$). However, some matrix entries show `-0.0000` which should just be `0`.

### Recommendation: No blocking issues. Minor cosmetic cleanup of `-0.0000` entries could be done in Stage 4.

---

## Assignment 2: PASS
- **Source**: `Slides/MSE 429 - Assignment 2 (Solutions)_rubric.pdf` (6 pages)
- **Extraction**: `extracted/MSE429_Assignment_2.md` (221 lines, 7 source tags)
- **Problems expected**: 6, **found**: 6 (Problems 1-6)
- **Source tags**: 7 tags (one per page plus title). Correct page references.
- **Solutions present**: Yes, all 6 problems with solutions. Rubric marks are preserved.
- **LaTeX**: Well-formed. DH parameter tables are clean. Transformation matrices properly formatted.

### Issues:
1. **Problem 1 ${}^{1}_{2}T$ matrix** (line 31): Shows `L_1` in position (1,4), but the DH table has `a_1 = 0` for row i=2. By the standard DH formula, the (1,4) entry should be `a_{i-1} = a_1 = 0`. The presence of `L_1` here is inconsistent with the DH table. However, looking at Problem 1's DH table column `a_{i-1}`: row i=2 has `a_1 = 0`, and row i=3 has `a_2 = L_1`. The `L_1` in the `1_2_T` matrix may be an error in either the extraction or the original solution. Flag for Stage 4 verification.
2. **Problem 1 final ${}^{0}_{3}T$ matrix** (line 41): Shows `$L_1 c_1 + L_2 c_1 c_2$` in position (1,4). If `a_1 = 0` and `a_2 = L_1`, then the position should not include `L_1` in the way shown. This may trace back to the same DH table issue above.
3. **Problems 4 and 5**: Solutions are primarily diagram/frame-assignment problems. The extraction captures the frame descriptions and sign conventions but cannot reproduce the actual frame drawings. This is expected and acceptable.
4. **Problem 3 rubric**: Rubric marks (5, 5, 10, 15, etc.) are preserved throughout, matching the raw text values.

### Recommendation: Flag Problem 1 DH parameter vs. transformation matrix inconsistency for Stage 4. Otherwise no blocking issues.

---

## Midterm 1: PASS
- **Source**: `Slides/MSE 429 - Midterm 1.pdf` (6 pages)
- **Extraction**: `extracted/MSE429_Midterm_1.md` (302 lines, 17 source tags)
- **Problems expected**: 3, **found**: 3 (Problems 1-3)
- **Source tags**: 17 tags covering all 6 pages. Page references correct.
- **Solutions present**: Yes, all 3 problems with complete solutions including point values/rubric.
- **LaTeX**: Well-formed. DH parameters, Pieper's method derivation, Euler angle extraction all properly formatted.

### Issues:
1. **Problem 3c $\theta_4$ extraction formula** (line 296): The extraction has `$\text{atan2}(r_{23}, r_{13}) = 20.8°$` but the raw text shows `a tan 2(r23, r31) = 20.8`. The second argument differs: extracted `r_{13}` vs raw text `r_{31}`. Mathematical analysis of the ZYZ Euler angle structure confirms the extraction is CORRECT: from `${}^{3}R_6$`, element (1,3) = $-c_4 s_5$ and (2,3) = $-s_4 s_5$, so $\theta_4 = \text{atan2}(-r_{23}, -r_{13})$ or $\text{atan2}(r_{23}, r_{13})$. The raw text `r31` is a pdftotext subscript parsing error.
2. **Problem 1 DH table**: Matches the raw text exactly:
   - Row 1: alpha_0=0, a_0=0, theta_1, d_1=L_1
   - Row 2: alpha_1=90, a_1=0, theta_2, d_2=0
   - Row 3: alpha_2=90, a_2=L_2, theta_3=0, d_3
   - Row ee: alpha_3=0, a_3=L_3, theta=0, d=0
3. **Problem 2 Pieper's method**: All key formulas ($f_1$, $f_2$, $f_3$, $k_3$, quadratic for $u$, final $\theta_1$, $\theta_2$, $d_3$ expressions) match the raw text. Point values are correctly noted.
4. **Problem 3 numerical matrices**: ${}^{0}R_6$ and ${}^{0}R_3$ numerical values match the raw text. The computed ${}^{3}R_6$ result matches.

### Recommendation: No blocking issues. The one subscript discrepancy (r13 vs r31) is a raw text parsing artifact, not an extraction error.

---

## Overall Verdict: CONDITIONAL PASS

### Summary Table

| File | Problems | Source Tags | Pages | Verdict |
|------|----------|-------------|-------|---------|
| Tutorial 1 | 5/5 | 11 | 5/5 | CONDITIONAL PASS |
| Tutorial 3 | 4/4 | 14 | 6/6 | CONDITIONAL PASS |
| Tutorial 4 | 5/5 | 14 | 6/6 | PASS |
| Tutorial 5 | 6/6 | 17 | 9/9 | PASS |
| Assignment 1 | 7/7 | 11 | 6/6 | PASS |
| Assignment 2 | 6/6 | 7 | 6/6 | PASS |
| Midterm 1 | 3/3 | 17 | 6/6 | PASS |

### Blocking Issues (require re-extraction or correction):
1. **Tutorial 1, Problem 1.4**: Wedge transform matrices have singular rotation sub-matrices (columns of zeros) and a 3x4 matrix instead of 4x4. Re-extraction from PDF images needed.
2. **Tutorial 3, Problem 3.1**: Forward kinematics matrix has likely L_1/L_2 transcription errors and inconsistent element notation.

### Non-Blocking Issues (flag for Stage 4 verification):
1. Tutorial 1 Problem 1.1: Sign inconsistency in R(2,1) between matrix definition and row magnitude check.
2. Tutorial 3 Problem 3.3: `d_3` appears in rotation matrix elements (should be position-only).
3. Tutorial 3 Problem 3.4: Numerical solutions table missing $\theta_6$ and potentially incomplete.
4. Tutorial 5 Problems 5.1/5.4: "Wait" self-correction artifacts in text (cosmetic).
5. Assignment 2 Problem 1: DH table vs `1_2_T` matrix inconsistency (L_1 in wrong position).

### Notes on Raw Text Limitations:
- pdftotext consistently drops minus signs from handwritten PDFs. This affects Tutorials 1, 3, 4 (handwritten solutions) and partially Assignment 1. The extraction agent's PDF image reads are more reliable than pdftotext for signs.
- pdftotext garbles subscripts (e.g., `r31` vs `r13` in Midterm 1). Extraction agent's subscripts are mathematically consistent and preferred.
- Tutorial solutions are handwritten and image-heavy. Without pdftoppm for page-by-page image inspection, some matrix values could not be independently verified. Install poppler (`brew install poppler`) for future audits.
