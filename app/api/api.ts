import {QuoteResponse} from './dto';

const headersList = {
  Accept: '*/*',
};

export const getQuotesList = async (page: number) => {
  const url = new URL('https://api.quotable.io/quotes');
  url.searchParams.append('limit', '150');
  url.searchParams.append('page', page.toString());

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: headersList,
  });

  if (!response.ok) {
    if (response.status >= 400 && response.status < 500) {
      throw new Error(
        `Client Error: Request failed with status ${response.status}`,
      );
    } else if (response.status >= 500) {
      throw new Error('Server Error: Request failed due to server issues');
    }
  }

  const json: QuoteResponse = await response.json();

  return json.results;
};
