import {getQuotesList} from '../api/api';
import {Quote} from '../model/quote';

export class Repository {
  public async getQuotes(page: number) {
    try {
      const quotes = await getQuotesList(page);
      return quotes?.map<Quote>(q => ({author: q.author, content: q.content}));
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}
