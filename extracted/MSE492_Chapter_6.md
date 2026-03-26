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

$${}^{C}I_{xy} = {}^{A}I_{xy} - m\,x_C\,y_C$$

$${}^{C}I_{yz} = {}^{A}I_{yz} - m\,y_C\,z_C$$

$${}^{C}I_{xz} = {}^{A}I_{xz} - m\,x_C\,z_C$$

#### Diagrams

**Parallel Axis Theorem Diagram (Ch6-12)**: An irregular 2D body (blob shape) with two coordinate frames shown. Frame $\{A\}$ is at the centroid of the body with axes $\hat{X}$, $\hat{Y}$, $\hat{Z}$. Frame $\{C\}$ is displaced from $\{A\}$ by vector ${}^{C}\boldsymbol{P}$ with components $(x_C, y_C, z_C)$ shown as dashed red lines. Both frames have identically oriented axes.

### Key Equations

<!-- source: MSE492 - Chapter6-rev2.pdf#page=12 -->
1. Parallel axis theorem (moments): ${}^{C}I_{xx} = {}^{A}I_{xx} + m(z_C^2 + y_C^2)$
2. Parallel axis theorem (products): ${}^{C}I_{xy} = {}^{A}I_{xy} - m\,x_C\,y_C$

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

$$\boldsymbol{G}_i = \sum_{j=1}^{n} m_j\,\boldsymbol{g}^\top\; {}^{0}\boldsymbol{J}_{V_{Gi}}^{(i)}$$

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
10. Gravity term: $\boldsymbol{G}_i = \sum_{j=1}^{n} m_j\,\boldsymbol{g}^\top\; {}^{0}\boldsymbol{J}_{V_{Gi}}^{(i)}$
11. Final dynamic equation: $\boldsymbol{\tau} = \boldsymbol{M}(\boldsymbol{\Theta})\ddot{\boldsymbol{\Theta}} + \boldsymbol{V}(\boldsymbol{\Theta}, \dot{\boldsymbol{\Theta}}) + \boldsymbol{G}(\boldsymbol{\Theta})$
<!-- source: MSE492 - Chapter6-rev2.pdf#page=32 -->
12. Kinetic energy (alternative, in link frame): $k_i = \frac{1}{2}\; {}^{i}\boldsymbol{v}_{G_i}^\top m_i\; {}^{i}\boldsymbol{v}_{G_i} + \frac{1}{2}\; {}^{i}\boldsymbol{\omega}_i^\top\; {}^{G_i}\boldsymbol{I}_i\; {}^{i}\boldsymbol{\omega}_i$
