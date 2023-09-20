import {QuoteResponse} from './dto';

const headersList = {
  Accept: '*/*',
};

export const getQuotesList = async (page: number) => {
  const url = new URL('https://api.quotable.io/quotes');
  url.searchParams.append('limit', '150');
  url.searchParams.append('page', page.toString());

  console.log(url);

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: headersList,
  });

  if (!response.ok) throw response.toString();

  const json: QuoteResponse = await response.json();

  return json.results;
};
