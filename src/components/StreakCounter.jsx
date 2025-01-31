import { useEffect } from 'react';

function StreakCounter({ streak }) {
  if (streak < 2) return null;

  return (
    <div className="fixed top-4 right-4 bg-primary text-white px-4 py-2 rounded-full animate-bounce">
      <span className="font-bold">{streak}x</span> Streak!
    </div>
  );
}

export default StreakCounter; 