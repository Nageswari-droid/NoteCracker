const prompt = `
I need help with active recall for interview preparation through multiple-choice questions (MCQs).

Based on your specified complexity level, I will generate:
1. Unique MCQs at your chosen difficulty level (no repetition of questions)
2. Each question will have four options (A, B, C, and D)
3. After presenting all questions, provide:
    - A complete answer key
    - Brief explanations for why each answer is correct
    - References to the specific sections in the notes

Question Source Guidelines:
- Easy Level: All questions must come directly from the provided notes
- Medium Level: Maximum of 2-3 questions can be from outside the notes
- Difficult Level: Can include application-based questions from outside the notes

Difficulty Level Criteria:
- Easy: Suitable for beginners - tests basic definitions, fundamental concepts, simple terminologies, and straightforward factual information
- Medium: Appropriate for intermediate learners - tests understanding of relationships between concepts, comparisons, analysis of processes, and ability to explain why/how something works
- Hard: Suitable for advanced learners - tests application of knowledge, real-world problem solving, scenario-based analysis, integration of multiple concepts, and critical thinking

Note about formatting:
The notes provided will contain "\n" characters indicating line breaks. Each "\n" represents a new line in the original document.

For example:
Raw notes with \n:
Single server setup: \n How web application works? \n The user initiates a request...

Should be read as:
Single server setup:
How web application works?
The user initiates a request...

Please generate questions in a strict JSON object format that can be directly parsed by JavaScript. Each question should be an object within the nested object with the following structure:
1. question: string containing the question text
2. options: array of four answer choices as strings (without A, B, C, D prefixes)
3. answer: string containing the full text of the correct answer (not just the option letter) (This should exactly match one of the options. Don't add any other text after the correct answer)
4. explanation: string containing the explanation with reference to notes

Important formatting requirements:
1. Use double quotes for all strings (required for valid JSON)
2. Use escape sequences (") for any double quotes within strings
3. Use escape sequences (') for any single quotes/apostrophes within strings
4. Do not include trailing commas after the last object
5. Do not include any code block markers
6. Return just the object of question objects
7. Ensure the output can be parsed using JSON.parse()
8. Each question object should be comma-separated
9. The entire response should be wrapped in curly braces {}
10. Each object should have a unique key (e.g., 1, 2, 3, etc.)

Example of expected format:
{
    "1": {
        "question": "What is the capital of France?",
        "options": ["Paris", "London", "Berlin", "Madrid"],
        "answer": "Paris",
        "explanation": "Paris is the capital and largest city of France"
    },
    "2": {
        "question": "What is the capital of France?",
        "options": ["Paris", "London", "Berlin", "Madrid"],
        "answer": "Paris",
        "explanation": "Paris is the capital and largest city of France"
    },
    "3": {...},
    "4": {...},
    "5": {...},
    ... continue until all questions are included
}

Example:
Sample Note:
Load Balancing is the distribution of workloads across multiple computing resources. There are two main types:

1. Round Robin: Requests are distributed sequentially across the server pool
2. Least Connection: New requests go to the server with the fewest active connections
Round Robin is simple to implement but doesn't consider server load. Least Connection is more efficient for varying workloads.

Examples for each complexity level:
Easy:
Q. What is the basic definition of Load Balancing?
A) Distribution of workloads across multiple resources
B) Connecting to a single server
C) Managing database connections
D) Writing efficient code

Medium:
Q. Compare Round Robin and Least Connection load balancing. Which statement is correct?
A) Round Robin is more complex to implement than Least Connection
B) Round Robin distributes requests sequentially while Least Connection considers active connections
C) Both methods always provide the same efficiency
D) Least Connection doesn't consider server workload

Hard:
Q. A large e-commerce platform experiences traffic spikes during flash sales, with some services requiring more processing time than others. Which load balancing strategy would you implement and why?
A) Least Connection with dynamic server scaling and service health monitoring
B) Simple Round Robin distribution
C) Random distribution with static server pools
D) First available server selection

Important Notes: 
1. The questions will be tailored to match your specified complexity level. The difficulty of questions generated will align with the complexity level you choose (Easy/Medium/Difficult).
2. After the '#################' marker, you'll find two key specifications: the number of questions and the complexity level. The MCQs and answer key will be generated according to these parameters.
3. Just return the generated questions and answer key. Nothing else!! Don't add any other text like "### Multiple-Choice Questions"

Here are my notes:
#################
`;

export default prompt;
