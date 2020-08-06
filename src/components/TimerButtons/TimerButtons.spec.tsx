import React from 'react';
import { render } from '@testing-library/react';

import { TimerState } from '../../lib/timerMachine/timerMachineDeclarations';
import TimerButtons from './TimerButtons';

describe('<TimerButtons />', () => {
  it('displays start button when paused', () => {
    const state: Partial<TimerState> = {
      matches: jest.fn().mockImplementation((input) => input.timerOn === 'paused'),
    };

    const { getByLabelText } = render(
      <TimerButtons
        state={state as TimerState}
        send={jest.fn()}
      />,
    );

    expect(getByLabelText('Start')).toBeInTheDocument();
  });

  it('displays pause button when running', () => {
    const state: Partial<TimerState> = {
      matches: jest.fn().mockImplementation((input) => input.timerOn === 'running'),
    };

    const { getByLabelText } = render(
      <TimerButtons
        state={state as TimerState}
        send={jest.fn()}
      />,
    );

    expect(getByLabelText('Pause')).toBeInTheDocument();
  });

  it('displays skip break button when break', () => {
    const state: Partial<TimerState> = {
      matches: jest.fn().mockImplementation((input) => input.timerOn === 'break'),
    };

    const { getByLabelText } = render(
      <TimerButtons
        state={state as TimerState}
        send={jest.fn()}
      />,
    );

    expect(getByLabelText('Skip break')).toBeInTheDocument();
  });

  it('displays skip break and take break button before break', () => {
    const state: Partial<TimerState> = {
      matches: jest.fn().mockImplementation((input) => input.timerOn === 'breakPause'),
    };

    const { getByLabelText } = render(
      <TimerButtons
        state={state as TimerState}
        send={jest.fn()}
      />,
    );

    expect(getByLabelText('Skip break')).toBeInTheDocument();
    expect(getByLabelText('Take break')).toBeInTheDocument();
  });
});
