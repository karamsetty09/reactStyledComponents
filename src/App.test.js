import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  render(<App />);
  const headingElement = await screen.findByText(/V-DAQ/i);
  expect(headingElement).toBeInTheDocument();
  expect(headingElement).toBeVisible();
});
