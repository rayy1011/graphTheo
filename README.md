# Tabing-Ilog Patrol Route Optimization

## Description

Python was used to implement a **Chinese Postman Problem (CPP)**-based model to optimize barangay patrol routes in Tabing-Ilog. The project models the barangay road network as an undirected weighted graph and applies the **Minimum Weight Perfect Matching (Blossom Algorithm)** to derive the shortest Eulerian patrol circuit. Operational constraints patrol speed, fuel capacity, shift duration, and traffic congestion, are then analyzed across the fleet of five barangay vehicles to determine maximum patrol coverage per 8-hour shift.

---

## Requirements

* Python 3.8+
* NetworkX
* NumPy
* Matplotlib

Install dependencies via:

```
pip install networkx numpy matplotlib
```

---

## Project Structure

```
tabing-ilog-patrol/
│
├── README.md
│
├── core/                          ← Foundational data & math modules
│   ├── Vehicle_Fleet_Data.py          # Vehicle specs, shift definitions, speed constants
│   ├── Traffic_Multiplier_Model.py    # Computes beta = 1 + p traffic scaling factor
│   ├── Minutes_per_Patrol_Cycle.py    # T_cycle = (D/v) * 60 * beta
│   ├── Fuel_per_Patrol_Cycle.py       # F_cycle = D * a0 * beta (speed-independent)
│   └── Operational_Constraints_Verification.py  # Validates all constraints across fleet
│
├── graph/                         ← CPP / road network logic
│   ├── CPP_Graph_Model.py             # Builds the 69-node, 82-edge road network graph
│   ├── Eulerian_Circuit_Extraction.py # Extracts the full CPP patrol circuit from HQ
│   ├── Minimum_Weight_Perfect_Matching.py  # Blossom algorithm on odd-degree nodes
│   └── Hotspot-Weighted_Edge_Cost.py  # Alpha-weighted CPP for crime hotspot avoidance
│
├── analysis/                      ← Operational analysis scripts
│   ├── Maximum_Cycles_per_8-Hour_Shift.py  # C_max = min(time limit, fuel limit)
│   ├── Cycles_Until_Full_Tank_Empty.py     # Speed-independent fuel range per vehicle
│   ├── Fuel_Cost_per_Shift.py             # Total fuel cost in Philippine Peso per shift
│   ├── Mid-Shift_Refuelling.py            # Optimal refuel stop count n* per vehicle
│   ├── Refueling_Gain_30kph.py            # Before/after cycle gain from refuelling
│   ├── Speed_vs_Loops.py                  # C_max comparison across 10/20/30 kph
│   ├── Objective_and_Optimal_Speed.py     # Derives crossover speed v* per vehicle
│   └── Binding_Constraint_30kph.py        # Flags Time-limited vs Fuel-limited per vehicle
│
├── figures/                       ← Chart/figure generation scripts (Figures 1–14)
│   ├── Figure_1_Cycle_Duration_10kph.py
│   ├── Figure_2_Cycle_Duration_20kph.py
│   ├── Figure_3_Cycle_Duration_30kph.py
│   ├── Figure_4_Fuel_per_Cycle.py
│   ├── Figure_5_Max_Cycles_10kph.py
│   ├── Figure_6_Max_Cycles_20kph.py
│   ├── Figure_7_Max_Cycles_30kph.py
│   ├── Figure_8_Midshift_Refuelling.py
│   ├── Figure_9_Cycles_Until_Tank_Empty.py
│   ├── Figure_10_Alpha_Sensitivity.py
│   ├── Figure_11_Fuel_Cost_Per_Shift.py
│   ├── Figure_12_Speed_vs_Max_Cycles.py
│   ├── Figure_13_Refueling_Gain.py
│   └── Figure_14_Binding_Constraint.py
│
├── FigImages/                       ← Pre-generated figure images (.png)
│   ├── Figure_1.png                   # Cycle duration at 10 kph
│   ├── Figure_2.png                   # Cycle duration at 20 kph
│   ├── Figure_3.png                   # Cycle duration at 30 kph
│   ├── Figure_4.png                   # Fuel per cycle
│   ├── Figure_5.png                   # Max cycles at 10 kph
│   ├── Figure_6.png                   # Max cycles at 20 kph
│   ├── Figure_7.png                   # Max cycles at 30 kph
│   ├── Figure_8.png                   # Mid-shift refuelling
│   ├── Figure_9.png                   # Cycles until tank empty
│   ├── Figure_10_Alpha_sensitivity.png # Hotspot weight (α) sensitivity analysis
│   ├── Figure_11 (fuel cost per shift).png
│   ├── Figure_12 (speed vs max cycles).png
│   ├── Figure_13 (Refueling Gain).png
│   ├── Figure_14 (Binding Constraint).png
│   ├── Minute_per_cycle_figure_2_20kph.png
│   ├── Fuel_per_cycle.png
│   ├── Cycle_until_tank_empty.png
│   ├── CPP_trail.png                  # Rendered CPP patrol trail on the road network
│   ├── Tabing_ilog.png                # Base map of Tabing-Ilog
│   └── Map2.png                       # Annotated road network map
│
└── Outputs/                       ← Pre-computed console output logs (.txt)
    ├── CPP summary.txt                # Network summary and CPP tour length
    ├── Eulerian Circuit Extraction.txt
    ├── Structural Properties.txt      # Graph structural properties
    ├── Vehicle Fleet Data.txt
    ├── Traffic Multiplier Model.txt
    ├── Operational Constraints Verification.txt
    ├── Minutes per Cycle.txt
    ├── Fuel per patrol Cycle.txt
    ├── Maximum Cycles per 8 hour shift.txt
    ├── Midshift Refuelling.txt
    ├── Cycle until tank is empty.txt
    ├── Objective and Optimal Speed.txt
    └── Hotspot weighted Edge Cost.txt
```

---

## How to Run

### 1. Start with the graph model

Run the CPP solver first to verify the network structure and compute the optimal patrol route distance (9,878.5 m):

```
python graph/CPP_Graph_Model.py
python graph/Eulerian_Circuit_Extraction.py
python graph/Minimum_Weight_Perfect_Matching.py
```

Expected output: network summary (69 nodes, 82 edges), matched odd-degree node pairs, total CPP tour length of 9,878.5 m.

### 2. Run the core modules

These establish the vehicle fleet data and validate all operational constraints before analysis:

```
python core/Vehicle_Fleet_Data.py
python core/Traffic_Multiplier_Model.py
python core/Operational_Constraints_Verification.py
```

Expected output: fleet summary table, traffic multiplier table, and a constraint verification pass message across all speeds, shifts, and vehicles.

### 3. Run the analysis scripts

These compute patrol cycle limits, fuel costs, refuelling gains, and optimal speed recommendations:

```
python analysis/Maximum_Cycles_per_8-Hour_Shift.py
python analysis/Objective_and_Optimal_Speed.py
python analysis/Mid-Shift_Refuelling.py
python analysis/Binding_Constraint_30kph.py
```

Expected output: C_max tables per speed, v* crossover speeds per vehicle, optimal refuel stop counts, and binding constraint labels (T/F) per vehicle.

### 4. Generate the figures

Each figure script is self-contained and can be run individually:

```
python figures/Figure_7_Max_Cycles_30kph.py
python figures/Figure_14_Binding_Constraint.py
```

All 14 figures can be generated by running each script in the `figures/` folder. Pre-generated versions of all figures are already available in the `Figures/` folder.

---

## Outputs

Pre-computed output logs are available in the `Outputs/` folder. Figures 1–14 are generated as `.png` files by the scripts in `figures/` and pre-generated versions are saved in the `Figures/` folder. Key outputs include:

| Figure | File | Description |
|--------|------|-------------|
| Figures 1–3 | `Figure_1.png` – `Figure_3.png` | Cycle duration (minutes) at 10, 20, and 30 kph across traffic conditions |
| Figures 5–7 | `Figure_5.png` – `Figure_7.png` | Maximum patrol cycles per 8-hour shift at each speed |
| Figure 9 | `Figure_9.png` | Fuel range — cycles until full tank is empty, per vehicle |
| Figure 10 | `Figure_10_Alpha_sensitivity.png` | Hotspot penalty weight (α) sensitivity analysis |
| Figure 11 | `Figure_11 (fuel cost per shift).png` | Fuel cost per shift in Philippine Peso (₱58.50/L, DOE March 2026) |
| Figure 13 | `Figure_13 (Refueling Gain).png` | Refueling gain: cycles with vs. without mid-shift refuelling |
| Figure 14 | `Figure_14 (Binding Constraint).png` | Binding constraint map — Time-limited (T) vs. Fuel-limited (F) per vehicle |
| — | `CPP_trail.png` | Rendered Eulerian patrol circuit overlaid on the road network |
| — | `Tabing_ilog.png` / `Map2.png` | Base and annotated maps of Tabing-Ilog |

---

## Vehicle Fleet

| Vehicle | Role | km/L | Tank |
|---------|------|------|------|
| Aerox (Chief) | Chief ng Tanod | 40 | 5.5 L |
| Bajaj CT110 | Patrol 1 | 71 | 11.0 L |
| Suzuki GD | Patrol 2 | 11 | 9.2 L |
| Suzuki APV | Support Van | 11 | 46.0 L |
| Nissan NV350 | Transport | 13 | 65.0 L |

---

## Key Parameters

| Parameter | Value |
|-----------|-------|
| CPP Patrol Route Distance | 9,878.5 m (9.8785 km) |
| Shift Duration | 480 min (8 hours) |
| Candidate Patrol Speeds | 10, 20, 30 kph |
| Traffic Conditions | No Traffic, Morning, Afternoon, Night |
| Traffic Multiplier (β) | β = 1 + p, where p = congestion fraction |
| Recommended Speed | 30 kph |
| Recommended Hotspot Weight (α) | 100 |
| Fuel Price Reference | ₱58.50/L (DOE Philippines, March 2026) |

---

## Members

* Baltazar, Rigor Joseph M.
* Gapac, Richmond D.
* Lacuna, Andrew Gabriel E.
* Macatangay, James Adrian S.
* Prestosa, John Simon D. J.
* Sumodlayon, Josue Rolbryon M.

---

## Notes

* All scripts in `core/` and `graph/` are designed to run independently with no external imports between folders.
* Several `analysis/` scripts self-contain the vehicle and shift data locally so they can run standalone, this is intentional.
* The road network consists of **69 nodes** and **82 edges** representing the full street layout of Tabing-Ilog.
* Fuel consumption per cycle is **speed-independent**, the same litres are consumed at 10, 20, or 30 kph for the same route distance.
* The hotspot-weighted CPP (α sensitivity) is in `graph/Hotspot-Weighted_Edge_Cost.py`, the recommended α value is **100**, which achieves full redirection of all 6 corrective path pairs without inflating patrol distance.
* Pre-generated figure images are stored in `Figures/` and do not require running the figure scripts to view.
* Pre-computed console output logs are stored in `Outputs/` for reference without re-running the scripts.
