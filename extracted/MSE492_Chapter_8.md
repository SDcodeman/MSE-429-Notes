# Chapter 8 -- Manipulator-Mechanism Design

> MSE 429 -- Advanced Kinematics for Robotics System

<!-- source: MSE492 - Chapter8.pdf#page=2 -->
## Overview

Topics covered in this chapter:

1. **Task-Based Design Requirements** -- Matching degrees of freedom to task needs; impact of symmetric tools and workspace considerations.
2. **Kinematic Configuration** -- Joint configurations: Cartesian, articulated, SCARA, spherical, cylindrical; design of wrist mechanisms with orthogonal and nonorthogonal axes.
3. **Quantitative Measures of Workspace Attributes** -- Efficiency of workspace design using structural length index $Q_L$; well-conditioned workspaces and manipulability measure $\mathcal{w}$.
4. **Redundant and Closed-Chain Structures** -- Applications and advantages of redundant manipulators; closed-loop structures like the Stewart mechanism.

---

<!-- source: MSE492 - Chapter8.pdf#page=3 -->
## Introduction

### Definitions

<!-- source: MSE492 - Chapter8.pdf#page=3 -->
- **Manipulator**: The robotic arm mechanism including internal (proprioceptive) sensors.
- **End-Effector**: The end-of-arm tooling attached to the manipulator.
- **External Sensors and Effectors**: Devices such as vision systems and part feeders that supplement the robot system.
- **Controller**: The computational unit that governs manipulator operation.

### Theorems & Properties

<!-- source: MSE492 - Chapter8.pdf#page=3 -->
- **Influence on Kinematic and Dynamic Analysis**: The structure of a manipulator affects both kinematic and dynamic analysis. Some configurations are easy to solve, while others lack closed-form solutions.
- **Performance Limitations**: Factors such as load capacity, speed, size of workspace, and repeatability limit a manipulator's performance.
- **Rigid-Body Dynamics**: Control of manipulators also depends on friction and flexibility of drive systems.

### Key Concepts

<!-- source: MSE492 - Chapter8.pdf#page=3 -->
**Elements of a Robot System** (Ch8-3):
1. The manipulator, including internal or proprioceptive sensors.
2. The end-effector, or end-of-arm tooling.
3. External sensors and effectors, such as vision systems and part feeders.
4. The controller.

**Iterative Process**: Designing a manipulator involves rethinking higher-level design decisions as new problems arise.

---

## Basing the Design on Task Requirements

### Definitions

<!-- source: MSE492 - Chapter8.pdf#page=4 -->
- **Universally Programmable**: Robots are designed to perform a variety of tasks but are often specialized for specific applications. (Ch8-4)
- **Degrees of Freedom (DOF)**: The number of DOF should match the number required by the task. Not all tasks require a full six DOF. (Ch8-4)
- **Redundant (for a task)**: A robot is considered redundant for a task when the tool has an axis of symmetry, allowing an infinite number of equivalent orientations. (Ch8-4)

<!-- source: MSE492 - Chapter8.pdf#page=5 -->
- **Symmetric-Tool Handling**: Imagining an extra "fictitious" joint along the tool's axis of symmetry can simplify positioning. Normally requires six degrees of freedom, but with the fictitious joint, only five real joints are needed. (Ch8-5)
- **Active Positioning Devices**: Devices like tilt/roll platforms that reduce the robot's required degrees of freedom. (Ch8-6)

<!-- source: MSE492 - Chapter8.pdf#page=9 -->
- **Positioning Structure**: The first three joints of a manipulator, which position the wrist point in space. (Ch8-9)
- **Orienting Structure (Wrist)**: The last $n - 3$ joints that orient the end-effector and have axes intersecting at the wrist point. (Ch8-9)
- **Wrist Point**: The point where the axes of the last $n - 3$ joints intersect. (Ch8-9)

### Worked Examples

<!-- source: MSE492 - Chapter8.pdf#page=4 -->
**Example -- Grinding Tool Redundancy** (Ch8-4):
- **Problem**: A manipulator positions a grinding tool in two different configurations.
- **Key Insight**: The orientation of the tool relative to its axis $\hat{Z}_T$ is irrelevant because the grinding wheel rotates at several hundred RPM. Since the tool can be positioned in an infinite number of ways by rotating around $\hat{Z}_T$, the robot is considered **redundant** for this task.
- **Conclusion**: Symmetric tools may reduce required DOF. Arc welding, spot welding, deburring, glueing, and polishing often employ end-effectors with at least one axis of symmetry.

<!-- source: MSE492 - Chapter8.pdf#page=5 -->
**Example -- Circuit Board Assembly** (Ch8-5):
- **Problem**: Placing components on circuit boards.
- **Solution**: Requires three degrees of freedom for planar movement ($x$, $y$, rotation) and a fourth for lifting/inserting parts ($z$). Total: 4 DOF.

<!-- source: MSE492 - Chapter8.pdf#page=6 -->
**Example -- Pipe Welding with Tilt/Roll Platform** (Ch8-6):
- **Problem**: Welding pipes using an active positioning device.
- **Solution**: A tilt/roll platform accounts for two degrees of freedom, theoretically allowing a 3-DOF robot for symmetric-tool tasks.

### Theorems & Properties

<!-- source: MSE492 - Chapter8.pdf#page=5 -->
- Many industrial robots have five degrees of freedom (5-DOF) due to the prevalence of symmetric tools. (Ch8-5)
- Tasks with fewer than six degrees of freedom are common in industry. (Ch8-5)

<!-- source: MSE492 - Chapter8.pdf#page=9 -->
- Most manipulators are designed so that the last $n - 3$ joints orient the end-effector and have axes that intersect at the wrist point, and the first three joints position this wrist point. (Ch8-9)

### Diagrams

<!-- source: MSE492 - Chapter8.pdf#page=4 -->
**Grinding Tool with Manipulator** (Ch8-4): Two side-by-side illustrations of a robotic arm (articulated manipulator with multiple revolute joints) holding a grinding wheel positioned against a surface in two different configurations. The grinding wheel is circular and shown in contact with a workpiece. Both poses achieve equivalent grinding despite different arm configurations, demonstrating the redundancy from tool symmetry about $\hat{Z}_T$.

<!-- source: MSE492 - Chapter8.pdf#page=6 -->
**Tilt/Roll Platform** (Ch8-6): Illustration of a robotic arm mounted above a tilt/roll platform. The platform holds a rectangular/box-shaped workpiece (pipe section). The platform provides two additional degrees of freedom (tilt and roll) to the overall manipulator system. The robot arm reaches down to the workpiece which is oriented by the platform below. Caption: "A tilt/roll platform provides two degrees of freedom to the overall manipulator system."

---

## Kinematic Configuration

### Definitions

<!-- source: MSE492 - Chapter8.pdf#page=7 -->
- **Load Capacity**: Depends upon the sizing of structural members, power-transmission system, and actuators. The load placed on actuators and drive system is a function of the configuration of the robot, the percentage of time supporting a load, and dynamic loading due to inertial- and velocity-related forces. (Ch8-7)

<!-- source: MSE492 - Chapter8.pdf#page=7 -->
- **Speed**: High speed offers advantages when a proposed robotic solution must compete on economic terms with hard automation or human workers. For some applications (e.g., welding, spray-painting), the process itself limits the speed rather than the manipulator. (Ch8-7)

### Theorems & Properties

<!-- source: MSE492 - Chapter8.pdf#page=7 -->
- The acceleration and deceleration phases take up most of the cycle time (e.g., in a pick-and-place scenario). Hence, **acceleration capability**, not just peak speed, is very important. (Ch8-7)

---

<!-- source: MSE492 - Chapter8.pdf#page=10 -->
## Cartesian Manipulator

### Definitions

<!-- source: MSE492 - Chapter8.pdf#page=10 -->
- **Cartesian Manipulator**: A manipulator where joints 1 through 3 are prismatic, mutually orthogonal, and correspond to the $X$, $Y$, and $Z$ Cartesian directions. (Ch8-10)
- **Gantry Robots**: Very large Cartesian robots that sometimes manipulate entire automobiles or inspect entire aircraft. (Ch8-10)

### Theorems & Properties

<!-- source: MSE492 - Chapter8.pdf#page=10 -->
- The inverse kinematic solution for this configuration is **trivial**. (Ch8-10)
- This configuration produces robots with **very stiff structures**. As a consequence, very large robots can be built. (Ch8-10)
- The first three joints are **decoupled**. This makes them simpler to design and prevents kinematic singularities due to the first three joints. (Ch8-10)

### Diagrams

<!-- source: MSE492 - Chapter8.pdf#page=10 -->
**Cartesian Manipulator** (Ch8-10): Two views of a Cartesian (gantry) manipulator. **Side view**: A vertical prismatic joint ($d_2$, vertical arrow) supports a horizontal prismatic joint ($d_3$, horizontal arrow) with a hatched rectangular moving platform. The structure sits on a rectangular base. **Top view**: Shows the horizontal prismatic joint ($d_1$, vertical arrow) and the $d_3$ joint (horizontal) from above, with the hatched rectangular platform visible. The three mutually orthogonal prismatic axes ($d_1$, $d_2$, $d_3$) correspond to Cartesian $X$, $Y$, $Z$.

---

<!-- source: MSE492 - Chapter8.pdf#page=11 -->
## Articulated Manipulator

### Definitions

<!-- source: MSE492 - Chapter8.pdf#page=11 -->
- **Articulated Manipulator**: Sometimes also called a **jointed**, **elbow**, or **anthropomorphic** manipulator. Typically consists of two "shoulder" joints (one for rotation about a vertical axis and one for elevation out of the horizontal plane), an "elbow" joint (whose axis is usually parallel to the shoulder elevation joint), and two or three wrist joints at the end of the manipulator. (Ch8-11)

### Theorems & Properties

<!-- source: MSE492 - Chapter8.pdf#page=11 -->
- Articulated robots **minimize the intrusion** of the manipulator structure into the workspace, making them capable of reaching into confined spaces. (Ch8-11)
- They require **much less overall structure** than Cartesian robots, making them less expensive for applications needing smaller workspaces. (Ch8-11)

### Diagrams

<!-- source: MSE492 - Chapter8.pdf#page=11 -->
**Articulated Manipulator** (Ch8-11): Two views. **Side view**: A base with a vertical revolute joint, a shoulder joint ($\theta_2$) providing elevation, and an elbow joint ($\theta_3$). The arm extends upward and outward with hatched links. **Top view**: Shows the circular swept workspace (hatched annular region) from above, with the base revolute joint ($\theta_1$) visible at the center. The workspace is a large circular/annular region around the base. The arm links and joint angles $\theta_1$, $\theta_2$, $\theta_3$ are labeled.

---

<!-- source: MSE492 - Chapter8.pdf#page=12 -->
## SCARA Manipulator

### Definitions

<!-- source: MSE492 - Chapter8.pdf#page=12 -->
- **SCARA Manipulator**: Has three parallel revolute joints (allowing it to move and orient in a plane), with a fourth prismatic joint for moving the end-effector normal to the plane. (Ch8-12)

### Theorems & Properties

<!-- source: MSE492 - Chapter8.pdf#page=12 -->
- The first three joints do **not** have to support any of the weight of the manipulator or the load. (Ch8-12)
- Link 0 can easily house the actuators for the first two joints. The actuators can be made very large, so the robot can move very fast. (Ch8-12)
- One SCARA manipulator can move at up to **30 feet per second**, about 10 times faster than most articulated industrial robots. (Ch8-12)

### Diagrams

<!-- source: MSE492 - Chapter8.pdf#page=12 -->
**SCARA Manipulator** (Ch8-12): Two views. **Side view**: A base supports two horizontal links connected by revolute joints, with a vertical prismatic joint ($d_3$, downward arrow) at the end for vertical motion. The links move in a horizontal plane. **Top view**: Shows the circular workspace from above. The first revolute joint ($\theta_1$) is at the base, the second revolute joint ($\theta_2$) connects the two links. The workspace is an annular region swept by the two-link planar arm.

---

<!-- source: MSE492 - Chapter8.pdf#page=13 -->
## Spherical Manipulator

### Definitions

<!-- source: MSE492 - Chapter8.pdf#page=13 -->
- **Spherical Manipulator**: Has many similarities to the articulated manipulator, but with the elbow joint replaced by a prismatic joint. The link that moves prismatically might telescope or even "stick out the back" when retracted. (Ch8-13)

### Diagrams

<!-- source: MSE492 - Chapter8.pdf#page=13 -->
**Spherical Manipulator** (Ch8-13): Two views. **Side view**: A base with a vertical revolute joint, an elevation revolute joint ($\theta_2$), and a telescoping prismatic joint ($d_3$, horizontal arrow) extending from the shoulder. The arm can extend/retract radially. **Top view**: Shows the workspace from above as an annular/circular region with the revolute joint $\theta_1$ at the center. The swept area has hatched shading showing the reachable workspace.

---

<!-- source: MSE492 - Chapter8.pdf#page=13 -->
## Cylindrical Manipulator

### Definitions

<!-- source: MSE492 - Chapter8.pdf#page=13 -->
- **Cylindrical Manipulator**: Consists of a prismatic joint for translating the arm vertically ($d_2$), a revolute joint with a vertical axis ($\theta_1$), another prismatic joint ($d_3$) orthogonal to the revolute joint axis, and finally a wrist of some sort. (Ch8-13)

### Diagrams

<!-- source: MSE492 - Chapter8.pdf#page=13 -->
**Cylindrical Manipulator** (Ch8-13): Two views. **Side view**: A vertical base column with a vertical prismatic joint ($d_2$, downward arrow) and a horizontal prismatic joint ($d_3$, horizontal arrow) extending from it. **Top view**: Shows the circular workspace from above, with the revolute joint ($\theta_1$) at the center and the radial prismatic joint ($d_3$) sweeping an annular region. The workspace is a hatched annular ring.

---

<!-- source: MSE492 - Chapter8.pdf#page=14 -->
## Quantitative Measures of Workspace Attributes

### Definitions

<!-- source: MSE492 - Chapter8.pdf#page=14 -->
- **Length Sum** ($L$): A rough measure of the "length" of the complete linkage, defined as:

$$L = \sum_{i=1}^{N} (a_{i-1} + d_i)$$

where $a_{i-1}$ and $d_i$ are the link length and joint offset as defined in Chapter 3. For prismatic joints, $d_i$ must be interpreted as a constant equal to the length of travel between the joint-travel limits. (Ch8-14)

<!-- source: MSE492 - Chapter8.pdf#page=14 -->
- **Structural Length Index** ($Q_L$): Defined as the ratio of the manipulator's length sum to the cube root of the workspace volume:

$$Q_L = \frac{L}{\sqrt[3]{w}}$$

where $w$ is the volume of the manipulator's workspace. **Good designs have low $Q_L$**. (Ch8-14)

### Theorems & Properties

<!-- source: MSE492 - Chapter8.pdf#page=15 -->
- **Optimal $Q_L$ for Cartesian Manipulator**: The value of $Q_L$ is minimized when all three joints have the same length of travel. This minimal value is $Q_L = 3$. (Ch8-15)

<!-- source: MSE492 - Chapter8.pdf#page=15 -->
- **Optimal $Q_L$ for Articulated Manipulator**:

$$Q_L = \frac{1}{\sqrt[3]{4\pi/3}} \cong 0.62$$

(Ch8-15)

### Key Equations

<!-- source: MSE492 - Chapter8.pdf#page=14 -->
1. **Length Sum**:
$$L = \sum_{i=1}^{N} (a_{i-1} + d_i)$$

<!-- source: MSE492 - Chapter8.pdf#page=14 -->
2. **Structural Length Index**:
$$Q_L = \frac{L}{\sqrt[3]{w}}$$

### Worked Examples

<!-- source: MSE492 - Chapter8.pdf#page=15 -->
**Example -- SCARA Manipulator $Q_L$** (Ch8-15):

**Problem**: A SCARA manipulator has links 1 and 2 of equal length $l/2$, and the range of motion of prismatic joint 3 is given by $d_3$. Assume joint limits are absent. Find $Q_L$. What value of $d_3$ minimizes $Q_L$ and what is this minimal value?

**Solution**:

**Step 1 -- Compute the length sum:**

$$L = \frac{l}{2} + \frac{l}{2} + d_3 = l + d_3$$

**Step 2 -- Compute the workspace volume:**
The workspace is a right cylinder of radius $l$ and height $d_3$. Therefore:

$$w = \pi l^2 d_3$$

**Step 3 -- Write $Q_L$:**

$$Q_L = \frac{l + d_3}{\sqrt[3]{\pi l^2 d_3}}$$

**Step 4 -- Minimize $Q_L$ as a function of the ratio $d_3 / l$:**
Optimization gives $d_3 = \dfrac{l}{2}$ as the optimal value.

**Step 5 -- Compute the minimal $Q_L$:**
The corresponding minimal value of $Q_L$ is **1.29**.

---

<!-- source: MSE492 - Chapter8.pdf#page=16 -->
## Designing Well-Conditioned Workspaces

### Definitions

<!-- source: MSE492 - Chapter8.pdf#page=16 -->
- **Singular Points**: Points where a manipulator loses one or more degrees of freedom. Certain tasks may not be performed effectively at these points. (Ch8-16)

<!-- source: MSE492 - Chapter8.pdf#page=17 -->
- **Manipulability Ellipsoids**: Graphical measures that help evaluate workspace conditioning; related to how uniformly a manipulator can move and apply forces. (Ch8-17)
- **Inertia Ellipsoids**: Graphical measures that evaluate how well a manipulator can accelerate in various Cartesian directions. (Ch8-17)

### Theorems & Properties

<!-- source: MSE492 - Chapter8.pdf#page=16 -->
- A manipulator loses one or more degrees of freedom at singular points. (Ch8-16)
- Actions of the manipulator **near** singular points may be poorly conditioned. The manipulator's ability to move and apply forces uniformly is compromised. (Ch8-16)
- The **farther** the manipulator is from singular points, the better it can move uniformly and apply forces in all directions. (Ch8-16)

<!-- source: MSE492 - Chapter8.pdf#page=17 -->
- Various measures have been suggested to quantify the effects of singularities. These measures can help design a manipulator with a maximally large, well-conditioned subspace of the workspace. (Ch8-17)
- Using these measures during design can improve the manipulator's overall performance by avoiding poorly conditioned regions. (Ch8-17)

---

<!-- source: MSE492 - Chapter8.pdf#page=18 -->
## Manipulability Measure

### Definitions

<!-- source: MSE492 - Chapter8.pdf#page=18 -->
- **Singular Configurations**: Found by solving $\det(\mathbf{J}(\Theta)) = 0$. (Ch8-18)

- **Manipulability Measure** ($\mathcal{w}$): A measure of manipulator dexterity defined as:

$$\mathcal{w} = \sqrt{\det(\mathbf{J}(\Theta)\,\mathbf{J}^\top(\Theta))}$$

which, for **nonredundant** manipulators, reduces to:

$$\mathcal{w} = |\det(\mathbf{J}(\Theta))|$$

(Ch8-18)

### Theorems & Properties

<!-- source: MSE492 - Chapter8.pdf#page=18 -->
- A good manipulator design has **large areas** of its workspace characterized by **high values** of $\mathcal{w}$. (Ch8-18)
- At singular configurations, $\mathcal{w} = 0$. (Ch8-18)

### Key Equations

<!-- source: MSE492 - Chapter8.pdf#page=18 -->
3. **Singularity condition**:
$$\det(\mathbf{J}(\Theta)) = 0$$

4. **Manipulability measure (general)**:
$$\mathcal{w} = \sqrt{\det(\mathbf{J}(\Theta)\,\mathbf{J}^\top(\Theta))}$$

5. **Manipulability measure (nonredundant)**:
$$\mathcal{w} = |\det(\mathbf{J}(\Theta))|$$

---

<!-- source: MSE492 - Chapter8.pdf#page=19 -->
## Manipulability via Acceleration Analysis -- Asada's Approach

### Definitions

<!-- source: MSE492 - Chapter8.pdf#page=19 -->
- **Cartesian Mass Matrix**: Defined as:

$$\mathbf{M}_x(\Theta) = \mathbf{J}^{-\top}(\Theta)\,\mathbf{M}(\Theta)\,\mathbf{J}^{-1}(\Theta)$$

This serves as a measure of how well the manipulator can accelerate in various Cartesian directions. (Ch8-19)

- **Inertia Ellipsoid**: A graphic representation of the Cartesian mass matrix, given by:

$$\mathbf{X}^\top \mathbf{M}_x(\Theta)\,\mathbf{X} = 1$$

(Ch8-19)

### Theorems & Properties

<!-- source: MSE492 - Chapter8.pdf#page=19 -->
- The inertia ellipsoid equation represents an $n$-dimensional ellipse, where $n$ is the dimension of $\mathbf{X}$. (Ch8-19)
- The **axes** of the ellipsoid lie in the directions of the **eigenvectors** of $\mathbf{M}_x(\Theta)$. (Ch8-19)
- The **reciprocals of the square roots** of the corresponding eigenvalues provide the **lengths** of the axes of the ellipsoids. (Ch8-19)
- **Well-conditioned points** in the manipulator workspace are characterized by inertia ellipsoids that are **spherical** (or nearly so). (Ch8-19)

### Key Equations

<!-- source: MSE492 - Chapter8.pdf#page=19 -->
6. **Cartesian Mass Matrix**:
$$\mathbf{M}_x(\Theta) = \mathbf{J}^{-\top}(\Theta)\,\mathbf{M}(\Theta)\,\mathbf{J}^{-1}(\Theta)$$

7. **Inertia Ellipsoid**:
$$\mathbf{X}^\top \mathbf{M}_x(\Theta)\,\mathbf{X} = 1$$

### Worked Examples

<!-- source: MSE492 - Chapter8.pdf#page=20 -->
**Example -- Planar Two-Link RR Manipulator Inertia Ellipsoids** (Ch8-20):

**Problem**: Consider a planar two-link RR manipulator. Find the inertia ellipsoids across the workspace.

**Solution**: The inertia ellipsoids are computed at various points in the workspace using the Cartesian mass matrix $\mathbf{M}_x(\Theta) = \mathbf{J}^{-\top}(\Theta)\,\mathbf{M}(\Theta)\,\mathbf{J}^{-1}(\Theta)$. The resulting ellipsoids vary across the workspace, becoming more elongated (less spherical) near singular configurations and more circular (well-conditioned) in the central regions.

**Reference**: Asada, Haruhiko. "Dynamic analysis and design of robot manipulators using inertia ellipsoids." Proceedings. 1984 IEEE International Conference on Robotics and Automation. Vol. 1. IEEE, 1984.

### Diagrams

<!-- source: MSE492 - Chapter8.pdf#page=20 -->
**Workspace of a 2-DOF Planar Arm with Inertia Ellipsoids** (Ch8-20): A kidney/crescent-shaped workspace (dashed outline) of a planar 2-link RR arm. Multiple small ellipses are drawn at various positions throughout the workspace. Near the center/base of the workspace, the ellipses are more nearly circular (indicating well-conditioned, isotropic acceleration capability). Toward the boundaries of the workspace (near singularities where the arm is fully extended or fully folded), the ellipses become highly elongated (indicating poor conditioning -- the manipulator can accelerate easily in one direction but poorly in the perpendicular direction). The base of the arm is located at the inner cusp of the crescent shape.

---

<!-- source: MSE492 - Chapter8.pdf#page=21 -->
## Redundant and Closed-Chain Structures

### Definitions

<!-- source: MSE492 - Chapter8.pdf#page=21 -->
- **Redundant Manipulators**: Manipulators with more than six degrees of freedom. They offer benefits like micromanipulation and avoiding singular configurations. Additional joints can also help a mechanism avoid singular configurations. (Ch8-21)

- **Closed-Loop Structures**: Kinematic chains where at least one loop is formed, as opposed to serial (open-chain) linkages. (Ch8-21)

- **Stewart Mechanism (Stewart Platform)**: A closed-loop alternative to the serial 6-DOF manipulator that controls the position and orientation of the end-effector using six linear actuators. (Ch8-21)

### Theorems & Properties

<!-- source: MSE492 - Chapter8.pdf#page=21 -->
- **Stewart Mechanism -- Actuator Connections**: Actuators are connected to the base with two-degree-of-freedom universal joints and to the end-effector with three-degree-of-freedom ball-and-socket joints. (Ch8-21)
- **Stewart Mechanism -- Characteristics**: The mechanism is very **stiff** due to its closed-loop structure but has a more **limited range of motion** compared to serial linkages. (Ch8-21)
- **Stewart Mechanism -- Kinematic Solutions**: The **inverse** kinematic solution is **simple**, whereas the **forward** kinematic solution is **complex** and often lacks a closed-form formulation. (Ch8-21)

### Diagrams

<!-- source: MSE492 - Chapter8.pdf#page=21 -->
**Stewart Mechanism** (Ch8-21): A 3D illustration of a Stewart platform (hexapod). The structure shows a top platform labeled "End-effector" connected to a bottom "Base" by six linear actuators (labeled $d_1$ through $d_6$). The actuators are arranged symmetrically in pairs, each connecting a point on the base to a point on the end-effector platform. The actuators form a roughly conical/trapezoidal arrangement. Universal joints (2-DOF) connect each actuator to the base, and ball-and-socket joints (3-DOF) connect each actuator to the end-effector. The base is wider than the end-effector platform.

---

## Summary of Key Equations

| # | Equation | Description | Source |
|---|----------|-------------|--------|
| 1 | $L = \sum_{i=1}^{N} (a_{i-1} + d_i)$ | Length sum of manipulator | Ch8-14 |
| 2 | $Q_L = \dfrac{L}{\sqrt[3]{w}}$ | Structural length index | Ch8-14 |
| 3 | $\det(\mathbf{J}(\Theta)) = 0$ | Singularity condition | Ch8-18 |
| 4 | $\mathcal{w} = \sqrt{\det(\mathbf{J}(\Theta)\,\mathbf{J}^\top(\Theta))}$ | Manipulability measure (general) | Ch8-18 |
| 5 | $\mathcal{w} = \lvert\det(\mathbf{J}(\Theta))\rvert$ | Manipulability measure (nonredundant) | Ch8-18 |
| 6 | $\mathbf{M}_x(\Theta) = \mathbf{J}^{-\top}(\Theta)\,\mathbf{M}(\Theta)\,\mathbf{J}^{-1}(\Theta)$ | Cartesian mass matrix | Ch8-19 |
| 7 | $\mathbf{X}^\top \mathbf{M}_x(\Theta)\,\mathbf{X} = 1$ | Inertia ellipsoid | Ch8-19 |

## Summary of Optimal $Q_L$ Values

| Configuration | Optimal $Q_L$ | Condition | Source |
|---------------|---------------|-----------|--------|
| Cartesian | $3$ | All three joints have equal travel | Ch8-15 |
| Articulated | $\approx 0.62$ | $\frac{1}{\sqrt[3]{4\pi/3}}$ | Ch8-15 |
| SCARA | $1.29$ | $d_3 = l/2$ (links of length $l/2$ each) | Ch8-15 |
