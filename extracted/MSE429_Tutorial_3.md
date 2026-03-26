# Tutorial 3 Solutions
<!-- source: MSE429 - Tutorials 3 (Solutions).pdf#page=1 -->

## Problem 3.1: Inverse Kinematics of a Three-Link Planar Manipulator
<!-- source: MSE429 - Tutorials 3 (Solutions).pdf#page=1 -->

**Problem Statement**: Derive the inverse kinematics of the three-link manipulator shown. Consider that the desired orientation of the last link is known.

**Diagram Description**: A three-link planar manipulator (3R) is shown with link lengths $L_1$, $L_2$, $L_3$. The joints are $\theta_1$, $\theta_2$, $\theta_3$. The end-effector frame $\{3\}$ is at the tip. Frame $\{S\}$ (station/base) is at the base.

**Solution**:

<!-- source: MSE429 - Tutorials 3 (Solutions).pdf#page=1 -->

Given: ${}^{S}_{3}T$ is given (desired end-effector pose).

$${}^{S}_{3}T = \begin{bmatrix} R_{11} & R_{12} & R_{13} & P_x \\ R_{21} & R_{22} & R_{23} & P_y \\ R_{31} & R_{32} & R_{33} & P_z \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

From forward kinematics, it can be shown:

$${}^{0}_{3}T = \begin{bmatrix} C_1 C_{23} & -C_1 S_{23} & S_1 & C_1(C_2 L_2 + L_1) \\ S_1 C_{23} & -S_1 S_{23} & -C_1 & S_1(C_2 L_2 + L_1) \\ S_{23} & C_{23} & 0 & S_2 L_2 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

where $C_{123} = \cos(\theta_1 + \theta_2 + \theta_3)$, $S_{23} = \sin(\theta_2 + \theta_3)$, etc.

Note: $(R_{1},C_1)$ notation references column 1, row 1 of the rotation matrix vs the forward kinematics result.

### Solving for $\theta_1$:

Equate element (row 1, column 3) in ${}^{0}_{3}T$:

$$S_1 = R_{13}$$

Equate elements $(R_2, C_3)$:

$$-C_1 = R_{23} \quad \Rightarrow \quad C_1 = -R_{23}$$

$$\tan(\theta_1) = \frac{R_{13}}{-R_{23}} \quad \Rightarrow \quad \boxed{\theta_1 = \text{Atan2}(R_{13}, -R_{23})}$$

**Note**: If both $R_{13} = 0$ and $R_{23} = 0$, the goal is unattainable.

### Solving for $\theta_2 + \theta_3$:

Equate $(R_1, C_4)$: $P_x = C_1(C_2 L_2 + L_1)$

Equate $(R_2, C_4)$: $P_y = S_1(C_2 L_2 + L_1)$

$$C_2 = \frac{1}{L_2}\left(\frac{P_x}{C_1} - L_1\right), \quad \text{if } C_1 \neq 0$$

$$C_2 = \frac{1}{L_2}\left(\frac{P_y}{S_1} - L_1\right), \quad \text{if } S_1 \neq 0$$

$$\theta_{2\text{(cand)}} = \text{Atan2}\left(\frac{P_y S_1}{L_2},\ C_2\right)$$

Equate $(R_3, C_4)$: $P_z = S_2 L_2$

$$S_2 = \frac{P_z}{L_2}$$

Equate $(R_2, C_1)$: $\sin(\theta_2 + \theta_3) = R_{31}$

Equate $(R_3, C_1)$: $\cos(\theta_2 + \theta_3) = R_{32}$

$$\theta_2 + \theta_3 = \text{Atan2}(R_{31}, R_{32})$$

$$\boxed{\theta_3 = \text{Atan2}(R_{31}, R_{32}) - \theta_2}$$

**Note**: If both $R_{31} = 0$ and $R_{32} = 0$, the goal is unattainable.

---

## Problem 3.2: Inverse Kinematics of a 4R Manipulator (Pieper's Method)
<!-- source: MSE429 - Tutorials 3 (Solutions).pdf#page=2 -->

**Problem Statement**: A 4R manipulator is shown. The nonzero link parameters are $a_1 = 1$, $\alpha_1 = 45°$, $d_3 = \sqrt{2}$, and $a_3 = \sqrt{2}$. The mechanism is pictured in the configuration corresponding to $\Theta = [0, 90°, -90°, 0]^T$. Each joint has $\pm 180°$ as limits. Find all values of $\theta_3$ such that:

$${}^{0}P_{\text{BORG}} = [1.1,\ 1.5,\ 1.707]^T$$

**Diagram Description**: A 4R manipulator with frames $\{0\}$ through $\{4\}$ labeled at each joint. The manipulator has a twist of 45 degrees between link 1 and link 2.

**Solution**:

<!-- source: MSE429 - Tutorials 3 (Solutions).pdf#page=2 -->

Given: $\theta_3 = ?$

Parameters: $\alpha_1 = 45°$, $d_2 = 0$, $d_4 = 0$, $\alpha_2 = 0$

Using Slide 22 from Chapter 4, Item (2):

Since $\sin(\alpha_1) \neq 0$ (using Pieper's method):

$$\Rightarrow Z = K_4$$

The position of the origin of frame $\{4\}$:

$$({}^{0}P_4)_x = Z = \cos(\alpha_1) f_3 + \cos(\alpha_1) d_2$$

$$({}^{0}P_4)_z = \cos(\alpha_1) f_3 \bigg|_{d_4=0} \Rightarrow ({}^{0}P_4)_z = f_3$$

$$({}^{0}P_4)_z = a_3 \sin(\alpha_1) \sin(\theta_3) + d_3 \cos(\alpha_1)$$

(Other terms are zero, see slide 21)

Substituting values:

$$1.707 = \sqrt{2}\, \sin(45°)\, \sin(\theta_3) + \sqrt{2}\, \cos(45°)$$

$$= \sqrt{2} \cdot \frac{\sqrt{2}}{2}\, \sin(\theta_3) + \sqrt{2} \cdot \frac{\sqrt{2}}{2}$$

$$1.707 = \sin(\theta_3) + 1$$

$$\sin(\theta_3) = 0.707$$

$$\theta_3 = \sin^{-1}(0.707)$$

$$\boxed{\theta_3 = 45° \quad \text{or} \quad \theta_3 = 135°}$$

(Since $-180° < \theta_3 < 180°$)

---

## Problem 3.3: Forward Kinematics of the Stanford Manipulator
<!-- source: MSE429 - Tutorials 3 (Solutions).pdf#page=3 -->

**Problem Statement**: Solve the forward kinematics of the Stanford manipulator, which has a $R \perp R \perp P \| (R \perp R \perp R)_{\text{sph}}$ layout.

**Diagram Description**: The Stanford manipulator is shown with 6 degrees of freedom. It has a spherical wrist at the end. The first two joints are revolute (perpendicular), the third is prismatic (parallel to joint 2 axis), and the last three form a spherical wrist. Coordinate frames are shown at each joint.

**Solution**:

<!-- source: MSE429 - Tutorials 3 (Solutions).pdf#page=3 -->

### DH Parameters:

| $i$ | $\alpha_{i-1}$ | $a_{i-1}$ | $d_i$ | $\theta_i$ |
|-----|:---:|:---:|:---:|:---:|
| 1 | 0 | 0 | 0 | $\theta_1$ |
| 2 | $-90°$ | 0 | $d_2$ | $\theta_2$ |
| 3 | $90°$ | 0 | $d_3$ | $0$ |
| 4 | $-90°$ | 0 | 0 | $\theta_4$ |
| 5 | $90°$ | 0 | 0 | $\theta_5$ |
| 6 | 0 | 0 | 0 | $\theta_6$ |

Note: The link offset $d_2$ is a constant, and $d_3$ is the variable prismatic joint.

### Homogeneous Transforms:

$${}^{0}_{1}T = \begin{bmatrix} C_1 & -S_1 & 0 & 0 \\ S_1 & C_1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

$${}^{1}_{2}T = \begin{bmatrix} C_2 & -S_2 & 0 & 0 \\ 0 & 0 & 1 & d_2 \\ -S_2 & -C_2 & 0 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

$${}^{2}_{3}T = \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 0 & -1 & 0 \\ 0 & 1 & 0 & d_3 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

$${}^{3}_{4}T = \begin{bmatrix} C_4 & -S_4 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ -S_4 & -C_4 & 0 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

$${}^{4}_{5}T = \begin{bmatrix} C_5 & -S_5 & 0 & 0 \\ 0 & 0 & -1 & 0 \\ S_5 & C_5 & 0 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

$${}^{5}_{6}T = \begin{bmatrix} C_6 & -S_6 & 0 & 0 \\ S_6 & C_6 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

### Solving for Forward Kinematics:

$${}^{0}_{6}T = {}^{0}_{1}T \cdot {}^{1}_{2}T \cdot {}^{2}_{3}T \cdot {}^{3}_{4}T \cdot {}^{4}_{5}T \cdot {}^{5}_{6}T$$

$${}^{0}_{6}T = \begin{bmatrix} r_{11} & r_{12} & r_{13} & P_x \\ r_{21} & r_{22} & r_{23} & P_y \\ r_{31} & r_{32} & r_{33} & P_z \end{bmatrix}$$

**Position vector**:

$$P_x = -C_1 S_2\, d_3$$
$$P_y = -S_1 S_2\, d_3$$
$$P_z = -C_2\, d_3$$

(Note: These are simplified; the full expressions include $d_2$ terms.)

**Rotation matrix elements**:

$$r_{11} = C_1(C_2 C_4 C_5 C_6 - S_2 S_6) - S_1(S_4 C_5 C_6 + C_4 S_6) - C_1 S_2(S_5 C_6)$$

$$r_{12} = C_1(C_2 C_4 C_5(-S_6) - S_2 C_6) + S_1(-S_4 C_5 S_6 + C_4 C_6) + C_1 S_2(S_5 S_6)$$

$$r_{13} = C_1(C_2 C_4 S_5) + S_1(-S_4 S_5) - C_1 S_2 C_5$$

$$r_{21} = S_1(C_2 C_4 C_5 C_6 - S_2 S_6) + C_1(S_4 C_5 C_6) - S_1 S_2(S_5 C_6)$$

$$r_{22} = S_1 C_2(-C_4 C_5 S_6 - S_4 C_6) + C_1(-S_4 C_5 S_6 + C_4 C_6) - S_1 S_2(S_5 S_6)$$

$$r_{23} = S_1 C_2(C_4 S_5) + C_1(S_4 S_5) - S_1 S_2 C_5$$

$$r_{31} = S_2(C_4 C_5 C_6) + C_2(S_5 C_6)$$

$$r_{32} = S_2 C_4(-C_5 S_6) - C_2 S_5 S_6$$

$$r_{33} = S_2(C_4 S_5) + C_2 C_5$$

---

## Problem 3.4: Inverse Kinematics of the Stanford Manipulator
<!-- source: MSE429 - Tutorials 3 (Solutions).pdf#page=4 -->

**Problem Statement**: Solve the inverse kinematics of the Stanford manipulator, which has a $R \perp R \perp P \| (R \perp R \perp R)_{\text{sph}}$ layout.

**Solution**:

<!-- source: MSE429 - Tutorials 3 (Solutions).pdf#page=4 -->

Let ${}^{0}_{6}T$ be the numerical homogeneous transform given for this problem:

$${}^{0}_{6}T = \begin{bmatrix} n_x & o_x & a_x & P_x \\ n_y & o_y & a_y & P_y \\ n_z & o_z & a_z & P_z \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

From Problem 3, the symbolic solution was found.

### Step 1: Finding the position of the wrist

The position of the wrist is found by post-multiplying ${}^{0}_{6}T$ by ${}^{6}_{EE}T^{-1}$ (taken from Problem 3):

$${}^{0}_{6}T \cdot {}^{6}_{EE}T^{-1} = \begin{bmatrix} n_x & o_x & a_x & P_x - a_x d_6 \\ n_y & o_y & a_y & P_y - a_y d_6 \\ n_z & o_z & a_z & P_z - a_z d_6 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

Note: Row vector of position is $P$ minus approach vector times $d_6$ (the tool length). Here $d_6$ is the end-effector offset. $P'$ is the wrist center position:

$$P'_x = P_x - a_x d_6, \quad P'_y = P_y - a_y d_6, \quad P'_z = P_z - a_z d_6$$

**Eq (1)**: Let:

$$\begin{pmatrix} P'_x \\ P'_y \\ P'_z \end{pmatrix} = \begin{pmatrix} P_x - a_x d_6 \\ P_y - a_y d_6 \\ P_z - a_z d_6 \end{pmatrix}$$

Since there is a spherical group of joints at the wrist, the position of the wrist is defined by the first three joints, i.e., $\theta_1$, $\theta_2$, and $d_3$.

### Step 2: Solving for $d_3$

<!-- source: MSE429 - Tutorials 3 (Solutions).pdf#page=4 -->

Equating the position vector obtained from ${}^{0}_{3}T$ from Problem 3:

**Eq (2)**:

$$P'_x = -C_1 S_2\, d_3$$
$$P'_y = -S_1 S_2\, d_3$$
$$P'_z = C_2\, d_3$$

Squaring and adding all three elements of Eq (2):

$$(P'_x)^2 + (P'_y)^2 + (P'_z)^2 = C_1^2 S_2^2 d_3^2 + S_1^2 S_2^2 d_3^2 + C_2^2 d_3^2$$

$$= (C_1^2 + S_1^2) S_2^2 d_3^2 + C_2^2 d_3^2$$

$$= (S_2^2 + C_2^2) d_3^2 = d_3^2$$

Hence:

$$\boxed{d_3 = \pm\sqrt{(P'_x)^2 + (P'_y)^2 + (P'_z)^2}}$$

### Step 3: Solving for $\theta_2$

<!-- source: MSE429 - Tutorials 3 (Solutions).pdf#page=5 -->

**Note**: In theory, there are two solutions, but given that $d_3$ is a distance, we consider that only $d_3 > 0$.

Using the third element of Eq (2):

$$C_2 = \frac{P'_z}{d_3}, \quad S_2 = \pm\sqrt{1 - C_2^2}$$

$$\boxed{\theta_2 = \text{Atan2}(S_2, C_2)}$$

**Note**: If $d_3 = 0$, the solution is uncertain. In this case we can assume a value for $\theta_2$.

### Step 4: Solving for $\theta_1$

Finally, the first variable of the main arm is solved by comparing the first and second elements of Eq (2):

$$C_1 = \frac{-P'_x}{S_2\, d_3}, \quad S_1 = \frac{-P'_y}{S_2\, d_3}$$

$$\boxed{\theta_1 = \text{Atan2}(S_1, C_1)}$$

### Step 5: Solving for Wrist Angles ($\theta_4$, $\theta_5$, $\theta_6$)

<!-- source: MSE429 - Tutorials 3 (Solutions).pdf#page=5 -->

With solutions for $\theta_1$, $\theta_2$, and $d_3$, we can compute ${}^{3}_{0}R$. We know that:

**Eq (3)**:

$${}^{3}_{6}R = {}^{0}_{3}R^{-1} \cdot {}^{0}_{6}R = {}^{3}_{0}R \cdot {}^{0}_{6}R = \begin{bmatrix} r'_{11} & r'_{12} & r'_{13} \\ r'_{21} & r'_{22} & r'_{23} \\ r'_{31} & r'_{32} & r'_{33} \end{bmatrix}$$

Comparing Eq (3) with the symbolic rotation found in Problem 3:

$${}^{3}_{6}R = \begin{bmatrix} C_4 C_5 C_6 - S_4 S_6 & -C_4 C_5 S_6 - S_4 C_6 & -C_4 S_5 \\ S_4 C_5 C_6 + C_4 S_6 & -S_4 C_5 S_6 + C_4 C_6 & -S_4 S_5 \\ S_5 C_6 & -S_5 S_6 & C_5 \end{bmatrix}$$

By first multiplying both sides by ${}^{3}_{0}R$:

$$\begin{bmatrix} r'_{11} C_6 - r'_{12} S_6 & r'_{16} & -r'_{11} S_6 - r'_{12} C_6 \\ r'_{21} C_6 - r'_{22} S_6 & r'_{23} & -r'_{21} S_6 - r'_{22} C_6 \\ r'_{31} C_6 - r'_{32} S_6 & r'_{33} & -r'_{31} S_6 - r'_{32} C_6 \end{bmatrix} = \begin{bmatrix} C_4 C_5 & -C_4 S_5 & -S_4 S_5 \\ S_4 C_5 & -S_4 S_5 & C_5 \\ S_5 & C_5 & 0 \end{bmatrix}$$

### Solving for $\theta_4$:

<!-- source: MSE429 - Tutorials 3 (Solutions).pdf#page=6 -->

From element $(R_3, C_3)$:

$$-r'_{31} S_6 - r'_{32} C_6 = 0 \quad \Rightarrow \quad \frac{S_6}{C_6} = \frac{-r'_{32}}{r'_{31}}$$

$$\boxed{\theta_6 = \text{Atan2}(-r'_{32}, r'_{31})}$$

Two solutions for $\theta_6$:
$$\theta_6 = \text{Atan2}(-r'_{32}, r'_{31}) \quad \text{and} \quad \theta_6 = \text{Atan2}(r'_{32}, -r'_{31})$$

### Solving for $\theta_5$:

Comparing elements $(R_3, C_1)$ and $(R_3, C_2)$ yields:

$$S_5 = r'_{31} C_6 - r'_{32} S_6 \quad \text{and} \quad C_5 = r'_{33}$$

Hence:

$$\boxed{\theta_5 = \text{Atan2}(r'_{31} C_6 - r'_{32} S_6,\ r'_{33})}$$

One solution.

### Solving for $\theta_4$:

Comparing elements $(R_1, C_3)$ and $(R_2, C_3)$ gives:

$$S_4 = -r'_{11} S_6 - r'_{12} C_6 \quad \text{and} \quad C_4 = r'_{21} S_6 + r'_{22} C_6$$

Hence:

$$\boxed{\theta_4 = \text{Atan2}(-r'_{11} S_6 - r'_{12} C_6,\ r'_{21} S_6 + r'_{22} C_6)}$$

One solution.

### Summary: Total Number of Solutions

<!-- source: MSE429 - Tutorials 3 (Solutions).pdf#page=6 -->

There are a total of **four solutions** for this problem:
- 2 from $d_3$ ($\pm$) $\times$ 2 from $\theta_6$

| | Solution 1 | Solution 2 | Solution 3 | Solution 4 |
|---|---|---|---|---|
| $\theta_1$ | 10.0000 | 10.0000 | -170.0000 | -170.0000 |
| $\theta_2$ | 13.1895 | 30.0000 | 150.0000 | 166.8105 |
| $d_3$ | 20.0000 | -20.0000 | 20.0000 | -20.0000 |
| $\theta_4$ | -13.1895 | 10.0000 | -190.0000 | -166.8105 |
| $\theta_5$ | 5.0000 | 5.0000 | -175.0000 | -175.0000 |

Note: $\theta_6$ values are not provided in the source solution table.

**Diagram**: A 3D rendering of the Stanford manipulator is shown in one of its configurations, with the 6 joints and links clearly visible, mounted on a base.
