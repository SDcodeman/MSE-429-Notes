# Tutorial 5 Solutions
<!-- source: MSE429 - Tutorials 5 (Solutions).pdf#page=1 -->

## Problem 5.1: Jacobian of Stanford Manipulator (Derivative-Based Method)
<!-- source: MSE429 - Tutorials 5 (Solutions).pdf#page=1 -->

**Problem Statement**: Determine the Jacobian matrix, ${}^{0}J_{EE}$, of the Stanford manipulator using the joint direction and derivative-based method.

**Solution**:

<!-- source: MSE429 - Tutorials 5 (Solutions).pdf#page=1 -->

The Jacobian allows us to find the forward velocity problem:

$${}^{0}\vec{V}_{EE} = \left[{}^{0}J\right]_{EE} \dot{\vec{q}}$$

$$\begin{Bmatrix} \dot{x} \\ \dot{y} \\ \dot{z} \\ \omega_x \\ \omega_y \\ \omega_z \end{Bmatrix} = \left[{}^{0}J\right]_{EE} \begin{Bmatrix} \dot{\theta}_1 \\ \dot{\theta}_2 \\ \dot{d}_3 \\ \dot{\theta}_4 \\ \dot{\theta}_5 \\ \dot{\theta}_6 \end{Bmatrix}$$

### Step 1: Compute Successive Transforms

From Problem 3 in Tutorial 3 (see also slide 2):

$${}^{0}_{1}T = \begin{bmatrix} C_1 & -S_1 & 0 & 0 \\ S_1 & C_1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}, \quad {}^{0}\hat{Z}_1 = \begin{Bmatrix} 0 \\ 0 \\ 1 \end{Bmatrix}$$

$${}^{0}_{2}T = {}^{0}_{1}T \cdot {}^{1}_{2}T = \begin{bmatrix} C_1 C_2 & -C_1 S_2 & S_1 & S_1 d_2 \\ S_1 C_2 & -S_1 S_2 & -C_1 & -C_1 d_2 \\ S_2 & C_2 & 0 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}, \quad {}^{0}\hat{Z}_2 = \begin{Bmatrix} S_1 \\ -C_1 \\ 0 \end{Bmatrix}$$

$${}^{0}_{3}T = {}^{0}_{2}T \cdot {}^{2}_{3}T = \begin{bmatrix} C_1 C_2 & -S_1 & -C_1 S_2 & -C_1 S_2\, d_3 \\ S_1 C_2 & C_1 & -S_1 S_2 & -S_1 S_2\, d_3 \\ S_2 & 0 & C_2 & C_2\, d_3 \\ 0 & 0 & 0 & 1 \end{bmatrix}, \quad {}^{0}\hat{Z}_3 = \begin{Bmatrix} -C_1 S_2 \\ -S_1 S_2 \\ C_2 \end{Bmatrix}$$

$${}^{0}_{4}T = {}^{0}_{3}T \cdot {}^{3}_{4}T, \quad {}^{0}\hat{Z}_4 = \begin{Bmatrix} C_1 C_2 S_4 + S_1 S_4 \\ S_1 C_2 S_4 - C_1 S_4 \\ S_2 S_4 \end{Bmatrix}$$

$${}^{0}_{5}T = {}^{0}_{4}T \cdot {}^{4}_{5}T, \quad {}^{0}\hat{Z}_5 = \begin{Bmatrix} -(C_1 C_2 C_4 - S_1 S_4) S_5 - C_1 S_2 C_5 \\ -(S_1 C_2 C_4 + C_1 S_4) S_5 - S_1 S_2 C_5 \\ -S_2 C_4 S_5 + C_2 C_5 \end{Bmatrix}$$

$$[{}^{0}T] \cdot [{}^{5}_{6}T] = {}^{0}_{6}T, \quad {}^{0}\hat{Z}_6 = \begin{Bmatrix} C_1 C_2 S_4 + S_1 S_4 \\ S_1 C_2 S_4 - C_1 C_4 \\ S_2 S_4 \end{Bmatrix}$$

### Step 2: Find Position of End-Effector

<!-- source: MSE429 - Tutorials 5 (Solutions).pdf#page=2 -->

The position vector ${}^{0}\vec{P}_{EE}$ is found by extracting the last column of ${}^{0}_{6}T$ (actually ${}^{0}_{EE}T$, but for the Stanford manipulator with $d_6 = h$, see slide #21, Chapter 5):

$${}^{0}\vec{P}_{EE} = \text{last column of } {}^{0}_{EE}T = {}^{0}_{6}T \cdot {}^{6}_{EE}T \cdot \begin{Bmatrix} \vdots \end{Bmatrix}$$

Hence:

$${}^{0}\vec{P}_{EE} = \begin{Bmatrix} -(C_1 C_2 C_4 - S_1 S_4) S_5 + C_1 S_2 C_5) h - C_1 S_2\, d_3 \\ -(S_1 C_2 C_4 + C_1 S_4) S_5 + S_1 S_2 C_5) h - S_1 S_2\, d_3 \\ (-S_2 C_4 S_5 + C_2 C_5) h + C_2\, d_3 \end{Bmatrix}$$

### Step 3: Compute Partial Derivatives

We require $\frac{\partial {}^{0}\vec{P}_{EE}}{\partial q_k}$ for $k = 1, 2, \ldots, 6$

where $\vec{q} = \{\theta_1, \theta_2, d_3, \theta_4, \theta_5, \theta_6\}^T$.

$$\frac{\partial {}^{0}\vec{P}_{EE}}{\partial \theta_1} = \begin{Bmatrix} ((S_1 C_2 C_4 + C_1 S_4) S_5 + S_1 S_2 C_5) h + S_1 S_2\, d_3 \\ -((-C_1 C_2 C_4 + S_1 S_4) S_5 + C_1 S_2 C_5) h - C_1 S_2\, d_3 \\ 0 \end{Bmatrix}$$

$$\frac{\partial {}^{0}\vec{P}_{EE}}{\partial \theta_2} = \begin{Bmatrix} (C_1 S_2 C_4 S_5 - C_1 C_2 C_5) h - C_1 C_2\, d_3 \\ (S_1 S_2 C_4 S_5 - S_1 C_2 C_5) h - S_1 C_2\, d_3 \\ (-C_2 C_4 S_5 - S_2 C_5) h - S_2\, d_3 \end{Bmatrix}$$

$$\frac{\partial {}^{0}\vec{P}_{EE}}{\partial d_3} = \begin{Bmatrix} -C_1 S_2 \\ -S_1 S_2 \\ C_2 \end{Bmatrix}$$

$$\frac{\partial {}^{0}\vec{P}_{EE}}{\partial \theta_4} = \begin{Bmatrix} (C_1 C_2 S_4 + S_1 C_4) S_5\, h \\ (S_1 C_2 S_4 - C_1 C_4) S_5\, h \\ S_2 S_4 S_5\, h \end{Bmatrix}$$

$$\frac{\partial {}^{0}\vec{P}_{EE}}{\partial \theta_5} = \begin{Bmatrix} -(-(C_1 C_2 C_4 - S_1 S_4) C_5 - C_1 S_2 S_5) h \\ -(-(S_1 C_2 C_4 + C_1 S_4) C_5 - S_1 S_2 S_5) h \\ (-S_2 C_4 C_5 - C_2 S_5) h \end{Bmatrix}$$

$$\frac{\partial {}^{0}\vec{P}_{EE}}{\partial \theta_6} = \begin{Bmatrix} 0 \\ 0 \\ 0 \end{Bmatrix}$$

### Step 4: Construct the Jacobian

$$\left[{}^{0}J\right]_{EE} = \begin{bmatrix} \dfrac{\partial {}^{0}\vec{P}_{EE}}{\partial \theta_1} & \dfrac{\partial {}^{0}\vec{P}_{EE}}{\partial \theta_2} & \dfrac{\partial {}^{0}\vec{P}_{EE}}{\partial d_3} & \dfrac{\partial {}^{0}\vec{P}_{EE}}{\partial \theta_4} & \dfrac{\partial {}^{0}\vec{P}_{EE}}{\partial \theta_5} & \dfrac{\partial {}^{0}\vec{P}_{EE}}{\partial \theta_6} \\[6pt] {}^{0}\hat{Z}_1 & {}^{0}\hat{Z}_2 & \vec{0}_{3\times1} & {}^{0}\hat{Z}_4 & {}^{0}\hat{Z}_5 & {}^{0}\hat{Z}_6 \end{bmatrix}_{6 \times 6}$$

Note: For the prismatic joint (column 3), the angular velocity contribution is zero ($\vec{0}_{3\times1}$), and the linear velocity is $\hat{Z}_3$ (the joint direction).

---

## Problem 5.2: Jacobian of Stanford Manipulator (Cross-Product Method)
<!-- source: MSE429 - Tutorials 5 (Solutions).pdf#page=3 -->

**Problem Statement**: Determine the Jacobian matrix, ${}^{0}J_{EE}$, of the Stanford manipulator using the joint direction and cross-product method.

**Solution**:

<!-- source: MSE429 - Tutorials 5 (Solutions).pdf#page=3 -->

Using Slide 24, the Jacobian will have the following form:

For revolute joints:
$$\text{Column } i = \begin{Bmatrix} {}^{0}\hat{Z}_i \times {}^{0}\vec{P}_{i \to EE} \\ {}^{0}\hat{Z}_i \end{Bmatrix}$$

For prismatic joints:
$$\text{Column } i = \begin{Bmatrix} {}^{0}\hat{Z}_i \\ \vec{0} \end{Bmatrix}$$

Joint directions were previously calculated in Problem 1. The position vectors have to be found.

**Diagram Description**: A schematic showing position vectors from each joint origin to the end-effector, with ${}^{0}\vec{P}_{i \to EE} = {}^{0}\vec{P}_{0 \to EE} - {}^{0}\vec{P}_{0 \to i}$ for $i = 1, 2, \ldots, 6$.

### Column 1 (Revolute):

$${}^{0}\vec{P}_{1 \to EE} = {}^{0}\vec{P}_{0 \to EE} - {}^{0}\vec{P}_{0 \to 1}$$

From ${}^{0}_{1}T$: ${}^{0}\vec{P}_{0 \to 1} = \begin{Bmatrix} 0 \\ 0 \\ 0 \end{Bmatrix}$, so ${}^{0}\vec{P}_{1 \to EE} = {}^{0}\vec{P}_{EE}$

From Problem 3, Tutorial 3, we have:

$${}^{0}\hat{Z}_1 \times {}^{0}\vec{P}_{0 \to EE} = \begin{Bmatrix} (S_1 C_2 C_4 + C_1 S_4) S_5 + S_1 S_2 C_5) h + S_1 S_2\, d_3 \\ -((-C_1 C_2 C_4 + S_1 S_4) S_5 + C_1 S_2 C_5) h - C_1 S_2\, d_3 \\ 0 \end{Bmatrix}$$

### Column 2 (Revolute):

<!-- source: MSE429 - Tutorials 5 (Solutions).pdf#page=3 -->

$${}^{0}\vec{P}_{2 \to EE} = {}^{0}\vec{P}_{0 \to EE} - {}^{0}\vec{P}_{0 \to 2}$$

Since ${}^{0}\vec{P}_{0 \to 2} = \begin{Bmatrix} 0 \\ 0 \\ 0 \end{Bmatrix}$ (no offset from frames 0 to 2 in position):

Wait — actually from ${}^{0}_{2}T$: ${}^{0}\vec{P}_{0 \to 2} = \begin{Bmatrix} S_1 d_2 \\ -C_1 d_2 \\ 0 \end{Bmatrix}$

$${}^{0}\hat{Z}_2 \times {}^{0}\vec{P}_{2 \to EE} = \begin{Bmatrix} (C_1 S_2 C_4 S_5 - C_2 C_1 C_5) h - C_1 C_2\, d_3 \\ (S_1 S_2 C_4 S_5 - S_1 C_2 C_5) h - S_1 C_2\, d_3 \\ (-C_2 C_4 S_5 - S_2 C_5) h - S_2\, d_3 \end{Bmatrix}$$

### Column 3 (Prismatic):

<!-- source: MSE429 - Tutorials 5 (Solutions).pdf#page=4 -->

$${}^{0}\hat{Z}_3 = \begin{Bmatrix} -C_1 S_2 \\ -S_1 S_2 \\ C_2 \end{Bmatrix}^T$$

**Diagram Description**: A small triangle diagram shows the relationship between frames $\{0\}$, $\{1\}$, $\{2\}$ at the base and frames $\{3\}$, $\{4\}$, $\{5\}$, $\{6\}$ and $\{EE\}$ at the wrist. The vectors ${}^{0}\vec{P}_{0 \to EE}$ and ${}^{0}\vec{P}_{W \to EE}$ are indicated.

### Column 4 (Revolute):

$${}^{0}\vec{P}_{4 \to EE} = {}^{0}\vec{P}_{0 \to EE} - {}^{0}\vec{P}_{0 \to 4}$$

Since frames $\{3\}$ and $\{4\}$ are coincident: ${}^{0}\vec{P}_{4 \to EE} = {}^{0}\vec{P}_{W \to EE}$

$${}^{0}\hat{Z}_4 \times {}^{0}\vec{P}_{W \to EE} = \begin{Bmatrix} (C_1 C_2 S_4 + S_1 C_4) S_5\, h \\ (S_1 C_2 S_4 - C_1 C_4) S_5\, h \\ S_2 S_4 S_5\, h \end{Bmatrix}$$

### Column 5 (Revolute):

$${}^{0}\vec{P}_{5 \to EE} = {}^{0}\vec{P}_{0 \to EE} - {}^{0}\vec{P}_{0 \to 5} = {}^{0}\vec{P}_{W \to EE}$$

$${}^{0}\hat{Z}_5 \times {}^{0}\vec{P}_{5 \to EE} = \begin{Bmatrix} -((C_1 C_2 C_4 - S_1 S_4) C_5 - C_1 S_2 S_5) h \\ -((S_1 C_2 C_4 + C_1 S_4) C_5 - S_1 S_2 S_5) h \\ (-S_2 C_4 C_5 - C_2 S_5) h \end{Bmatrix}$$

### Column 6 (Revolute):

$${}^{0}\vec{P}_{6 \to EE} = {}^{0}\vec{P}_{0 \to EE} - {}^{0}\vec{P}_{0 \to 6} = {}^{0}\vec{P}_{W \to EE}$$

$${}^{0}\hat{Z}_6 \times {}^{0}\vec{P}_{6 \to EE} = \begin{Bmatrix} 0 \\ 0 \\ 0 \end{Bmatrix}$$

(Since $\hat{Z}_6$ is parallel to the vector from frame 6 to the end-effector)

---

## Problem 5.3: Jacobian Based on Wrist Centre
<!-- source: MSE429 - Tutorials 5 (Solutions).pdf#page=5 -->

**Problem Statement**: Consider for the Stanford manipulator a Jacobian based on a point on the end-effector that is coincident with the wrist centre. What is ${}^{0}J_W$?

**Solution**:

<!-- source: MSE429 - Tutorials 5 (Solutions).pdf#page=5 -->

From Problem 3, Tutorial 4.1:

$${}^{0}\vec{P}_{0 \to W} = {}^{0}\vec{P}_{0 \to 3} = \begin{Bmatrix} -C_1 S_2\, d_3 \\ -S_1 S_2\, d_3 \\ C_2\, d_3 \end{Bmatrix}$$

Finding $\frac{\partial {}^{0}\vec{P}_W}{\partial q_k}$ for $k = 1, 2, 3, 4, 5, 6$:

$$\frac{\partial {}^{0}\vec{P}_W}{\partial \theta_1} = \begin{Bmatrix} S_1 S_2\, d_3 \\ -C_1 S_2\, d_3 \\ 0 \end{Bmatrix}, \quad \frac{\partial {}^{0}\vec{P}_W}{\partial \theta_2} = \begin{Bmatrix} -C_1 C_2\, d_3 \\ -S_1 C_2\, d_3 \\ -S_2\, d_3 \end{Bmatrix}$$

$$\frac{\partial {}^{0}\vec{P}_W}{\partial d_3} = \begin{Bmatrix} -C_1 S_2 \\ -S_1 S_2 \\ C_2 \end{Bmatrix}, \quad \frac{\partial {}^{0}\vec{P}_W}{\partial \theta_4} = \frac{\partial {}^{0}\vec{P}_W}{\partial \theta_5} = \frac{\partial {}^{0}\vec{P}_W}{\partial \theta_6} = \begin{Bmatrix} 0 \\ 0 \\ 0 \end{Bmatrix}$$

### Constructing the Jacobian:

$$\left[{}^{0}J_W\right] = \begin{bmatrix} S_1 S_2 d_3 & -C_1 C_2 d_3 & -C_1 S_2 & 0 & 0 & 0 \\ -C_1 S_2 d_3 & -S_1 C_2 d_3 & -S_1 S_2 & 0 & 0 & 0 \\ 0 & -S_2 d_3 & C_2 & 0 & 0 & 0 \\ 0 & S_1 & 0 & C_1 C_2 S_4 + S_1 S_4 & \cdots & \cdots \\ 0 & -C_1 & 0 & S_1 C_2 S_4 - C_1 S_4 & \cdots & \cdots \\ 1 & 0 & 0 & S_2 S_4 & \cdots & \cdots \end{bmatrix}$$

Note: The upper-right $3 \times 3$ block is all zeros because the wrist joint rotations ($\theta_4$, $\theta_5$, $\theta_6$) do not translate the wrist centre point.

### Velocity Transformation

In order to find ${}^{0}\vec{V}_{EE}$, we have to determine the velocity transformation.

From Slide 23:

$${}^{0}\vec{V}_{EE} = \left[T_V\right] \cdot {}^{0}\vec{V}_W$$

where:

$$\left[T_V\right] = \begin{bmatrix} I_{3\times3} & -\left[{}^{0}\vec{P}_{EE \to W}\right]_\times \\ [0]_{3\times3} & I_{3\times3} \end{bmatrix}$$

$${}^{0}\vec{P}_{EE \to W} = {}^{0}\vec{P}_W - {}^{0}\vec{P}_{EE} = {}^{0}\vec{P}_{W \to EE}$$

From Tutorial 3, Problem 3:

$${}^{0}\vec{P}_{W \to EE} = \begin{Bmatrix} -C_1 S_2 d_3 \\ \vdots \end{Bmatrix} - {}^{0}\vec{P}_{EE}$$

$${}^{0}\vec{P}_{W \to EE} = \begin{Bmatrix} (C_1 C_2 C_4 - S_1 S_4) S_5 + C_1 S_2 C_5) h \\ (S_1 C_2 C_4 + C_1 S_4) S_5 + S_1 S_2 C_5) h \\ (S_2 C_4 S_5 - C_2 C_5) h \end{Bmatrix}$$

---

## Problem 5.4: Jacobian ${}^{3}J_W$ and Velocity Transformation $T_{V_{W \to EE}}$
<!-- source: MSE429 - Tutorials 5 (Solutions).pdf#page=6 -->

**Problem Statement**: Find ${}^{3}J_W$ for the Stanford manipulator and determine the velocity transformation $T_{V_{W \to EE}}$.

**Solution**:

<!-- source: MSE429 - Tutorials 5 (Solutions).pdf#page=6 -->

From Slide 32, we can form the Jacobian as follows:

$$\left[{}^{3}J_W\right] = \begin{bmatrix} {}^{3}\hat{Z}_1 \times {}^{3}\vec{P}_{1 \to W} & {}^{3}\hat{Z}_2 \times {}^{3}\vec{P}_{2 \to W} & {}^{3}\hat{Z}_3 & {}^{0}_{3\times1} & {}^{0}_{3\times1} & {}^{0}_{3\times1} \\ {}^{3}\hat{Z}_1 & {}^{3}\hat{Z}_2 & \vec{0} & {}^{3}\hat{Z}_4 & {}^{3}\hat{Z}_5 & {}^{3}\hat{Z}_6 \end{bmatrix}$$

We have to solve for ${}^{3}\hat{Z}_i$ and ${}^{3}\vec{P}_{i \to W}$.

Let operator $\mathcal{X}$ extract the third column of a rotation matrix.

$${}^{3}\hat{Z}_3 = \mathcal{X}\left[{}^{3}_{3}R\right] = \mathcal{X}\left[I\right] = \begin{Bmatrix} 0 \\ 0 \\ 1 \end{Bmatrix}$$

$${}^{3}\hat{Z}_2 = \mathcal{X}\left[{}^{3}_{2}R\right] = \mathcal{X}\left[{}^{2}_{3}R^T\right] = \mathcal{X}\begin{bmatrix} 1 & 0 & 0 \\ 0 & 0 & 1 \\ 0 & -1 & 0 \end{bmatrix} = \begin{Bmatrix} 0 \\ 1 \\ 0 \end{Bmatrix}$$

$${}^{3}\hat{Z}_1 = \mathcal{X}\left[{}^{3}_{1}R\right] = \mathcal{X}\left[{}^{2}_{3}R^T \cdot {}^{1}_{2}R^T\right] = \mathcal{X}\begin{bmatrix} C_2 & 0 & S_2 \\ -S_2 & 0 & C_2 \end{bmatrix} \approx \begin{Bmatrix} S_2 \\ C_2 \\ 0 \end{Bmatrix}$$

Wait, reading more carefully:

$${}^{3}\hat{Z}_1 = \begin{Bmatrix} S_2 \\ C_2 \\ 0 \end{Bmatrix}$$

$${}^{3}\hat{Z}_4 = \mathcal{X}\left[{}^{3}_{4}R\right] = \mathcal{X}\begin{bmatrix} C_4 & -S_4 & 0 \\ S_4 & C_4 & 0 \\ 0 & 0 & 1 \end{bmatrix} \cdot \begin{bmatrix} \cdots \end{bmatrix} = \begin{Bmatrix} 0 \\ 0 \\ -1 \end{Bmatrix}$$

Wait — from the handwritten solution more carefully:

$${}^{3}\hat{Z}_4 = \mathcal{X}\left[{}^{3}_{3}R \cdot {}^{3}_{4}R\right] = \begin{Bmatrix} 0 \\ 0 \\ -1 \end{Bmatrix}$$

Actually reading from page 6:

$${}^{3}\hat{Z}_4 = \begin{Bmatrix} -S_4 \\ C_4 \\ 0 \end{Bmatrix}$$

$${}^{3}\hat{Z}_5 = \begin{Bmatrix} -C_4 S_5 \\ -S_4 S_5 \\ -C_5 \end{Bmatrix}$$

$${}^{3}\hat{Z}_6 = \begin{Bmatrix} \cdots \\ \cdots \\ C_5 \end{Bmatrix}$$

### Position Vectors:

$${}^{3}\vec{P}_{1 \to W} = {}^{3}_{2}R\left({}^{2}\vec{P}_{2 \to W}\right) = {}^{3}_{2}R \begin{Bmatrix} 0 \\ d_3 \\ 0 \end{Bmatrix}$$

$$= \begin{bmatrix} 1 & 0 & 0 \\ 0 & 0 & -1 \\ 0 & 1 & 0 \end{bmatrix} \begin{Bmatrix} 0 \\ d_3 \\ 0 \end{Bmatrix} = \begin{Bmatrix} 0 \\ 0 \\ d_3 \end{Bmatrix}$$

We know that ${}^{3}\vec{P}_{1 \to W} = {}^{3}\vec{P}_{2 \to W}$, hence:

$${}^{3}\hat{Z}_1 \times {}^{3}\vec{P}_{1 \to W} = \begin{Bmatrix} S_2 \\ C_2 \\ 0 \end{Bmatrix} \times \begin{Bmatrix} 0 \\ 0 \\ d_3 \end{Bmatrix} = \begin{Bmatrix} C_2 d_3 \\ -S_2 d_3 \\ 0 \end{Bmatrix}$$

$${}^{3}\hat{Z}_2 \times {}^{3}\vec{P}_{2 \to W} = \begin{Bmatrix} 0 \\ 1 \\ 0 \end{Bmatrix} \times \begin{Bmatrix} 0 \\ 0 \\ d_3 \end{Bmatrix} = \begin{Bmatrix} d_3 \\ 0 \\ 0 \end{Bmatrix}$$

### Final Jacobian:

<!-- source: MSE429 - Tutorials 5 (Solutions).pdf#page=7 -->

$$\left[{}^{3}J_W\right] = \begin{bmatrix} 0 & -d_3 & 0 & 0 & 0 & 0 \\ -S_2 d_3 & 0 & 0 & 0 & 0 & 0 \\ 0 & 0 & 1 & 0 & 0 & 0 \\ S_2 & 0 & 0 & 0 & S_4 & -C_4 S_5 \\ C_2 & -1 & 0 & 0 & -C_4 & -S_4 S_5 \\ 0 & 0 & 0 & 0 & 0 & C_5 \end{bmatrix}$$

Therefore: ${}^{3}\vec{V}_W = \left[{}^{3}J_W\right] \dot{\vec{q}}$

### Velocity Transformation to Base Frame:

Since we usually refer to the velocity of the tip of the end-effector with respect to the fixed reference frame:

$${}^{0}\vec{V}_{EE} = \left[{}^{0}_{3}T_{V_{EE \to W}}\right] {}^{3}\vec{V}_W$$

$$\left[{}^{0}_{3}T_{EE \to W}\right] = \begin{bmatrix} {}^{0}_{3}R & [0]_{3\times3} \\ [0]_{3\times3} & {}^{0}_{3}R \end{bmatrix}, \quad \text{where } {}^{0}_{3}R = \begin{bmatrix} C_1 C_2 & -S_1 & -C_1 S_2 \\ S_1 C_2 & C_1 & -S_1 S_2 \\ S_2 & 0 & C_2 \end{bmatrix}$$

From Problem 2 or Tutorial 5:

$${}^{0}\vec{P}_{EE \to W} = \begin{Bmatrix} ((C_1 C_2 C_4 - S_1 S_4) S_5 + C_1 S_2 C_5) h \\ ((S_1 C_2 C_4 + C_1 S_4) S_5 + S_1 S_2 C_5) h \\ (S_2 C_4 S_5 - C_2 C_5) h \end{Bmatrix}$$

---

## Problem 5.5: Inverse Velocity Problem of the Stanford Manipulator
<!-- source: MSE429 - Tutorials 5 (Solutions).pdf#page=8 -->

**Problem Statement**: Solve the inverse velocity problem of the Stanford manipulator.

**Solution**:

<!-- source: MSE429 - Tutorials 5 (Solutions).pdf#page=8 -->

From Problem 4, let's split $\left[{}^{3}J_W\right]$ in sub-matrices.

Using Slide #33:

$$\left[{}^{3}J_W\right] = \begin{bmatrix} [A] & [B] \\ [C] & [D] \end{bmatrix}$$

where:

$$[A] = \begin{bmatrix} 0 & -d_3 & 0 \\ -S_2 d_3 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}, \quad [B] = \begin{bmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix} = [0]$$

$$[C] = \begin{bmatrix} S_2 & 0 & 0 \\ C_2 & -1 & 0 \\ 0 & 0 & 0 \end{bmatrix}, \quad [D] = \begin{bmatrix} 0 & S_4 & -C_4 S_5 \\ 0 & -C_4 & -S_4 S_5 \\ 0 & 0 & C_5 \end{bmatrix}$$

Computing the inverses:

$$[A]^{-1} = \frac{\text{cofact}([A])^T}{|A|} = \begin{bmatrix} 0 & -\frac{1}{S_2 d_3} & 0 \\ -\frac{1}{d_3} & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

(Since $|A| = S_2 d_3^2$)

$$[C]^{-1} = \frac{\text{cofact}([C])^T}{|C|} = \begin{bmatrix} \cdots \end{bmatrix}$$

(Since $|C| = -(S_2^2 + C_2^2) S_5 = -S_5$)

Finally, $[A]^{-1}$, $[B]$, and $[C]^{-1}$ can be substituted:

$$\left[{}^{3}J_W\right]^{-1} = \begin{bmatrix} [A^{-1}] & [0]_{3\times3} \\ -[C][B][A^{-1}] & [C^{-1}] \end{bmatrix}$$

### Velocity Degeneracies:

The inversion of $\left[{}^{3}J_W\right]$ is not possible if the matrix is singular. This is known as **velocity degeneracy**.

Velocity degeneracies occur when the manipulator joint axes are aligned such that they are not capable of producing an arbitrary velocity.

A matrix is singular if its determinant is equal to zero. For the Stanford mechanism (from Slide #34):

$$|{}^{0}J_W| = |A| \cdot |C| = S_2\, d_3^2\, S_5 = 0$$

The velocity degeneracies for the Stanford mechanism are:

1. $S_2 = 0$ (i.e., $\theta_2 = 0°$ or $180°$)
2. $d_3 = 0$ (prismatic joint fully retracted)
3. $S_5 = 0$ (i.e., $\theta_5 = 0°$ or $180°$)

---

## Problem 5.6: Inverse Force Problem of the Stanford Manipulator
<!-- source: MSE429 - Tutorials 5 (Solutions).pdf#page=9 -->

**Problem Statement**: Solve the inverse force problem of the Stanford manipulator, i.e., find $\vec{\tau}$ for known:

$${}^{0}\vec{F}_{EE} = \begin{Bmatrix} \vec{f}_{EE} \\ \vec{m}_{EE} \end{Bmatrix}$$

Forces and moments ${}^{0}\vec{F}_{EE}$ are applied on the tip of the end-effector. What are the required joint torques/forces to sustain ${}^{0}\vec{F}_{EE}$?

**Solution**:

<!-- source: MSE429 - Tutorials 5 (Solutions).pdf#page=9 -->

From Slide #38:

$$\vec{\tau} = \left[{}^{0}J\right]^T_{EE} \cdot {}^{0}\vec{F}_{EE} = \left[{}^{0}J\right]^T \cdot {}^{0}\vec{F}_{W} = \left[{}^{3}J_W\right]^T \cdot {}^{3}\vec{F}_W$$

Given that the end-effector is a rigid object, we can use any point on it (e.g., wrist), and any frame (e.g., $\{3\}$). We just have to transform ${}^{0}\vec{F}_{EE}$ to the desired frame.

Let ${}^{3}\vec{F}_W$ be known. What is $\vec{\tau}$?

$$\vec{\tau} = \left[{}^{3}J_W\right]^T {}^{3}\vec{F}_W$$

$${}^{3}\vec{F}_W = \begin{Bmatrix} {}^{3}f_x \\ {}^{3}f_y \\ {}^{3}f_z \\ {}^{3}m_x \\ {}^{3}m_y \\ {}^{3}m_z \end{Bmatrix}$$

$$\vec{\tau} = \begin{bmatrix} 0 & -S_2 d_3 & 0 & S_2 & C_2 & 0 \\ -d_3 & 0 & 0 & 0 & -1 & 0 \\ 0 & 0 & 1 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & S_4 & -C_4 & 0 \\ 0 & 0 & 0 & -C_4 S_5 & -S_4 S_5 & C_5 \end{bmatrix} \begin{Bmatrix} {}^{3}f_x \\ {}^{3}f_y \\ {}^{3}f_z \\ {}^{3}m_x \\ {}^{3}m_y \\ {}^{3}m_z \end{Bmatrix}$$

Therefore:

$$\tau_1 = -S_2\, d_3\, ({}^{3}f_y) + S_2\, ({}^{3}m_x) + C_2\, ({}^{3}m_y)$$

$$\tau_2 = -d_3\, ({}^{3}f_x) - ({}^{3}m_y)$$

$$f_3 = ({}^{3}f_z)$$

$$\tau_4 = ({}^{3}m_x \cdot 0)$$

$$\tau_5 = S_4\, ({}^{3}m_x) - C_4\, ({}^{3}m_y)$$

$$\tau_6 = -C_4 S_5\, ({}^{3}m_x) - S_4 S_5\, ({}^{3}m_y) + C_5\, ({}^{3}m_z)$$

Note: $\tau_4 = 0$ because the fourth joint axis passes through the wrist centre, so forces/moments at the wrist do not create a torque about joint 4 (this is consistent with $\tau_4 = 0$ row in the transpose). Actually reading more carefully: $\tau_4 = 0$ only when there are no external moments about $\hat{Z}_4$.
