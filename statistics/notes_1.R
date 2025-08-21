# Variables
a <- 100
# print
print(a)

# vectors
# atomic vectors -> we only have 1 data type
# list -> different types other lists
# typeof()
# length()
# attributes()

# a <- 10
# b <- 3
# a + b   # addition
# a - b   # subtraction
# a * b   # multiplication
# a / b   # division
# a ^ b   # power (10^3)
# a %% b  # modulus (remainder)
# a %/% b # integer division (floor)

# numbers <- c(1, 2, 3, 4, 5)  # combine into a vector
# numbers[1]   # first element (R is 1-indexed!)

# df <- data.frame(
#   name = c("Alice", "Bob"),
#   age = c(25, 30)
# )
# print(df)

# data stuctures list
# list()
# str() can be used to see the structure of the R object

# matrix and array
# matrix is a 2 dimensional atomic array
# matrix can't contain different types of data
#   -> created using the matrix() command while array uses the array()

# array is a vector with one or more dimensions
#   array with one dimension -> ~ vector
#   array with two dimension -> ~ matrix
#   array with three dimension -> ~ n_dimensional array

# dataframe
# list of equal length vectors with a 2 dimensional structure
#   shrae the properties of both the matrix and list
#   each column must be the samt type but can vary by column
#   colnames() rownames()

# vector--dataframe - 
#   |                \
#   |-----matrix ----list
#   |       |        /
#   |-----array------

# there is no boolean on R
# creating integer vector using the c() command
int_v <- c(1L, 2L, 3L, 4L)

# double
dbl_v <- c(1, 2.1 ,3.1)

# logical
dbl_v <- c(TRUE, FALSE, T, F, NA)
chr_v <- c('Hello', "R for DS", 1)

# list all vector elements
chr_v
# test if the vector is atomic
is.atomic(chr_v)

typeof(chr_v)

# list only the first element
chr_v[1]

# list first 2 elements
chr_v[2:3]
# colon operator -> from:to
# 1:10 -> (1, 2, 3, 4, 5, 6, 7, 8, 9, 19)

# check for arbitrary metadata
attributes(chr_v)

test_v <- c(1L, 'test', 3) # vector is always atomic
# its speaking to the less restrictive data type
# 1L 1 integer
is.atomic(test_v)
# everything will become character
# 1L -> means this object will be 1 integer
# flashcard -> what will this print?
test_v <- c(1L, 'test', 3) 
test_v
is.atomic(test_v)


## lists
# create a list note how the first element of the list looks like
l_list = <- list(1:5, 'hello', c(TRUE, FALSE, NA), c(1.1, 2.1 , 3.9))
l_list

# str() command can be used to see the structre
str(l_list)

# test if its a list
is.list(l_list)
typeof(l_list)
length(l_list)
attributes(l_list)
names(l_list)

# to get access to elements guess the corresponding returns
l_list[[2]]
l_list[[3]]
l_list[[2]][2]

#create a list with names
names_list <- list(a = 1:5, b = "Hello", c = c(TRUE, FLASE, NA), d = c(1.1, 2.1, 3.9))

# lets check again for attributes and names
attributes(names_list)
names(names_list)

str(names_list)

names_lis$a
names_lis$c

# ?
names_list$c[2]

# matrices 
xm <- matrix(1:6, ncol = 2, nrow = 3)
# this fills columns wise
# [1, 4]
# [2, 5]
# [3, 6]

# display matrix values
xm
# display matrix structure
str(xm)

# assign a value to a matrix cell
xm[2, 2] <- 44
xm
paste('hello terminal', dim(xm))
# use indexing positino to pull
xm[2, 2]
xm[3:4]
xm[4:3]
paste(3 4)

xm[c(1, 3, 4, 5)]

# defin a name for each column and row in matrix
rownames(xm) <- c("r_A", "r_B", "x")
colnames(xm) <- c("c_A", "c_B")
xm
paste('this will change the names and rows of the columns')

# mathematical operations in matrixes
pos_2_2_50_value <- xm[2, 2] + 50
pos_2_2_50_value

# lets create a matrix the other way (ncol?)
m2 <- matrix(c(T,T,F,F,NA,NA,NA,NA), nrow = 2)
m2

# fill by row
m3 <- matrix(c(T,T,F,F,NA,NA), nrow = 2, byrow = TRUE)
m3
length(m3)
m3[3:4]

# ok so even if we define the nrow values when we use 
# [start:stop] 
# we are grabbing the values by columns never by rows
# NEVER BY ROWS 

# flashcard

# create matrix by combining vectors of the same len()
# create 3 vectors 

vectors_1 <- c(1,2,3)
vectors_2 <- c(4,5,6)
vectors_3 <- c(7,8,9)

matrix_rows <- rbind(vectors_1, vectors_2, vectors_3)
matrix_rows
# on top of each other
matrix_rows <- cbind(vectors_1, vectors_2, vectors_3)
matrix_rows
# by columns concat

# now we can jump to array

l_arr <- array(0,3) #1d array
# 0 data across the whole array
# 3 is the dimension
# flashcard

l_arr
#this will print 0 0 0

# add a dimension
twod_array = array(0.0, c(2,3))
twod_array
# this will create
# 0 0 0
# 0 0 0

threedarray = array(0.0, c(2,3,4))
threedarray
# 24 values



# first excercise
m2 <- matrix(c(1:25), nrow = 5, byrow=TRUE)
m2
m2[3,5]
m2[6:8]
m2[20:19]
m2[, 5] <- m2[, 5] + 10
m2

cbind(mymatrix*2, c(1,2,3,4,5))

# vectorization
# basically numpy


