import {Question} from 'app/model/question';
import {useEffect, useState} from 'react';
import {useGameProvider} from '../../data/hooks/useGameProvider';

export const useGame = () => {
  const [gameCounter, setGameCounter] = useState(0);
  const {getQuestion, checkAnswer, isError, isReady} = useGameProvider();

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);

  useEffect(() => {
    if (isReady) startNewGame();
  }, [isReady]);

  const startNewGame = () => {
    setSelectedAnswer(null);
    setQuestion(getQuestion());
    setGameCounter(prev => prev + 1);
  };

  return {
    reset: startNewGame,
    question,
    selectedAnswer,
    isCorrect: selectedAnswer ? checkAnswer(selectedAnswer) : undefined,
    onSelectedAnswerChange: setSelectedAnswer,
    isError,
  } as const;
};
