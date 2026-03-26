# Tutorial 4 Solutions
<!-- source: MSE429 - Tutorials 4 (Solutions).pdf#page=1 -->

## Problem 4.1: Absolute Velocity of End-Effector (Revolute + Prismatic)
<!-- source: MSE429 - Tutorials 4 (Solutions).pdf#page=1 -->

**Problem Statement**: Determine the absolute velocity of the end-effector (P).

**Diagram Description**: A mechanism is shown with a revolute joint at the base (angle $\phi$) and a prismatic joint extending along the link. Frame $\{A\}$ is at the base, frame $\{B\}$ is at the end-effector. The prismatic joint has displacement $d_1$ vertically and $d_2$ along the link. The end-effector point $P$ is at the tip. A small diagram on the right shows the velocity components: $\dot{d}_2 \sin(\phi)$ vertically and $\dot{d}_2 \cos(\phi)$ horizontally.

**Solution**:

<!-- source: MSE429 - Tutorials 4 (Solutions).pdf#page=1 -->

From Slide 8:

$${}^{A}\vec{V}_P = {}^{A}\vec{V}_{B_{\text{ORG}}} + {}^{A}_{B}R \cdot {}^{B}\vec{V}_P$$

The velocity of the origin of frame $\{B\}$ in frame $\{A\}$:

$${}^{A}\vec{V}_{B_{\text{ORG}}} = \begin{Bmatrix} 0 \\ \dot{d}_1 \\ 0 \end{Bmatrix}$$

The rotation matrix from $\{B\}$ to $\{A\}$:

$${}^{A}_{B}R = \begin{bmatrix} \hat{X}_A \cdot \hat{X}_B & \hat{Y}_A \cdot \hat{X}_B & \hat{Z}_A \cdot \hat{X}_B \\ \hat{X}_A \cdot \hat{Y}_B & \hat{Y}_A \cdot \hat{Y}_B & \hat{Z}_A \cdot \hat{Y}_B \\ \hat{X}_A \cdot \hat{Z}_B & \hat{Y}_A \cdot \hat{Z}_B & \hat{Z}_A \cdot \hat{Z}_B \end{bmatrix} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 0 & 1 \\ 0 & -1 & 0 \end{bmatrix}$$

The velocity of $P$ in frame $\{B\}$:

$${}^{B}\vec{V}_P = \begin{Bmatrix} 0 \\ -\dot{d}_2 \sin\phi \\ \dot{d}_2 \cos\phi \end{Bmatrix}$$

Therefore:

$${}^{A}\vec{V}_P = \begin{Bmatrix} 0 \\ \dot{d}_1 \\ 0 \end{Bmatrix} + \begin{bmatrix} 1 & 0 & 0 \\ 0 & 0 & 1 \\ 0 & -1 & 0 \end{bmatrix} \begin{Bmatrix} 0 \\ -\dot{d}_2 \sin\phi \\ \dot{d}_2 \cos\phi \end{Bmatrix}$$

$$\boxed{{}^{A}\vec{V}_P = \begin{Bmatrix} 0 \\ \dot{d}_1 + \dot{d}_2 \cos\phi \\ \dot{d}_2 \sin\phi \end{Bmatrix}}$$

---

## Problem 4.2: Absolute Velocity of End-Effector on a Rotating Disc
<!-- source: MSE429 - Tutorials 4 (Solutions).pdf#page=2 -->

**Problem Statement**: Determine the absolute velocity of the end-effector (P). Let the radius of the disc be $r$.

**Diagram Description**: A disc of radius $r$ rotating about its vertical axis ($\hat{Z}$) is shown. The point $P$ is on the rim of the disc. Frame $\{A\}$ is the fixed frame, frame $\{B\}$ is attached to the disc. The disc rotates with angular velocity $\dot{\phi}$.

**Solution**:

<!-- source: MSE429 - Tutorials 4 (Solutions).pdf#page=2 -->

This problem can be solved in two ways:
1. Derivatives
2. Cross-product

### Method i) Derivatives

The position of $P$ in frame $\{A\}$:

$${}^{A}\vec{P}_P = {}^{A}_{B}R \cdot {}^{B}\vec{P}_P = \begin{bmatrix} C\phi & -S\phi & 0 \\ S\phi & C\phi & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{Bmatrix} r \\ 0 \\ 0 \end{Bmatrix} = \begin{Bmatrix} r\cos\phi \\ r\sin\phi \\ 0 \end{Bmatrix} \quad \text{...(Eq 1)}$$

Taking the time derivative:

$${}^{A}\vec{V}_P = \frac{d}{dt}\left({}^{A}\vec{P}_P\right) = \begin{Bmatrix} -r\dot{\phi}\sin\phi \\ r\dot{\phi}\cos\phi \\ 0 \end{Bmatrix}$$

### Method ii) Cross-Products

$${}^{A}\vec{P}_P = {}^{A}_{B}R \cdot {}^{B}\vec{P}_P$$

$${}^{A}\vec{V}_P = \frac{d}{dt}\left({}^{A}_{B}R \cdot {}^{B}\vec{P}_P\right)$$

From Slide #9 from Chapter 5:

$${}^{A}\vec{V}_P = {}^{A}\vec{\Omega}_B \times {}^{A}_{B}R \cdot {}^{B}\vec{P}_P$$

$$= \begin{Bmatrix} 0 \\ 0 \\ \dot{\phi} \end{Bmatrix} \times \begin{bmatrix} C\phi & -S\phi & 0 \\ S\phi & C\phi & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{Bmatrix} r \\ 0 \\ 0 \end{Bmatrix}$$

$$= \begin{Bmatrix} 0 \\ 0 \\ \dot{\phi} \end{Bmatrix} \times \begin{Bmatrix} r\cos\phi \\ r\sin\phi \\ 0 \end{Bmatrix} = \boxed{\begin{Bmatrix} -r\dot{\phi}\sin\phi \\ r\dot{\phi}\cos\phi \\ 0 \end{Bmatrix}}$$

Both methods give the same result.

---

## Problem 4.3: Absolute Velocity of End-Effector (Prismatic + Revolute)
<!-- source: MSE429 - Tutorials 4 (Solutions).pdf#page=3 -->

**Problem Statement**: Determine the absolute velocity of the end-effector (P).

**Diagram Description**: A mechanism with a prismatic joint ($d_1$) at the base sliding horizontally, followed by another prismatic joint along the link. Point $P$ is at the end-effector. Frame $\{A\}$ is fixed, frame $\{B\}$ is on the sliding part, and the end-effector has angular velocity. The velocity includes both sliding and tangential components.

**Solution**:

<!-- source: MSE429 - Tutorials 4 (Solutions).pdf#page=3 -->

From Slide 10 of Chapter 5:

$${}^{A}\vec{V}_P = {}^{A}\vec{V}_{B_{\text{ORG}}} + {}^{A}_{B}R \cdot {}^{B}\vec{V}_P + {}^{A}\vec{\Omega}_B \times {}^{A}_{B}R \cdot {}^{B}\vec{P}_P$$

Where:
- ${}^{A}\vec{V}_{B_{\text{ORG}}}$ = absolute velocity of origin of frame $\{B\}$
- ${}^{A}_{B}R \cdot {}^{B}\vec{V}_P$ = sliding velocity of point $P$ w.r.t. frame $\{A\}$
- ${}^{A}\vec{\Omega}_B \times {}^{A}_{B}R \cdot {}^{B}\vec{P}_P$ = tangential velocity of point $P$ w.r.t. frame $\{A\}$

The overall velocity of point $P$ w.r.t. frame $\{A\}$ equals the sliding plus tangential velocities.

---

## Problem 4.4: Velocity Propagation for a 3R Planar Manipulator
<!-- source: MSE429 - Tutorials 4 (Solutions).pdf#page=4 -->

**Problem Statement**: Determine the velocity of the end-effector's tip of the three revolute-jointed planar manipulator shown.

**Velocity propagation equations for revolute joints** (slides 14 & 15):

$${}^{i+1}\vec{\omega}_{i+1} = {}^{i+1}_{i}R \cdot {}^{i}\vec{\omega}_i + \dot{\theta}_{i+1}\, {}^{i+1}\hat{Z}_{i+1}$$

$${}^{i+1}\vec{v}_{i+1} = {}^{i+1}_{i}R \left({}^{i}\vec{v}_i + {}^{i}\vec{\omega}_i \times {}^{i}\vec{P}_{i+1}\right)$$

**Diagram Description**: A 3R planar manipulator with three revolute joints ($\theta_1$, $\theta_2$, $\theta_3$) and link lengths $L_1$, $L_2$, $L_3$. Frames $\{0\}$, $\{1\}$, $\{2\}$, $\{3\}$, and $\{EE\}$ (end-effector) are shown at each joint and the tip.

**Solution**:

<!-- source: MSE429 - Tutorials 4 (Solutions).pdf#page=4 -->

First, find the individual link transforms:

$${}^{0}_{1}T = \begin{bmatrix} C_1 & -S_1 & 0 & 0 \\ S_1 & C_1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}, \quad {}^{1}_{2}T = \begin{bmatrix} C_2 & -S_2 & 0 & L_1 \\ S_2 & C_2 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}, \quad {}^{2}_{3}T = \begin{bmatrix} C_3 & -S_3 & 0 & L_2 \\ S_3 & C_3 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

### $i = 0$: Link 1

Angular velocity:

$${}^{1}\vec{\omega}_1 = {}^{1}_{0}R \cdot {}^{0}\vec{\omega}_0 + \dot{\theta}_1\, {}^{1}\hat{Z}_1$$

$${}^{1}\vec{\omega}_1 = {}^{1}_{0}R \begin{Bmatrix} 0 \\ 0 \\ 0 \end{Bmatrix} + \dot{\theta}_1 \begin{Bmatrix} 0 \\ 0 \\ 1 \end{Bmatrix} = \begin{Bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{Bmatrix}$$

Linear velocity:

$${}^{1}\vec{v}_1 = {}^{1}_{0}R \left({}^{0}\vec{v}_0 + {}^{0}\vec{\omega}_0 \times {}^{0}\vec{P}_1\right) = \begin{Bmatrix} 0 \\ 0 \\ 0 \end{Bmatrix}$$

### $i = 1$: Link 2

<!-- source: MSE429 - Tutorials 4 (Solutions).pdf#page=4 -->

Angular velocity:

$${}^{2}\vec{\omega}_2 = {}^{2}_{1}R \cdot {}^{1}\vec{\omega}_1 + \dot{\theta}_2\, {}^{2}\hat{Z}_2$$

$$= \begin{bmatrix} C_2 & S_2 & 0 \\ -S_2 & C_2 & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{Bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{Bmatrix} + \dot{\theta}_2 \begin{Bmatrix} 0 \\ 0 \\ 1 \end{Bmatrix} = \begin{Bmatrix} 0 \\ 0 \\ \dot{\theta}_1 + \dot{\theta}_2 \end{Bmatrix}$$

Linear velocity:

$${}^{2}\vec{v}_2 = {}^{2}_{1}R \left({}^{1}\vec{v}_1 + {}^{1}\vec{\omega}_1 \times {}^{1}\vec{P}_2\right)$$

$$= \begin{bmatrix} C_2 & S_2 & 0 \\ -S_2 & C_2 & 0 \\ 0 & 0 & 1 \end{bmatrix} \left(\begin{Bmatrix} 0 \\ 0 \\ 0 \end{Bmatrix} + \begin{Bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{Bmatrix} \times \begin{Bmatrix} L_1 \\ 0 \\ 0 \end{Bmatrix}\right)$$

$$= \begin{bmatrix} C_2 & S_2 & 0 \\ -S_2 & C_2 & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{Bmatrix} 0 \\ L_1 \dot{\theta}_1 \\ 0 \end{Bmatrix} = \begin{Bmatrix} L_1 S_2 \dot{\theta}_1 \\ L_1 C_2 \dot{\theta}_1 \\ 0 \end{Bmatrix}$$

### $i = 2$: Link 3

<!-- source: MSE429 - Tutorials 4 (Solutions).pdf#page=5 -->

Angular velocity:

$${}^{3}\vec{\omega}_3 = {}^{3}_{2}R \cdot {}^{2}\vec{\omega}_2 + \dot{\theta}_3\, {}^{3}\hat{Z}_3$$

$$= \begin{bmatrix} C_3 & S_3 & 0 \\ -S_3 & C_3 & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{Bmatrix} 0 \\ 0 \\ \dot{\theta}_1 + \dot{\theta}_2 \end{Bmatrix} + \dot{\theta}_3 \begin{Bmatrix} 0 \\ 0 \\ 1 \end{Bmatrix} = \begin{Bmatrix} 0 \\ 0 \\ \dot{\theta}_1 + \dot{\theta}_2 + \dot{\theta}_3 \end{Bmatrix}$$

Linear velocity:

$${}^{3}\vec{v}_3 = {}^{3}_{2}R \left({}^{2}\vec{v}_2 + {}^{2}\vec{\omega}_2 \times {}^{2}\vec{P}_3\right)$$

$$= \begin{bmatrix} C_3 & S_3 & 0 \\ -S_3 & C_3 & 0 \\ 0 & 0 & 1 \end{bmatrix} \left(\begin{Bmatrix} L_1 S_2 \dot{\theta}_1 \\ L_1 C_2 \dot{\theta}_1 \\ 0 \end{Bmatrix} + \begin{Bmatrix} 0 \\ 0 \\ \dot{\theta}_1 + \dot{\theta}_2 \end{Bmatrix} \times \begin{Bmatrix} L_2 \\ 0 \\ 0 \end{Bmatrix}\right)$$

$$= \begin{bmatrix} C_3 & S_3 & 0 \\ -S_3 & C_3 & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{Bmatrix} L_1 S_2 \dot{\theta}_1 \\ L_1 C_2 \dot{\theta}_1 + L_2(\dot{\theta}_1 + \dot{\theta}_2) \\ 0 \end{Bmatrix}$$

$$= \begin{Bmatrix} L_1 S_{23} \dot{\theta}_1 + L_2 S_3 (\dot{\theta}_1 + \dot{\theta}_2) \\ L_1 C_{23} \dot{\theta}_1 + L_2 C_3 (\dot{\theta}_1 + \dot{\theta}_2) \\ 0 \end{Bmatrix}$$

### $i = 3$: End-Effector

<!-- source: MSE429 - Tutorials 4 (Solutions).pdf#page=5 -->

$${}^{EE}\vec{\omega}_{EE} = {}^{3}\vec{\omega}_3$$

$${}^{EE}\vec{v}_{EE} = {}^{EE}_{3}R \left({}^{3}\vec{v}_3 + {}^{3}\vec{\omega}_3 \times {}^{3}\vec{P}_{EE}\right)$$

$$= \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} \left(\begin{Bmatrix} L_1 S_{23} \dot{\theta}_1 + L_2 S_3(\dot{\theta}_1 + \dot{\theta}_2) \\ L_1 C_{23} \dot{\theta}_1 + L_2 C_3(\dot{\theta}_1 + \dot{\theta}_2) \\ 0 \end{Bmatrix} + \begin{Bmatrix} 0 \\ 0 \\ \dot{\theta}_1 + \dot{\theta}_2 + \dot{\theta}_3 \end{Bmatrix} \times \begin{Bmatrix} L_3 \\ 0 \\ 0 \end{Bmatrix}\right)$$

$$= \begin{Bmatrix} L_1 S_{23} \dot{\theta}_1 + L_2 S_3(\dot{\theta}_1 + \dot{\theta}_2) \\ L_1 C_{23} \dot{\theta}_1 + L_2 C_3(\dot{\theta}_1 + \dot{\theta}_2) + L_3(\dot{\theta}_1 + \dot{\theta}_2 + \dot{\theta}_3) \\ 0 \end{Bmatrix}$$

### Expressing in Frame $\{0\}$:

We can find ${}^{0}\vec{V}_{EE}$ by multiplying ${}^{0}_{EE}R \cdot {}^{EE}\vec{V}_{EE}$:

$${}^{0}\vec{V}_{EE} = \begin{bmatrix} C_{123} & -S_{123} & 0 \\ S_{123} & C_{123} & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{Bmatrix} \cdot \\ \cdot \\ 0 \end{Bmatrix}$$

$$\boxed{{}^{0}\vec{V}_{EE} = \begin{Bmatrix} -L_1 S_1 \dot{\theta}_1 - L_2 S_{12}(\dot{\theta}_1 + \dot{\theta}_2) - L_3 S_{123}(\dot{\theta}_1 + \dot{\theta}_2 + \dot{\theta}_3) \\ L_1 C_1 \dot{\theta}_1 + L_2 C_{12}(\dot{\theta}_1 + \dot{\theta}_2) + L_3 C_{123}(\dot{\theta}_1 + \dot{\theta}_2 + \dot{\theta}_3) \\ \dot{\theta}_1 + \dot{\theta}_2 + \dot{\theta}_3 \end{Bmatrix}}$$

where $S_{12} = \sin(\theta_1 + \theta_2)$, $C_{12} = \cos(\theta_1 + \theta_2)$, $S_{123} = \sin(\theta_1 + \theta_2 + \theta_3)$, $C_{123} = \cos(\theta_1 + \theta_2 + \theta_3)$.

---

## Problem 4.5: Velocity Propagation for a 3-DOF Arm with 90-Degree Twist
<!-- source: MSE429 - Tutorials 4 (Solutions).pdf#page=6 -->

**Problem Statement**: For the arm with 3-DOF shown, there is a twist of 90 degrees in magnitude between axes 1 and axes 2. Let $L$ be the length of the end-effector.
- a) Derive link parameters and the kinematics for ${}^{0}_{3}T$.
- b) Solve for velocity propagation.

**Diagram Description**: A 3-DOF arm is shown with a 90-degree twist between joints 1 and 2. The first joint rotates about the vertical axis, the second about a horizontal axis (perpendicular to the first), and the third is along the same plane. The end-effector has length $L$.

**Solution**:

<!-- source: MSE429 - Tutorials 4 (Solutions).pdf#page=6 -->

### Part (a): DH Parameters and Forward Kinematics

| $i$ | $\alpha_{i-1}$ | $a_{i-1}$ | $d_i$ | $\theta_i$ |
|-----|:---:|:---:|:---:|:---:|
| 1 | 0 | 0 | 0 | $\theta_1$ |
| 2 | $-90°$ | 0 | $d_2$ | $\theta_2$ |
| 3 | 0 | 0 | 0 | $\theta_3$ |

Individual transforms:

$${}^{0}_{1}T = \begin{bmatrix} C_1 & -S_1 & 0 & 0 \\ S_1 & C_1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

$${}^{1}_{2}T = \begin{bmatrix} C_2 & -S_2 & 0 & 0 \\ 0 & 0 & 1 & d_2 \\ -S_2 & -C_2 & 0 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

$${}^{2}_{3}T = \begin{bmatrix} C_3 & -S_3 & 0 & 0 \\ S_3 & C_3 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

### Part (b): Velocity Propagation

**$i = 0$:**

$${}^{1}\vec{\omega}_1 = {}^{1}_{0}R \cdot {}^{0}\vec{\omega}_0 + \dot{\theta}_1 \hat{Z}_1 = \begin{Bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{Bmatrix}$$

$${}^{1}\vec{v}_1 = {}^{1}_{0}R \left({}^{0}\vec{v}_0 + {}^{0}\vec{\omega}_0 \times {}^{0}\vec{P}_1\right) = \begin{Bmatrix} 0 \\ 0 \\ 0 \end{Bmatrix}$$

**$i = 1$:**

$${}^{2}\vec{\omega}_2 = \begin{bmatrix} C_2 & S_2 & 0 \\ 0 & 0 & -1 \\ -S_2 & C_2 & 0 \end{bmatrix} \begin{Bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{Bmatrix} + \dot{\theta}_2 \begin{Bmatrix} 0 \\ 0 \\ 1 \end{Bmatrix} = \begin{Bmatrix} 0 \\ -\dot{\theta}_1 \\ \dot{\theta}_2 \end{Bmatrix}$$

$${}^{2}\vec{v}_2 = {}^{2}_{1}R \left({}^{1}\vec{v}_1 + {}^{1}\vec{\omega}_1 \times {}^{1}\vec{P}_2\right)$$

$$= \begin{bmatrix} C_2 & S_2 & 0 \\ 0 & 0 & -1 \\ -S_2 & C_2 & 0 \end{bmatrix} \left(\begin{Bmatrix} 0 \\ 0 \\ 0 \end{Bmatrix} + \begin{Bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{Bmatrix} \times \begin{Bmatrix} 0 \\ d_2 \\ 0 \end{Bmatrix}\right) = \begin{Bmatrix} -d_2 S_2 \dot{\theta}_1 \\ 0 \\ -d_2 C_2 \dot{\theta}_1 \end{Bmatrix}$$

**$i = 2$:**

$${}^{3}\vec{\omega}_3 = {}^{3}_{2}R \cdot {}^{2}\vec{\omega}_2 + \dot{\theta}_3 \hat{Z}_3 = \begin{Bmatrix} \cdot \\ \cdot \\ \dot{\theta}_2 + \dot{\theta}_3 \end{Bmatrix}$$

$${}^{3}\vec{v}_3 = {}^{3}_{2}R \left({}^{2}\vec{v}_2 + {}^{2}\vec{\omega}_2 \times {}^{2}\vec{P}_3\right)$$

$$= \begin{Bmatrix} \cdot \\ \cdot \\ -d_2 C_{23} \dot{\theta}_1 \end{Bmatrix}$$

If also ${}^{3}\vec{P}_{EE} = \begin{Bmatrix} L \\ 0 \\ 0 \end{Bmatrix}$, then:

$${}^{0}\vec{v}_{EE} = {}^{0}_{3}R \cdot {}^{3}\vec{v}_{EE}$$

We can also show that:

$${}^{0}\vec{v}_{EE} = \begin{Bmatrix} C_1 S_{23} \dot{\theta}_1 \\ -d_2 \dot{\theta}_1 - L S_3(\dot{\theta}_2 + \dot{\theta}_3) \\ -d_2 C_1 \dot{\theta}_1 + L C_3(\dot{\theta}_2 + \dot{\theta}_3) \end{Bmatrix}$$
