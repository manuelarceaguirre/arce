# Create a new Matrix
xm <- matrix(1:6, ncol = 3, nrow = 2)
# Display Matrix Values
xm
# Display Matrix Structure
str(xm)
# Display Matrix length and number of columns and rows and dim
length(xm) 
nrow(xm)  
ncol(xm)
dim(xm)
# Assign a value to a Matrix Cell
xm[2,2] <- 44
# Display Matrix Values
xm

# Use indexing notation to pull a subsection of matrix
xm[2,2]

xm[3:4] # ?

xm[4:3] # ?


# Define a name for each column and row in a Matrix
rownames(xm) <- c("r_A", "r_B")
colnames(xm) <- c("c_A", "c_B", "c_C")
xm

# Mathematical operations on Matrix

xm[2,2] + 50
xm

## Let's create a matrix other way (ncol?)
m2 <- matrix(c(T,T,F,F,NA,NA), nrow = 2)
m2

## Fill by row
m3 <- matrix(c(T,T,F,F,NA,NA), nrow = 2, byrow = TRUE)
m3
length(m3)
xm[3:4]


## Create matrix by combining vectors of the same length
# Create 3 vectors of the same type
vector_1 <- c(1,2,3)
vector_2 <- c(4,5,6)
vector_3 <- c(7,8,9)

class(vector_1)

## cbind() and rbind() create matrices by combining vectors of the same length. 
## cbind() combines vectors as columns, rbind() combines them as rows.

matrix_rows <- rbind(vector_1, vector_2, vector_3)
matrix_rows

matrix_columns <- cbind(vector_1, vector_2, vector_3)
matrix_columns

## Lets look at array
# Array examples:
l_arr <- array(0, 3)  # 1D array - vector
l_arr

# Add a dimension
twod_arr = array(0.0, c(2,3))  # 2D array 2x3 - matrix
twod_arr

#Add another Dimension
nd_arr = array(0.0, c(2,3,4)) # 2x3x4 3D array - 3 dim array
print(nd_arr)  # 24 values 

dim(nd_arr)
str(nd_arr)




