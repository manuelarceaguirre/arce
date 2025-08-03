# Top Down Map

🧭 Top-Down Learning Map: Semiconductor Industry for Trade Intelligence
Level 0 – Orientation & Use Case Framing
Understand why semiconductors matter globally and for your project.

Semiconductors = backbone of modern electronics

Strategic relevance (geopolitics, economic policy, supply chains)

How trade data reveals: supply chain stress, demand trends, bottlenecks

Level 1 – Macro Context
Understand the broader economic and policy environment for trade data.

Global Trade Policy & Tariffs (e.g. CHIPS Act, China export controls)

Key Economies in Semiconductors (USA, Taiwan, Korea, Japan, EU, China)

Economic indicators: GDP, PMI, exports % GDP (FRED, WB, IMF APIs)

Level 2 – Industry Ecosystem
Learn how the industry is structured across the globe.

Vertical Structure:

Fabless (NVIDIA, Qualcomm)

Foundries (TSMC, GlobalFoundries)

IDMs (Intel, Samsung)

Equipment & Materials (ASML, Lam Research, Tokyo Electron)

Process Chain:

Design → Fabrication → Assembly → Testing → Packaging → Shipping

Trade Corridors:

NL → TW (Lithography)

KR → US (Memory)

CN → US (Low-end chips)

Level 3 – Product & Code Foundations
Understand the products you are tracking—and their HS codes.

Memory Chips (HBM, DRAM, NAND): HS 854232

GPUs, CPUs: HS 854231 / 854239

Lithography Equipment: HS 848620

Wafers: HS 381800 or 3818.00.00

ICs in General: HS 8542.xx

Mapping: HS6 → HS10 (via US HTS, EU CN8, national codes)

Level 4 – Data Layer Prerequisites
Understand the core APIs powering your project.

Official APIs:

UN Comtrade (global HS6)

US ITC DataWeb (HTS10, U.S.)

Eurostat Comext (CN8, EU27)

Taiwan MOF (HS8, monthly XLS/API hybrid)

Korea Customs API (country-level + possible product-level)

Commercial APIs:

Panjiva (shipment-level, near real-time)

ImportGenius (affordable Panjiva alternative)

MarineTraffic/Lloyd’s (supply chain/port movement)

Macro APIs:

FRED (US + global economic stats)

World Bank & IMF (WDI, BoP, DOTS)

Level 5 – Technical Enablers
APIs, data engineering, and platform ops.

API polling, retries, and caching

Normalizing across HS6/HTS10/CN8

Entity resolution (e.g. Samsung Semiconductor = Samsung Electronics)

Monitoring + logging (Datadog, Sentry)

Deployment (Fly.io, Railway), Auth (Auth0), Payments (Stripe)

Level 6 – Analysis & Intelligence
What your system should learn to detect or predict.

Trade flow surges (e.g. HBM exports spike from Korea)

Supply chain interruptions (e.g. port delays, sanctions)

Early demand signals (e.g. GPU shipments to major OEMs)

Policy shifts (e.g. via GDELT or Bloomberg feeds)

Level 7 – Visual & Strategic Output
The impact your product should drive.

Globe or chord visualization of trade flows

Alert system (email/SMS) for anomalies

Exportable dashboards (e.g. via Plotly, Vega, or Power BI)

Country dashboards: “Taiwan’s Semiconductor Export Outlook”

Segment insights: “Lithography Equipment Outflows from NL”

