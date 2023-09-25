// setupTests.js

import {setupServer} from 'msw/node';
import {rest} from 'msw';

const server = setupServer(
  // Define your request handlers here
  rest.get('https://api.quotable.io/quotes', (req, res, ctx) => {
    // Mock response data
    return res(
      ctx.status(200),
      ctx.text('mock text'),
      ctx.json({
        results: [
          {
            _id: 'VsarQ0iEgE1',
            content:
              "Life isn't about finding yourself. Life is about creating yourself.",
            author: 'Bernard Shaw',
            tags: ['Famous Quotes'],
            authorSlug: 'bernard-shaw',
            length: 67,
            dateAdded: '2021-03-28',
            dateModified: '2023-04-14',
          },
          {
            _id: 'Q2PbsPMcCJ',
            content:
              "What makes Superman a hero is not that he has power, but that he has the wisdom and the maturity to use the power wisely. From an acting point of view, that's how I approached the part.",
            author: 'Christopher Reeve',
            tags: ['Wisdom'],
            authorSlug: 'christopher-reeve',
            length: 185,
            dateAdded: '2021-03-28',
            dateModified: '2023-04-14',
          },
          {
            _id: '9TcfpSrTNTkv',
            content:
              'The world cares very little about what a man or woman knows; it is what a man or woman is able to do that counts.',
            author: 'Booker T. Washington',
            tags: ['Famous Quotes'],
            authorSlug: 'booker-t-washington',
            length: 113,
            dateAdded: '2021-03-28',
            dateModified: '2023-04-14',
          },
          {
            _id: 'eobAW2Ou0',
            content: 'You win the victory when you yield to friends.',
            author: 'Sophocles',
            tags: ['Friendship'],
            authorSlug: 'sophocles',
            length: 46,
            dateAdded: '2021-03-26',
            dateModified: '2023-04-14',
          },
        ],
      }),
    );
  }),
);

// Start the server before tests run
beforeAll(() => server.listen());

// Clean up after tests
afterAll(() => server.close());

export {server, rest};
