# Chapter 5: Jacobians: Velocities and Static Forces
<!-- source: MSE492 - Chapter5-rev2.pdf#page=1 -->

---

## Overview
<!-- source: MSE492 - Chapter5-rev2.pdf#page=2 -->

This chapter covers two methods for analyzing velocities and static forces:

- Velocity analysis of rigid bodies and velocity propagation
- Forward velocity problem and Jacobian
  - Joint directions and derivatives
  - Joint directions and cross products
  - Velocity transformation matrix and simpler Jacobians
  - Inverse velocity problem and singularities
  - Force transformation matrices and inverse static problem

---

## 5.1 Introduction
<!-- source: MSE492 - Chapter5-rev2.pdf#page=3 -->

This chapter examines the notions of linear and angular velocities of rigid bodies. The notion of differentiation of position vectors and rotation matrices will be used to define the velocity terms for general motion (i.e., a motion that includes both translation and rotation).

A systematic analysis of the velocities of the links of a manipulator will be conducted from the base to the end-effector (velocity propagation).

The study of both velocities and the static forces acting on a rigid body leads to a matrix entity called the **Jacobian**.

### [ENRICHMENT] Video: Introduction to the Robot Jacobian — What It Is and Why It Matters
<!-- enrichment-type: video -->

The Jacobian is one of the most important tools in robotics — it is the mathematical bridge between what the joints are doing (joint velocities) and what the end-effector is doing (Cartesian velocities). Before diving into the math, it helps to build intuition for what the Jacobian represents physically.

**Recommended video**: *Modern Robotics, Chapter 5: Velocity Kinematics and Statics* by Kevin Lynch (Northwestern University). This video series introduces the Jacobian, explains how it maps joint velocities to end-effector velocities, and covers singularities, manipulability, and the force ellipsoid.

- Course page with embedded videos: [Modern Robotics Chapter 5 — Velocity Kinematics and Statics](https://modernrobotics.northwestern.edu/nu-gm-book-resource/velocity-kinematics-and-statics/)
- Full chapter page with all sub-topic videos: [Modern Robotics Chapter 5](https://modernrobotics.northwestern.edu/chapters/chapter5/)

**Why watch this**: The Modern Robotics treatment uses screw theory (twists), which is a different but complementary perspective to the Craig-style approach used in our course. Seeing both approaches builds deeper understanding.

### [ENRICHMENT] Explanation: Physical Intuition for the Jacobian
<!-- enrichment-type: explanation -->

Think of the Jacobian as a "gear ratio" matrix for a robot. Just as a gear ratio tells you how fast an output shaft spins given an input shaft speed, the Jacobian tells you how fast the end-effector moves given a set of joint velocities.

**Key intuitions:**

1. **The Jacobian is configuration-dependent.** Unlike a fixed gear ratio, the Jacobian changes as the robot moves. At some configurations the robot can move the end-effector quickly in a certain direction; at others, it can barely move at all in that direction.

2. **Each column of the Jacobian represents one joint's contribution.** Column $i$ tells you: "If joint $i$ moves at unit speed and all other joints are stationary, what velocity does the end-effector experience?" The total end-effector velocity is just the sum of all these contributions (scaled by the actual joint speeds).

3. **The Jacobian is a $6 \times n$ matrix** (for a robot with $n$ joints in 3D space), where the top 3 rows correspond to linear velocity and the bottom 3 rows correspond to angular velocity. For planar robots, it reduces to $3 \times n$ (2 linear + 1 angular).

4. **The Jacobian connects two "spaces."** Joint space is $n$-dimensional (one dimension per joint). Task space is 6-dimensional (3 translations + 3 rotations). The Jacobian is the linear map between them at any given instant.

**Reference**: [Robot Control Part 2: Jacobians, Velocity, and Force — StudyWolf](https://studywolf.wordpress.com/2013/09/02/robot-control-jacobians-velocity-and-force/) provides an excellent visual and code-based walkthrough of these ideas.

---

## 5.2 Notation

### 5.2.1 Differentiation of Position Vector
<!-- source: MSE492 - Chapter5-rev2.pdf#page=4 -->

#### Definitions

**Derivative of a position vector**: The derivative of position vector $\boldsymbol{Q}$ with respect to frame $\{B\}$ is:

$$\frac{d}{dt} {}^{B}\boldsymbol{Q} = {}^{B}\boldsymbol{V}_Q$$

**Velocity in another reference frame**: The velocity vector can be expressed in terms of any other reference frame (such as frame $\{A\}$), using a leading superscript:

$${}^{A}\!\left({}^{B}\boldsymbol{V}_Q\right) = \frac{{}^{A}d}{dt} {}^{B}\boldsymbol{Q}$$

**Shorthand when frames match**: There is no need to express the outer leading superscript if the calculated velocity is written in terms of the frame of differentiation:

$${}^{B}\!\left({}^{B}\boldsymbol{V}_Q\right) = {}^{B}\boldsymbol{V}_Q$$

**Frame change via rotation matrix**: The outer leading superscript can be removed by explicitly including the rotation matrix that accomplishes the change in the reference frame:

$${}^{A}\!\left({}^{B}\boldsymbol{V}_Q\right) = {}^{A}_{B}\boldsymbol{R}\; {}^{B}\boldsymbol{V}_Q$$

**Velocity of a frame origin**: The velocity of the origin of a frame (such as frame $\{C\}$) relative to universal frame $\{U\}$ can be expressed as:

$$\boldsymbol{v}_C = {}^{U}\boldsymbol{V}_{C_{ORG}}$$

### 5.2.2 Worked Example: Train and Car
<!-- source: MSE492 - Chapter5-rev2.pdf#page=5 -->

> **[Figure: A fixed universe frame $\{U\}$, a frame attached to a train traveling at 100 mph $\{T\}$, and a frame attached to a car traveling at 30 mph $\{C\}$. Both vehicles are heading in the $\hat{Y}$ direction of $\{U\}$. The rotation matrices ${}^{U}_{T}\boldsymbol{R}$ and ${}^{U}_{C}\boldsymbol{R}$ are known and constant.]** (page 5)

**Problem**: Given the rotation matrices ${}^{U}_{T}\boldsymbol{R}$ and ${}^{U}_{C}\boldsymbol{R}$ are known and constant.

---

**Find** $\frac{{}^{U}d}{dt} {}^{U}\boldsymbol{P}_{C_{ORG}}$:

$$\frac{{}^{U}d}{dt} {}^{U}\boldsymbol{P}_{C_{ORG}} = {}^{U}\boldsymbol{V}_{C_{ORG}} = \boldsymbol{v}_C = 30\,\hat{Y}$$

---

**Find** ${}^{C}\!\left({}^{U}\boldsymbol{V}_{T_{ORG}}\right)$:

$${}^{C}\!\left({}^{U}\boldsymbol{V}_{T_{ORG}}\right) = {}^{C}\boldsymbol{v}_T = {}^{U}_{C}\boldsymbol{R}\;\boldsymbol{v}_T = {}^{U}_{C}\boldsymbol{R}\;100\hat{Y} = {}^{U}_{C}\boldsymbol{R}^{-1}\;100\hat{Y}$$

---

**Find** ${}^{C}\!\left({}^{T}\boldsymbol{V}_{C_{ORG}}\right)$:

$${}^{C}\!\left({}^{T}\boldsymbol{V}_{C_{ORG}}\right) = {}^{C}_{T}\boldsymbol{R}\; {}^{T}\boldsymbol{V}_{C_{ORG}} = -{}^{U}_{C}\boldsymbol{R}^{-1}\;{}^{U}_{T}\boldsymbol{R}\;70\hat{Y}$$

> **Note**: The relative velocity of the car w.r.t. the train is $30 - 100 = -70$ mph in the $\hat{Y}$ direction of $\{U\}$.

### 5.2.3 The Angular Velocity Vector
<!-- source: MSE492 - Chapter5-rev2.pdf#page=6 -->

#### Definition

The angular velocity of frame $\{B\}$ relative to frame $\{A\}$ is the vector ${}^{A}\boldsymbol{\Omega}_B$.

> **[Figure: Frame $\{B\}$ rotating relative to frame $\{A\}$ with angular velocity vector ${}^{A}\boldsymbol{\Omega}_B$.]** (page 6)

For the angular velocity of frame $\{C\}$ relative to some understood reference $\{U\}$, a simplified notation is introduced as:

$$\boldsymbol{\omega}_C = {}^{U}\boldsymbol{\Omega}_C$$

---

## 5.3 Linear and Rotational Velocity of Rigid Bodies

### 5.3.1 Linear Velocity
<!-- source: MSE492 - Chapter5-rev2.pdf#page=7 -->

Assume the case of the general mapping of a position vector ${}^{A}\boldsymbol{Q}$.

> **[Figure: Frame $\{A\}$ with origin, frame $\{B\}$ offset from $\{A\}$, and a point $Q$ with position vector ${}^{B}\boldsymbol{Q}$ in frame $\{B\}$. The position of $Q$ in $\{A\}$ involves both the origin offset ${}^{A}\boldsymbol{P}_{B_{ORG}}$ and the rotated local position.]** (page 7)

The absolute velocity of point $Q$ with respect to frame $\{A\}$ is found by differentiating the position vector with respect to time:

$$\frac{d\;{}^{A}\boldsymbol{Q}}{dt} = \frac{d\;{}^{A}\boldsymbol{P}_{B_{ORG}}}{dt} + \frac{d\;{}^{A}_{B}\boldsymbol{R}\;{}^{B}\boldsymbol{Q}}{dt}$$

### 5.3.2 Linear Velocity (continued) -- Constant Orientation Case
<!-- source: MSE492 - Chapter5-rev2.pdf#page=8 -->

If the orientation of frame $\{B\}$ relative to $\{A\}$ does not change, then the rotation matrix ${}^{A}_{B}\boldsymbol{R}$ remains constant. Hence:

$$\frac{d\;{}^{A}\boldsymbol{Q}}{dt} = \frac{d\;{}^{A}\boldsymbol{P}_{B_{ORG}}}{dt} + {}^{A}_{B}\boldsymbol{R}\;\frac{d\;{}^{B}\boldsymbol{Q}}{dt}$$

$$\boxed{{}^{A}\boldsymbol{V}_Q = {}^{A}\boldsymbol{V}_{B_{ORG}} + {}^{A}_{B}\boldsymbol{R}\;{}^{B}\boldsymbol{V}_Q}$$

### 5.3.3 Rotational Velocity
<!-- source: MSE492 - Chapter5-rev2.pdf#page=9 -->

Assume the case of two reference frames that are coincident, and the moving reference frame rotates instantaneously about an axis of rotation with angular velocity ${}^{A}\Omega_B$.

> **[Figure: Two coincident reference frames $\{A\}$ and $\{B\}$ with axes $\hat{X}_A, \hat{Y}_A, \hat{Z}_A$ and $\hat{X}_B, \hat{Y}_B, \hat{Z}_B$ sharing a common origin $O$. Angular velocity vector ${}^{A}\boldsymbol{\Omega}_B$ is shown, along with a point $Q$ with position vector ${}^{B}\boldsymbol{Q}$.]** (page 9)

The position mapping is:

$${}^{A}\boldsymbol{Q} = {}^{A}_{B}\boldsymbol{R}\;{}^{B}\boldsymbol{Q}$$

The velocity of point $Q$ is given by:

$$\frac{d\;{}^{A}\boldsymbol{Q}}{dt} = {}^{A}_{B}\boldsymbol{R}\;\frac{d\;{}^{B}\boldsymbol{Q}}{dt}$$

$$\boxed{{}^{A}\boldsymbol{V}_Q = {}^{A}\boldsymbol{\Omega}_B \times {}^{A}_{B}\boldsymbol{R}\;{}^{B}\boldsymbol{Q}}$$

### 5.3.4 General Velocity Representation
<!-- source: MSE492 - Chapter5-rev2.pdf#page=10 -->

Assume the case of the general mapping of a position vector where the orientation between frames $\{A\}$ and $\{B\}$ changes over time.

> **[Figure: General case with frame $\{A\}$ and frame $\{B\}$ offset and rotating. Point $Q$ has position ${}^{A}\boldsymbol{Q}$ defined through the origin offset and rotation.]** (page 10)

In the case of simultaneous linear and rotational velocity, the absolute velocity of $Q$ with respect to frame $\{A\}$ is defined as:

$$\boxed{{}^{A}\boldsymbol{V}_Q = {}^{A}\boldsymbol{V}_{B_{ORG}} + {}^{A}_{B}\boldsymbol{R}\;{}^{B}\boldsymbol{V}_Q + {}^{A}\boldsymbol{\Omega}_B \times {}^{A}_{B}\boldsymbol{R}\;{}^{B}\boldsymbol{Q}}$$

This is the fundamental velocity equation combining:
- ${}^{A}\boldsymbol{V}_{B_{ORG}}$: linear velocity of the origin of $\{B\}$ in $\{A\}$
- ${}^{A}_{B}\boldsymbol{R}\;{}^{B}\boldsymbol{V}_Q$: velocity of $Q$ relative to $\{B\}$, expressed in $\{A\}$
- ${}^{A}\boldsymbol{\Omega}_B \times {}^{A}_{B}\boldsymbol{R}\;{}^{B}\boldsymbol{Q}$: velocity due to rotation of $\{B\}$ relative to $\{A\}$

---

## 5.5 Convention -- Motion of the Links of a Robot
<!-- source: MSE492 - Chapter5-rev2.pdf#page=11 -->

In considering the motion of robot links:

- Link frame $\{0\}$ is used as the **reference frame**
- $v_i$ is the linear velocity of the origin of link frame $\{i\}$
- $\omega_i$ is the angular velocity of link frame $\{i\}$

---

## 5.6 Velocity Propagation from Link to Link
<!-- source: MSE492 - Chapter5-rev2.pdf#page=12 -->

### Concept

- Links undergo a change in position and orientation over time, i.e., linear and angular velocity.
- The velocity of each joint (joint rate) contributes to the linear and angular velocity of the links of the manipulator.
- The velocity of the links is a function of all the joint rates that precede the link. For example, the velocity of the end-effector is a function of all the joint rates. This characteristic is referred to as **velocity propagation**.
- Therefore, the linear and angular velocity of a link $i+1$ can be described as the velocity of link $i$ plus the contribution of joint $i+1$, which precedes link $i+1$.

### [ENRICHMENT] Video: Velocity Propagation Through Robot Links — Intuitive Walkthrough
<!-- enrichment-type: video -->

Velocity propagation is a recursive algorithm: you start at the base (where everything is zero) and "propagate" velocities outward, link by link, all the way to the end-effector. Each link adds its own joint's contribution on top of everything that came before.

**Recommended resources:**

1. **Robot Academy — Velocity of a 2-Joint Planar Robot Arm** ([link](https://robotacademy.net.au/lesson/velocity-of-2-joint-planar-robot-arm/)): This lesson uses animations of a simple two-link planar robot to show how the velocity of each joint affects the end-effector velocity. The visual approach makes the recursive nature of velocity propagation immediately clear.

2. **Robot Academy — Velocity of a 3-Joint Planar Robot Arm** ([link](https://robotacademy.net.au/lesson/velocity-of-3-joint-planar-robot-arm/)): Extends the concept to three joints, showing how the propagation pattern scales.

3. **Mecharithm — Velocities in Robotics: Angular Velocities and Twists** ([link](https://mecharithm.com/learning/lesson/velocities-in-robotics-angular-velocities-twists-10)): Offers a video-based lesson covering the fundamentals of how velocities compose in serial chains.

**Why this matters**: Velocity propagation is NOT just a derivation technique — it is the actual algorithm used in real-time robot controllers to compute link velocities for dynamics calculations (Newton-Euler inverse dynamics in Chapter 6 will build directly on this).

### [ENRICHMENT] Explanation: Velocity Propagation — Building Intuition
<!-- enrichment-type: explanation -->

**The "snowball" analogy**: Imagine rolling a snowball downhill. As it moves from link to link, it picks up more "velocity" from each joint it passes through. The angular velocity snowballs (accumulates) as you move outward, and each new joint adds its own rotation on top.

For a revolute joint, the key equations are:

- **Angular velocity**: ${}^{i+1}\boldsymbol{\omega}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\;{}^{i}\boldsymbol{\omega}_i + \dot{\theta}_{i+1}\;{}^{i+1}\hat{Z}_{i+1}$

  *Translation*: "Take the angular velocity of the previous link, rotate it into the current link's frame, and add the new joint's rotation."

- **Linear velocity**: ${}^{i+1}\boldsymbol{v}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}({}^{i}\boldsymbol{v}_i + {}^{i}\boldsymbol{\omega}_i \times {}^{i}\boldsymbol{P}_{i+1})$

  *Translation*: "Take the linear velocity of the previous link, add the tangential velocity caused by the previous link's rotation acting over the lever arm to the next joint, then rotate the whole thing into the current link's frame."

**The cross product $\boldsymbol{\omega}_i \times \boldsymbol{P}_{i+1}$** is the tangential velocity due to rotation. If you have ever swung a ball on a string, the ball's velocity is $\omega \times r$ — the same physics applies here but in 3D.

### 5.6.1 Revolute Joints
<!-- source: MSE492 - Chapter5-rev2.pdf#page=13 -->

Consider each link of the mechanism as a rigid body with linear and angular velocity vectors.

**Angular velocity** of link $i+1$ described with respect to frame $\{i\}$:

$${}^{i}\boldsymbol{\omega}_{i+1} = {}^{i}\boldsymbol{\omega}_i + {}^{i}_{i+1}\boldsymbol{R}\;\dot{\theta}_{i+1}\;{}^{i+1}\hat{Z}_{i+1}$$

where:

$$\dot{\theta}_{i+1}\;{}^{i+1}\hat{Z}_{i+1} = \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_{i+1} \end{bmatrix}$$

**Described with respect to frame** $\{i+1\}$:

$${}^{i+1}_{i}\boldsymbol{R}\;{}^{i}\boldsymbol{\omega}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\left({}^{i}\boldsymbol{\omega}_i + {}^{i}_{i+1}\boldsymbol{R}\;\dot{\theta}_{i+1}\;{}^{i+1}\hat{Z}_{i+1}\right)$$

$$\boxed{{}^{i+1}\boldsymbol{\omega}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\;{}^{i}\boldsymbol{\omega}_i + \dot{\theta}_{i+1}\;{}^{i+1}\hat{Z}_{i+1}}$$

<!-- source: MSE492 - Chapter5-rev2.pdf#page=14 -->

**Linear velocity** of frame $\{i+1\}$ -- the resulting linear velocity is the same as that of the origin of frame $\{i\}$ plus the contribution made by the revolute joint:

In frame $\{i\}$:

$${}^{i}\boldsymbol{v}_{i+1} = {}^{i}\boldsymbol{v}_i + {}^{i}\boldsymbol{\omega}_i \times {}^{i}\boldsymbol{P}_{i+1}$$

**Described with respect to frame** $\{i+1\}$:

$${}^{i+1}_{i}\boldsymbol{R}\left({}^{i}\boldsymbol{v}_{i+1}\right) = {}^{i+1}_{i}\boldsymbol{R}\left({}^{i}\boldsymbol{v}_i + {}^{i}\boldsymbol{\omega}_i \times {}^{i}\boldsymbol{P}_{i+1}\right)$$

$$\boxed{{}^{i+1}\boldsymbol{v}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\left({}^{i}\boldsymbol{v}_i + {}^{i}\boldsymbol{\omega}_i \times {}^{i}\boldsymbol{P}_{i+1}\right)}$$

### 5.6.2 Prismatic Joints
<!-- source: MSE492 - Chapter5-rev2.pdf#page=15 -->

Equivalent relationships can be achieved for prismatic joints.

> **[Figure: A prismatic joint showing link $i$ and link $i+1$ connected by a sliding joint along axis $\hat{Z}_{i+1}$.]** (page 15)

**Angular velocity** of link $\{i+1\}$:

$$\boxed{{}^{i+1}\boldsymbol{\omega}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\;{}^{i}\boldsymbol{\omega}_i}$$

> **Note**: There is no contribution of the prismatic joint to the angular velocity.

**Linear velocity** of the origin of $\{i+1\}$:

$$\boxed{{}^{i+1}\boldsymbol{v}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\left({}^{i}\boldsymbol{v}_i + {}^{i}\boldsymbol{\omega}_i \times {}^{i}\boldsymbol{P}_{i+1}\right) + \dot{d}_{i+1}\;{}^{i+1}\hat{Z}_{i+1}}$$

### 5.6.3 Worked Example: Two-Link Planar Manipulator -- Velocity Propagation
<!-- source: MSE492 - Chapter5-rev2.pdf#page=16 -->

> **[Figure: A two-link planar manipulator with revolute joints. Link lengths $L_1$ and $L_2$. Joint angles $\theta_1$ and $\theta_2$.]** (page 16)

**Problem**: A two-link manipulator with revolute joints is shown. Calculate the velocity of the tip of the arm as a function of joint rates. Give the answer in two forms -- in terms of frame $\{3\}$, and also in terms of frame $\{0\}$.

**Homogeneous transforms:**

$${}^{0}_{1}\boldsymbol{T} = \begin{bmatrix} c_1 & -s_1 & 0 & 0 \\ s_1 & c_1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

$${}^{1}_{2}\boldsymbol{T} = \begin{bmatrix} c_2 & -s_2 & 0 & L_1 \\ s_2 & c_2 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

$${}^{2}_{3}\boldsymbol{T} = \begin{bmatrix} 1 & 0 & 0 & L_2 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

> **Note**: Frame $\{1\}$ is at joint 1 (zero translation from $\{0\}$), frame $\{2\}$ is at joint 2 (offset $L_1$ along $\hat{X}_1$), and frame $\{3\}$ is at the tip (offset $L_2$ along $\hat{X}_2$).

<!-- source: MSE492 - Chapter5-rev2.pdf#page=17 -->

**Step 1: Link 1 velocities**

$${}^{1}\boldsymbol{\omega}_1 = {}^{1}_{0}\boldsymbol{R}\;{}^{0}\boldsymbol{\omega}_0 + \dot{\theta}_1\;{}^{1}\hat{Z}_1 = \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{bmatrix}$$

$${}^{1}\boldsymbol{v}_1 = {}^{1}_{0}\boldsymbol{R}\left({}^{0}\boldsymbol{v}_0 + {}^{0}\boldsymbol{\omega}_0 \times {}^{0}\boldsymbol{P}_1\right) = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix}$$

> **Note**: ${}^{0}\boldsymbol{\omega}_0 = \boldsymbol{0}$ and ${}^{0}\boldsymbol{v}_0 = \boldsymbol{0}$ since the base frame is fixed. Also ${}^{0}\boldsymbol{P}_1 = \boldsymbol{0}$ since $\{1\}$ and $\{0\}$ share the same origin.

**Step 2: Link 2 velocities**

$${}^{2}\boldsymbol{\omega}_2 = {}^{2}_{1}\boldsymbol{R}\;{}^{1}\boldsymbol{\omega}_1 + \dot{\theta}_2\;{}^{2}\hat{Z}_2 = \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 + \dot{\theta}_2 \end{bmatrix}$$

$${}^{2}\boldsymbol{v}_2 = {}^{2}_{1}\boldsymbol{R}\left({}^{1}\boldsymbol{v}_1 + {}^{1}\boldsymbol{\omega}_1 \times {}^{1}\boldsymbol{P}_2\right)$$

Computing ${}^{1}\boldsymbol{\omega}_1 \times {}^{1}\boldsymbol{P}_2$:

$${}^{1}\boldsymbol{\omega}_1 \times {}^{1}\boldsymbol{P}_2 = \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 \end{bmatrix} \times \begin{bmatrix} L_1 \\ 0 \\ 0 \end{bmatrix} = \begin{bmatrix} 0 \\ L_1\dot{\theta}_1 \\ 0 \end{bmatrix}$$

$${}^{2}\boldsymbol{v}_2 = \begin{bmatrix} c_2 & s_2 & 0 \\ -s_2 & c_2 & 0 \\ 0 & 0 & 1 \end{bmatrix} \begin{bmatrix} 0 \\ L_1\dot{\theta}_1 \\ 0 \end{bmatrix} = \begin{bmatrix} L_1 s_2 \dot{\theta}_1 \\ L_1 c_2 \dot{\theta}_1 \\ 0 \end{bmatrix}$$

**Step 3: Link 3 (end-effector) velocities**

$${}^{3}\boldsymbol{\omega}_3 = {}^{3}_{2}\boldsymbol{R}\;{}^{2}\boldsymbol{\omega}_2 + \dot{\theta}_3\;{}^{3}\hat{Z}_3 = \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 + \dot{\theta}_2 \end{bmatrix}$$

> **Note**: There is no joint 3 in this two-link manipulator; frame $\{3\}$ is a tool frame. The term $\dot{\theta}_3 = 0$.

$${}^{3}\boldsymbol{v}_3 = {}^{3}_{2}\boldsymbol{R}\left({}^{2}\boldsymbol{v}_2 + {}^{2}\boldsymbol{\omega}_2 \times {}^{2}\boldsymbol{P}_3\right)$$

Computing ${}^{2}\boldsymbol{\omega}_2 \times {}^{2}\boldsymbol{P}_3$:

$${}^{2}\boldsymbol{\omega}_2 \times {}^{2}\boldsymbol{P}_3 = \begin{bmatrix} 0 \\ 0 \\ \dot{\theta}_1 + \dot{\theta}_2 \end{bmatrix} \times \begin{bmatrix} L_2 \\ 0 \\ 0 \end{bmatrix} = \begin{bmatrix} 0 \\ L_2(\dot{\theta}_1 + \dot{\theta}_2) \\ 0 \end{bmatrix}$$

$${}^{3}\boldsymbol{v}_3 = \begin{bmatrix} L_1 s_2 \dot{\theta}_1 \\ L_1 c_2 \dot{\theta}_1 + L_2(\dot{\theta}_1 + \dot{\theta}_2) \\ 0 \end{bmatrix}$$

<!-- source: MSE492 - Chapter5-rev2.pdf#page=18 -->

**Step 4: Transform to base frame $\{0\}$**

To find the velocities with respect to the non-moving base frame, we rotate them with the rotation matrix ${}^{0}_{3}\boldsymbol{R}$:

$${}^{0}_{3}\boldsymbol{R} = {}^{0}_{1}\boldsymbol{R}\;{}^{1}_{2}\boldsymbol{R}\;{}^{2}_{3}\boldsymbol{R} = \begin{bmatrix} c_{12} & -s_{12} & 0 \\ s_{12} & c_{12} & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

The rotation yields:

$$\boxed{{}^{0}\boldsymbol{v}_3 = {}^{0}_{3}\boldsymbol{R}\;{}^{3}\boldsymbol{v}_3 = \begin{bmatrix} -L_1 s_1 \dot{\theta}_1 - L_2 s_{12}(\dot{\theta}_1 + \dot{\theta}_2) \\ L_1 c_1 \dot{\theta}_1 + L_2 c_{12}(\dot{\theta}_1 + \dot{\theta}_2) \\ 0 \end{bmatrix}}$$

---

## 5.7 Jacobians and the Forward Velocity Problem

### 5.7.1 Definition and Forward Velocity Problem
<!-- source: MSE492 - Chapter5-rev2.pdf#page=19 -->

The **Forward Velocity Problem** determines the velocity (linear and angular) of the end-effector ${}^{0}\boldsymbol{V}_{e.e.}$ as a function of the joint rates $\dot{\boldsymbol{q}}$.

A **Jacobian** is a mathematical concept that describes the variations of a given set of functions in a collective manner. It provides the linear mapping between time-varying variables.

The Jacobian allows the mapping between the angular/linear velocity of the end-effector as a function of the joint rates:

$$\boxed{{}^{0}\boldsymbol{V}_{e.e.} = {}^{0}\boldsymbol{J}_{e.e.}\;\dot{\boldsymbol{q}}}$$

where:

$${}^{0}\boldsymbol{V}_{e.e.} = \begin{bmatrix} {}^{0}\boldsymbol{v}_{e.e.} \\ {}^{0}\boldsymbol{\omega}_{e.e.} \end{bmatrix}$$

> **[Figure: Block diagram showing the forward velocity problem. Input: joint rates $\dot{\boldsymbol{q}}$. Mapping: Jacobian ${}^{0}\boldsymbol{J}_{e.e.}$. Output: end-effector velocity ${}^{0}\boldsymbol{V}_{e.e.}$ consisting of linear velocity ${}^{0}\boldsymbol{v}_{e.e.}$ and angular velocity ${}^{0}\boldsymbol{\omega}_{e.e.}$. Credited to Dr. F. Firmani.]** (page 19)

### 5.7.2 Jacobian from the Two-Link Example
<!-- source: MSE492 - Chapter5-rev2.pdf#page=20 -->

In the previous example, if only the linear velocity is of interest, we can form the Jacobian matrix as:

**With respect to frame $\{0\}$** (linear velocity only):

$${}^{0}\boldsymbol{v}_3 = \begin{bmatrix} -L_1 s_1 \dot{\theta}_1 - L_2 s_{12}(\dot{\theta}_1 + \dot{\theta}_2) \\ L_1 c_1 \dot{\theta}_1 + L_2 c_{12}(\dot{\theta}_1 + \dot{\theta}_2) \end{bmatrix}_{2\times 1} = \underbrace{\begin{bmatrix} -L_1 s_1 - L_2 s_{12} & -L_2 s_{12} \\ L_1 c_1 + L_2 c_{12} & L_2 c_{12} \end{bmatrix}}_{{}^{0}\boldsymbol{J}_3 \;(2\times 2)} \underbrace{\begin{bmatrix} \dot{\theta}_1 \\ \dot{\theta}_2 \end{bmatrix}}_{\dot{\boldsymbol{q}} \;(2\times 1)}$$

**With respect to frame $\{3\}$** (linear velocity only):

$${}^{3}\boldsymbol{v}_3 = \begin{bmatrix} L_2 s_2 \dot{\theta}_1 \\ L_1 c_2 \dot{\theta}_1 + L_2(\dot{\theta}_1 + \dot{\theta}_2) \end{bmatrix}_{2\times 1} = \underbrace{\begin{bmatrix} L_2 s_2 & 0 \\ L_1 c_2 + L_2 & L_2 \end{bmatrix}}_{{}^{3}\boldsymbol{J}_3 \;(2\times 2)} \underbrace{\begin{bmatrix} \dot{\theta}_1 \\ \dot{\theta}_2 \end{bmatrix}}_{\dot{\boldsymbol{q}} \;(2\times 1)}$$

### [ENRICHMENT] Errata Note: Typo in Original Slides (Slide 20)
<!-- enrichment-type: errata -->

> **CONFIRMED TYPO IN ORIGINAL SLIDES**: On slide 20 of the original PDF (MSE492 - Chapter5-rev2.pdf, page 20), the expression for ${}^{3}\boldsymbol{v}_3$ contains $L_2 s_2$ in the (1,1) entry of the Jacobian. However, tracing through the velocity propagation derivation from the previous pages, the x-component of ${}^{3}\boldsymbol{v}_3$ should be $L_1 s_2 \dot{\theta}_1$ (not $L_2 s_2 \dot{\theta}_1$), making the correct (1,1) entry of ${}^{3}\boldsymbol{J}_3$ equal to $L_1 s_2$, not $L_2 s_2$.
>
> **Verification**: Look at the velocity propagation result on slide 17-18 (page 17), where ${}^{3}\boldsymbol{v}_3$ was computed as:
> $${}^{3}\boldsymbol{v}_3 = \begin{bmatrix} L_1 s_2 \dot{\theta}_1 \\ L_1 c_2 \dot{\theta}_1 + L_2(\dot{\theta}_1 + \dot{\theta}_2) \\ 0 \end{bmatrix}$$
>
> The first component is clearly $L_1 s_2 \dot{\theta}_1$. This was caught during the Stage 2 extraction audit. The extracted content above preserves the slide as-is, but **be aware that $L_2 s_2$ should read $L_1 s_2$ in the (1,1) entry of ${}^{3}\boldsymbol{J}_3$**.

**Including angular velocity** (with respect to frame $\{0\}$):

$$\begin{bmatrix} {}^{0}\boldsymbol{v}_3 \\ {}^{0}\omega_{z_3} \end{bmatrix} = \begin{bmatrix} -L_1 s_1 \dot{\theta}_1 - L_2 s_{12}(\dot{\theta}_1 + \dot{\theta}_2) \\ L_1 c_1 \dot{\theta}_1 + L_2 c_{12}(\dot{\theta}_1 + \dot{\theta}_2) \\ \dot{\theta}_1 + \dot{\theta}_2 \end{bmatrix}_{3\times 1} = \underbrace{\begin{bmatrix} -L_1 s_1 - L_2 s_{12} & -L_2 s_{12} \\ L_1 c_1 + L_2 c_{12} & L_2 c_{12} \\ 1 & 1 \end{bmatrix}}_{{}^{0}\boldsymbol{J}_3 \;(3\times 2)} \begin{bmatrix} \dot{\theta}_1 \\ \dot{\theta}_2 \end{bmatrix}$$

**Including angular velocity** (with respect to frame $\{3\}$):

$$\begin{bmatrix} {}^{3}\boldsymbol{v}_3 \\ {}^{3}\omega_{z_3} \end{bmatrix} = \begin{bmatrix} L_2 s_2 \dot{\theta}_1 \\ L_1 c_2 \dot{\theta}_1 + L_2(\dot{\theta}_1 + \dot{\theta}_2) \\ \dot{\theta}_1 + \dot{\theta}_2 \end{bmatrix}_{3\times 1} = \underbrace{\begin{bmatrix} L_2 s_2 & 0 \\ L_1 c_2 + L_2 & L_2 \\ 1 & 1 \end{bmatrix}}_{{}^{3}\boldsymbol{J}_3 \;(3\times 2)} \begin{bmatrix} \dot{\theta}_1 \\ \dot{\theta}_2 \end{bmatrix}$$

### 5.7.3 Two Methods for Determining the Jacobian
<!-- source: MSE492 - Chapter5-rev2.pdf#page=21 -->

The Jacobian can be determined using two methods:

1. **Joint Directions and Derivatives**
2. **Joint Directions and Cross Products**

### [ENRICHMENT] Explanation: Comparing the Two Jacobian Methods — When to Use Which
<!-- enrichment-type: explanation -->

Both methods produce the **same Jacobian** — they are mathematically equivalent. The difference is purely practical: which is easier to compute for a given problem?

| Aspect | Method 1: Derivatives | Method 2: Cross Products |
|--------|----------------------|-------------------------|
| **What you need** | Forward kinematics ${}^{0}\boldsymbol{P}_{ee}(\boldsymbol{q})$ as a closed-form expression | Homogeneous transforms ${}^{0}_{i}\boldsymbol{T}$ for each joint |
| **Linear velocity columns** | Partial derivatives $\frac{\partial {}^{0}\boldsymbol{P}_{ee}}{\partial q_i}$ | Cross products ${}^{0}\hat{Z}_i \times {}^{0}\boldsymbol{P}_{i \to ee}$ |
| **Angular velocity columns** | ${}^{0}\hat{Z}_i$ (revolute) or $\boldsymbol{0}$ (prismatic) | Same |
| **Best for** | Simple robots where the FK is easy to differentiate | Any robot, especially when you already have the DH transforms |
| **Drawback** | Differentiation can be tedious for complex FK expressions | Requires computing position vectors between joints |

**Rule of thumb**: For exam problems and simple planar robots, the derivatives method is often faster. For 6-DOF industrial robots where you already have DH parameters and transforms, the cross-product method is more systematic and less error-prone.

**Key insight**: The cross-product method has a beautiful geometric interpretation. For a revolute joint, $\hat{Z}_i \times \boldsymbol{P}_{i \to ee}$ is the tangential velocity of the end-effector due to rotation about joint $i$ — exactly what you would compute for a point on a spinning rigid body.

---

### 5.7.4 Method 1: Joint Directions and Derivatives
<!-- source: MSE492 - Chapter5-rev2.pdf#page=22 -->

The linear velocity of the end-effector is determined by summing the partial derivatives of the position vector ${}^{0}\boldsymbol{P}_{ee}$ with respect to each joint variable times their joint rate:

$${}^{0}\boldsymbol{v}_{e.e.} = \sum_{i=1}^{n} \frac{\partial\;{}^{0}\boldsymbol{P}_{ee}}{\partial q_i}\;\dot{q}_i$$

The angular velocity of the end-effector is defined by the contribution of all the revolute joints:

$${}^{0}\boldsymbol{\omega}_{e.e.} = \sum_{i=1}^{n} \dot{\theta}_i\;{}^{0}\hat{Z}_i$$

<!-- source: MSE492 - Chapter5-rev2.pdf#page=23 -->

Thus, the Jacobian can be obtained as follows:

$${}^{0}\boldsymbol{J}_{e.e.} = \begin{bmatrix} \cdots & \dfrac{\partial\;{}^{0}\boldsymbol{P}_{ee}}{\partial \theta_i} & \cdots & \dfrac{\partial\;{}^{0}\boldsymbol{P}_{ee}}{\partial d_j} & \cdots \\[10pt] \cdots & {}^{0}\hat{Z}_i & \cdots & \boldsymbol{0}_{3\times 1} & \cdots \end{bmatrix} \quad \begin{matrix} \leftarrow \text{Linear Velocity} \\[10pt] \leftarrow \text{Angular Velocity} \end{matrix}$$

$$\quad\quad\quad\quad\quad \underbrace{\quad\quad\quad\quad\quad}_{\text{Revolute Joint } i} \quad \underbrace{\quad\quad\quad\quad\quad}_{\text{Prismatic Joint } j}$$

**Key points:**
- The Jacobian is formed by sequentially adding a column that represents the corresponding joint (revolute or prismatic).
- The joint direction ${}^{0}\hat{Z}_i$ can be obtained by extracting the **third column** of the homogeneous transforms ${}^{0}_{i}\boldsymbol{T}$.
- The position vector ${}^{0}\boldsymbol{P}_{ee}$ is extracted from the **last column** of ${}^{0}_{ee}\boldsymbol{T}$.

### 5.7.5 Worked Example: Jacobian via Derivatives (Two-Link Manipulator)
<!-- source: MSE492 - Chapter5-rev2.pdf#page=24 -->

We can apply this method to the previous example.

**Jacobian structure:**

$${}^{0}\boldsymbol{J}_3 = \begin{bmatrix} \dfrac{\partial\;{}^{0}\boldsymbol{P}_3}{\partial \theta_1} & \dfrac{\partial\;{}^{0}\boldsymbol{P}_3}{\partial \theta_2} \\[10pt] {}^{0}\hat{Z}_1 & {}^{0}\hat{Z}_2 \end{bmatrix}$$

**From the homogeneous transforms:**

$${}^{0}_{1}\boldsymbol{T} = \begin{bmatrix} c_1 & -s_1 & 0 & 0 \\ s_1 & c_1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}, \quad {}^{0}_{2}\boldsymbol{T} = \begin{bmatrix} c_{12} & -s_{12} & 0 & L_1 c_1 \\ s_{12} & c_{12} & 0 & L_1 s_1 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

$${}^{2}_{3}\boldsymbol{T} = \begin{bmatrix} 1 & 0 & 0 & L_2 \\ 0 & 1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

**Compound transform:**

$${}^{0}_{3}\boldsymbol{T} = \begin{bmatrix} c_{12} & -s_{12} & 0 & L_1 c_1 + L_2 c_{12} \\ s_{12} & c_{12} & 0 & L_1 s_1 + L_2 s_{12} \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

<!-- source: MSE492 - Chapter5-rev2.pdf#page=25 -->

**Position vector of the end-effector:**

$${}^{0}\boldsymbol{P}_3 = \begin{bmatrix} L_1 c_1 + L_2 c_{12} \\ L_1 s_1 + L_2 s_{12} \\ 0 \end{bmatrix}$$

**Partial derivatives:**

$$\frac{\partial\;{}^{0}\boldsymbol{P}_3}{\partial \theta_1} = \begin{bmatrix} -L_1 s_1 - L_2 s_{12} \\ L_1 c_1 + L_2 c_{12} \\ 0 \end{bmatrix}, \quad \frac{\partial\;{}^{0}\boldsymbol{P}_3}{\partial \theta_2} = \begin{bmatrix} -L_2 s_{12} \\ L_2 c_{12} \\ 0 \end{bmatrix}$$

**Joint directions** (from the third column of ${}^{0}_{i}\boldsymbol{T}$):

$${}^{0}\hat{Z}_1 = \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}, \quad {}^{0}\hat{Z}_2 = \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix}$$

**Resulting Jacobian:**

$${}^{0}\boldsymbol{J}_3 = \begin{bmatrix} \dfrac{\partial\;{}^{0}\boldsymbol{P}_3}{\partial \theta_1} & \dfrac{\partial\;{}^{0}\boldsymbol{P}_3}{\partial \theta_2} \\[10pt] {}^{0}\hat{Z}_1 & {}^{0}\hat{Z}_2 \end{bmatrix} = \begin{bmatrix} -L_1 s_1 - L_2 s_{12} & -L_2 s_{12} \\ L_1 c_1 + L_2 c_{12} & L_2 c_{12} \\ 0 & 0 \\ 0 & 0 \\ 0 & 0 \\ 1 & 1 \end{bmatrix}$$

---

### 5.7.6 Method 2: Joint Directions and Cross Products
<!-- source: MSE492 - Chapter5-rev2.pdf#page=26 -->

**Revolute Joints**: Consider a rigid body rotating about an axis $\hat{Z}_i$ with an angular velocity $\dot{\theta}_i$. If the end-effector (ee) is a point on this rigid body, the contribution of each revolute joint to the velocity of the ee can be determined as follows:

> **[Figure: A revolute joint with axis ${}^{ref}\hat{Z}_i$ and angular velocity $\dot{\theta}_i$, showing the cross product relationship between the rotation axis and the position vector to produce linear velocity.]** (page 26)

**Angular velocity contribution:**

$${}^{ref}\boldsymbol{\omega}_i = \dot{\theta}_i\;{}^{ref}\hat{Z}_i$$

**Linear velocity contribution:**

$${}^{ref}\boldsymbol{v}_i = \dot{\theta}_i\;{}^{ref}\hat{Z}_i \times {}^{ref}\boldsymbol{P}_{i \to ee}$$

> **Note**: Frame $ref$ can be any reference frame, for example, $ref = \{0\}$.

<!-- source: MSE492 - Chapter5-rev2.pdf#page=27 -->

**Prismatic Joints**: Consider a rigid body attached to a prismatic joint sliding along axis $\hat{Z}_j$ with a velocity $\dot{d}_j$. The contribution of this joint to the angular velocity of the rigid body is none; its contribution to the linear velocity is $\dot{d}_j$ along $\hat{Z}_j$:

> **[Figure: A prismatic joint with axis ${}^{ref}\hat{Z}_j$ and sliding velocity $\dot{d}_j$.]** (page 27)

**Angular velocity contribution:**

$${}^{ref}\boldsymbol{\omega}_j = \boldsymbol{0}_{3\times 1}$$

**Linear velocity contribution:**

$${}^{ref}\boldsymbol{v}_j = \dot{d}_j\;{}^{ref}\hat{Z}_j$$

<!-- source: MSE492 - Chapter5-rev2.pdf#page=28 -->

**Jacobian via Cross Products** (with $ref = \{0\}$):

$${}^{0}\boldsymbol{J}_{e.e.} = \begin{bmatrix} \cdots & {}^{0}\hat{Z}_i \times {}^{0}\boldsymbol{P}_{i\to ee} & \cdots & {}^{0}\hat{Z}_j & \cdots \\[6pt] \cdots & {}^{0}\hat{Z}_i & \cdots & \boldsymbol{0}_{3\times 1} & \cdots \end{bmatrix} \quad \begin{matrix} \leftarrow \text{Linear Velocity} \\[6pt] \leftarrow \text{Angular Velocity} \end{matrix}$$

$$\quad\quad\quad\quad\quad \underbrace{\quad\quad\quad\quad\quad\quad\quad}_{\text{Revolute Joint } i} \quad \underbrace{\quad\quad\quad\quad\quad}_{\text{Prismatic Joint } j}$$

**Key points:**
- The Jacobian is formed by sequentially adding a column that represents the corresponding joint (revolute or prismatic).
- The joint direction ${}^{0}\hat{Z}_i$ can be obtained from ${}^{0}_{i}\boldsymbol{T}$.
- The position vector ${}^{0}\boldsymbol{P}_{i\to ee}$ can be found as:

$${}^{0}\boldsymbol{P}_{i\to ee} = {}^{0}\boldsymbol{P}_{ee} - {}^{0}\boldsymbol{P}_i$$

or equivalently:

$${}^{0}\boldsymbol{P}_{i\to ee} = {}^{0}_{i}\boldsymbol{R}\;{}^{i}\boldsymbol{P}_{ee}$$

### 5.7.7 Worked Example: Jacobian via Cross Products (Two-Link Manipulator)
<!-- source: MSE492 - Chapter5-rev2.pdf#page=29 -->

We can apply this method to the previous example.

**Jacobian structure:**

$${}^{0}\boldsymbol{J}_3 = \begin{bmatrix} {}^{0}\hat{Z}_1 \times {}^{0}\boldsymbol{P}_{1\to 3} & {}^{0}\hat{Z}_2 \times {}^{0}\boldsymbol{P}_{2\to 3} \\ {}^{0}\hat{Z}_1 & {}^{0}\hat{Z}_2 \end{bmatrix}$$

**From the transforms (previously calculated):**

$${}^{0}_{1}\boldsymbol{T} = \begin{bmatrix} c_1 & -s_1 & 0 & 0 \\ s_1 & c_1 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}, \quad {}^{0}_{2}\boldsymbol{T} = \begin{bmatrix} c_{12} & -s_{12} & 0 & L_1 c_1 \\ s_{12} & c_{12} & 0 & L_1 s_1 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

$${}^{0}_{3}\boldsymbol{T} = \begin{bmatrix} c_{12} & -s_{12} & 0 & L_1 c_1 + L_2 c_{12} \\ s_{12} & c_{12} & 0 & L_1 s_1 + L_2 s_{12} \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}$$

**Position vectors extracted from transforms:**

$${}^{0}\boldsymbol{P}_1 = \begin{bmatrix} 0 \\ 0 \\ 0 \end{bmatrix}, \quad {}^{0}\boldsymbol{P}_2 = \begin{bmatrix} L_1 c_1 \\ L_1 s_1 \\ 0 \end{bmatrix}, \quad {}^{0}\boldsymbol{P}_3 = \begin{bmatrix} L_1 c_1 + L_2 c_{12} \\ L_1 s_1 + L_2 s_{12} \\ 0 \end{bmatrix}$$

<!-- source: MSE492 - Chapter5-rev2.pdf#page=30 -->

**Position difference vectors:**

$${}^{0}\boldsymbol{P}_{1\to 3} = {}^{0}\boldsymbol{P}_3 - {}^{0}\boldsymbol{P}_1 = \begin{bmatrix} L_1 c_1 + L_2 c_{12} \\ L_1 s_1 + L_2 s_{12} \\ 0 \end{bmatrix}$$

$${}^{0}\boldsymbol{P}_{2\to 3} = {}^{0}\boldsymbol{P}_3 - {}^{0}\boldsymbol{P}_2 = \begin{bmatrix} L_1 c_1 + L_2 c_{12} - L_1 c_1 \\ L_1 s_1 + L_2 s_{12} - L_1 s_1 \\ 0 \end{bmatrix} = \begin{bmatrix} L_2 c_{12} \\ L_2 s_{12} \\ 0 \end{bmatrix}$$

**Cross products:**

$${}^{0}\hat{Z}_1 \times {}^{0}\boldsymbol{P}_{1\to 3} = \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix} \times \begin{bmatrix} L_1 c_1 + L_2 c_{12} \\ L_1 s_1 + L_2 s_{12} \\ 0 \end{bmatrix} = \begin{bmatrix} -L_1 s_1 - L_2 s_{12} \\ L_1 c_1 + L_2 c_{12} \\ 0 \end{bmatrix}$$

$${}^{0}\hat{Z}_2 \times {}^{0}\boldsymbol{P}_{2\to 3} = \begin{bmatrix} 0 \\ 0 \\ 1 \end{bmatrix} \times \begin{bmatrix} L_2 c_{12} \\ L_2 s_{12} \\ 0 \end{bmatrix} = \begin{bmatrix} -L_2 s_{12} \\ L_2 c_{12} \\ 0 \end{bmatrix}$$

<!-- source: MSE492 - Chapter5-rev2.pdf#page=31 -->

**Resulting Jacobian (Cross-Product Method):**

$${}^{0}\boldsymbol{J}_3 = \begin{bmatrix} {}^{0}\hat{Z}_1 \times {}^{0}\boldsymbol{P}_{1\to 3} & {}^{0}\hat{Z}_2 \times {}^{0}\boldsymbol{P}_{2\to 3} \\ {}^{0}\hat{Z}_1 & {}^{0}\hat{Z}_2 \end{bmatrix} = \begin{bmatrix} -L_1 s_1 - L_2 s_{12} & -L_2 s_{12} \\ L_1 c_1 + L_2 c_{12} & L_2 c_{12} \\ 0 & 0 \\ 0 & 0 \\ 0 & 0 \\ 1 & 1 \end{bmatrix}$$

> **Note**: Both methods (derivatives and cross products) produce the same Jacobian, confirming the result.

### [ENRICHMENT] Video: Angela Sodemann — Finding the Jacobian (RoboGrok)
<!-- enrichment-type: video -->

Angela Sodemann's RoboGrok robotics course includes clear, step-by-step video lectures on computing the Jacobian matrix for serial manipulators. Her teaching style breaks down the cross-product and derivative methods with explicit numerical examples.

- **Course page**: [RoboGrok University-Level Robotics 1](https://www.robogrok.com/Robotics_1.php)
- **Also available on Udemy**: [Angela Sodemann Robotics Courses](https://www.udemy.com/user/angelasodemann/)

These lectures are a good complement to the course slides because they walk through every intermediate step at a pace suitable for self-study.

---

### 5.7.8 Jacobian Remarks -- Wrist Jacobian
<!-- source: MSE492 - Chapter5-rev2.pdf#page=32 -->

Finding the Jacobian of a point at the tip of the end-effector can be tedious and difficult. Determining the singularities of this Jacobian involves computing the determinant of a $6 \times 6$ matrix.

As an alternative, since the end-effector link is a rigid body, one could determine the **Jacobian with respect to the wrist**, ${}^{0}\boldsymbol{J}_w$:

$${}^{0}\boldsymbol{V}_w = {}^{0}\boldsymbol{J}_w\;\dot{\boldsymbol{q}}$$

where:

$${}^{0}\boldsymbol{J}_w = \begin{bmatrix} A_{3\times 3} & \boldsymbol{0}_{3\times 3} \\ B_{3\times 3} & C_{3\times 3} \end{bmatrix}$$

resulting in a much simpler determinant:

$$|{}^{0}\boldsymbol{J}_w| = |A_{3\times 3}|\;|C_{3\times 3}|$$

Once ${}^{0}\boldsymbol{V}_w$ is found, then a **velocity transformation** can be employed to find the velocity with respect to the end-effector, ${}^{0}\boldsymbol{V}_{ee}$.

---

### 5.7.9 Velocity Transformation $TV_{b\to a}$ (Same Reference Frame)
<!-- source: MSE492 - Chapter5-rev2.pdf#page=33 -->

#### Velocity Transformation $TV_{b\to a}$

Assume two points "a" and "b" on the same rigid body. Let the velocity of point $a$ be known with respect to a reference frame $\{r_1\}$. What is the velocity of point $b$ with respect to frame $\{r_1\}$?

> **[Figure: Two points $a$ and $b$ on a rigid body, with a single reference frame $\{r_1\}$. Vectors ${}^{r_1}\boldsymbol{v}_a$, ${}^{r_1}\boldsymbol{\omega}$, and position vector ${}^{r_1}\boldsymbol{P}_{a\to b}$ are shown.]** (page 33)

**Known:**

$${}^{r_1}\boldsymbol{V}_a = \begin{bmatrix} {}^{r_1}\boldsymbol{v}_a \\ {}^{r_1}\boldsymbol{\omega} \end{bmatrix}$$

**Find:**

$${}^{r_1}\boldsymbol{V}_b = \begin{bmatrix} {}^{r_1}\boldsymbol{v}_b \\ {}^{r_1}\boldsymbol{\omega} \end{bmatrix}$$

**Derivation:**

$${}^{r_1}\boldsymbol{v}_b = {}^{r_1}\boldsymbol{v}_a + {}^{r_1}\boldsymbol{\omega} \times {}^{r_1}\boldsymbol{P}_{a\to b}$$

$$= {}^{r_1}\boldsymbol{v}_a + {}^{r_1}\boldsymbol{P}_{b\to a} \times {}^{r_1}\boldsymbol{\omega}$$

$$= {}^{r_1}\boldsymbol{v}_a + {}^{r_1}\hat{\boldsymbol{P}}_{b\to a}\;{}^{r_1}\boldsymbol{\omega}$$

where the **skew-symmetric matrix** ${}^{r_1}\hat{\boldsymbol{P}}_{b\to a}$ is:

$${}^{r_1}\hat{\boldsymbol{P}}_{b\to a} = \begin{bmatrix} 0 & -P_{b\to a_z} & P_{b\to a_y} \\ P_{b\to a_z} & 0 & -P_{b\to a_x} \\ -P_{b\to a_y} & P_{b\to a_x} & 0 \end{bmatrix}$$

**In matrix form:**

$$\boxed{\begin{bmatrix} {}^{r_1}\boldsymbol{v}_b \\ {}^{r_1}\boldsymbol{\omega} \end{bmatrix} = \underbrace{\begin{bmatrix} \boldsymbol{I}_{3\times 3} & {}^{r_1}\hat{\boldsymbol{P}}_{b\to a} \\ \boldsymbol{0}_{3\times 3} & \boldsymbol{I}_{3\times 3} \end{bmatrix}}_{TV_{b\to a}} \begin{bmatrix} {}^{r_1}\boldsymbol{v}_a \\ {}^{r_1}\boldsymbol{\omega} \end{bmatrix}}$$

> **Note**: The angular velocity ${}^{r_1}\boldsymbol{\omega}$ is the same for both points since they are on the same rigid body.

### 5.7.10 Velocity Transformation $TV_{ee\to w}$ -- Wrist to End-Effector
<!-- source: MSE492 - Chapter5-rev2.pdf#page=34 -->

Let ${}^{0}\boldsymbol{J}_w$ be known. For a given set of joint rates $\dot{\boldsymbol{q}}$, the velocity of the wrist can be found. The general velocity transformation can be implemented to the end-effector to find ${}^{0}\boldsymbol{V}_{ee}$.

> **[Figure: Diagram showing the wrist point $w$ and end-effector point $ee$ on a rigid body (the last link), with reference frame $\{0\}$. Vector ${}^{0}\boldsymbol{P}_{w\to ee}$ connects the wrist to the end-effector.]** (page 34)

**Known:**

$${}^{0}\boldsymbol{V}_w = \begin{bmatrix} {}^{0}\boldsymbol{v}_w \\ {}^{0}\boldsymbol{\omega} \end{bmatrix} = {}^{0}\boldsymbol{J}_w\;\dot{\boldsymbol{q}}$$

**Find:**

$${}^{0}\boldsymbol{V}_{ee} = \begin{bmatrix} {}^{0}\boldsymbol{v}_{ee} \\ {}^{0}\boldsymbol{\omega} \end{bmatrix}$$

**Derivation:**

$${}^{0}\boldsymbol{v}_{ee} = {}^{0}\boldsymbol{v}_w + {}^{0}\boldsymbol{\omega} \times {}^{0}\boldsymbol{P}_{w\to ee}$$

$$= {}^{0}\boldsymbol{v}_w + {}^{0}\boldsymbol{P}_{ee\to w} \times {}^{0}\boldsymbol{\omega}$$

$$= {}^{0}\boldsymbol{v}_w + {}^{0}\hat{\boldsymbol{P}}_{ee\to w}\;{}^{0}\boldsymbol{\omega}$$

where the skew-symmetric matrix ${}^{0}\hat{\boldsymbol{P}}_{ee\to w}$ is:

$${}^{0}\hat{\boldsymbol{P}}_{ee\to w} = \begin{bmatrix} 0 & -P_{ee\to w_z} & P_{ee\to w_y} \\ P_{ee\to w_z} & 0 & -P_{ee\to w_x} \\ -P_{ee\to w_y} & P_{ee\to w_x} & 0 \end{bmatrix}$$

**In matrix form:**

$$\boxed{\begin{bmatrix} {}^{0}\boldsymbol{v}_{ee} \\ {}^{0}\boldsymbol{\omega} \end{bmatrix} = \underbrace{\begin{bmatrix} \boldsymbol{I}_{3\times 3} & {}^{0}\hat{\boldsymbol{P}}_{ee\to w} \\ \boldsymbol{0}_{3\times 3} & \boldsymbol{I}_{3\times 3} \end{bmatrix}}_{TV_{ee\to w}} \begin{bmatrix} {}^{0}\boldsymbol{v}_w \\ {}^{0}\boldsymbol{\omega} \end{bmatrix}}$$

### 5.7.11 Wrist Jacobian Formulas (${}^{0}\boldsymbol{J}_w$)
<!-- source: MSE492 - Chapter5-rev2.pdf#page=35 -->

**Joint Directions and Derivatives:**

$${}^{0}\boldsymbol{J}_w = \begin{bmatrix} \cdots & \dfrac{\partial\;{}^{0}\boldsymbol{P}_w}{\partial \theta_i} & \cdots & \dfrac{\partial\;{}^{0}\boldsymbol{P}_w}{\partial d_j} & \cdots \\[10pt] \cdots & {}^{0}\hat{Z}_i & \cdots & \boldsymbol{0}_{3\times 1} & \cdots \end{bmatrix} \quad \begin{matrix} \leftarrow \text{Linear Velocity} \\[10pt] \leftarrow \text{Angular Velocity} \end{matrix}$$

$$\quad\quad\quad\quad\quad \underbrace{\quad\quad\quad\quad\quad}_{\text{Revolute Joint } i} \quad \underbrace{\quad\quad\quad\quad\quad}_{\text{Prismatic Joint } j}$$

**Joint Directions and Cross Products:**

$${}^{0}\boldsymbol{J}_w = \begin{bmatrix} \cdots & {}^{0}\hat{Z}_i \times {}^{0}\boldsymbol{P}_{i\to w} & \cdots & {}^{0}\hat{Z}_j & \cdots \\[6pt] \cdots & {}^{0}\hat{Z}_i & \cdots & \boldsymbol{0}_{3\times 1} & \cdots \end{bmatrix} \quad \begin{matrix} \leftarrow \text{Linear Velocity} \\[6pt] \leftarrow \text{Angular Velocity} \end{matrix}$$

$$\quad\quad\quad\quad\quad \underbrace{\quad\quad\quad\quad\quad\quad\quad}_{\text{Revolute Joint } i} \quad \underbrace{\quad\quad\quad\quad\quad}_{\text{Prismatic Joint } j}$$

### 5.7.12 Jacobian Remarks -- Full Forward Velocity via Wrist Jacobian
<!-- source: MSE492 - Chapter5-rev2.pdf#page=36 -->

#### Jacobian (${}^{0}\boldsymbol{J}_w$) Remarks

In order to evaluate the velocity of the end-effector based on a set of joint rates, two matrices were required: the Jacobian ${}^{0}\boldsymbol{J}_w$ and the velocity transformation matrix $TV_{ee\to w}$:

$$\boxed{{}^{0}\boldsymbol{V}_{ee} = TV_{ee\to w}\;{}^{0}\boldsymbol{J}_w\;\dot{\boldsymbol{q}}}$$

The evaluation of ${}^{0}\boldsymbol{J}_w$ is much easier than finding ${}^{0}\boldsymbol{J}_{ee}$. Also, for analyzing singularities, solving for the determinant is simpler:

$${}^{0}\boldsymbol{J}_w = \begin{bmatrix} A_{3\times 3} & \boldsymbol{0}_{3\times 3} \\ B_{3\times 3} & C_{3\times 3} \end{bmatrix}$$

$$|{}^{0}\boldsymbol{J}_w| = |A_{3\times 3}|\;|C_{3\times 3}|$$

The only drawback is that the joint directions require finding the homogeneous transforms ${}^{0}_{i}\boldsymbol{T}$ which is still tedious. As an alternative, let us consider a Jacobian based on a point at the wrist but oriented as one of the intermediate frames $\{3 \text{ or } 4\}$.

---

### 5.7.13 Velocity Transformation ${}^{r_2}_{r_1}TV_{b\to a}$ (Different Reference Frames)
<!-- source: MSE492 - Chapter5-rev2.pdf#page=37 -->

#### Velocity Transformation ${}^{r_2}_{r_1}TV_{b\to a}$

Assume two points "a" and "b" on the same rigid body. Let the velocity of point $a$ be known with respect to a reference frame $\{r_1\}$. What is the velocity of point $b$ with respect to frame $\{r_2\}$?

> **[Figure: Two points $a$ and $b$ on a rigid body, with two different reference frames $\{r_1\}$ and $\{r_2\}$. Vectors $\boldsymbol{v}_a$, $\boldsymbol{\omega}$, and position vector $\boldsymbol{P}_{a\to b}$ are shown.]** (page 37)

**Known:**

$${}^{r_1}\boldsymbol{V}_a = \begin{bmatrix} {}^{r_1}\boldsymbol{v}_a \\ {}^{r_1}\boldsymbol{\omega} \end{bmatrix}$$

**Find:**

$${}^{r_2}\boldsymbol{V}_b = \begin{bmatrix} {}^{r_2}\boldsymbol{v}_b \\ {}^{r_2}\boldsymbol{\omega} \end{bmatrix}$$

**Derivation:**

$${}^{r_2}\boldsymbol{v}_b = {}^{r_2}_{r_1}\boldsymbol{R}\left({}^{r_1}\boldsymbol{v}_a + {}^{r_1}\boldsymbol{\omega} \times {}^{r_1}\boldsymbol{P}_{a\to b}\right)$$

$$= {}^{r_2}_{r_1}\boldsymbol{R}\;{}^{r_1}\boldsymbol{v}_a + {}^{r_2}_{r_1}\boldsymbol{R}\;{}^{r_1}\boldsymbol{P}_{b\to a} \times {}^{r_2}_{r_1}\boldsymbol{R}\;{}^{r_1}\boldsymbol{\omega}$$

$$= {}^{r_2}_{r_1}\boldsymbol{R}\;{}^{r_1}\boldsymbol{v}_a + {}^{r_2}\hat{\boldsymbol{P}}_{b\to a}\;{}^{r_2}_{r_1}\boldsymbol{R}\;{}^{r_1}\boldsymbol{\omega}$$

$${}^{r_2}\boldsymbol{\omega} = {}^{r_2}_{r_1}\boldsymbol{R}\;{}^{r_1}\boldsymbol{\omega}$$

where the skew-symmetric matrix ${}^{r_2}\hat{\boldsymbol{P}}_{b\to a}$ is:

$${}^{r_2}\hat{\boldsymbol{P}}_{b\to a} = \begin{bmatrix} 0 & -P_{b\to a_z} & P_{b\to a_y} \\ P_{b\to a_z} & 0 & -P_{b\to a_x} \\ -P_{b\to a_y} & P_{b\to a_x} & 0 \end{bmatrix}$$

**In matrix form:**

$$\boxed{\begin{bmatrix} {}^{r_2}\boldsymbol{v}_b \\ {}^{r_2}\boldsymbol{\omega} \end{bmatrix} = \underbrace{\begin{bmatrix} {}^{r_2}_{r_1}\boldsymbol{R} & {}^{r_2}\hat{\boldsymbol{P}}_{b\to a}\;{}^{r_2}_{r_1}\boldsymbol{R} \\ \boldsymbol{0}_{3\times 3} & {}^{r_2}_{r_1}\boldsymbol{R} \end{bmatrix}}_{{}^{r_2}_{r_1}TV_{b\to a}} \begin{bmatrix} {}^{r_1}\boldsymbol{v}_a \\ {}^{r_1}\boldsymbol{\omega} \end{bmatrix}}$$

### 5.7.14 Velocity Transformation ${}^{0}_{ref}TV_{ee\to w}$ -- General Frame Change
<!-- source: MSE492 - Chapter5-rev2.pdf#page=38 -->

Let ${}^{ref}\boldsymbol{J}_w$ be known for a given set of joint rates $\dot{\boldsymbol{q}}$. The velocity of the wrist, ${}^{ref}\boldsymbol{V}_w$, can be found. The general velocity transformation can be implemented to the end-effector to find ${}^{0}\boldsymbol{V}_{ee}$.

> **[Figure: Diagram showing wrist point $w$ and end-effector point $ee$ on a rigid body, with reference frame $\{ref\}$ and base frame $\{0\}$. Vector ${}^{ref}\boldsymbol{P}_{w\to ee}$ connects wrist to end-effector.]** (page 38)

**Known:**

$${}^{ref}\boldsymbol{V}_w = \begin{bmatrix} {}^{ref}\boldsymbol{v}_w \\ {}^{ref}\boldsymbol{\omega} \end{bmatrix} = {}^{ref}\boldsymbol{J}_w\;\dot{\boldsymbol{q}}$$

**Find:**

$${}^{0}\boldsymbol{V}_{ee} = \begin{bmatrix} {}^{0}\boldsymbol{v}_{ee} \\ {}^{0}\boldsymbol{\omega} \end{bmatrix}$$

**Derivation:**

$${}^{0}\boldsymbol{v}_{ee} = {}^{0}_{ref}\boldsymbol{R}\left({}^{ref}\boldsymbol{v}_w + {}^{ref}\boldsymbol{\omega} \times {}^{ref}\boldsymbol{P}_{w\to ee}\right)$$

$$= {}^{0}_{ref}\boldsymbol{R}\;{}^{ref}\boldsymbol{v}_w + {}^{0}_{ref}\boldsymbol{R}\;{}^{ref}\boldsymbol{P}_{ee\to w} \times {}^{0}_{ref}\boldsymbol{R}\;{}^{ref}\boldsymbol{\omega}$$

$$= {}^{0}_{ref}\boldsymbol{R}\;{}^{ref}\boldsymbol{v}_w + {}^{0}\hat{\boldsymbol{P}}_{ee\to w}\;{}^{0}_{ref}\boldsymbol{R}\;{}^{ref}\boldsymbol{\omega}$$

$${}^{0}\boldsymbol{\omega} = {}^{0}_{ref}\boldsymbol{R}\;{}^{ref}\boldsymbol{\omega}$$

where the skew-symmetric matrix ${}^{0}\hat{\boldsymbol{P}}_{ee\to w}$ is:

$${}^{0}\hat{\boldsymbol{P}}_{ee\to w} = \begin{bmatrix} 0 & -P_{ee\to w_z} & P_{ee\to w_y} \\ P_{ee\to w_z} & 0 & -P_{ee\to w_x} \\ -P_{ee\to w_y} & P_{ee\to w_x} & 0 \end{bmatrix}$$

**In matrix form:**

$$\boxed{\begin{bmatrix} {}^{0}\boldsymbol{v}_{ee} \\ {}^{0}\boldsymbol{\omega} \end{bmatrix} = \underbrace{\begin{bmatrix} {}^{0}_{ref}\boldsymbol{R} & {}^{0}\hat{\boldsymbol{P}}_{ee\to w}\;{}^{0}_{ref}\boldsymbol{R} \\ \boldsymbol{0}_{3\times 3} & {}^{0}_{ref}\boldsymbol{R} \end{bmatrix}}_{{}^{0}_{ref}TV_{ee\to w}} \begin{bmatrix} {}^{ref}\boldsymbol{v}_w \\ {}^{ref}\boldsymbol{\omega} \end{bmatrix}}$$

### 5.7.15 Jacobian ${}^{ref}\boldsymbol{J}_w$ -- Cross-Product Method
<!-- source: MSE492 - Chapter5-rev2.pdf#page=39 -->

In order to determine the Jacobian based on a point on the end-effector coincident with the wrist and oriented with respect to any reference frame, we must use the **cross-product method**:

$${}^{ref}\boldsymbol{J}_w = \begin{bmatrix} \cdots & {}^{ref}\hat{Z}_i \times {}^{ref}\boldsymbol{P}_{i\to w} & \cdots & {}^{ref}\hat{Z}_j & \cdots \\[6pt] \cdots & {}^{ref}\hat{Z}_i & \cdots & \boldsymbol{0}_{3\times 1} & \cdots \end{bmatrix} \quad \begin{matrix} \leftarrow \text{Linear Velocity} \\[6pt] \leftarrow \text{Angular Velocity} \end{matrix}$$

$$\quad\quad\quad\quad\quad \underbrace{\quad\quad\quad\quad\quad\quad\quad\quad}_{\text{Revolute Joint } i} \quad \underbrace{\quad\quad\quad\quad\quad}_{\text{Prismatic Joint } j}$$

**Key points:**
- The joint direction ${}^{ref}\hat{Z}_i$ can be obtained by extracting the third column of the homogeneous transforms ${}^{ref}_{i}\boldsymbol{T}$.
- The position vector ${}^{i}\boldsymbol{P}_{i\to w}$ is extracted from the last column of ${}^{w}_{i}\boldsymbol{T}$, then:

$${}^{ref}\boldsymbol{P}_{i\to w} = {}^{ref}_{i}\boldsymbol{R}\;{}^{i}\boldsymbol{P}_{i\to w}$$

---

## 5.7.16 Inverse Velocity Problem
<!-- source: MSE492 - Chapter5-rev2.pdf#page=40 -->

In the previous sections, our goal was to find the velocity of the end-effector ${}^{0}\boldsymbol{V}_{ee}$ as a function of the joint rates $\dot{\boldsymbol{q}}$. The **inverse velocity problem** is the opposite: ${}^{0}\boldsymbol{V}_{ee}$ is known and $\dot{\boldsymbol{q}}$ is unknown.

**Step 1**: Invert the velocity transformation matrix or find the appropriate one using the general method:

$${}^{ref}\boldsymbol{V}_w = \left({}^{0}_{ref}TV_{ee\to w}\right)^{-1}\;{}^{0}\boldsymbol{V}_{ee} = {}^{ref}_{0}TV_{w\to ee}\;{}^{0}\boldsymbol{V}_{ee}$$

**Step 2**: $\dot{\boldsymbol{q}}$ is found by inverting the Jacobian matrix:

$$\boxed{\dot{\boldsymbol{q}} = \left({}^{ref}\boldsymbol{J}_w\right)^{-1}\;{}^{ref}\boldsymbol{V}_w}$$

where the inverse of the block-triangular Jacobian is:

$$\left({}^{ref}\boldsymbol{J}_w\right)^{-1} = \begin{bmatrix} A^{-1} & \boldsymbol{0}_{3\times 3} \\ -C^{-1}BA^{-1} & C^{-1} \end{bmatrix}$$

with:

$${}^{ref}\boldsymbol{J}_w = \begin{bmatrix} A_{3\times 3} & \boldsymbol{0}_{3\times 3} \\ B_{3\times 3} & C_{3\times 3} \end{bmatrix}$$

---

## 5.8 Singularities
<!-- source: MSE492 - Chapter5-rev2.pdf#page=41 -->

### Definition

Given that we have a linear transformation relating joint velocity to Cartesian velocity, a reasonable question to ask is: Is this matrix invertible? That is, is it nonsingular? If the matrix is nonsingular, then we can invert it to calculate joint rates from given Cartesian velocities:

$$\dot{\boldsymbol{q}} = \boldsymbol{J}^{-1}\;\boldsymbol{v}$$

**Singularities** occur when the Jacobian becomes singular (rank deficient). Physically, the manipulator **loses one or more degrees of freedom (DoF)**, i.e., it cannot move in some directions in the end-effector space no matter what joint rates are selected.

Most manipulators have configurations where the Jacobian becomes singular. Such locations are called **singularities of the mechanism** or singularities for short. In singular points, the danger in applying the inverse Jacobian in a robot control system is that the **inverse Jacobian blows up**! This results in joint rates approaching infinity as the singularity is approached.

### [ENRICHMENT] Video: Robot Singularities — What They Look Like on a Real Robot
<!-- enrichment-type: video -->

Singularities are not just a mathematical curiosity — they cause real problems in industrial robotics. When a robot enters or approaches a singularity during motion, the controller may command extremely high joint velocities, causing the robot to jerk, vibrate, or trigger a fault.

**Recommended resources:**

1. **Mecademic — What Are Singularities in a Six-Axis Robot Arm?** ([link](https://mecademic.com/insights/academic-tutorials/what-are-singularities-6-axis-robot-arm/)): Excellent tutorial with clear diagrams showing the three types of singularities (wrist, shoulder, elbow) with animations of what happens to a real 6-axis robot at each.

2. **RoboDK Blog — Robot Singularities: What Are They and How to Beat Them** ([link](https://robodk.com/blog/robot-singularities/)): Practical perspective from a robot simulation company, showing singularity visualization in their software and strategies for planning paths that avoid singularities.

3. **Robohub — 3 Types of Robot Singularities and How to Avoid Them** ([link](https://robohub.org/3-types-of-robot-singularities-and-how-to-avoid-them/)): Clear visual explanations of shoulder, elbow, and wrist singularities with video demonstrations.

**What to look for in the videos:**
- **Wrist singularity**: Joints 4 and 6 align (axes become collinear). The robot tries to spin joints 4 and 6 by 180 degrees instantaneously.
- **Shoulder singularity**: The wrist center passes directly above (or near) joint 1.
- **Elbow singularity**: The arm is fully extended (or fully folded), just like the $\theta_2 = 0$ case in our two-link example.

### [ENRICHMENT] Explanation: Why Singularities Matter in Practice
<!-- enrichment-type: explanation -->

The mathematical signature of a singularity is $\det(\boldsymbol{J}) = 0$, but what does this mean physically?

**1. Loss of degrees of freedom.** At a singularity, the end-effector cannot move in at least one Cartesian direction, no matter what combination of joint velocities you command. The robot is temporarily "locked" in that direction.

**2. Infinite joint velocities required.** If you try to move the end-effector in the "lost" direction near a singularity, the inverse Jacobian $\boldsymbol{J}^{-1}$ amplifies the commanded velocity enormously: $\dot{\boldsymbol{q}} = \boldsymbol{J}^{-1}\boldsymbol{v}$. As $\det(\boldsymbol{J}) \to 0$, some entries of $\boldsymbol{J}^{-1}$ go to infinity.

**3. In practice, the controller saturates.** Real robots have joint velocity limits. When the computed joint velocity exceeds these limits, the controller either (a) slows down the Cartesian velocity, (b) deviates from the planned path, or (c) triggers a protective stop. None of these outcomes is desirable in a precision manufacturing application.

**4. Two types from the factored determinant.** Our course separates singularities into:
- **Arm singularities** ($|A| = 0$): Relate to the first 3 joints (positioning). Occur at workspace boundaries (fully extended) or interior alignments.
- **Wrist singularities** ($|C| = 0$): Relate to the last 3 joints (orienting). Occur when wrist axes align.

This factorization (possible because of the block-triangular structure of the wrist Jacobian) is one of the main practical advantages of analyzing ${}^{ref}\boldsymbol{J}_w$ instead of ${}^{0}\boldsymbol{J}_{ee}$.

### 5.8.1 Worked Example: Singularity of Two-Link Manipulator
<!-- source: MSE492 - Chapter5-rev2.pdf#page=42 -->

> **[Figure: The two-link planar manipulator moving along the X axis at 1.0 m/s, showing the trajectory and the approach to a singular configuration as the arm extends.]** (page 42)

In the previous example, consider the end-effector is moving along the X axis at 1.0 m/s.

We can find the joint velocities along this trajectory using the **inverse Jacobian** (for the 2x2 linear velocity Jacobian):

$${}^{0}\boldsymbol{J}_3^{-1} = \frac{1}{L_1 L_2 s_2} \begin{bmatrix} L_2 c_{12} & L_2 s_{12} \\ -L_1 c_1 - L_2 c_{12} & -L_1 s_1 - L_2 s_{12} \end{bmatrix}$$

Then, using the inverse Jacobian equation for a velocity of 1 m/s in the X direction, we can calculate joint rates as a function of manipulator configuration:

$$\dot{\theta}_1 = \frac{c_{12}}{L_1 s_2}, \quad \dot{\theta}_2 = -\frac{c_1}{L_2 s_2} - \frac{c_{12}}{L_1 s_2}$$

**As the arm stretches out toward $\theta_2 = 0$, both joint rates go to infinity** (since $s_2 \to 0$ in the denominator).

> **Warning**: This is the classic boundary singularity -- the arm is fully extended and cannot generate velocity in the radial direction.

### 5.8.2 Singularity Conditions
<!-- source: MSE492 - Chapter5-rev2.pdf#page=43 -->

Regardless of the Jacobian ${}^{0}\boldsymbol{J}_{e.e.}$, ${}^{0}\boldsymbol{J}_w$, or ${}^{ref}\boldsymbol{J}_w$, the conditions that make the manipulator be in a singular configuration are the same. Thus, the most convenient Jacobian is ${}^{ref}\boldsymbol{J}_w$. The conditions are found by setting the determinant of the Jacobian to zero:

$$\boxed{|{}^{ref}\boldsymbol{J}_w| = |A_{3\times 3}|\;|C_{3\times 3}| = 0}$$

where:

$${}^{ref}\boldsymbol{J}_w = \begin{bmatrix} A_{3\times 3} & \boldsymbol{0}_{3\times 3} \\ B_{3\times 3} & C_{3\times 3} \end{bmatrix}$$

Notice that the determinant of ${}^{ref}\boldsymbol{J}_w$ involves two matrices:
- $A_{3\times 3}$: associated with the contribution of the **main arm** to the linear velocity
- $C_{3\times 3}$: associated with the contribution of the **spherical wrist** to the angular velocity

This factorization means singularities can be analyzed separately for the arm and wrist.

### 5.8.3 Main Arm Singularities
<!-- source: MSE492 - Chapter5-rev2.pdf#page=44 -->

This singularity occurs when $|A_{3\times 3}| = 0$. There are two types:

**Boundary singularity**: Occurs when the end-effector is on the surface of the workspace (fully stretched or folded back).

**Interior singularities**: Occur within the workspace and depend on the architecture (e.g., two or more axes lined up on a straight line, or four revolute joint axes are parallel or intersect at a common point).

> **[Figure: Two illustrations showing: (1) Boundary singularity -- arm fully extended reaching the workspace boundary; (2) Interior singularity -- joint axes aligned or collinear within the workspace. Credited to "Robot Dynamics and Control, 2004".]** (page 44)

### 5.8.4 Wrist Singularities
<!-- source: MSE492 - Chapter5-rev2.pdf#page=45 -->

This singularity occurs when $|C_{3\times 3}| = 0$.

Since:

$$C_{3\times 3} = \begin{bmatrix} {}^{ref}\hat{Z}_4 & {}^{ref}\hat{Z}_5 & {}^{ref}\hat{Z}_6 \end{bmatrix}$$

a spherical wrist is in a singular configuration whenever the vectors ${}^{ref}\hat{Z}_4$, ${}^{ref}\hat{Z}_5$, and ${}^{ref}\hat{Z}_6$ are **linearly dependent**.

> **[Figure: Illustration of wrist singularity where joint axes 4 and 6 align (become collinear). The ${}^{ref}\hat{Z}_5$ axis is shown perpendicular to the aligned axes. Credited to "Robot Dynamics and Control, 2004".]** (page 45)

> **Geometric interpretation**: When axes 4 and 6 align, rotation about either axis produces the same effect -- the wrist loses one rotational DoF. This typically occurs when $\theta_5 = 0$ or $\theta_5 = \pi$.

### [ENRICHMENT] Video: Modern Robotics — Singularities (Northwestern University)
<!-- enrichment-type: video -->

The Modern Robotics video series includes a dedicated video on singularities that provides excellent visualizations and formal treatment:

- **Video page**: [Modern Robotics 5.3 — Singularities](https://modernrobotics.northwestern.edu/nu-gm-book-resource/5-3-singularities/)

This video discusses how at a singular configuration the robot loses the ability to move in one or more directions, how the Jacobian becomes rank-deficient, and what this means for both "tall" (kinematically deficient) and "fat" (redundant) Jacobians. The treatment connects to the manipulability ellipsoid — at a singularity, the ellipsoid collapses to a lower-dimensional shape.

---

## 5.9 Static Forces in Manipulators

### 5.9.1 Force Transformation ${}^{r_2}_{r_1}TF_{b\to a}$
<!-- source: MSE492 - Chapter5-rev2.pdf#page=46 -->

Assume the force and moment about point $a$ are known with respect to a reference frame $\{r_1\}$. What is the force and moment about point $b$ with respect to frame $\{r_2\}$?

> **[Figure: Two points $a$ and $b$ on a rigid body with applied force $\boldsymbol{f}$ and moments $\boldsymbol{m}_a$ and $\boldsymbol{m}_b$, referenced from frames $\{r_1\}$ and $\{r_2\}$.]** (page 46)

**Known:**

$${}^{r_1}\boldsymbol{F}_a = \begin{bmatrix} {}^{r_1}\boldsymbol{f} \\ {}^{r_1}\boldsymbol{m}_a \end{bmatrix}$$

**Find:**

$${}^{r_2}\boldsymbol{F}_b = \begin{bmatrix} {}^{r_2}\boldsymbol{f} \\ {}^{r_2}\boldsymbol{m}_b \end{bmatrix}$$

**Derivation:**

$${}^{r_2}\boldsymbol{f} = {}^{r_2}_{r_1}\boldsymbol{R}\;{}^{r_1}\boldsymbol{f}$$

$${}^{r_2}\boldsymbol{m}_b = {}^{r_2}_{r_1}\boldsymbol{R}\left({}^{r_1}\boldsymbol{m}_a + {}^{r_1}\boldsymbol{f} \times {}^{r_1}\boldsymbol{P}_{a\to b}\right)$$

$$= {}^{r_2}_{r_1}\boldsymbol{R}\;{}^{r_1}\boldsymbol{m}_a + {}^{r_2}_{r_1}\boldsymbol{R}\;{}^{r_1}\boldsymbol{P}_{b\to a} \times {}^{r_2}_{r_1}\boldsymbol{R}\;{}^{r_1}\boldsymbol{f}$$

$$= {}^{r_2}_{r_1}\boldsymbol{R}\;{}^{r_1}\boldsymbol{m}_a + {}^{r_2}\hat{\boldsymbol{P}}_{b\to a}\;{}^{r_2}_{r_1}\boldsymbol{R}\;{}^{r_1}\boldsymbol{f}$$

where the skew-symmetric matrix ${}^{r_2}\hat{\boldsymbol{P}}_{b\to a}$ is:

$${}^{r_2}\hat{\boldsymbol{P}}_{b\to a} = \begin{bmatrix} 0 & -P_{b\to a_z} & P_{b\to a_y} \\ P_{b\to a_z} & 0 & -P_{b\to a_x} \\ -P_{b\to a_y} & P_{b\to a_x} & 0 \end{bmatrix}$$

**In matrix form:**

$$\boxed{\begin{bmatrix} {}^{r_2}\boldsymbol{f} \\ {}^{r_2}\boldsymbol{m}_b \end{bmatrix} = \underbrace{\begin{bmatrix} {}^{r_2}_{r_1}\boldsymbol{R} & \boldsymbol{0}_{3\times 3} \\ {}^{r_2}\hat{\boldsymbol{P}}_{b\to a}\;{}^{r_2}_{r_1}\boldsymbol{R} & {}^{r_2}_{r_1}\boldsymbol{R} \end{bmatrix}}_{{}^{r_2}_{r_1}TF_{b\to a}} \begin{bmatrix} {}^{r_1}\boldsymbol{f} \\ {}^{r_1}\boldsymbol{m}_a \end{bmatrix}}$$

> **Note**: Compare the force transformation matrix $TF$ with the velocity transformation matrix $TV$. The force transformation has the skew-symmetric matrix in the **lower-left** block (affecting moment), while the velocity transformation has it in the **upper-right** block (affecting linear velocity). This is a consequence of the duality between velocities and forces.

### 5.9.2 Inverse Static Force Problem
<!-- source: MSE492 - Chapter5-rev2.pdf#page=47 -->

The Inverse Static Force is solved from the equation of **conservation of power**:

$$\text{Power}_{IN} = \text{Power}_{OUT}$$

$$\boldsymbol{\tau}^\top \dot{\boldsymbol{q}} = {}^{0}\boldsymbol{F}_{ee}^\top\;{}^{0}\boldsymbol{V}_{ee}$$

Since ${}^{0}\boldsymbol{V}_{ee} = {}^{0}\boldsymbol{J}_{ee}\;\dot{\boldsymbol{q}}$:

$$\boldsymbol{\tau}^\top \dot{\boldsymbol{q}} = {}^{0}\boldsymbol{F}_{ee}^\top\;{}^{0}\boldsymbol{J}_{ee}\;\dot{\boldsymbol{q}}$$

This is true for all $\dot{\boldsymbol{q}}$, therefore:

$$\boldsymbol{\tau}^\top = {}^{0}\boldsymbol{F}_{ee}^\top\;{}^{0}\boldsymbol{J}_{ee}$$

Transposing:

$$\boxed{\boldsymbol{\tau} = {}^{0}\boldsymbol{J}_{ee}^\top\;{}^{0}\boldsymbol{F}_{ee} = {}^{0}\boldsymbol{J}_w^\top\;{}^{0}\boldsymbol{F}_w = {}^{ref}\boldsymbol{J}_w^\top\;{}^{ref}\boldsymbol{F}_w}$$

> **Key insight**: The **transpose of the Jacobian** maps end-effector forces/moments to joint torques, while the Jacobian itself maps joint velocities to end-effector velocities. This is the **duality between velocity and force** in robotics.

### [ENRICHMENT] Proof: Conservation of Power and the Force-Velocity Duality
<!-- enrichment-type: proof -->

The relationship $\boldsymbol{\tau} = \boldsymbol{J}^\top \boldsymbol{F}$ is one of the most elegant results in robotics. Here is a rigorous derivation from the principle of virtual work (conservation of power).

**Theorem**: If the Jacobian maps joint velocities to end-effector velocities ($\boldsymbol{v} = \boldsymbol{J}\dot{\boldsymbol{q}}$), then the transpose of the Jacobian maps end-effector forces to joint torques ($\boldsymbol{\tau} = \boldsymbol{J}^\top \boldsymbol{F}$).

**Proof**:

*Step 1*: In the absence of friction and inertial effects (static case), the power input at the joints must equal the power output at the end-effector by conservation of energy:

$$P_{\text{joints}} = P_{\text{end-effector}}$$

*Step 2*: Power at the joints is the dot product of joint torques and joint velocities:

$$P_{\text{joints}} = \boldsymbol{\tau}^\top \dot{\boldsymbol{q}}$$

Power at the end-effector is the dot product of the applied wrench (force/moment) and the end-effector velocity (twist):

$$P_{\text{end-effector}} = \boldsymbol{F}^\top \boldsymbol{v}$$

*Step 3*: Substitute the Jacobian relationship $\boldsymbol{v} = \boldsymbol{J}\dot{\boldsymbol{q}}$:

$$\boldsymbol{\tau}^\top \dot{\boldsymbol{q}} = \boldsymbol{F}^\top \boldsymbol{J} \dot{\boldsymbol{q}}$$

*Step 4*: Since this must hold for **all possible** joint velocities $\dot{\boldsymbol{q}}$ (including arbitrary infinitesimal virtual displacements), we can drop $\dot{\boldsymbol{q}}$ from both sides:

$$\boldsymbol{\tau}^\top = \boldsymbol{F}^\top \boldsymbol{J}$$

*Step 5*: Transpose both sides:

$$\boldsymbol{\tau} = \boldsymbol{J}^\top \boldsymbol{F} \qquad \blacksquare$$

**Physical interpretation**: The Jacobian and its transpose are two sides of the same coin. Velocity flows "forward" through $\boldsymbol{J}$ (from joints to end-effector), while force flows "backward" through $\boldsymbol{J}^\top$ (from end-effector to joints). This duality arises purely from conservation of energy and is independent of the specific robot architecture.

**Why $\boldsymbol{J}^\top$ and not $\boldsymbol{J}^{-1}$?** The transpose preserves the power relationship regardless of whether $\boldsymbol{J}$ is square or invertible. Even for redundant robots (more joints than task-space dimensions), $\boldsymbol{\tau} = \boldsymbol{J}^\top \boldsymbol{F}$ always holds.

**Reference**: [MIT OCW — Introduction to Robotics, Chapter 6: Statics](https://ocw.mit.edu/courses/2-12-introduction-to-robotics-fall-2005/5c160fb678fa75191c399a373c6ce648_chapter6.pdf) provides an extended treatment of this proof with additional examples.

### [ENRICHMENT] Proof: The Velocity and Force Transformation Matrices Are Transposes of Each Other
<!-- enrichment-type: proof -->

The slides note that $TV$ has the skew-symmetric block in the upper-right while $TF$ has it in the lower-left. This is not a coincidence — it is a direct consequence of the conservation of power.

**Claim**: $TF_{b \to a} = (TV_{b \to a})^{-\top}$ (the inverse-transpose of the velocity transformation).

**Proof sketch**:

For the same-frame case ($r_1 = r_2$), we have:

$$TV_{b\to a} = \begin{bmatrix} \boldsymbol{I} & \hat{\boldsymbol{P}}_{b\to a} \\ \boldsymbol{0} & \boldsymbol{I} \end{bmatrix}$$

The inverse of this block upper-triangular matrix is:

$$TV_{b\to a}^{-1} = \begin{bmatrix} \boldsymbol{I} & -\hat{\boldsymbol{P}}_{b\to a} \\ \boldsymbol{0} & \boldsymbol{I} \end{bmatrix}$$

Taking the transpose:

$$(TV_{b\to a}^{-1})^\top = \begin{bmatrix} \boldsymbol{I} & \boldsymbol{0} \\ -\hat{\boldsymbol{P}}_{b\to a}^\top & \boldsymbol{I} \end{bmatrix} = \begin{bmatrix} \boldsymbol{I} & \boldsymbol{0} \\ \hat{\boldsymbol{P}}_{b\to a} & \boldsymbol{I} \end{bmatrix}$$

using the property that $\hat{\boldsymbol{P}}^\top = -\hat{\boldsymbol{P}}$ for any skew-symmetric matrix. This matches the structure of $TF_{b\to a}$. The same argument extends to the cross-frame case. $\blacksquare$

This result ensures that any time you know the velocity transformation, you automatically know the force transformation (and vice versa) — simply invert and transpose.

<!-- source: MSE492 - Chapter5-rev2.pdf#page=48 -->

> *Page 48 is a blank end slide.*

---

## Key Equations Summary

### Velocity Notation
<!-- source: MSE492 - Chapter5-rev2.pdf#page=4 -->

| Equation | Description |
|----------|-------------|
| $\frac{d}{dt}{}^{B}\boldsymbol{Q} = {}^{B}\boldsymbol{V}_Q$ | Velocity of point $Q$ w.r.t. frame $\{B\}$ |
| ${}^{A}({}^{B}\boldsymbol{V}_Q) = {}^{A}_{B}\boldsymbol{R}\;{}^{B}\boldsymbol{V}_Q$ | Frame change via rotation matrix |
| $\boldsymbol{v}_C = {}^{U}\boldsymbol{V}_{C_{ORG}}$ | Velocity of frame origin |
| $\boldsymbol{\omega}_C = {}^{U}\boldsymbol{\Omega}_C$ | Angular velocity shorthand |

### General Velocity of Rigid Bodies
<!-- source: MSE492 - Chapter5-rev2.pdf#page=10 -->

| Equation | Description |
|----------|-------------|
| ${}^{A}\boldsymbol{V}_Q = {}^{A}\boldsymbol{V}_{B_{ORG}} + {}^{A}_{B}\boldsymbol{R}\;{}^{B}\boldsymbol{V}_Q + {}^{A}\boldsymbol{\Omega}_B \times {}^{A}_{B}\boldsymbol{R}\;{}^{B}\boldsymbol{Q}$ | General velocity equation |

### Velocity Propagation -- Revolute Joints
<!-- source: MSE492 - Chapter5-rev2.pdf#page=13 -->

| Equation | Description |
|----------|-------------|
| ${}^{i+1}\boldsymbol{\omega}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\;{}^{i}\boldsymbol{\omega}_i + \dot{\theta}_{i+1}\;{}^{i+1}\hat{Z}_{i+1}$ | Angular velocity propagation (revolute) |
| ${}^{i+1}\boldsymbol{v}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}({}^{i}\boldsymbol{v}_i + {}^{i}\boldsymbol{\omega}_i \times {}^{i}\boldsymbol{P}_{i+1})$ | Linear velocity propagation (revolute) |

### Velocity Propagation -- Prismatic Joints
<!-- source: MSE492 - Chapter5-rev2.pdf#page=15 -->

| Equation | Description |
|----------|-------------|
| ${}^{i+1}\boldsymbol{\omega}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}\;{}^{i}\boldsymbol{\omega}_i$ | Angular velocity propagation (prismatic) |
| ${}^{i+1}\boldsymbol{v}_{i+1} = {}^{i+1}_{i}\boldsymbol{R}({}^{i}\boldsymbol{v}_i + {}^{i}\boldsymbol{\omega}_i \times {}^{i}\boldsymbol{P}_{i+1}) + \dot{d}_{i+1}\;{}^{i+1}\hat{Z}_{i+1}$ | Linear velocity propagation (prismatic) |

### Jacobian -- Forward Velocity
<!-- source: MSE492 - Chapter5-rev2.pdf#page=19 -->

| Equation | Description |
|----------|-------------|
| ${}^{0}\boldsymbol{V}_{e.e.} = {}^{0}\boldsymbol{J}_{e.e.}\;\dot{\boldsymbol{q}}$ | Forward velocity problem |

### Jacobian -- Derivatives Method
<!-- source: MSE492 - Chapter5-rev2.pdf#page=22 -->

| Equation | Description |
|----------|-------------|
| ${}^{0}\boldsymbol{v}_{e.e.} = \sum_{i=1}^{n} \frac{\partial\;{}^{0}\boldsymbol{P}_{ee}}{\partial q_i}\;\dot{q}_i$ | Linear velocity via partial derivatives |
| ${}^{0}\boldsymbol{\omega}_{e.e.} = \sum_{i=1}^{n} \dot{\theta}_i\;{}^{0}\hat{Z}_i$ | Angular velocity via joint directions |

### Jacobian -- Cross-Product Method
<!-- source: MSE492 - Chapter5-rev2.pdf#page=26 -->

| Column Type | Linear Velocity | Angular Velocity |
|-------------|----------------|-----------------|
| Revolute joint $i$ | ${}^{0}\hat{Z}_i \times {}^{0}\boldsymbol{P}_{i\to ee}$ | ${}^{0}\hat{Z}_i$ |
| Prismatic joint $j$ | ${}^{0}\hat{Z}_j$ | $\boldsymbol{0}_{3\times 1}$ |

### Velocity Transformation Matrices
<!-- source: MSE492 - Chapter5-rev2.pdf#page=33 -->

| Equation | Description |
|----------|-------------|
| $TV_{b\to a} = \begin{bmatrix} \boldsymbol{I}_{3\times 3} & \hat{\boldsymbol{P}}_{b\to a} \\ \boldsymbol{0}_{3\times 3} & \boldsymbol{I}_{3\times 3} \end{bmatrix}$ | Same-frame velocity transformation |
| ${}^{r_2}_{r_1}TV_{b\to a} = \begin{bmatrix} {}^{r_2}_{r_1}\boldsymbol{R} & {}^{r_2}\hat{\boldsymbol{P}}_{b\to a}\;{}^{r_2}_{r_1}\boldsymbol{R} \\ \boldsymbol{0}_{3\times 3} & {}^{r_2}_{r_1}\boldsymbol{R} \end{bmatrix}$ | Cross-frame velocity transformation |

### Wrist Jacobian and Singularities
<!-- source: MSE492 - Chapter5-rev2.pdf#page=32 -->

| Equation | Description |
|----------|-------------|
| ${}^{0}\boldsymbol{V}_{ee} = TV_{ee\to w}\;{}^{0}\boldsymbol{J}_w\;\dot{\boldsymbol{q}}$ | End-effector velocity via wrist Jacobian |
| $\|{}^{ref}\boldsymbol{J}_w\| = \|A_{3\times 3}\|\;\|C_{3\times 3}\| = 0$ | Singularity condition |

### Inverse Velocity and Static Forces
<!-- source: MSE492 - Chapter5-rev2.pdf#page=40 -->

| Equation | Description |
|----------|-------------|
| $\dot{\boldsymbol{q}} = ({}^{ref}\boldsymbol{J}_w)^{-1}\;{}^{ref}\boldsymbol{V}_w$ | Inverse velocity problem |
| $\boldsymbol{\tau} = {}^{0}\boldsymbol{J}_{ee}^\top\;{}^{0}\boldsymbol{F}_{ee}$ | Inverse static force problem |

### Force Transformation Matrix
<!-- source: MSE492 - Chapter5-rev2.pdf#page=46 -->

| Equation | Description |
|----------|-------------|
| ${}^{r_2}_{r_1}TF_{b\to a} = \begin{bmatrix} {}^{r_2}_{r_1}\boldsymbol{R} & \boldsymbol{0}_{3\times 3} \\ {}^{r_2}\hat{\boldsymbol{P}}_{b\to a}\;{}^{r_2}_{r_1}\boldsymbol{R} & {}^{r_2}_{r_1}\boldsymbol{R} \end{bmatrix}$ | Force transformation between frames |

---

### [ENRICHMENT] Bonus Concept: The Manipulability Ellipsoid
<!-- enrichment-type: explanation -->

The Jacobian tells you more than just instantaneous velocity mapping — it also reveals how "well" the robot can move in different directions at a given configuration. This is captured by the **manipulability ellipsoid**.

**Construction**: Consider the set of all joint velocities with unit norm: $\|\dot{\boldsymbol{q}}\| = 1$ (a unit hypersphere in joint space). The Jacobian maps this sphere into an **ellipsoid** in task space:

$$\boldsymbol{v} = \boldsymbol{J}\dot{\boldsymbol{q}}, \quad \|\dot{\boldsymbol{q}}\| = 1$$

The resulting set of end-effector velocities $\boldsymbol{v}$ forms an ellipsoid whose principal axes are determined by the **singular values** of $\boldsymbol{J}$.

**What the ellipsoid tells you**:
- **Long axes**: Directions where the end-effector can move quickly (high manipulability).
- **Short axes**: Directions where the end-effector moves slowly (low manipulability).
- **At a singularity**: The ellipsoid collapses — one or more axes shrink to zero length, meaning the end-effector cannot move in those directions at all.

**Manipulability measures**:
1. **Yoshikawa's manipulability index**: $w = \sqrt{\det(\boldsymbol{J}\boldsymbol{J}^\top)}$. This equals the product of all singular values (proportional to the "volume" of the ellipsoid). At a singularity, $w = 0$.
2. **Condition number**: $\kappa = \sigma_{\max}/\sigma_{\min}$. A condition number of 1 means the ellipsoid is a sphere (equally easy to move in all directions — "isotropic"). As the condition number grows, the robot becomes increasingly anisotropic.

**Practical use**: Robot path planners often try to keep the manipulability index above a threshold and avoid configurations where the condition number becomes large. This is especially important in force-controlled tasks (e.g., polishing, assembly) where the robot needs good control authority in all directions.

**Force ellipsoid**: There is a dual concept — if you apply unit joint torques, the resulting end-effector forces form an ellipsoid governed by $\boldsymbol{J}^{-\top}$. The force ellipsoid is "inverted" relative to the velocity ellipsoid: directions where the robot moves fast correspond to directions where it can apply little force, and vice versa.

**Resources**:
- [Modern Robotics 5.4 — Manipulability](https://modernrobotics.northwestern.edu/nu-gm-book-resource/5-4-manipulability/): Video lecture on the manipulability and force ellipsoids.
- [Robot Academy — Velocity Ellipsoid in 3D and Manipulability](https://robotacademy.net.au/lesson/velocity-ellipsoid-in-3d-and-manipulability/): Interactive lesson with MATLAB demonstrations showing how the ellipsoid changes with robot configuration.
- [Wolfram Demonstrations — Manipulability Ellipsoid of a Robot Arm](https://demonstrations.wolfram.com/ManipulabilityEllipsoidOfARobotArm/): Interactive applet where you can drag joint angles and see the ellipsoid change in real time.
- [Wikipedia — Manipulability Ellipsoid](https://en.wikipedia.org/wiki/Manipulability_ellipsoid): Concise mathematical reference.
