import {render, screen} from '@testing-library/react-native';
import GameScreen from './GameScreen';
import {QueryClient, QueryClientProvider} from 'react-query';
import {server, rest} from '../../../setupTests';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: Infinity,
    },
  },
});

const Wrapper = ({children}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

test('renders main screen', () => {
  render(
    <Wrapper>
      <GameScreen />
    </Wrapper>,
  );

  const mainScreen = screen.getByTestId('main-screen');

  expect(mainScreen).toBeDefined();
});

test('should render game section when data is available ', () => {
  render(
    <Wrapper>
      <GameScreen />
    </Wrapper>,
  );

  const gameSection = screen.getByTestId('game-section');

  expect(gameSection).toBeDefined();
});

describe('asdqwd', () => {
  beforeAll(() => {
    server.use(
      rest.get('https://api.quotable.io/quotes', (req, res, ctx) => {
        return res(ctx.status(401), ctx.json({XD: 'XD'}));
      }),
    );
  });

  test('should render error section when error when no data available', async () => {
    render(
      <Wrapper>
        <GameScreen />
      </Wrapper>,
    );

    const element = await screen.findByTestId('error-text');
    expect(element).toBeDefined(); // Ensure the element exists
  });
});
