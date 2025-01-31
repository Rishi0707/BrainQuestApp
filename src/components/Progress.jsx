import { useQuiz } from '../contexts/QuizContext';

function Progress() {
  const { state } = useQuiz();
  const progress = ((state.currentQuestionIndex + 1) / state.questions.length) * 100;

  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>Question {state.currentQuestionIndex + 1} of {state.questions.length}</span>
        <span>Score: {state.score}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-secondary h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default Progress; 