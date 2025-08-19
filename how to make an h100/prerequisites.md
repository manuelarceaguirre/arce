# Prerequisites

# **Curriculum: Understanding GPUs (H100 Case Study)**
Architecture generations in this case define the GPU Model. The Hopper Architecture defines the name H100. But when we say an H100 gpu what exactly are we refering to:
So there are 2 main variants on this gpu the PCIe based and the HGX based:

Architecture generations — NVIDIA’s naming (Hopper for H100, Ampere for A100, etc.) | Generation                 | Year Released | Example GPU Models  | Key Innovations                               |
| -------------------------- | ------------- | ------------------- | --------------------------------------------- |
| **Volta**                  | 2017          | V100                | First Tensor Cores, HBM2 memory               |
| **Turing**                 | 2018          | RTX 2080, T4        | Real-time ray tracing, INT8/INT4 inference    |
| **Ampere**                 | 2020          | A100, RTX 30 series | 3rd-gen Tensor Cores, HBM2e, PCIe 4.0         |
| **Hopper**                 | 2022          | H100                | Transformer Engine (for AI), HBM3, NVLink 4.0 |
| **Blackwell** *(upcoming)* | 2025          | B100 (rumored)      | Even faster interconnects, FP8 AI support     |

| Variant Family   | Variant       | Form Factor | Memory (per GPU) | GPUs per Board | Power (TDP)      | Cooling        | Best For                        | Example Deployment               |
|------------------|--------------|-------------|------------------|----------------|------------------|----------------|----------------------------------|-----------------------------------|
| **PCIe-based**   | H100 PCIe    | PCIe Gen5 x16 card | 80 GB HBM3       | 1              | ~350–400 W       | Air or liquid  | General AI, smaller training     | Dell PowerEdge, Supermicro        |
|                  | H100 NVL     | Dual-GPU PCIe board | 94 GB HBM3       | 2              | ~300–350 W per GPU (~600–700 W total) | Air or liquid  | LLM inference, high VRAM         | NVIDIA-certified inference servers|
|                  | H100 CNX     | PCIe Gen5 card + ConnectX-7 NIC | 80 GB HBM3 | 1 | ~350–400 W | Air or liquid | Multi-node AI, low-latency links | HPC clusters, InfiniBand AI nodes |
| **HGX-based**    | H100 SXM5    | SXM5 module (for HGX) | 80 GB HBM3       | 1              | 700–900 W        | Liquid or high-end air | Large-scale AI training          | NVIDIA DGX H100, AWS p5           |


# SXM (Server eXpress Module) — socketed GPU module used in high-end servers, e.g., SXM5
    this is a high performance socketed gpu module designed for data center servers, it sits flat on a large connector on a special baseboard.
https://en.wikipedia.org/wiki/File:TSUBAME_3.0_PA075079.jpg

Ok so the SXM is a module that has
    - The gpu
    - the memory
    - power delivery on a compact board

Allows direct NVLink lanes between GPUs without going through the CPU or PCIe bus.

You plug the sxm module into a specialized gpu baseboard (called HGX board)

# HGX — NVIDIA’s server motherboard platform for multiple SXM GPUs + NVSwitches
this is like a motherboard only for gpus, this board doens't have cpu or ram just sockets or SXM slots for the GPUs and extra chips (NVSwitch) to link them
there are 2 variations
one for 4 sxms another for 8

The HGX connects to the main board using high speed board to board links and cables
The board is made by NVIDIA but shipped through OEM partners (Dell, Supermicro, Inspur, etc.).

# PCIe (Peripheral Component Interconnect Express) — standard expansion card interface

This is the slot used to connect add on cards on a normal main motherboard. These are poor people servers

# NVL / NVL-NVL — NVIDIA “NVLink” variant for inference, often dual-GPU boards
A special version of the H100 designed for large language model (LLM) inference, where you need huge memory per GPU and super-fast GPU↔GPU communication, but not necessarily the absolute max training clocks.

# CNX — GPU + network adapter on one board (H100 CNX)
Anoother variant
The CNX is basically an H100 PCIe that’s married to a network card (Mellanox ConnectX-7) on the same PCB.
    GPUs in different servers need to exchange data every few milliseconds during training.

    The slowest part is the extra hop through the CPU and PCIe bus.

    CNX skips that hop by having the network chip connected directly to GPU memory (via RDMA).

```mermaid
flowchart TD
    A[H100 GPU Variants] --> B[PCIe-based]
    A --> C[HGX-based]
    
    B --> D[H100 PCIe<br/>• PCIe Gen5 x16 card<br/>• 80 GB HBM3<br/>• 1 GPU per board<br/>• ~350-400W TDP<br/>• Air or liquid cooling<br/>• General AI, smaller training]
    
    B --> E[H100 NVL<br/>• Dual-GPU PCIe board<br/>• 94 GB HBM3<br/>• 2 GPUs per board<br/>• ~600-700W total TDP<br/>• Air or liquid cooling<br/>• LLM inference, high VRAM]
    
    B --> F[H100 CNX<br/>• PCIe Gen5 + ConnectX-7 NIC<br/>• 80 GB HBM3<br/>• 1 GPU per board<br/>• ~350-400W TDP<br/>• Air or liquid cooling<br/>• Multi-node AI, low-latency links]
    
    C --> G[H100 SXM5<br/>• SXM5 module for HGX<br/>• 80 GB HBM3<br/>• 1 GPU per board<br/>• 700-900W TDP<br/>• Liquid or high-end air cooling<br/>• Large-scale AI training]
    
    %% Styling
    classDef familyBox fill:#e6f3ff,stroke:#4a90e2,stroke-width:2px
    classDef variantBox fill:#f0f8ff,stroke:#2c5aa0,stroke-width:1px
    classDef rootBox fill:#d4edda,stroke:#28a745,stroke-width:3px
    
    class A rootBox
    class B,C familyBox
    class D,E,F,G variantBox
```

3. Memory & Interconnects
HBM (High Bandwidth Memory) — stacked DRAM close to the GPU die; H100 uses HBM3

NVLink — NVIDIA’s high-speed GPU↔GPU interconnect

NVSwitch — a chip that connects multiple NVLink GPUs in a full-mesh

PCIe Gen5 — the latest standard for CPU↔GPU data transfer

4. Server Integration Concepts
Baseboard — motherboard-like PCB that holds GPUs, switches, and connectors

Node — a single server unit in a cluster (can have 4–8 GPUs)

Cooling types — air vs liquid cooling in data center GPUs

TDP (Thermal Design Power) — how much heat a chip needs to dissipate

5. Performance Metrics
FP64 / FP32 / FP16 / BF16 / INT8 — numeric formats GPUs use (precision trade-offs)

Tensor Cores — specialized GPU units for matrix math (AI workloads)

Throughput (TFLOPS, TOPS) — measures of performance

Bandwidth (GB/s) — memory or interconnect data transfer rate

6. Product Ecosystem & Deployment
DGX — NVIDIA’s own AI supercomputer line

OEM (Original Equipment Manufacturer) — Dell, Supermicro, etc., making NVIDIA-based servers

Cloud instance naming — AWS p5, Azure ND H100, etc., correspond to server configs
