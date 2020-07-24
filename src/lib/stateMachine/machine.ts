import { Machine } from 'xstate';

interface TimerContext {
}

interface TimerStates {
    states: {
        stopped: {},
        running: {},
        paused: {},
    }
}

type StartEvent = { type: 'START'};
type PauseEvent = { type: 'PAUSE'};
type StopEvent = { type: 'STOP'};

type TimerEvent =
    | StartEvent
    | PauseEvent
    | StopEvent;

const timerMachine = Machine<TimerContext, TimerStates, TimerEvent>({
  id: 'timerMachine',
  initial: 'stopped',
  states: {
    stopped: {
      on: {
        START: 'running',
      },
    },
    running: {
      on: {
        STOP: 'stopped',
        PAUSE: 'paused',
      },
    },
    paused: {
      on: {
        STOP: 'stopped',
        START: 'running',
      },
    },
  },
});

export default timerMachine;
