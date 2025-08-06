QTCM -> Questions that came to mind
Level 0: 
---


---

#### **Q1. L2 Norm**

What is the L2 norm of the vector $\mathbf{u} = [3, 4]$?
Give the answer as a number.

```python
u = torch.tensor([3.0, 4.0])
torch.norm(u, p=2).item()  # → 5.0
```
---

#### **Q2. Dot Product**

Given $\mathbf{u} = [1, 2, 3]$ and $\mathbf{v} = [4, 5, 6]$, what is the dot product $\mathbf{u} \cdot \mathbf{v}$?


```python
u = torch.tensor([1.0, 2.0, 3.0])
v = torch.tensor([4.0, 5.0, 6.0])
torch.dot(u, v)  # → 32
```

---

#### **Q3. Matrix Multiplication**

Multiply the matrices:

$$
A = 
\begin{pmatrix}
1 & 2 \\
3 & 4 \\
\end{pmatrix}
,\quad
B = 
\begin{pmatrix}
2 & 0 \\
1 & 3 \\
\end{pmatrix}
$$

What is the resulting matrix?

```python
A = torch.tensor([
    [1.0, 2.0],
    [3.0, 4.0],
], dtype = torch.float32)
B = torch.tensor([
    [2.0, 0.0],
    [1.0, 3.0],
], dtype = torch.float32)

result = A @ B
print(result)
```
---

#### **Q4. Softmax**

If you apply the softmax function to the vector $[1, 2, 3]$, which number gets the highest probability?

Softmax is a function that takes a list of numbers a vector in this case and turns each one of them into probabilities between 0 and 1.

Softmax(xᵢ) = exp(xᵢ) / sum(exp(xⱼ))
This means it takes e^x for each input value, then divides by the total sum.

The model might output numbers like [2.1, 1.3, 5.6], and softmax will turn that into something like [0.1, 0.05, 0.85]
```python
import torch
import torch.nn.functional as F
x = torch.tensor([1.0, 2.0, 3.0])
probabilities = F.softmax(x, dim=0) # 
```
QTCM:
What will happen if we select d=1?
in my example error  because there is no second dimention
but...
```python
x = torch.tensor([
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0]
])
```
This is a 2D tensor — it has:
2 rows
3 columns
It looks like this:
Row 0 → [1.0, 2.0, 3.0]  
Row 1 → [4.0, 5.0, 6.0]
What does dim=0 do?
It means: apply softmax column by column.
Let’s break that down:

Column 0: [1.0, 4.0]

Column 1: [2.0, 5.0]

Column 2: [3.0, 6.0]

So it applies softmax down each column:
What about dim=1?
Now it applies softmax row by row.

Row 0: [1.0, 2.0, 3.0]

Row 1: [4.0, 5.0, 6.0]

Each row gets its own softmax:

softmax([1, 2, 3]) → [0.09, 0.24, 0.66]

softmax([4, 5, 6]) → [0.09, 0.24, 0.66]
---

#### **Q5. Memory Hierarchy (GPU)**

Which is faster for access: DRAM or SRAM?

SRAM -> Static Random Access Memory
DRAM -> Dynamic Random Access Memory

| Feature     | **SRAM**                            | **DRAM**                           |
| ----------- | ----------------------------------- | ---------------------------------- |
| Full name   | **Static** RAM                      | **Dynamic** RAM                    |
| Speed       |  **Faster**                        |  Slower                       |
| Power use   |  Uses **more** power               |  Uses **less** power              |
| Cost        |  **More expensive**               |  Cheaper                         |
| Density     |  Less dense (more space per bit)   |  More dense (can store more bits) |
| Where used? | Caches (L1, L2, GPU on-chip memory) | Main RAM (system memory, GPU VRAM) |
SRAM is the fastest:
SRAM keeps data as long as power is on — no need to refresh.
DRAM must constantly refresh its stored bits (like every few milliseconds), which slows it down.

---

#### **Q6. Numerical Stability**

Why do we subtract the maximum value from inputs before applying softmax?

a) To make values closer together
b) To prevent overflow in exponentiation
c) To sort the inputs first
d) To increase GPU speed


So lets remember softmax = Softmax(xᵢ) = exp(xᵢ) / sum(exp(xⱼ))
this basically takes e^x of every input and then divides by the total sum
xponentials grow super fast:

exp(10) ≈ 22,000

exp(100) ≈ huge (~2.7e43)

exp(1000) →  OverflowError (the number is too big for memory)

So if your x vector has large values, like [1000, 1001, 1002], you’ll break softmax. It tries to compute things that are too large to handle.

> Solution
Instead of using x, we use this:
x_stable = x - max(x)
So [1000, 1001, 1002] becomes [-2, -1, 0]
Then we do softmax(x_stable)

So the answer is b) to prevent overflow in exponentiation

---

#### **Q7. Tiling**

What is the purpose of **tiling** when running computations on a GPU?

a) To make memory allocation easier
b) To process large data in smaller, cache-friendly blocks
c) To remove attention bottlenecks
d) To improve model accuracy

So what is tiling:
breaking a large computation (like multiplication of matrices) into small tiles

Fits into fast local memory (like shared memory or cache),

Is processed independently and in parallel, and

Avoids constantly reaching into slow global memory.

GPUs are really fast, but only if you feed them data from fast memory (like SRAM).
If they have to constantly reach into slow DRAM, they waste time.

So tiling:

Keeps data close to the processor,

Reduces memory access time, and

Allows efficient parallelization.

so b) is the correct answer to provess large data in smaller cache friendly blocks

---

#### **Q8. Causal vs Non Causal Attention**
Given the attention score matrix 
𝐴
A for a 4-token input:
```python
[[?, ?, ?, ?],
 [?, ?, ?, ?],
 [?, ?, ?, ?],
 [?, ?, ?, ?]]
```
If this is for a causal language model, what should the attention mask look like and why?
Prereq:
Attention:
"The cat sat"
```python
Token 0: "The"
Token 1: "cat"
Token 2: "sat"
```
Now let’s walk through what happens for token 1: "cat"
Step 1: Each token turns into:
| Token | Query (Q) | Key (K) | Value (V) |
| ----- | --------- | ------- | --------- |
| "The" | Q₀        | K₀      | V₀        |
| "cat" | Q₁        | K₁      | V₁        |
| "sat" | Q₂        | K₂      | V₂        |
Now we’re focusing on token 1: "cat", so we use Q₁ (its query).

Step 2: Compare "cat"'s Query to All Keys (Dot Products)
Q_1 takes a look at all the other keys to see who of them is more related to its own:
This takes place in the form of (Dot products)

score₀ = dot(Q₁, K₀)   # How much does "cat" relate to "the"?
score₁ = dot(Q₁, K₁)   # How much does "cat" relate to "cat"?
score₂ = dot(Q₁, K₂)   # How much does "cat" relate to "sat"?
 
-> This gives us raw attention scores like:
[2.1, 6.5, 3.4]

These scores say:

"cat" thinks "cat" is most important (6.5)

"sat" is next (3.4)

"the" is least important (2.1)
Step 3: Turn Scores into Probabilities (Softmax)

> attention_weights = softmax([2.1, 6.5, 3.4])
that gives us for example:
[0.05, 0.80, 0.15]
    Look 80% at "cat"
    Look 15% at "sat"
    Look 5% at "the"

Step 4: Use the Weights to Blend the Values
output = 0.05 * V₀ + 0.80 * V₁ + 0.15 * V₂

Okk so for each token we do this:

    Compare its query to every other key → gives a list of scores
    Apply softmax → get a list of weights
    Multiply those weights by the values → get one output vector

So, for a sequence of 3 tokens:

"The" → outputs vector O₀
"cat" → outputs vector O₁
"sat" → outputs vector O₂
Stack those outputs → you get the output sequence: [O₀, O₁, O₂]

This would be the long way of doing it:
There is a parallel version of doing this

To do that, we stack all the query vectors together into a matrix called Q:
```python
Q = [Q₀
     Q₁
     Q₂]     # 3 tokens × d dimensions
```
Same for the keys:
```python
K = [K₀
     K₁
     K₂]
```
And the attention score matrix is just:
A[i][j] = dot(Qᵢ, Kⱼ)
|        | K₀    | K₁    | K₂    |
| ------ | ----- | ----- | ----- |
| **Q₀** | Q₀·K₀ | Q₀·K₁ | Q₀·K₂ |
| **Q₁** | Q₁·K₀ | Q₁·K₁ | Q₁·K₂ |
| **Q₂** | Q₂·K₀ | Q₂·K₁ | Q₂·K₂ |
reference:
| Token | Query (Q) | Key (K) | Value (V) |
| ----- | --------- | ------- | --------- |
| "The" | Q₀        | K₀      | V₀        |
| "cat" | Q₁        | K₁      | V₁        |
| "sat" | Q₂        | K₂      | V₂        |

Apply softmax to each row, one at a time.
Row 0 → softmax over [Q₀·K₀, Q₀·K₁, Q₀·K₂]
Row 1 → softmax over [Q₁·K₀, Q₁·K₁, Q₁·K₂]
Row 2 → softmax over [Q₂·K₀, Q₂·K₁, Q₂·K₂]

It will become:
|        | K₀  | K₁  | K₂  |
| ------ | --- | --- | --- |
| **Q₀** | w₀₀ | w₀₁ | w₀₂ |
| **Q₁** | w₁₀ | w₁₁ | w₁₂ |
| **Q₂** | w₂₀ | w₂₁ | w₂₂ |

Ok last step:
| Token | Value (V) |
| ----- | --------- |
| "The" | V₀        |
| "cat" | V₁        |
| "sat" | V₂        |
We can write all values as a matrix V:
```python
V = [
  V₀
  V₁
  V₂
]      # 3 × d
```
then we do:
> Output = Attention_Matrix @ V
        = A @ V

Row 0: w₀₀×V₀ + w₀₁×V₁ + w₀₂×V₂ = what “The” pays attention to

Row 1: w₁₀×V₀ + w₁₁×V₁ + w₁₂×V₂ = what “cat” pays attention to

Row 2: w₂₀×V₀ + w₂₁×V₁ + w₂₂×V₂ = what “sat” pays attention to

Back to the original question:
Given the attention score matrix 
𝐴
A for a 4-token input:
```python
[[?, ?, ?, ?],
 [?, ?, ?, ?],
 [?, ?, ?, ?],
 [?, ?, ?, ?]]
```
If this is for a causal language model, what should the attention mask look like and why?
What does causal mean?
A causal language model can only attend to past or present tokens — not future ones.
So:

Token 0 can look at: token 0

Token 1 can look at: tokens 0, 1

Token 2 can look at: tokens 0, 1, 2

Token 3 can look at: tokens 0, 1, 2, 3

So what should the mask look like?
We block future tokens by assigning -inf or a large negative number (so softmax makes them 0).
We leave allowed positions as 0.

The causal mask looks like this:
```python
[[ 0,   -inf, -inf, -inf],
 [ 0,    0,   -inf, -inf],
 [ 0,    0,    0,   -inf],
 [ 0,    0,    0,    0 ]]
Because the attention score matrix will go through:
masked_scores = A + mask
softmax(masked_scores)
```

```python
import torch
import torch.nn.functional as F

# Step 1: Create a fake attention score matrix for 4 tokens
A = torch.tensor([
    [1.0, 2.0, 3.0, 4.0],
    [1.0, 2.0, 3.0, 4.0],
    [1.0, 2.0, 3.0, 4.0],
    [1.0, 2.0, 3.0, 4.0]
])
print("Original attention scores (A):\n", A)

# Output:
# tensor([[1., 2., 3., 4.],
#         [1., 2., 3., 4.],
#         [1., 2., 3., 4.],
#         [1., 2., 3., 4.]])

# Step 2a: Create lower triangular mask of 1s
mask = torch.tril(torch.ones_like(A))
print("\nStep 2a - Lower triangular mask (1s and 0s):\n", mask)

# Output:
# tensor([[1., 0., 0., 0.],
#         [1., 1., 0., 0.],
#         [1., 1., 1., 0.],
#         [1., 1., 1., 1.]])

# Step 2b: Replace 0s with -inf
mask = mask.masked_fill(mask == 0, float('-inf'))
print("\nStep 2b - Mask after replacing 0s with -inf:\n", mask)

# Output:
# tensor([[ 1., -inf, -inf, -inf],
#         [ 1.,   1., -inf, -inf],
#         [ 1.,   1.,   1., -inf],
#         [ 1.,   1.,   1.,   1.]])

# Step 2c: Replace remaining 1s with 0.0 (so adding it to A doesn’t change valid scores)
mask = mask.masked_fill(mask == 1, 0.0)
print("\nStep 2c - Final mask to add to A:\n", mask)

# Output:
# tensor([[ 0., -inf, -inf, -inf],
#         [ 0.,   0., -inf, -inf],
#         [ 0.,   0.,   0., -inf],
#         [ 0.,   0.,   0.,   0.]])

# Step 3: Apply mask to attention scores
masked_scores = A + mask
print("\nStep 3 - Masked scores (A + mask):\n", masked_scores)

# Output:
# tensor([[1., -inf, -inf, -inf],
#         [1.,  2., -inf, -inf],
#         [1.,  2.,  3., -inf],
#         [1.,  2.,  3.,  4.]])

# Step 4: Apply softmax row by row
attention_weights = F.softmax(masked_scores, dim=1)
print("\nStep 4 - Final attention weights (after softmax):\n", attention_weights)

# Output:
# tensor([[1.0000, 0.0000, 0.0000, 0.0000],
#         [0.2689, 0.7311, 0.0000, 0.0000],
#         [0.0900, 0.2447, 0.6652, 0.0000],
#         [0.0321, 0.0871, 0.2369, 0.6439]])
```

FINAL ANSWER:
```python
[
  [0.,   -inf, -inf, -inf],
  [0.,    0.,  -inf, -inf],
  [0.,    0.,   0.,  -inf],
  [0.,    0.,   0.,   0.]
]
```

---

#### **Q9. Attention Masking in Code
You're given this PyTorch tensor of scores:
```python
scores = torch.tensor([
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0],
    [7.0, 8.0, 9.0]
])
```
And a mask like:
```python
mask = torch.tensor([
    [0, 0, 1],
    [0, 1, 1],
    [0, 0, 0]
])
```
How would you apply this mask so that masked values are ignored by softmax?
```python
import torch
import torch.nn.functional as F

# Step 1: Original scores
scores = torch.tensor([
    [1.0, 2.0, 3.0],
    [4.0, 5.0, 6.0],
    [7.0, 8.0, 9.0]
])

print("Step 1 - Original Scores:\n", scores)

# Step 2: Define the mask
mask = torch.tensor([
    [0, 0, 1],
    [0, 1, 1],
    [0, 0, 0]
])

print("\nStep 2 - Mask:\n", mask)

# Step 3: Apply the mask — set masked positions to -inf
masked_scores = scores.masked_fill(mask == 1, float('-inf'))

print("\nStep 3 - Masked Scores (0s allowed, 1s set to -inf):\n", masked_scores)
# Output:
# tensor([
#   [1.0, 2.0, -inf],
#   [4.0, -inf, -inf],
#   [7.0, 8.0, 9.0]
# ])

# Step 4: Apply softmax along dim=1 (across each row)
attn_weights = F.softmax(masked_scores, dim=1)

print("\nStep 4 - Attention Weights After Softmax:\n", attn_weights)
# Expected Output:
# tensor([
#   [0.2689, 0.7311, 0.0000],     # Last entry was -inf → softmax = 0
#   [1.0000, 0.0000, 0.0000],     # Only first entry is valid
#   [0.0900, 0.2447, 0.6652]      # No masking
# ])
```
---

#### **Q10. GPU Kernel Fusion
Why is kernel fusion critical in FlashAttention 2?

a) It increases the model’s accuracy
b) It reduces DRAM reads/writes by combining QKᵀ, softmax, and V projection
c) It allows larger model sizes to be stored on disk
d) It simplifies the math behind attention


First whats DRAM traffic:
On a GPU, there are two main types of memory:

> Global memory (DRAM): Big but slow
> Shared memory (on-chip): Small but fast

The Problem:
In naive attention, we do:
QK = Q @ K.T           # Step 1 — writes result to DRAM
S  = softmax(QK)       # Step 2 — reads from DRAM, writes back to DRAM
O  = S @ V             # Step 3 — reads again, writes output
Reads large matrices from DRAM
Writes intermediate results back to DRAM
That’s billions of slow reads/writes per layer, especially with long sequences.

What is kernel fusion?
Each operation (matmul, softmax, matmul again) launches a separate GPU kernel.

This means:
More overhead
More memory bouncing (DRAM again)

With kernel fusion:
FlashAttention 2 merges all 3 into one big kernel:
QK -> softmax -> V   all in one
Intermediate steps never leave fast shared memory — they never hit DRAM.
So we skip memory traffic entirely, except for the final output.

FlashAttention 2 features:
Exact attention, not approximate (vs. some old methods)
Uses tiling to break long sequences into chunks
Fuses QKᵀ, softmax, and V multiplication into one kernel
Uses shared memory efficiently
Supports causal and non-causal attention
Much faster and more memory-efficient than naive attention

---

#### **Q11. Mixed Precision
What’s the main reason FlashAttention 2 uses FP16 or BF16 for its attention computations?

a) To avoid numerical underflow
b) To improve numerical precision
c) To reduce memory usage and increase throughput
d) Because softmax only works in FP16


FP16 and BF16 vs FP32 (Precision & Range)
FP32: 32-bit float = ~7 decimal digits of precision

FP16: 16-bit float = ~3.5 digits of precision, smaller range

BF16: 16-bit float = same range as FP32, but ~3 digits precision

So FP16 and BF16 use half the space and are faster, but you lose some accuracy

Why use FP16/BF16 on GPUs?
Modern GPUs (like NVIDIA's A100 or H100) have tensor cores that are super fast when using FP16 or BF16.

Throughput (how many FLOPs per second) is much higher in FP16/BF16 than FP32.

Also: lower memory use = more fits in GPU RAM = less waiting

We use FP16/BF16 where accuracy isn’t critical (e.g., multiplying Q and K)
But we upcast (switch to FP32) in places like softmax, where precision matters
That’s why FlashAttention 2 is mixed precision: some FP16, some FP32
 
c) To reduce memory usage and increase throughput.

Memory Efficiency: Attention matrices (Q·K^T) are huge — using half-precision saves a lot of memory.

Speed: Modern GPUs are way faster at FP16/BF16 thanks to tensor cores.

Numerical Tricks: It’s still safe because FlashAttention upcasts to FP32 where it matters (like inside softmax), so you don’t lose stability.
