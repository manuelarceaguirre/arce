# Create a Data Frame
df <- data.frame(x = 1:5, y = c("a", "b", "c", "d", "e"))
str(df)

# Function on data Frames
names(df)
colnames(df)
rownames(df)
length(df) 
ncol(df)
nrow(df)

dim(df)

# View data frame
View(df)

# Rename columns
names(df) <- c("Xx", "Yy")
names(df)

## cbind() and rbing() R functions can be used to add column and row
# Add a new column
cbind(df, data.frame(z = 6:10))

# Add a new row
rbind(df, data.frame(x=6, y="f"))

df6 <- rbind(df, data.frame(x=6, y="f"))
df6

## Accessing specific columns, using the $ notation
## Display columns
df$x
df$y
typeof(df$x)
typeof(df$y)

# Create a new Data Frame
df <- data.frame(x = c("A","B","C"))
# Display Data Frame
print(df)
# Assign a list of Vectors as a Data Frame column
df$y <- list(1:2, 3:5, 6:9)
print(df)
print(df$y)

## Data Frame is a list of equal-length vectors with a 2-dimensional structure

# 3 vectors of different types
vector_n <- c(1,2,3)
vector_c <- c("a","b","c")
vector_l <- c(T,F,T)

# Combine vectors as columns
df_c <- cbind(vector_n,vector_c,vector_l)
df_c 
typeof(df_c) # it's a Matrix of one data type
typeof(df_c[1,1])

# character > numeric > logical (going to least restrictive data type)
df_n <- cbind(vector_n,vector_l)
df_n
typeof(df_n[1,1])
typeof(df_n[1,2])

# Use function as.data.frame to make it a data frame
df_all <- as.data.frame(cbind(vector_n,vector_c,vector_l))
is.data.frame(df_all)

View(df_all)

# Accessing specific element
df_all[2,2]

df_all[2:3,2:3]

df_all$vector_n

df_all$vector_n[2]

# Lets look at an example: built-in dataset called mtcars (is made available by the data function)

data(mtcars)

str(mtcars)
dim(mtcars)

names(mtcars)
rownames(mtcars)

help("mtcars") 

## To display first or last six rows of data set we can use head() or tail()
mtcars
head(mtcars)
tail(mtcars)

View(mtcars)

## Access to data frame values

mtcars[1, 1] 
mtcars[, 1] # returns ALL elements in the first column 
mtcars[1, ] # returns ALL elements in the first row 
mtcars[1, c(1, 3, 8)] # ?

v1 <- mtcars[1, c(1, 3, 8)]
str(v1)
v2 <- mtcars[5, c(1, 3, 8)]

subset_1 <- rbind(v1,v2) # combined two pulls 

mtcars$mpg  # returns ALL elements in the mpg column 



## Coercing types

(coerce_1 <- c(1, "a", T, 2L))
typeof(coerce_1)

(coerce_2 <- 1)
typeof(coerce_2)

(coerce_3 <- as.integer(1))
typeof(coerce_3)
mtcars
mtcars[1]
v1 <- mtcars[13, c(1, 4, 6)]
str(v1)
v2 <- mtcars[5, c(1, 3, 8)]
subset_1 <- rbind(v1,v2)

subset_1
subset_1 <- rbind(v1,v2)
# 2. 
v1 <- mtcars[13, c(1, 4, 6)]
v2 <- mtcars[24, c(1, 4, 6)]
v3 <- mtcars[30, c(1, 4, 6)]
v1
v2
v3
subset_2 <- rbind(v1,v2, v3)
subset_2
names(subset_2) <- c("Miles/(US) gallon
", "Gross horsepower
", "Weight (1000 lbs)")
subset_2
View(subset_2)
