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
      matches: jest.fn(),
    };

    const { getByText } = render(<TimerText state={state as TimerState} />);

    expect(getByText('02:03')).toBeInTheDocument();
  });

  it('displays turns left correctly when running', () => {
    const state: RecursivePartial<TimerState> = {
      context: {
        timeLeft: (2 * 60 + 3) * 1000, // 02:03
        turnsLeft: 5,
      },
      matches: jest.fn().mockImplementation((input) => input.timerOn === 'running'),
    };

    const { getByText } = render(<TimerText state={state as TimerState} />);

    expect(getByText(/5/)).toBeInTheDocument();
  });

  it('displays turns left correctly when paused', () => {
    const state: RecursivePartial<TimerState> = {
      context: {
        timeLeft: (2 * 60 + 3) * 1000, // 02:03
        turnsLeft: 5,
      },
      matches: jest.fn().mockImplementation((input) => input.timerOn === 'paused'),
    };

    const { getByText } = render(<TimerText state={state as TimerState} />);

    expect(getByText(/6/)).toBeInTheDocument();
  });

  it('displays plural correctly', () => {
    const state: RecursivePartial<TimerState> = {
      context: {
        timeLeft: (2 * 60 + 3) * 1000, // 02:03
        turnsLeft: 5,
      },
      matches: jest.fn().mockImplementation((input) => input.timerOn === 'paused'),
    };

    const { getByText } = render(<TimerText state={state as TimerState} />);

    expect(getByText(/turns/)).toBeInTheDocument();
  });

  it('displays plural correctly with 0', () => {
    const state: RecursivePartial<TimerState> = {
      context: {
        timeLeft: (2 * 60 + 3) * 1000, // 02:03
        turnsLeft: 0,
      },
      matches: jest.fn().mockImplementation((input) => input.timerOn === 'running'),
    };

    const { getByText } = render(<TimerText state={state as TimerState} />);

    expect(getByText(/turns/)).toBeInTheDocument();
  });

  it('displays singular correctly', () => {
    const state: RecursivePartial<TimerState> = {
      context: {
        timeLeft: (2 * 60 + 3) * 1000, // 02:03
        turnsLeft: 0,
      },
      matches: jest.fn().mockImplementation((input) => input.timerOn === 'paused'),
    };

    const { getByText, queryByText } = render(<TimerText state={state as TimerState} />);

    expect(queryByText(/turns/)).not.toBeInTheDocument();
    expect(getByText(/turn/)).toBeInTheDocument();
  });
});
