# Chapter 4: Inverse Manipulator Kinematics
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=1 -->

---

## 4.1 Overview
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=2 -->

This chapter covers the following topics:

- Definition of inverse kinematics
- Workspace definition
- Algebraic vs. geometric
- Algebraic solution by reduction to polynomial
- The wrist-partitioned (Pieper's) method

---

## 4.2 Definition of Inverse Kinematics
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=3 -->

### Definitions

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=3 -->
**Inverse Kinematics**: The inverse kinematics computes the values of the joint variables that would result in a desired position or orientation of the end-effector.

Generally, it is desired for the manipulator to follow a particular path. For example, pick up an object and place it elsewhere. Therefore, a numerical desired position and orientation of the end-effector must be established.

In inverse kinematic calculations, given the numerical value of ${}^{0}_{N}T$, it is desired to find the set of joint translation/rotational displacements that will result in such numerical matrix.

Each ${}^{i-1}_{i}T$ is a function of the $q_i$ joint displacement ($\theta_i$ for revolute and $d_i$ for prismatic joints).

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=3 -->
### Key Equations

$${}^{0}_{e.e}T = {}^{0}_{1}T(q_1) \; {}^{1}_{2}T(q_2) \; \cdots \; {}^{n-1}_{n}T(q_n) \; {}^{n}_{e.e}T$$

Therefore, the problem of inverse kinematics lies in comparing each element of the matrices and solving for all the joint displacements, $q_i$'s.

### Remarks
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=4 -->

- The desired position/orientation to be calculated for inverse kinematics should be within the workspace of the manipulator -- which is based on the length of the links, joint kinematic layout, and joint limits.

- Redundant manipulators (more than 6-DoF) have an infinite number of solutions (configurations).

- Depending on the number of joints and the structure of the manipulator, the inverse kinematics may have no solutions, one solution, or multiple solutions.

- In the problem of inverse kinematics, normally, a set of nonlinear equations should be solved, for which, special attention should be given to the existence of the solution, number of solutions, and the method of solutions.

---

## 4.3 Manipulator Workspace
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=5 -->

### Definitions

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=5 -->
**Workspace**: The workspace of a robot manipulator is defined as the set of points that can be reached by its end-effector.

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=5 -->
**Reachable Workspace**: A region that the manipulator can reach in at least one orientation.

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=5 -->
**Dextrous Workspace**: A region that the manipulator can reach with all the orientations.

### Workspace Examples -- Equal Link Lengths ($l_1 = l_2$)
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=5 -->

> **[Figure: Two-link planar manipulator with equal link lengths ($l_1 = l_2$). Left diagram: Shows the two links $l_1$ and $l_2$ connected at a revolute joint with angle $\theta$. The reachable workspace is a circle (disk) of radius $2l_1$ centered at the base. Right diagram: Shows the same manipulator with $\theta = 360°$, illustrating that when both links can sweep a full rotation, the dexterous workspace is a single point at the origin (base), since only at that point can the end-effector achieve all orientations by folding the links.]** (page 5)

- Reachable workspace $= 2l_1$ (full disk)
- Dexterous workspace $=$ single point, the origin

### Workspace Examples -- Unequal Link Lengths ($l_1 \neq l_2$)
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=6 -->

> **[Figure: Two-link planar manipulator with unequal link lengths ($l_1 \neq l_2$). Left diagram: Shows the reachable workspace as a ring (annulus) between inner radius $|l_1 - l_2|$ and outer radius $l_1 + l_2$. Multiple configurations shown as dashed lines reaching different points on the boundary. Right diagram: Shows two possible configurations (elbow-up and elbow-down, depicted as solid and dashed orange/blue lines) reaching the same point inside the reachable workspace, demonstrating two possible orientations of the end-effector.]** (page 6)

- Reachable workspace: ring (annulus)
- Dexterous workspace: does not exist
- Inside the reachable workspace, there are two possible orientations of the end-effector

### Workspace Examples -- 3-DoF Manipulators
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=7 -->

> **[Figure: Reachable workspace for a Cartesian manipulator -- a rectangular prism (box) shape. The manipulator has three prismatic joints arranged along orthogonal axes.]** (page 7)

> **[Figure: Reachable workspace for a Cylindrical manipulator -- a cylindrical shell shape. The manipulator has one revolute joint at the base and two prismatic joints.]** (page 7)

*Illustrations from book: Modeling and control of robot manipulators, by L. Sciavicco and B. Siciliano*

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=8 -->

> **[Figure: Reachable workspace for a Spherical manipulator -- a thick spherical shell (partial sphere) shape. The manipulator has two revolute joints and one prismatic joint.]** (page 8)

> **[Figure: Reachable workspace for a SCARA manipulator -- a flat cylindrical ring shape. The manipulator has two revolute joints with parallel axes and one prismatic joint.]** (page 8)

> **[Figure: Reachable workspace for an Anthropomorphic manipulator -- a spherical shell shape. The manipulator has three revolute joints.]** (page 8)

---

## 4.4 Multiple Solutions
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=9 -->

### Properties / Theorems

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=9 -->
A good choice would be the solution that minimizes the amount that each joint is required to move. In practice, other dynamic considerations like the weight of the arms should be taken into account.

- In the absence of an obstacle, the upper dashed configuration is preferred.
- In the presence of an obstacle on the path of the preferred configuration, the farther solution should be selected.

> **[Figure: A two-link manipulator reaching a goal point with two possible configurations (elbow-up shown as dashed lines, elbow-down shown as solid lines). Points A and B mark the end-effector positions of the two configurations. An obstacle is shown between the two paths. The manipulator base is at the bottom, demonstrating why the farther solution may be necessary when obstacles are present.]** (page 9)

### PUMA 560 Multiple Solutions
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=10 -->

Number of possible solutions to reach a point in the reachable workspace of a PUMA 560 robot:

> **[Figure: Four different configurations of a PUMA 560 robot reaching the same point in its reachable workspace. The four configurations show different combinations of shoulder left/right and elbow up/down positions. Each configuration shows the robot's arm segments and joints in different orientations, all converging to the same end-effector location.]** (page 10)

### Number of Solutions vs. Link Parameters
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=11 -->

**Note:** In general, the more nonzero link parameters there are, the more ways there will be to reach a certain point in the reachable workspace. The more that are nonzero, the bigger is the maximum number of solutions.

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=11 -->
| $a_i$ | Number of solutions |
|---|---|
| $a_1 = a_3 = a_5 = 0$ | $\leq 4$ |
| $a_3 = a_5 = 0$ | $\leq 8$ |
| $a_3 = 0$ | $\leq 16$ |
| All $a_i \neq 0$ | $\leq 16$ |

**Note:** For a completely generally rotary-jointed manipulator with six degrees of freedom, there are up to sixteen solutions possible.

### Classes of Solution Methods
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=12 -->

- **Numerical solutions**: Slow due to their iterative nature. Not interested.

- **Closed-form solutions**: A solution method based on analytical expressions or the solution of a polynomial of degree 4 or less.
  - Algebraic
  - Geometric

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=12 -->
**Note (Pieper's Condition):** A sufficient condition that a manipulator with six revolute joints have a closed-form solution is that three neighboring joint axes intersect at a point. (Pieper's method, discussed later in this chapter).

Almost every manipulator with 6-DoF built today has three intersecting axes.

---

## 4.5 Inverse Kinematics -- Algebraic vs. Geometric
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=13 -->

### 4.5.1 Algebraic Solution

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=13 -->
Consider the three-link planar manipulator studied in Chapter 3 with the following link parameters.

| $i$ | $a_{i-1}$ | $\alpha_{i-1}$ | $d_i$ | $\theta_i$ |
|---|---|---|---|---|
| 1 | 0 | 0 | 0 | $\theta_1$ |
| 2 | $L_1$ | 0 | 0 | $\theta_2$ |
| 3 | $L_2$ | 0 | 0 | $\theta_3$ |

> **[Figure: Three-link planar manipulator showing three links connected by revolute joints. Frame assignments are shown: $\{\hat{X}_0, \hat{Y}_0\}$ at the base, $\{\hat{X}_1, \hat{Y}_1\}$ at joint 2, $\{\hat{X}_2, \hat{Y}_2\}$ at joint 3, and $\{\hat{X}_3, \hat{Y}_3\}$ at the end-effector. The links are shown as connected segments forming a planar chain. The base is fixed (indicated by hatching).]** (page 13)

#### Goal Point Specification
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=14 -->

The goal point is a specification of the wrist frame relative to the base frame, that is:

$${}^{BT}_{W}T = {}^{0}_{3}T = \begin{bmatrix} c_{123} & -s_{123} & 0.0 & l_1 c_1 + l_2 c_{12} \\ s_{123} & c_{123} & 0.0 & l_1 s_1 + l_2 s_{12} \\ 0.0 & 0.0 & 1.0 & 0.0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

Given the planar nature of motion for this manipulator, the goal point can be specified using $x$, $y$, and $\phi$ where $\phi$ is the orientation of link 3 in the plane (relative to the $+\hat{X}$ axis).

$${}^{BT}_{W}T = \begin{bmatrix} c_\phi & -s_\phi & 0.0 & x \\ s_\phi & c_\phi & 0.0 & y \\ 0.0 & 0.0 & 1.0 & 0.0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

> **[Figure: Same three-link planar manipulator from a different perspective showing the frames $\{\hat{X}_0, \hat{Y}_0\}$, $\{\hat{X}_1, \hat{Y}_1\}$, $\{\hat{X}_2, \hat{Y}_2\}$, $\{\hat{X}_3, \hat{Y}_3\}$ at each joint and the end-effector, with the end-effector position $(x, y)$ and orientation $\phi$ marked.]** (page 14)

### Derivations

#### Algebraic Solution: Solving the Four Nonlinear Equations
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=15 -->

Four nonlinear equations must be solved:

$$c_\phi = c_{123}$$

$$s_\phi = s_{123}$$

$$x = l_1 c_1 + l_2 c_{12}$$

$$y = l_1 s_1 + l_2 s_{12}$$

> **[Figure: Three-link planar manipulator with frame labels showing the geometric relationships between the links and joints.]** (page 15)

**Step 1: Find $c_2$.**

Squaring and adding the last two equations gives:

$$x^2 + y^2 = l_1^2 + l_2^2 + 2 l_1 l_2 c_2$$

where we made use of:

$$c_{12} = c_1 c_2 - s_1 s_2$$

$$s_{12} = c_1 s_2 + s_1 c_2$$

Solving for $c_2$:

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=15 -->
$$c_2 = \frac{x^2 + y^2 - l_1^2 - l_2^2}{2 l_1 l_2}$$

**Step 2: Find $\theta_2$.**
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=16 -->

Assuming the goal is in the workspace, for $s_2$ we obtain:

$$s_2 = \pm\sqrt{1 - c_2^2}$$

Hence, $\theta_2$ can be found:

$$\theta_2 = \text{Atan2}(s_2, c_2)$$

**Step 3: Find $\theta_1$.**
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=16 -->

Having found $\theta_2$, $\theta_1$ can be found. Rewrite the position equations as:

$$x = k_1 c_1 - k_2 s_1$$

$$y = k_1 s_1 + k_2 c_1$$

where:

$$k_1 = l_1 + l_2 c_2$$

$$k_2 = l_2 s_2$$

Performing a change of variable $r = +\sqrt{k_1^2 + k_2^2}$ and $\gamma = \text{Atan2}(k_2, k_1)$:

$$k_1 = r \cos\gamma$$

$$k_2 = r \sin\gamma$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=17 -->

Substituting:

$$\frac{x}{r} = \cos\gamma \cos\theta_1 - \sin\gamma \sin\theta_1$$

$$\frac{y}{r} = \cos\gamma \sin\theta_1 + \sin\gamma \cos\theta_1$$

So:

$$\cos(\gamma + \theta_1) = \frac{x}{r}$$

$$\sin(\gamma + \theta_1) = \frac{y}{r}$$

Using the two-argument arctangent:

$$\gamma + \theta_1 = \text{Atan2}\left(\frac{y}{r}, \frac{x}{r}\right) = \text{Atan2}(y, x)$$

And so:

$$\theta_1 = \text{Atan2}(y, x) - \text{Atan2}(k_2, k_1)$$

**Step 4: Find $\theta_3$.**
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=17 -->

Solving for the sum of $\theta_1$ through $\theta_3$:

$$\theta_1 + \theta_2 + \theta_3 = \text{Atan2}(s_\phi, c_\phi) = \phi$$

Therefore:

$$\theta_3 = \phi - \theta_1 - \theta_2$$

---

### 4.5.2 Geometric Solution
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=18 -->

> **[Figure: A two-link portion of the three-link planar manipulator shown in an X-Y coordinate frame. The end-effector position is at coordinates $(x, y)$. Links $l_1$ and $l_2$ form a triangle with the line from the origin to $(x, y)$. The angle $\beta$ is measured from the positive X-axis to the line from the origin to the goal point. The angle $\psi$ is the angle at the base joint between the first link and the line to the goal point. The interior angle at the elbow is $(180° + \theta_2)$.]** (page 18)

**Applying the law of cosines:**

$$x^2 + y^2 = l_1^2 + l_2^2 - 2 l_1 l_2 \cos(180° + \theta_2)$$

Since $\cos(180° + \theta_2) = -\cos(\theta_2)$:

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=18 -->
$$c_2 = \frac{x^2 + y^2 - l_1^2 - l_2^2}{2 l_1 l_2}$$

**Existence condition:** In order for the triangle to exist, $\sqrt{x^2 + y^2} \leq l_1 + l_2$ -- a condition that can be checked in a computational algorithm to verify the existence of the solution.

**Finding $\theta_1$:**

$$\beta = \text{Atan2}(y, x)$$

$$\cos\psi = \frac{x^2 + y^2 + l_1^2 - l_2^2}{2 l_1 \sqrt{x^2 + y^2}}$$

So:

$$\theta_1 = \begin{cases} \beta + \psi & , \; \theta_2 < 0 \\ \beta - \psi & , \; \theta_2 > 0 \end{cases}$$

**Finding $\theta_3$ from orientation:**

$$\theta_1 + \theta_2 + \theta_3 = \phi$$

---

## 4.6 Algebraic Solution by Reduction to Polynomial
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=19 -->

### Definitions

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=19 -->
**Transcendental Function**: In mathematics, a transcendental function is an analytic function that does not satisfy a polynomial equation, in contrast to an algebraic function.

### Key Technique -- Half-Angle Substitution

Transcendental equations are difficult to solve. The following substitutions are often used:

$$u = \tan\frac{\theta}{2}$$

$$\cos\theta = \frac{1 - u^2}{1 + u^2}$$

$$\sin\theta = \frac{2u}{1 + u^2}$$

These substitutions convert transcendental equations in $\sin\theta$ and $\cos\theta$ into polynomial equations in $u$, which can then be solved using standard algebraic techniques.

### Worked Examples

#### Example: Half-Angle Substitution
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=19 -->

**Problem:** Convert the transcendental equation $a\cos\theta + b\sin\theta = c$ into a polynomial in the tangent of the half angle and solve for $\theta$.

**Solution:**

Substituting the half-angle identities:

$$a\left(\frac{1 - u^2}{1 + u^2}\right) + b\left(\frac{2u}{1 + u^2}\right) = c$$

Multiplying through by $(1 + u^2)$:

$$a(1 - u^2) + 2bu = c(1 + u^2)$$

Rearranging:

$$(a + c)u^2 - 2bu + (c - a) = 0$$

Solving the quadratic:

$$u = \frac{b \pm \sqrt{b^2 + a^2 - c^2}}{a + c}$$

Therefore:

$$\theta = 2\tan^{-1}\left(\frac{b \pm \sqrt{b^2 + a^2 - c^2}}{a + c}\right)$$

**Note:** The condition for real solutions is $a^2 + b^2 \geq c^2$.

---

## 4.7 Pieper's Solution when Three Axes Intersect
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=20 -->

### Setup and Definitions

Consider a PUMA serial robot. The last three axes intersect; the origins of link frames $\{4\}$, $\{5\}$, and $\{6\}$, i.e. Wrist Bend, Swivel, and Roll, are all located at this point of intersection. Knowing $x$, $y$, and $z$ and three orientations, i.e. $\alpha$, $\theta$, and $\gamma$ of frame $\{6\}$ with respect to frame $\{0\}$, the transformation matrix between the two frames from Chapter 2 is:

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=20 -->
$${}^{0}T_6 = \begin{bmatrix} {}^{0}R_6 & {}^{0}P_{6ORG} \\ 0 \quad 0 \quad 0 & 1 \end{bmatrix}$$

Where:

$${}^{0}R_6 = \begin{bmatrix} r_{11} & r_{12} & r_{13} \\ r_{21} & r_{22} & r_{23} \\ r_{31} & r_{32} & r_{33} \end{bmatrix}$$

is the rotation matrix, and:

$${}^{0}P_{6ORG} = \begin{bmatrix} x \\ y \\ z \end{bmatrix}$$

> **[Figure: PUMA robot diagram showing joint labels and their ranges. Joint 1 (Waist) at 320 degrees range, Joint 2 (Shoulder) at 220 degrees range, Joint 3 (Elbow) at 270 degrees range, Joint 4 (Wrist Bend) at approximately 200 degrees range, Joint 5 (Wrist Swivel) at 600 degrees range, and Joint 6 (Wrist Roll) at 532 degrees range. Links are numbered 1, 2, 3. The point $P_{4,5,6ORG}$ is marked at the intersection of the last three wrist axes, and frame $0_6$ is marked at the wrist.]** (page 20)

We know ${}^{0}P_{6ORG}$ and ${}^{0}P_{4ORG}$ are the same points in space (since frames $\{4\}$, $\{5\}$, $\{6\}$ all have their origins at the wrist intersection point).

### Derivations

#### Step 1: Forward Kinematics Decomposition
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=21 -->

From Chapter 3 we have:

$${}^{0}T_6 = {}^{0}T_1 \; {}^{1}T_2 \; {}^{2}T_3 \; {}^{3}T_4 \; {}^{4}T_5 \; {}^{5}T_6 = \begin{bmatrix} {}^{0}R_6 & {}^{0}P_{6ORG} \\ 0 \quad 0 \quad 0 & 1 \end{bmatrix}$$

Also:

$${}^{0}T_6 = {}^{0}T_4 \; {}^{4}T_5 \; {}^{5}T_6 = \begin{bmatrix} {}^{0}R_4 & {}^{0}P_{4ORG} \\ 0 \quad 0 \quad 0 & 1 \end{bmatrix} {}^{4}T_5 \; {}^{5}T_6 = \begin{bmatrix} {}^{0}R_6 & {}^{0}P_{6ORG} \\ 0 \quad 0 \quad 0 & 1 \end{bmatrix}$$

We know:

$${}^{0}P_{4ORG} = {}^{0}P_{6ORG}$$

Therefore, for only matching the positions, we do not need to calculate the whole ${}^{0}T_6$.

#### Step 2: Expanding ${}^{0}P_{4ORG}$
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=22 -->

$${}^{0}P_{4ORG} = {}^{0}T_1 \; {}^{1}T_2 \; {}^{2}T_3 \; {}^{3}P_{4ORG}$$

From Chapter 3, for any two adjacent joints we have the general DH transform:

$${}^{i-1}T_i = \begin{bmatrix} c\theta_i & -s\theta_i & 0 & a_{i-1} \\ s\theta_i c\alpha_{i-1} & c\theta_i c\alpha_{i-1} & -s\alpha_{i-1} & -d_i s\alpha_{i-1} \\ s\theta_i s\alpha_{i-1} & c\theta_i s\alpha_{i-1} & c\alpha_{i-1} & d_i c\alpha_{i-1} \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

Therefore:

$${}^{3}T_4 = \begin{bmatrix} c\theta_4 & -s\theta_4 & 0 & a_3 \\ s\theta_4 c\alpha_3 & c\theta_4 c\alpha_3 & -s\alpha_3 & -d_4 s\alpha_3 \\ s\theta_4 s\alpha_3 & c\theta_4 s\alpha_3 & c\alpha_3 & d_4 c\alpha_3 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

and:

$${}^{3}P_{4ORG} = \begin{bmatrix} a_3 \\ -d_4 s\alpha_3 \\ d_4 c\alpha_3 \\ 1 \end{bmatrix}$$

#### Step 3: Defining $f_1$, $f_2$, $f_3$ (Functions of $\theta_3$ Only)
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=23 -->

The following relationship will give us 3 nonlinear equations which can be used to find $\theta_1$, $\theta_2$, and $\theta_3$:

$${}^{0}P_{4ORG} = {}^{0}T_1 \; {}^{1}T_2 \; {}^{2}T_3 \begin{bmatrix} a_3 \\ -d_4 s\alpha_3 \\ d_4 c\alpha_3 \\ 1 \end{bmatrix} = \begin{bmatrix} x \\ y \\ z \\ 1 \end{bmatrix}$$

A proper factorization can help us to define a process to calculate $\theta_1$, $\theta_2$, and $\theta_3$. Let us define $f_1$, $f_2$, and $f_3$ as follows:

$$\begin{bmatrix} f_1 \\ f_2 \\ f_3 \\ 1 \end{bmatrix} = {}^{2}T_3 \begin{bmatrix} a_3 \\ -d_4 s\alpha_3 \\ d_4 c\alpha_3 \\ 1 \end{bmatrix}$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=23 -->
$$f_1 = a_3 c_3 + d_4 s\alpha_3 s_3 + a_2$$

$$f_2 = a_3 c\alpha_2 s_3 - d_4 s\alpha_3 c\alpha_2 c_3 - d_4 s\alpha_2 c\alpha_3 - d_3 s\alpha_2$$

$$f_3 = a_3 s\alpha_2 s_3 - d_4 s\alpha_3 s\alpha_2 c_3 + d_4 c\alpha_2 c\alpha_3 + d_3 c\alpha_2$$

$f_1$, $f_2$, and $f_3$ are only functions of $\theta_3$.

#### Step 4: Defining $g_1$, $g_2$, $g_3$ (Functions of $\theta_2$ and $\theta_3$)
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=24 -->

Using ${}^{1}_{2}T$ and ${}^{0}_{1}T$:

$${}^{0}P_{4ORG} = \begin{bmatrix} c_1 g_1 - s_1 g_2 \\ s_1 g_1 + c_1 g_2 \\ g_3 \\ 1 \end{bmatrix} = \begin{bmatrix} x \\ y \\ z \\ 1 \end{bmatrix}$$

where:

$$g_1 = c_2 f_1 - s_2 f_2 + a_1$$

$$g_2 = s_2 c\alpha_1 f_1 + c_2 c\alpha_1 f_2 - s\alpha_1 f_3 - d_2 s\alpha_1$$

$$g_3 = s_2 s\alpha_1 f_1 + c_2 s\alpha_1 f_2 + c\alpha_1 f_3 + d_2 c\alpha_1$$

$g_1$, $g_2$, and $g_3$ are only functions of $\theta_2$ and $\theta_3$.

#### Step 5: Squared Distance Expression
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=24 -->

Now, writing an expression for the squared magnitude of ${}^{0}P_{4ORG}$:

$$r = x^2 + y^2 + z^2$$

$$= (c_1 g_1 - s_1 g_2)^2 + (s_1 g_1 + c_1 g_2)^2 + g_3^2$$

$$= g_1^2 + g_2^2 + g_3^2$$

$$= f_1^2 + f_2^2 + f_3^2 + a_1^2 + d_2^2 + 2d_2 f_3 + 2a_1(c_2 f_1 - s_2 f_2)$$

#### Step 6: Simplified Equations for $r$ and $z$
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=25 -->

Let:

$$k_1 = f_1$$

$$k_2 = -f_2$$

$$k_3 = f_1^2 + f_2^2 + f_3^2 + a_1^2 + d_2^2 + 2d_2 f_3$$

$$k_4 = f_3 c\alpha_1 + d_2 c\alpha_1$$

We can rewrite the equations for $r$ and $z$ as:

$$r = (k_1 c_2 + k_2 s_2) 2a_1 + k_3$$

$$z = (k_1 s_2 + k_2 c_2) s\alpha_1 + k_4$$

These two equations are useful as they eliminate the dependence on $\theta_1$. Dependence on $\theta_2$ has taken a simple form.

#### Step 7: Three Cases for Solving $\theta_3$
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=25 -->

Consider three distinguished cases for the solution of $\theta_3$:

**Case 1:** If $a_1 = 0$, then $r = k_3$ where $r$ is known. The right side ($k_3$) is a function of $\theta_3$ only. Using transcendental equations (half-angle substitution), the quadratic equation in $\tan\frac{\theta_3}{2}$ can be solved for $\theta_3$.

**Case 2:** If $s\alpha_1 = 0$, then $z = k_4$, where $z$ is known. Using transcendental equations, the quadratic equation can be solved for $\theta_3$.

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=26 -->
**Case 3:** Otherwise,

$$\frac{r - k_3}{2a_1} = k_1 c_2 + k_2 s_2$$

$$\frac{z - k_4}{s\alpha_1} = k_1 s_2 + k_2 c_2$$

Squaring and adding:

$$\left(\frac{r - k_3}{2a_1}\right)^2 + \left(\frac{z - k_4}{s\alpha_1}\right)^2 = k_1^2 + k_2^2$$

This removes the dependency on $\theta_2$.

Using transcendental equations (half-angle substitution), the above equation becomes of degree 4, that can be solved for $\theta_3$.

#### Step 8: Solving for $\theta_4$, $\theta_5$, and $\theta_6$
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=27 -->

Next is to solve for $\theta_4$, $\theta_5$, and $\theta_6$.

The rotation portion of ${}^{0}_{6}R$ can be used.

$${}^{3}_{6}R = {}^{0}_{3}R^{-1} \; {}^{0}_{6}R = \begin{bmatrix} r_{11} & r_{12} & r_{13} \\ r_{21} & r_{22} & r_{23} \\ r_{31} & r_{32} & r_{33} \end{bmatrix}$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=27 -->
$${}^{3}_{6}R = {}^{3}_{4}R \; {}^{4}_{5}R \; {}^{5}_{6}R = \begin{bmatrix} c_4 & -s_4 & 0 \\ s_4 & c_4 & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} c_5 & -s_5 & 0 \\ 0 & 0 & -1 \\ s_5 & c_5 & 0 \end{bmatrix} \begin{bmatrix} c_6 & -s_6 & 0 \\ 0 & 0 & 1 \\ -s_6 & -c_6 & 0 \end{bmatrix}$$

$${}^{3}_{6}R = \begin{bmatrix} c_4 c_5 c_6 - s_4 s_6 & -c_4 c_5 s_6 - s_4 c_6 & -c_4 s_5 \\ s_4 c_5 c_6 + c_4 s_6 & -s_4 c_5 s_6 + c_4 c_6 & -s_4 s_5 \\ s_5 c_6 & -s_5 s_6 & c_5 \end{bmatrix}$$

For many manipulators, these last three angles can be solved for by using the $Z - Y - Z$ Euler angle solution (from Chapter 2), applied to ${}^{3}_{6}R$.

### Z-Y-Z Euler Angle Solution (Reminder from Section 2.8)
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=28 -->

**Forward problem:** With the Euler angle representation, the rotation matrices are post-multiplied.

$${}^{A}_{B}R_{ZY'Z''}(\alpha, \beta, \gamma) = \begin{bmatrix} c\alpha c\beta c\gamma - s\alpha s\gamma & -c\alpha c\beta s\gamma - s\alpha c\gamma & c\alpha s\beta \\ s\alpha c\beta c\gamma + c\alpha s\gamma & -s\alpha c\beta s\gamma + c\alpha c\gamma & s\alpha s\beta \\ -s\beta c\gamma & s\beta s\gamma & c\beta \end{bmatrix} = \begin{bmatrix} r_{11} & r_{12} & r_{13} \\ r_{21} & r_{22} & r_{23} \\ r_{31} & r_{32} & r_{33} \end{bmatrix}$$

You consider $\alpha$, $\beta$, and $\gamma$ as $\theta_4$, $\theta_5$, and $\theta_6$.

**Inverse problem:**

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=28 -->
$$\theta_5 = \text{Atan2}\left(\sqrt{r_{31}^2 + r_{32}^2}, \; r_{33}\right)$$

$$\theta_4 = \text{Atan2}(r_{23}/s\beta, \; r_{13}/s\beta)$$

$$\theta_6 = \text{Atan2}(r_{32}/s\beta, \; -r_{31}/s\beta)$$

where $s\beta = \sin\theta_5$.

---

## 4.8 Computational Considerations
<!-- source: MSE492 - Chapter4 - rev2.pdf#page=29 -->

In many path-controlled schemes (Chapter 7), it is necessary to calculate the inverse kinematics of a manipulator at 30 Hz or faster. For computational efficiency, one may consider the following:

- Using a lookup-table for `atan2` routine.

- Structure the computation of multiple solutions in parallel (rather than pursuing them one after another serially).

- Using fixed- over floating-point representation of the quantities involved in calculation (it is possible since the variables do not have large dynamic range, and the ranges are fairly well-known).

- Factorization of equations to reduce the number of multiplications and additions -- this comes at the cost of creating local variables (good trade-off).

- Avoid the computation of redundant kinematics, e.g., calculate only two columns of rotation, then compute the third column using cross product.

- For transcendental functions, they can be computed from a series expansion.

---

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=30 -->
*Let The Learning Continue*

---

## Key Equations Summary

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=3 -->
**E4.1** Forward kinematics chain:
$${}^{0}_{e.e}T = {}^{0}_{1}T(q_1) \; {}^{1}_{2}T(q_2) \; \cdots \; {}^{n-1}_{n}T(q_n) \; {}^{n}_{e.e}T$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=14 -->
**E4.2** Forward kinematics for three-link planar manipulator:
$${}^{0}_{3}T = \begin{bmatrix} c_{123} & -s_{123} & 0 & l_1 c_1 + l_2 c_{12} \\ s_{123} & c_{123} & 0 & l_1 s_1 + l_2 s_{12} \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=15 -->
**E4.3** Cosine of $\theta_2$ for planar 3-link (algebraic and geometric):
$$c_2 = \frac{x^2 + y^2 - l_1^2 - l_2^2}{2 l_1 l_2}$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=16 -->
**E4.4** Sine of $\theta_2$:
$$s_2 = \pm\sqrt{1 - c_2^2}$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=16 -->
**E4.5** $\theta_2$:
$$\theta_2 = \text{Atan2}(s_2, c_2)$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=17 -->
**E4.6** $\theta_1$:
$$\theta_1 = \text{Atan2}(y, x) - \text{Atan2}(k_2, k_1)$$

where $k_1 = l_1 + l_2 c_2$ and $k_2 = l_2 s_2$.

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=17 -->
**E4.7** $\theta_3$ from orientation constraint:
$$\theta_1 + \theta_2 + \theta_3 = \phi$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=18 -->
**E4.8** Geometric solution -- $\theta_1$ (two cases):
$$\theta_1 = \begin{cases} \beta + \psi & , \; \theta_2 < 0 \\ \beta - \psi & , \; \theta_2 > 0 \end{cases}$$

where $\beta = \text{Atan2}(y, x)$ and $\cos\psi = \frac{x^2 + y^2 + l_1^2 - l_2^2}{2 l_1 \sqrt{x^2 + y^2}}$.

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=19 -->
**E4.9** Half-angle substitutions:
$$u = \tan\frac{\theta}{2}, \quad \cos\theta = \frac{1 - u^2}{1 + u^2}, \quad \sin\theta = \frac{2u}{1 + u^2}$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=19 -->
**E4.10** Solution of $a\cos\theta + b\sin\theta = c$:
$$\theta = 2\tan^{-1}\left(\frac{b \pm \sqrt{b^2 + a^2 - c^2}}{a + c}\right)$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=22 -->
**E4.11** General DH transformation matrix:
$${}^{i-1}T_i = \begin{bmatrix} c\theta_i & -s\theta_i & 0 & a_{i-1} \\ s\theta_i c\alpha_{i-1} & c\theta_i c\alpha_{i-1} & -s\alpha_{i-1} & -d_i s\alpha_{i-1} \\ s\theta_i s\alpha_{i-1} & c\theta_i s\alpha_{i-1} & c\alpha_{i-1} & d_i c\alpha_{i-1} \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=22 -->
**E4.12** Wrist origin position in frame $\{3\}$:
$${}^{3}P_{4ORG} = \begin{bmatrix} a_3 \\ -d_4 s\alpha_3 \\ d_4 c\alpha_3 \\ 1 \end{bmatrix}$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=23 -->
**E4.13** Pieper's $f$ functions (functions of $\theta_3$ only):
$$f_1 = a_3 c_3 + d_4 s\alpha_3 s_3 + a_2$$
$$f_2 = a_3 c\alpha_2 s_3 - d_4 s\alpha_3 c\alpha_2 c_3 - d_4 s\alpha_2 c\alpha_3 - d_3 s\alpha_2$$
$$f_3 = a_3 s\alpha_2 s_3 - d_4 s\alpha_3 s\alpha_2 c_3 + d_4 c\alpha_2 c\alpha_3 + d_3 c\alpha_2$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=24 -->
**E4.14** Pieper's $g$ functions (functions of $\theta_2$ and $\theta_3$):
$$g_1 = c_2 f_1 - s_2 f_2 + a_1$$
$$g_2 = s_2 c\alpha_1 f_1 + c_2 c\alpha_1 f_2 - s\alpha_1 f_3 - d_2 s\alpha_1$$
$$g_3 = s_2 s\alpha_1 f_1 + c_2 s\alpha_1 f_2 + c\alpha_1 f_3 + d_2 c\alpha_1$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=24 -->
**E4.15** Squared distance (eliminates $\theta_1$):
$$r = x^2 + y^2 + z^2 = f_1^2 + f_2^2 + f_3^2 + a_1^2 + d_2^2 + 2d_2 f_3 + 2a_1(c_2 f_1 - s_2 f_2)$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=25 -->
**E4.16** Simplified $r$ and $z$ equations (with $k$ substitutions):
$$r = (k_1 c_2 + k_2 s_2) 2a_1 + k_3$$
$$z = (k_1 s_2 + k_2 c_2) s\alpha_1 + k_4$$

where $k_1 = f_1$, $k_2 = -f_2$, $k_3 = f_1^2 + f_2^2 + f_3^2 + a_1^2 + d_2^2 + 2d_2 f_3$, $k_4 = f_3 c\alpha_1 + d_2 c\alpha_1$.

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=26 -->
**E4.17** Case 3 -- eliminate $\theta_2$ to solve for $\theta_3$:
$$\left(\frac{r - k_3}{2a_1}\right)^2 + \left(\frac{z - k_4}{s\alpha_1}\right)^2 = k_1^2 + k_2^2$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=27 -->
**E4.18** Wrist rotation matrix product ${}^{3}_{6}R$:
$${}^{3}_{6}R = \begin{bmatrix} c_4 c_5 c_6 - s_4 s_6 & -c_4 c_5 s_6 - s_4 c_6 & -c_4 s_5 \\ s_4 c_5 c_6 + c_4 s_6 & -s_4 c_5 s_6 + c_4 c_6 & -s_4 s_5 \\ s_5 c_6 & -s_5 s_6 & c_5 \end{bmatrix}$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=28 -->
**E4.19** Z-Y-Z Euler angle forward solution:
$${}^{A}_{B}R_{ZY'Z''}(\alpha, \beta, \gamma) = \begin{bmatrix} c\alpha c\beta c\gamma - s\alpha s\gamma & -c\alpha c\beta s\gamma - s\alpha c\gamma & c\alpha s\beta \\ s\alpha c\beta c\gamma + c\alpha s\gamma & -s\alpha c\beta s\gamma + c\alpha c\gamma & s\alpha s\beta \\ -s\beta c\gamma & s\beta s\gamma & c\beta \end{bmatrix}$$

<!-- source: MSE492 - Chapter4 - rev2.pdf#page=28 -->
**E4.20** Z-Y-Z Euler angle inverse solution (for $\theta_4$, $\theta_5$, $\theta_6$):
$$\theta_5 = \text{Atan2}\left(\sqrt{r_{31}^2 + r_{32}^2}, \; r_{33}\right)$$
$$\theta_4 = \text{Atan2}(r_{23}/s\beta, \; r_{13}/s\beta)$$
$$\theta_6 = \text{Atan2}(r_{32}/s\beta, \; -r_{31}/s\beta)$$

where $\alpha, \beta, \gamma$ correspond to $\theta_4, \theta_5, \theta_6$ and $s\beta = \sin\theta_5$.
