import axios from 'axios';

// Get the base URL based on environment
const getBaseUrl = () => {
  if (import.meta.env.DEV) {
    // Development environment - use proxy
    return '/api/Uw5CrX';
  } else {
    // Production environment - use direct URL
    return 'https://brain-quest-app.vercel.app/api/Uw5CrX';
  }
};

const API_URL = getBaseUrl();

// Fallback endpoints if needed
const FALLBACK_ENDPOINTS = {
  direct: 'https://api.jsonserve.com/Uw5CrX',
  corsProxy: 'https://cors-anywhere.herokuapp.com/https://api.jsonserve.com/Uw5CrX'
};

// Utility function to shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Transform API data to match our quiz format with randomization
const transformApiData = (apiData) => {
  // Get all questions and shuffle them
  const shuffledQuestions = shuffleArray(apiData.questions);
  
  // Take first 10 questions (or all if less than 10)
  const selectedQuestions = shuffledQuestions.slice(0, 10);

  return {
    questions: selectedQuestions.map(q => ({
      question: q.description,
      // Shuffle the options for each question
      options: shuffleArray(q.options.map(opt => ({
        text: opt.description,
        isCorrect: opt.is_correct
      })))
    }))
  };
};

// Attempt to fetch from different endpoints
const attemptFetch = async (url, options = {}) => {
  try {
    const response = await axios({
      url,
      method: 'GET',
      timeout: 5000,
      ...options,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    throw error;
  }
};

// Try JSONP as a fallback
const fetchJsonp = (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const callbackName = 'jsonpCallback_' + Math.random().toString(36).substr(2, 9);
    
    window[callbackName] = (data) => {
      delete window[callbackName];
      document.body.removeChild(script);
      resolve(data);
    };

    script.src = `${url}&callback=${callbackName}`;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};

export const fetchQuizData = async () => {
  try {
    console.log('Fetching quiz data...');
    const response = await axios.get(API_URL, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Quiz data received successfully');
    return transformApiData(response.data);
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    throw new Error('Failed to fetch quiz data. Please try again.');
  }
}; 