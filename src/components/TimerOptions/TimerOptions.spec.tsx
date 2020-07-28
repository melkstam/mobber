import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { TimerState } from '../../lib/timerMachine/timerMachineDeclarations';
import TimerOptions from './TimerOptions';

describe('<TimerOptions />', () => {
  const state: Pick<TimerState, 'context'> = {
    context: {
      turnTime: 8,
      breakTime: 12,
      breakTurns: 6,
    },
  };

  describe('Turn time', () => {
    it('changes on input change', () => {
      const mockSend = jest.fn();

      const { getByLabelText } = render(
        <TimerOptions
          state={state as TimerState}
          send={mockSend}
        />,
      );

      const turnTimeInput = getByLabelText('Set turn time');
      fireEvent.change(turnTimeInput, { target: { value: 10 } });

      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith({ type: 'UPDATE_TURN_TIME', time: 10 });
    });

    it('increases on click', () => {
      const mockSend = jest.fn();

      const { getByLabelText } = render(
        <TimerOptions
          state={state as TimerState}
          send={mockSend}
        />,
      );

      const increaseButton = getByLabelText('Increase turn time');
      fireEvent.click(increaseButton);

      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith({ type: 'UPDATE_TURN_TIME', time: state.context.turnTime + 1 });
    });

    it('decreases on click', () => {
      const mockSend = jest.fn();

      const { getByLabelText } = render(
        <TimerOptions
          state={state as TimerState}
          send={mockSend}
        />,
      );

      const decreaseButton = getByLabelText('Decrease turn time');
      fireEvent.click(decreaseButton);

      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith({ type: 'UPDATE_TURN_TIME', time: state.context.turnTime - 1 });
    });
  });

  describe('Break time', () => {
    it('changes on input change', () => {
      const mockSend = jest.fn();

      const { getByLabelText } = render(
        <TimerOptions
          state={state as TimerState}
          send={mockSend}
        />,
      );

      const breakTimeInput = getByLabelText('Set break time');
      fireEvent.change(breakTimeInput, { target: { value: 10 } });

      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith({ type: 'UPDATE_BREAK_TIME', time: 10 });
    });

    it('increases on click', () => {
      const mockSend = jest.fn();

      const { getByLabelText } = render(
        <TimerOptions
          state={state as TimerState}
          send={mockSend}
        />,
      );

      const increaseButton = getByLabelText('Increase break time');
      fireEvent.click(increaseButton);

      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith({ type: 'UPDATE_BREAK_TIME', time: state.context.breakTime + 1 });
    });

    it('decreases on click', () => {
      const mockSend = jest.fn();

      const { getByLabelText } = render(
        <TimerOptions
          state={state as TimerState}
          send={mockSend}
        />,
      );

      const decreaseButton = getByLabelText('Decrease break time');
      fireEvent.click(decreaseButton);

      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith({ type: 'UPDATE_BREAK_TIME', time: state.context.breakTime - 1 });
    });
  });

  describe('Break turns', () => {
    it('changes on input change', () => {
      const mockSend = jest.fn();

      const { getByLabelText } = render(
        <TimerOptions
          state={state as TimerState}
          send={mockSend}
        />,
      );

      const breakTurnsInput = getByLabelText('Set break turns');
      fireEvent.change(breakTurnsInput, { target: { value: 10 } });

      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith({ type: 'UPDATE_BREAK_TURNS', turns: 10 });
    });

    it('increases on click', () => {
      const mockSend = jest.fn();

      const { getByLabelText } = render(
        <TimerOptions
          state={state as TimerState}
          send={mockSend}
        />,
      );

      const increaseButton = getByLabelText('Increase break turns');
      fireEvent.click(increaseButton);

      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith({ type: 'UPDATE_BREAK_TURNS', turns: state.context.breakTurns + 1 });
    });

    it('decreases on click', () => {
      const mockSend = jest.fn();

      const { getByLabelText } = render(
        <TimerOptions
          state={state as TimerState}
          send={mockSend}
        />,
      );

      const decreaseButton = getByLabelText('Decrease break turns');
      fireEvent.click(decreaseButton);

      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockSend).toHaveBeenCalledWith({ type: 'UPDATE_BREAK_TURNS', turns: state.context.breakTurns - 1 });
    });
  });
});
