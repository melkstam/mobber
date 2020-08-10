import React from 'react';
import { render } from '@testing-library/react';
import Layout from './Layout';
import { TimerState } from '../../lib/timerMachine/timerMachineDeclarations';

const setupState = (): TimerState => {
  const state: Partial<TimerState> = {
    matches: jest.fn().mockImplementation(() => true),
  };
  return state as TimerState;
};

describe('<Layout />', () => {
  it('renders app name', () => {
    const state = setupState();
    const { getByText } = render(
      <Layout
        state={state}
        send={jest.fn()}
      >
        Contents
      </Layout>,
    );

    expect(getByText('Mobber')).toBeInTheDocument();
  });

  it('renders children', () => {
    const state = setupState();
    const children = <p>Children</p>;

    const { getByText } = render(
      <Layout
        state={state}
        send={jest.fn()}
      >
        {children}
      </Layout>,
    );

    expect(getByText('Children')).toBeInTheDocument();
  });
});
