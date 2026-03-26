# Verification Report: MSE492 Chapter 5 -- Jacobians: Velocities and Static Forces

**Verification Date**: 2026-03-05
**Verifier**: Content Verification Agent (Stage 4)
**Input**: `enrichment/MSE492_Chapter_5_enriched.md` (1199 lines)
**Output**: `verified/MSE492_Chapter_5.md` (1199 lines)

---

## Overall Verdict: PASS -- 1 correction applied (known slide typo)

---

## Verification Checklist

### 1. Velocity Notation and Differentiation Conventions
- **Status**: PASS
- Position vector derivative notation (${}^B V_Q = \frac{d}{dt}{}^B Q$): Correct.
- Frame change via rotation matrix (${}^A({}^B V_Q) = {}^A_B R \; {}^B V_Q$): Correct.
- Shorthand when frames match: Correct.
- Velocity of frame origin and angular velocity shorthand: Correct.

### 2. Linear Velocity Derivation (3 Cases)
- **Status**: PASS
- **Translation-only** (constant orientation, Section 5.3.2): $R$ factored out of derivative correctly. Boxed result correct.
- **Rotation-only** (coincident frames, Section 5.3.3): $V_Q = \Omega_B \times R \cdot Q$. Boxed result correct.
- **General case** (Section 5.3.4): Three-term sum ($V_{B_{ORG}} + R \cdot V_Q + \Omega_B \times R \cdot Q$). Boxed result correct.

### 3. Skew-Symmetric Matrix
- **Status**: PASS (with note)
- The file uses $\hat{P}$ notation for skew-symmetric matrices (hat notation over position vectors), not the $S(\omega)$ notation.
- The $\dot{R} = S(\omega)R$ identity is not explicitly stated in this chapter -- it is implicitly used via the cross-product form $\omega \times p$ throughout. This is consistent with the course slides which cover the $S(\omega)$ derivation earlier.
- All skew-symmetric matrices (Sections 5.7.9, 5.7.10, 5.7.13, 5.7.14, 5.9.1) have the correct standard form: $\hat{P} = [0, -P_z, P_y; P_z, 0, -P_x; -P_y, P_x, 0]$.

### 4. Velocity Propagation Formulas
- **Status**: PASS

**Revolute joints** (Section 5.6.1):
- Angular velocity: ${}^{i+1}\omega_{i+1} = {}^{i+1}_i R \; {}^i \omega_i + \dot\theta_{i+1} \hat{Z}_{i+1}$ -- CORRECT
- Linear velocity: ${}^{i+1} v_{i+1} = {}^{i+1}_i R ({}^i v_i + {}^i \omega_i \times {}^i P_{i+1})$ -- CORRECT
- Intermediate derivation (transformation from frame {i} to {i+1}) is present and correct.

**Prismatic joints** (Section 5.6.2):
- Angular velocity: ${}^{i+1}\omega_{i+1} = {}^{i+1}_i R \; {}^i \omega_i$ (no angular contribution from prismatic joint) -- CORRECT
- Linear velocity: ${}^{i+1} v_{i+1} = {}^{i+1}_i R ({}^i v_i + {}^i \omega_i \times {}^i P_{i+1}) + \dot{d}_{i+1} \hat{Z}_{i+1}$ -- CORRECT

### 5. Two-Link Planar Worked Example (4 Propagation Steps)
- **Status**: PASS (all 4 steps verified by independent computation)

**Step 1 (Link 1)**: Base fixed ($\omega_0 = v_0 = 0$, $P_1 = 0$). Results: $\omega_1 = [0,0,\dot\theta_1]^T$, $v_1 = [0,0,0]^T$. CORRECT.

**Step 2 (Link 2)**: Cross product $[0,0,\dot\theta_1]^T \times [L_1,0,0]^T = [0, L_1\dot\theta_1, 0]^T$. Rotation by ${}^2_1 R$ (transpose of ${}^1_2 R$): result $v_2 = [L_1 s_2 \dot\theta_1, L_1 c_2 \dot\theta_1, 0]^T$. CORRECT (verified matrix multiply entry-by-entry).

**Step 3 (Link 3 / end-effector)**: $R^3_2 = I$ (no rotation between frames 2 and 3). Cross product correctly computed. Result: $v_3 = [L_1 s_2 \dot\theta_1, L_1 c_2 \dot\theta_1 + L_2(\dot\theta_1 + \dot\theta_2), 0]^T$. CORRECT.

**Step 4 (Transform to frame {0})**: Used $R^0_3 = [c_{12}, -s_{12}; s_{12}, c_{12}]$. Verified via trig identity: $c_{12} s_2 - s_{12} c_2 = -s_1$ and $s_{12} s_2 + c_{12} c_2 = c_1$. Final result: $v_3^0 = [-L_1 s_1 \dot\theta_1 - L_2 s_{12}(\dot\theta_1+\dot\theta_2), L_1 c_1 \dot\theta_1 + L_2 c_{12}(\dot\theta_1+\dot\theta_2), 0]^T$. CORRECT.

### 6. Jacobian Methods
- **Status**: PASS

**Method 1 -- Derivatives** (Section 5.7.4-5.7.5):
- Forward kinematics position: $P_3 = [L_1 c_1 + L_2 c_{12}, L_1 s_1 + L_2 s_{12}, 0]^T$. CORRECT.
- $\partial P_3/\partial \theta_1 = [-L_1 s_1 - L_2 s_{12}, L_1 c_1 + L_2 c_{12}, 0]^T$. CORRECT.
- $\partial P_3/\partial \theta_2 = [-L_2 s_{12}, L_2 c_{12}, 0]^T$. CORRECT.
- Joint directions $\hat{Z}_1 = \hat{Z}_2 = [0,0,1]^T$ (both revolute with Z-axis out of plane). CORRECT.
- Full 6x2 Jacobian assembled correctly.

**Method 2 -- Cross Products** (Section 5.7.6-5.7.7):
- Position vectors from transforms: $P_1 = [0,0,0]^T$, $P_2 = [L_1 c_1, L_1 s_1, 0]^T$, $P_3 = [L_1 c_1 + L_2 c_{12}, L_1 s_1 + L_2 s_{12}, 0]^T$. CORRECT.
- Difference vectors: $P_{1\to3}$ and $P_{2\to3}$ correctly computed.
- Cross products $\hat{Z} \times P_{i\to3}$ correctly computed.
- Full 6x2 Jacobian matches Method 1. CONFIRMED.

**Column formulas** (Section 5.7.6):
- Revolute: Linear = $\hat{Z}_i \times P_{i\to ee}$, Angular = $\hat{Z}_i$. CORRECT.
- Prismatic: Linear = $\hat{Z}_j$, Angular = $0_{3\times1}$. CORRECT.

### 7. Velocity Transformation Matrices
- **Status**: PASS
- Same-frame $TV_{b\to a}$: Structure $[I, \hat{P}_{b\to a}; 0, I]$. CORRECT.
- Cross-frame ${}^{r_2}_{r_1}TV_{b\to a}$: Structure $[R, \hat{P} R; 0, R]$. CORRECT.
- Wrist-to-EE transformations (Sections 5.7.10, 5.7.14): Correctly derived. CORRECT.
- Full forward velocity: $V_{ee} = TV_{ee\to w} \cdot J_w \cdot \dot{q}$. CORRECT.

### 8. Singularity
- **Status**: PASS
- Condition: $\det(J) = 0$, or equivalently $|A| \cdot |C| = 0$ for the block-triangular wrist Jacobian. CORRECT.
- Physical interpretation: Loss of DOF, inverse Jacobian blow-up, infinite joint velocities. CORRECT.
- Two types: Main arm singularities ($|A|=0$) and wrist singularities ($|C|=0$). CORRECT.
- Worked example: Inverse Jacobian determinant is $L_1 L_2 s_2$ (independently verified). Singularity at $\theta_2 = 0$ ($s_2 \to 0$). CORRECT.
- Joint rate expressions for 1 m/s X-velocity: Independently verified against the inverse Jacobian formula. CORRECT.

### 9. Static Force: $\tau = J^T F$
- **Status**: PASS
- Conservation of power derivation (Section 5.9.2): $\tau^T \dot{q} = F^T v = F^T J \dot{q}$, true for all $\dot{q}$, therefore $\tau^T = F^T J$, transposing gives $\tau = J^T F$. CORRECT.
- Extended result showing equivalence across different Jacobians ($J_{ee}$, $J_w$, ${}^{ref}J_w$): CORRECT.
- Force-velocity duality note (TF vs TV structures): CORRECT.

### 10. Known Typo from Audit (Slide 20)
- **Status**: CORRECTED IN VERIFIED OUTPUT
- The enrichment file correctly flagged the typo (Section "[ENRICHMENT] Errata Note: Typo in Original Slides (Slide 20)").
- **What was wrong**: Slide 20 had $L_2 s_2$ in the (1,1) entry of ${}^3 J_3$ where the velocity propagation result requires $L_1 s_2$.
- **Corrections applied in verified output**:
  1. Line 387: 2x2 Jacobian ${}^3 J_3$ -- changed $L_2 s_2$ to $L_1 s_2$ in both the velocity vector and Jacobian matrix (2 instances).
  2. Line 405: 3x2 Jacobian ${}^3 J_3$ (including angular velocity) -- changed $L_2 s_2$ to $L_1 s_2$ in both the velocity vector and Jacobian matrix (2 instances).
  3. Errata note updated to indicate the correction has been applied in this verified version.
- **Total**: 4 instances of $L_2 s_2 \to L_1 s_2$ corrected, errata note updated.

### 11. Enrichment Quality
- **Status**: PASS

**Conservation of power proof** (Section [ENRICHMENT] Proof: Conservation of Power and the Force-Velocity Duality):
- 5-step proof is logically sound and complete.
- Correctly invokes the "for all $\dot{q}$" argument to drop joint velocities from both sides.
- Physical interpretation and "why $J^T$ not $J^{-1}$" note are accurate.

**TV/TF duality proof** (Section [ENRICHMENT] Proof: The Velocity and Force Transformation Matrices Are Transposes of Each Other):
- Correctly shows $TF_{b\to a} = (TV_{b\to a})^{-\top}$ via block matrix inversion and skew-symmetric transpose property ($\hat{P}^T = -\hat{P}$).
- CORRECT.

**Manipulability ellipsoid** (Section [ENRICHMENT] Bonus Concept):
- Construction from unit joint-velocity sphere mapped through Jacobian: CORRECT.
- Singular values determine principal axes: CORRECT.
- Yoshikawa's manipulability index $w = \sqrt{\det(JJ^T)}$: CORRECT.
- Condition number $\kappa = \sigma_{max}/\sigma_{min}$: CORRECT.
- Force ellipsoid as dual (governed by $J^{-T}$): CORRECT.
- Collapse at singularity: CORRECT.

**Videos and external resources**: 5 video/resource sections with URLs. Content descriptions are accurate and relevant.

---

## Cross-Reference Consistency

- Notation is consistent with earlier chapters (bold vectors, frame superscript/subscript convention, $c_1 = \cos\theta_1$ shorthand, etc.).
- Forward references: Chapter 6 (Newton-Euler dynamics) mentioned in velocity propagation enrichment. Appropriate.
- Prerequisites: Rotation matrices, homogeneous transforms, and DH parameters from Chapters 2-3 are referenced implicitly. No broken cross-references.

---

## Corrections Applied

| Location | Original (from slides) | Corrected | Reason |
|----------|----------------------|-----------|--------|
| Section 5.7.2, 2x2 ${}^3 J_3$ (line 387) | $L_2 s_2$ (velocity) and $L_2 s_2$ (Jacobian entry) | $L_1 s_2$ | Typo in original slide 20; propagation gives $L_1 s_2$ |
| Section 5.7.2, 3x2 ${}^3 J_3$ (line 405) | $L_2 s_2$ (velocity) and $L_2 s_2$ (Jacobian entry) | $L_1 s_2$ | Same typo repeated with angular velocity included |

No other errors found. All other mathematical content verified correct.

---

## Summary

Chapter 5 covers velocity kinematics comprehensively: notation, three cases of linear velocity, velocity propagation (revolute and prismatic), two Jacobian computation methods (derivatives and cross products), velocity transformation matrices, singularity analysis, and static force duality. The enrichment adds two rigorous proofs, five video resources, and the manipulability ellipsoid concept -- all verified accurate.

The sole correction is the known slide typo ($L_2 s_2 \to L_1 s_2$ in ${}^3 J_3$), which was already flagged during Stage 2 extraction audit and noted in the enrichment errata section. This has now been corrected in the verified output.
