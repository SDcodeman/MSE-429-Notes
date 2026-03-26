# Assignment 2 Solutions
<!-- source: MSE 429 - Assignment 2 (Solutions)_rubric.pdf#page=1 -->

## Problem 1
<!-- source: MSE 429 - Assignment 2 (Solutions)_rubric.pdf#page=1 -->

**Problem Statement**: Consider the **3R** non-planar robot arm shown below. Derive Denavit-Hartenberg parameters and use them to identify kinematic equations for ${}^{0}_{3}T$. Note that no $L_3$ need be defined.

**Rubric**: 30 marks total

**Diagram Description**: A 3R (three revolute joint) non-planar robot arm. The first joint ($\theta_1$) rotates about the vertical axis. A vertical link of length $L_1$ connects to the second joint ($\theta_2$), which rotates about a horizontal axis. A link of length $L_2$ connects to the third joint ($\theta_3$), which also rotates about a horizontal axis. The arm has an elbow-type configuration. Frame assignments are shown with $\{0\}$ at the base, and subsequent frames at each joint.

**Solution**:

Step 1: Assign DH frames and determine the DH parameter table.

| $i-1$ | $\alpha_{i-1}$ | $a_{i-1}$ | $\theta_i$ | $d_i$ | $i$ |
|-------|----------------|-----------|-------------|--------|-----|
| 0     | 0              | 0         | $\theta_1$  | 0      | 1   |
| 1     | $90°$          | 0         | $\theta_2$  | 0      | 2   |
| 2     | 0              | $L_1$     | $\theta_3$  | 0      | 3   |

**Rubric**: 6 marks for DH table

Step 2: Compute individual transformation matrices.

$${}^{0}_{1}T = \begin{bmatrix} c_1 & -s_1 & 0 & 0 \\ s_1 & c_1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

**Rubric**: 6 marks

$${}^{1}_{2}T = \begin{bmatrix} c_2 & -s_2 & 0 & L_1 \\ 0 & 0 & -1 & 0 \\ s_2 & c_2 & 0 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

**Rubric**: 6 marks

$${}^{2}_{3}T = \begin{bmatrix} c_3 & -s_3 & 0 & L_2 \\ s_3 & c_3 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

**Rubric**: 6 marks (Note: ${}^{0}_{3}T = {}^{0}_{1}T \; {}^{1}_{2}T \; {}^{2}_{3}T$)

Step 3: Multiply to get the overall transformation. The final result is:

$${}^{0}_{3}T = \begin{bmatrix} c_1 c_{23} & -c_1 s_{23} & -s_1 & L_1 c_1 + L_2 c_1 c_2 \\ s_1 c_{23} & -s_1 s_{23} & c_1 & L_1 s_1 + L_2 s_1 c_2 \\ s_{23} & c_{23} & 0 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

where $c_{23} = \cos(\theta_2 + \theta_3)$ and $s_{23} = \sin(\theta_2 + \theta_3)$.

**Rubric**: 3 marks for combining ${}^{0}_{1}T \; {}^{1}_{2}T$, 3 marks for the final product

**Answer**: The DH parameters and resulting transformation matrix ${}^{0}_{3}T$ are shown above.

---

## Problem 2
<!-- source: MSE 429 - Assignment 2 (Solutions)_rubric.pdf#page=2 -->

**Problem Statement**: Shown below is an arm with three degrees of freedom for which joints 1 and 2 are perpendicular, and joints 2 and 3 are parallel. All joints are at their zero location. Note that the positive sense of the joint angle is indicated. Assign link frames $\{0\}$ through $\{3\}$ for this arm (sketch the arm and show the attachment of the frames.) Derive Denavit-Hartenberg parameters and use them to find the transformation matrices ${}^{0}_{1}T$, ${}^{1}_{2}T$, and ${}^{2}_{3}T$.

**Rubric**: 15 marks total

**Diagram Description**: A 3-DOF robot arm with joints labeled. Joint 1 rotates vertically (base rotation), Joint 2 is perpendicular to Joint 1, and Joint 3 is parallel to Joint 2. The arm has link lengths $L_1$, $L_2$, $L_3$, and $L_4$. The zero configuration is shown with positive angle directions indicated. Two views are shown: (F) front view and frame assignments with $\hat{X}$, $\hat{Y}$, $\hat{Z}$ axes at each joint, plus a schematic of the kinematic chain. $\theta_1 = (1)$, $\theta_2 = (2)$, $\theta_3 = (3)$ labels are shown.

**Solution**:

Step 1: Assign DH frames and determine the DH parameter table.

| $i-1$ | $\alpha_{i-1}$ | $a_{i-1}$   | $\theta_i$ | $d_i$ | $i$ |
|-------|----------------|-------------|-------------|--------|-----|
| 0     | 0              | 0           | $\theta_1$  | $L_1 + L_2$ | 1 |
| 1     | $90°$          | 0           | $\theta_2$  | 0      | 2   |
| 2     | 0              | $L_3$       | $\theta_3$  | 0      | 3   |

**Rubric**: 6 marks for frame assignment (shown in sketch), 6 marks for DH table

Step 2: Compute individual transformation matrices.

$${}^{0}_{1}T = \begin{bmatrix} c_1 & -s_1 & 0 & 0 \\ s_1 & c_1 & 0 & 0 \\ 0 & 0 & 1 & L_1 + L_2 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

**Rubric**: 3 marks

$${}^{1}_{2}T = \begin{bmatrix} c_2 & -s_2 & 0 & 0 \\ 0 & 0 & -1 & 0 \\ s_2 & c_2 & 0 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

**Rubric**: 3 marks

$${}^{2}_{3}T = \begin{bmatrix} c_3 & -s_3 & 0 & L_3 \\ s_3 & c_3 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

**Rubric**: 3 marks

**Answer**: The DH parameters and three transformation matrices are shown above.

---

## Problem 3
<!-- source: MSE 429 - Assignment 2 (Solutions)_rubric.pdf#page=3 -->

**Problem Statement**: For the two-link manipulator shown below, the link transformation matrices ${}^{0}_{1}T$ and ${}^{1}_{2}T$ were constructed. Their product is:

$${}^{0}_{2}T = \begin{bmatrix} c\theta_1 c\theta_2 & -c\theta_1 s\theta_2 & s\theta_1 & L_1 c\theta_1 \\ s\theta_1 c\theta_2 & -s\theta_1 s\theta_2 & -c\theta_1 & L_1 s\theta_1 \\ s\theta_2 & c\theta_2 & 0 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

The link-frame assignments are indicated in figure (b). Note that frame $\{0\}$ is coincident with frame $\{1\}$ when $\theta_1 = 0$. The length of the second link is $L_2$. Find an expression for the vector ${}^{0}P_{tip}$, which locates the tip of the arm relative to the $\{0\}$ frame.

**Rubric**: 10 marks total

**Diagram Description**: (a) A two-link manipulator shown in 3D. The first link of length $L_1$ connects the base to the elbow. The second link of length $L_2$ extends from the elbow to the tip. Joint 1 rotates about the vertical axis, Joint 2 rotates perpendicular to Joint 1. (b) The link-frame assignments showing $\hat{X}$, $\hat{Y}$, $\hat{Z}$ axes at frame $\{0\}$/$\{1\}$ and frame $\{2\}$, with the "Tip" labeled at the end of link 2. $L_{2,0}$ marks the position along the second link.

**Solution**:

Step 1: The position of the tip in frame $\{2\}$ is simply the length $L_2$ along the $\hat{X}_2$ axis:
$${}^{2}P_{tip} = \begin{bmatrix} L_2 \\ 0 \\ 0 \end{bmatrix}$$

**Rubric**: 5 marks

Step 2: Transform to frame $\{0\}$:
$${}^{0}P_{tip} = {}^{0}_{2}T \; {}^{2}P_{tip} = \begin{bmatrix} c\theta_1 c\theta_2 & -c\theta_1 s\theta_2 & s\theta_1 & L_1 c\theta_1 \\ s\theta_1 c\theta_2 & -s\theta_1 s\theta_2 & -c\theta_1 & L_1 s\theta_1 \\ s\theta_2 & c\theta_2 & 0 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} L_2 \\ 0 \\ 0 \\ 1 \end{bmatrix}$$

$${}^{0}P_{tip} = \begin{bmatrix} L_1 c_1 + L_2 c_1 c_2 \\ L_1 s_1 + L_2 s_1 c_2 \\ L_2 s_2 \end{bmatrix}$$

**Rubric**: 5 marks

**Answer**:
$${}^{0}P_{tip} = \begin{bmatrix} L_1 \cos\theta_1 + L_2 \cos\theta_1 \cos\theta_2 \\ L_1 \sin\theta_1 + L_2 \sin\theta_1 \cos\theta_2 \\ L_2 \sin\theta_2 \end{bmatrix}$$

---

## Problem 4
<!-- source: MSE 429 - Assignment 2 (Solutions)_rubric.pdf#page=4 -->

**Problem Statement**: Show the attachment of link frames for the 5-DoF **2RP2R** manipulator shown schematically below.

**Rubric**: 15 marks total

**Diagram Description**: A 5-DOF manipulator with the joint sequence: Revolute-Revolute-Prismatic-Revolute-Revolute (2RP2R). The schematic shows the physical layout of the manipulator with joints and links. The first two joints are revolute, the third is prismatic (sliding), and the last two are revolute.

**Solution**:

Step 1: Assign DH frames following the Denavit-Hartenberg convention:
- Frame $\{0\}$: At the base. $\hat{Z}_0$ along Joint 1 axis of rotation.
- Frame $\{1\}$: At Joint 2. $\hat{Z}_1$ along Joint 2 axis. $\hat{X}_1$ along common normal from $\hat{Z}_0$ to $\hat{Z}_1$. Note: $\hat{X}_1$ points out of the page.
- Frame $\{2\}$: At Joint 3 (prismatic). $\hat{Z}_2$ along the sliding direction. $\hat{X}_2$ points out of the page.
- Frame $\{3\}$: At Joint 4. $\hat{Z}_3$ along Joint 4 axis.
- Frame $\{4\}$: At Joint 5. $\hat{Z}_4$ along Joint 5 axis.
- Frame $\{5\}$: At the end-effector.

**Diagram of Solution**: The solution shows the manipulator with all frames drawn. Frame origins are placed at joint intersections or along common normals. The $\hat{Z}$ axis of each frame is aligned with the corresponding joint axis. $\hat{X}$ axes are along common normals between successive $\hat{Z}$ axes.

**Rubric**: 15 marks (for correct frame placement and axis orientation)

**Answer**: The frame assignments follow DH convention with $\hat{Z}_i$ along joint $i+1$ axis and $\hat{X}_i$ along the common normal from $\hat{Z}_{i-1}$ to $\hat{Z}_i$. See diagram in solution.

---

## Problem 5
<!-- source: MSE 429 - Assignment 2 (Solutions)_rubric.pdf#page=5 -->

**Problem Statement**: Show the attachment of link frames on the **P3R** shown below. Given your frame assignments, what are the signs of $d_2$, $d_3$, and $a_2$?

**Rubric**: 15 marks total

**Diagram Description**: A P3R (Prismatic-Revolute-Revolute-Revolute) manipulator. The first joint is prismatic (vertical sliding), followed by three revolute joints. The physical layout shows a vertical column with a sliding joint, and three rotary joints extending outward.

**Solution**:

Step 1: Assign DH frames following convention. The solution notes that frame $\{y\}$ (the base/world frame relative to the prismatic joint direction) could be placed differently. With the shown assignment:

- $d_2 > 0$
- $d_3 = 0$
- $a_2 > 0$ ($a_2$ is always positive by convention)

**Diagram of Solution**: The solution shows the P3R manipulator with frames $\{0\}$ through $\{3\}$ (or $\{4\}$) drawn at each joint. $\hat{Z}_0$ is along the prismatic joint direction. Subsequent $\hat{Z}$ axes are along revolute joint axes. $\hat{X}$ axes follow the common normal convention.

**Rubric**: 15 marks (for correct frame placement)

**Answer**: $d_2 > 0$, $d_3 = 0$, $a_2 > 0$ (always positive).

---

## Problem 6
<!-- source: MSE 429 - Assignment 2 (Solutions)_rubric.pdf#page=6 -->

**Problem Statement**: Three manipulators are shown below. Find the Denavit-Hartenberg parameters for each one of them.
- a) Three-link **RRP** manipulator
- b) Three-link **RPP** manipulator
- c) Three-link **PRR** manipulator

**Rubric**: 15 marks total (5 marks each)

**Diagram Description**: Three separate manipulator schematics:
- (a) RRP: Two revolute joints followed by one prismatic joint. The first revolute is at the base, the second revolute is at the elbow, and the prismatic joint extends/retracts the final link.
- (b) RPP: One revolute joint at the base, followed by two prismatic joints forming a telescoping arm.
- (c) PRR: One prismatic joint (vertical slide) at the base, followed by two revolute joints.

**Solution**:

**a) Three-link RRP manipulator:**

| $i$ | $\alpha_{i-1}$ | $a_{i-1}$ | $\theta_i$ | $d_i$ |
|-----|----------------|-----------|-------------|--------|
| 1   | 0              | 0         | $\theta_1$  | 0      |
| 2   | $90°$          | 0         | $\theta_2$  | 0      |
| 3   | $90°$          | 0         | 0           | $d_3$  |

**Rubric**: 5 marks

**b) Three-link RPP manipulator:**

| $i$ | $\alpha_{i-1}$ | $a_{i-1}$ | $\theta_i$ | $d_i$ |
|-----|----------------|-----------|-------------|--------|
| 1   | 0              | 0         | $\theta_1$  | 0      |
| 2   | $90°$          | 0         | 0           | $d_2$  |
| 3   | 0              | 0         | 0           | $d_3$  |

**Rubric**: 5 marks

**c) Three-link PRR manipulator:**

| $i$ | $\alpha_{i-1}$ | $a_{i-1}$ | $\theta_i$ | $d_i$ |
|-----|----------------|-----------|-------------|--------|
| 1   | 0              | 0         | 0           | $d_1$  |
| 2   | 0              | $L_1$     | $\theta_2$  | 0      |
| 3   | 0              | 0         | $\theta_3$  | 0      |

**Rubric**: 5 marks

**Answer**: The DH parameter tables for all three manipulators are shown above.
