import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders options on start', () => {
  const { getByText } = render(<App />);
  const optionsContent = getByText(/Options/);
  expect(optionsContent).toBeInTheDocument();
});
