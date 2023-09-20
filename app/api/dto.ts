export type QuoteResponse = {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
  lastItemIndex: number;
  results: Array<{
    _id: string;
    content: string;
    author: string;
    authorSlug: string;
    length: number;
    tags: string[];
  }>;
};
