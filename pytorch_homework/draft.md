# Why pytorch can't do my homework

While doing a quiz for prerequisites to linear algebra I stumbled upon the next question:

## Question 14:
What is the characteristic equation of the following matrix?

$$
\begin{pmatrix}
    0 & 1 & -2 \\
    2 & 1 & 0 \\
    4 & -2 & 5 \\
\end{pmatrix}
$$

Pretty easy we would need to compute the determinant of $A - lambda(I) and set it equal to zero:
$
det(A - lambda(I)) = 0
$
So manually it would be something like this:

$
det(A - lambda(I)) = 0
$



Since I am doing the course by hand and in pytorch I was suprised that pytorch doesn't support symbolic computation. Another library called sympy supports this so it creates this solution:

```python
import sympy as sp

# Define the symbol λ
λ = sp.symbols('λ')

# Define the matrix A
A = sp.Matrix([
    [0, 1, -2],
    [2, 1,  0],
    [4, -2, 5]
])

# Identity matrix
I = sp.eye(3)

# Compute the characteristic polynomial: det(A - λI)
char_poly = (A - λ * I).det()

# Display the characteristic equation
print("Characteristic equation:")
sp.pprint(sp.Eq(char_poly, 0))
```
$ lambda - 6lambda^2 + 3lambda + 26 = 0$

But I was curious how we could do this in pure pytorch, turns out 
We can just compute characteristic polynomial coefficients with something called:

Faddeev-LeVerrier algorithm

```python
import torch

def characteristic_polynomial_coefficients(A):
    """
    Compute coefficients of characteristic polynomial using Faddeev-LeVerrier algorithm.
    
    For matrix A of size n×n, returns coefficients [c_0, c_1, ..., c_n] where:
    char_poly(λ) = c_n*λ^n + c_{n-1}*λ^{n-1} + ... + c_1*λ + c_0
    
    Args:
        A: Square matrix (n, n)
    
    Returns:
        coeffs: Tensor of shape (n+1,) containing polynomial coefficients
    """
    n = A.shape[0]
    device = A.device
    dtype = A.dtype
    
    # Initialize
    I = torch.eye(n, device=device, dtype=dtype)
    B = I.clone()
    coeffs = torch.zeros(n + 1, device=device, dtype=dtype)
    coeffs[n] = 1.0  # Leading coefficient is always 1 for monic polynomial
    
    # Faddeev-LeVerrier iterations
    for k in range(1, n + 1):
        AB = torch.matmul(A, B)
        c_k = -torch.trace(AB) / k
        coeffs[n - k] = c_k
        B = AB + c_k * I
    
    return coeffs


def evaluate_characteristic_polynomial(A, lambda_vals):
    """
    Evaluate the characteristic polynomial at given lambda values.
    
    Args:
        A: Square matrix (n, n)
        lambda_vals: Tensor of lambda values to evaluate at
    
    Returns:
        poly_vals: Evaluated polynomial values
    """
    coeffs = characteristic_polynomial_coefficients(A)
    n = len(coeffs) - 1
    
    # Evaluate polynomial using Horner's method
    result = torch.zeros_like(lambda_vals)
    for i, c in enumerate(coeffs):
        result += c * (lambda_vals ** (n - i))
    
    return result


def verify_with_eigenvalues(A):
    """
    Verify the characteristic polynomial by checking that eigenvalues are roots.
    
    Args:
        A: Square matrix
    
    Returns:
        Dictionary with eigenvalues, coefficients, and verification results
    """
    # Get coefficients
    coeffs = characteristic_polynomial_coefficients(A)
    
    # Get eigenvalues using PyTorch
    eigenvals = torch.linalg.eigvals(A)
    
    # Evaluate polynomial at eigenvalues (should be near zero)
    poly_at_eigenvals = evaluate_characteristic_polynomial(A, eigenvals)
    
    return {
        'coefficients': coeffs,
        'eigenvalues': eigenvals,
        'polynomial_at_eigenvalues': poly_at_eigenvals,
        'max_error': torch.max(torch.abs(poly_at_eigenvals))
    }


# Alternative: Companion matrix method for finding roots
def find_polynomial_roots_via_companion(coeffs):
    """
    Find roots of polynomial by constructing companion matrix.
    
    Args:
        coeffs: Polynomial coefficients [c_0, c_1, ..., c_n] where c_n = 1
    
    Returns:
        roots: Complex roots of the polynomial
    """
    n = len(coeffs) - 1
    if n == 0:
        return torch.tensor([], dtype=torch.complex64)
    
    # Normalize by leading coefficient
    coeffs = coeffs / coeffs[-1]
    
    # Build companion matrix
    companion = torch.zeros((n, n), dtype=torch.float32)
    if n > 1:
        companion[1:, :-1] = torch.eye(n - 1)
    companion[:, -1] = -coeffs[:-1]
    
    # Eigenvalues of companion matrix are polynomial roots
    roots = torch.linalg.eigvals(companion)
    return roots


# Example usage and testing
if __name__ == "__main__":
    # Test with a simple matrix
    torch.manual_seed(42)
    n = 4
    A = torch.randn(n, n)
    A = (A + A.T) / 2  # Make symmetric for real eigenvalues
    
    print("Matrix A:")
    print(A)
    print("\n" + "="*50 + "\n")
    
    # Get characteristic polynomial coefficients
    coeffs = characteristic_polynomial_coefficients(A)
    print("Characteristic polynomial coefficients:")
    print("(from highest to lowest degree)")
    print(coeffs)
    print("\n" + "="*50 + "\n")
    
    # Verify with eigenvalues
    verification = verify_with_eigenvalues(A)
    print("Eigenvalues (should be roots of char poly):")
    print(verification['eigenvalues'])
    print("\nPolynomial evaluated at eigenvalues (should be ~0):")
    print(verification['polynomial_at_eigenvalues'])
    print(f"\nMax error: {verification['max_error'].item():.2e}")
    print("\n" + "="*50 + "\n")
    
    # Find roots using companion matrix
    roots = find_polynomial_roots_via_companion(coeffs)
    print("Roots found via companion matrix:")
    print(roots)
    print("\nDifference from eigenvalues:")
    eigvals_sorted = torch.sort(verification['eigenvalues'].real)[0]
    roots_sorted = torch.sort(roots.real)[0]
    print(torch.abs(eigvals_sorted - roots_sorted))
    
    # Demonstrate gradient flow (important for ML applications)
    print("\n" + "="*50 + "\n")
    print("Gradient flow demonstration:")
    A_grad = torch.randn(3, 3, requires_grad=True)
    A_sym = (A_grad + A_grad.T) / 2
    coeffs_grad = characteristic_polynomial_coefficients(A_sym)
    loss = coeffs_grad.sum()
    loss.backward()
    print(f"Gradient computed successfully: {A_grad.grad is not None}")
```

