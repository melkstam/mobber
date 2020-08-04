import React from 'react';
import { render } from '@testing-library/react';

import { TimerState } from '../../lib/timerMachine/timerMachineDeclarations';
import CurrentUser from './CurrentUser';

describe('<CurrentUser />', () => {
  const context: Partial<TimerState['context']> = {
    activeUsers: ['Eric', 'Sophie', 'Nathan'],
  };
  const state: Pick<TimerState, 'context'> = {
    context: context as TimerState['context'],
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
});
