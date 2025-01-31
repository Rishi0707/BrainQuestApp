import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';
import { fetchQuizData } from '../services/quizService';
import { useState } from 'react';

function Home() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const [isHovered, setIsHovered] = useState(false);

  const startQuiz = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      const data = await fetchQuizData();
      
      if (!data || !data.questions || !Array.isArray(data.questions)) {
        throw new Error('Invalid quiz data format');
      }

      dispatch({ type: 'SET_QUESTIONS', payload: data.questions });
      dispatch({ type: 'START_QUIZ' });
      navigate('/quiz');
    } catch (error) {
      console.error('Error starting quiz:', error);
      dispatch({ type: 'SET_ERROR', payload: error.message });
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-secondary/10 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-primary">
            Brain Quest
          </h1>
          <p className="text-gray-600">
            Test your knowledge and challenge yourself!
          </p>
        </div>

        <div className="relative group">
          <div 
            className={`absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur-lg transition-all duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-75'
            } group-hover:opacity-100`}
          />
          <button
            onClick={startQuiz}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            disabled={state.loading}
            className="relative w-full py-4 bg-white rounded-lg font-semibold text-gray-800 transition-transform duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-t-2 border-primary rounded-full animate-spin" />
                <span>Loading...</span>
              </div>
            ) : (
              <span className="text-xl">Start Quiz</span>
            )}
          </button>
        </div>

        {state.error && (
          <div className="bg-error/10 text-error rounded-lg p-4 animate-shake">
            <p>{state.error}</p>
            <button
              onClick={startQuiz}
              className="text-primary hover:text-secondary mt-2 underline"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-800">10</h3>
            <p className="text-sm text-gray-600">Questions</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-800">20s</h3>
            <p className="text-sm text-gray-600">Per Question</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-800">100%</h3>
            <p className="text-sm text-gray-600">To Master</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home; 