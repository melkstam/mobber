import React from 'react';
import { render } from '@testing-library/react';

import { TimerState } from '../../lib/timerMachine/timerMachineDeclarations';
import CurrentUser from './CurrentUser';

type RecursivePartial<T> = {
  [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object ? RecursivePartial<T[P]> :
    T[P];
};

describe('<CurrentUser />', () => {
  const state: RecursivePartial<TimerState> = {
    context: {
      activeUsers: ['Eric', 'Sophie', 'Nathan'],
    },
  };

  it('displays current driver', () => {
    const { getByText } = render(
      <CurrentUser
        state={state as TimerState}
        send={jest.fn()}
      />,
    );

    expect(getByText('Eric')).toBeInTheDocument();
  });

  it('displays next driver if', () => {
    const { getByText } = render(
      <CurrentUser
        state={state as TimerState}
        send={jest.fn()}
      />,
    );

    expect(getByText('Sophie')).toBeInTheDocument();
  });

  it('doesn\'t display up next when only one active user', () => {
    const stateOneActive: RecursivePartial<TimerState> = {
      context: {
        activeUsers: ['Eric'],
      },
    };

    const { queryByText } = render(
      <CurrentUser
        state={stateOneActive as TimerState}
        send={jest.fn()}
      />,
    );

    expect(queryByText(/Up next/)).not.toBeInTheDocument();
  });
});
