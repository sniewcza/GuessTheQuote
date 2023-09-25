/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './app/ui/screens/GameScreen';
import {name as appName} from './app.json';
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

const Wrapper = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};
AppRegistry.registerComponent(appName, () => Wrapper);
