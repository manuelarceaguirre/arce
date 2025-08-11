# function 1
def multiply_list(input_string: str) -> int:
    if input_string.strip() == "":
        return 0
    input = input_string.split()
    list_integers = [int(x) for x in input]
    product = 1
    for x in list_integers:
        product = product * x
    print(product)
    return product

def count_common_chars(input_string: str) -> int:
    input = input_string.split()
    r = set(input[0])
    print(r)
    common = r
    for i in range(1, len(input)):
        word_chars = set(input[i])
        common = common & word_chars
        print(list(common))  # Convert to list for printing
    print(len(common))
    return len(common)

def sum_divisible_by_k(N: int, k: int) -> int:
    input_set = [x for x in range(1, N+1)]
    print(input_set)
    if k == 0:  
        return -1
    result = [x for x in input_set if x % k == 0]
    print(result)
    result = sum(result)
    print(result)
    return result

def highest_common_factor(A: int, B: int) -> int:
    A_factors = {x for x in range(1, A + 1) if A % x == 0}
    B_factors = {x for x in range(1, B + 1) if B % x == 0}
    print(A_factors, B_factors)
    
    common_factors = A_factors & B_factors
    return max(common_factors)

def get_minimum(data: list[int]) -> int:
    return min(data)

import pandas as pd
def rename_col(df: pd.DataFrame, old_name: str, new_name: str) -> pd.DataFrame:
    return df.rename(columns={old_name: new_name})

def standard_deviation(series: pd.Series) -> float:
    return series.std()

import numpy as np
def correlation_sum(input_string: str) -> float:
    num_strings = input_string.split()
    if len(num_strings) != 9:
        return 0.0
    try:
        numbers = [int(n) for n in num_strings]
    except ValueError:
        return 0.0

    data_array = np.array(numbers).reshape(3,3)
    df = pd.DataFrame(data_array)
    corr_matrix = df.corr()
    total_sum = corr_matrix.sum().sum()
    return round(total_sum, 1)
