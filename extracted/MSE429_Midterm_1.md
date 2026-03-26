# Midterm 1
<!-- source: MSE 429 - Midterm 1.pdf#page=1 -->

## Problem 1: Forward Kinematics — DH Parameters and Transformation Matrices
<!-- source: MSE 429 - Midterm 1.pdf#page=1 -->

**Problem Statement**: Given a robot manipulator (shown in the diagram), assign DH frames, derive the DH parameter table, compute individual transformation matrices ${}^{0}T_1$, ${}^{1}T_2$, ${}^{2}T_3$, ${}^{3}T_{ee}$, and find the overall forward kinematics ${}^{0}T_{ee}$.

**Diagram Description**: A robot manipulator with 3 joints and an end-effector. The configuration shows:
- A base frame $\{0\}$ with $\hat{X}_0$ and $\hat{Z}_0$ at the bottom.
- Joint 1 ($\theta_1$): revolute, rotating about $\hat{Z}_0$ (vertical). A vertical link of length $L_1$ extends upward.
- Joint 2 ($\theta_2$): revolute, at the top of $L_1$. $\hat{Z}_1$ and $\hat{X}_2$ are aligned. Frame $\{1\}$ is at this joint with $\hat{Z}_1$ along the horizontal direction (after 90° twist). A link of length $L_2$ extends horizontally.
- Joint 3 ($d_3$): prismatic, sliding along $\hat{Z}_3$. Frame $\{3\}$ has $\hat{X}_3$ pointing along the arm.
- End-effector frame $\{ee\}$ with $\hat{X}_{ee}$ and $\hat{Z}_{ee}$ at the tip. A link of length $L_3$ extends from frame $\{3\}$ to $\{ee\}$.

The colored axes in the diagram: $\hat{X}_0$ (green), $\hat{Z}_0$ (yellow), $\hat{X}_1$ (green), $\hat{Z}_1$ (red, along $\hat{X}_2$), $\hat{Z}_2$ (magenta), $\hat{X}_3$ (blue), $\hat{Z}_3$ (blue), $\hat{X}_{ee}$ (red), $\hat{Z}_{ee}$ (green).

**Point Values**: Rubric shown in red:
- 0.5 for each frame origin, 0.75 for each frame axes
- 0.5 for zero elements, 0.75 for all nonzero and joint parameter elements in DH table
- 2 for each individual transformation matrix, 2 for the final answer

**Solution**:

<!-- source: MSE 429 - Midterm 1.pdf#page=1 -->

**Step 1: DH Parameter Table**

| $i-1$ | $\alpha_{i-1}$ | $a_{i-1}$ | $\theta_i$ | $d_i$ | $i$ |
|--------|----------------|-----------|-------------|--------|------|
| 0      | 0              | 0         | $\theta_1$  | $L_1$  | 1    |
| 1      | $90°$          | 0         | $\theta_2$  | 0      | 2    |
| 2      | $90°$          | $L_2$     | 0           | $d_3$  | 3    |
| 3      | 0              | $L_3$     | 0           | 0      | ee   |

**Step 2: General DH Transformation Matrix**

The standard DH transformation from frame $\{i-1\}$ to $\{i\}$ is:
$${}^{i-1}T_i = \begin{bmatrix} \cos\theta_i & -\sin\theta_i & 0 & a_{i-1} \\ \sin\theta_i \cos\alpha_{i-1} & \cos\theta_i \cos\alpha_{i-1} & -\sin\alpha_{i-1} & -d_i \sin\alpha_{i-1} \\ \sin\theta_i \sin\alpha_{i-1} & \cos\theta_i \sin\alpha_{i-1} & \cos\alpha_{i-1} & d_i \cos\alpha_{i-1} \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

<!-- source: MSE 429 - Midterm 1.pdf#page=1 -->

**Step 3: Compute ${}^{0}T_1$**

Substituting $\alpha_0 = 0$, $a_0 = 0$, $\theta_1 = \theta_1$, $d_1 = L_1$:
$${}^{0}T_1 = \begin{bmatrix} \cos\theta_1 & -\sin\theta_1 & 0 & 0 \\ \sin\theta_1 & \cos\theta_1 & 0 & 0 \\ 0 & 0 & 1 & L_1 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

<!-- source: MSE 429 - Midterm 1.pdf#page=2 -->

**Step 4: Compute ${}^{1}T_2$**

Substituting $\alpha_1 = 90°$, $a_1 = 0$, $\theta_2 = \theta_2$, $d_2 = 0$:
$${}^{1}T_2 = \begin{bmatrix} \cos\theta_2 & -\sin\theta_2 & 0 & 0 \\ 0 & 0 & -1 & 0 \\ \sin\theta_2 & \cos\theta_2 & 0 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

**Step 5: Compute ${}^{2}T_3$**

Substituting $\alpha_2 = 90°$, $a_2 = L_2$, $\theta_3 = 0$, $d_3 = d_3$:
$${}^{2}T_3 = \begin{bmatrix} 1 & 0 & 0 & L_2 \\ 0 & 0 & -1 & -d_3 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

**Step 6: Compute ${}^{3}T_{ee}$**

Substituting $\alpha_3 = 0$, $a_3 = L_3$, $\theta_{ee} = 0$, $d_{ee} = 0$:
$${}^{3}T_{ee} = \begin{bmatrix} 1 & 0 & 0 & L_3 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

<!-- source: MSE 429 - Midterm 1.pdf#page=2 -->

**Step 7: Compute the overall transformation ${}^{0}T_{ee} = {}^{0}T_1 \; {}^{1}T_2 \; {}^{2}T_3 \; {}^{3}T_{ee}$**

$${}^{0}T_{ee} = \begin{bmatrix} c_1 c_2 & s_1 & c_1 s_2 & c_1((L_2 + L_3)c_2 + d_3 s_2) \\ s_1 c_2 & -c_1 & s_1 s_2 & s_1((L_2 + L_3)c_2 + d_3 s_2) \\ s_2 & 0 & -c_2 & (L_2 + L_3)s_2 - d_3 c_2 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

where $c_i = \cos\theta_i$ and $s_i = \sin\theta_i$.

**Answer**: The forward kinematics matrix ${}^{0}T_{ee}$ is shown above. The position of the end-effector in the base frame is:
$${}^{0}P_{ee} = \begin{bmatrix} c_1((L_2 + L_3)c_2 + d_3 s_2) \\ s_1((L_2 + L_3)c_2 + d_3 s_2) \\ (L_2 + L_3)s_2 - d_3 c_2 \end{bmatrix}$$

---

## Problem 2: Inverse Kinematics — Pieper's Method
<!-- source: MSE 429 - Midterm 1.pdf#page=3 -->

**Problem Statement**: Using the DH parameters and forward kinematics from Problem 1, find the inverse kinematics (solve for $\theta_1$, $\theta_2$, and $d_3$) using Pieper's method.

**Point Values**: Rubric shown in red throughout (detailed per step below)

**Solution**:

<!-- source: MSE 429 - Midterm 1.pdf#page=3 -->

**Step 1: Identify the DH parameters for Pieper's method.**

From the DH table:
$$\alpha_1 = 90°, \; a_1 = 0, \; d_1 = L_1, \; \alpha_2 = 90°, \; a_2 = L_2, \; d_2 = 0, \; \theta_3 = 0, \; \alpha_3 = 0, \; a_3 = L_3, \; d_4 = 0$$

**(2 points)**

**Step 2: Since $a_1 = 0$, use Pieper's method.**

$$r = k_3$$

**(2 points)**

where:
$$k_3 = f_1^2 + f_2^2 + f_3^2 + a_1^2 + d_2^2 + 2d_2 f_3$$

**Step 3: Compute $f_1$, $f_2$, $f_3$.**

The general Pieper formulas are:
$$f_1 = a_3 c_3 + d_4 s_{\alpha_3} s_3 + a_2$$
$$f_2 = a_3 c_{\alpha_2} s_3 - d_4 s_{\alpha_3} c_{\alpha_2} c_3 - d_4 s_{\alpha_2} c_{\alpha_3} - d_3 s_{\alpha_2}$$
$$f_3 = a_3 s_{\alpha_2} s_3 - d_4 s_{\alpha_3} s_{\alpha_2} c_3 + d_4 c_{\alpha_2} c_{\alpha_3} + d_3 c_{\alpha_2}$$

**Step 4: Substitute the DH parameters.**

With $\alpha_1 = 90°$, $d_1 = L_1$, $\alpha_2 = 90°$, $a_2 = L_2$, $d_2 = 0$, $\theta_3 = 0$, $\alpha_3 = 0$, $a_3 = L_3$, $d_4 = 0$:

$$f_1 = L_3 \cdot 1 + 0 + L_2 = L_2 + L_3$$
$$f_2 = 0 - 0 - 0 - d_3 \cdot \sin(90°) = -d_3$$
$$f_3 = 0 - 0 + 0 + d_3 \cdot \cos(90°) = 0$$

**(2 points for each $f$, 2 points for $k_3$)**

$$k_3 = (L_2 + L_3)^2 + d_3^2 + 0 + 0 + 0 + 0 = (L_2 + L_3)^2 + d_3^2$$

<!-- source: MSE 429 - Midterm 1.pdf#page=3 -->

**Step 5: Solve for $d_3$.**

We know:
$$r = x^2 + y^2 + z^2$$

**(2 points for $d_3$)**

Therefore:
$$d_3 = \pm\sqrt{x^2 + y^2 + z^2 - (L_2 + L_3)^2}$$

**Step 6: Solve for $\theta_2$.**

We also have (from Pieper's method):
$$z = (k_1 s_2 - k_2 c_2) \sin\alpha_1 + k_4$$

where:
$$k_1 = f_1 = L_2 + L_3$$
$$k_2 = -f_2 = d_3$$
$$k_4 = f_3 \cos\alpha_1 + d_2 \cos\alpha_1 = 0$$

**(2 points for each $k$, 2 points for $z$ equation)**

Therefore:
$$z = (L_2 + L_3) s_2 - d_3 c_2$$

<!-- source: MSE 429 - Midterm 1.pdf#page=3 -->

**Step 7: Use the tangent half-angle substitution.**

Let $u = \tan\frac{\theta_2}{2}$, then:
$$\cos\theta_2 = \frac{1 - u^2}{1 + u^2}, \quad \sin\theta_2 = \frac{2u}{1 + u^2}$$

**(4 points for using the transcendental approach)**

Substituting:
$$z = (L_2 + L_3)\frac{2u}{1 + u^2} - d_3 \frac{1 - u^2}{1 + u^2}$$

<!-- source: MSE 429 - Midterm 1.pdf#page=4 -->

**Step 8: Form the quadratic equation.**

$$(z - d_3)u^2 - 2(L_2 + L_3)u + z + d_3 = 0$$

**(2 points for forming the quadratic)**

**Step 9: Solve for $u$ using the quadratic formula.**

$$u = \frac{L_2 + L_3 \pm \sqrt{(L_2 + L_3)^2 - (z - d_3)(z + d_3)}}{(z - d_3)}$$

Simplifying the discriminant:
$$u = \frac{L_2 + L_3 \pm \sqrt{(L_2 + L_3)^2 + d_3^2 - z^2}}{(z - d_3)}$$

**(2 points for $u$)**

**Step 10: Recover $\theta_2$.**

$$\theta_2 = 2\tan^{-1} u$$

**(2 points for $\theta_2$)**

<!-- source: MSE 429 - Midterm 1.pdf#page=4 -->

**Step 11: Solve for $\theta_1$.**

From Pieper's method:
$$c_1 g_1 - s_1 g_2 = x$$
$$s_1 g_1 + c_1 g_2 = y$$

**(1 point for each $\theta_1$ equation)**

where:
$$g_1 = c_2 f_1 - s_2 f_2 + a_1 = c_2(L_2 + L_3) + s_2 d_3$$
$$g_2 = s_2 c_{\alpha_1} f_1 + c_2 c_{\alpha_1} f_2 - s_{\alpha_1} f_3 - d_2 s_{\alpha_1} = 0$$

**(2 points for each $g$)**

Since $g_2 = 0$:
$$x = c_1(c_2(L_2 + L_3) + s_2 d_3)$$
$$y = s_1(c_2(L_2 + L_3) + s_2 d_3)$$

Therefore:
$$\theta_1 = \text{atan2}(y, x)$$

**(2 points for $\theta_1$)**

**Answer**:
- $d_3 = \pm\sqrt{x^2 + y^2 + z^2 - (L_2 + L_3)^2}$
- $\theta_2 = 2\tan^{-1}\!\left(\frac{L_2 + L_3 \pm \sqrt{(L_2 + L_3)^2 + d_3^2 - z^2}}{z - d_3}\right)$
- $\theta_1 = \text{atan2}(y, x)$

---

## Problem 3: Euler Angle Extraction and Rotation Matrix Computation
<!-- source: MSE 429 - Midterm 1.pdf#page=5 -->

**Problem Statement**: This problem has three parts:
a) Compute ${}^{3}R_6$ by multiplying three individual rotation matrices for joints 4, 5, and 6 (ZYZ Euler angle type wrist).
b) Given a specific ${}^{0}R_6$, compute its numerical value.
c) Given ${}^{0}R_3$ and ${}^{0}R_6$, find ${}^{3}R_6$ and extract the Euler angles $\theta_4$, $\theta_5$, $\theta_6$.

**Point Values**: (a) 5 points, (b) 2.5 points, (c) detailed rubric per angle

**Solution**:

**Part (a):**
<!-- source: MSE 429 - Midterm 1.pdf#page=5 -->

Step 1: Write the individual rotation matrices for joints 4, 5, 6 (ZYZ wrist):

$${}^{3}R_6 = \begin{bmatrix} c_4 & -s_4 & 0 \\ s_4 & c_4 & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} c_5 & -s_5 & 0 \\ 0 & 0 & -1 \\ s_5 & c_5 & 0 \end{bmatrix} \begin{bmatrix} c_6 & -s_6 & 0 \\ 0 & 0 & 1 \\ -s_6 & -c_6 & 0 \end{bmatrix}$$

Step 2: Multiply the three matrices:

$${}^{3}R_6 = \begin{bmatrix} c_4 c_5 c_6 - s_4 s_6 & -c_4 c_5 s_6 - s_4 c_6 & -c_4 s_5 \\ s_4 c_5 c_6 + c_4 s_6 & -s_4 c_5 s_6 + c_4 c_6 & -s_4 s_5 \\ s_5 c_6 & -s_5 s_6 & c_5 \end{bmatrix}$$

**(5 points for multiplying the three matrices)**

**Part (b):**
<!-- source: MSE 429 - Midterm 1.pdf#page=5 -->

Step 1: Evaluate the given rotation matrix:

$${}^{0}R_6 = \begin{bmatrix} 0 & -\cos 60° & \cos 30° \\ 0 & \sin 60° & \sin 30° \\ -1 & 0 & 0 \end{bmatrix} = \begin{bmatrix} 0 & -0.5 & 0.866 \\ 0 & 0.866 & 0.5 \\ -1 & 0 & 0 \end{bmatrix}$$

**(2.5 points)**

**Part (c):**
<!-- source: MSE 429 - Midterm 1.pdf#page=5 -->

Step 1: The rotation matrix ${}^{0}R_3$ is given as:

$${}^{0}R_3 = \begin{bmatrix} c_1 c_2 & s_1 & c_1 s_2 \\ s_1 c_2 & -c_1 & s_1 s_2 \\ s_2 & 0 & -c_2 \end{bmatrix}$$

With numerical values:
$${}^{0}R_3 = \begin{bmatrix} 0.5 & 0.5 & 0.707 \\ 0.707 & -0.707 & 0 \\ 0.5 & 0.5 & -0.707 \end{bmatrix}$$

**(1.5 points)**

Step 2: Compute ${}^{0}R_3^{-1} = {}^{0}R_3^{T}$ (since rotation matrices are orthogonal):

$${}^{0}R_3^{T} = \begin{bmatrix} 0.5 & 0.707 & 0.5 \\ 0.5 & -0.707 & 0.5 \\ 0.707 & 0 & -0.707 \end{bmatrix}$$

Step 3: Compute ${}^{3}R_6 = {}^{0}R_3^{T} \; {}^{0}R_6$:

$${}^{3}R_6 = \begin{bmatrix} 0.5 & 0.707 & 0.5 \\ 0.5 & -0.707 & 0.5 \\ 0.707 & 0 & -0.707 \end{bmatrix} \begin{bmatrix} 0 & -0.5 & 0.866 \\ 0 & 0.866 & 0.5 \\ -1 & 0 & 0 \end{bmatrix}$$

$${}^{3}R_6 = \begin{bmatrix} -0.707 & 0.183 & 0.683 \\ 0 & -0.966 & 0.259 \\ 0.707 & 0.183 & 0.683 \end{bmatrix} = \begin{bmatrix} r_{11} & r_{12} & r_{13} \\ r_{21} & r_{22} & r_{23} \\ r_{31} & r_{32} & r_{33} \end{bmatrix}$$

**(1 point for finding elements of ${}^{3}R_6$)**

<!-- source: MSE 429 - Midterm 1.pdf#page=6 -->

Step 4: Extract $\theta_5$ from ${}^{3}R_6$.

From the structure of ${}^{3}R_6$, we know $r_{33} = \cos\theta_5$ and $\sin\theta_5 = \pm\sqrt{r_{13}^2 + r_{23}^2}$.

**(1 point for finding $\sin\theta_5$)**

$$\theta_5 = \begin{cases} \text{atan2}\!\left(\sqrt{r_{13}^2 + r_{23}^2},\; r_{33}\right) = 47° \\ \text{atan2}\!\left(-\sqrt{r_{13}^2 + r_{23}^2},\; r_{33}\right) = -47° \end{cases}$$

**(4 points for each $\theta_5$ solution)**

Step 5: Extract $\theta_6$.

$$\theta_6 = \begin{cases} \text{atan2}(-r_{32},\; r_{31}) = -14.53° \\ \text{atan2}(r_{32},\; -r_{31}) = 165.5° \end{cases}$$

**(4 points for each $\theta_6$ solution)**

Step 6: Extract $\theta_4$.

$$\theta_4 = \begin{cases} \text{atan2}(-r_{23},\; -r_{13}) = 200.8° \\ \text{atan2}(r_{23},\; r_{13}) = 20.8° \end{cases}$$

**(4 points for each $\theta_4$ solution)**

**Answer**: Two solution sets:
- **Solution 1**: $\theta_5 = 47°$, $\theta_6 = -14.53°$, $\theta_4 = 200.8°$
- **Solution 2**: $\theta_5 = -47°$, $\theta_6 = 165.5°$, $\theta_4 = 20.8°$
