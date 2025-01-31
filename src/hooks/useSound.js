import { useCallback } from 'react';

const correctSound = new Audio('/sounds/correct.mp3');
const incorrectSound = new Audio('/sounds/incorrect.mp3');
const completionSound = new Audio('/sounds/complete.mp3');

export function useQuizSounds() {
  const playCorrect = useCallback(() => {
    correctSound.currentTime = 0;
    correctSound.play();
  }, []);

  const playIncorrect = useCallback(() => {
    incorrectSound.currentTime = 0;
    incorrectSound.play();
  }, []);

  const playComplete = useCallback(() => {
    completionSound.currentTime = 0;
    completionSound.play();
  }, []);

  return { playCorrect, playIncorrect, playComplete };
} 