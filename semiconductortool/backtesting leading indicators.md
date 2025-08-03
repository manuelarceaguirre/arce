Since I only got my hands on 2024 data the objective of this entry is to try to understand the alpha and validity of leading indicators. I was learning about some indexes economists or just people in general base themselves around getting a feel on what is coming. 

I came across the PMI indicator, this is basically:

PMI leading indicator
It asks manufacturing managers questions like:

    Are you getting more orders?

    Are suppliers delivering on time?

    Are you hiring more workers?

    Are raw material prices rising?

Each month, the answers are turned into a number between 0 and 100:

PMI Score	What It Means
Above 50	Factories are growing → economy expanding
Exactly 50	No change → neutral
Below 50	Factories are shrinking → slowdown or trouble

So PMI moves before trade data moves.
That’s why it’s called a leading indicator.

I was trying to wrap my head of trade data. But when reading this I figured out. In theory this would be the only indicator I would need? So if people are hiring more, getting more materials ordering more. The economy would be getting to a better place. I want to analyz if this is even the case

I learned this can be called:
a. Goodhart’s Law

“When a measure becomes a target, it ceases to be a good measure.” 
Wikipedia

Once managers are judged (or paid) on a single number, they game the number and break its link to reality.

b. Campbell’s Law
Similar idea from sociology—turning a social indicator into a target corrupts both the indicator and the system it was meant to monitor.

c. Vanity metrics
Numbers that “make you look good to others but don’t drive actionable insight” (think follower counts, website hits, headline GDP without inflation adjustment). 
Tableau
ProductPlan

d. Surrogate / proxy metrics
A technical term you’ll see in operations research and auditing when the thing you can measure stands in for the thing you care about.

My initial idea of PMI was actually like wrong? PMI is not an indicator or a serious one

# What actually matters

SEMI Equipment Billings

WSTS Monthly Sales

Foundry Utilization / Lead-time Index (e.g. Susquehanna)

Memory Spot-Price Index (DRAM, NAND)

Taiwan Electronics PMI

Carrots for the rabbit hole:

Back-test PMI vs. industrial production

Overlay WSTS sales with Taiwan PMI & memory prices

Compare equipment billings to 12-month-ahead revenue

Run a “Goodhart stress test.” Whenever a metric becomes a KPI in earnings calls or government targets, flag it and watch deviation between the metric and the underlying fundamental you truly care about.
