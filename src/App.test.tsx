import { render, screen } from '@testing-library/react';

import ContactWrapper from './containers/ContactWrapper';

test('renders contact apps title', () => {
  render(<ContactWrapper />);
  const linkElement = screen.getByText(/contact apps/i);
  expect(linkElement).toBeInTheDocument();
});
