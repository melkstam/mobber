import {
  Machine, State, Interpreter,
} from 'xstate';

import {
  TimerContext,
  TimerStates,
  TimerEvent,
} from './timerMachineDeclarations';

const timerMachine = Machine<TimerContext, TimerStates, TimerEvent>({
  id: 'timerMachine',
  initial: 'timerOff',
  context: {
    turnTime: 8,
    breakTime: 12,
    breakTurns: 6,
  },
  states: {
    timerOff: {
      on: {
        START: 'timerOn',
      },
    },
    timerOn: {
      on: {
        STOP: 'timerOff',
      },
      initial: 'running',
      states: {
        running: {
          on: {
            PAUSE: 'paused',
          },
        },
        paused: {
          on: {
            START: 'running',
          },
        },
      },
    },
  },
});

export default timerMachine;

export type TimerState = State<TimerContext, TimerEvent, TimerStates>;
export type TimerSend = Interpreter<TimerContext, TimerStates, TimerEvent>['send'];
