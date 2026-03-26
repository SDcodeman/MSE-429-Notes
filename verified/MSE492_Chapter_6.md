# Chapter 6: Manipulator Dynamics
<!-- source: MSE492 - Chapter6-rev2.pdf#page=1 -->

---

## Overview
<!-- source: MSE492 - Chapter6-rev2.pdf#page=2 -->

In this chapter the dynamics of serial manipulators will be introduced following two formulations:

- Introduction to Inverse and Forward Dynamic Problems
- Mass Distribution and Inertia Properties
- Acceleration of a Rigid Body
- Dynamic Formulations
  - Newton-Euler Formulation
  - Lagrange Formulation

### [ENRICHMENT] Video: Modern Robotics Chapter 8 -- Dynamics of Open Chains (Full Video Series)
<!-- enrichment-type: video -->

Professor Kevin Lynch (Northwestern University) has an excellent free video series covering the dynamics topics in this chapter. The videos use the screw-theory perspective from the *Modern Robotics* textbook, which complements the Craig-style approach used in our course.

**Recommended videos (in order of relevance to this chapter):**

| Topic | YouTube Link | Duration |
|---|---|---|
| Lagrangian Formulation of Dynamics (Part 1) | [https://youtu.be/1U6y_68CjeY](https://youtu.be/1U6y_68CjeY) | ~6 min |
| Lagrangian Formulation of Dynamics (Part 2) | [https://youtu.be/BjD-pL819LA](https://youtu.be/BjD-pL819LA) | ~6 min |
| Understanding the Mass Matrix | [https://youtu.be/7PFQou5l9do](https://youtu.be/7PFQou5l9do) | ~5 min |
| Dynamics of a Single Rigid Body (Part 1) | [https://youtu.be/9pdqePt1Nbg](https://youtu.be/9pdqePt1Nbg) | ~6 min |
| Dynamics of a Single Rigid Body (Part 2) | [https://youtu.be/2rUWVdslaI4](https://youtu.be/2rUWVdslaI4) | ~4 min |
| Newton-Euler Inverse Dynamics | [https://youtu.be/ZASVKAlegfQ](https://youtu.be/ZASVKAlegfQ) | ~6 min |
| Forward Dynamics of Open Chains | [https://youtu.be/L8zpJOxDbh4](https://youtu.be/L8zpJOxDbh4) | ~4 min |
| Dynamics in the Task Space | [https://youtu.be/iQa01aFgf8U](https://youtu.be/iQa01aFgf8U) | ~2 min |
| Constrained Dynamics | [https://youtu.be/E6Yp6DwJh24](https://youtu.be/E6Yp6DwJh24) | ~5 min |
| Actuation, Gearing, and Friction | [https://youtu.be/w1kYLT3pETc](https://youtu.be/w1kYLT3pETc) | ~6 min |

Full chapter page: [Modern Robotics Chapter 8](https://modernrobotics.northwestern.edu/chapters/chapter8/)

### [ENRICHMENT] Video: Robot Academy -- Rigid Body Dynamics Masterclass (Peter Corke, QUT)
<!-- enrichment-type: video -->

Professor Peter Corke's Robot Academy provides a 10-lesson masterclass on rigid body dynamics with short, focused videos (each under 10 minutes). These are excellent for building intuition before tackling the math.

| Lesson | URL |
|---|---|
| Introduction to Rigid-Body Dynamics | [https://robotacademy.net.au/lesson/introduction-to-rigid-body-dynamics/](https://robotacademy.net.au/lesson/introduction-to-rigid-body-dynamics/) |
| Forces Acting On Robot Links | [https://robotacademy.net.au/lesson/forces-acting-on-robot-links/](https://robotacademy.net.au/lesson/forces-acting-on-robot-links/) |
| Gravity and Payload | [https://robotacademy.net.au/lesson/gravity-and-payload/](https://robotacademy.net.au/lesson/gravity-and-payload/) |
| Inertia and Acceleration Coupling | [https://robotacademy.net.au/lesson/inertia-and-acceleration-coupling/](https://robotacademy.net.au/lesson/inertia-and-acceleration-coupling/) |
| Velocity Coupling | [https://robotacademy.net.au/lesson/velocity-coupling/](https://robotacademy.net.au/lesson/velocity-coupling/) |
| Forward Dynamics | [https://robotacademy.net.au/lesson/forward-dynamics/](https://robotacademy.net.au/lesson/forward-dynamics/) |
| Summary of Rigid-Body Dynamics | [https://robotacademy.net.au/lesson/summary-of-rigid-body-dynamics/](https://robotacademy.net.au/lesson/summary-of-rigid-body-dynamics/) |

Full masterclass page: [Rigid Body Dynamics Masterclass](https://robotacademy.net.au/masterclass/rigid-body-dynamics/)

### [ENRICHMENT] Textbook Reference: Craig, "Introduction to Robotics: Mechanics and Control"
<!-- enrichment-type: reference -->

The material in this chapter corresponds to **Chapter 6: Manipulator Dynamics** in Craig's textbook (3rd edition, Pearson, 2005). Craig covers:
- Sections 6.1--6.3: Mass distribution, inertia tensors, and acceleration of rigid bodies
- Sections 6.4--6.5: Newton-Euler recursive formulation (outward/inward iterations)
- Sections 6.6--6.7: Lagrangian formulation and the mass matrix
- Section 6.8: Properties of the dynamic equation

The full textbook is available online: [Craig, Introduction to Robotics (PDF)](https://marsuniversity.github.io/ece387/Introduction-to-Robotics-Craig.pdf)

Additional dynamics references:
- [MIT OCW Chapter 7: Dynamics (H. Harry Asada)](https://ocw.mit.edu/courses/2-12-introduction-to-robotics-fall-2005/c7caaa2376b8ec01e270328a3b80b029_chapter7.pdf)
- [ETH Zurich Robot Dynamics Lecture Script](https://ethz.ch/content/dam/ethz/special-interest/mavt/robotics-n-intelligent-systems/rsl-dam/documents/RobotDynamics2016/script-dynamics.pdf)
- [De Luca, Newton-Euler Dynamics (Sapienza)](http://www.diag.uniroma1.it/deluca/rob2_en/06_NewtonEulerDynamics.pdf)
- [De Luca, Lagrangian Dynamics (Sapienza)](https://www.diag.uniroma1.it/deluca/rob2_en/03_LagrangianDynamics_1.pdf)

---

## 6.1 Inverse and Forward Dynamic Problems
<!-- source: MSE492 - Chapter6-rev2.pdf#page=3 -->

### Definitions

**General Dynamic Equation**: The general dynamic equation of articulated bodies relates forces/torques to motion:

$$\boldsymbol{Q} = \boldsymbol{M}(\boldsymbol{\Theta})\ddot{\boldsymbol{\Theta}} + \boldsymbol{V}(\boldsymbol{\Theta}, \dot{\boldsymbol{\Theta}}) + \boldsymbol{G}(\boldsymbol{\Theta})$$

where:
- $\boldsymbol{M}(\boldsymbol{\Theta})$ is the **mass matrix**, a function of joint displacement $\boldsymbol{\Theta}$
- $\ddot{\boldsymbol{\Theta}}$ is the vector of **joint accelerations**
- $\boldsymbol{V}(\boldsymbol{\Theta}, \dot{\boldsymbol{\Theta}})$ is the **velocity coupling vector** (centrifugal and Coriolis terms), a function of $\boldsymbol{\Theta}$ and $\dot{\boldsymbol{\Theta}}$
- $\boldsymbol{G}(\boldsymbol{\Theta})$ is the **gravitational vector**, a function of $\boldsymbol{\Theta}$
- $\boldsymbol{Q} = \boldsymbol{\tau} - \boldsymbol{J}^\top \boldsymbol{F} - \boldsymbol{f}_r$ is the **generalized force vector**, which includes actuator torque/force, external forces, and friction

### 6.1.1 The State-Space Equation
<!-- source: MSE492 - Chapter6-rev2.pdf#page=4 -->

Assuming no external forces or friction, the equation simplifies to:

$$\boldsymbol{\tau} = \boldsymbol{M}(\boldsymbol{\Theta})\ddot{\boldsymbol{\Theta}} + \boldsymbol{V}(\boldsymbol{\Theta}, \dot{\boldsymbol{\Theta}}) + \boldsymbol{G}(\boldsymbol{\Theta}) \tag{1}$$

**Inverse Dynamics**: Given a set of joint displacements ($\boldsymbol{\Theta}$), joint rates ($\dot{\boldsymbol{\Theta}}$), and joint accelerations ($\ddot{\boldsymbol{\Theta}}$), determine the required joint torques/forces ($\boldsymbol{\tau}$) that are required through the actuators to produce such motion. Eq. (1) is a **linear equation**.

**Forward Dynamics**: Given a set of joint torques/forces ($\boldsymbol{\tau}$), determine the motion of the manipulator ($\boldsymbol{\Theta}, \dot{\boldsymbol{\Theta}}, \ddot{\boldsymbol{\Theta}}$). Eq. (1) is a **differential equation**.

### Diagrams
<!-- source: MSE492 - Chapter6-rev2.pdf#page=5 -->

**Manipulator High-Level Block Diagram (Ch6-5)**: A block diagram showing the manipulator control flow. The "Trajectory Generator" block outputs desired joint displacements $\boldsymbol{\Theta}_d(t)$, joint rates $\dot{\boldsymbol{\Theta}}_d(t)$, and joint accelerations $\ddot{\boldsymbol{\Theta}}_d(t)$. These feed into the "Control System" block, which outputs torque $\boldsymbol{\tau}$. The torque feeds into the "Robot" block, which outputs the actual joint displacements $\boldsymbol{\Theta}$ and joint rates $\dot{\boldsymbol{\Theta}}$. A feedback loop sends $\boldsymbol{\Theta}$ and $\dot{\boldsymbol{\Theta}}$ back to the Control System.

**Inverse Dynamics** is used for controlling the manipulator, i.e., the torque is controlled to provide a desired motion:

$$\boldsymbol{\tau} = \boldsymbol{M}(\boldsymbol{\Theta}_d)\ddot{\boldsymbol{\Theta}}_d + \boldsymbol{V}(\boldsymbol{\Theta}_d, \dot{\boldsymbol{\Theta}}_d) + \boldsymbol{G}(\boldsymbol{\Theta}_d)$$

**Forward Dynamics** is used for simulating the motion of the manipulator. Simulation replaces the Robot block.

### Key Equations

<!-- source: MSE492 - Chapter6-rev2.pdf#page=3 -->
1. General dynamic equation: $\boldsymbol{Q} = \boldsymbol{M}(\boldsymbol{\Theta})\ddot{\boldsymbol{\Theta}} + \boldsymbol{V}(\boldsymbol{\Theta}, \dot{\boldsymbol{\Theta}}) + \boldsymbol{G}(\boldsymbol{\Theta})$
<!-- source: MSE492 - Chapter6-rev2.pdf#page=3 -->
2. Generalized force vector: $\boldsymbol{Q} = \boldsymbol{\tau} - \boldsymbol{J}^\top \boldsymbol{F} - \boldsymbol{f}_r$
<!-- source: MSE492 - Chapter6-rev2.pdf#page=4 -->
3. State-space equation (no external forces/friction): $\boldsymbol{\tau} = \boldsymbol{M}(\boldsymbol{\Theta})\ddot{\boldsymbol{\Theta}} + \boldsymbol{V}(\boldsymbol{\Theta}, \dot{\boldsymbol{\Theta}}) + \boldsymbol{G}(\boldsymbol{\Theta})$

### [ENRICHMENT] Alternative Explanation: Inverse vs. Forward Dynamics
<!-- enrichment-type: explanation -->

The distinction between inverse and forward dynamics is fundamental in robotics and it helps to understand them through their practical applications:

**Inverse Dynamics** answers the question: *"What torques do the motors need to produce so the robot follows this desired trajectory?"* This is the problem you solve for **control**. You know the motion you want ($\boldsymbol{\Theta}, \dot{\boldsymbol{\Theta}}, \ddot{\boldsymbol{\Theta}}$) and you compute the required torques $\boldsymbol{\tau}$. The equation is "linear" in the sense that given the motion, the torques are found by direct substitution -- no differential equation needs to be solved.

**Forward Dynamics** answers the question: *"If I apply these torques, what motion will the robot produce?"* This is the problem you solve for **simulation**. You know the torques $\boldsymbol{\tau}$ and you solve a second-order differential equation to find the resulting motion. This requires numerical integration (e.g., Runge-Kutta methods) because you must invert the mass matrix and integrate accelerations over time:

$$\ddot{\boldsymbol{\Theta}} = \boldsymbol{M}^{-1}(\boldsymbol{\Theta})\left[\boldsymbol{\tau} - \boldsymbol{V}(\boldsymbol{\Theta}, \dot{\boldsymbol{\Theta}}) - \boldsymbol{G}(\boldsymbol{\Theta})\right]$$

Forward dynamics is computationally more expensive because it requires the inversion of the mass matrix at every time step.

**Reference**: [Robot Dynamics -- Scholarpedia](http://www.scholarpedia.org/article/Robot_dynamics)

### [ENRICHMENT] Video: Inverse and Forward Dynamics Lessons (Robot Academy)
<!-- enrichment-type: video -->

- **Forward Dynamics**: Explains how torques map to robot motion for simulation purposes. [https://robotacademy.net.au/lesson/forward-dynamics/](https://robotacademy.net.au/lesson/forward-dynamics/)
- **Introduction to Rigid-Body Dynamics**: Provides a high-level overview of the forces and torques that influence joint motion, including gravity, friction, and coupling. [https://robotacademy.net.au/lesson/introduction-to-rigid-body-dynamics/](https://robotacademy.net.au/lesson/introduction-to-rigid-body-dynamics/)

---

## 6.2 Mass Distribution
<!-- source: MSE492 - Chapter6-rev2.pdf#page=6 -->

### Definitions

**Mass**: The mass is a measure of the resistance of a body to linear acceleration. If a force acts on a body, the body will accelerate. The ratio between the force and the resulting acceleration is the inertia (or mass) of the body.

$$\boldsymbol{F} = m\boldsymbol{a}$$

**Rotational Inertia**: Rotational inertia is a measure of the resistance of a body to angular acceleration. If a torque acts on a body, the body will undergo an angular acceleration. The ratio between the torque and the angular acceleration is the rotational inertia of the body, which depends on its mass and its distribution about the axis of rotation.

$$\boldsymbol{M} = \boldsymbol{I}\boldsymbol{\alpha} + \boldsymbol{\omega} \times \boldsymbol{I}\boldsymbol{\omega}$$

### 6.2.1 Centroidal Inertia Properties of Common Shapes
<!-- source: MSE492 - Chapter6-rev2.pdf#page=7 -->

#### Diagrams

**Centroidal Inertia Properties Reference Table (Ch6-7)**: A reference figure showing the centroidal inertia properties for six common shapes. All products of inertia not listed are zero. The coordinate axes are placed at the center of mass $G$ for each shape.

**Slender Bar**: A thin bar of length $L$ and cross-sectional area $A$ along the $y$-axis. $m = \rho A L$. $I_{xx} \approx 0$, $I_{yy} = I_{zz} = \frac{1}{12}mL^2$.

**Semicylinder**: A half-cylinder of radius $R$ and length $L$ with centroid at $4R/(3\pi)$ from the flat face. $m = \frac{1}{2}\pi\rho R^2 L$. $I_{xx} = \left(\frac{1}{4} - \frac{16}{9\pi^2}\right)mR^2 + \frac{1}{12}mL^2$. $I_{yy} = \frac{m}{12}(3R^2 + L^2)$. $I_{zz} = \left(\frac{1}{2} - \frac{16}{9\pi^2}\right)mR^2$.

**Thin Disk** ($h \ll R$): A disk of radius $R$ and thickness $h$. $m = \pi\rho R^2 h$. $I_{xx} = I_{yy} = \frac{1}{4}mR^2$. $I_{zz} = \frac{1}{2}mR^2$.

**Cylinder**: A solid cylinder of radius $R$ and length $L$. $m = \pi\rho R^2 L$. $I_{xx} = I_{yy} = \frac{1}{12}m(3R^2 + L^2)$. $I_{zz} = \frac{1}{2}mR^2$.

**Rectangular Parallelepiped**: A box with dimensions $a \times b \times c$ centered at $G$. $m = \rho abc$. $I_{xx} = \frac{1}{12}m(b^2 + c^2)$. $I_{yy} = \frac{1}{12}m(a^2 + c^2)$. $I_{zz} = \frac{1}{12}m(a^2 + b^2)$.

**Sphere**: A solid sphere of radius $R$. $m = \frac{4}{3}\pi\rho R^3$. $I_{xx} = I_{yy} = I_{zz} = \frac{2}{5}mR^2$.

### 6.2.2 The Inertia Tensor
<!-- source: MSE492 - Chapter6-rev2.pdf#page=8 -->

Bodies described with respect to axes that form planes of symmetry (principal axes) have zero products of inertia ($I_{xy}$, $I_{xz}$, $I_{yz}$). Thus, only moments of inertia ($I_{xx}$, $I_{yy}$, $I_{zz}$) are non-zero.

All the inertia properties (moments and products of inertia) can be written in a matrix known as the **inertia tensor**:

$${}^{A}\boldsymbol{I} = \begin{bmatrix} I_{xx} & -I_{xy} & -I_{xz} \\ -I_{xy} & I_{yy} & -I_{yz} \\ -I_{xz} & -I_{yz} & I_{zz} \end{bmatrix}$$

where $A$ is the reference frame in which the inertia tensor is being described.

**Moments of Inertia** (diagonal terms):

$$I_{xx} = \iiint_V (y^2 + z^2)\,\rho\,dv$$

$$I_{yy} = \iiint_V (x^2 + z^2)\,\rho\,dv$$

$$I_{zz} = \iiint_V (x^2 + y^2)\,\rho\,dv$$

**Products of Inertia** (off-diagonal terms):

$$I_{xy} = \iiint_V xy\,\rho\,dv$$

$$I_{xz} = \iiint_V xz\,\rho\,dv$$

$$I_{yz} = \iiint_V yz\,\rho\,dv$$

#### Diagrams

**Inertia Tensor Reference Frame (Ch6-8)**: A diagram showing an arbitrary 3D body (blob shape) with frame $\{A\}$ at the origin. Axes $\hat{X}$, $\hat{Y}$, $\hat{Z}$ are shown. A small volume element $dv$ is highlighted inside the body with position vector ${}^{A}\boldsymbol{P}$ from the origin to the element.

### [ENRICHMENT] Alternative Explanation: What the Inertia Tensor Really Means
<!-- enrichment-type: explanation -->

The inertia tensor can be confusing because it is a 3x3 matrix rather than a single number. Here is the physical intuition:

**Why a tensor (matrix) instead of a scalar?** In 2D, a single moment of inertia $I$ suffices because there is only one possible axis of rotation (perpendicular to the plane). In 3D, the body can rotate about any axis, and the resistance to rotation depends on *which* axis you choose. The inertia tensor encodes this directional dependence.

**Diagonal terms (moments of inertia):** $I_{xx}$ measures the body's resistance to rotation about the $x$-axis. It depends on how far the mass is distributed from the $x$-axis, which is why the integral involves $y^2 + z^2$ (the squared distance from the $x$-axis).

**Off-diagonal terms (products of inertia):** $I_{xy}$ captures the asymmetry of mass distribution relative to the $xy$ plane. When products of inertia are non-zero, applying a torque about one axis causes angular acceleration about other axes as well. This is why the angular momentum $\boldsymbol{L} = \boldsymbol{I}\boldsymbol{\omega}$ is not always parallel to $\boldsymbol{\omega}$.

**Principal axes:** There always exists an orientation of the coordinate axes (found via eigenvalue decomposition) where all products of inertia vanish. These are the **principal axes**, and the corresponding eigenvalues are the **principal moments of inertia**. When robot links are modeled as simple geometric shapes with symmetry, the DH frame axes often align with the principal axes, making the products of inertia zero.

**The inertia tensor is always symmetric and positive definite**, guaranteeing real, positive principal moments of inertia.

**References**:
- [MIT Lecture L26: 3D Rigid Body Dynamics -- The Inertia Tensor (PDF)](https://ocw.mit.edu/courses/16-07-dynamics-fall-2009/dd277ec654440f4c2b5b07d6c286c3fd_MIT16_07F09_Lec26.pdf)
- [Physics LibreTexts: Inertia Tensor](https://phys.libretexts.org/Bookshelves/Classical_Mechanics/Variational_Principles_in_Classical_Mechanics_(Cline)/13:_Rigid-body_Rotation/13.04:_Inertia_Tensor)
- [University of Virginia: Motion of a Rigid Body -- The Inertia Tensor](https://galileoandeinstein.phys.virginia.edu/7010/CM_23_Rigid_Body_Motion.html)

### Worked Examples

#### Example: Inertia Tensor of a Rectangular Body
<!-- source: MSE492 - Chapter6-rev2.pdf#page=9 -->

**Problem**: Find the inertia tensor for a rectangular body of uniform density $\rho$ with respect to the coordinate system shown, where the frame $\{A\}$ is at one corner of the box with dimensions $l$ (along $\hat{Y}$), $w$ (along $\hat{X}$), and $h$ (along $\hat{Z}$).

**Solution -- Moments of Inertia (Ch6-9)**:

Computing $I_{xx}$:

$$I_{xx} = \int_0^{h}\int_0^{l}\int_0^{w} (y^2 + z^2)\rho\,dx\,dy\,dz$$

$$= \int_0^{h}\int_0^{l} (y^2 + z^2)\rho\,w\,dy\,dz$$

$$= \int_0^{h}\left(\frac{l^3}{3} + z^2 l\right)\rho\,w\,dz$$

$$= \left(\frac{hl^3w}{3} + \frac{h^3 lw}{3}\right)\rho = \frac{m}{3}(l^2 + h^2)$$

Similarly:

$$I_{yy} = \frac{m}{3}(w^2 + h^2)$$

$$I_{zz} = \frac{m}{3}(l^2 + w^2)$$

<!-- source: MSE492 - Chapter6-rev2.pdf#page=10 -->

**Solution -- Products of Inertia (Ch6-10)**:

Computing $I_{xy}$:

$$I_{xy} = \int_0^{h}\int_0^{l}\int_0^{w} xy\,\rho\,dx\,dy\,dz$$

$$= \int_0^{h}\int_0^{l} \frac{w^2}{2}y\,\rho\,dy\,dz$$

$$= \int_0^{h} \frac{w^2 l^2}{4}\,\rho\,dz$$

$$= \frac{m}{4}wl$$

Similarly:

$$I_{xz} = \frac{m}{4}wh$$

$$I_{yz} = \frac{m}{4}hl$$

<!-- source: MSE492 - Chapter6-rev2.pdf#page=11 -->

**Final Result (Ch6-11)**: The complete inertia tensor for the rectangular body is:

$${}^{A}\boldsymbol{I} = \begin{bmatrix} \frac{m}{3}(l^2 + h^2) & -\frac{m}{4}wl & -\frac{m}{4}wh \\ -\frac{m}{4}wl & \frac{m}{3}(w^2 + h^2) & -\frac{m}{4}hl \\ -\frac{m}{4}wh & -\frac{m}{4}hl & \frac{m}{3}(l^2 + w^2) \end{bmatrix}$$

#### Diagrams

**Rectangular Body with Corner Frame (Ch6-9, Ch6-10, Ch6-11)**: A 3D rectangular box with frame $\{A\}$ located at one corner. The $\hat{X}$ axis runs along the width $w$, the $\hat{Y}$ axis runs along the length $l$, and the $\hat{Z}$ axis runs along the height $h$. Dashed lines indicate the edges of the box.

### [ENRICHMENT] Alternative Explanation: Corner-Frame vs. Centroid-Frame Inertia Tensors
<!-- enrichment-type: explanation -->

Notice the difference between the corner-frame result above and the centroidal values from Section 6.2.1:

| Term | Centroid frame ($\frac{1}{12}$ factors) | Corner frame ($\frac{1}{3}$ factors) |
|---|---|---|
| $I_{xx}$ | $\frac{m}{12}(l^2 + h^2)$ | $\frac{m}{3}(l^2 + h^2)$ |
| Products of inertia | All zero (symmetry) | Non-zero ($\frac{m}{4}wl$, etc.) |

The corner-frame values are exactly what you get by applying the Parallel Axis Theorem (Section 6.3) to the centroidal values. For example, the displacement from centroid to corner is $(x_C, y_C, z_C) = (w/2, l/2, h/2)$:

$${}^{C}I_{xx} = \frac{m}{12}(l^2 + h^2) + m\left(\frac{l^2}{4} + \frac{h^2}{4}\right) = \frac{m}{12}(l^2 + h^2) + \frac{m}{4}(l^2 + h^2) = \frac{m}{3}(l^2 + h^2)$$

This consistency check is a useful way to verify your inertia calculations.

---

## 6.3 Mass Distribution -- Parallel Axis Theorem
<!-- source: MSE492 - Chapter6-rev2.pdf#page=12 -->

### Definitions

**Parallel Axis Theorem**: In general, inertial tensors are described with respect to a frame attached to the centroid of the body; however, sometimes it is necessary to describe the inertia tensor with respect to another reference frame. The translation of the moments and products of inertia to another reference frame is accomplished with the Parallel Axis Theorem.

### Theorems & Properties

Given frame $\{A\}$ at the centroid and frame $\{C\}$ displaced from $\{A\}$ by $(x_C, y_C, z_C)$, with both frames having the same orientation:

**Moments of Inertia (Parallel Axis Theorem)**:

$${}^{C}I_{xx} = {}^{A}I_{xx} + m(z_C^2 + y_C^2)$$

$${}^{C}I_{yy} = {}^{A}I_{yy} + m(x_C^2 + z_C^2)$$

$${}^{C}I_{zz} = {}^{A}I_{zz} + m(x_C^2 + y_C^2)$$

**Products of Inertia (Parallel Axis Theorem)**:

$${}^{C}I_{xy} = {}^{A}I_{xy} + m\,x_C\,y_C$$

$${}^{C}I_{yz} = {}^{A}I_{yz} + m\,y_C\,z_C$$

$${}^{C}I_{xz} = {}^{A}I_{xz} + m\,x_C\,z_C$$

#### Diagrams

**Parallel Axis Theorem Diagram (Ch6-12)**: An irregular 2D body (blob shape) with two coordinate frames shown. Frame $\{A\}$ is at the centroid of the body with axes $\hat{X}$, $\hat{Y}$, $\hat{Z}$. Frame $\{C\}$ is displaced from $\{A\}$ by vector ${}^{C}\boldsymbol{P}$ with components $(x_C, y_C, z_C)$ shown as dashed red lines. Both frames have identically oriented axes.

### Key Equations

<!-- source: MSE492 - Chapter6-rev2.pdf#page=12 -->
1. Parallel axis theorem (moments): ${}^{C}I_{xx} = {}^{A}I_{xx} + m(z_C^2 + y_C^2)$
2. Parallel axis theorem (products): ${}^{C}I_{xy} = {}^{A}I_{xy} + m\,x_C\,y_C$

### [ENRICHMENT] Proof: Parallel Axis Theorem for the Full Inertia Tensor
<!-- enrichment-type: proof -->

The parallel axis theorem can be proved compactly using the tensor form. Let $\boldsymbol{r}$ be the position of a mass element relative to the center of mass, and let $\boldsymbol{d}$ be the displacement from the center of mass to the new reference point. The position of the mass element relative to the new point is $\boldsymbol{r}' = \boldsymbol{r} + \boldsymbol{d}$.

**Proof (scalar form, for $I_{xx}$):**

Starting from the definition:

$${}^{C}I_{xx} = \iiint_V \left[(y + y_C)^2 + (z + z_C)^2\right]\rho\,dv$$

Expanding:

$$= \iiint_V \left[y^2 + 2yy_C + y_C^2 + z^2 + 2zz_C + z_C^2\right]\rho\,dv$$

$$= \underbrace{\iiint_V (y^2 + z^2)\rho\,dv}_{{}^{A}I_{xx}} + 2y_C\underbrace{\iiint_V y\,\rho\,dv}_{= 0} + 2z_C\underbrace{\iiint_V z\,\rho\,dv}_{= 0} + (y_C^2 + z_C^2)\underbrace{\iiint_V \rho\,dv}_{= m}$$

The two middle integrals vanish because they are first moments about the center of mass (which is the origin of frame $\{A\}$). Therefore:

$${}^{C}I_{xx} = {}^{A}I_{xx} + m(y_C^2 + z_C^2) \qquad \blacksquare$$

**Proof (for products of inertia, $I_{xy}$):**

$${}^{C}I_{xy} = \iiint_V (x + x_C)(y + y_C)\,\rho\,dv = \underbrace{\iiint_V xy\,\rho\,dv}_{{}^{A}I_{xy}} + x_C\underbrace{\iiint_V y\,\rho\,dv}_{= 0} + y_C\underbrace{\iiint_V x\,\rho\,dv}_{= 0} + m\,x_C\,y_C$$

Therefore, the parallel axis theorem for products of inertia is:

$${}^{C}I_{xy} = {}^{A}I_{xy} + m\,x_C\,y_C \qquad \blacksquare$$

**Sign convention note:** The product of inertia $I_{xy} = \iiint xy\,\rho\,dv$ is always defined as the positive integral (as in Section 6.2.2). The negative signs appear only when populating the inertia tensor, where the off-diagonal entries are $-I_{xy}$, $-I_{xz}$, $-I_{yz}$. The parallel axis theorem formula above applies to $I_{xy}$ itself, not to the tensor entry $-I_{xy}$.

**Compact tensor form:** The parallel axis theorem for the full tensor can be written as:

$${}^{C}\boldsymbol{I} = {}^{A}\boldsymbol{I} + m\left(\boldsymbol{d}^\top\boldsymbol{d}\,\mathbf{E}_3 - \boldsymbol{d}\boldsymbol{d}^\top\right)$$

where $\boldsymbol{d} = (x_C, y_C, z_C)^\top$ and $\mathbf{E}_3$ is the $3 \times 3$ identity matrix.

**References**:
- [Parallel Axis Theorem -- Wikipedia](https://en.wikipedia.org/wiki/Parallel_axis_theorem)
- [Physics LibreTexts: Parallel-Axis Theorem](https://phys.libretexts.org/Bookshelves/Classical_Mechanics/Variational_Principles_in_Classical_Mechanics_(Cline)/13:_Rigid-body_Rotation/13.08:_Parallel-Axis_Theorem)
- [GeeksforGeeks: Parallel Axis Theorem -- Definition, Formula, Proof](https://www.geeksforgeeks.org/physics/parallel-axis-theorem/)

---

## 6.4 Mass Distribution -- Rotation Transformation
<!-- source: MSE492 - Chapter6-rev2.pdf#page=13 -->

### Definitions

**Rotation Transformation of Inertia**: When two frames are not oriented in the same manner, the Rotation Transformation must be applied to transform the inertia properties from one frame to another.

### Theorems & Properties

If frame $\{A\}$ and frame $\{C\}$ share the same origin but differ in orientation, the inertia tensor transforms as:

$${}^{C}\boldsymbol{I} = {}^{C}_{A}\boldsymbol{R}\; {}^{A}\boldsymbol{I}\; {}^{C}_{A}\boldsymbol{R}^\top$$

#### Diagrams

**Rotation Transformation Diagram (Ch6-13)**: An irregular body with two coordinate frames at the same origin but different orientations. Frame $\{A\}$ has axes $\hat{X}_A$, $\hat{Y}_A$, $\hat{Z}_A$ and frame $\{C\}$ has axes $\hat{X}_C$, $\hat{Y}_C$, $\hat{Z}_C$, rotated relative to $\{A\}$.

### Key Equations

<!-- source: MSE492 - Chapter6-rev2.pdf#page=13 -->
1. Rotation transformation of inertia: ${}^{C}\boldsymbol{I} = {}^{C}_{A}\boldsymbol{R}\; {}^{A}\boldsymbol{I}\; {}^{C}_{A}\boldsymbol{R}^\top$

### [ENRICHMENT] Alternative Explanation: Why the Inertia Tensor Transforms as $R\,I\,R^\top$
<!-- enrichment-type: explanation -->

This transformation rule follows from how the angular momentum vector transforms. In frame $\{A\}$, the angular momentum is:

$${}^{A}\boldsymbol{L} = {}^{A}\boldsymbol{I}\; {}^{A}\boldsymbol{\omega}$$

To express this in frame $\{C\}$, we use ${}^{C}\boldsymbol{\omega} = {}^{C}_{A}\boldsymbol{R}\; {}^{A}\boldsymbol{\omega}$ and ${}^{C}\boldsymbol{L} = {}^{C}_{A}\boldsymbol{R}\; {}^{A}\boldsymbol{L}$:

$${}^{C}\boldsymbol{L} = {}^{C}_{A}\boldsymbol{R}\; {}^{A}\boldsymbol{I}\; {}^{A}\boldsymbol{\omega} = {}^{C}_{A}\boldsymbol{R}\; {}^{A}\boldsymbol{I}\; \left({}^{C}_{A}\boldsymbol{R}^\top\; {}^{C}\boldsymbol{\omega}\right) = \left({}^{C}_{A}\boldsymbol{R}\; {}^{A}\boldsymbol{I}\; {}^{C}_{A}\boldsymbol{R}^\top\right) {}^{C}\boldsymbol{\omega}$$

Comparing with ${}^{C}\boldsymbol{L} = {}^{C}\boldsymbol{I}\; {}^{C}\boldsymbol{\omega}$ gives:

$${}^{C}\boldsymbol{I} = {}^{C}_{A}\boldsymbol{R}\; {}^{A}\boldsymbol{I}\; {}^{C}_{A}\boldsymbol{R}^\top$$

This is the same transformation rule as for any second-order tensor. The fact that it involves $\boldsymbol{R}$ on both sides (a "congruence transformation") preserves the symmetry and positive-definiteness of the inertia tensor.

**Important for robotics:** In the Newton-Euler algorithm, the inertia tensor of each link is typically known in the link's own frame (${}^{G_i}\boldsymbol{I}_i$). The rotation transformation is used to express it in the base frame or in a neighboring link's frame as needed.

---

## 6.5 Acceleration of a Rigid Body
<!-- source: MSE492 - Chapter6-rev2.pdf#page=14 -->

### Definitions

The absolute velocity of a rigid body in space can be found as the time derivative of the position vector. The linear acceleration is the second derivative.

### Theorems & Properties

**Position**:

$${}^{A}\boldsymbol{P}_P = {}^{A}\boldsymbol{P}_{O_B} + {}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{P}_P$$

**Velocity**:

$${}^{A}\boldsymbol{V}_P = {}^{A}\boldsymbol{V}_{O_B} + {}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{V}_P + {}^{A}\boldsymbol{\Omega}_B \times {}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{P}_P$$

**Linear Acceleration**:

$${}^{A}\boldsymbol{a}_P = \underbrace{{}^{A}\boldsymbol{a}_{O_B}}_{\text{Abs. accel. of } O_B} + \underbrace{{}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{a}_P}_{\text{Sliding accel.}} + \underbrace{2\,{}^{A}\boldsymbol{\Omega}_B \times {}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{V}_P}_{\text{Coriolis accel.}} + \underbrace{{}^{A}\dot{\boldsymbol{\Omega}}_B \times {}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{P}_P}_{\text{Tangential accel.}} + \underbrace{{}^{A}\boldsymbol{\Omega}_B \times ({}^{A}\boldsymbol{\Omega}_B \times {}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{P}_P)}_{\text{Centripetal accel.}}$$

#### Diagrams

**Two-Frame Acceleration Diagram (Ch6-14)**: Two coordinate frames $\{A\}$ and $\{B\}$ in 3D space. Frame $\{A\}$ at origin $O_A$ with axes $\hat{X}_A$, $\hat{Y}_A$, $\hat{Z}_A$. Frame $\{B\}$ at origin $O_B$ with axes $\hat{X}_B$, $\hat{Y}_B$, $\hat{Z}_B$. A point $P$ is shown with position vector ${}^{A}\boldsymbol{P}_P$ from $O_A$ to $P$ (shown in red), ${}^{A}\boldsymbol{P}_{O_B}$ from $O_A$ to $O_B$ (shown in blue), and ${}^{B}\boldsymbol{P}_P$ from $O_B$ to $P$ (shown in green/dark).

### 6.5.1 Angular Velocity and Angular Acceleration
<!-- source: MSE492 - Chapter6-rev2.pdf#page=15 -->

For the angular velocity, consider the case that frame $\{B\}$ is rotating relative to $\{A\}$ with angular velocity ${}^{A}\boldsymbol{\Omega}_B$ and frame $\{C\}$ is rotating relative to $\{B\}$ with ${}^{B}\boldsymbol{\Omega}_C$. To calculate ${}^{A}\boldsymbol{\Omega}_C$, we add the angular velocities relative to frame $\{A\}$:

$${}^{A}\boldsymbol{\Omega}_C = {}^{A}\boldsymbol{\Omega}_B + {}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{\Omega}_C$$

The angular acceleration is determined by taking the time derivative:

$${}^{A}\dot{\boldsymbol{\Omega}}_C = {}^{A}\dot{\boldsymbol{\Omega}}_B + {}^{A}_{B}\boldsymbol{R}\; {}^{B}\dot{\boldsymbol{\Omega}}_C + {}^{A}\boldsymbol{\Omega}_B \times {}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{\Omega}_C$$

### Key Equations

<!-- source: MSE492 - Chapter6-rev2.pdf#page=14 -->
1. Position: ${}^{A}\boldsymbol{P}_P = {}^{A}\boldsymbol{P}_{O_B} + {}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{P}_P$
2. Velocity: ${}^{A}\boldsymbol{V}_P = {}^{A}\boldsymbol{V}_{O_B} + {}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{V}_P + {}^{A}\boldsymbol{\Omega}_B \times {}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{P}_P$
3. Linear acceleration (full five-term expression): see derivation above
<!-- source: MSE492 - Chapter6-rev2.pdf#page=15 -->
4. Angular velocity composition: ${}^{A}\boldsymbol{\Omega}_C = {}^{A}\boldsymbol{\Omega}_B + {}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{\Omega}_C$
5. Angular acceleration: ${}^{A}\dot{\boldsymbol{\Omega}}_C = {}^{A}\dot{\boldsymbol{\Omega}}_B + {}^{A}_{B}\boldsymbol{R}\; {}^{B}\dot{\boldsymbol{\Omega}}_C + {}^{A}\boldsymbol{\Omega}_B \times {}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{\Omega}_C$

### [ENRICHMENT] Alternative Explanation: The Five-Term Acceleration Formula
<!-- enrichment-type: explanation -->

The five-term linear acceleration formula looks intimidating, but each term has a clear physical meaning. Consider point $P$ on a body that is both translating and rotating:

1. **Absolute acceleration of $O_B$** (${}^{A}\boldsymbol{a}_{O_B}$): The acceleration of the origin of the moving frame. Even if nothing is happening on the body itself, the fact that the body's reference point is accelerating contributes to the acceleration of every point on the body.

2. **Sliding acceleration** (${}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{a}_P$): The acceleration of point $P$ as seen from within the moving frame. This is non-zero only if $P$ is moving relative to the body (e.g., a prismatic joint).

3. **Coriolis acceleration** ($2\,{}^{A}\boldsymbol{\Omega}_B \times {}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{V}_P$): Arises from the interaction between the body's rotation and the point's velocity within the body. This is the same Coriolis effect that deflects projectiles on Earth. The factor of 2 arises from the product rule in differentiation. This term is only non-zero for prismatic joints (where the point slides relative to the rotating link).

4. **Tangential acceleration** (${}^{A}\dot{\boldsymbol{\Omega}}_B \times {}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{P}_P$): Due to the angular acceleration of the body. This component is tangent to the circular path of the point and is responsible for speeding up or slowing down the rotation.

5. **Centripetal acceleration** (${}^{A}\boldsymbol{\Omega}_B \times ({}^{A}\boldsymbol{\Omega}_B \times {}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{P}_P)$): Points radially inward toward the axis of rotation. Even at constant angular velocity, every point on a rotating body experiences this inward acceleration. This is the familiar $\omega^2 r$ centripetal acceleration.

**For revolute joints in robotics**, terms 2 and 3 vanish (the point is fixed on the body), leaving only terms 1, 4, and 5. **For prismatic joints**, all five terms are present.

---

## 6.6 Newton's Equation and Euler's Equation
<!-- source: MSE492 - Chapter6-rev2.pdf#page=16 -->

### Definitions

**Newton's Equation**: The desired linear acceleration ($\dot{\boldsymbol{v}}_G$) of a link with mass $m$ is caused by force $\boldsymbol{F}$:

$$\boldsymbol{F} = m\,\dot{\boldsymbol{v}}_G$$

**Euler's Equation**: The desired angular acceleration of a rigid body is caused by an inertial moment:

$$\boldsymbol{N} = {}^{G}\boldsymbol{I}\,\dot{\boldsymbol{\omega}} + \boldsymbol{\omega} \times {}^{G}\boldsymbol{I}\,\boldsymbol{\omega}$$

where ${}^{G}\boldsymbol{I}$ is the inertia tensor written in terms of frame $\{G\}$, $\boldsymbol{\omega}$ and $\dot{\boldsymbol{\omega}}$ are the angular velocity and angular acceleration respectively, and $\boldsymbol{N}$ represents the moment.

#### Diagrams

**Newton's Equation Diagram (Ch6-16, top)**: A multi-link manipulator segment is shown. A point $G$ (center of mass) on a link has a force vector $\boldsymbol{F}$ applied at $G$ and a linear acceleration vector $\dot{v}_G$ pointing outward from $G$.

**Euler's Equation Diagram (Ch6-16, bottom)**: A manipulator link segment with center of mass $G$. Angular velocity $\boldsymbol{\omega}$ and angular acceleration $\dot{\boldsymbol{\omega}}$ vectors are shown at $G$, along with applied moment $\boldsymbol{N}$.

### Key Equations

<!-- source: MSE492 - Chapter6-rev2.pdf#page=16 -->
1. Newton's equation: $\boldsymbol{F} = m\,\dot{\boldsymbol{v}}_G$
2. Euler's equation: $\boldsymbol{N} = {}^{G}\boldsymbol{I}\,\dot{\boldsymbol{\omega}} + \boldsymbol{\omega} \times {}^{G}\boldsymbol{I}\,\boldsymbol{\omega}$

### [ENRICHMENT] Proof: Derivation of Euler's Equation for Rigid Body Rotation
<!-- enrichment-type: proof -->

Euler's equation $\boldsymbol{N} = {}^{G}\boldsymbol{I}\,\dot{\boldsymbol{\omega}} + \boldsymbol{\omega} \times {}^{G}\boldsymbol{I}\,\boldsymbol{\omega}$ is not obvious from Newton's second law. Here is the derivation:

**Starting point:** Euler's second law states that the net external torque about the center of mass equals the time derivative of the angular momentum:

$$\boldsymbol{N} = \frac{d\boldsymbol{L}}{dt} \quad \text{where} \quad \boldsymbol{L} = \boldsymbol{I}\,\boldsymbol{\omega}$$

**The key subtlety:** If we compute $d\boldsymbol{L}/dt$ in the inertial frame, we get:

$$\boldsymbol{N} = \frac{d}{dt}(\boldsymbol{I}\,\boldsymbol{\omega}) = \dot{\boldsymbol{I}}\,\boldsymbol{\omega} + \boldsymbol{I}\,\dot{\boldsymbol{\omega}}$$

The problem is that $\boldsymbol{I}$ expressed in the inertial frame changes with time as the body rotates, making $\dot{\boldsymbol{I}}$ complicated to compute.

**The trick:** Instead, express everything in the body-fixed frame where $\boldsymbol{I}$ is constant (${}^{G}\boldsymbol{I}$ does not change with time). The time derivative of any vector $\boldsymbol{A}$ in a rotating frame is related to the inertial derivative by:

$$\left.\frac{d\boldsymbol{A}}{dt}\right|_{\text{inertial}} = \left.\frac{d\boldsymbol{A}}{dt}\right|_{\text{body}} + \boldsymbol{\omega} \times \boldsymbol{A}$$

Applying this to $\boldsymbol{L} = {}^{G}\boldsymbol{I}\,\boldsymbol{\omega}$:

$$\boldsymbol{N} = \frac{d}{dt}\left({}^{G}\boldsymbol{I}\,\boldsymbol{\omega}\right)\bigg|_{\text{body}} + \boldsymbol{\omega} \times {}^{G}\boldsymbol{I}\,\boldsymbol{\omega}$$

Since ${}^{G}\boldsymbol{I}$ is constant in the body frame:

$$\boldsymbol{N} = {}^{G}\boldsymbol{I}\,\dot{\boldsymbol{\omega}} + \boldsymbol{\omega} \times {}^{G}\boldsymbol{I}\,\boldsymbol{\omega} \qquad \blacksquare$$

**Physical interpretation of the $\boldsymbol{\omega} \times \boldsymbol{I}\,\boldsymbol{\omega}$ term:** This is the *gyroscopic torque*. Even if there is zero angular acceleration ($\dot{\boldsymbol{\omega}} = 0$), a rotating body with a non-diagonal inertia tensor (or rotation about a non-principal axis) requires an applied torque to maintain constant angular velocity. This is why a spinning top precesses and why a rotating satellite can tumble.

**In component form** (along principal axes where $\boldsymbol{I}$ is diagonal):

$$N_1 = I_1 \dot{\omega}_1 - (I_2 - I_3)\omega_2 \omega_3$$
$$N_2 = I_2 \dot{\omega}_2 - (I_3 - I_1)\omega_3 \omega_1$$
$$N_3 = I_3 \dot{\omega}_3 - (I_1 - I_2)\omega_1 \omega_2$$

**References**:
- [Euler's Equations (rigid body dynamics) -- Wikipedia](https://en.wikipedia.org/wiki/Euler%27s_equations_(rigid_body_dynamics))
- [MIT OCW Lecture 28: Euler's Equations -- 3D Rigid Body Dynamics (PDF)](https://ocw.mit.edu/courses/16-07-dynamics-fall-2009/5e1d8699338146e5127080b880b906d6_MIT16_07F09_Lec28.pdf)
- [Physics LibreTexts: Euler's Equations of Motion for Rigid-Body Rotation](https://phys.libretexts.org/Bookshelves/Classical_Mechanics/Classical_Mechanics_(Tatum)/04:_Rigid_Body_Rotation/4.05:_Euler's_Equations_of_Motion)

### [ENRICHMENT] Video: Dynamics of a Single Rigid Body (Modern Robotics)
<!-- enrichment-type: video -->

These two videos derive Euler's equation in the context of robotics and explain the gyroscopic term:

- **Part 1**: [https://youtu.be/9pdqePt1Nbg](https://youtu.be/9pdqePt1Nbg) -- Covers the wrench-acceleration relationship for a single rigid body
- **Part 2**: [https://youtu.be/2rUWVdslaI4](https://youtu.be/2rUWVdslaI4) -- Continues with the rotational dynamics and the $\omega \times I\omega$ term

---

## 6.7 Iterative Newton-Euler Dynamic Formulation
<!-- source: MSE492 - Chapter6-rev2.pdf#page=17 -->

### Definitions

The Newton-Euler formulation is a **recursive iteration process**. The velocity and acceleration of the links are determined based on their propagation along the manipulator (base to end-effector). Then, a balance of forces (Newton) and moments (Euler) is performed at each link. An actuator must apply a force/torque to balance forces that act on links that follow the joints (end-effector to base).

#### Diagrams

**Newton-Euler Overview Diagram (Ch6-17)**: A multi-jointed robot arm is shown. An arrow curving from the base toward the end-effector is labeled "Velocity Propagation" (outward direction). An arrow pointing from the end-effector back toward the base is labeled "Balance of Forces and Moments" (inward direction). A downward arrow at the base is labeled "Gravity".

### 6.7.1 Outward and Inward Iterations
<!-- source: MSE492 - Chapter6-rev2.pdf#page=18 -->

**Outward Iteration**: Compute the angular velocity, angular acceleration, linear velocity, linear acceleration, and the inertial forces and moments of each link in terms of its preceding link. This process is repeated from $i = 0$ to $i = n - 1$, where $n$ is the number of joints. Set the initial velocity and acceleration values to zero, except for the acceleration of the base which will incorporate gravity.

**Inward Iteration**: Perform the balance of forces and moments about the joints. This process is repeated from $i = n$ to $i = 1$, where $n$ is the number of joints. Set the initial force and moment at $i = n$ (frame $n+1$) to be the external forces and moments being applied to the end-effector.

### 6.7.2 Outward Iterations -- Velocities and Accelerations
<!-- source: MSE492 - Chapter6-rev2.pdf#page=19 -->

This iteration starts with link frame $\{1\}$ and moves successively link by link until link frame $\{n\}$, for $i = 0 \to n-1$.

**Angular Velocity**:
- Revolute joint:
$${}^{i+1}\boldsymbol{\omega}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\; {}^{i}\boldsymbol{\omega}_i + \dot{\theta}_{i+1}\; {}^{i+1}\hat{Z}_{i+1}$$
- Prismatic joint:
$${}^{i+1}\boldsymbol{\omega}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\; {}^{i}\boldsymbol{\omega}_i$$

**Angular Acceleration**:
- Revolute joint:
$${}^{i+1}\dot{\boldsymbol{\omega}}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\; {}^{i}\dot{\boldsymbol{\omega}}_i + {}^{i+1}_{i}\boldsymbol{R}\; {}^{i}\boldsymbol{\omega}_i \times \dot{\theta}_{i+1}\; {}^{i+1}\hat{Z}_{i+1} + \ddot{\theta}_{i+1}\; {}^{i+1}\hat{Z}_{i+1}$$
- Prismatic joint:
$${}^{i+1}\dot{\boldsymbol{\omega}}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\; {}^{i}\dot{\boldsymbol{\omega}}_i$$

<!-- source: MSE492 - Chapter6-rev2.pdf#page=20 -->

**Linear Acceleration**:
- Revolute joint:
$${}^{i+1}\dot{\boldsymbol{v}}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\left({}^{i}\dot{\boldsymbol{\omega}}_i \times {}^{i}\boldsymbol{P}_{i+1} + {}^{i}\boldsymbol{\omega}_i \times ({}^{i}\boldsymbol{\omega}_i \times {}^{i}\boldsymbol{P}_{i+1}) + {}^{i}\dot{\boldsymbol{v}}_i\right)$$
- Prismatic joint:
$${}^{i+1}\dot{\boldsymbol{v}}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\left({}^{i}\dot{\boldsymbol{\omega}}_i \times {}^{i}\boldsymbol{P}_{i+1} + {}^{i}\boldsymbol{\omega}_i \times ({}^{i}\boldsymbol{\omega}_i \times {}^{i}\boldsymbol{P}_{i+1}) + {}^{i}\dot{\boldsymbol{v}}_i\right) + 2\,{}^{i+1}\boldsymbol{\omega}_{i+1} \times \dot{d}_{i+1}\; {}^{i+1}\hat{Z}_{i+1} + \ddot{d}_{i+1}\; {}^{i+1}\hat{Z}_{i+1}$$

**Linear Acceleration of the Center of Mass** (either joint type):

$${}^{i}\dot{\boldsymbol{v}}_{G_i} = {}^{i}\dot{\boldsymbol{\omega}}_i \times {}^{i}\boldsymbol{P}_{G_i} + {}^{i}\boldsymbol{\omega}_i \times ({}^{i}\boldsymbol{\omega}_i \times {}^{i}\boldsymbol{P}_{G_i}) + {}^{i}\dot{\boldsymbol{v}}_i$$

**Inertial Force and Moment Acting on Link** (either joint type):

$${}^{i}\boldsymbol{F}_i = m_i\; {}^{i}\dot{\boldsymbol{v}}_{G_i}$$

$${}^{i}\boldsymbol{N}_i = {}^{G_i}\boldsymbol{I}_i\; {}^{i}\dot{\boldsymbol{\omega}}_i + {}^{i}\boldsymbol{\omega}_i \times {}^{G_i}\boldsymbol{I}_i\; {}^{i}\boldsymbol{\omega}_i$$

### 6.7.3 Inward Iterations -- Forces and Torques
<!-- source: MSE492 - Chapter6-rev2.pdf#page=22 -->

Once the forces and moments acting at the centre of mass of the links that cause the desired motion are found, the joint torque or force can be evaluated with the following equations of balance.

**Balance equations** (from the free body diagram):

$${}^{i}\boldsymbol{F}_i = {}^{i}\boldsymbol{f}_i - {}^{i}_{i+1}\boldsymbol{R}\; {}^{i+1}\boldsymbol{f}_{i+1}$$

$${}^{i}\boldsymbol{N}_i = {}^{i}\boldsymbol{n}_i - {}^{i}\boldsymbol{n}_{i+1} + {}^{i}\boldsymbol{P}_{G_i} \times {}^{i}\boldsymbol{f}_i + ({}^{i}\boldsymbol{P}_{i+1} - {}^{i}\boldsymbol{P}_{G_i}) \times {}^{i}\boldsymbol{f}_{i+1}$$

where:
- $\boldsymbol{f}_i$ is the force exerted on link $i$ by link $i-1$
- $\boldsymbol{n}_i$ is the torque exerted on link $i$ by link $i-1$

#### Diagrams

**Free Body Diagram of Link $i$ (Ch6-22)**: A curved link segment labeled $\{i\}$ is shown with its center of mass. At the left (proximal) end, force $\boldsymbol{f}_i$ and moment $\boldsymbol{n}_i$ act on the link from the preceding link. At the right (distal) end, frame $\{i+1\}$ shows force $\boldsymbol{f}_{i+1}$ and moment $\boldsymbol{n}_{i+1}$ from the following link (reaction forces). The inertial force $\boldsymbol{F}_i$ and inertial moment $\boldsymbol{N}_i$ act at the center of mass.

<!-- source: MSE492 - Chapter6-rev2.pdf#page=23 -->

This iteration starts with link frame $\{n\}$ and moves successively link by link until link frame $\{1\}$, for $i = n \to 1$.

The forces and moments exerted on the last link ${}^{n+1}\boldsymbol{f}_{n+1}$ and ${}^{n+1}\boldsymbol{n}_{n+1}$ are related to external forces (zero if the robot moves in free space).

**Force and moment exerted on link $i$** (reactions at joint, either joint type):

$${}^{i}\boldsymbol{f}_i = {}^{i}\boldsymbol{F}_i + {}^{i}_{i+1}\boldsymbol{R}\; {}^{i+1}\boldsymbol{f}_{i+1}$$

$${}^{i}\boldsymbol{n}_i = {}^{i}\boldsymbol{N}_i + {}^{i}_{i+1}\boldsymbol{R}\; {}^{i+1}\boldsymbol{n}_{i+1} + {}^{i}\boldsymbol{P}_{G_i} \times {}^{i}\boldsymbol{F}_i + {}^{i}\boldsymbol{P}_{i+1} \times {}^{i}_{i+1}\boldsymbol{R}\; {}^{i+1}\boldsymbol{f}_{i+1}$$

**Required torques/forces** are applied in the $z$-direction:
- Revolute joint $i$ (torque):
$$\tau_i = {}^{i}\boldsymbol{n}_i^\top\; {}^{i}\hat{Z}_i$$
- Prismatic joint $i$ (force):
$$\tau_i = {}^{i}\boldsymbol{f}_i^\top\; {}^{i}\hat{Z}_i$$

### 6.7.4 Inclusion of Gravity Forces
<!-- source: MSE492 - Chapter6-rev2.pdf#page=24 -->

The effect of gravity loading on the links can be included by setting:

$${}^{i=0}\dot{\boldsymbol{v}}_{i=0} = \boldsymbol{G}$$

where $\boldsymbol{G}$ has the magnitude of the gravity vector, but points in the **opposite direction**.

This is equivalent to saying that the base of the robot is accelerating upward with $1g$ acceleration. This fictitious upward acceleration causes the same effect on the links as gravity would -- no extra computation is needed for including gravity effects.

### Key Equations

<!-- source: MSE492 - Chapter6-rev2.pdf#page=19 -->
1. Angular velocity (revolute): ${}^{i+1}\boldsymbol{\omega}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\; {}^{i}\boldsymbol{\omega}_i + \dot{\theta}_{i+1}\; {}^{i+1}\hat{Z}_{i+1}$
2. Angular velocity (prismatic): ${}^{i+1}\boldsymbol{\omega}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\; {}^{i}\boldsymbol{\omega}_i$
3. Angular acceleration (revolute): ${}^{i+1}\dot{\boldsymbol{\omega}}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\; {}^{i}\dot{\boldsymbol{\omega}}_i + {}^{i+1}_{i}\boldsymbol{R}\; {}^{i}\boldsymbol{\omega}_i \times \dot{\theta}_{i+1}\; {}^{i+1}\hat{Z}_{i+1} + \ddot{\theta}_{i+1}\; {}^{i+1}\hat{Z}_{i+1}$
4. Angular acceleration (prismatic): ${}^{i+1}\dot{\boldsymbol{\omega}}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\; {}^{i}\dot{\boldsymbol{\omega}}_i$
<!-- source: MSE492 - Chapter6-rev2.pdf#page=20 -->
5. Linear acceleration (revolute): ${}^{i+1}\dot{\boldsymbol{v}}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\left({}^{i}\dot{\boldsymbol{\omega}}_i \times {}^{i}\boldsymbol{P}_{i+1} + {}^{i}\boldsymbol{\omega}_i \times ({}^{i}\boldsymbol{\omega}_i \times {}^{i}\boldsymbol{P}_{i+1}) + {}^{i}\dot{\boldsymbol{v}}_i\right)$
6. Center of mass acceleration: ${}^{i}\dot{\boldsymbol{v}}_{G_i} = {}^{i}\dot{\boldsymbol{\omega}}_i \times {}^{i}\boldsymbol{P}_{G_i} + {}^{i}\boldsymbol{\omega}_i \times ({}^{i}\boldsymbol{\omega}_i \times {}^{i}\boldsymbol{P}_{G_i}) + {}^{i}\dot{\boldsymbol{v}}_i$
7. Inertial force: ${}^{i}\boldsymbol{F}_i = m_i\; {}^{i}\dot{\boldsymbol{v}}_{G_i}$
8. Inertial moment: ${}^{i}\boldsymbol{N}_i = {}^{G_i}\boldsymbol{I}_i\; {}^{i}\dot{\boldsymbol{\omega}}_i + {}^{i}\boldsymbol{\omega}_i \times {}^{G_i}\boldsymbol{I}_i\; {}^{i}\boldsymbol{\omega}_i$
<!-- source: MSE492 - Chapter6-rev2.pdf#page=23 -->
9. Joint reaction force: ${}^{i}\boldsymbol{f}_i = {}^{i}\boldsymbol{F}_i + {}^{i}_{i+1}\boldsymbol{R}\; {}^{i+1}\boldsymbol{f}_{i+1}$
10. Joint reaction moment: ${}^{i}\boldsymbol{n}_i = {}^{i}\boldsymbol{N}_i + {}^{i}_{i+1}\boldsymbol{R}\; {}^{i+1}\boldsymbol{n}_{i+1} + {}^{i}\boldsymbol{P}_{G_i} \times {}^{i}\boldsymbol{F}_i + {}^{i}\boldsymbol{P}_{i+1} \times {}^{i}_{i+1}\boldsymbol{R}\; {}^{i+1}\boldsymbol{f}_{i+1}$
11. Joint torque (revolute): $\tau_i = {}^{i}\boldsymbol{n}_i^\top\; {}^{i}\hat{Z}_i$
12. Joint force (prismatic): $\tau_i = {}^{i}\boldsymbol{f}_i^\top\; {}^{i}\hat{Z}_i$
<!-- source: MSE492 - Chapter6-rev2.pdf#page=24 -->
13. Gravity inclusion: ${}^{0}\dot{\boldsymbol{v}}_0 = \boldsymbol{G}$ (opposite direction to gravity)

### [ENRICHMENT] Alternative Explanation: The "Gravity Trick" in Newton-Euler
<!-- enrichment-type: explanation -->

The gravity inclusion trick (setting the base acceleration to $-\boldsymbol{g}$ instead of explicitly adding gravity forces to each link) is elegant and worth understanding deeply.

**The equivalence principle at work:** Einstein's equivalence principle states that gravitational acceleration is locally indistinguishable from being in an accelerating reference frame. The Newton-Euler algorithm exploits this: rather than adding a $m_i \boldsymbol{g}$ force to every link individually, we pretend the base is accelerating upward at $9.81 \text{ m/s}^2$. This fictitious acceleration propagates through the recursive algorithm and produces exactly the same effect as real gravity on every link.

**Why this is useful:**
- It requires **zero additional computation** -- gravity is handled automatically within the existing recursive structure
- No special gravity terms need to be added to any equation
- The algorithm structure remains identical whether gravity is present or not

**Practical implementation:** If gravity points in the $-Z_0$ direction:

$${}^{0}\dot{\boldsymbol{v}}_0 = \begin{bmatrix} 0 \\ 0 \\ +9.81 \end{bmatrix} \text{ m/s}^2$$

Note the **positive** sign -- the base "accelerates upward" (opposite to gravity).

**Reference**: [Newton-Euler Equations -- scaron.info](https://scaron.info/robotics/newton-euler-equations.html)

### [ENRICHMENT] Video: Newton-Euler Inverse Dynamics Algorithm (Modern Robotics)
<!-- enrichment-type: video -->

This video walks through the complete recursive Newton-Euler algorithm step by step, including the outward velocity/acceleration propagation and inward force/torque propagation:

- **Newton-Euler Inverse Dynamics**: [https://youtu.be/ZASVKAlegfQ](https://youtu.be/ZASVKAlegfQ) (~6 min)

The algorithm uses forward iterations from the base to the end-effector to calculate configurations, twists, and accelerations of each link. Then, backward iterations from the end-effector to the base calculate the wrench applied to each link and the joint forces/torques needed to generate those wrenches.

### [ENRICHMENT] Alternative Explanation: Why All Quantities Are Expressed in the Link's Own Frame
<!-- enrichment-type: explanation -->

A common source of confusion in the Newton-Euler algorithm is the notation: ${}^{i}\boldsymbol{\omega}_i$, ${}^{i}\boldsymbol{F}_i$, etc. The leading superscript $i$ means "expressed in frame $\{i\}$."

**Why use each link's own frame?** There are two important reasons:

1. **The inertia tensor is constant in the body frame.** Since ${}^{G_i}\boldsymbol{I}_i$ is defined with respect to the link's center of mass frame (which moves with the link), it never changes during the robot's motion. If we expressed everything in the base frame, we would need to recompute ${}^{0}\boldsymbol{I}_i = {}^{0}_i\boldsymbol{R}\; {}^{G_i}\boldsymbol{I}_i\; {}^{0}_i\boldsymbol{R}^\top$ at every time step.

2. **Computational efficiency.** Expressing quantities in adjacent link frames means the rotation matrix ${}^{i+1}_i\boldsymbol{R}$ (which comes directly from the DH parameters) is all that is needed to propagate quantities from one link to the next. There is no need to compute the full rotation from the base to each link.

This frame choice is a key reason the recursive Newton-Euler algorithm achieves $O(n)$ computational complexity (linear in the number of joints), making it the preferred method for real-time control.

---

## 6.8 Lagrangian Formulation
<!-- source: MSE492 - Chapter6-rev2.pdf#page=25 -->

### Definitions

Whereas the Newton-Euler formulation is based on a "force-balance" approach, the **Lagrangian Formulation** is based on an "energy balance" approach.

**Lagrangian Function**: The Lagrangian function $\mathcal{L}$ is defined as the difference between the kinetic and potential energy of a mechanical system:

$$\mathcal{L}(\boldsymbol{q}, \dot{\boldsymbol{q}}) = k(\boldsymbol{q}, \dot{\boldsymbol{q}}) - u(\boldsymbol{q})$$

**Lagrange's Equations of Motion**: Formulated in terms of the Lagrangian function:

$$\frac{d}{dt}\left(\frac{\partial \mathcal{L}(\boldsymbol{q}, \dot{\boldsymbol{q}})}{\partial \dot{\boldsymbol{q}}}\right) - \frac{\partial \mathcal{L}(\boldsymbol{q}, \dot{\boldsymbol{q}})}{\partial \boldsymbol{q}_i} = \boldsymbol{Q}_i$$

where $\boldsymbol{Q}_i$ is a generalized force (e.g., torque, external force, etc.).

### 6.8.1 Kinetic Energy
<!-- source: MSE492 - Chapter6-rev2.pdf#page=26 -->

The kinetic energy of the $i$-th link in terms of the inertial reference frame can be expressed as:

$$k_i = \frac{1}{2}\; {}^{0}\boldsymbol{v}_{G_i}^\top m_i\; {}^{0}\boldsymbol{v}_{G_i} + \frac{1}{2}\; {}^{0}\boldsymbol{\omega}_i^\top\; {}^{0}\boldsymbol{I}_i\; {}^{0}\boldsymbol{\omega}_i$$

where ${}^{0}\boldsymbol{I}_i$ is the inertia tensor of link $\{i\}$ referred to frame $\{0\}$. Since ${}^{G_i}\boldsymbol{I}_i$ (described with respect to centre of mass) is known, the rotation transformation must be applied:

$${}^{0}\boldsymbol{I}_i = {}^{0}_{i}\boldsymbol{R}\; {}^{G_i}\boldsymbol{I}_i\; {}^{0}_{i}\boldsymbol{R}^\top$$

Given that the links are moving, ${}^{0}_{i}\boldsymbol{R}$ is changing and therefore the inertia ${}^{0}\boldsymbol{I}_i$ will be constantly changing.

### Derivations

#### Kinetic Energy via Jacobians
<!-- source: MSE492 - Chapter6-rev2.pdf#page=27 -->

**Step 1**: The velocity of the centre of mass ${}^{0}\boldsymbol{v}_{G_i}$ and the angular velocity ${}^{0}\boldsymbol{\omega}_i$ of link $i$ can be found using the forward velocity problem:

$${}^{0}\boldsymbol{V}_{G_i} = \begin{bmatrix} {}^{0}\boldsymbol{v}_{G_i} \\ {}^{0}\boldsymbol{\omega}_i \end{bmatrix} = {}^{0}\boldsymbol{J}_{G_i}\,\dot{\boldsymbol{q}}$$

**Step 2**: This can be expanded as:

$$\begin{bmatrix} {}^{0}\boldsymbol{v}_{G_i} \\ {}^{0}\boldsymbol{\omega}_i \end{bmatrix} = \begin{bmatrix} {}^{0}\boldsymbol{J}_{V_{Gi}}^{(1)} & {}^{0}\boldsymbol{J}_{V_{Gi}}^{(2)} & \cdots & {}^{0}\boldsymbol{J}_{V_{Gi}}^{(i)} & \boldsymbol{0} & \cdots & \boldsymbol{0} \\ {}^{0}\boldsymbol{J}_{\omega_i}^{(1)} & {}^{0}\boldsymbol{J}_{\omega_i}^{(2)} & \cdots & {}^{0}\boldsymbol{J}_{\omega_i}^{(i)} & \boldsymbol{0} & \cdots & \boldsymbol{0} \end{bmatrix} \begin{bmatrix} \dot{q}_1 \\ \dot{q}_2 \\ \vdots \\ \dot{q}_i \\ \dot{q}_{i+1} \\ \vdots \\ \dot{q}_n \end{bmatrix}$$

The velocity of link $i$ is not affected by the joints that follow the link. Only joints that precede link $i$ affect its velocity. The subscript $(i)$ indicates the column number.

<!-- source: MSE492 - Chapter6-rev2.pdf#page=28 -->

**Step 3**: The columns of the Jacobian are found as follows:

$${}^{0}\boldsymbol{J}_{V_{Gi}}^{(i)} = \begin{cases} {}^{0}\hat{Z}_i \times {}^{0}\boldsymbol{P}_{i \to G_i} = \dfrac{\partial\; {}^{0}\boldsymbol{P}_{G_i}}{\partial \theta_i} & \text{Revolute Joint} \\[6pt] {}^{0}\hat{Z}_j = \dfrac{\partial\; {}^{0}\boldsymbol{P}_{G_i}}{\partial d_j} & \text{Prismatic Joint} \end{cases}$$

$${}^{0}\boldsymbol{J}_{\omega_i}^{(i)} = \begin{cases} {}^{0}\hat{Z}_i & \text{Revolute Joint} \\ \boldsymbol{0}_{3 \times 1} & \text{Prismatic Joint} \end{cases}$$

<!-- source: MSE492 - Chapter6-rev2.pdf#page=29 -->

**Step 4**: The kinetic energy of the overall system can be written in terms of Jacobians and joint rates:

$$k = \frac{1}{2}\sum_{i=1}^{n}\left({}^{0}\boldsymbol{v}_{G_i}^\top m_i\; {}^{0}\boldsymbol{v}_{G_i} + {}^{0}\boldsymbol{\omega}_i^\top\; {}^{0}\boldsymbol{I}_i\; {}^{0}\boldsymbol{\omega}_i\right)$$

$$= \frac{1}{2}\sum_{i=1}^{n}\left(({}^{0}\boldsymbol{J}_{V_{Gi}}\dot{\boldsymbol{q}})^\top m_i\; {}^{0}\boldsymbol{J}_{V_{Gi}}\dot{\boldsymbol{q}} + ({}^{0}\boldsymbol{J}_{\omega_i}\dot{\boldsymbol{q}})^\top\; {}^{0}\boldsymbol{I}_i\; {}^{0}\boldsymbol{J}_{\omega_i}\dot{\boldsymbol{q}}\right)$$

$$= \frac{1}{2}\dot{\boldsymbol{q}}^\top \left(\sum_{i=1}^{n} {}^{0}\boldsymbol{J}_{V_{Gi}}^\top m_i\; {}^{0}\boldsymbol{J}_{V_{Gi}} + {}^{0}\boldsymbol{J}_{\omega_i}^\top\; {}^{0}\boldsymbol{I}_i\; {}^{0}\boldsymbol{J}_{\omega_i}\right)\dot{\boldsymbol{q}}$$

**Step 5**: This yields the compact form:

$$k = \frac{1}{2}\dot{\boldsymbol{q}}^\top \boldsymbol{M}\,\dot{\boldsymbol{q}}$$

where the **Mass Matrix** is:

$$\boldsymbol{M} = \sum_{i=1}^{n}\left({}^{0}\boldsymbol{J}_{V_{Gi}}^\top m_i\; {}^{0}\boldsymbol{J}_{V_{Gi}} + {}^{0}\boldsymbol{J}_{\omega_i}^\top\; {}^{0}\boldsymbol{I}_i\; {}^{0}\boldsymbol{J}_{\omega_i}\right)$$

### 6.8.2 Potential Energy
<!-- source: MSE492 - Chapter6-rev2.pdf#page=30 -->

The potential energy stored in link $i$ is defined as the amount of work required to raise the centre of mass of link $i$ from a horizontal reference plane to its present position under the influence of gravity:

$$u = -\sum_{i=1}^{n} m_i\,\boldsymbol{g}^\top\; {}^{0}\boldsymbol{P}_{G_i}$$

### 6.8.3 Generalized Forces
<!-- source: MSE492 - Chapter6-rev2.pdf#page=30 -->

The generalized forces are those forces that act on the manipulator: torques, external forces, friction, etc.

$$\boldsymbol{Q} = \boldsymbol{\tau} - \boldsymbol{J}^\top \boldsymbol{F} - \boldsymbol{f}_r$$

### 6.8.4 General Form of the Dynamic Equation
<!-- source: MSE492 - Chapter6-rev2.pdf#page=31 -->

### Derivations

Starting from Lagrange's equation:

$$\frac{d}{dt}\left(\frac{\partial \mathcal{L}(\boldsymbol{q}, \dot{\boldsymbol{q}})}{\partial \dot{\boldsymbol{q}}}\right) - \frac{\partial \mathcal{L}(\boldsymbol{q}, \dot{\boldsymbol{q}})}{\partial \boldsymbol{q}_i} = \boldsymbol{Q}_i \qquad \text{with} \qquad \mathcal{L}(\boldsymbol{q}, \dot{\boldsymbol{q}}) = k(\boldsymbol{q}, \dot{\boldsymbol{q}}) - u(\boldsymbol{q})$$

The differentiation of the Lagrangian equation yields:

$$\sum_{j=1}^{n} \boldsymbol{M}_{ij}\,\ddot{q}_j + \boldsymbol{V}_i + \boldsymbol{G}_i = \boldsymbol{Q}_i$$

where $\boldsymbol{M}_{ij}$ is a mass matrix element, and:

**Velocity coupling term** (centrifugal and Coriolis):

$$\boldsymbol{V}_i = \sum_{j=1}^{n}\sum_{k=1}^{n}\left(\frac{\partial \boldsymbol{M}_{ij}}{\partial q_k} - \frac{1}{2}\frac{\partial \boldsymbol{M}_{jk}}{\partial q_i}\right)\dot{q}_j\,\dot{q}_k$$

**Gravity term**:

$$\boldsymbol{G}_i = \sum_{j=1}^{n} m_j\,\boldsymbol{g}^\top\; {}^{0}\boldsymbol{J}_{V_{Gj}}^{(i)}$$

Finally, in compact vector form:

$$\boldsymbol{\tau} = \boldsymbol{M}(\boldsymbol{\Theta})\ddot{\boldsymbol{\Theta}} + \boldsymbol{V}(\boldsymbol{\Theta}, \dot{\boldsymbol{\Theta}}) + \boldsymbol{G}(\boldsymbol{\Theta})$$

### 6.8.5 Kinetic Energy (Alternative Form)
<!-- source: MSE492 - Chapter6-rev2.pdf#page=32 -->

The kinetic energy of the $i$-th link can alternatively be expressed in terms of the link's own frame rather than the inertial frame:

$$k_i = \frac{1}{2}\; {}^{i}\boldsymbol{v}_{G_i}^\top m_i\; {}^{i}\boldsymbol{v}_{G_i} + \frac{1}{2}\; {}^{i}\boldsymbol{\omega}_i^\top\; {}^{G_i}\boldsymbol{I}_i\; {}^{i}\boldsymbol{\omega}_i$$

where ${}^{G_i}\boldsymbol{I}_i$ is the inertia tensor of link $\{i\}$ with respect to the centre of mass. This form avoids the need to continuously re-compute ${}^{0}\boldsymbol{I}_i$ via rotation transformation.

### Key Equations

<!-- source: MSE492 - Chapter6-rev2.pdf#page=25 -->
1. Lagrangian function: $\mathcal{L}(\boldsymbol{q}, \dot{\boldsymbol{q}}) = k(\boldsymbol{q}, \dot{\boldsymbol{q}}) - u(\boldsymbol{q})$
2. Lagrange's equation of motion: $\dfrac{d}{dt}\left(\dfrac{\partial \mathcal{L}}{\partial \dot{\boldsymbol{q}}}\right) - \dfrac{\partial \mathcal{L}}{\partial \boldsymbol{q}_i} = \boldsymbol{Q}_i$
<!-- source: MSE492 - Chapter6-rev2.pdf#page=26 -->
3. Kinetic energy of link $i$: $k_i = \frac{1}{2}\; {}^{0}\boldsymbol{v}_{G_i}^\top m_i\; {}^{0}\boldsymbol{v}_{G_i} + \frac{1}{2}\; {}^{0}\boldsymbol{\omega}_i^\top\; {}^{0}\boldsymbol{I}_i\; {}^{0}\boldsymbol{\omega}_i$
4. Inertia rotation transformation: ${}^{0}\boldsymbol{I}_i = {}^{0}_{i}\boldsymbol{R}\; {}^{G_i}\boldsymbol{I}_i\; {}^{0}_{i}\boldsymbol{R}^\top$
<!-- source: MSE492 - Chapter6-rev2.pdf#page=29 -->
5. Compact kinetic energy: $k = \frac{1}{2}\dot{\boldsymbol{q}}^\top \boldsymbol{M}\,\dot{\boldsymbol{q}}$
6. Mass matrix: $\boldsymbol{M} = \sum_{i=1}^{n}\left({}^{0}\boldsymbol{J}_{V_{Gi}}^\top m_i\; {}^{0}\boldsymbol{J}_{V_{Gi}} + {}^{0}\boldsymbol{J}_{\omega_i}^\top\; {}^{0}\boldsymbol{I}_i\; {}^{0}\boldsymbol{J}_{\omega_i}\right)$
<!-- source: MSE492 - Chapter6-rev2.pdf#page=30 -->
7. Potential energy: $u = -\sum_{i=1}^{n} m_i\,\boldsymbol{g}^\top\; {}^{0}\boldsymbol{P}_{G_i}$
8. Generalized forces: $\boldsymbol{Q} = \boldsymbol{\tau} - \boldsymbol{J}^\top \boldsymbol{F} - \boldsymbol{f}_r$
<!-- source: MSE492 - Chapter6-rev2.pdf#page=31 -->
9. Velocity coupling term: $\boldsymbol{V}_i = \sum_{j=1}^{n}\sum_{k=1}^{n}\left(\frac{\partial \boldsymbol{M}_{ij}}{\partial q_k} - \frac{1}{2}\frac{\partial \boldsymbol{M}_{jk}}{\partial q_i}\right)\dot{q}_j\,\dot{q}_k$
10. Gravity term: $\boldsymbol{G}_i = \sum_{j=1}^{n} m_j\,\boldsymbol{g}^\top\; {}^{0}\boldsymbol{J}_{V_{Gj}}^{(i)}$
11. Final dynamic equation: $\boldsymbol{\tau} = \boldsymbol{M}(\boldsymbol{\Theta})\ddot{\boldsymbol{\Theta}} + \boldsymbol{V}(\boldsymbol{\Theta}, \dot{\boldsymbol{\Theta}}) + \boldsymbol{G}(\boldsymbol{\Theta})$
<!-- source: MSE492 - Chapter6-rev2.pdf#page=32 -->
12. Kinetic energy (alternative, in link frame): $k_i = \frac{1}{2}\; {}^{i}\boldsymbol{v}_{G_i}^\top m_i\; {}^{i}\boldsymbol{v}_{G_i} + \frac{1}{2}\; {}^{i}\boldsymbol{\omega}_i^\top\; {}^{G_i}\boldsymbol{I}_i\; {}^{i}\boldsymbol{\omega}_i$

### [ENRICHMENT] Video: Lagrangian Formulation of Dynamics (Modern Robotics)
<!-- enrichment-type: video -->

These videos introduce the Lagrangian approach in the context of robotics:

- **Part 1**: [https://youtu.be/1U6y_68CjeY](https://youtu.be/1U6y_68CjeY) -- Introduces the Lagrangian, kinetic/potential energy, and derives the general form $\tau = M\ddot{q} + c + g$
- **Part 2**: [https://youtu.be/BjD-pL819LA](https://youtu.be/BjD-pL819LA) -- Continues with the structure of the dynamic equations and the velocity-product terms
- **Understanding the Mass Matrix**: [https://youtu.be/7PFQou5l9do](https://youtu.be/7PFQou5l9do) -- Physical interpretation of the mass matrix, manipulability, and its configuration-dependence

### [ENRICHMENT] Alternative Explanation: Properties of the Mass Matrix
<!-- enrichment-type: explanation -->

The mass matrix $\boldsymbol{M}(\boldsymbol{\Theta})$ has several important properties that are useful for analysis and control:

1. **Symmetric:** $\boldsymbol{M} = \boldsymbol{M}^\top$. This follows directly from the definition $\boldsymbol{M} = \sum_i \boldsymbol{J}_{V_i}^\top m_i \boldsymbol{J}_{V_i} + \boldsymbol{J}_{\omega_i}^\top \boldsymbol{I}_i \boldsymbol{J}_{\omega_i}$, since each term in the sum is of the form $\boldsymbol{A}^\top \boldsymbol{B} \boldsymbol{A}$ which is always symmetric.

2. **Positive definite:** $\dot{\boldsymbol{q}}^\top \boldsymbol{M} \dot{\boldsymbol{q}} > 0$ for all $\dot{\boldsymbol{q}} \neq 0$. This is because the kinetic energy $k = \frac{1}{2}\dot{\boldsymbol{q}}^\top \boldsymbol{M} \dot{\boldsymbol{q}}$ must be strictly positive whenever the robot is moving. Physically, this means the robot always has positive "effective inertia" in every direction -- it takes positive energy to move it.

3. **Configuration-dependent:** Unlike a point mass (whose mass is constant), the mass matrix changes as the robot moves. At some configurations the robot's effective inertia along a particular direction may be large (the robot is "heavy" to move in that direction), and at other configurations it may be small. This is why robot dynamics are nonlinear.

4. **Bounded:** For a physical robot, the mass matrix eigenvalues are bounded above and below by positive constants: $\lambda_{\min}\boldsymbol{E} \leq \boldsymbol{M}(\boldsymbol{\Theta}) \leq \lambda_{\max}\boldsymbol{E}$. This property is important for proving stability of control algorithms.

5. **The property $\dot{\boldsymbol{M}} - 2\boldsymbol{C}$ is skew-symmetric:** When the Coriolis matrix $\boldsymbol{C}$ is defined using Christoffel symbols, the matrix $\dot{\boldsymbol{M}} - 2\boldsymbol{C}$ is skew-symmetric. This is a crucial property exploited in many robot control proofs (e.g., passivity-based control).

**Reference**: [Modern Robotics: Understanding the Mass Matrix](https://modernrobotics.northwestern.edu/nu-gm-book-resource/8-1-3-understanding-the-mass-matrix/)

### [ENRICHMENT] Alternative Explanation: The Velocity Coupling Term and Christoffel Symbols
<!-- enrichment-type: explanation -->

The velocity coupling term $\boldsymbol{V}_i$ contains both **centrifugal** and **Coriolis** effects. The formula:

$$\boldsymbol{V}_i = \sum_{j=1}^{n}\sum_{k=1}^{n}\left(\frac{\partial \boldsymbol{M}_{ij}}{\partial q_k} - \frac{1}{2}\frac{\partial \boldsymbol{M}_{jk}}{\partial q_i}\right)\dot{q}_j\,\dot{q}_k$$

can be rewritten using the **Christoffel symbols of the first kind**:

$$c_{ijk} = \frac{1}{2}\left(\frac{\partial M_{ij}}{\partial q_k} + \frac{\partial M_{ik}}{\partial q_j} - \frac{\partial M_{jk}}{\partial q_i}\right)$$

so that:

$$\boldsymbol{V}_i = \sum_{j=1}^{n}\sum_{k=1}^{n} c_{ijk}\,\dot{q}_j\,\dot{q}_k$$

**Physical meaning of the terms:**

- **Centrifugal terms** (when $j = k$): $c_{ijj}\dot{q}_j^2$ represents the force on joint $i$ due to joint $j$ rotating at speed $\dot{q}_j$. This is the same centrifugal effect you feel on a merry-go-round.

- **Coriolis terms** (when $j \neq k$): $2c_{ijk}\dot{q}_j\dot{q}_k$ represents the force on joint $i$ due to the interaction between the velocities of joints $j$ and $k$. These coupling terms are what make multi-joint robot dynamics fundamentally different from single-joint dynamics.

At low speeds, the $\boldsymbol{V}$ term is negligible compared to the gravity term $\boldsymbol{G}$. At high speeds, these velocity-dependent forces become dominant and must be compensated in the control law.

**Reference**: [Numerical Methods to Compute the Coriolis Matrix and Christoffel Symbols (arXiv)](https://arxiv.org/abs/2010.01033)

### [ENRICHMENT] Alternative Explanation: Newton-Euler vs. Lagrangian -- When to Use Which
<!-- enrichment-type: explanation -->

Both formulations produce the same dynamic equations, but they have different strengths:

| Property | Newton-Euler | Lagrangian |
|---|---|---|
| **Approach** | Force/torque balance (link by link) | Energy-based (system-wide) |
| **Internal forces** | Explicitly computed (joint reaction forces) | Automatically eliminated |
| **Computational form** | Recursive/numerical | Closed-form/symbolic |
| **Complexity** | $O(n)$ -- linear in number of joints | $O(n^3)$ to $O(n^4)$ -- symbolic differentiation |
| **Best for** | Real-time control, simulation | Deriving closed-form equations, theoretical analysis |
| **Provides** | Joint torques directly | Mass matrix, Coriolis matrix, gravity vector separately |

**Practical guidance:**
- Use **Newton-Euler** when you need to compute joint torques numerically in real-time (e.g., in a robot controller running at 1 kHz). Its $O(n)$ complexity is unbeatable.
- Use **Lagrangian** when you need the closed-form symbolic equations of motion (e.g., for controller design, stability analysis, or deriving properties of the mass matrix). It naturally gives you the $\boldsymbol{M}$, $\boldsymbol{V}$, and $\boldsymbol{G}$ terms separately.
- Both formulations are **mathematically equivalent** -- they produce the same torques for the same inputs.

**References**:
- [Lagrangian vs. Newton-Euler Methods: Which is Better for Your Robot?](https://eureka.patsnap.com/article/lagrangian-vs-newton-euler-methods-which-is-better-for-your-robot)
- [On the Equivalence of Lagrangian and Newton-Euler Dynamics for Manipulators (Silver, 1982)](https://journals.sagepub.com/doi/10.1177/027836498200100204)

### [ENRICHMENT] Video: Robot Academy -- Velocity Coupling and Inertia Coupling
<!-- enrichment-type: video -->

These short videos from Peter Corke's Robot Academy build intuition for the individual terms in the dynamic equation:

- **Inertia and Acceleration Coupling**: Explains how the motion of one joint creates forces on other joints through the mass matrix. [https://robotacademy.net.au/lesson/inertia-and-acceleration-coupling/](https://robotacademy.net.au/lesson/inertia-and-acceleration-coupling/)
- **Velocity Coupling**: Covers the Coriolis and centrifugal terms that arise from joint velocities. [https://robotacademy.net.au/lesson/velocity-coupling/](https://robotacademy.net.au/lesson/velocity-coupling/)
- **Gravity and Payload**: Examines the gravity torque term and how payload mass affects the required joint torques. [https://robotacademy.net.au/lesson/gravity-and-payload/](https://robotacademy.net.au/lesson/gravity-and-payload/)
- **Forces Acting On Robot Links**: Overview of all forces acting on a robot link. [https://robotacademy.net.au/lesson/forces-acting-on-robot-links/](https://robotacademy.net.au/lesson/forces-acting-on-robot-links/)

### [ENRICHMENT] Alternative Explanation: A Worked 2R Example for Building Intuition
<!-- enrichment-type: explanation -->

To solidify understanding, it helps to see the Lagrangian method applied to the simplest non-trivial case: a two-link (2R) planar manipulator. The resulting dynamic equation has the form:

$$\begin{bmatrix} \tau_1 \\ \tau_2 \end{bmatrix} = \begin{bmatrix} M_{11} & M_{12} \\ M_{21} & M_{22} \end{bmatrix} \begin{bmatrix} \ddot{\theta}_1 \\ \ddot{\theta}_2 \end{bmatrix} + \begin{bmatrix} -h\dot{\theta}_2^2 - 2h\dot{\theta}_1\dot{\theta}_2 \\ h\dot{\theta}_1^2 \end{bmatrix} + \begin{bmatrix} G_1 \\ G_2 \end{bmatrix}$$

where $h = m_2 l_1 l_{c2} \sin\theta_2$ and:

- $M_{11} = m_1 l_{c1}^2 + m_2(l_1^2 + l_{c2}^2 + 2l_1 l_{c2}\cos\theta_2) + I_1 + I_2$ -- depends on $\theta_2$
- $M_{12} = M_{21} = m_2(l_{c2}^2 + l_1 l_{c2}\cos\theta_2) + I_2$ -- the coupling term
- $M_{22} = m_2 l_{c2}^2 + I_2$ -- constant (does not depend on configuration)

Key observations:
- $M_{11}$ changes with $\theta_2$ because the effective inertia seen by joint 1 depends on how the second link is oriented
- $M_{22}$ is constant because joint 2 only sees its own link's inertia regardless of configuration
- The Coriolis terms ($-2h\dot{\theta}_1\dot{\theta}_2$) and centrifugal terms ($-h\dot{\theta}_2^2$ and $h\dot{\theta}_1^2$) all involve $\sin\theta_2$ and vanish when the arm is fully extended ($\theta_2 = 0$)

**References**:
- [Deriving Equations of Motion for a 2-R Manipulator Using MATLAB](https://mec560sbu.github.io/2016/08/30/2R_EOM_dynamics_example/)
- [Implementing Lagrangian Mechanics Three Ways (Adam Heins)](https://adamheins.com/blog/lagrangian-mechanics-three-ways)
- [UIUC ECE 470: Lagrangian Dynamics Lecture Notes (PDF)](https://publish.illinois.edu/ece470-intro-robotics/files/2021/10/ECE470FA21Lec16.pdf)
