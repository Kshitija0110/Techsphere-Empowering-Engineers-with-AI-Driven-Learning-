
const API_URL = 'https://kshitu-genai.hf.space/get_answer';

/**
 * Fetches quiz questions for a specific topic
 * @param {string} topic - The topic to get questions for (OS, DBMS, DSA, CN)
 * @returns {Promise<Array>} - Array of question objects
 */
export const fetchQuizQuestions = async (topic) => {
  try {
    // Format the prompt to request quiz questions
    const prompt = `Generate a CS quiz with 10 multiple choice questions about ${topic}. 
    Format the response as a JSON array with each question having these fields: 
    id, question, options (array of 4 choices), and correctAnswer (the letter of the correct option).`;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: prompt })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Parse the answer from the model to extract JSON
    let questions = [];
    try {
      // The model might return the JSON within a larger text response
      // Try to extract just the JSON part
      const jsonMatch = data.answer.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        questions = JSON.parse(jsonMatch[0]);
      } else {
        // If no JSON array found, try to parse the whole response
        questions = JSON.parse(data.answer);
      }
    } catch (error) {
      console.error("Failed to parse quiz questions:", error);
      // If parsing fails, create a structured format from the text
      questions = createFallbackQuestions(data.answer, topic);
    }

    // Ensure each question has an id
    return questions.map((q, index) => ({
      ...q,
      id: q.id || `q${index + 1}`
    }));
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    throw error;
  }
};

/**
 * Creates a fallback set of questions from text response
 * This is used if the JSON parsing fails
 */
const createFallbackQuestions = (text, topic) => {
  // Basic fallback questions for each topic
  const fallbackQuestions = [
    {
      id: "q1",
      question: `What is the main function of ${topic}?`,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "A"
    },
    // Add more fallback questions...
  ];
  
  return fallbackQuestions;
};

/**
 * Submits quiz results and gets feedback
 */
export const submitQuizResults = async (topic, answers, questions) => {
  try {
    const correctAnswers = questions.filter(
      question => answers[question.id] === question.correctAnswer
    ).length;
    
    const score = (correctAnswers / questions.length) * 100;
    
    // You can also get AI feedback on the performance
    const prompt = `I just completed a quiz on ${topic} and got ${correctAnswers} out of ${questions.length} questions correct. 
    Give me some brief feedback on my performance and suggest areas to focus on for improvement.`;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ question: prompt })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      score,
      feedback: data.answer
    };
  } catch (error) {
    console.error("Error submitting quiz results:", error);
    throw error;
  }
};