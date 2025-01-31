import { createContext, useContext, useReducer } from 'react';

const QuizContext = createContext();

const initialState = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  loading: false,
  error: null,
  isQuizStarted: false,
  isQuizFinished: false,
};

function quizReducer(state, action) {
  console.log('Reducer action:', action.type, action.payload);
  
  switch (action.type) {
    case 'SET_QUESTIONS':
      return { 
        ...state, 
        questions: action.payload,
        loading: false,
        error: null,
        currentQuestionIndex: 0,
        score: 0,
        isQuizFinished: false
      };
    case 'START_QUIZ':
      return { 
        ...state, 
        isQuizStarted: true,
        currentQuestionIndex: 0,
        score: 0,
        error: null,
        isQuizFinished: false
      };
    case 'NEXT_QUESTION':
      return { 
        ...state, 
        currentQuestionIndex: state.currentQuestionIndex + 1
      };
    case 'UPDATE_SCORE':
      return { 
        ...state, 
        score: state.score + action.payload 
      };
    case 'FINISH_QUIZ':
      return {
        ...state,
        isQuizFinished: true,
        isQuizStarted: false,
        currentQuestionIndex: state.questions.length - 1,
        score: state.score,
        questions: state.questions,
        loading: false,
        error: null
      };
    case 'SET_LOADING':
      return { 
        ...state, 
        loading: action.payload,
        error: null 
      };
    case 'SET_ERROR':
      return { 
        ...state, 
        error: action.payload,
        loading: false 
      };
    case 'RESET_QUIZ':
      return {
        ...initialState,
        questions: []
      };
    default:
      return state;
  }
}

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  console.log('Current Quiz State:', state);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
} 