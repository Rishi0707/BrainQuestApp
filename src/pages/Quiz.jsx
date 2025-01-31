import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../contexts/QuizContext';
import LoadingSpinner from '../components/LoadingSpinner';
import Progress from '../components/Progress';
import Timer from '../components/Timer';
import StreakCounter from '../components/StreakCounter';
import { useState } from 'react';

function Quiz() {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (!state.isQuizStarted || !state.questions.length) {
      navigate('/');
    }
  }, [state.isQuizStarted, state.questions.length, navigate]);

  const handleAnswerClick = async (isCorrect, index) => {
    setSelectedAnswer(index);
    setShowFeedback(true);

    if (isCorrect) {
      setStreak(prev => prev + 1);
      dispatch({ type: 'UPDATE_SCORE', payload: 10 });
    } else {
      setStreak(0);
    }

    // Wait for feedback animation
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowFeedback(false);
    setSelectedAnswer(null);

    const isLastQuestion = state.currentQuestionIndex === state.questions.length - 1;

    if (isLastQuestion) {
      dispatch({ type: 'FINISH_QUIZ' });
      navigate('/results', { replace: true });
    } else {
      dispatch({ type: 'NEXT_QUESTION' });
    }
  };

  if (state.loading) return <LoadingSpinner />;
  if (state.error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-error">{state.error}</div>
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentQuestionIndex];
  if (!currentQuestion) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-secondary/10 p-4">
      <StreakCounter streak={streak} />
      
      <div className="container mx-auto max-w-2xl">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-4">
          <Progress />
          <Timer />
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mt-4">
          <h2 className="text-xl font-semibold mb-6">
            {currentQuestion.question}
          </h2>
          
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(option.isCorrect, index)}
                disabled={showFeedback}
                className={`w-full p-4 text-left rounded-lg border transition-all duration-300 transform hover:scale-105 ${
                  selectedAnswer === index
                    ? option.isCorrect
                      ? 'bg-success/10 border-success'
                      : 'bg-error/10 border-error'
                    : 'border-gray-200 hover:border-primary'
                } ${showFeedback ? 'cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 mr-3">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option.text}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz; 