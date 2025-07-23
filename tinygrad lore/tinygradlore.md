# What is tinygrad

On May 24, 2023 george hotz received 5,080,456.93 USD on his Mercury Balance account. He started a company called tiny corp.
They sell computers for more than they cost to make. 

On October 2020 while I was just entering college. Goerge started a side project called Tinygrad this was a side project for him to teach him about neural networks

Tinygrad is defined as: "the fastest growing neural network framework". It's goal is very simple: "To accelerate. We will commoditize the petaflop and enable AI for everyone"

Just from these sentences a lot of questions come to mind for the common citizen like:
What is neural network framework?
What is a petaflop?
Why do we want to commoditize the petaflop?
Why should I care?

# What is neural network framework?
In other words it's a library that competes with TensorFlow, Pytorch, Keras for ML Wizardry. So everytime you want to train a neural network you don't have to rewrite every low level thing necessary.

# What is a petaflop?
Unit of computational speed equal to one quadrillion (10 ^ 15) floating-point operations per second. 

# Why do we want to commoditize the petaflop?
Making computational power available and affordable

# Why should I care? 
so if you type geohot in google and click in his github pages blog you will see he points this potential problem. The best companies of AI chips failed. Many of them managed to tape out chips and some of them worked. The only problem is no one made a decent framework to use those chips. They had similar performance to NVIDIA but worse software. so NVIDIA became the hottest stock and the only reliable option for ML (like realistically?)

First I like putting myself into impossible tasks. If not I do not get motivated, I have lots of those impossible tasks in mind but I think this is one I would want to have. There is in my mind this possibility. Somehow I get to know more of the tinygrad library even tho I am not a good coder. I get some PRs. I became good enough so I can improve this and could get hired. The fun thing about this company is they do not see your resume at all. They just care about your PRs. I think this is a really cool way to hire and you could work anywhere?

reading more about tinygrad you get into this paragraph
"
I think the only way to start an AI chip company is to start with the software. The computing in ML is not *general purpose computing*. 95% of models in use today (including LLMs and image generation) have all their *compute and memory accesses statically computable*.
Unfortunately, this advantage is thrown away the minute you have something like CUDA in your stack. Once you are calling in to *Turing complete kernels, you can no longer reason about their behavior. You fall back to caching, warp scheduling, and branch prediction.*"

I am going to be honest with you I did not understand these highlighted parts

"Computing in ML is not general purpose computing"
    CPU's can't do this. this is what it means

"95% of models in use today... have all their compute and memory accesses statically computable"
    for most modern models you know exactly what operations and memory reads/writes will happen ahead of time
    statically computable"analyze the program without running it and predict how it will behave, which data it will use, what order, how much compute"
    this was a little troubling for me because I thought we did not understand wtf llms were doing. But after more digging. There is a difference on model interpretability and execution. We do not understand why a neural network predict something is a cat or a dog. Butttt we know what steps the model takes: matrix multiply then another operations etc

so ok too much fluff the story is interesting so how about the technical stuff?
