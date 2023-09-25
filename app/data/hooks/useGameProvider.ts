import {useQuotes} from '../../repository/hooks/useQuotes';
import {useEffect, useRef, useState} from 'react';
import {
  compact,
  flatten,
  groupBy,
  pick,
  random,
  sampleSize,
  shuffle,
} from 'lodash';
import {Game} from '../..//model/game';

const getCandidates = (arr: Array<any>) => {
  return sampleSize(arr, 4);
};

export const useGameProvider = () => {
  const gameRef = useRef<Game | null>(null);
  const {data, isSuccess, fetchNextPage, isError} = useQuotes();
  const [gameDataRequestCount, setGameDataRequestCount] = useState(0);

  useEffect(() => {
    if (gameDataRequestCount % 10 === 0) fetchNextPage();
  }, [gameDataRequestCount]);

  const createGameData = () => {
    if (!data) return [];
    const uniqueAuthors = groupBy(compact(flatten(data.pages)), 'author');
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

  const getQuestion = () => {
    const game = new Game(createGameData(), shuffle);
    setGameDataRequestCount(p => p + 1);
    gameRef.current = game;
    return game.getQuestion();
  };

  const checkAnswer = (answer: string) => gameRef.current?.checkAnswer(answer);

  return {
    getQuestion,
    checkAnswer,
    isReady: isSuccess,
    isError,
  };
};
