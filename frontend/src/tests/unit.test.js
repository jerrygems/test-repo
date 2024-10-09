import { render,screen } from '@testing-library/react';
import App from '../App';

test('renders correctly', () => {
  render(<App />);
  expect(screen.getByText(/Data from backend/i)).toBeInTheDocument();
});
