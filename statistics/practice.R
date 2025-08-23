# Biased coin simulation: 10 batches × 50 tosses (p(Head)=0.7)
set.seed(20250819)
n_batches  <- 10
batch_size <- 50
p_head     <- 0.7

# Generate all 500 tosses at once as 0/1 (1 = Head)
tosses <- rbinom(n_batches * batch_size, size = 1, prob = p_head)

# Reshape into a 50×10 matrix - CHANGE: byrow = FALSE
M <- matrix(tosses, nrow = batch_size, ncol = n_batches, byrow = FALSE)
heads_per_batch <- colSums(M)

# Show the results
heads_per_batch
cat(paste(heads_per_batch, collapse = ", "), "\n")
