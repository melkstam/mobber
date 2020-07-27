import React from 'react';
import { render } from '@testing-library/react';
import Layout from './Layout';

describe('<Layout />', () => {
  it('renders app name', () => {
    const { getByText } = render(<Layout>Contents</Layout>);

    expect(getByText('Mobber')).toBeInTheDocument();
  });

  it('renders children', () => {
    const children = <p>Children</p>;

    const { getByText } = render(<Layout>{children}</Layout>);

    expect(getByText('Children')).toBeInTheDocument();
  });
});
