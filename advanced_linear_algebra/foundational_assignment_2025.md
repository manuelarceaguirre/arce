
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
## Question 7:
Is the following matrix singular?

$$
\begin{pmatrix}
    1 & 4 & 2 \\
    2 & -1 & 1 \\
    1 & 2 & 1 \\
\end{pmatrix}
$$
## Question 8:
What is the inverse of the following matrix?

$$
\begin{pmatrix}
    1 & 0 & 0 \\
    0 & -4 & 0 \\
    0 & 0 & 2 \\
\end{pmatrix}
$$

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


## Question 10:
Solve the following system of questions:
2x + 3y + 4z = 6
2x + 3y - 4z = 4 
2x - 3y + 4z = 2

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
