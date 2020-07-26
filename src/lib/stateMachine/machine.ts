import { Machine } from 'xstate';

interface TimerContext {
}

interface TimerStates {
    states: {
        timerOff: {},
        timerOn: {
          states: {
            running: {},
            paused: {}
          }
        }
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
  initial: 'timerOff',
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
