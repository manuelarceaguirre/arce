
QTCM -> Questions that came to mind
# Question 1:

What is the L2 Norm of the vector u = [4,3,0]?

```python
import torch

# Step 1: Define the vector as a Pytorch vector
u = torch.tensor([4.0, 3.0, 0.0]) # float is important for norm ops

l2_norm = torch.norm(u, p=2) # computes the l2 norm euclidean norm

print("L2 Norm:", l2_norm.item()) # is used to extract the scalar value from a 0D Tensor
```
QTCM
1. Why is p=2 in the L2 norm?
p in torch.norm(..., p=...) refers to p-norm:

p=1 → Manhattan norm

p=2 → Euclidean norm (L2 norm)

p=∞ → Max norm (largest absolute value)

2. What happens if you don't use .item()?
l2_norm stays a 0 dimensional tensor
```python
print(l2_norm)
# tensor(5.)

print(type(l2_norm))
# <class 'torch.Tensor'>
```

## Question 2:

What is the L2 Norm of the vector u = [-2,2,1]?

```python
u = torch.tensor([-2.0, 2.0, 1.0])

l2_norm = torch.norm(u, p=2)
print(l2_norm.item())
```


## Question 3:
What is the cosine of the angle between the following two vectors?

U = [1 , 2, 2], v= [0, 4, 3]

```python
# define the vectors
u = torch.tensor([1.0, 2.0, 2.0])
v = torch.tensor([0.0, 4.0, 3.0])

# dot product
dot_product = torch.dot(u,v)

# Compute l2 norms
u_l2norm = torch.norm(u, p=2)
v_l2norm = torch.norm(v, p=2)

cos_theta = dot_product / (u_l2norm * v_l2norm)

print(cos_theta.item())

```


## Question 4:
What is the matrix multiplication of the following two matrices?

$$
\begin{pmatrix}
    1 & 2 \\
    4 & 3 \\
\end{pmatrix}
$$

$$
\begin{pmatrix}
    -1 & 0 \\
    5 & 1 \\
\end{pmatrix}
$$

```python
A = torch.tensor([[-1.0, 2.0],
                  [4.0, 3.0]])

B = torch.tensor([[-1.0, 0.0],
                  [5.0, 1.0]])

result = A @ B
```

## Question 5:
What is the determinant of the follwowing matrix?

$$
\begin{pmatrix}
    1 & -2 & 2 \\
    2 & -4 & 1 \\
    4 & -8 & 1 \\
\end{pmatrix}
$$

```python
A = torch.tensor([[1.0, -2.0, 2.0],
                  [2.0, -4.0, 1.0]
                  [4.0, -8.0, 1.0]
])

det_A = torch.linalg.det(A)
print(det_A.item())
```
QTCM:
1. What is torch.linalg
Linear Algebra Toolbox
| Function                     | What it does                   |
| ---------------------------- | ------------------------------ |
| `torch.linalg.norm()`        | Computes vector/matrix norms   |
| `torch.linalg.det()`         | Determinant of a square matrix |
| `torch.linalg.inv()`         | Matrix inverse                 |
| `torch.linalg.eig()`         | Eigenvalues and eigenvectors   |
| `torch.linalg.svd()`         | Singular Value Decomposition   |
| `torch.linalg.matrix_rank()` | Rank of a matrix               |
| `torch.linalg.qr()`          | QR decomposition               |
| `torch.linalg.solve()`       | Solves linear systems $Ax = b$ |

## Question 6:

Is the following matrix invertible?

$$
\begin{pmatrix}
    2 & 1 \\
    3 & 5 \\
\end{pmatrix}
$$
```python
A = torch.tensor([
[2.0, 1.0],
[3.0, 5.0], dtype = torch.float32
])

# check the determinant:
det_A = torch.det(A)

if det_A != 0:
    print("Since the determinant is not 0, the matrix is invertible")
else:
    print("The determinant is 0, the matrix is not invertible (singular)")
```

## Question 7:
Is the following matrix singular?

$$
\begin{pmatrix}
    1 & 4 & 2 \\
    2 & -1 & 1 \\
    1 & 2 & 1 \\
\end{pmatrix}
$$

```python
A = torch.tensor([
[1.0, 4.0, 2.0],
[2.0, -1.0, 1.0],
[1.0, 2.0, 1.0] 
],dtype = torch.float32)

det_A = torhc.det(A)

if det_A != 0:
    print("Since the determinant is not 0, the matrix is invertible")
else:
    print("The determinant is 0, the matrix is not invertible (singular)")
```


## Question 8:
What is the inverse of the following matrix?

$$
\begin{pmatrix}
    1 & 0 & 0 \\
    0 & -4 & 0 \\
    0 & 0 & 2 \\
\end{pmatrix}
$$
```python
A = torch.tensor([
[1.0, 4.0, 2.0],
[2.0, -1.0, 1.0],
[1.0, 2.0, 1.0] 
],dtype = torch.float32)

det_A = torhc.det(A)

if det_A != 0:
    print("Since the determinant is not 0, the matrix is invertible")
else:
    print("The determinant is 0, the matrix is not invertible (singular)")
```
## Question 9:
Is the following system of equation overdetermined or underdetermined?

$$
\begin{pmatrix}
    1 & 2 & -1 \\
    2 & 10 & 3 \\
\end{pmatrix}
$$

$$
\begin{pmatrix}
    x \\
    y \\
    z \\
\end{pmatrix}
$$

=

$$
\begin{pmatrix}
    1 \\
    2 \\
\end{pmatrix}
$$
```python
dtype = torch.float32

# 1. Define the matrixes
A = torch.tensor([
[1.0, 2.0, -1.0],
[2.0, 10.0, 3.0],
],dtype = dtype)

b = torch.tensor([1.0, 2.0],dtype = dtype)

# 2. Reshape b to be a column vector (2, 1) for matrix operations
b = b.reshape(2,1)

# 3. Analyze the system
num_equations = A.shape[0]
num_unknows = A.shape[1]
print(f"Number of equations: {num_equations}")
print(f"Number of unknowns: {num_unknows}")

if num_unknows > num_equations:
    print("Result: the system is underdetermined")
elif num_equations > num_unknows:
    print("Result: the system is overdetermined")
else:
    print("Result: the system has an equal number of equations and unknowns")

# find the minimum norm solution using torch.linalg.lstsq

try:
    solution_tuple = torch.linalg.lstsq(A,b)
    x = solution_tuple.solution
    print(f"solution: \ {x}")

    # Verify solution:
    # check if A @ x = b:
    reconstruction = torch.matmul(A,x)
    print(reconstruction)
    
    is_close = torch.allclose(reconstruction, b)
    print(f"is the A @ b = b {is_close}")
    if is_close:
        print("Valid solution")
except torch.linalg.LinAlgError as e:
    print(f"error: {e}")

```
You and I are trying to find a location on a map — a flat grid.
You must end up somewhere where the sum of your east and north steps is 5

x + y = 5

This one rule doesn't lock in exactly where you are… but it does tell you all the places you could be.

Suppose I also tell you:

You must end up somewhere where x - y = 1

only one pair works for both equations:
x = 3, y = 2
If you only had x + y = 5, you were free to slide anywhere along the line.
That’s what an underdetermined system is:
 Imagine You’re in 3D Space Now
Instead of walking on a flat map (2D), now you can:

Walk east → x

Walk north → y

Climb upstairs → z

Now you're looking for a location in 3D.
x + y + z = 6
This is just one equation with three unknowns.

Can we find a unique point?

Nope. There are infinitely many combinations that satisfy this.
Add a Second Rule:
x - y + z = 1
infinite valid solutions, but more restricted now.
```python
A = torch.tensor([
    [1.0, 2.0, -1.0],
    [2.0, 10.0, 3.0]
], dtype=torch.float32)

b = torch.tensor([1.0, 2.0], dtype=torch.float32).reshape(2, 1)
```
system of equations is:
1·x + 2·y - 1·z = 1       → equation 1
2·x + 10·y + 3·z = 2      → equation 2
A.shape = (2, 3)
2 equations
3 unknowns: x, y, and z
this is an underdetermined system.

## Question 10:
Solve the following system of questions:
2x + 3y + 4z = 6
2x + 3y - 4z = 4 
2x - 3y + 4z = 2
```python
import torch

# It's best practice to use a floating-point dtype for these operations.
dtype = torch.float32

# 1. Define the coefficient matrix A and the constant vector b
A = torch.tensor([[2.,  3.,  4.],
                  [2.,  3., -4.],
                  [2., -3.,  4.]], dtype=dtype)

b = torch.tensor([6., 4., 2.], dtype=dtype)

print("Matrix A:")
print(A)
print("\nVector b:")
print(b)
print("-" * 25)

# 2. Solve for the vector x in the equation Ax = b
# torch.linalg.solve is the recommended function for this.
try:
    solution = torch.linalg.solve(A, b)

    print("The system has a unique solution.")
    print("Solution vector (x, y, z):")
    print(solution)
    print("-" * 25)

    # 3. Print the results in a more readable format
    x, y, z = solution[0].item(), solution[1].item(), solution[2].item()
    print(f"Solved values are:")
    print(f"x = {x:.4f}")
    print(f"y = {y:.4f}  (fractional value is 2/3)")
    print(f"z = {z:.4f}  (fractional value is 1/4)")
    print("-" * 25)


    # 4. (Optional but recommended) Verify the solution
    # We check if A multiplied by our solution vector gives us back b.
    print("Verification: Multiplying A by the solution...")
    reconstructed_b = torch.matmul(A, solution)
    print("Result of A @ x:")
    print(reconstructed_b)

    # Use torch.allclose to confirm the result is numerically close to the original b
    is_correct = torch.allclose(reconstructed_b, b)
    print(f"\nIs the solution correct? {is_correct}")

except torch.linalg.LinAlgError:
    print("The matrix A is singular (not invertible).")
    print("The system either has no solution or infinite solutions.")
```
## Question 11:
Is matrix Q an orthogonal matrix?

$$
\begin{bmatrix}
-\frac{1}{\sqrt{2}} & \frac{1}{\sqrt{2}} \\
\frac{1}{\sqrt{2}} & \frac{1}{\sqrt{2}}
\end{bmatrix}
$$
## Question 12:
Calculate 𝑣 ∙ 𝑢 

u = [5,-1,1,2], v= [1, 2,- 1,3] 

## Question 13:
Calculate 𝑣 ∙ 𝑢 

u = [1,-1,2], v= [1, 5, 1] 

## Question 14:
What is the characteristic equation of the following matrix?

$$
\begin{pmatrix}
    0 & 1 & -2 \\
    2 & 1 & 0 \\
    4 & -2 & 5 \\
\end{pmatrix}
$$

## Question 15:
Calculate the eigenvalue(s) of the following matrix? 


$$
\begin{pmatrix}
    3 & 1\\
    1 & 3\\
\end{pmatrix}
$$

## Question 16:
What is the projection of vector b = [1, 3, 1] onto vector a= [-1, -3 , -1]? 

## Question 17:
Are vectors v = [0, 1, 0] and u=[4, 0, -1] linearly independent? 

## Question 18:
Are vectors v = [1, 1] and u=[-1, -1] linearly independent? 

## Question 19:
What is the rank of the following matrix?

$$
\begin{pmatrix}
    3 & 1\\
    1 & 3\\
\end{pmatrix}
$$

## Question 20:
Is the following set of vectors basis for R3? 

$$
\begin{pmatrix}
    0 \\
    1 \\
    0 \\
\end{pmatrix}
$$

and

$$
\begin{pmatrix}
    4 \\
    0 \\
    -1 \\
\end{pmatrix}
$$
