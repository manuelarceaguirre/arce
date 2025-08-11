This assessment requires you to submit a single Python file, called submission.py. Each question below asks you to use a specific function name so the test runner can test them correctly.

(1) A function, `multiply_list` takes as an input a string of space separated ints that is split and converted to a list.  Multiply the list of ints together and return the result. For example, if the input is 1 2 3 4, perform 1 * 2 * 3 * 4 and return the result. If the list is empty, return 0.

(1) A function, `count_common_chars`, takes in a string with two words, separated by a single white space. Find the number of unique characters that the strings have in common. For example, if the strings are ‘green’ and ‘red’, there are 2 common characters ('r' and ‘e’). You may assume only lower case characters a-z are included in the strings. You can also assume each string will have at least one character.

(1) Write a function, `sum_divisible_by_k`, that finds the sum of the numbers from 1 to N (inclusive) that are divisible by K. For example, if N = 5 and K = 2, then the set of numbers will be {1,2,3,4,5} and the subset of numbers divisible by K will be {2,4} and their sum is 6. If N or K are such that the problem isn’t possible (for instance, K = 0), then return -1.

(1) Write a function, `highest_common_factor`, to find the highest common factor of the 2 numbers. For example, the factors of 8 are the set of numbers {1,2,4,8} and the factors of 6 are the set of numbers {1,2,3,6}. The largest common factor is 2. You can assume both integers are positive and non zero.

(1) Write a function, `get_minimum`, such that the minimum of the list data is returned.

(1) Write a function, `rename_col`, which accepts three arguments, a dataframe, old column name and the new column name. In the function, update the column name from old to the new and return the modified dataframe.

(1) Write a function, `standard_deviation`, which accepts a series and returns the standard deviation of that series
(3) A function, `correlation_sum`, takes in a string of 9 numbers. Convert and/or reshape the data into a 3 x 3 DataFrame using numpy and pandas. For instance, if the string is 1 2 3 4 5 6 7 8 9 then the first row of the dataframe should be 1 2 3 and the second row should be 4 5 6.
 
Create a pariwise correlation matrix using the resulting 3 x 3 matrix and sum all the cell values of the pairwise correlation matrix. Return the resulting sum rounded to one decimal place.
 
If the input does not contain 9 ints, then return 0Hint, this can be done in a few lines of code using pandas and numpy and using the round function.
