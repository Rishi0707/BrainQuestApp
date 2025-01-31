import { useEffect, useState } from 'react';

function QuestionTransition({ onComplete }) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [count, onComplete]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="text-6xl text-white font-bold animate-pulse">
        {count}
      </div>
    </div>
  );
}

export default QuestionTransition; 