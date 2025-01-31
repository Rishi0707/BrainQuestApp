import { useEffect, useState } from 'react';
import { useQuiz } from '../contexts/QuizContext';

function Timer({ duration = 20 }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const { state, dispatch } = useQuiz();

  useEffect(() => {
    // Reset timer when question changes
    setTimeLeft(duration);
  }, [state.currentQuestionIndex, duration]);

  useEffect(() => {
    if (timeLeft === 0) {
      // Auto-submit when time runs out
      dispatch({ type: 'NEXT_QUESTION' });
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, dispatch]);

  // Calculate percentage for progress bar
  const percentage = (timeLeft / duration) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Time Remaining</span>
        <span>{timeLeft}s</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full transition-all duration-1000 ${
            timeLeft <= 5 ? 'bg-error' : 'bg-primary'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default Timer; 