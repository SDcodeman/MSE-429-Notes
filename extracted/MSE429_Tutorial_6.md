# MSE 429 - Tutorial 6 (Solutions)

---

## Problem 1: Parallel Axis Theorem for Inertia Tensor of a Rectangular Body

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=1 -->

**Problem Statement:** For the rectangular body shown, let the moment of inertia around the C.G. be known, where frame $\{G\}$ is located. Use the parallel axis theorem to evaluate the inertia tensor with respect to a frame $\{A\}$ located at the lower left corner of the body. Consider uniform density.

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=1 -->

**Given:** A rectangular body with dimensions $w$ (width), $\ell$ (length), and $h$ (height). Volume $V = abc$. The inertia tensor about the center of mass (from Slide 7) for a rectangular body is:

$$I_{xx} = \frac{1}{12}m(b^2 + c^2), \quad I_{yy} = \frac{1}{12}m(a^2 + c^2), \quad I_{zz} = \frac{1}{12}m(a^2 + b^2)$$

so the inertia tensor with respect to the center of mass is:

$${}^{G}\mathbf{I} = \frac{m}{12}\begin{bmatrix} \ell^2 + h^2 & 0 & 0 \\ 0 & w^2 + h^2 & 0 \\ 0 & 0 & w^2 + \ell^2 \end{bmatrix}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=1 -->

### Solution

**Translation of the inertia tensor from frame $\{G\}$ to frame $\{A\}$:**

The position of the center of mass relative to the corner frame $\{A\}$ is:

$$X_A = P^x_{G \to A} = -\frac{w}{2}, \quad Y_A = P^y_{G \to A} = -\frac{\ell}{2}, \quad Z_A = P^z_{G \to A} = -\frac{h}{2}$$

**From Slide 12 (Parallel Axis Theorem):**

$${}^{A}I_{xx} = {}^{G}I_{xx} + m(Y_A^2 + Z_A^2) = \frac{1}{12}m(\ell^2 + h^2) + m\left(\left(-\frac{\ell}{2}\right)^2 + \left(-\frac{h}{2}\right)^2\right) = \frac{1}{3}m(\ell^2 + h^2)$$

Similarly:

$${}^{A}I_{yy} = \frac{1}{3}m(w^2 + h^2), \quad {}^{A}I_{zz} = \frac{1}{3}m(\ell^2 + w^2)$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=1 -->

**Products of Inertia:**

$${}^{A}I_{xy} = {}^{G}I_{xy} + m\,X_A\,Y_A = 0 + m\left(-\frac{w}{2}\right)\left(-\frac{\ell}{2}\right) = \frac{m}{4}w\ell$$

Similarly:

$${}^{A}I_{yz} = \frac{m}{4}wh, \quad {}^{A}I_{ye} = \frac{m}{4}\ell h$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=1 -->

**The inertia tensor at corner frame $\{A\}$ is:**

$${}^{A}\mathbf{I} = \begin{bmatrix} \frac{m}{3}(\ell^2 + h^2) & -\frac{m}{4}w\ell & -\frac{m}{4}wh \\ -\frac{m}{4}w\ell & \frac{m}{3}(w^2 + h^2) & -\frac{m}{4}\ell h \\ -\frac{m}{4}wh & -\frac{m}{4}\ell h & \frac{m}{3}(\ell^2 + w^2) \end{bmatrix}$$

> **Note:** ${}^{A}\mathbf{I}$ is always a positive definite matrix and is symmetric. All eigenvalues of ${}^{A}\mathbf{I}$ are positive.

---

## Problem 2: Lagrangian Dynamics of a Two-Link Planar Manipulator

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=2 -->

**Problem Statement:** Compute the closed form dynamic equation of the two revolute jointed planar manipulator using the Lagrangian formulation.

**Characteristics of the system:**
- Assume the links to be slender bars
- Let the center of mass be in the middle of each link
- Assume the base is not rotating
- No forces or moments are being applied at the end-effector

**Lagrangian equation:**

$$\frac{d}{dt}\frac{\partial L}{\partial \dot{q}_i} - \frac{\partial L}{\partial q_i} = \tau_i$$

$$L = k_1 + u_1 + k_2 - u_2$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=2 -->

### Solution: Kinetic and Potential Energy of Link 1

**Kinetic energy of Link 1:**

$$k_1 = \frac{1}{2}\,{}^{1}v_{G1}^T\,m_1\,{}^{1}v_{G1} + \frac{1}{2}\,{}^{1}\omega_1^T\,{}^{G_1}I_1\,{}^{1}\omega_1$$

The inertia tensor of link 1 about its center of mass:

$${}^{G_1}I_1 = \begin{bmatrix} 0 & 0 & 0 \\ 0 & I_{yy} & 0 \\ 0 & 0 & I_{zz} \end{bmatrix}$$

Angular velocity of link 1:

$${}^{1}\omega_1 = \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{bmatrix}$$

Linear velocity of the center of mass of link 1:

$${}^{1}v_{G1} = {}^{1}\omega_1 \times {}^{1}P_{G1} = \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{bmatrix} \times \begin{bmatrix} l_1/2 \\ 0 \\ 0 \end{bmatrix} = \begin{bmatrix} 0 \\ l_1\dot{\theta}_1/2 \\ 0 \end{bmatrix}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=2 -->

**Translational kinetic energy of link 1:**

$$\frac{1}{2}\,{}^{0}v_{G1}^T\,m_1\,{}^{0}v_{G1} = \frac{1}{2}m_1\begin{bmatrix} 0 & l_1\dot{\theta}_1/2 & 0 \end{bmatrix}\begin{bmatrix} 0 \\ l_1\dot{\theta}_1/2 \\ 0 \end{bmatrix} = \frac{m_1(l_1\dot{\theta}_1)^2}{8}$$

**Rotational kinetic energy of link 1:**

$${}^{1}\omega_1^T\,{}^{G_1}I_1\,{}^{1}\omega_1 = \begin{bmatrix} 0 & 0 & \dot{\theta}_1 \end{bmatrix}\begin{bmatrix} 0 & 0 & 0 \\ 0 & I_{yy} & 0 \\ 0 & 0 & I_{zz} \end{bmatrix}\begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{bmatrix} = I_{zz}\dot{\theta}_1^2$$

**Total kinetic energy of link 1:**

$$k_1 = \frac{m_1(l_1\dot{\theta}_1)^2}{8} + \frac{I_{zz}\dot{\theta}_1^2}{2}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=3 -->

### Potential Energy of Link 1

$$u_1 = -m_1 g^T\,{}^{0}P_{G1} = -m_1\begin{bmatrix} 0 & -g & 0 \end{bmatrix}\begin{bmatrix} l_1 c_1/2 \\ l_1 s_1/2 \\ 0 \end{bmatrix} = m_1 g \frac{l_1 s_1}{2}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=3 -->

### Kinetic and Potential Energy of Link 2

**Kinetic energy of Link 2:**

$$k_2 = \frac{1}{2}\,{}^{2}v_{G2}^T\,m_2\,{}^{2}v_{G2} + \frac{1}{2}\,{}^{2}\omega_2^T\,{}^{G_2}I_2\,{}^{2}\omega_2$$

Inertia tensor:

$${}^{G_2}I_2 = \begin{bmatrix} 0 & 0 & 0 \\ 0 & I_{yy} & 0 \\ 0 & 0 & I_{zz} \end{bmatrix}$$

Angular velocity:

$${}^{2}\omega_2 = \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_2 \end{bmatrix}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=3 -->

**Linear velocity of center of mass of link 2:**

$${}^{2}v_{G2} = {}^{2}R_1\,{}^{1}v_1 + {}^{2}\omega_2 \times {}^{2}P_{G2}$$

$$= \begin{bmatrix} c_2 & s_2 & 0 \\ -s_2 & c_2 & 0 \\ 0 & 0 & 1 \end{bmatrix}\begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{bmatrix} \times \begin{bmatrix} l_1 \\ 0 \\ 0 \end{bmatrix} + \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 + \dot{\theta}_2 \end{bmatrix} \times \begin{bmatrix} l_2/2 \\ 0 \\ 0 \end{bmatrix} = \begin{bmatrix} s_2 l_1 \dot{\theta}_1 \\ c_2 l_1 \dot{\theta}_1 + l_2(\dot{\theta}_1 + \dot{\theta}_2)/2 \\ 0 \end{bmatrix}$$

**Translational kinetic energy of link 2:**

$$\frac{1}{2}\,{}^{2}v_{G2}^T\,m_2\,{}^{2}v_{G2} = \frac{1}{2}m_2\left[(s_2 l_1 \dot{\theta}_1)^2 + (c_2 l_1 \dot{\theta}_1 + l_2(\dot{\theta}_1 + \dot{\theta}_2)/2)^2\right]$$

$$= m_2\left((l_1\dot{\theta}_1)^2/2 + c_2 l_1 \dot{\theta}_1 l_2 (\dot{\theta}_1 + \dot{\theta}_2)/2 + (l_2(\dot{\theta}_1 + \dot{\theta}_2))^2/8\right)$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=3 -->

**Rotational kinetic energy of link 2:**

$$\frac{1}{2}\,{}^{2}\omega_2^T\,{}^{G_2}I_2\,{}^{2}\omega_2 = \begin{bmatrix} 0 & 0 & \dot{\theta}_1 + \dot{\theta}_2 \end{bmatrix}\begin{bmatrix} 0 & 0 & 0 \\ 0 & I_{yy2} & 0 \\ 0 & 0 & I_{zz2} \end{bmatrix}\begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 + \dot{\theta}_2 \end{bmatrix} = \frac{1}{2}I_{zz2}(\dot{\theta}_1 + \dot{\theta}_2)^2$$

**Total kinetic energy of link 2:**

$$k_2 = m_2(l_1\dot{\theta}_1)^2/2 + m_2 c_2 l_1 l_2 \dot{\theta}_1^2/2 + m_2 c_2 l_1 \dot{\theta}_1 l_2 \dot{\theta}_2/2 + \frac{m_2(l_2\dot{\theta}_1)^2}{8} + \frac{m_2(l_2\dot{\theta}_2)^2}{8} + \frac{m_2 l_2 \dot{\theta}_1 \dot{\theta}_2}{4} + \frac{I_{zz2}\dot{\theta}_1^2}{2} + \frac{I_{zz2}\dot{\theta}_2^2}{2} + I_{zz2}\dot{\theta}_1\dot{\theta}_2$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=4 -->

### Potential Energy of Link 2

$$u_2 = -m_2 g^T\,{}^{0}P_{G2} = -m_2\begin{bmatrix} 0 & -g & 0 \end{bmatrix}\begin{bmatrix} l_1 c_1 + \frac{l_2 c_{12}}{2} \\ l_1 s_1 + \frac{l_2 s_{12}}{2} \\ 0 \end{bmatrix} = m_2 g\left(l_1 c_1 + \frac{l_2 c_{12}}{2}\right)$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=4 -->

### The Lagrangian

$$L = k_1 + u_1 + k_2 - u_2$$

$$= \frac{m_1(l_1\dot{\theta}_1)^2}{8} + \frac{I_{zz1}\dot{\theta}_1^2}{2} + m_2(l_1\dot{\theta}_1)^2/2 + m_2 c_2 l_1 l_2 \dot{\theta}_1^2/2 + m_2 c_2 l_1 \dot{\theta}_1 l_2 \dot{\theta}_2/2 + \frac{m_2(l_2\dot{\theta}_1)^2}{8}$$

$$+ \frac{m_2(l_2\dot{\theta}_2)^2}{8} + \frac{m_2 l_2 \dot{\theta}_1 \dot{\theta}_2}{4} + \frac{I_{zz2}\dot{\theta}_1^2}{2} + \frac{I_{zz2}\dot{\theta}_2^2}{2} + I_{zz2}\dot{\theta}_1\dot{\theta}_2 - m_1 g\frac{l_1 s_1}{2} - m_2 g\left(l_1 s_1 + \frac{l_2 s_{12}}{2}\right)$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=4 -->

### Applying the Euler-Lagrange Equation

$$\frac{d}{dt}\frac{\partial L}{\partial \dot{q}_i} - \frac{\partial L}{\partial q_i} = \tau_i$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=4 -->

#### For $\theta_1$:

$$\frac{\partial L}{\partial \dot{\theta}_1} = \frac{m_1 l_1^2 \dot{\theta}_1}{4} + I_{zz1}\dot{\theta}_1 + m_2 l_1^2 \dot{\theta}_1/2 + m_2 c_2 l_1 l_2 \dot{\theta}_1 + m_2 c_2 l_1 l_2 \dot{\theta}_2/2 + \frac{m_2 l_2^2 \dot{\theta}_1}{4} + \frac{m_2 l_2^2 \dot{\theta}_2}{4} + I_{zz2}\dot{\theta}_1 + I_{zz2}\dot{\theta}_2$$

$$\frac{d}{dt}\frac{\partial L}{\partial \dot{\theta}_1} = \frac{m_1 l_1^2 \ddot{\theta}_1}{4} + I_{zz1}\ddot{\theta}_1 + m_2 l_1^2 \ddot{\theta}_1/2 - m_2 s_2 \dot{\theta}_2 l_1 l_2 \dot{\theta}_1 + m_2 c_2 l_1 l_2 \ddot{\theta}_1 - m_2 s_2 l_1 l_2 \dot{\theta}_2^2/2 + m_2 c_2 l_1 l_2 \ddot{\theta}_2/2$$

$$+ \frac{m_2 l_2^2 \ddot{\theta}_1}{4} + \frac{m_2 l_2^2 \ddot{\theta}_2}{4} + I_{zz2}\ddot{\theta}_1 + I_{zz2}\ddot{\theta}_2$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=4 -->

$$-\frac{\partial L}{\partial \theta_1} = m_1 g\left(\frac{l_1 c_1}{2}\right) + m_2 g\left(l_1 c_1 + \frac{l_2 c_{12}}{2}\right)$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=4 -->

**Joint torque $\tau_1$:**

$$\tau_1 = \frac{d}{dt}\frac{\partial L}{\partial \dot{\theta}_1} - \frac{\partial L}{\partial \theta_1} = \frac{m_1 l_1^2 \ddot{\theta}_1}{4} + I_{zz1}\ddot{\theta}_1 + m_2 l_1^2 \ddot{\theta}_1/2 + m_2 c_2 l_1 l_2 \ddot{\theta}_1 + m_2 c_2 l_1 l_2 \ddot{\theta}_2/2 + \frac{m_2 l_2^2 \ddot{\theta}_1}{4} + \frac{m_2 l_2^2 \ddot{\theta}_2}{4} + I_{zz2}\ddot{\theta}_1$$

$$+ I_{zz2}\ddot{\theta}_2 + m_1 g\left(\frac{l_1 c_1}{2}\right) + m_2 g\left(l_1 c_1 + \frac{l_2 c_{12}}{2}\right)$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=5 -->

#### For $\theta_2$:

$$\frac{\partial L}{\partial \dot{\theta}_2} = m_2 c_2 l_1 l_2 \dot{\theta}_1/2 + \frac{m_2 l_2^2 \dot{\theta}_2}{4} + \frac{m_2 l_2 \dot{\theta}_1}{4} + I_{zz2}\dot{\theta}_2 + I_{zz2}\dot{\theta}_1$$

$$\frac{d}{dt}\frac{\partial L}{\partial \dot{\theta}_2} = -m_2 s_2 \dot{\theta}_2 l_1 l_2 \dot{\theta}_1/2 + m_2 c_2 l_1 l_2 \ddot{\theta}_1/2 + \frac{m_2 l_2^2 \ddot{\theta}_2}{4} + \frac{m_2 l_2 \ddot{\theta}_1}{4} + I_{zz2}\ddot{\theta}_2 + I_{zz2}\ddot{\theta}_1$$

$$-\frac{\partial L}{\partial \theta_2} = +m_2 s_2 l_1 l_2 \dot{\theta}_1^2 + m_2 s_2 l_1 l_2 \dot{\theta}_1 \dot{\theta}_2/2 + m_2 g\frac{l_2 c_{12}}{2}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=5 -->

**Joint torque $\tau_2$:**

$$\tau_2 = \frac{d}{dt}\frac{\partial L}{\partial \dot{\theta}_2} - \frac{\partial L}{\partial \theta_2} = m_2 c_2 l_1 l_2 \ddot{\theta}_1/2 + \frac{m_2 l_2^2 \ddot{\theta}_2}{4} + \frac{m_2 l_2 \ddot{\theta}_1}{4} + I_{zz2}\ddot{\theta}_2 + I_{zz2}\ddot{\theta}_1 + m_2 g\frac{l_2 c_{12}}{2}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=5 -->

### Matrix Form of Dynamic Equations

$$\begin{bmatrix} \tau_1 \\ \tau_2 \end{bmatrix} = \begin{bmatrix} \frac{m_1 l_1^2}{4} + I_{zz1} + m_2 l_1/2 + m_2 c_2 l_1 l_2 + \frac{m_2 l_2^2}{4} + I_{zz2} & m_2 c_2 l_1 l_2/2 + \frac{m_2 l_2^2}{4} + I_{zz2} \\ m_2 c_2 l_1 l_2/2 + \frac{m_2 l_2}{4} + I_{zz2} & \frac{m_2 l_2^2}{4} + I_{zz2} \end{bmatrix}\begin{bmatrix} \ddot{\theta}_1 \\ \ddot{\theta}_2 \end{bmatrix}$$

$$+ \begin{bmatrix} -m_2 s_2 \dot{\theta}_2 l_1 l_2 \dot{\theta}_1 - m_2 s_2 l_1 l_2 \dot{\theta}_2^2/2 \\ m_2 s_2 l_1 l_2 \dot{\theta}_1^2 \end{bmatrix} + \begin{bmatrix} m_1\left(\frac{l_1 c_1}{2}\right) + m_2\left(l_1 c_1 + \frac{l_2 c_{12}}{2}\right) \\ m_2 \frac{l_2 c_{12}}{2} \end{bmatrix}g$$

---

## Problem 3: Newton-Euler Recursive Formulation for Two-Link Planar Manipulator

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=6 -->

**Problem Statement:** Compute the closed form dynamic equation of the two revolute jointed planar manipulator using the Newton-Euler recursive formulation.

**Characteristics of the system:**
- Assume the links to be slender bars
- Let the center of mass be in the middle of each link
- Assume the base is not rotating
- No forces or moments are being applied at the end-effector

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=6 -->

### Setup: Homogeneous Matrices, Rotation Matrices, and Position Vectors

**Link 1 (Frame 0 to 1):**

$${}^{0}_{1}T = \begin{bmatrix} c_1 & -s_1 & 0 & 0 \\ s_1 & c_1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}, \quad {}^{0}P_1 = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix}, \quad {}^{1}P_{G_1} = \begin{bmatrix} l_1/2 \\ 0 \\ 0 \end{bmatrix}$$

$${}^{1}_{0}R = \begin{bmatrix} c_1 & -s_1 & 0 \\ s_1 & c_1 & 0 \\ 0 & 0 & 1 \end{bmatrix}, \quad {}^{0}_{1}R = \begin{bmatrix} c_1 & s_1 & 0 \\ -s_1 & c_1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=6 -->

**Link 2 (Frame 1 to 2):**

$${}^{1}_{2}T = \begin{bmatrix} c_2 & -s_2 & 0 & 0 \\ s_2 & c_2 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}, \quad {}^{1}P_2 = \begin{bmatrix} l_1 \\ 0 \\ 0 \end{bmatrix}, \quad {}^{2}P_{G_2} = \begin{bmatrix} l_2/2 \\ 0 \\ 0 \end{bmatrix}$$

$${}^{1}_{2}R = \begin{bmatrix} c_2 & -s_2 & 0 \\ s_2 & c_2 & 0 \\ 0 & 0 & 1 \end{bmatrix}, \quad {}^{2}_{1}R = \begin{bmatrix} c_2 & s_2 & 0 \\ -s_2 & c_2 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=6 -->

**End-effector (Frame 2 to 3):**

$${}^{2}_{3}T = \begin{bmatrix} 1 & 0 & 0 & l_2 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}, \quad {}^{2}_{3}R = {}^{3}_{2}R = I_{3\times3} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}, \quad {}^{2}P_3 = \begin{bmatrix} l_2 \\ 0 \\ 0 \end{bmatrix}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=6 -->

### Inertia Tensors (Slender Bars)

From Slide 1, the inertia tensors of the links (which are slender bars) are:

$${}^{G_1}I_1 = \begin{bmatrix} 0 & 0 & 0 \\ 0 & I_{yy_1} & 0 \\ 0 & 0 & I_{zz_1} \end{bmatrix} = \frac{1}{12}m_1 l_1^2\begin{bmatrix} 0 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

$${}^{G_2}I_2 = \begin{bmatrix} 0 & 0 & 0 \\ 0 & I_{yy_2} & 0 \\ 0 & 0 & I_{zz_2} \end{bmatrix} = \frac{1}{12}m_2 l_2^2\begin{bmatrix} 0 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

> **Note:** $I_{xx_1} = I_{xx_2} = 0$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=6 -->

### Initial Conditions

Given that the base is not rotating:

$${}^{0}\vec{\omega}_0 = 0 = {}^{0}\dot{\vec{\omega}}_0$$

Applying the gravity effect:

$${}^{0}\dot{\vec{v}}_0 = \begin{bmatrix} 0 \\ g \\ 0 \end{bmatrix}$$

(In the figure, $\hat{y}$ is the vertical axis.)

No forces/moments at end-effector:

$${}^{3}\vec{f}_3 = {}^{3}\vec{n}_3 = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=7 -->

### Outward Kinematics: $i = 0 \to 1$

Using Slide #19:

**Angular velocity of link 1 ($i=0$):**

$${}^{1}\vec{\omega}_1 = {}^{1}_{0}R\,{}^{0}\vec{\omega}_0 + \dot{\theta}_1\,{}^{1}\hat{z}_1 = \vec{0} + \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{bmatrix}$$

**Angular acceleration of link 1:**

$${}^{1}\dot{\vec{\omega}}_1 = {}^{1}_{0}R\,{}^{0}\dot{\vec{\omega}}_0 + {}^{1}_{0}R\,{}^{0}\vec{\omega}_0 \times \dot{\theta}_1\,{}^{1}\hat{z}_1 + \ddot{\theta}_1\,{}^{1}\hat{z}_1 = \vec{0} + \vec{0} + \begin{bmatrix} 0 \\ 0 \\ \ddot{\theta}_1 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ \ddot{\theta}_1 \end{bmatrix}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=7 -->

**Linear acceleration (using Slide #20):**

$${}^{1}\dot{\vec{v}}_1 = {}^{1}_{0}R\left({}^{0}\dot{\vec{\omega}}_0 \times {}^{0}P_1 + {}^{0}\vec{\omega}_0 \times ({}^{0}\vec{\omega}_0 \times {}^{0}P_1) + {}^{0}\dot{\vec{v}}_0\right)$$

$$= \begin{bmatrix} c_1 & s_1 & 0 \\ -s_1 & c_1 & 0 \\ 0 & 0 & 1 \end{bmatrix}\left(\vec{0} + \vec{0} + \begin{bmatrix} 0 \\ g \\ 0 \end{bmatrix}\right) = \begin{bmatrix} s_1 g \\ c_1 g \\ 0 \end{bmatrix}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=7 -->

**Linear acceleration of center of mass of link 1:**

$${}^{1}\dot{\vec{v}}_{G_1} = {}^{1}\dot{\vec{\omega}}_1 \times {}^{1}P_{G_1} + {}^{1}\vec{\omega}_1 \times ({}^{1}\vec{\omega}_1 \times {}^{1}P_{G_1}) + {}^{1}\dot{\vec{v}}_1$$

$$= \begin{bmatrix} 0 \\ 0 \\ \ddot{\theta}_1 \end{bmatrix} \times \begin{bmatrix} l_1/2 \\ 0 \\ 0 \end{bmatrix} + \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{bmatrix} \times \left(\begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{bmatrix} \times \begin{bmatrix} l_1/2 \\ 0 \\ 0 \end{bmatrix}\right) + \begin{bmatrix} s_1 g \\ c_1 g \\ 0 \end{bmatrix}$$

$$= \begin{bmatrix} 0 \\ \ddot{\theta}_1(l_1/2) \\ 0 \end{bmatrix} + \begin{bmatrix} -\dot{\theta}_1^2(l_1/2) \\ 0 \\ 0 \end{bmatrix} + \begin{bmatrix} s_1 g \\ c_1 g \\ 0 \end{bmatrix} = \begin{bmatrix} -\dot{\theta}_1^2(l_1/2) + s_1 g \\ \ddot{\theta}_1(l_1/2) + c_1 g \\ 0 \end{bmatrix}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=7 -->

**Force acting on link 1:**

$${}^{1}\vec{F}_1 = m_1\,{}^{1}\dot{\vec{v}}_{G_1} = \begin{bmatrix} -\dot{\theta}_1^2 m_1(l_1/2) + s_1 m_1 g \\ \ddot{\theta}_1 m_1(l_1/2) + c_1 m_1 g \\ 0 \end{bmatrix}$$

**Torque acting on link 1:**

$${}^{1}\vec{N}_1 = {}^{G_1}I_1\,{}^{1}\dot{\vec{\omega}}_1 + {}^{1}\vec{\omega}_1 \times {}^{G_1}I_1\,{}^{1}\vec{\omega}_1$$

$$= \begin{bmatrix} 0 & 0 & 0 \\ 0 & I_{yy_1} & 0 \\ 0 & 0 & I_{zz_1} \end{bmatrix}\begin{bmatrix} 0 \\ 0 \\ \ddot{\theta}_1 \end{bmatrix} + \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{bmatrix} \times \begin{bmatrix} 0 & 0 & 0 \\ 0 & I_{yy_1} & 0 \\ 0 & 0 & I_{zz_1} \end{bmatrix}\begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ I_{zz_1}\ddot{\theta}_1 \end{bmatrix}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=8 -->

### Outward Kinematics: $i = 1$

**Angular velocity of link 2:**

$${}^{2}\vec{\omega}_2 = {}^{2}_{1}R\,{}^{1}\vec{\omega}_1 + \dot{\theta}_2\,{}^{2}\hat{z}_2 = \begin{bmatrix} c_2 & s_2 & 0 \\ -s_2 & c_2 & 0 \\ 0 & 0 & 1 \end{bmatrix}\begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{bmatrix} + \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_2 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 + \dot{\theta}_2 \end{bmatrix}$$

**Angular acceleration of link 2:**

$${}^{2}\dot{\vec{\omega}}_2 = {}^{2}_{1}R\,{}^{1}\dot{\vec{\omega}}_1 + \ddot{\theta}_2\,{}^{2}\hat{z}_2 = \begin{bmatrix} c_2 & s_2 & 0 \\ -s_2 & c_2 & 0 \\ 0 & 0 & 1 \end{bmatrix}\begin{bmatrix} 0 \\ 0 \\ \ddot{\theta}_1 \end{bmatrix} + \begin{bmatrix} 0 \\ 0 \\ \ddot{\theta}_2 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ \ddot{\theta}_1 + \ddot{\theta}_2 \end{bmatrix}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=8 -->

**Linear acceleration of link 2:**

$${}^{2}\dot{\vec{v}}_2 = {}^{2}_{1}R\left({}^{1}\dot{\vec{\omega}}_1 \times {}^{1}P_2 + {}^{1}\vec{\omega}_1 \times ({}^{1}\vec{\omega}_1 \times {}^{1}P_2) + {}^{1}\dot{\vec{v}}_1\right)$$

$$= \begin{bmatrix} c_2 & s_2 & 0 \\ -s_2 & c_2 & 0 \\ 0 & 0 & 1 \end{bmatrix}\left(\begin{bmatrix} 0 \\ 0 \\ \ddot{\theta}_1 \end{bmatrix} \times \begin{bmatrix} l_1 \\ 0 \\ 0 \end{bmatrix} + \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{bmatrix} \times \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{bmatrix} \times \begin{bmatrix} l_1 \\ 0 \\ 0 \end{bmatrix} + \begin{bmatrix} s_1 g \\ c_1 g \\ 0 \end{bmatrix}\right)$$

$$= \begin{bmatrix} c_2 & s_2 & 0 \\ -s_2 & c_2 & 0 \\ 0 & 0 & 1 \end{bmatrix}\begin{bmatrix} -\dot{\theta}_1^2 l_1 + s_1 g \\ \ddot{\theta}_1 l_1 + c_1 g \\ 0 \end{bmatrix} = \begin{bmatrix} -c_2\dot{\theta}_1^2 l_1 + s_2\ddot{\theta}_1 l_1 + s_{12}g \\ s_2\dot{\theta}_1^2 l_1 + c_2\ddot{\theta}_1 l_1 + c_{12}g \\ 0 \end{bmatrix}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=8 -->

**Linear acceleration of center of mass of link 2:**

$${}^{2}\dot{\vec{v}}_{G_2} = {}^{2}\dot{\vec{\omega}}_2 \times {}^{2}P_{G_2} + {}^{2}\vec{\omega}_2 \times ({}^{2}\vec{\omega}_2 \times {}^{2}P_{G_2}) + {}^{2}\dot{\vec{v}}_2$$

$$= \begin{bmatrix} 0 \\ 0 \\ \ddot{\theta}_1 + \ddot{\theta}_2 \end{bmatrix} \times \begin{bmatrix} l_2/2 \\ 0 \\ 0 \end{bmatrix} + \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 + \dot{\theta}_2 \end{bmatrix} \times \left(\begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 + \dot{\theta}_2 \end{bmatrix} \times \begin{bmatrix} l_2/2 \\ 0 \\ 0 \end{bmatrix}\right) + \begin{bmatrix} -c_2\dot{\theta}_1^2 l_1 + s_2\ddot{\theta}_1 l_1 + s_{12}g \\ s_2\dot{\theta}_1^2 l_1 + c_2\ddot{\theta}_1 l_1 + c_{12}g \\ 0 \end{bmatrix}$$

$$= \begin{bmatrix} s_2\ddot{\theta}_1 l_1 - c_2\dot{\theta}_1^2 l_1 - (\dot{\theta}_1 + \dot{\theta}_2)^2(l_2/2) + s_{12}g \\ c_2\ddot{\theta}_1 l_1 + s_2\dot{\theta}_1^2 l_1 + (\dot{\theta}_1 + \dot{\theta}_2)^2(l_2/2) + c_{12}g \\ 0 \end{bmatrix}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=8 -->

**Force acting on link 2:**

$${}^{2}\vec{F}_2 = m_2\,{}^{2}\dot{\vec{v}}_{G_2} = m_2\begin{bmatrix} s_2\ddot{\theta}_1 l_1 - c_2\dot{\theta}_1^2 l_1 - (\dot{\theta}_1 + \dot{\theta}_2)^2(l_2/2) + s_{12}g \\ c_2\ddot{\theta}_1 l_1 + s_2\dot{\theta}_1^2 l_1 + (\dot{\theta}_1 + \dot{\theta}_2)(l_2/2) + s_2\dot{\theta}_1^2 l_2 + c_{12}g \\ 0 \end{bmatrix}$$

**Torque acting on link 2:**

$${}^{2}\vec{N}_2 = {}^{G_2}I_2\,{}^{2}\dot{\vec{\omega}}_2 + {}^{2}\vec{\omega}_2 \times {}^{G_2}I_2\,{}^{2}\vec{\omega}_2$$

$$= \begin{bmatrix} 0 & 0 & 0 \\ 0 & I_{yy_2} & 0 \\ 0 & 0 & I_{zz_2} \end{bmatrix}\begin{bmatrix} 0 \\ \dot{\theta}_1 + \dot{\theta}_2 \end{bmatrix} + \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 + \dot{\theta}_2 \end{bmatrix} \times \begin{bmatrix} 0 & 0 & 0 \\ 0 & I_{yy_2} & 0 \\ 0 & 0 & I_{zz_2} \end{bmatrix}\begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 + \dot{\theta}_2 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \\ (\ddot{\theta}_1 + \ddot{\theta}_2)I_{zz_2} \end{bmatrix}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=9 -->

### Inward Force Iterations: $i = 2 \to 1$

**$i = 2$:**

**Force on link 2 joint:**

$${}^{2}\vec{f}_2 = {}^{2}_{3}R\,{}^{3}\vec{f}_3 + {}^{2}\vec{F}_2 = m_2\begin{bmatrix} s_2\ddot{\theta}_1 l_1 - c_2\dot{\theta}_1^2 l_1 - (\dot{\theta}_1 + \dot{\theta}_2)^2(l_2/2) + s_{12}g \\ c_2\ddot{\theta}_1 l_1 + (\dot{\theta}_1 + \dot{\theta}_2)^2(l_2/2) + s_2\dot{\theta}_1^2 l_2 + c_{12}g \\ 0 \end{bmatrix}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=9 -->

**Moment on link 2:**

$${}^{2}\vec{n}_2 = {}^{2}\vec{N}_2 + {}^{2}_{3}R\,{}^{3}\vec{n}_3 + {}^{2}P_{G_2} \times {}^{2}\vec{F}_2 + {}^{2}P_3 \times {}^{2}_{3}R\,{}^{3}\vec{f}_3$$

$$= \begin{bmatrix} 0 \\ 0 \\ (\ddot{\theta}_1 + \ddot{\theta}_2)I_{zz_2} \end{bmatrix} + \begin{bmatrix} l_2/2 \\ 0 \\ 0 \end{bmatrix} \times {}^{2}\vec{F}_2$$

**Joint torque $\tau_2$ (for revolute joint):**

$$\tau_2 = {}^{2}\vec{n}_2^T\,{}^{2}\hat{z}_2 = (\ddot{\theta}_1 + \ddot{\theta}_2)I_{zz_2} + (c_2 l_1 + l_2/2)\frac{l_2}{2}m_2\ddot{\theta}_1 + \frac{l_2^2}{4}m_2\ddot{\theta}_2 + s_2 l_1\frac{l_2}{2}m_2\dot{\theta}_1^2 + \frac{l_2}{2}c_{12}m_2 g \quad \text{...(Eq. 1)}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=9 -->

**$i = 1$:**

**Force on link 1 joint:**

$${}^{1}\vec{f}_1 = {}^{1}_{2}R\,{}^{2}\vec{f}_2 + {}^{1}\vec{F}_1 = \begin{bmatrix} c_2 & -s_2 & 0 \\ s_2 & c_2 & 0 \\ 0 & 0 & 1 \end{bmatrix}{}^{2}\vec{f}_2 + \begin{bmatrix} -(l_1/2)m_1\dot{\theta}_1^2 + s_1 m_1 g \\ (l_1/2)m_1\ddot{\theta}_1 + c_1 m_1 g \\ 0 \end{bmatrix}$$

$$= \begin{bmatrix} -l_1 m_2\dot{\theta}_1^2 - c_2\frac{l_2}{2}m_2(\dot{\theta}_1 + \dot{\theta}_2)^2 + s_2\frac{l_2}{2}m_2(\ddot{\theta}_1 + \ddot{\theta}_2) - \frac{l_1}{2}m_1\dot{\theta}_1^2 + s_1 m_1 g + s_1 m_2 g \\ l_1 m_2\ddot{\theta}_1 - s_2\frac{l_2}{2}m_2(\dot{\theta}_1 + \dot{\theta}_2)^2 + c_2\frac{l_2}{2}m_2(\ddot{\theta}_1 + \ddot{\theta}_2) + \frac{l_1}{2}m_1\ddot{\theta}_1 + c_1 m_1 g + c_1 m_2 g \\ 0 \end{bmatrix}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=9 -->

**Moment on link 1:**

$${}^{1}\vec{n}_1 = {}^{1}\vec{N}_1 + {}^{1}_{2}R\,{}^{2}\vec{n}_2 + {}^{1}P_{G_1} \times {}^{1}\vec{F}_1 + {}^{1}P_2 \times {}^{1}_{2}R\,{}^{2}\vec{f}_2$$

$$= \begin{bmatrix} 0 \\ 0 \\ \ddot{\theta}_1 I_{zz_1} \end{bmatrix} + \begin{bmatrix} 0 \\ 0 \\ \tau_2 \end{bmatrix} + \begin{bmatrix} l_1/2 \\ 0 \\ 0 \end{bmatrix} \times {}^{1}\vec{F}_1 + \begin{bmatrix} l_1 \\ 0 \\ 0 \end{bmatrix} \times {}^{1}_{2}R\,{}^{2}\vec{f}_2$$

The z-component gives:

$$= I_{zz_1}\ddot{\theta}_1 + \tau_2 + \ddot{\theta}_1 m_1\frac{l_1^2}{4} + c_1\frac{l_1}{2}m_1 g + c_1 l_1 m_2 g + l_1^2 m_2\ddot{\theta}_1 - s_2\frac{l_2 l_1}{2}m_2(\dot{\theta}_1 + \dot{\theta}_2)^2 + c_2\frac{l_2 l_1}{2}m_2(\ddot{\theta}_1 + \ddot{\theta}_2)$$

**Joint torque $\tau_1$:**

$$\tau_1 = {}^{1}\vec{n}_1^T\,{}^{1}\hat{z}_1 = I_{zz_1}\ddot{\theta}_1 + \tau_2 + \ddot{\theta}_1 m_1\frac{l_1^2}{4} + c_1\frac{l_1}{2}m_1 g + c_2 l_1 m_2 g + l_1^2 m_2\ddot{\theta}_1$$

$$- s_2\frac{l_2 l_1}{2}m_2(\dot{\theta}_1 + \dot{\theta}_2)^2 + c_2\frac{l_2 l_1}{2}m_2(\ddot{\theta}_1 + \ddot{\theta}_2) \quad \text{...(Eq. 2)}$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=10 -->

### Final Matrix Form of Dynamic Equations

Writing the joint torques (from Eqs. 1 and 2) in matrix form:

$$\begin{Bmatrix} \tau_1 \\ \tau_2 \end{Bmatrix} = \underbrace{\begin{bmatrix} I_{zz_1} + I_{zz_2} + \frac{l_2^2}{4}m_2 + l_1 l_2 c_2 m_2 + \frac{1}{2}l_1^2 m_1 + m_2 & I_{zz_2} + \frac{1}{4}m_2 l_2^2 + \frac{1}{2}m_2 c_2 l_1 l_2 \\ I_{zz_2} + \frac{1}{4}m_2 l_1^2 + \frac{1}{2}l_1 l_2 c_2 m_2 & I_{zz_2} + \frac{l_2^2}{4}m_2 \end{bmatrix}}_{M(\vec{\theta})}\begin{Bmatrix} \ddot{\theta}_1 \\ \ddot{\theta}_2 \end{Bmatrix}$$

$$+ \underbrace{\begin{Bmatrix} -\frac{1}{2}l_1 l_2 s_2 m_2\dot{\theta}_2^2 - l_1 l_2 s_2 m_2\dot{\theta}_1\dot{\theta}_2 \\ \frac{1}{2}l_1 l_2 s_2 m_2\dot{\theta}_1^2 \end{Bmatrix}}_{\vec{V}(\vec{\theta},\dot{\vec{\theta}})} + \underbrace{\begin{Bmatrix} \frac{1}{2}l_2 c_{12} m_2 + \frac{1}{2}l_1 c_1 m_1 + l_1 c_1 m_2 \\ \frac{1}{2}l_2 c_{12} m_2 \end{Bmatrix}}_{\vec{G}(\vec{\theta})}g$$

<!-- source: MSE429 - Tutorials 6 (Solutions).pdf#page=10 -->

The dynamic equations become:

$$\vec{\tau} = [M(\vec{\theta})]\ddot{\vec{\theta}} + \vec{V}(\vec{\theta}, \dot{\vec{\theta}}) + \vec{G}(\vec{\theta})$$

Where:
- $[M(\vec{\theta})]$ is the $n \times n$ **mass matrix**
- $\vec{V}(\vec{\theta}, \dot{\vec{\theta}})$ is an $n \times 1$ vector which includes **centrifugal and Coriolis terms**
- $\vec{G}(\vec{\theta})$ is an $n \times 1$ vector which includes the **gravitational terms**
