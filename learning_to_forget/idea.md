## Context-as-a-Tool / Learning to Forget

We know that model performance on tasks depends on how much context has been used so far (context rot [18]), which is particularly relevant for long-horizon tasks. What if we could RL a model to be aware of when it's getting confused by irrelevant or even adversarial context, and drop it from its context? This is roughly analogous to how humans take a step back and either go for a walk or clean up their desk when they're getting overwhelmed by a task.

The idea: add a tool that allows the model to modify its own context/prompt (e.g., "delete lines A to B of your prompt before embarking on this task") before rolling out. This is "Context-as-a-Tool" or "Learning to Forget." Then RL on learning to use this tool.

Experimentally, several approaches could work: (1) Random context edits followed by measuring downstream performance differences—e.g., the delta in perplexity on ground truth completions vs. corrupted ones after the edit. (2) Starting with CoT-based proposals where the model uses reasoning to suggest edits within <edit></edit> tool calls, then measuring task performance improvements and use those as reward signal (e.g. the delta in downstream performance).

The tricky thing here is task selection/construction. There are a lot of long context evals, but one wants to find a task where eliminating some context by judging it's irrelevant to the task at hand is easier than actually solving the task, which is not always the case. There certainly is a wide range of tasks where I'd expect this to be the case though (needle in a haystack is a trivial example), so it seems tractable.

The underlying intuition motivating this: reasoning is to generating context as learned forgetting is to omitting context. Both are forms of meta-cognition about what information and subtasks are relevant to a task.
