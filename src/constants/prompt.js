const prompt = `
I need help with active recall for interview/exam preparation through multiple-choice questions (MCQs).

IMPORTANT: Before generating any questions, the system will first validate the provided notes using these criteria:

Content Validity Check:
a) Notes must contain educational/professional content suitable for active recall and meaningful revision
b) Content must be related to academic or professional subjects such as:
    - Academic subjects (mathematics, science, literature, history, economics, etc.)
    - Technical topics (programming, engineering, architecture, etc.)
    - Professional concepts (business management, finance, marketing, etc.)
    - Research materials (academic papers, scientific theories, case studies)
    - Interview preparation content (technical concepts, domain knowledge)
c) Must contain clear concepts, definitions, or processes that can be tested meaningfully
d) Should have sufficient depth to generate questions at different complexity levels

The following types of personal notes are NOT valid for question generation, even if they're important to remember:
1. Daily routines or schedules
2. Shopping lists or inventory
3. Weight/fitness trackers
4. Travel plans or itineraries
5. Project summaries or ideas
6. Resource/reference lists
7. To-do lists or checklists
8. Workout routines
9. Diet plans
10. Meeting notes or minutes
11. Personal goals or reminders
12. Contact lists or directories

Examples of Valid Notes:
What is Cloud Computing?
Cloud computing is the practice of using remote servers hosted on the internet to store, manage, and process data, rather than local servers or personal computers.

Key Characteristics:
On-demand self-service
Broad network access
Resource pooling
Rapid elasticity
Measured service

Examples of Invalid Notes:
1. Shopping List:
Milk (2 gallons)
Eggs
Bread

2. Daily Schedule:
9:00 AM - Team meeting
12:00 PM - Lunch
2:00 PM - Client call

Rationale for Validation:
1. Valid notes should contain content worth studying and revising
2. Questions generated should contribute to learning and understanding
3. Personal task lists and schedules, while important, aren't suitable for educational review
4. The goal is to test understanding of concepts, not recall of personal information

If the notes are invalid:
1. Format the error response as a JSON object:
{
    "invalid": "The valid notes should consists of [first sentence explaining why the notes are invalid]. [Second sentence explaining what would make them valid]"
}

2. Before sending the response:
a) Validate the JSON string using JSON.parse()
b) Ensure all quotes and special characters are properly escaped
c) Fix any validation issues before sending
d) Only send after successful validation
e) The response must contain only the JSON object - no additional text
f) Use double quotes for all strings (required for valid JSON)
g) Use escape sequences (") for any double quotes within strings

If the notes are valid, proceed with question generation according to these parameters:
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
11. The response must contain only the JSON object - no additional text
12. No comments

Before sending the response:
1. Validate the JSON string using JSON.parse()
2. If validation fails, identify and fix the issues
3. Only send the response after successful validation
4. No response should be sent until it passes JSON.parse()
5. The response must exactly match the format

Example of response format:
"{
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
}"

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
3. Just return the generated questions and answer key. Nothing else!! Don't add any other text like "### Multiple-Choice Questions, Answer Key ###, json quotes". 

Here are my notes:
#################
`;

export default prompt;
