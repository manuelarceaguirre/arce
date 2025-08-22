# The H100 prereqs

# From sand to server
So quoting AJ KUORABI https://chipchatter.substack.com/p/the-real-bottleneck-in-gpu-manufacturing#footnote-1-149769846

Here are three basic parts of making a GPU1:

Silicon Wafer Production 

Producing the silicon wafers on which the chips are made. 

Die Fabrication 

Includes conducting lithography, deposition, and etching on the silicon wafers. This is to produce dies, which are the most important part of a chip and can be thought of as the brains. 

Packaging 

Takes dies from a wafer and places them within a package. This then makes a chip. In other words, packaging puts the brain into a skull and gives it a body with a nervous system and muscles to interact with the world. 

Idea #1: Trace ALL the parts necessary for an H100

So let's try to do that:

## NVIDIA H100 Tensor Core GPU
### Component Tiering:
| **Component (Tier 1)**         | **Supplier (Company)**       | **Key Facility & Location**               | **Confidence**  | **Sources** |
| ------------------------------ | ---------------------------- | ----------------------------------------- | --------------- | ----------- |
| **GH100 GPU Die** (TSMC 4N)    | TSMC (Foundry)               | Fab 18 (Tainan, Taiwan) – 5nm/4N GigaFab  | 5/5 (Confirmed) | NVIDIA/TSMC |
| **HBM3 Memory Stack (16GB)**   | SK Hynix (Memory)            | M16 DRAM Fab (Icheon, Gyeonggi, S. Korea) | 4/5 (High)      | The Elec    |
| **CoWoS Silicon Interposer**   | TSMC / UMC (Foundry assist)  | TSMC Advanced Packaging & UMC Fab (40 nm) | 3/5 (Moderate)  | The Elec    |
| **Package Substrate (FC-BGA)** | Ibiden Co., Ltd. (Substrate) | Ogaki Plant (Gifu Prefecture, Japan)      | 4/5 (High)      | Wccftech    |

We can retroactively name all the different parts into a tiering system or a depth system where each depth would mean something like

Tier 0: Final Assembly (NVIDIA H100 SXM5 Module)
Tier 1: Core Silicon & Packaging (GPU Die, HBM3 Stacks, CoWoS Interposer, Package Substrate)
Tier 2: Board-Level Active Components (VRM/Power Stages, PMICs, MCUs, PCIe Retimers)
Tier 3: PCB & Connectors (Main Circuit Board, High-Density Connectors)
Tier 4: Mechanical & Thermal (Vapor Chamber, Heatsink, Stiffening Bracket, TIM)
Tier 5: Passives & Other (MLCCs, Inductors, Resistors, Crystals)
Tier 6: Upstream Materials & Chemicals (Wafers, Leadframes, Epoxy, ABF Film, Solder)
Tier 7: Process Consumables (Gases, Slurries, Photoresists, Solvents)
Tier 8: Raw Materials (Silicon Metal, Copper Ore, Crude Oil, Lithium Brine, etc.)

Each component could be traced like this:
▢ 300 mm prime silicon wafers – SUMCO (Yonezawa, JP), GlobalWafers (Sherman, US) - Destination TSMC Facility in Taiwan
1. Raw Quartz, Spruce Pine, NC, USA
2. Refiners: 

| Refiner               | Location      | Supplies To                       | Likely Quartz Source      |
| --------------------- | ------------- | --------------------------------- | ------------------------- |
| Tokuyama Corporation  | Japan         | SUMCO (Yonezawa, JP)              | Spruce Pine (NC) + others |
| Mitsubishi Materials  | Japan         | SUMCO                             | Spruce Pine / global HPQ  |
| Wacker Chemie         | Germany / USA | SUMCO, GlobalWafers               | Spruce Pine (via Sibelco) |
| Hemlock Semiconductor | Michigan, USA | GlobalWafers (Sherman, TX), SUMCO | Spruce Pine quartz        |
| OCI                   | South Korea   | GlobalWafers (Taiwan / US)        | Spruce Pine, others       |

▢ EUV/DUV photomasks & pellicles (Toppan, Photronics)
▢ Photoresists, developers, etchants (JSR, Fujifilm, Dow)
▢ Process metals & dielectrics (Cu, Co, W, TaN, low-k SiOC, etc.)
▢ Specialty gases (NF₃, CF₄, BCl₃, H₂, Ar)
▢ CMP slurries & pads (Cabot, DuPont)
▢ EUV scanners (ASML NXE-3600 class)
1 Logic & Memory Silicon
| Item                                        | Function                         | Key Supplier(s)                        | Note                                                           |
| ------------------------------------------- | -------------------------------- | -------------------------------------- | -------------------------------------------------------------- |
| **GH100 compute die**                       | 80 bn-transistor GPU (4 nm “4N”) | **TSMC Fab 18**, Tainan, TW            | Die size \~814 mm²([NVIDIA Developer][1])                      |
| **HBM3 memory stacks (5 active + 1 spare)** | 16 GB @ >800 GB/s per stack      | **SK hynix** (Cheongju/Icheon, KR)     | Sole qualified HBM3 for H100 to date([SK hynix Newsroom -][2]) |
| Silicon interposer (CoWoS-S)                | 2.5-D bridge between GPU & HBM   | **TSMC Advanced Backend**, Zhunan (TW) | Up to 3 TB/s aggregate BW([Tom's Hardware][3])                 |







    1. Raw Quarts (Silica Sand) or Silicon Dioxide
        Even though this is one of the most abundant minerals in earth, this one has to be of extremely high purity, very low trace metals
        This would come from Spruce Pine, North Carolina, USA literally guys in trucks mine it from the mountains. Apparently this is the place where quartz are the purest in the world so they are responsible for 70 to 90% of the global semiconductor grade quartz? 
    So the Raw Quartz end up in Refiners
    2. Metallurgical-Grade Silicon
        Quartz is carbothermically reduced in an electric arc furnace (at ~1500–2000 °C) with carbon to produce metallurgical-grade silicon (≈96–99 % silicon)
    
1. From Sand to Polysilicon
Raw Quartz (Silica Sand)
It begins with high‑purity quartz, such as the ultra‑pure deposits from Spruce Pine, North Carolina, which supply the majority of industrial-grade silicon dioxide used for chipmaking 
Sand must be exceptionally low in impurities (e.g. iron, aluminum) to achieve wafer-grade purity 

Metallurgical-Grade Silicon
Quartz is carbothermically reduced in an electric arc furnace (at ~1500–2000 °C) with carbon to produce metallurgical-grade silicon (≈96–99 % silicon) 

Polysilicon via the Siemens Process
That silicon is further purified via the Siemens chemical-vapor-deposition process into electronic‑grade polysilicon (≥ 99.999999 % pure).

Alternatives like fluidized-bed reactor processes exist, but Siemens remains dominant 

2. Growing Single‑Crystal Ingot (Czochralski Process)
Polysilicon is melted in a high‑purity quartz crucible at about 1425 °C.

A seed crystal is dipped into the molten silicon, then slowly pulled upward and rotated to grow a single-crystal cylindrical ingot (boule). This is known as the Czochralski method 
Precise control of temperature, rotation, and pull rate is essential to yield a defect‑free monocrystal 
Wikipedia
.

Controlled amounts of dopants like boron or phosphorus can be added during growth to set resistivity for n‑type or p‑type silicon.

3. Wafer Slicing and Polishing
Ingot Conditioning
The ingot’s circumference is ground to a uniform diameter and ends trimmed to ensure crystal orientation and stability 
Wikipedia
+1
waferworld.com
+1
sumcosi.com
.

Slicing
Using diamond-coated wire saws or inner-diameter saws, the ingot is sliced into ~1 mm thick wafers. A carbon beam is often left attached and later removed to hold discs together during slicing 
sumcosi.com
+1
silybwafers.com
+1
.

Lapping and Grinding
Wafers are ground and polished (lapping) using alumina abrasives to reach target thickness and flatness specifications and to improve parallelism 
Wikipedia
+15
sumcosi.com
+15
sumcosi.com
+15
.

Polishing
Chemical–mechanical polishing (CMP) removes surface damage, achieving mirror-smooth, planar wafers ready for advanced use.

4. Epitaxial Layer (Optional)
For applications requiring ultra‑uniform doping or layered resistivity profiles, wafers undergo epitaxial deposition.

In a furnace (~1200 °C), gases like trichlorosilane (SiHCl₃) or silicon tetrachloride (SiCl₄) are introduced to grow a crystalline silicon film atop the wafer surface 
sumcosi.com
+1
Wikipedia
+1
.

5. Inspection, Packaging & Shipping
Finished wafers undergo stringent quality control: flatness, thickness tolerance, resistivity, defect density, micro-contamination.

Passing wafers are clean-room packed in FOUPs, then shipped—typically by air freight under climate‑controlled, vibration‑damped conditions—to fabs such as TSMC in Taiwan
        
        




▢ EUV/DUV photomasks & pellicles (Toppan, Photronics)
▢ Photoresists, developers, etchants (JSR, Fujifilm, Dow)
▢ Process metals & dielectrics (Cu, Co, W, TaN, low-k SiOC, etc.)
▢ Specialty gases (NF₃, CF₄, BCl₃, H₂, Ar)
▢ CMP slurries & pads (Cabot, DuPont)
▢ EUV scanners (ASML NXE-3600 class)
