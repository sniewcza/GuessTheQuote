import {useInfiniteQuery} from 'react-query';
import {Repository} from '../RemoteRepository';

const repository = new Repository();

export const useQuotes = () => {
  return useInfiniteQuery(
    ['quotes'],
    ({pageParam = 1}) => repository.getQuotes(pageParam),
    {
      getNextPageParam: (lastPage, pages) => pages.length + 1,
    },
  );
};
