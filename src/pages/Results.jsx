import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';
import LoadingSpinner from '../components/LoadingSpinner';

function Results() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const [showAnimation, setShowAnimation] = useState(false);

  // Ensure we have the required state
  const hasRequiredState = state.isQuizFinished && 
    state.questions.length > 0 && 
    typeof state.score === 'number';

  useEffect(() => {
    if (!hasRequiredState) {
      navigate('/', { replace: true });
      return;
    }
    setShowAnimation(true);
  }, [hasRequiredState, navigate]);

  const handleRetry = () => {
    setShowAnimation(false);
    setTimeout(() => {
      dispatch({ type: 'RESET_QUIZ' });
      navigate('/', { replace: true });
    }, 300);
  };

  if (!hasRequiredState) {
    return <LoadingSpinner />;
  }

  const totalQuestions = state.questions.length;
  const percentage = Math.round((state.score / (totalQuestions * 10)) * 100);
  const correctAnswers = state.score / 10;

  const getFeedback = () => {
    if (percentage >= 80) return { message: "Excellent!", class: "text-success" };
    if (percentage >= 60) return { message: "Good job!", class: "text-primary" };
    return { message: "Keep practicing!", class: "text-error" };
  };

  const feedback = getFeedback();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div 
        className={`bg-white p-8 rounded-lg shadow-lg max-w-md w-full transform transition-all duration-500 ${
          showAnimation ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Quiz Results</h1>
        
        <div className="text-center mb-8">
          <div className="mb-4">
            <p className={`text-6xl font-bold mb-2 ${feedback.class}`}>
              {percentage}%
            </p>
            <p className="text-xl font-semibold text-gray-600">
              {feedback.message}
            </p>
          </div>
          
          <div className="space-y-2 text-gray-600">
            <p>Total Score: {state.score} points</p>
            <p>Questions Attempted: {totalQuestions}</p>
            <p>Correct Answers: {correctAnswers}</p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleRetry}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/', { replace: true })}
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results; 