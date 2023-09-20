import {Game} from '../../model/game';
import {Repository} from '../../repository/RemoteRepository';
import {Question} from 'app/model/question';
import {groupBy, shuffle, pick, random, sampleSize} from 'lodash';
import {Quote} from '../..//model/quote';
import {useEffect, useRef, useState} from 'react';

const getCandidates = (arr: Array<any>) => {
  return sampleSize(arr, 4);
};

export const useGame = () => {
  const gameRef = useRef<Game | null>(null);
  const repository = useRef(new Repository());

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);

  const [data, setData] = useState<Quote[] | null>(null);

  useEffect(() => {
    const init = async () => {
      const data = await repository.current.getQuotes(1);

      if (!data) return;
      setData(data);
      startNewGame();
    };
    init();
  }, []);

  const createGameData = () => {
    if (!data) return [];
    const uniqueAuthors = groupBy(data, 'author');
    const shuffled = shuffle(Object.keys(uniqueAuthors));
    const candidates = getCandidates(shuffled);
    const candidatesQuotes = pick(uniqueAuthors, candidates);

    const gameData = Object.values(candidatesQuotes).reduce((acc, curr) => {
      const index = curr.length === 1 ? 0 : random(curr.length - 1);
      acc.push(curr[index]);
      return acc;
    }, []);

    return gameData;
  };

  const startNewGame = () => {
    const gameData = createGameData();
    gameRef.current = new Game(gameData, shuffle);

    setSelectedAnswer(null);
    setQuestion(gameRef.current.getQuestion());
  };

  const reset = () => {
    startNewGame();
  };

  const onSelectedAnswerChange = (answer: string) => {
    setSelectedAnswer(answer);
  };

  return {
    reset,
    question,
    selectedAnswer,
    isCorrect: selectedAnswer
      ? gameRef.current?.checkAnswer(selectedAnswer)
      : undefined,
    onSelectedAnswerChange,
  } as const;
};
