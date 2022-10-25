import {render, screen} from '@testing-library/react-native';
import App from '../App';

describe('app splash screen test', () => {
  it('should show splash screen with header', () => {
    render(<App />);
    const mainScreen = screen.getByTestId('main-screen');
    const header = screen.getByTestId('main-headerr');
    expect(mainScreen).not.toBeNull();
    expect(header).not.toBeNull();
  });
});
