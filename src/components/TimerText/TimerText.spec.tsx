import React from 'react';
import { render } from '@testing-library/react';

import { TimerState } from '../../lib/timerMachine/timerMachineDeclarations';
import TimerText from './TimerText';

type RecursivePartial<T> = {
  [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends object ? RecursivePartial<T[P]> :
    T[P];
};

describe('<TimerText />', () => {
  it('displays time left', () => {
    const state: RecursivePartial<TimerState> = {
      context: {
        timeLeft: (2 * 60 + 3) * 1000, // 02:03
        turnsLeft: 5,
      },
    };

    const { getByText } = render(<TimerText state={state as TimerState} />);

    expect(getByText('02:03')).toBeInTheDocument();
  });

  it('displays turns left', () => {
    const state: RecursivePartial<TimerState> = {
      context: {
        timeLeft: (2 * 60 + 3) * 1000, // 02:03
        turnsLeft: 5,
      },
    };

    const { getByText } = render(<TimerText state={state as TimerState} />);

    expect(getByText(/4/)).toBeInTheDocument();
  });
});
