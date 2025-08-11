fibseq <- function(n) {
  if (n <= 0) {
    return(numeric(0))
  } else if (n == 1) {
    return(1)
  } else if (n == 2) {
    return(c(1, 1))
  } else {
    fib <- numeric(n)
    fib[1] <- 1
    fib[2] <- 1
    print(paste("Starting with:", fib[1], fib[2]))
    for (i in 3:n) {
      fib[i] <- fib[i-1] + fib[i-2]
      print(paste("Step", i, ":", fib[i]))
    }
    print(fib)
    return(fib)
  }
}

elcheck <- function(x, y) {
  result <- integer(length(x))
  print(paste("x length:", length(x), "y length:", length(y)))
  for (i in 1:length(x)) {
    if (i <= length(y)) {
      if (is.na(x[i]) && is.na(y[i])) {
        result[i] <- 1L
        print(paste("Position", i, ": both NA, match = 1"))
      } else if (is.na(x[i]) || is.na(y[i])) {
        result[i] <- 0L
        print(paste("Position", i, ": one NA, match = 0"))
      } else if (x[i] == y[i]) {
        result[i] <- 1L
        print(paste("Position", i, ":", x[i], "==", y[i], ", match = 1"))
      } else {
        result[i] <- 0L
        print(paste("Position", i, ":", x[i], "!=", y[i], ", match = 0"))
      }
    } else {
      result[i] <- 0L
      print(paste("Position", i, ": y too short, match = 0"))
    }
  }
  print(result)
  return(result)
}

topingredients <- function(file) {
  data <- read.csv(file, stringsAsFactors = FALSE)
  print(paste("Loaded", nrow(data), "recipes"))
  
  counts <- list()
  
  for (i in 1:nrow(data)) {
    input <- data$ingredients[i]
    items <- strsplit(input, ",")[[1]]
    items <- trimws(items)
    items <- tolower(items)
    print(paste("Recipe", i, "has", length(items), "ingredients"))
    
    for (item in items) {
      if (is.null(counts[[item]])) {
        counts[[item]] <- 0
      }
      counts[[item]] <- counts[[item]] + 1
    }
  }
  
  names_list <- names(counts)
  count_values <- unlist(counts)
  print(paste("Total unique ingredients:", length(names_list)))
  
  df <- data.frame(
    name = names_list,
    count = count_values,
    stringsAsFactors = FALSE
  )
  
  df <- df[order(-df$count, df$name), ]
  print("Top ingredients:")
  print(head(df))
  
  if (nrow(df) > 3) {
    df <- df[1:3, ]
  }
  
  row.names(df) <- NULL
  print("Final result:")
  print(df)
  return(df)
}
