# Chapter 2: Spatial Descriptions and Transformation

<!-- source: MSE429 - Chapter2.pdf#page=1 -->

---

## Overview

<!-- source: MSE429 - Chapter2.pdf#page=2 -->

This chapter covers the following topics:

- Descriptions of position vectors and orientations
- Definition of frames and mapping
- Definition of operators for translations, rotations, and transformations
- Summary of interpretations
- Transform equations

---

## 2.2 Description of a Position

<!-- source: MSE429 - Chapter2.pdf#page=3 -->

### Definitions

**Position Vector**: With respect to a reference frame, any point can be described by a $3 \times 1$ position vector.

$${}^{A}P = \begin{bmatrix} p_x \\ p_y \\ p_z \end{bmatrix}$$

The leading superscript indicates the coordinate system to which the vector is referenced to.

> **[Figure: 3D coordinate frame {A} with axes $\hat{X}_A$, $\hat{Y}_A$, $\hat{Z}_A$ and a position vector ${}^{A}P$ pointing from the origin to a point in space. The vector components are shown as dashed projections onto each axis.]** (page 3)

---

## 2.2 Description of an Orientation

<!-- source: MSE429 - Chapter2.pdf#page=4 -->

### Definitions

**Rotation Matrix**: Rotation matrices are used to describe the projections of the moving frame onto the axes of the fixed frame.

Consider $\{A\}$ be the fixed reference frame and $\{B\}$ be the moving frame with unit vectors $\hat{X}_B$, $\hat{Y}_B$, and $\hat{Z}_B$. Let the unit vectors of frame $\{B\}$ projected on $\{A\}$ become ${}^{A}\hat{X}_B$, ${}^{A}\hat{Y}_B$, and ${}^{A}\hat{Z}_B$.

The relative orientation of $\{B\}$ with respect to $\{A\}$ is defined by a $3 \times 3$ orthogonal matrix as:

$${}^{A}_{B}R = \begin{bmatrix} {}^{A}\hat{X}_B & {}^{A}\hat{Y}_B & {}^{A}\hat{Z}_B \end{bmatrix} = \begin{bmatrix} r_{11} & r_{12} & r_{13} \\ r_{21} & r_{22} & r_{23} \\ r_{31} & r_{32} & r_{33} \end{bmatrix}$$

> **[Figure: A robotic arm (2-link manipulator) is shown with two coordinate frames {A} (fixed base frame) and {B} (attached to the end-effector). The axes of {B} are shown projected onto the axes of {A} to illustrate the rotation matrix construction.]** (page 4)

---

### 2.2 Description of an Orientation -- Direct Cosine Representation

<!-- source: MSE429 - Chapter2.pdf#page=5 -->

The projection of each axis of moving frame $\{B\}$ onto the axes of the fixed frame $\{A\}$ can be represented by direction cosines.

For example, axis $\hat{Y}_B$ projected onto the axes $\hat{X}_A$, $\hat{Y}_A$, and $\hat{Z}_A$ requires knowing the angles $\alpha_y$, $\beta_y$, and $\gamma_y$.

$${}^{A}\hat{Y}_B = \begin{bmatrix} v_x \\ v_y \\ v_z \end{bmatrix} = \begin{bmatrix} \cos(\alpha_y) \\ \cos(\beta_y) \\ \cos(\gamma_y) \end{bmatrix}$$

Since all the axes are unit vectors, the dot product definition reduces to:

$$\cos(\alpha_y) = \frac{\hat{X}_A \cdot \hat{Y}_B}{\|\hat{X}_A\| \|\hat{Y}_B\|} = \hat{X}_A \cdot \hat{Y}_B$$

where $\|\hat{X}_A\| = \|\hat{Y}_B\| = 1$.

> **[Figure: 3D diagram showing the axis $\hat{Y}_B$ of frame {B} being projected onto the three axes of frame {A}. Three angles $\alpha_y$, $\beta_y$, and $\gamma_y$ are labeled between $\hat{Y}_B$ and the axes $\hat{X}_A$, $\hat{Y}_A$, $\hat{Z}_A$ respectively. Frame {A} is shown with its axes and frame {B} is shown rotated relative to it. Credit: Dr. F. Firmani.]** (page 5)

<!-- source: MSE429 - Chapter2.pdf#page=6 -->

Therefore, the rotation matrix:

$${}^{A}_{B}R = \begin{bmatrix} {}^{A}\hat{X}_B & {}^{A}\hat{Y}_B & {}^{A}\hat{Z}_B \end{bmatrix} = \begin{bmatrix} u_x & v_x & w_x \\ u_y & v_y & w_y \\ u_z & v_z & w_z \end{bmatrix}$$

can be defined in terms of direction cosines as:

$${}^{A}_{B}R = \begin{bmatrix} \cos(\alpha_x) & \cos(\alpha_y) & \cos(\alpha_z) \\ \cos(\beta_x) & \cos(\beta_y) & \cos(\beta_z) \\ \cos(\gamma_x) & \cos(\gamma_y) & \cos(\gamma_z) \end{bmatrix}$$

or in terms of dot products:

$${}^{A}_{B}R = \begin{bmatrix} \hat{X}_A \cdot \hat{X}_B & \hat{X}_A \cdot \hat{Y}_B & \hat{X}_A \cdot \hat{Z}_B \\ \hat{Y}_A \cdot \hat{X}_B & \hat{Y}_A \cdot \hat{Y}_B & \hat{Y}_A \cdot \hat{Z}_B \\ \hat{Z}_A \cdot \hat{X}_B & \hat{Z}_A \cdot \hat{Y}_B & \hat{Z}_A \cdot \hat{Z}_B \end{bmatrix}$$

---

### 2.2 Description of an Orientation -- Properties

<!-- source: MSE429 - Chapter2.pdf#page=7 -->

### Properties

**Transpose Property**: The description of frame $\{A\}$ relative to $\{B\}$ is given by the transpose of ${}^{A}_{B}R$, that is:

$${}^{B}_{A}R = {}^{A}_{B}R^T$$

**Proof of Orthogonality**:

$${}^{A}_{B}R^T \; {}^{A}_{B}R = \begin{bmatrix} {}^{A}\hat{X}_B^T \\ {}^{A}\hat{Y}_B^T \\ {}^{A}\hat{Z}_B^T \end{bmatrix} \begin{bmatrix} {}^{A}\hat{X}_B & {}^{A}\hat{Y}_B & {}^{A}\hat{Z}_B \end{bmatrix} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} = I_3$$

This follows because the columns of the rotation matrix are mutually orthogonal unit vectors: $\hat{X}_B \cdot \hat{Y}_B = 0$, $\hat{X}_B \cdot \hat{X}_B = 1$, etc.

Hence:

$${}^{A}_{B}R = {}^{B}_{A}R^{-1} = {}^{B}_{A}R^T$$

### Key Equations

- ${}^{A}_{B}R^T = {}^{A}_{B}R^{-1}$ (rotation matrices are orthogonal)
- ${}^{B}_{A}R = {}^{A}_{B}R^T$ (inverse relationship between frames)

---

## 2.2 Description of a Frame

<!-- source: MSE429 - Chapter2.pdf#page=8 -->

### Definitions

**Frame**: A frame is a set of four vectors giving position and orientation information. This description can be thought of as a position vector and a rotation matrix.

For example, frame $\{B\}$ is described by ${}^{A}_{B}R$ and ${}^{A}P_{B_{ORG}}$, where ${}^{A}P_{B_{ORG}}$ is the vector that locates the origin of the frame $\{B\}$.

$$\{B\} = \{{}^{A}_{B}R, \; {}^{A}P_{B_{ORG}}\}$$

> **[Figure: Three coordinate frames {A}, {B}, and {C} are shown in 3D space. Each frame has its own set of three orthogonal axes ($\hat{X}$, $\hat{Y}$, $\hat{Z}$). The frames are at different positions and orientations. Position vectors connect the origins of the frames. This illustrates that a frame fully specifies both position and orientation.]** (page 8)

---

## 2.3 Mapping

<!-- source: MSE429 - Chapter2.pdf#page=9 -->

### Definitions

**Mapping**: Mapping is used in robotics to change the descriptions of quantities in terms of various reference coordinate systems, from frame to frame.

Types of mapping:
- **Translational mapping**
- **Rotational mapping**
- **General mapping**

---

### 2.3 Mapping -- Translational

<!-- source: MSE429 - Chapter2.pdf#page=10 -->

Consider the position defined by the vector ${}^{B}P$ as shown. Let us express it in space in terms of frame $\{A\}$, that is ${}^{A}P$. Note that $\{A\}$ and $\{B\}$ have the same orientation. Given that vector ${}^{A}P_{B_{ORG}}$ locates the origin of $\{B\}$ with respect to $\{A\}$, we have:

$${}^{A}P = {}^{B}P + {}^{A}P_{B_{ORG}}$$

> **[Figure: Two coordinate frames {A} and {B} with the same orientation (axes parallel) but different origins. Frame {A} is at one location and frame {B} is displaced from it. A point P is shown with vector ${}^{B}P$ from the origin of {B} to the point, vector ${}^{A}P_{B_{ORG}}$ from {A}'s origin to {B}'s origin, and the resultant vector ${}^{A}P$ from {A}'s origin to the point. The shaded region highlights the vector addition triangle.]** (page 10)

### Key Equations

$${}^{A}P = {}^{B}P + {}^{A}P_{B_{ORG}}$$

---

### 2.3 Mapping -- Rotational

<!-- source: MSE429 - Chapter2.pdf#page=11 -->

Let the two frames $\{A\}$ and $\{B\}$ share the same origin, but with different orientation. Rotation matrix ${}^{A}_{B}R$ describes $\{B\}$ relative to $\{A\}$.

It can be shown that any point expressed in $\{B\}$ can be expressed in $\{A\}$ using the rotational mapping:

$${}^{A}P = {}^{A}_{B}R \; {}^{B}P$$

> **[Figure: Two coordinate frames {A} and {B} sharing the same origin but with different orientations. Frame {A} has axes $\hat{X}_A$, $\hat{Y}_A$, $\hat{Z}_A$ and frame {B} has axes $\hat{X}_B$, $\hat{Y}_B$, $\hat{Z}_B$ rotated relative to {A}. A point P is shown with vector ${}^{B}P$ expressed in frame {B}. The rotation matrix maps this to ${}^{A}P$ in frame {A}.]** (page 11)

### Key Equations

$${}^{A}P = {}^{A}_{B}R \; {}^{B}P$$

---

### 2.3 Mapping -- General Mapping

<!-- source: MSE429 - Chapter2.pdf#page=12 -->

General mapping involves both rotation and translation. Let the two frames $\{A\}$ and $\{B\}$ have different origins and different orientation.

The general transformation mapping of a vector from its description in one frame to a description in a second frame is:

$${}^{A}P = {}^{A}_{B}R \; {}^{B}P + {}^{A}P_{B_{ORG}}$$

> **[Figure: Two coordinate frames {A} and {B} with different origins and different orientations in 3D space. A point P is shown with vector ${}^{B}P$ from {B}'s origin, vector ${}^{A}P_{B_{ORG}}$ from {A}'s origin to {B}'s origin, and vector ${}^{A}P$ from {A}'s origin to the point. The shaded triangle shows the vector relationship: first rotate ${}^{B}P$ into {A}'s orientation, then add the translation.]** (page 12)

---

### 2.3 Mapping -- Homogeneous Transform

<!-- source: MSE429 - Chapter2.pdf#page=13 -->

### Definitions

**Homogeneous Transform**: It is desirable to express the general mapping as an operator in matrix form via transformation matrix ${}^{A}_{B}T$.

$${}^{A}P = {}^{A}_{B}T \; {}^{B}P$$

Combining both position vector and rotation matrices into one operator:

$$\begin{bmatrix} {}^{A}P \\ 1 \end{bmatrix} = \begin{bmatrix} {}^{A}_{B}R & {}^{A}P_{B_{ORG}} \\ 0 \;\; 0 \;\; 0 & 1 \end{bmatrix} \begin{bmatrix} {}^{B}P \\ 1 \end{bmatrix}$$

In which:
- A "1" is added as the last element of the $4 \times 1$ vector
- A row $\begin{bmatrix} 0 & 0 & 0 & 1 \end{bmatrix}$ is added as the last row of the $4 \times 4$ matrix

### Key Equations

$${}^{A}_{B}T = \begin{bmatrix} {}^{A}_{B}R & {}^{A}P_{B_{ORG}} \\ 0 \;\; 0 \;\; 0 & 1 \end{bmatrix}$$

---

## 2.4 Mapping with Homogeneous Transforms

<!-- source: MSE429 - Chapter2.pdf#page=14 -->

Homogeneous transforms can be used for mapping:

**i. Translation mapping** (${}^{A}_{B}R = I_3$):

$$\begin{bmatrix} {}^{A}P \\ 1 \end{bmatrix} = \begin{bmatrix} I_3 & {}^{A}P_{B_{ORG}} \\ 0 \;\; 0 \;\; 0 & 1 \end{bmatrix} \begin{bmatrix} {}^{B}P \\ 1 \end{bmatrix}$$

**ii. Rotational mapping** (${}^{A}P_{B_{ORG}} = \begin{bmatrix} 0 & 0 & 0 \end{bmatrix}^T$):

$$\begin{bmatrix} {}^{A}P \\ 1 \end{bmatrix} = \begin{bmatrix} {}^{A}_{B}R & \begin{matrix} 0 \\ 0 \\ 0 \end{matrix} \\ 0 \;\; 0 \;\; 0 & 1 \end{bmatrix} \begin{bmatrix} {}^{B}P \\ 1 \end{bmatrix}$$

**iii. General mapping**:

$$\begin{bmatrix} {}^{A}P \\ 1 \end{bmatrix} = \begin{bmatrix} {}^{A}_{B}R & {}^{A}P_{B_{ORG}} \\ 0 \;\; 0 \;\; 0 & 1 \end{bmatrix} \begin{bmatrix} {}^{B}P \\ 1 \end{bmatrix}$$

---

## 2.6 Transformation Arithmetic

<!-- source: MSE429 - Chapter2.pdf#page=15 -->

Homogeneous transforms have the following properties:

### Properties

**i. Compound Transformations**

$${}^{0}_{n}T = {}^{0}_{1}T \; {}^{1}_{2}T \; {}^{2}_{3}T \cdots {}^{n-2}_{n-1}T \; {}^{n-1}_{n}T = \begin{bmatrix} {}^{0}_{n}R & {}^{0}P_{n_{ORG}} \\ 0 \;\; 0 \;\; 0 & 1 \end{bmatrix}$$

where ${}^{0}_{n}R = {}^{0}_{1}R \; {}^{1}_{2}R \cdots {}^{n-1}_{n}R$

**ii. Inversion of a Homogeneous Transform**

$${}^{A}_{B}T^{-1} = \begin{bmatrix} {}^{A}_{B}R^T & -{}^{A}_{B}R^T \; {}^{A}P_{B_{ORG}} \\ 0 \;\; 0 \;\; 0 & 1 \end{bmatrix} = {}^{B}_{A}T$$

### Key Equations

- Compound: ${}^{0}_{n}T = {}^{0}_{1}T \; {}^{1}_{2}T \; {}^{2}_{3}T \cdots {}^{n-1}_{n}T$
- Inverse: ${}^{A}_{B}T^{-1} = {}^{B}_{A}T$
- The inverse uses the transpose of the rotation part and negates the translated position: $-{}^{A}_{B}R^T \; {}^{A}P_{B_{ORG}}$

---

## 2.7 Transform Equations

<!-- source: MSE429 - Chapter2.pdf#page=16 -->

Frame $\{D\}$ can be expressed as products of transformations in two different ways.

$${}^{U}_{D}T = {}^{U}_{A}T \; {}^{A}_{D}T = {}^{U}_{B}T \; {}^{B}_{C}T \; {}^{C}_{D}T$$

> **[Figure: Five coordinate frames {U}, {A}, {B}, {C}, and {D} are shown in 3D space. Frame {U} is the universal/base frame. Two transformation chains are illustrated: one path goes from {U} to {A} to {D} directly, while the other goes from {U} to {B} to {C} to {D}. Both paths arrive at the same frame {D}, establishing the transform equation.]** (page 16)

### Key Equations

$${}^{U}_{D}T = {}^{U}_{A}T \; {}^{A}_{D}T = {}^{U}_{B}T \; {}^{B}_{C}T \; {}^{C}_{D}T$$

---

## 2.8 More on Representation of Orientation

### 2.8.1 Cayley's Formula

<!-- source: MSE429 - Chapter2.pdf#page=17 -->

Although a rotation matrix is composed of 9 elements, there are some properties that have to be satisfied, namely orthogonality and unit magnitude, that yield 6 independent constraints:

**Unit magnitude (3 constraints):**

$$\|{}^{A}\hat{X}_B\| = 1, \quad \|{}^{A}\hat{Y}_B\| = 1, \quad \|{}^{A}\hat{Z}_B\| = 1$$

**Orthogonality (3 constraints):**

$${}^{A}\hat{X}_B \cdot {}^{A}\hat{Y}_B = 0, \quad {}^{A}\hat{Y}_B \cdot {}^{A}\hat{Z}_B = 0, \quad {}^{A}\hat{Z}_B \cdot {}^{A}\hat{X}_B = 0$$

**Cross-product relationships:**

$${}^{A}\hat{X}_B \times {}^{A}\hat{Y}_B = {}^{A}\hat{Z}_B, \quad {}^{A}\hat{Y}_B \times {}^{A}\hat{Z}_B = {}^{A}\hat{X}_B, \quad {}^{A}\hat{Z}_B \times {}^{A}\hat{X}_B = {}^{A}\hat{Y}_B$$

Thus, a rotation matrix can be represented by only **three parameters**.

### Theorems

**Cayley's Formula**: Cayley showed that any rotation matrix can be represented with a skew-symmetric matrix $S$ (where $S = -S^T$):

$$R = (I_3 - S)^{-1}(I_3 + S)$$

where

$$S = \begin{bmatrix} 0 & -s_z & s_y \\ s_z & 0 & -s_x \\ -s_y & s_x & 0 \end{bmatrix}$$

---

### 2.8.2 Fixed Angles $X$-$Y$-$Z$ (Roll-Pitch-Yaw)

<!-- source: MSE429 - Chapter2.pdf#page=18 -->

### Definitions

**Fixed Angles (X-Y-Z)**: Let $\{A\}$ be the fixed frame and $\{B\}$ the moving frame. Let them be coincident as well.

"First rotate $\{B\}$ about $\hat{X}_A$ by an angle $\gamma$, then rotate $\{B\}$ about $\hat{Y}_A$ by an angle $\beta$, and then rotate $\{B\}$ about $\hat{Z}_A$ by an angle $\alpha$."

Fixed angles are also referred to as **roll**, **pitch**, and **yaw** angles.

Rotations are performed in the order $R_X(\gamma)$, $R_Y(\beta)$, $R_Z(\alpha)$.

> **[Figure: Three sequential diagrams showing the fixed-angle rotation sequence. Starting from coincident frames {A} and {B}: (1) {B} rotates about the fixed $\hat{X}_A$ axis by angle $\gamma$ (roll), (2) {B} rotates about the fixed $\hat{Y}_A$ axis by angle $\beta$ (pitch), (3) {B} rotates about the fixed $\hat{Z}_A$ axis by angle $\alpha$ (yaw). The fixed frame {A} axes remain unchanged throughout all three rotations.]** (page 18)

<!-- source: MSE429 - Chapter2.pdf#page=19 -->

### Forward Problem

With the fixed angle representation, the rotation matrices are **pre-multiplied**:

$${}^{A}_{B}R_{XYZ}(\gamma, \beta, \alpha) = R_Z(\alpha) \; R_Y(\beta) \; R_X(\gamma)$$

$$= \begin{bmatrix} c\alpha & -s\alpha & 0 \\ s\alpha & c\alpha & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} c\beta & 0 & s\beta \\ 0 & 1 & 0 \\ -s\beta & 0 & c\beta \end{bmatrix} \begin{bmatrix} 1 & 0 & 0 \\ 0 & c\gamma & -s\gamma \\ 0 & s\gamma & c\gamma \end{bmatrix}$$

$${}^{A}_{B}R_{XYZ}(\gamma, \beta, \alpha) = \begin{bmatrix} c\alpha c\beta & c\alpha s\beta s\gamma - s\alpha c\gamma & c\alpha s\beta c\gamma + s\alpha s\gamma \\ s\alpha c\beta & s\alpha s\beta s\gamma + c\alpha c\gamma & s\alpha s\beta c\gamma - c\alpha s\gamma \\ -s\beta & c\beta s\gamma & c\beta c\gamma \end{bmatrix} = \begin{bmatrix} r_{11} & r_{12} & r_{13} \\ r_{21} & r_{22} & r_{23} \\ r_{31} & r_{32} & r_{33} \end{bmatrix}$$

where $c\alpha = \cos\alpha$, $s\alpha = \sin\alpha$, etc.

### Inverse Problem

Extracting $X$-$Y$-$Z$ angles from the rotation matrix. Let the rotation matrix be known:

$$\beta = \text{Atan2}\!\left(-r_{31},\; \sqrt{r_{11}^2 + r_{21}^2}\right)$$

$$\alpha = \text{Atan2}\!\left(r_{21}/c\beta,\; r_{11}/c\beta\right)$$

$$\gamma = \text{Atan2}\!\left(r_{32}/c\beta,\; r_{33}/c\beta\right)$$

<!-- source: MSE429 - Chapter2.pdf#page=20 -->

### Singularity / Degenerate Case

**Note**: If $\beta = \pm 90°$ (so that $c\beta = 0$), the solution of $\alpha$ and $\gamma$ degenerates. In this case, only the sum or the difference of $\alpha$ and $\gamma$ can be computed.

**Convention:**

- If $\beta = 90°$, then a solution can be calculated to be:

$$\beta = 90°$$

$$\alpha = 0°$$

$$\gamma = \text{Atan2}(r_{12},\; r_{22})$$

- If $\beta = -90°$, then a solution can be calculated to be:

$$\beta = -90°$$

$$\alpha = 0°$$

$$\gamma = -\text{Atan2}(r_{12},\; r_{22})$$

---

### 2.8.3 Euler Angles $Z'$-$Y'$-$X'$ ($Z$-$Y$-$X$)

<!-- source: MSE429 - Chapter2.pdf#page=21 -->

### Definitions

**Euler Angles (Z-Y-X)**: Let $\{A\}$ be the fixed frame and $\{B\}$ the moving frame. Let them be coincident.

"First rotate $\{B\}$ about $\hat{Z}_B$ by an angle $\alpha$, then rotate $\{B\}$ about the rotated $\hat{Y}'_B$ by an angle $\beta$, and then rotate $\{B\}$ about the twice-rotated $\hat{X}''_B$ by an angle $\gamma$."

A rotation matrix parametrized by Euler angles is indicated by: ${}^{A}_{B}R_{Z'Y'X''}(\alpha, \beta, \gamma)$.

Alternative notation: ${}^{A}_{B}R_{Z'Y'X''}(\alpha, \beta, \gamma) = {}^{A}_{B}R_{ZY'X''}(\alpha, \beta, \gamma)$

> **[Figure: Three sequential diagrams showing the Euler angle Z-Y-X rotation sequence. Starting from coincident frames: (1) {B} rotates about its own $\hat{Z}_B$ axis by angle $\alpha$, creating rotated frame with axis $\hat{Y}'_B$; (2) {B} rotates about the rotated $\hat{Y}'_B$ axis by angle $\beta$, creating twice-rotated frame with axis $\hat{X}''_B$; (3) {B} rotates about $\hat{X}''_B$ by angle $\gamma$. Unlike fixed angles, each rotation is about the current (body-attached) axis.]** (page 21)

<!-- source: MSE429 - Chapter2.pdf#page=22 -->

### Forward Problem

With the Euler angle representation, the rotation matrices are **post-multiplied**:

$${}^{A}_{B}R_{Z'Y'X''}(\alpha, \beta, \gamma) = R_Z(\alpha) \; R_{Y'}(\beta) \; R_{X''}(\gamma)$$

$$= \begin{bmatrix} c\alpha & -s\alpha & 0 \\ s\alpha & c\alpha & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} c\beta & 0 & s\beta \\ 0 & 1 & 0 \\ -s\beta & 0 & c\beta \end{bmatrix} \begin{bmatrix} 1 & 0 & 0 \\ 0 & c\gamma & -s\gamma \\ 0 & s\gamma & c\gamma \end{bmatrix}$$

$${}^{A}_{B}R_{Z'Y'X''}(\alpha, \beta, \gamma) = \begin{bmatrix} c\alpha c\beta & c\alpha s\beta s\gamma - s\alpha c\gamma & c\alpha s\beta c\gamma + s\alpha s\gamma \\ s\alpha c\beta & s\alpha s\beta s\gamma + c\alpha c\gamma & s\alpha s\beta c\gamma - c\alpha s\gamma \\ -s\beta & c\beta s\gamma & c\beta c\gamma \end{bmatrix} = \begin{bmatrix} r_{11} & r_{12} & r_{13} \\ r_{21} & r_{22} & r_{23} \\ r_{31} & r_{32} & r_{33} \end{bmatrix}$$

### Inverse Problem

Note that the matrix is **exactly the same one** as the one obtained for the $X$-$Y$-$Z$ fixed angles, but the rotations were taken in opposite order. The equations that solve $\alpha$, $\beta$, and $\gamma$ are therefore the same:

$$\beta = \text{Atan2}\!\left(-r_{31},\; \sqrt{r_{11}^2 + r_{21}^2}\right)$$

$$\alpha = \text{Atan2}\!\left(r_{21}/c\beta,\; r_{11}/c\beta\right)$$

$$\gamma = \text{Atan2}\!\left(r_{32}/c\beta,\; r_{33}/c\beta\right)$$

### Key Insight

The $X$-$Y$-$Z$ fixed angle representation and the $Z'$-$Y'$-$X''$ Euler angle representation produce **identical rotation matrices**. The difference is only in interpretation: fixed angles rotate about the stationary axes (pre-multiply), while Euler angles rotate about the body-attached axes (post-multiply), but the order is reversed.

---

### 2.8.4 Euler Angles $Z'$-$Y'$-$Z''$ ($Z$-$Y$-$Z$)

<!-- source: MSE429 - Chapter2.pdf#page=23 -->

"First rotate $\{B\}$ about $\hat{Z}_B$ by an angle $\alpha$, then rotate $\{B\}$ about the rotated $\hat{Y}'_B$ by an angle $\beta$, and then rotate $\{B\}$ about the twice-rotated $\hat{Z}''_B$ by an angle $\gamma$."

### Forward Problem

With the Euler angle representation, the rotation matrices are **post-multiplied**:

$${}^{A}_{B}R_{Z'Y'Z''}(\alpha, \beta, \gamma) = R_Z(\alpha) \; R_{Y'}(\beta) \; R_{Z''}(\gamma)$$

$$= \begin{bmatrix} c\alpha & -s\alpha & 0 \\ s\alpha & c\alpha & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} c\beta & 0 & s\beta \\ 0 & 1 & 0 \\ -s\beta & 0 & c\beta \end{bmatrix} \begin{bmatrix} c\gamma & -s\gamma & 0 \\ s\gamma & c\gamma & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

$${}^{A}_{B}R_{Z'Y'Z''}(\alpha, \beta, \gamma) = \begin{bmatrix} c\alpha c\beta c\gamma - s\alpha s\gamma & -c\alpha c\beta s\gamma - s\alpha c\gamma & c\alpha s\beta \\ s\alpha c\beta c\gamma + c\alpha s\gamma & -s\alpha c\beta s\gamma + c\alpha c\gamma & s\alpha s\beta \\ -s\beta c\gamma & s\beta s\gamma & c\beta \end{bmatrix} = \begin{bmatrix} r_{11} & r_{12} & r_{13} \\ r_{21} & r_{22} & r_{23} \\ r_{31} & r_{32} & r_{33} \end{bmatrix}$$

### Inverse Problem

$$\beta = \text{Atan2}\!\left(\sqrt{r_{13}^2 + r_{23}^2},\; r_{33}\right)$$

$$\alpha = \text{Atan2}\!\left(r_{23}/s\beta,\; r_{13}/s\beta\right)$$

$$\gamma = \text{Atan2}\!\left(r_{32}/s\beta,\; -r_{31}/s\beta\right)$$

<!-- source: MSE429 - Chapter2.pdf#page=24 -->

### Singularity / Degenerate Case

**Note**: If $\beta = 0°$ or $180°$ (so that $c\beta = \pm 1$), the solution of $\alpha$ and $\gamma$ degenerates. In this case, only the sum or the difference of $\alpha$ and $\gamma$ can be computed.

**Convention:**

- If $\beta = 0°$, then a solution can be calculated to be:

$$\beta = 0°$$

$$\alpha = 0°$$

$$\gamma = \text{Atan2}(-r_{12},\; r_{11})$$

- If $\beta = 180°$, then a solution can be calculated to be:

$$\beta = 180°$$

$$\alpha = 0°$$

$$\gamma = -\text{Atan2}(r_{12},\; -r_{11})$$

---

### 2.8.5 Equivalent Angle-Axis Representation

<!-- source: MSE429 - Chapter2.pdf#page=25 -->

### Definitions

**Equivalent Angle-Axis**: Let $\{A\}$ be the fixed frame and $\{B\}$ the moving frame. Let them be coincident. If the axis of rotation is a general direction (rather than one of the unit directions that we have seen in previous cases), any orientation may be obtained.

"First rotate $\{B\}$ about vector ${}^{A}\hat{K}$ by an angle $\theta$ according to the right-hand rule."

A general orientation of $\{B\}$ relative to $\{A\}$ can be written as ${}^{A}_{B}R(\hat{K}, \theta)$ or $R_K(\theta)$.

> **[Figure: Two coordinate frames {A} and {B} sharing the same origin. An arbitrary axis of rotation ${}^{A}\hat{K}$ passes through the common origin. Frame {B} is obtained from {A} by rotating an angle $\theta$ about this axis according to the right-hand rule. The angle $\theta$ and the rotation direction are indicated.]** (page 25)

<!-- source: MSE429 - Chapter2.pdf#page=26 -->

### Forward Problem

For a general rotation, the equivalent rotation matrix is:

$$R_K(\theta) = \begin{bmatrix} k_x k_x v\theta + c\theta & k_x k_y v\theta - k_z s\theta & k_x k_z v\theta + k_y s\theta \\ k_x k_y v\theta + k_z s\theta & k_y k_y v\theta + c\theta & k_y k_z v\theta - k_x s\theta \\ k_x k_z v\theta - k_y s\theta & k_y k_z v\theta + k_x s\theta & k_z k_z v\theta + c\theta \end{bmatrix} = \begin{bmatrix} r_{11} & r_{12} & r_{13} \\ r_{21} & r_{22} & r_{23} \\ r_{31} & r_{32} & r_{33} \end{bmatrix}$$

where:

$$v\theta = 1 - \cos(\theta) \quad \text{and} \quad {}^{A}\hat{K} = \begin{bmatrix} k_x, & k_y, & k_z \end{bmatrix}^T$$

and $c\theta = \cos\theta$, $s\theta = \sin\theta$.

**Note**: The sign of $\theta$ is determined by the right-hand rule, with the thumb pointing along the positive sense of $\hat{K}$.

### Inverse Problem

For a known rotation matrix, the values of the angle and axis are:

$$\theta = \text{acos}\!\left(\frac{r_{11} + r_{22} + r_{33} - 1}{2}\right)$$

and

$$\hat{K} = \frac{1}{2\sin\theta} \begin{bmatrix} r_{32} - r_{23} \\ r_{13} - r_{31} \\ r_{21} - r_{12} \end{bmatrix}$$

---

### 2.8.6 Euler Parameters (Unit Quaternion)

<!-- source: MSE429 - Chapter2.pdf#page=27 -->

### Definitions

**Euler Parameters**: Based on the equivalent angle-axis representation $\hat{K} = \begin{bmatrix} k_x, & k_y, & k_z \end{bmatrix}^T$, the Euler parameters are given by:

### Forward Problem

$$\epsilon_1 = k_x \sin\!\left(\frac{\theta}{2}\right), \quad \epsilon_2 = k_y \sin\!\left(\frac{\theta}{2}\right), \quad \epsilon_3 = k_z \sin\!\left(\frac{\theta}{2}\right), \quad \epsilon_4 = \cos\!\left(\frac{\theta}{2}\right)$$

With the following constraint:

$$\epsilon_1^2 + \epsilon_2^2 + \epsilon_3^2 + \epsilon_4^2 = 1$$

The Euler parameters are also known as the **unit quaternion**.

The rotation matrix is defined as:

$$R_\epsilon = \begin{bmatrix} 1 - 2\epsilon_2^2 - 2\epsilon_3^2 & 2(\epsilon_1\epsilon_2 - \epsilon_3\epsilon_4) & 2(\epsilon_1\epsilon_3 + \epsilon_2\epsilon_4) \\ 2(\epsilon_1\epsilon_2 + \epsilon_3\epsilon_4) & 1 - 2\epsilon_1^2 - 2\epsilon_3^2 & 2(\epsilon_2\epsilon_3 - \epsilon_1\epsilon_4) \\ 2(\epsilon_1\epsilon_3 - \epsilon_2\epsilon_4) & 2(\epsilon_2\epsilon_3 + \epsilon_1\epsilon_4) & 1 - 2\epsilon_1^2 - 2\epsilon_2^2 \end{bmatrix} = \begin{bmatrix} r_{11} & r_{12} & r_{13} \\ r_{21} & r_{22} & r_{23} \\ r_{31} & r_{32} & r_{33} \end{bmatrix}$$

### Inverse Problem

For a known rotation matrix, the values of the Euler parameters are:

$$\epsilon_1 = \frac{r_{32} - r_{23}}{4\epsilon_4}, \quad \epsilon_2 = \frac{r_{13} - r_{31}}{4\epsilon_4}, \quad \epsilon_3 = \frac{r_{21} - r_{12}}{4\epsilon_4}, \quad \epsilon_4 = \frac{1}{2}\sqrt{1 + r_{11} + r_{22} + r_{33}}$$

---

## 2.9 Transformation of Free Vectors

<!-- source: MSE429 - Chapter2.pdf#page=28 -->

### Definitions

Velocity and force vectors transform differently than position vectors.

**Equal Vectors (in mechanics)**: Two vectors are equal if they have the same dimensions, magnitude, and direction. Equal vectors could have different lines of action.

**Line Vector**: A vector that is dependent on its line of action, along with direction and magnitude. *Example*: Force is a line vector.

**Free Vector**: A vector that may be positioned anywhere in space without loss or change of meaning, provided that magnitude and direction are preserved. *Example*: A pure moment vector is a free vector.

> **[Figure: Two pairs of vectors are shown. The first pair shows two equal vectors (same magnitude and direction) with different lines of action (parallel but offset). The second pair illustrates that a free vector can be repositioned in space. An angular velocity vector and moment vector are depicted.]** (page 28)

### Key Equations

Velocity vector written in $\{B\}$, ${}^{B}V$, is written in $\{A\}$ as:

$${}^{A}V = {}^{A}_{B}R \; {}^{B}V$$

Moment vector written in $\{B\}$, ${}^{B}N$, is written in $\{A\}$ as:

$${}^{A}N = {}^{A}_{B}R \; {}^{B}N$$

**Note**: Free vectors are transformed using only the rotation matrix (no translation component), because they are independent of position.

---

<!-- source: MSE429 - Chapter2.pdf#page=29 -->

*End of Chapter 2 -- "Let The Learning Continue"*

---

## Summary of Key Equations

### Position Vector
<!-- source: MSE429 - Chapter2.pdf#page=3 -->
$${}^{A}P = \begin{bmatrix} p_x \\ p_y \\ p_z \end{bmatrix}$$

### Rotation Matrix (Direction Cosines)
<!-- source: MSE429 - Chapter2.pdf#page=6 -->
$${}^{A}_{B}R = \begin{bmatrix} \cos(\alpha_x) & \cos(\alpha_y) & \cos(\alpha_z) \\ \cos(\beta_x) & \cos(\beta_y) & \cos(\beta_z) \\ \cos(\gamma_x) & \cos(\gamma_y) & \cos(\gamma_z) \end{bmatrix}$$

### Rotation Matrix (Dot Products)
<!-- source: MSE429 - Chapter2.pdf#page=6 -->
$${}^{A}_{B}R = \begin{bmatrix} \hat{X}_A \cdot \hat{X}_B & \hat{X}_A \cdot \hat{Y}_B & \hat{X}_A \cdot \hat{Z}_B \\ \hat{Y}_A \cdot \hat{X}_B & \hat{Y}_A \cdot \hat{Y}_B & \hat{Y}_A \cdot \hat{Z}_B \\ \hat{Z}_A \cdot \hat{X}_B & \hat{Z}_A \cdot \hat{Y}_B & \hat{Z}_A \cdot \hat{Z}_B \end{bmatrix}$$

### Rotation Matrix Properties
<!-- source: MSE429 - Chapter2.pdf#page=7 -->
$${}^{B}_{A}R = {}^{A}_{B}R^T = {}^{A}_{B}R^{-1}$$

### Frame Description
<!-- source: MSE429 - Chapter2.pdf#page=8 -->
$$\{B\} = \{{}^{A}_{B}R, \; {}^{A}P_{B_{ORG}}\}$$

### Translational Mapping
<!-- source: MSE429 - Chapter2.pdf#page=10 -->
$${}^{A}P = {}^{B}P + {}^{A}P_{B_{ORG}}$$

### Rotational Mapping
<!-- source: MSE429 - Chapter2.pdf#page=11 -->
$${}^{A}P = {}^{A}_{B}R \; {}^{B}P$$

### General Mapping
<!-- source: MSE429 - Chapter2.pdf#page=12 -->
$${}^{A}P = {}^{A}_{B}R \; {}^{B}P + {}^{A}P_{B_{ORG}}$$

### Homogeneous Transform
<!-- source: MSE429 - Chapter2.pdf#page=13 -->
$${}^{A}_{B}T = \begin{bmatrix} {}^{A}_{B}R & {}^{A}P_{B_{ORG}} \\ 0 \;\; 0 \;\; 0 & 1 \end{bmatrix}$$

### Compound Transformations
<!-- source: MSE429 - Chapter2.pdf#page=15 -->
$${}^{0}_{n}T = {}^{0}_{1}T \; {}^{1}_{2}T \; {}^{2}_{3}T \cdots {}^{n-1}_{n}T$$

### Inverse of Homogeneous Transform
<!-- source: MSE429 - Chapter2.pdf#page=15 -->
$${}^{A}_{B}T^{-1} = \begin{bmatrix} {}^{A}_{B}R^T & -{}^{A}_{B}R^T \; {}^{A}P_{B_{ORG}} \\ 0 \;\; 0 \;\; 0 & 1 \end{bmatrix} = {}^{B}_{A}T$$

### Transform Equations
<!-- source: MSE429 - Chapter2.pdf#page=16 -->
$${}^{U}_{D}T = {}^{U}_{A}T \; {}^{A}_{D}T = {}^{U}_{B}T \; {}^{B}_{C}T \; {}^{C}_{D}T$$

### Cayley's Formula
<!-- source: MSE429 - Chapter2.pdf#page=17 -->
$$R = (I_3 - S)^{-1}(I_3 + S)$$

### Fixed Angles X-Y-Z (Roll-Pitch-Yaw)
<!-- source: MSE429 - Chapter2.pdf#page=19 -->
$${}^{A}_{B}R_{XYZ}(\gamma, \beta, \alpha) = R_Z(\alpha) \; R_Y(\beta) \; R_X(\gamma) = \begin{bmatrix} c\alpha c\beta & c\alpha s\beta s\gamma - s\alpha c\gamma & c\alpha s\beta c\gamma + s\alpha s\gamma \\ s\alpha c\beta & s\alpha s\beta s\gamma + c\alpha c\gamma & s\alpha s\beta c\gamma - c\alpha s\gamma \\ -s\beta & c\beta s\gamma & c\beta c\gamma \end{bmatrix}$$

### Euler Angles Z-Y-X (identical matrix to X-Y-Z fixed)
<!-- source: MSE429 - Chapter2.pdf#page=22 -->
$${}^{A}_{B}R_{Z'Y'X''}(\alpha, \beta, \gamma) = R_Z(\alpha) \; R_{Y'}(\beta) \; R_{X''}(\gamma)$$

### Euler Angles Z-Y-Z
<!-- source: MSE429 - Chapter2.pdf#page=23 -->
$${}^{A}_{B}R_{Z'Y'Z''}(\alpha, \beta, \gamma) = \begin{bmatrix} c\alpha c\beta c\gamma - s\alpha s\gamma & -c\alpha c\beta s\gamma - s\alpha c\gamma & c\alpha s\beta \\ s\alpha c\beta c\gamma + c\alpha s\gamma & -s\alpha c\beta s\gamma + c\alpha c\gamma & s\alpha s\beta \\ -s\beta c\gamma & s\beta s\gamma & c\beta \end{bmatrix}$$

### Angle-Axis Representation
<!-- source: MSE429 - Chapter2.pdf#page=26 -->
$$R_K(\theta) = \begin{bmatrix} k_x k_x v\theta + c\theta & k_x k_y v\theta - k_z s\theta & k_x k_z v\theta + k_y s\theta \\ k_x k_y v\theta + k_z s\theta & k_y k_y v\theta + c\theta & k_y k_z v\theta - k_x s\theta \\ k_x k_z v\theta - k_y s\theta & k_y k_z v\theta + k_x s\theta & k_z k_z v\theta + c\theta \end{bmatrix}$$

### Euler Parameters (Quaternion) to Rotation Matrix
<!-- source: MSE429 - Chapter2.pdf#page=27 -->
$$R_\epsilon = \begin{bmatrix} 1 - 2\epsilon_2^2 - 2\epsilon_3^2 & 2(\epsilon_1\epsilon_2 - \epsilon_3\epsilon_4) & 2(\epsilon_1\epsilon_3 + \epsilon_2\epsilon_4) \\ 2(\epsilon_1\epsilon_2 + \epsilon_3\epsilon_4) & 1 - 2\epsilon_1^2 - 2\epsilon_3^2 & 2(\epsilon_2\epsilon_3 - \epsilon_1\epsilon_4) \\ 2(\epsilon_1\epsilon_3 - \epsilon_2\epsilon_4) & 2(\epsilon_2\epsilon_3 + \epsilon_1\epsilon_4) & 1 - 2\epsilon_1^2 - 2\epsilon_2^2 \end{bmatrix}$$

### Free Vector Transformation
<!-- source: MSE429 - Chapter2.pdf#page=28 -->
$${}^{A}V = {}^{A}_{B}R \; {}^{B}V \qquad {}^{A}N = {}^{A}_{B}R \; {}^{B}N$$
