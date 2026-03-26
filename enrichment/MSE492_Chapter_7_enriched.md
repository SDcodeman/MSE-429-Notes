# Chapter 7: Trajectory Generation
<!-- source: MSE492 - Chapter7.pdf#page=1 -->

---

## Overview
<!-- source: MSE492 - Chapter7.pdf#page=2 -->

This chapter covers the following topics:

- Types of Trajectory Generation
- Definition of Trajectory Generation
- Types of Motion: Point to Point and Continuous Path
- Point to Point
  - Cubic, Quintic, and Trapezoidal Schemes
- Continuous Path
  - Via Point and Cartesian

### [ENRICHMENT] Video: Trajectory Generation Overview -- Modern Robotics (Kevin Lynch, Northwestern)
<!-- enrichment-type: video -->

The Modern Robotics video series by Kevin Lynch at Northwestern University provides an excellent parallel treatment of trajectory generation. The Chapter 9 videos cover the same core topics as this chapter (point-to-point trajectories, polynomial time scaling, trapezoidal profiles, via-point trajectories) but from a slightly different mathematical perspective using time-scaling functions.

**Recommended videos:**

- **Point-to-Point Trajectories (Part 1 of 2)** -- Introduces paths, trajectories, and time scaling; covers straight-line and screw-motion paths: [https://youtu.be/1JRMqfEm79c](https://youtu.be/1JRMqfEm79c)
- **Point-to-Point Trajectories (Part 2 of 2)** -- Covers cubic, quintic, and trapezoidal time-scaling methods for point-to-point motion: [https://youtu.be/0ZqeBEa_MWo](https://youtu.be/0ZqeBEa_MWo)
- **Polynomial Via Point Trajectories** -- Cubic polynomial interpolation through a sequence of timed via points: [https://youtu.be/sWPpq9-5YOc](https://youtu.be/sWPpq9-5YOc)

Full Chapter 9 playlist: [https://www.youtube.com/playlist?list=PLggLP4f-rq00wo1z_Or2rRPAt1pStwmlY](https://www.youtube.com/playlist?list=PLggLP4f-rq00wo1z_Or2rRPAt1pStwmlY)

**Why watch this**: Lynch uses the concept of a "time scaling" $s(t)$ that maps $[0, T] \to [0, 1]$, then parameterizes the path as $\theta(s)$. This separation of path shape from timing is a powerful abstraction that complements Craig's direct polynomial approach.

### [ENRICHMENT] Reference: Textbook and Supplementary Sources
<!-- enrichment-type: reference -->

The primary textbook for this course is:

- **Craig, J.J.** *Introduction to Robotics: Mechanics and Control*, 4th Edition, Pearson. Chapter 7 covers trajectory generation and is the direct source for the lecture material in this chapter.

Additional references that cover the same topics with useful alternative presentations:

- **Lynch, K.M. and Park, F.C.** *Modern Robotics: Mechanics, Planning, and Control*, Cambridge University Press, 2017. Chapter 9: Trajectory Generation. Freely available at [https://hades.mech.northwestern.edu/images/2/2e/MR-largefont-v2.pdf](https://hades.mech.northwestern.edu/images/2/2e/MR-largefont-v2.pdf)
- **Clemson University Open Textbook** on robotics trajectory generation: [https://opentextbooks.clemson.edu/wangrobotics/chapter/trajectory-generation/](https://opentextbooks.clemson.edu/wangrobotics/chapter/trajectory-generation/)
- **Stanford CS223A Handout 6** -- Trajectory Generation: [https://see.stanford.edu/materials/aiircs223a/handout6_Trajectory.pdf](https://see.stanford.edu/materials/aiircs223a/handout6_Trajectory.pdf)

---

## 7.1 Types of Path Generation
<!-- source: MSE492 - Chapter7.pdf#page=3 -->

### Definitions

**Online Programming**: The task of the robot is programmed online using a teach pendant. Several points (configurations of the manipulator) are defined and saved. Then the robot is asked to move sequentially through all the points.

<!-- source: MSE492 - Chapter7.pdf#page=4 -->
**Off-line Programming**: Software is used to generate the codes that provide the trajectory of the task. Displacements are input as codes. Each manufacturer of robot hardware uses their own software.

| Robot Brand | Language Name |
|---|---|
| ABB | RAPID |
| Comau | PDL2 |
| Fanuc | Karel |
| Kawasaki | AS |
| Kuka | KRL |
| Staubli | VAL3 |
| Yaskawa | Inform |

Other languages such as C, Java, Python are also commonly used.

<!-- source: MSE492 - Chapter7.pdf#page=5 -->
**Sensor-based Programming**: This can be accomplished by hand guiding the manipulator through space and the sensors record each position. The robot will eventually replicate the motion. Autonomous robots accomplish tasks in hostile environments by making decisions depending on the readings captured by sensors.

### Diagrams

<!-- source: MSE492 - Chapter7.pdf#page=3 -->
**Teach Pendant (Ch7-3)**: Photo of a robot teach pendant device used for online programming.

<!-- source: MSE492 - Chapter7.pdf#page=5 -->
**Hand Guiding (Ch7-5)**: Photo showing sensor-based programming via hand-guided manipulation of a robot arm.

---

## 7.2 Trajectory Generation
<!-- source: MSE492 - Chapter7.pdf#page=7 -->

### Definitions

**Trajectory**: A trajectory describes the desired motion of the manipulator. This is position, velocity, and acceleration of each degree of freedom. The basic problem of trajectory generation is how to move the manipulator from an initial to a final position and orientation.

### Diagrams

<!-- source: MSE492 - Chapter7.pdf#page=7 -->
**Manipulator Initial and Final Configurations (Ch7-7)**: Two side-by-side drawings of a multi-link robot arm. Left: initial configuration. Right: final configuration. Shows the arm in two distinct postures, illustrating the start and end of a trajectory (from Craig 2003).

### [ENRICHMENT] Alternative Explanation: Path vs. Trajectory
<!-- enrichment-type: explanation -->

Students often confuse "path" and "trajectory." The distinction is important:

- A **path** is a purely geometric description -- the set of configurations the robot passes through, with no notion of timing. Think of it as a curve in joint space (or task space).
- A **trajectory** is a path combined with a time law -- it specifies *where* the robot should be and *when* it should be there, along with velocities and accelerations at each instant.

Mathematically: a path is $\theta(s)$ where $s \in [0, 1]$ is a path parameter, while a trajectory is $\theta(t)$ where $t$ is time. A trajectory is created by choosing a time-scaling function $s(t)$ and composing: $\theta(t) = \theta(s(t))$.

This distinction explains why polynomial schemes are so useful -- they provide the time-scaling function that converts a geometric path into a dynamically feasible trajectory.

**Reference**: Lynch & Park, *Modern Robotics*, Section 9.1 discusses this distinction in detail.

---

## 7.3 Mathematical Schemes
<!-- source: MSE492 - Chapter7.pdf#page=8 -->

### Definitions

**Mathematical Scheme**: A mathematical function (commonly a polynomial) used to establish the time history of a change in position and orientation of the manipulator.

### Theorems & Properties

<!-- source: MSE492 - Chapter7.pdf#page=8 -->
**Smoothness Requirement**: In order to have smooth motion, the second time derivative of the scheme function (acceleration) must be continuous. Rough jerky motions tend to wear out the device.

**Per-Joint Application**: The trajectory scheme is applied for each joint individually. For joint $k$:

$$\theta_k(t) = f(t), \qquad \dot{\theta}_k(t) = f'(t), \qquad \ddot{\theta}_k(t) = f''(t)$$

### Key Equations

<!-- source: MSE492 - Chapter7.pdf#page=8 -->
1. Position: $\theta(t) = f(t)$
2. Velocity: $\dot{\theta}(t) = f'(t)$
3. Acceleration: $\ddot{\theta}(t) = f''(t)$

### [ENRICHMENT] Alternative Explanation: Why Polynomials? And How Many Degrees Do We Need?
<!-- enrichment-type: explanation -->

**Why polynomials?** Polynomials are the natural choice for trajectory generation because:

1. **They are infinitely differentiable** -- you can always compute velocity, acceleration, jerk, etc.
2. **Their coefficients can be solved from boundary conditions** using simple linear algebra (a system of linear equations).
3. **They are computationally cheap** to evaluate in real-time on a robot controller.

**How to choose the polynomial degree:** The degree of the polynomial is determined by the number of boundary conditions you need to satisfy:

| Polynomial Degree | # Coefficients | Constraints You Can Specify | Continuity Guaranteed |
|---|---|---|---|
| Cubic (3rd order) | 4 | Position and velocity at start and end | $C^1$ (velocity continuous) |
| Quintic (5th order) | 6 | Position, velocity, and acceleration at start and end | $C^2$ (acceleration continuous) |
| Septic (7th order) | 8 | Position, velocity, acceleration, and jerk at start and end | $C^3$ (jerk continuous) |

The general rule: an $n$-th degree polynomial has $n+1$ coefficients, so it can satisfy $n+1$ boundary conditions. Each additional pair of boundary conditions (one at start, one at end) requires increasing the polynomial degree by 2.

**Reference**: Craig, *Introduction to Robotics*, Chapter 7; also see Columbia University trajectory planning notes: [https://www.cs.columbia.edu/~allen/F15/NOTES/trajectory.pdf](https://www.cs.columbia.edu/~allen/F15/NOTES/trajectory.pdf)

---

## 7.4 Types of Motion
<!-- source: MSE492 - Chapter7.pdf#page=9 -->

### Definitions

**Point-to-Point (PTP) Motion**: This trajectory is based on the joint variables. Each joint moves independently from each other, therefore the resulting end-effector path is not controlled.

**Continuous Path (CP) Motion**: The goal is to move the end-effector linearly along a particular path. Joints have to work together to accomplish the desired path.

### Diagrams

<!-- source: MSE492 - Chapter7.pdf#page=9 -->
**Kuka Motion Types (Ch7-9)**: Two side-by-side photos of a Kuka robot arm. Left image: PTP motion -- the tool centre point (TCP) follows a curved, uncontrolled path from $P_1$ to $P_2$ (dashed curve). Right image: CP motion -- the TCP follows a straight line from $P_1$ to $P_2$.

---

## 7.5 Point-to-Point Motion
<!-- source: MSE492 - Chapter7.pdf#page=10 -->

### Definitions

**Point-to-Point Motion**: In PTP motion, each joint moves independently from each other; consequently the path followed is a function of the joint displacements. Since the desired path is usually established in terms of the end-effector space variables, the inverse kinematics is applied to describe the path in terms of the joint variables.

### Theorems & Properties

<!-- source: MSE492 - Chapter7.pdf#page=10 -->
**Equal-Time Constraint**: The time required to move from point $P_1$ to point $P_2$ must be the same for each joint. For example, for a 2-revolute jointed robot, let $P_1 = [30 \;\; 45]^\mathsf{T}$ and $P_2 = [70 \;\; 25]^\mathsf{T}$, thus the change of displacement between postures is $\Delta P = [40 \;\; {-20}]^\mathsf{T}$ implying that joint 1 has to move twice as fast as joint 2.

### Diagrams

<!-- source: MSE492 - Chapter7.pdf#page=10 -->
**2R Robot Workspace (Ch7-10)**: A diagram showing a 2-revolute jointed robot within its circular workspace. Points $P_1$ and $P_2$ are marked, connected by a curved path (the end-effector trajectory resulting from independent joint motion). The base is hatched at the origin, and concentric circles represent the workspace boundary.

### [ENRICHMENT] Alternative Explanation: Why PTP Motion Produces a Curved End-Effector Path
<!-- enrichment-type: explanation -->

A common source of confusion is *why* the end-effector follows a curved path during PTP motion, even though each joint follows a smooth trajectory.

The key insight is that **forward kinematics is a nonlinear mapping**. Even if $\theta_1(t)$ and $\theta_2(t)$ each vary smoothly and linearly in time, the end-effector position:

$$x(t) = l_1 \cos\theta_1(t) + l_2 \cos(\theta_1(t) + \theta_2(t))$$
$$y(t) = l_1 \sin\theta_1(t) + l_2 \sin(\theta_1(t) + \theta_2(t))$$

traces a curve in Cartesian space because the $\sin$ and $\cos$ functions are nonlinear. The only way to force a straight-line end-effector path is to plan the trajectory in Cartesian space (CP motion) and solve the inverse kinematics at each time step -- which is exactly what Sections 7.10--7.13 address.

---

## 7.6 Cubic Polynomial Scheme (PTP)
<!-- source: MSE492 - Chapter7.pdf#page=11 -->

### Definitions

**Cubic Polynomial Scheme**: The simplest mathematical scheme. The goal is to establish the history of change in displacement, velocity, and acceleration of a joint during a specific period of time using a cubic polynomial.

### Derivations

<!-- source: MSE492 - Chapter7.pdf#page=11 -->
**Step 1 -- Define the cubic polynomial** for joint $k$:

$$q_k(t) = a_0 + a_1 t + a_2 t^2 + a_3 t^3 \quad \text{(Eq. 1)}$$

where $q$ is the type of joint ($\theta$ for revolute and $d$ for prismatic), $k$ is the joint number, $a_i$ are coefficients (to be determined), and $t$ varies from initial time $t_0$ to final time $t_f$.

**Step 2 -- Take derivatives** to get velocity and acceleration:

$$\dot{q}_k(t) = a_1 + 2a_2 t + 3a_3 t^2 \quad \text{(Eq. 2)}$$

$$\ddot{q}_k(t) = 2a_2 + 6a_3 t \quad \text{(Eq. 3)}$$

<!-- source: MSE492 - Chapter7.pdf#page=12 -->
**Step 3 -- Establish boundary conditions.** For a cubic polynomial with four coefficients, four constraints can be satisfied. Two constraints define the initial and final positions:

$$q_k(t_0) = q_{k_0} \quad \text{(Eq. 4)}$$

$$q_k(t_f) = q_{k_f} \quad \text{(Eq. 5)}$$

The other two constraints specify the velocity (e.g., start and stop from rest):

$$\dot{q}_k(t_0) = 0 \quad \text{(Eq. 6)}$$

$$\dot{q}_k(t_f) = 0 \quad \text{(Eq. 7)}$$

<!-- source: MSE492 - Chapter7.pdf#page=13 -->
**Step 4 -- Solve for coefficients** by combining Eqs. (4-7) with Eqs. (1-2). For the case with zero initial and final velocities (starting from $t_0 = 0$):

$$a_0 = q_{k_0}$$

$$a_1 = 0$$

$$a_2 = \frac{3}{t_f^2}\left(q_{k_f} - q_{k_0}\right) \quad \text{(Eq. 8)}$$

$$a_3 = -\frac{2}{t_f^3}\left(q_{k_f} - q_{k_0}\right)$$

**Step 5 -- Generic case** with $\dot{q}_k(t_0) = \dot{q}_{k_0}$ and $\dot{q}_k(t_f) = \dot{q}_{k_f}$:

$$a_0 = q_{k_0}$$

$$a_1 = \dot{q}_{k_0}$$

$$a_2 = \frac{3}{t_f^2}\left(q_{k_f} - q_{k_0}\right) - \frac{2}{t_f}\dot{q}_{k_0} - \frac{1}{t_f}\dot{q}_{k_f} \quad \text{(Eq. 9)}$$

$$a_3 = -\frac{2}{t_f^3}\left(q_{k_f} - q_{k_0}\right) + \frac{1}{t_f^2}\left(\dot{q}_{k_f} + \dot{q}_{k_0}\right)$$

### Key Equations

<!-- source: MSE492 - Chapter7.pdf#page=11 -->
1. **Cubic position**: $q_k(t) = a_0 + a_1 t + a_2 t^2 + a_3 t^3$ (Eq. 1)
2. **Cubic velocity**: $\dot{q}_k(t) = a_1 + 2a_2 t + 3a_3 t^2$ (Eq. 2)
3. **Cubic acceleration**: $\ddot{q}_k(t) = 2a_2 + 6a_3 t$ (Eq. 3)

<!-- source: MSE492 - Chapter7.pdf#page=13 -->
4. **Coefficients (zero vel.)**: $a_0 = q_{k_0},\; a_1 = 0,\; a_2 = \frac{3}{t_f^2}(q_{k_f} - q_{k_0}),\; a_3 = -\frac{2}{t_f^3}(q_{k_f} - q_{k_0})$ (Eq. 8)
5. **Coefficients (generic)**: $a_0 = q_{k_0},\; a_1 = \dot{q}_{k_0},\; a_2 = \frac{3}{t_f^2}(q_{k_f} - q_{k_0}) - \frac{2}{t_f}\dot{q}_{k_0} - \frac{1}{t_f}\dot{q}_{k_f},\; a_3 = -\frac{2}{t_f^3}(q_{k_f} - q_{k_0}) + \frac{1}{t_f^2}(\dot{q}_{k_f} + \dot{q}_{k_0})$ (Eq. 9)

### Worked Examples

<!-- source: MSE492 - Chapter7.pdf#page=14 -->
**Example: Cubic Polynomial PTP Trajectory (Ch7-14 to Ch7-15)**

**Problem**: A two-revolute jointed manipulator starts from rest and stops at the end of the trajectory. Initial joint angles $\boldsymbol{\theta}_0 = [10 \;\; 25]^\mathsf{T}$ deg, final joint angles $\boldsymbol{\theta}_f = [75 \;\; 60]^\mathsf{T}$ deg. Duration is 5 sec. Determine the trajectory.

**Solution**: Using Eq. 8 with zero initial and final velocities, $t_f = 5$ s:

For Joint 1: $q_{k_0} = 10°$, $q_{k_f} = 75°$

$$a_0 = 10, \quad a_1 = 0, \quad a_2 = \frac{3}{25}(65) = 7.8, \quad a_3 = -\frac{2}{125}(65) = -1.04$$

For Joint 2: $q_{k_0} = 25°$, $q_{k_f} = 60°$

$$a_0 = 25, \quad a_1 = 0, \quad a_2 = \frac{3}{25}(35) = 4.2, \quad a_3 = -\frac{2}{125}(35) = -0.56$$

**Result**: The displacement profiles are smooth S-shaped curves. Velocity profiles are bell-shaped (parabolic), starting and ending at zero. However, the **acceleration profile is discontinuous at the beginning and end** -- joints would require infinite jerks.

### Diagrams

<!-- source: MSE492 - Chapter7.pdf#page=14 -->
**Robot Configurations Plot (Ch7-14)**: X-Y plot showing multiple configurations of a 2R manipulator sweeping from initial to final position. Base at origin, x0 and y0 axes labeled. Arm shown in approximately 10 intermediate postures fanning out across the workspace.

<!-- source: MSE492 - Chapter7.pdf#page=15 -->
**Cubic PTP Profiles (Ch7-15)**: Three side-by-side plots:
- **Time vs Displacement**: Both joints trace smooth S-curves. Joint 1 goes from 10 to 75 deg (blue), Joint 2 from 25 to 60 deg (orange).
- **Time vs Velocity**: Bell-shaped curves peaking at $t = 2.5$ s. Joint 1 peak ~18 deg/s, Joint 2 peak ~10 deg/s.
- **Time vs Acceleration**: Linear profiles. Joint 1 starts at ~15.6 deg/s^2 and drops to ~-15.6 deg/s^2. Joint 2 similar but smaller magnitude. Discontinuous jumps at $t = 0$ and $t = 5$ s.

### [ENRICHMENT] Proof: Cubic Polynomial Coefficient Derivation (Matrix Form)
<!-- enrichment-type: proof -->

The slides present the coefficient solutions (Eqs. 8 and 9) directly. Here is the full derivation showing how these are obtained by solving a linear system.

**Setup**: Given the generic cubic polynomial and its derivative:

$$q(t) = a_0 + a_1 t + a_2 t^2 + a_3 t^3$$
$$\dot{q}(t) = a_1 + 2a_2 t + 3a_3 t^2$$

with boundary conditions at $t_0 = 0$ and $t = t_f$:

$$q(0) = q_0, \quad q(t_f) = q_f, \quad \dot{q}(0) = \dot{q}_0, \quad \dot{q}(t_f) = \dot{q}_f$$

**Step 1**: Substitute the boundary conditions into the polynomial and its derivative:

$$q(0) = a_0 = q_0$$
$$\dot{q}(0) = a_1 = \dot{q}_0$$
$$q(t_f) = a_0 + a_1 t_f + a_2 t_f^2 + a_3 t_f^3 = q_f$$
$$\dot{q}(t_f) = a_1 + 2a_2 t_f + 3a_3 t_f^2 = \dot{q}_f$$

**Step 2**: Write in matrix form $\mathbf{M}\mathbf{a} = \mathbf{b}$:

$$\begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 \\ 1 & t_f & t_f^2 & t_f^3 \\ 0 & 1 & 2t_f & 3t_f^2 \end{bmatrix} \begin{bmatrix} a_0 \\ a_1 \\ a_2 \\ a_3 \end{bmatrix} = \begin{bmatrix} q_0 \\ \dot{q}_0 \\ q_f \\ \dot{q}_f \end{bmatrix}$$

**Step 3**: From rows 1 and 2, we immediately get $a_0 = q_0$ and $a_1 = \dot{q}_0$. Substituting into rows 3 and 4:

$$a_2 t_f^2 + a_3 t_f^3 = q_f - q_0 - \dot{q}_0 t_f$$
$$2a_2 t_f + 3a_3 t_f^2 = \dot{q}_f - \dot{q}_0$$

This is a $2 \times 2$ system. Solving (multiply the first equation by $3/t_f$ and subtract the second):

$$3a_2 t_f + 3a_3 t_f^2 - 2a_2 t_f - 3a_3 t_f^2 = \frac{3(q_f - q_0 - \dot{q}_0 t_f)}{t_f} - (\dot{q}_f - \dot{q}_0)$$

$$a_2 t_f = \frac{3(q_f - q_0)}{t_f} - 3\dot{q}_0 - \dot{q}_f + \dot{q}_0$$

$$\boxed{a_2 = \frac{3}{t_f^2}(q_f - q_0) - \frac{2}{t_f}\dot{q}_0 - \frac{1}{t_f}\dot{q}_f}$$

Back-substituting to find $a_3$:

$$a_3 = \frac{q_f - q_0 - \dot{q}_0 t_f - a_2 t_f^2}{t_f^3}$$

$$\boxed{a_3 = -\frac{2}{t_f^3}(q_f - q_0) + \frac{1}{t_f^2}(\dot{q}_f + \dot{q}_0)}$$

These match Eq. 9 from the slides exactly. Setting $\dot{q}_0 = \dot{q}_f = 0$ recovers the zero-velocity case (Eq. 8).

**Reference**: Craig, *Introduction to Robotics*, Chapter 7, Section 7.3.

### [ENRICHMENT] Video: Polynomial Trajectory Generation (Robot Academy -- Peter Corke)
<!-- enrichment-type: video -->

Professor Peter Corke (QUT, Australia) has a concise video lesson on polynomial trajectory generation as part of the Robot Academy series. The lesson demonstrates how boundary conditions on position, velocity, and acceleration determine polynomial coefficients, and includes live MATLAB demonstrations.

- **1D Polynomial Trajectory**: [https://robotacademy.net.au/lesson/1d-polynomial-trajectory/](https://robotacademy.net.au/lesson/1d-polynomial-trajectory/)

The lesson emphasizes that the quintic (5th-order) polynomial is the most commonly used in practice because it can independently set position, velocity, and acceleration at both endpoints -- giving 6 boundary conditions and 6 coefficients.

---

## 7.7 Quintic Polynomial Scheme (PTP)
<!-- source: MSE492 - Chapter7.pdf#page=16 -->

### Definitions

**Quintic Polynomial Scheme**: A higher-order (5th degree) polynomial scheme often used in industrial applications. It allows satisfying six constraints: initial and final conditions for position, velocity, and acceleration.

### Derivations

<!-- source: MSE492 - Chapter7.pdf#page=16 -->
**Step 1 -- Define the quintic polynomial** and its derivatives:

$$q_k(t) = a_0 + a_1 t + a_2 t^2 + a_3 t^3 + a_4 t^4 + a_5 t^5$$

$$\dot{q}_k(t) = a_1 + 2a_2 t + 3a_3 t^2 + 4a_4 t^3 + 5a_5 t^4$$

$$\ddot{q}_k(t) = 2a_2 + 6a_3 t + 12a_4 t^2 + 20a_5 t^3$$

**Step 2 -- Six boundary conditions** can now be satisfied: initial and final position, velocity, and acceleration.

**Step 3 -- General coefficients** (starting from $t_0 = 0$):

$$a_0 = q_{k_0}$$

$$a_1 = \dot{q}_{k_0}$$

$$a_2 = \ddot{q}_{k_0}/2$$

$$a_3 = \frac{20(q_{k_f} - q_{k_0}) - (8\dot{q}_{k_f} + 12\dot{q}_{k_0})t_f + (\ddot{q}_{k_f} - 3\ddot{q}_{k_0})t_f^2}{2t_f^3}$$

$$a_4 = \frac{-30(q_{k_f} - q_{k_0}) + (14\dot{q}_{k_f} + 16\dot{q}_{k_0})t_f - (2\ddot{q}_{k_f} - 3\ddot{q}_{k_0})t_f^2}{2t_f^4}$$

$$a_5 = \frac{12(q_{k_f} - q_{k_0}) - (6\dot{q}_{k_f} + 6\dot{q}_{k_0})t_f + (\ddot{q}_{k_f} - \ddot{q}_{k_0})t_f^2}{2t_f^5}$$

### Key Equations

<!-- source: MSE492 - Chapter7.pdf#page=16 -->
6. **Quintic position**: $q_k(t) = a_0 + a_1 t + a_2 t^2 + a_3 t^3 + a_4 t^4 + a_5 t^5$
7. **Quintic velocity**: $\dot{q}_k(t) = a_1 + 2a_2 t + 3a_3 t^2 + 4a_4 t^3 + 5a_5 t^4$
8. **Quintic acceleration**: $\ddot{q}_k(t) = 2a_2 + 6a_3 t + 12a_4 t^2 + 20a_5 t^3$

### Worked Examples

<!-- source: MSE492 - Chapter7.pdf#page=17 -->
**Example: Quintic Polynomial PTP Trajectory (Ch7-17 to Ch7-18)**

**Problem**: Same setup as the cubic example. Two-revolute jointed manipulator starts from rest ($\dot{q} = 0$, $\ddot{q} = 0$) and stops at the end. Initial joint angles $\boldsymbol{\theta}_0 = [10 \;\; 25]^\mathsf{T}$ deg, final joint angles $\boldsymbol{\theta}_f = [75 \;\; 60]^\mathsf{T}$ deg. Duration is 5 sec. Determine the trajectory using a quintic polynomial scheme.

**Solution**: With all initial and final velocities and accelerations equal to zero, the coefficients simplify. The resulting profiles show that **both velocity and acceleration start and end at zero**, resolving the discontinuity problem of the cubic scheme.

### Diagrams

<!-- source: MSE492 - Chapter7.pdf#page=17 -->
**Robot Configurations Plot (Ch7-17)**: Same layout as the cubic case. X-Y plot showing multiple intermediate postures of the 2R manipulator sweeping from initial to final configuration.

<!-- source: MSE492 - Chapter7.pdf#page=18 -->
**Quintic PTP Profiles (Ch7-18)**: Three side-by-side plots:
- **Time vs Displacement**: Smooth S-curves for both joints, similar shape to cubic but with different curvature profile.
- **Time vs Velocity**: Smooth bell curves peaking around $t = 2.5$ s. Joint 1 peak ~23 deg/s, Joint 2 peak ~12 deg/s. Both start and end at exactly zero.
- **Time vs Acceleration**: Smooth curves that start at zero, go positive, cross zero at midpoint, go negative, and return to zero. Joint 1 peak ~15 deg/s^2. No discontinuities.

### [ENRICHMENT] Proof: Quintic Polynomial Coefficient Derivation (Matrix Form)
<!-- enrichment-type: proof -->

The slides present the final coefficient formulas for the quintic polynomial. Here is the underlying derivation via the $6 \times 6$ matrix system.

**Setup**: The quintic polynomial and its first two derivatives evaluated at $t_0 = 0$ and $t = t_f$ give six equations. The first three boundary conditions immediately yield $a_0$, $a_1$, and $a_2$:

$$q(0) = a_0 = q_0$$
$$\dot{q}(0) = a_1 = \dot{q}_0$$
$$\ddot{q}(0) = 2a_2 = \ddot{q}_0 \implies a_2 = \frac{\ddot{q}_0}{2}$$

The remaining three conditions at $t = t_f$ form a $3 \times 3$ system for $(a_3, a_4, a_5)$:

$$\begin{bmatrix} t_f^3 & t_f^4 & t_f^5 \\ 3t_f^2 & 4t_f^3 & 5t_f^4 \\ 6t_f & 12t_f^2 & 20t_f^3 \end{bmatrix} \begin{bmatrix} a_3 \\ a_4 \\ a_5 \end{bmatrix} = \begin{bmatrix} q_f - q_0 - \dot{q}_0 t_f - \frac{\ddot{q}_0}{2} t_f^2 \\ \dot{q}_f - \dot{q}_0 - \ddot{q}_0 t_f \\ \ddot{q}_f - \ddot{q}_0 \end{bmatrix}$$

Inverting this $3 \times 3$ matrix (which has determinant $2t_f^9$) yields the closed-form expressions for $a_3$, $a_4$, and $a_5$ given in the slides.

**Simplified case (all zero boundary velocities/accelerations)**: When $\dot{q}_0 = \dot{q}_f = \ddot{q}_0 = \ddot{q}_f = 0$, let $h = q_f - q_0$:

$$a_0 = q_0, \quad a_1 = 0, \quad a_2 = 0$$

$$a_3 = \frac{10h}{t_f^3}, \quad a_4 = \frac{-15h}{t_f^4}, \quad a_5 = \frac{6h}{t_f^5}$$

These produce the familiar "minimum-jerk-like" trajectory with the time scaling $s(t) = 10\tau^3 - 15\tau^4 + 6\tau^5$ where $\tau = t/t_f$, which students may recognize from biomechanics literature (it approximates the smoothness of human reaching movements).

**Reference**: Craig, *Introduction to Robotics*, Chapter 7; MATLAB documentation: [https://www.mathworks.com/help/robotics/ref/quinticpolytraj.html](https://www.mathworks.com/help/robotics/ref/quinticpolytraj.html)

### [ENRICHMENT] Alternative Explanation: Cubic vs. Quintic -- Why the Extra Complexity Matters
<!-- enrichment-type: explanation -->

The cubic and quintic schemes solve the same basic problem but with different levels of smoothness. Here is a direct comparison:

| Property | Cubic | Quintic |
|---|---|---|
| Degree | 3 | 5 |
| Free coefficients | 4 | 6 |
| Position continuity at endpoints | Yes | Yes |
| Velocity continuity at endpoints | Yes | Yes |
| Acceleration continuity at endpoints | **No** | Yes |
| Jerk ($\dddot{q}$) at start/end | **Infinite** (discontinuous accel.) | Finite (accel. starts/ends at zero) |
| Computational cost | Lower | Slightly higher |
| Peak velocity (same displacement, same duration) | Lower (~$1.5 \frac{\Delta q}{t_f}$) | Higher (~$1.88 \frac{\Delta q}{t_f}$) |

**The critical practical issue**: A cubic trajectory has a *linear* acceleration profile that jumps discontinuously at $t = 0$ and $t = t_f$. This means the jerk (time derivative of acceleration, $\dddot{q}$) is infinite at those instants. In a real robot, infinite jerk means the motors must change their torque instantaneously, which:

1. Excites structural vibrations in the links and gears
2. Causes excessive mechanical wear
3. Can trigger safety stops on industrial controllers that monitor jerk limits

The quintic polynomial eliminates this problem entirely by ensuring acceleration smoothly ramps from zero to its peak and back to zero, resulting in finite jerk everywhere.

**Industrial practice**: Most modern industrial robot controllers use at least quintic polynomials or S-curve profiles (which also guarantee finite jerk) for precisely this reason.

**Reference**: Assessment of Jerk Performance: S-curve and Trapezoidal Velocity Profiles, IEEE (2017): [https://ieeexplore.ieee.org/document/7968187/](https://ieeexplore.ieee.org/document/7968187/)

---

## 7.8 Trapezoidal Scheme (PTP)
<!-- source: MSE492 - Chapter7.pdf#page=19 -->

### Definitions

**Trapezoidal Scheme (Linear Segment with Parabolic Blends)**: This scheme is based on having a linear function with parabolic blends to maintain a smooth path. The velocity profile has a trapezoidal shape (linear-constant-linear). The resulting trajectory is composed of three phases:
1. **Acceleration phase** (initial phase)
2. **Constant velocity phase** (middle phase)
3. **Deceleration phase** (final phase)

**Blend time $t_b$**: The duration of the acceleration and deceleration phases is equal, denoted $t_b$.

### Derivations

<!-- source: MSE492 - Chapter7.pdf#page=20 -->
**Step 1 -- Equal acceleration/deceleration magnitudes.** Since the duration of the acceleration and deceleration phases is equal:

$$|\ddot{\theta}_k(t_b)| = |\ddot{\theta}_k(t_f - t_b)|$$

**Step 2 -- Velocity matching at phase transitions.** The magnitude of the velocity during the transition of the phases must be the same:

$$\ddot{\theta}_{k_b} \, t_b = \frac{\theta_{k_h} - \theta_{k_b}}{t_h - t_b}$$

where subscript $h$ represents the halfway point of the trajectory, with:

$$\theta_{k_h} = \frac{\theta_{k_0} + \theta_{k_f}}{2}, \qquad t_h = \frac{t_f}{2}$$

<!-- source: MSE492 - Chapter7.pdf#page=21 -->
**Step 3 -- Parabolic blend position.** Since the blends are parabolic and $\dot{\theta}_k(t_0) = 0$:

$$\theta_{k_b} = \theta_{k_0} + \frac{1}{2}\ddot{\theta}_{k_b} \, t_b^2$$

**Step 4 -- Combine to get quadratic in $t_b$.** Combining the previous two equations yields:

$$\ddot{\theta}_{k_b} \, t_b^2 - \ddot{\theta}_{k_b} \, t_f \, t_b + (\theta_{k_f} - \theta_{k_0}) = 0 \quad \text{(Eq. *)}$$

where $t_b$ and $\ddot{\theta}_{k_b}$ are unknown variables.

**Step 5 -- Solve for $t_b$.** Usually $\ddot{\theta}_{k_b}$ is prescribed and $t_b$ is found with Eq. (*):

$$t_b = \frac{t_f}{2} - \frac{\sqrt{(\ddot{\theta}_{k_b} \, t_f)^2 - 4\ddot{\theta}_{k_b}(\theta_{k_f} - \theta_{k_0})}}{2\ddot{\theta}_{k_b}}$$

Make sure the term inside the square root is positive.

<!-- source: MSE492 - Chapter7.pdf#page=22 -->
**Step 6 -- Ensuring real solutions.** To ensure a real solution for $t_b$, define $\ddot{\theta}_{k_b}$ as:

$$\ddot{\theta}_{k_b} = \frac{4(\theta_{k_f} - \theta_{k_0})}{t_f^2} \, f_b \qquad \text{with} \quad f_b \geq 1$$

Set $f_b$, find $\ddot{\theta}_{k_b}$, then solve for $t_b$:

$$t_b = \min\!\left(\text{roots}\!\left[\ddot{\theta}_{k_b} \quad -\ddot{\theta}_{k_b} \, t_f \quad (\theta_{k_f} - \theta_{k_0})\right]\right)$$

### Theorems & Properties

<!-- source: MSE492 - Chapter7.pdf#page=22 -->
**Trapezoidal Scheme Piecewise Equations**: The three phases are defined as follows:

| Phase | Displacement | Velocity | Acceleration |
|---|---|---|---|
| $0 \leq t \leq t_b$ | $\theta_k(t) = \theta_{k_0} + \frac{1}{2}\ddot{\theta}_{k_b} \, t^2$ | $\dot{\theta}_k(t) = \ddot{\theta}_{k_b} \, t$ | $\ddot{\theta}_k(t) = \ddot{\theta}_{k_b}$ |
| $t_b \leq t \leq t_f - t_b$ | $\theta_k(t) = \theta_{k_0} + \ddot{\theta}_{k_b} \, t_b\!\left(t - \frac{t_b}{2}\right)$ | $\dot{\theta}_k(t) = \ddot{\theta}_{k_b} \, t_b$ | $\ddot{\theta}_k(t) = 0$ |
| $t_f - t_b \leq t \leq t_f$ | $\theta_k(t) = \theta_{k_f} - \frac{1}{2}\ddot{\theta}_{k_b}(t_f - t)^2$ | $\dot{\theta}_k(t) = \ddot{\theta}_{k_b}(t_f - t)$ | $\ddot{\theta}_k(t) = -\ddot{\theta}_{k_b}$ |

### Key Equations

<!-- source: MSE492 - Chapter7.pdf#page=21 -->
9. **Quadratic for blend time**: $\ddot{\theta}_{k_b} \, t_b^2 - \ddot{\theta}_{k_b} \, t_f \, t_b + (\theta_{k_f} - \theta_{k_0}) = 0$ (Eq. *)
10. **Blend time solution**: $t_b = \frac{t_f}{2} - \frac{\sqrt{(\ddot{\theta}_{k_b} t_f)^2 - 4\ddot{\theta}_{k_b}(\theta_{k_f} - \theta_{k_0})}}{2\ddot{\theta}_{k_b}}$

<!-- source: MSE492 - Chapter7.pdf#page=22 -->
11. **Acceleration factor**: $\ddot{\theta}_{k_b} = \frac{4(\theta_{k_f} - \theta_{k_0})}{t_f^2} f_b$ with $f_b \geq 1$

### Worked Examples

<!-- source: MSE492 - Chapter7.pdf#page=23 -->
**Example: Trapezoidal PTP Trajectory (Ch7-23 to Ch7-24)**

**Problem**: Same setup as before. Two-revolute jointed manipulator starts from rest and stops at the end. Initial joint angles $\boldsymbol{\theta}_0 = [10 \;\; 25]^\mathsf{T}$ deg, final joint angles $\boldsymbol{\theta}_f = [75 \;\; 60]^\mathsf{T}$ deg. Duration is 5 sec. Determine the trajectory using a trapezoidal scheme.

**Solution**: Using the trapezoidal scheme equations with prescribed acceleration. The resulting profiles show the characteristic three-phase behavior.

### Diagrams

<!-- source: MSE492 - Chapter7.pdf#page=19 -->
**Trapezoidal Scheme Concept (Ch7-19)**: A displacement vs. time plot showing the S-shaped trajectory composed of three phases. The curve starts at $\theta_0$ at $t_0$, has a parabolic blend up to $t_b$ (acceleration phase), then a linear segment until $t_f - t_b$ (constant velocity phase), then another parabolic blend to $\theta_f$ at $t_f$ (deceleration phase). The three phases are labeled: Acceleration, Constant Velocity, Deceleration.

<!-- source: MSE492 - Chapter7.pdf#page=20 -->
**Trapezoidal Scheme Detail (Ch7-20)**: Displacement vs. time plot with additional detail. Shows $\theta_0$, $\theta_{k_h}$ (halfway position), and $\theta_f$ on the vertical axis. Time axis shows $t_0$, $t_b$, $t_h$ (halfway time), $t_f - t_b$, and $t_f$. Dashed lines indicate the halfway point.

<!-- source: MSE492 - Chapter7.pdf#page=23 -->
**Robot Configurations Plot (Ch7-23)**: Same layout as previous examples. X-Y plot showing multiple intermediate postures of the 2R manipulator.

<!-- source: MSE492 - Chapter7.pdf#page=24 -->
**Trapezoidal PTP Profiles (Ch7-24)**: Three side-by-side plots:
- **Time vs Displacement**: Smooth S-curves for both joints with a distinct linear middle section.
- **Time vs Velocity**: Trapezoidal profiles. Joint 1 ramps up to ~15 deg/s, holds constant, then ramps down. Joint 2 ramps to ~8 deg/s, holds, then ramps down.
- **Time vs Acceleration**: Step functions. Joint 1 has +20 deg/s^2 during acceleration, 0 during constant velocity, -20 deg/s^2 during deceleration. Joint 2 similar but smaller magnitude.

### [ENRICHMENT] Proof: Trapezoidal Blend Time Derivation
<!-- enrichment-type: proof -->

The slides present the quadratic equation for $t_b$ (Eq. *) but skip some intermediate steps. Here is the full derivation.

**Goal**: Find the blend time $t_b$ given a prescribed acceleration $\ddot{\theta}_b$ and total time $t_f$.

**Step 1**: The velocity at the end of the acceleration phase equals the constant velocity during the cruise phase:

$$v_{cruise} = \ddot{\theta}_b \cdot t_b$$

**Step 2**: The total displacement is the sum of displacements during all three phases. By symmetry of the acceleration and deceleration phases:

$$\Delta\theta = \theta_f - \theta_0 = \underbrace{\frac{1}{2}\ddot{\theta}_b t_b^2}_{\text{accel. phase}} + \underbrace{\ddot{\theta}_b t_b (t_f - 2t_b)}_{\text{cruise phase}} + \underbrace{\frac{1}{2}\ddot{\theta}_b t_b^2}_{\text{decel. phase}}$$

**Step 3**: Simplify:

$$\Delta\theta = \ddot{\theta}_b t_b^2 + \ddot{\theta}_b t_b t_f - 2\ddot{\theta}_b t_b^2 = \ddot{\theta}_b t_b t_f - \ddot{\theta}_b t_b^2$$

**Step 4**: Rearrange to get the quadratic equation in $t_b$:

$$\ddot{\theta}_b t_b^2 - \ddot{\theta}_b t_f t_b + \Delta\theta = 0$$

This is Eq. (*) from the slides. Applying the quadratic formula:

$$t_b = \frac{\ddot{\theta}_b t_f \pm \sqrt{\ddot{\theta}_b^2 t_f^2 - 4\ddot{\theta}_b \Delta\theta}}{2\ddot{\theta}_b} = \frac{t_f}{2} \pm \frac{\sqrt{\ddot{\theta}_b^2 t_f^2 - 4\ddot{\theta}_b \Delta\theta}}{2\ddot{\theta}_b}$$

We take the **minus** sign to ensure $t_b < t_f/2$ (otherwise the cruise phase would have negative duration).

**Constraint on $\ddot{\theta}_b$**: For the discriminant to be non-negative:

$$\ddot{\theta}_b^2 t_f^2 - 4\ddot{\theta}_b \Delta\theta \geq 0$$

$$\ddot{\theta}_b \geq \frac{4\Delta\theta}{t_f^2}$$

This is exactly the $f_b = 1$ case from the slides. The factor $f_b \geq 1$ provides a margin above the minimum required acceleration.

**Physical interpretation of $f_b$**: When $f_b = 1$, the blend time equals $t_f/2$, meaning the cruise phase has zero duration and the velocity profile becomes *triangular* (not trapezoidal). As $f_b$ increases, the acceleration increases, $t_b$ decreases, and the cruise phase gets longer.

### [ENRICHMENT] Video: 1D Trapezoidal Trajectory (Robot Academy -- Peter Corke)
<!-- enrichment-type: video -->

Professor Peter Corke provides a clear video lesson on the trapezoidal (LSPB) velocity profile, including its derivation and MATLAB demonstration.

- **1D Trapezoidal Trajectory**: [https://robotacademy.net.au/lesson/1d-trapezoidal-trajectory/](https://robotacademy.net.au/lesson/1d-trapezoidal-trajectory/)

The lesson explains the three-phase structure, the relationship between blend time and cruise velocity, and demonstrates the MATLAB `lspb` function from the Robotics Toolbox.

### [ENRICHMENT] Alternative Explanation: Trapezoidal vs. S-Curve Profiles in Industry
<!-- enrichment-type: explanation -->

The trapezoidal scheme presented in the slides is one of the most widely used trajectory profiles in industry due to its simplicity. However, it has a significant limitation: **acceleration is discontinuous** at the transitions between phases (at $t = 0$, $t = t_b$, $t = t_f - t_b$, and $t = t_f$). This means jerk is infinite at those instants.

The **S-curve profile** (also called a 7-segment profile) extends the trapezoidal idea by adding "transition" segments that smoothly ramp the acceleration up and down, rather than switching it instantaneously. The result is a velocity profile that has smooth, S-shaped transitions instead of sharp corners.

| Property | Trapezoidal (3-segment) | S-Curve (7-segment) |
|---|---|---|
| Velocity profile shape | Trapezoid (sharp corners) | Trapezoid with rounded corners |
| Acceleration | Piecewise constant (step function) | Piecewise linear (continuous) |
| Jerk | Infinite at transitions | Finite (bounded constant) |
| Vibration excitation | Higher | Significantly lower |
| Implementation complexity | Simple | Moderate |
| Move time (same limits) | Slightly faster | Slightly slower, but can be tuned to be 25%+ faster in practice |

Modern industrial controllers (KUKA, ABB, Fanuc, etc.) typically offer both profile types, with S-curve profiles being preferred for applications requiring smooth motion and low vibration.

**Reference**: PMD Corp, "Mathematics of Motion Control Profiles": [https://www.pmdcorp.com/resources/type/articles/get/mathematics-of-motion-control-profiles-article](https://www.pmdcorp.com/resources/type/articles/get/mathematics-of-motion-control-profiles-article)

---

## 7.9 Continuous Path (CP) Motion
<!-- source: MSE492 - Chapter7.pdf#page=25 -->

### Definitions

**Continuous Path (CP) Motion**: Used in applications where the end-effector must follow a straight line (e.g., arc welding, spray painting). In CP motion, joints have to work together to accomplish the desired path.

A continuous path can be generated following two different methods:
- **Via Points Scheme** (Joint Space)
- **Cartesian Scheme** (Task Space)

---

## 7.10 Via Points (CP)
<!-- source: MSE492 - Chapter7.pdf#page=26 -->

### Definitions

**Via Points**: A practical solution to generating a straight path is to divide the line into multiple points that are connected. Each segment between via points can use the polynomial schemes seen before.

**Problem with individual segments**: Having individual segments implies that the manipulator stops at every point, which is not desired.

**Solutions for continuous motion**:
- Prescribed Velocity
- Matching Velocity and Accelerations

### Diagrams

<!-- source: MSE492 - Chapter7.pdf#page=26 -->
**Via Points Path (Ch7-26)**: Diagram showing a curved path (dashed arc) divided into multiple segments by via points. The actual path between via points using PTP motion slightly overshoots the straight line, creating small arcs between successive via points.

### [ENRICHMENT] Alternative Explanation: Why Via Points Are Necessary for Continuous Paths
<!-- enrichment-type: explanation -->

A fundamental question is: why not just use a single high-degree polynomial to connect the start and end points along a straight line?

The answer involves several practical considerations:

1. **Runge's phenomenon**: High-degree polynomials tend to oscillate wildly between interpolation points, especially near the endpoints. Using piecewise low-degree polynomials (cubics) connected at via points avoids this problem entirely.

2. **Obstacle avoidance**: Via points allow the path to be shaped around obstacles in the workspace. A single polynomial between start and end cannot guarantee obstacle clearance at intermediate times.

3. **Geometric fidelity**: For a straight-line Cartesian path, you need the end-effector to stay close to the line. Placing via points along the line and connecting them with short polynomial segments keeps the deviation small. The more via points you add, the closer the actual path approximates the desired straight line.

4. **Real-time computation**: Solving for 4 or 8 polynomial coefficients per segment is computationally cheap. Solving for the coefficients of a single polynomial of degree 50+ would be numerically ill-conditioned and expensive.

This is the same idea behind *cubic spline interpolation* in numerical analysis -- piecewise cubics are preferred over single high-degree polynomials for their stability and smoothness properties.

---

## 7.11 Via Points: Prescribed Velocity (CP)
<!-- source: MSE492 - Chapter7.pdf#page=27 -->

### Definitions

**Prescribed Velocity at Via Point**: A simple solution where the velocity between two joint segments is prescribed. Each segment is defined by a cubic polynomial scheme.

### Derivations

<!-- source: MSE492 - Chapter7.pdf#page=27 -->
**Step 1 -- Define two cubic segments** for joint $k$ passing through a via point:

Segment 1 (initial to via point):

$$q_{k_1}(t) = a_{10} + a_{11}t + a_{12}t^2 + a_{13}t^3$$

Segment 2 (via point to final):

$$q_{k_2}(t) = a_{20} + a_{21}t + a_{22}t^2 + a_{23}t^3$$

The velocity at the via point is the same at the end of segment 1 and the beginning of segment 2:

$$\dot{q}_{k_v} = \dot{q}_{k_1}(t_{f_1}) = \dot{q}_{k_2}(0)$$

Each segment $i$ has duration $0 \leq t \leq t_{f_i}$.

<!-- source: MSE492 - Chapter7.pdf#page=28 -->
**Step 2 -- Boundary conditions for each segment:**

Segment 1:
- $q_{k_1}(0) = q_{k_0}$ (initial position)
- $q_{k_1}(t_{f_1}) = q_{k_v}$ (via point position)
- $\dot{q}_{k_1}(0) = 0$ (starts from rest)
- $\dot{q}_{k_1}(t_{f_1}) = \dot{q}_{k_v}$ (prescribed velocity at via)

Segment 2:
- $q_{k_2}(0) = q_{k_v}$ (via point position)
- $q_{k_2}(t_{f_2}) = q_{k_f}$ (final position)
- $\dot{q}_{k_2}(0) = \dot{q}_{k_v}$ (prescribed velocity at via)
- $\dot{q}_{k_2}(t_{f_2}) = 0$ (stops at end)

**Step 3 -- Solve for coefficients:**

Segment 1:

$$a_{10} = q_{k_0}$$

$$a_{11} = 0$$

$$a_{12} = \frac{3}{t_{f_1}^2}(q_{k_v} - q_{k_0}) - \frac{1}{t_{f_1}}\dot{q}_{k_v}$$

$$a_{13} = -\frac{2}{t_{f_1}^3}(q_{k_v} - q_{k_0}) + \frac{1}{t_{f_1}^2}(\dot{q}_{k_v})$$

Segment 2:

$$a_{20} = q_{k_v}$$

$$a_{21} = \dot{q}_{k_v}$$

$$a_{22} = \frac{3}{t_{f_2}^2}(q_{k_f} - q_{k_v}) - \frac{2}{t_{f_2}}\dot{q}_{k_v}$$

$$a_{23} = -\frac{2}{t_{f_2}^3}(q_{k_f} - q_{k_v}) + \frac{1}{t_{f_2}^2}(\dot{q}_{k_v})$$

### Key Equations

<!-- source: MSE492 - Chapter7.pdf#page=28 -->
12. **Segment 1 coefficients**: $a_{10} = q_{k_0},\; a_{11} = 0,\; a_{12} = \frac{3}{t_{f_1}^2}(q_{k_v} - q_{k_0}) - \frac{1}{t_{f_1}}\dot{q}_{k_v},\; a_{13} = -\frac{2}{t_{f_1}^3}(q_{k_v} - q_{k_0}) + \frac{1}{t_{f_1}^2}\dot{q}_{k_v}$
13. **Segment 2 coefficients**: $a_{20} = q_{k_v},\; a_{21} = \dot{q}_{k_v},\; a_{22} = \frac{3}{t_{f_2}^2}(q_{k_f} - q_{k_v}) - \frac{2}{t_{f_2}}\dot{q}_{k_v},\; a_{23} = -\frac{2}{t_{f_2}^3}(q_{k_f} - q_{k_v}) + \frac{1}{t_{f_2}^2}\dot{q}_{k_v}$

### Worked Examples

<!-- source: MSE492 - Chapter7.pdf#page=29 -->
**Example: Prescribed Velocity with $\dot{\theta}_v = 0$ (Ch7-29 to Ch7-30)**

**Problem**: Let $\theta_0 = 5°$, $\theta_v = 15°$, and $\theta_f = -10°$. Assume the velocity at the via point is $\dot{\theta}_v = 0$. The duration per segment is 2 seconds.

**Solution**:

Segment 1 ($\dot{\theta}_0 = 0$):

$$a_{10} = \theta_0 = 5$$

$$a_{11} = \dot{\theta}_0 = 0$$

$$a_{12} = \frac{3}{2^2}(15 - 5) = \frac{15}{2}$$

$$a_{13} = -\frac{2}{2^3}(15 - 5) = -\frac{5}{2}$$

Segment 2 ($\dot{\theta}_g = 0$):

$$a_{20} = \theta_v = 15$$

$$a_{21} = \dot{\theta}_v = 0$$

$$a_{22} = \frac{3}{2^2}(-10 - 15) = -\frac{75}{4}$$

$$a_{23} = -\frac{2}{2^3}(-10 - 15) = \frac{25}{4}$$

<!-- source: MSE492 - Chapter7.pdf#page=31 -->
**Example: Prescribed Velocity with $\dot{\theta}_v = -10$ (Ch7-31)**

**Problem**: Same problem as above, but now the velocity at the via point is $\dot{\theta}_v = -10$.

**Result**: The prescribed non-zero velocity at the via point changes the shape of all profiles. The position curve is smoother through the via point. The velocity is continuous but the acceleration still has a discontinuity at the via point.

### Diagrams

<!-- source: MSE492 - Chapter7.pdf#page=27 -->
**Via Points Flow Diagram (Ch7-27)**: A flow diagram with three pink oval nodes: "Initial Configuration" on the left, "Intermediate Configuration (Via Point)" in the center, and "Final Configuration" on the right. Arrows connect them. Two cubic polynomial equations are shown above, one for each segment. The velocity matching condition $\dot{q}_{k_v} = \dot{q}_{k_1}(t_{f_1}) = \dot{q}_{k_2}(0)$ is shown at the via point.

<!-- source: MSE492 - Chapter7.pdf#page=30 -->
**Prescribed Velocity Profile ($\dot{\theta}_v = 0$) (Ch7-30)**: Single plot with three curves: position (solid), velocity (dash-dot), and acceleration (dotted) vs. time from 0 to 4 seconds. Position goes from 5 to 15 deg in segment 1, then from 15 to -10 deg in segment 2. Velocity is zero at start, via, and end. Acceleration is discontinuous at the via point ($t = 2$ s).

<!-- source: MSE492 - Chapter7.pdf#page=31 -->
**Prescribed Velocity Profile ($\dot{\theta}_v = -10$) (Ch7-31)**: Similar layout. Position curve is smoother through the via point due to nonzero via velocity. Velocity curve passes through -10 deg/s at $t = 2$ s. Acceleration still shows discontinuity at the via.

### [ENRICHMENT] Alternative Explanation: The Acceleration Discontinuity Problem at Via Points
<!-- enrichment-type: explanation -->

The worked examples on the slides show that with prescribed velocity, the acceleration is *still* discontinuous at the via point. This is worth understanding deeply because it motivates the more sophisticated "matching velocities and accelerations" method in Section 7.12.

**Why does the discontinuity occur?** Each segment is an independent cubic polynomial with its own set of 4 boundary conditions. The two segments share position and velocity at the via point, but there is no constraint linking their accelerations. So at the via point:

- Segment 1's acceleration is: $\ddot{q}_1(t_{f_1}) = 2a_{12} + 6a_{13} t_{f_1}$
- Segment 2's acceleration is: $\ddot{q}_2(0) = 2a_{22}$

These two values are generally different, producing a step change in acceleration. Physically, this means the motor torque must change instantaneously at the via point -- producing an impulsive jerk.

**The fix**: To eliminate this discontinuity, you need one more constraint (acceleration matching) at each via point. But each cubic segment only has 4 coefficients, and with the constraints already used, there is no room for an additional one *per segment*. The solution (Section 7.12) is to solve both segments *simultaneously* as a coupled system, trading the freedom of independently choosing the via-point velocity for the guarantee of acceleration continuity.

---

## 7.12 Via Points: Matching Velocities and Accelerations (CP)
<!-- source: MSE492 - Chapter7.pdf#page=32 -->

### Definitions

**Matching Velocities and Accelerations**: An alternative approach where, instead of prescribing velocity at the via point, conditions are combined between segments so that both velocity and acceleration are continuous at the via point. This eliminates acceleration discontinuities.

### Derivations

<!-- source: MSE492 - Chapter7.pdf#page=32 -->
**Step 1 -- Define two cubic segments** (same form as before):

$$q_{k_1}(t) = a_{10} + a_{11}t + a_{12}t^2 + a_{13}t^3$$

$$q_{k_2}(t) = a_{20} + a_{21}t + a_{22}t^2 + a_{23}t^3$$

For a two-cubic polynomial trajectory, there are 8 coefficients and therefore 8 conditions can be satisfied.

**Step 2 -- Define 8 boundary conditions:**

At the initial configuration:
- $q_{k_1}(0) = q_{k_0}$ (initial position)
- $\dot{q}_{k_1}(0) = 0$ (starts from rest)

At the via point:
- $q_{k_1}(t_{f_1}) = q_{k_v}$ (segment 1 ends at via)
- $q_{k_2}(0) = q_{k_v}$ (segment 2 starts at via)

At the final configuration:
- $q_{k_2}(t_{f_2}) = q_{k_f}$ (final position)
- $\dot{q}_{k_2}(t_{f_2}) = 0$ (stops at end)

Matching conditions at via:
- $\dot{q}_{k_1}(t_{f_1}) = \dot{q}_{k_2}(0)$ (velocity continuity)
- $\ddot{q}_{k_1}(t_{f_1}) = \ddot{q}_{k_2}(0)$ (acceleration continuity)

<!-- source: MSE492 - Chapter7.pdf#page=33 -->
**Step 3 -- Express conditions in terms of coefficients:**

Segment I:
- $q_{k_1}(0) = q_{k_0}$ implies $a_{10} = q_{k_0}$
- $q_{k_1}(t_{f_1}) = q_{k_v}$ implies $a_{10} + a_{11}t_{f_1} + a_{12}t_{f_1}^2 + a_{13}t_{f_1}^3 = q_{k_v}$
- $\dot{q}_{k_1}(0) = 0$ implies $a_{11} = 0$

Segment II:
- $q_{k_2}(0) = q_{k_v}$ implies $a_{20} = q_{k_v}$
- $q_{k_2}(t_{f_2}) = q_{k_f}$ implies $a_{20} + a_{21}t_{f_2} + a_{22}t_{f_2}^2 + a_{23}t_{f_2}^3 = q_{k_f}$
- $\dot{q}_{k_2}(t_{f_2}) = 0$ implies $a_{21} + 2a_{22}t_{f_2} + 3a_{23}t_{f_2}^2 = 0$

Matching Vel/Acc:
- $\dot{q}_{k_1}(t_{f_1}) = \dot{q}_{k_2}(0)$ implies $a_{11} + 2a_{12}t_{f_1} + 3a_{13}t_{f_1}^2 = a_{21}$
- $\ddot{q}_{k_1}(t_{f_1}) = \ddot{q}_{k_2}(0)$ implies $2a_{12} + 6a_{13}t_{f_1} = 2a_{22}$

<!-- source: MSE492 - Chapter7.pdf#page=34 -->
**Step 4 -- Matrix form.** All equations must be solved simultaneously:

$$\begin{bmatrix} 1 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\ 1 & t_{f_1} & t_{f_1}^2 & t_{f_1}^3 & 0 & 0 & 0 & 0 \\ 0 & 1 & 0 & 0 & 0 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 & 1 & 0 & 0 & 0 \\ 0 & 0 & 0 & 0 & 1 & t_{f_2} & t_{f_2}^2 & t_{f_2}^3 \\ 0 & 0 & 0 & 0 & 0 & 1 & 2t_{f_2} & 3t_{f_2}^2 \\ 0 & 1 & 2t_{f_1} & 3t_{f_1}^2 & 0 & -1 & 0 & 0 \\ 0 & 0 & 2 & 6t_{f_1} & 0 & 0 & -2 & 0 \end{bmatrix} \begin{bmatrix} a_{10} \\ a_{11} \\ a_{12} \\ a_{13} \\ a_{20} \\ a_{21} \\ a_{22} \\ a_{23} \end{bmatrix} = \begin{bmatrix} q_{k_0} \\ q_{k_v} \\ 0 \\ q_{k_v} \\ q_{k_f} \\ 0 \\ 0 \\ 0 \end{bmatrix}$$

**Step 5 -- Closed-form solution** when $t_f = t_{f_1} = t_{f_2}$ (from Craig's book):

$$a_{10} = \theta_0, \qquad a_{20} = \theta_v$$

$$a_{11} = 0, \qquad a_{21} = \frac{3\theta_g - 3\theta_0}{4t_f}$$

$$a_{12} = \frac{12\theta_v - 3\theta_g - 9\theta_0}{4t_f^2}, \qquad a_{22} = \frac{-12\theta_v + 6\theta_g + 6\theta_0}{4t_f^2}$$

$$a_{13} = \frac{-8\theta_v + 3\theta_g + 5\theta_0}{4t_f^3}, \qquad a_{23} = \frac{8\theta_v - 5\theta_g - 3\theta_0}{4t_f^3}$$

### Key Equations

<!-- source: MSE492 - Chapter7.pdf#page=34 -->
14. **Matching Vel/Acc matrix system**: $\mathbf{A}\mathbf{x} = \mathbf{b}$ (8x8 system as shown above)
15. **Closed-form coefficients (equal segments)**: $a_{12} = \frac{12\theta_v - 3\theta_g - 9\theta_0}{4t_f^2}$, $a_{13} = \frac{-8\theta_v + 3\theta_g + 5\theta_0}{4t_f^3}$, $a_{21} = \frac{3\theta_g - 3\theta_0}{4t_f}$, $a_{22} = \frac{-12\theta_v + 6\theta_g + 6\theta_0}{4t_f^2}$, $a_{23} = \frac{8\theta_v - 5\theta_g - 3\theta_0}{4t_f^3}$

### Worked Examples

<!-- source: MSE492 - Chapter7.pdf#page=35 -->
**Example: Matching Vel/Acc (Ch7-35 to Ch7-36)**

**Problem**: Let $\theta_0 = 5°$, $\theta_v = 15°$, and $\theta_f = -10°$. Match velocities and accelerations at the via. Duration per segment is 2 seconds.

**Solution**:

Segment 1 ($\dot{\theta}_0 = 0$):

$$a_{10} = \theta_0 = 5$$

$$a_{11} = 0$$

$$a_{12} = \frac{12(15) - 3(-10) - 9(5)}{4(2^2)} = 10.31$$

$$a_{13} = \frac{-8(15) + 3(-10) + 5(5)}{4(2^3)} = -3.91$$

Segment 2 ($\dot{\theta}_g = 0$):

$$a_{20} = \theta_v = 15$$

$$a_{21} = \frac{3(-10) - 3(5)}{4(2)} = -5.63$$

$$a_{22} = \frac{-12(15) + 6(-10) + 6(5)}{4(2^2)} = -13.13$$

$$a_{23} = \frac{8(15) - 5(-10) - 3(5)}{4(2^3)} = 4.84$$

**Result**: The acceleration profile is now continuous at the via point, unlike the prescribed velocity method.

### Diagrams

<!-- source: MSE492 - Chapter7.pdf#page=32 -->
**Via Points Match Vel/Acc Flow Diagram (Ch7-32)**: Same three-node flow diagram as Ch7-27 but with additional matching conditions. At the initial configuration: $q_{k_1}(0) = q_{k_0}$, $\dot{q}_{k_1}(0) = 0$. At the via point: $q_{k_1}(t_{f_1}) = q_{k_v}$, $\dot{q}_{k_1}(t_{f_1}) = \dot{q}_{k_2}(0)$, $\ddot{q}_{k_1}(t_{f_1}) = \ddot{q}_{k_2}(0)$. At the final configuration: $q_{k_2}(t_{f_2}) = q_{k_f}$, $\dot{q}_{k_2}(t_{f_2}) = 0$.

<!-- source: MSE492 - Chapter7.pdf#page=36 -->
**Matching Velocity and Acceleration Profile (Ch7-36)**: Single plot with three curves: position (solid), velocity (dash-dot), and acceleration (dotted) vs. time from 0 to 4 seconds. Position goes from 5 to ~20 deg, then down to -10 deg. Velocity is smooth and continuous everywhere. Acceleration is also continuous at the via point ($t = 2$ s), unlike the prescribed velocity case.

### [ENRICHMENT] Video: Polynomial Via Point Trajectories (Modern Robotics -- Kevin Lynch)
<!-- enrichment-type: video -->

This video by Kevin Lynch covers via-point trajectory generation using cubic polynomial interpolation. It explains how to define velocities at via points, solve for polynomial coefficients per segment, and demonstrates the resulting position/velocity/acceleration profiles.

- **Modern Robotics, Chapter 9.3: Polynomial Via Point Trajectories**: [https://youtu.be/sWPpq9-5YOc](https://youtu.be/sWPpq9-5YOc)

The video covers the case where via times and velocities are specified, leading to independent cubic polynomial solutions per segment -- the same framework as this section but from the Modern Robotics perspective.

### [ENRICHMENT] Alternative Explanation: Prescribed Velocity vs. Matching -- A Trade-Off Summary
<!-- enrichment-type: explanation -->

The two via-point methods represent a fundamental trade-off in trajectory planning:

**Prescribed Velocity (Section 7.11):**
- **Advantage**: Each segment can be solved independently (decoupled). This is computationally simple and allows you to specify a desired velocity at each via point based on physical intuition.
- **Disadvantage**: Acceleration is discontinuous at via points because each segment only enforces 4 constraints, and there is no constraint linking acceleration across segments.
- **When to use**: When you have a good idea of what the velocity should be at each via point, and acceleration discontinuities are acceptable (e.g., slow motions where jerk is not a concern).

**Matching Velocities and Accelerations (Section 7.12):**
- **Advantage**: Both velocity *and* acceleration are continuous at via points, producing smoother motion with finite jerk.
- **Disadvantage**: The segments are *coupled* -- all 8 coefficients must be solved simultaneously in one linear system. You lose the ability to independently prescribe the via-point velocity; it is determined by the system.
- **When to use**: When smooth motion is critical (e.g., high-speed operations, delicate payloads, or processes sensitive to vibration).

**Generalization**: For $n$ via points with $n+1$ segments, the matching approach produces a $(4(n+1)) \times (4(n+1))$ linear system. While larger, it remains a *banded* matrix system (each equation only involves coefficients from at most 2 adjacent segments), making it efficient to solve even for many via points.

---

## 7.13 Cartesian Scheme (CP)
<!-- source: MSE492 - Chapter7.pdf#page=37 -->

### Definitions

**Cartesian Scheme**: A method to establish the motion of a desired path of the end-effector by generating the trajectory in the task space, ${}^{0}_{ee}\mathbf{T}_0 \to {}^{0}_{ee}\mathbf{T}_f$.

### Theorems & Properties

<!-- source: MSE492 - Chapter7.pdf#page=37 -->
**Rotation matrix limitation**: One cannot generate a trajectory of a rotation matrix ${}^{0}_{ee}\mathbf{R}$ directly, because generating a trajectory for each element independently does not ensure that the resulting matrix maintains the properties of $\mathbf{R}$ (orthogonality, unit determinant).

**Independent parameters for trajectory**: The trajectory is generated with the independent elements of the position vector ($x, y, z$) and the Euler angles ($\alpha, \beta, \gamma$), or the parameters of the equivalent angle/axis method or quaternions.

**Inverse kinematics requirement**: Since the joint variables are the input variables of a manipulator, the inverse kinematics and the inverse velocity/acceleration problems must be solved at each moment:

$$\dot{\boldsymbol{q}} = \mathbf{J}^{-1} \dot{\boldsymbol{x}}$$

**Singularity warning**: This solution fails in case the manipulator is in a singular configuration.

<!-- source: MSE492 - Chapter7.pdf#page=38 -->
**Trapezoidal scheme in Cartesian space**: A common scheme adopted for the Cartesian space is the trapezoidal scheme. The main advantage is that during the constant velocity phase, the inverse velocity has to be solved only once. The linear part can be determined based on $t_b$.

### Key Equations

<!-- source: MSE492 - Chapter7.pdf#page=37 -->
16. **Inverse velocity for Cartesian trajectory**: $\dot{\boldsymbol{q}} = \mathbf{J}^{-1} \dot{\boldsymbol{x}}$

### Diagrams

<!-- source: MSE492 - Chapter7.pdf#page=38 -->
**Cartesian Trapezoidal Profiles (Ch7-38)**: Three side-by-side plots showing the trapezoidal scheme applied in Cartesian space:
- **Time vs Displacement** $d(x)$: S-shaped curve with distinct linear middle section, plotted for two Cartesian coordinates. "x" markers indicate start/end of blend regions.
- **Time vs Velocity** $v(x/s)$: Trapezoidal profiles with ramp-up, constant, and ramp-down phases.
- **Time vs Acceleration** $a(x/s^2)$: Step functions -- positive constant during acceleration, zero during constant velocity, negative constant during deceleration.

### [ENRICHMENT] Alternative Explanation: Why You Cannot Interpolate Rotation Matrices Directly
<!-- enrichment-type: explanation -->

The slides state that one cannot generate a trajectory for a rotation matrix $\mathbf{R}$ by interpolating each of its 9 elements independently. This deserves a deeper explanation because it is a common source of errors.

A rotation matrix $\mathbf{R} \in SO(3)$ must satisfy two properties:
1. **Orthogonality**: $\mathbf{R}^\mathsf{T}\mathbf{R} = \mathbf{I}$ (columns are mutually orthonormal)
2. **Unit determinant**: $\det(\mathbf{R}) = +1$ (proper rotation, no reflection)

If you linearly interpolate between two rotation matrices element-by-element:

$$\mathbf{R}(t) = (1 - s(t))\,\mathbf{R}_0 + s(t)\,\mathbf{R}_f$$

the intermediate matrices $\mathbf{R}(t)$ will generally *not* be valid rotation matrices -- they will have columns that are not unit length, not orthogonal, and possibly have determinant different from 1. This means the interpolated "rotation" physically represents a deformation (stretching, shearing) of the end-effector frame, which is nonsensical.

**Correct approaches for orientation interpolation:**

1. **Euler angle interpolation**: Decompose $\mathbf{R}_0$ and $\mathbf{R}_f$ into Euler angles $(\alpha, \beta, \gamma)$ and interpolate each angle independently. Simple but suffers from gimbal lock when $\beta = \pm 90°$.

2. **Angle-axis interpolation**: Compute $\mathbf{R}_{0 \to f} = \mathbf{R}_0^\mathsf{T}\mathbf{R}_f$, extract the equivalent angle $\phi$ and axis $\hat{k}$, then interpolate the angle: $\mathbf{R}(t) = \mathbf{R}_0 \cdot \text{Rot}(\hat{k}, s(t)\phi)$.

3. **Quaternion interpolation (SLERP)**: Convert to unit quaternions $\mathbf{q}_0$ and $\mathbf{q}_f$, then use Spherical Linear Interpolation. This is the preferred method in most modern implementations because it is singularity-free, produces constant angular velocity, and is numerically stable.

**Reference**: Craig, *Introduction to Robotics*, Chapter 7; also Siciliano et al., *Robotics: Modelling, Planning and Control*, Chapter 3.

### [ENRICHMENT] Alternative Explanation: The Singularity Problem in Cartesian Trajectories
<!-- enrichment-type: explanation -->

The slides mention that the Cartesian scheme "fails in case the manipulator is in a singular configuration." This is one of the most important practical limitations of Cartesian-space trajectory planning.

**What happens at a singularity**: At a singular configuration, the Jacobian matrix $\mathbf{J}$ loses rank (its determinant becomes zero). Since we need $\dot{\boldsymbol{q}} = \mathbf{J}^{-1}\dot{\boldsymbol{x}}$, the inverse $\mathbf{J}^{-1}$ does not exist. Physically, this means:

1. **Near a singularity**: $\mathbf{J}^{-1}$ exists but has very large entries, meaning small Cartesian velocities require enormous joint velocities. The robot would need to spin its joints extremely fast to maintain the desired end-effector path.

2. **At a singularity**: One or more joint velocities become infinite -- the trajectory is physically impossible to execute.

**Practical consequences**: If a Cartesian trajectory passes through or near a singular configuration:
- Joint velocity limits will be exceeded
- The robot controller will either slow down (degrading the trajectory) or trigger an emergency stop
- Torque limits may be exceeded, potentially damaging the robot

**Mitigation strategies**:
- Plan Cartesian paths that avoid singular configurations
- Use the *damped least-squares* (DLS) pseudo-inverse $\mathbf{J}^{\dagger} = \mathbf{J}^\mathsf{T}(\mathbf{J}\mathbf{J}^\mathsf{T} + \lambda^2\mathbf{I})^{-1}$ instead of $\mathbf{J}^{-1}$, which bounds joint velocities near singularities at the cost of deviating slightly from the desired Cartesian path
- Use redundant manipulators (more joints than task-space DOF) that can use their extra freedom to avoid singular postures

**Reference**: RoboDK Blog on Robot Singularities: [https://robodk.com/blog/robot-singularities/](https://robodk.com/blog/robot-singularities/)
