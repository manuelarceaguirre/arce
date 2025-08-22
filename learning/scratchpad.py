import torch
dtype = dtype.float32
u = torch.tensor([-2, 2, 1], dtype = dtype)
l2_norm = torch.norm(u)
