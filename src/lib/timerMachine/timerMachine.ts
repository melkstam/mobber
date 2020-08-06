import {
  Machine,
} from 'xstate';

import {
  TimerContext,
  TimerStates,
  TimerEvent,
} from './timerMachineDeclarations';
import * as actions from './timerMachineActions';

const timerMachine = Machine<TimerContext, TimerStates, TimerEvent>({
  id: 'timerMachine',
  initial: 'timerOff',
  context: {
    turnTime: 8,
    breakTime: 12,
    breakTurns: 6,
    activeUsers: ['Ville', 'Ida', 'Ralph'],
    inactiveUsers: ['John', 'Frans'],
    timeLeft: 8 * 60 * 1000, // turn time in ms
    turnsLeft: 6,
  },
  states: {
    timerOff: {
      on: {
        START: {
          target: 'timerOn',
          actions: [actions.start],
        },
      },
    },
    timerOn: {
      on: {
        STOP: 'timerOff',

        PREV_TURN: {
          target: '.paused',
          cond: (context) => context.turnsLeft < context.breakTurns,
          actions: [actions.setPrevTurn],
        },
      },
      initial: 'running',
      states: {
        running: {
          invoke: {
            id: 'tickTimer',
            src: actions.startTimer,
          },
          on: {
            PAUSE: 'paused',
            NEXT_TURN: [
              {
                target: 'paused',
                cond: (context) => context.turnsLeft > 0,
                actions: [actions.setNextTurn],
              }, {
                target: 'breakPause',
                cond: (context) => context.turnsLeft === 0,
                actions: [actions.setBreak],
              },
            ],
          },
        },
        paused: {
          on: {
            START: 'running',
            NEXT_TURN: [
              {
                cond: (context) => context.turnsLeft > 0,
                actions: [actions.setNextTurn],
              }, {
                target: 'breakPause',
                cond: (context) => context.turnsLeft === 0,
                actions: [actions.setBreak],
              },
            ],
          },
        },
        break: {
          invoke: {
            id: 'breakTimer',
            src: actions.startTimer,
          },
          on: {
            NEXT_TURN: {
              target: 'paused',
              actions: [actions.start],
            },
          },
        },
        breakPause: {
          on: {
            START: 'break',
            NEXT_TURN: {
              target: 'paused',
              actions: [actions.start],
            },
          },
        },
      },
    },
  },
  on: {
    TICK: {
      actions: [actions.tickTimer],
    },
    UPDATE_TURN_TIME: {
      actions: [actions.updateTurnTime],
    },
    UPDATE_BREAK_TIME: {
      actions: [actions.updateBreakTime],
    },
    UPDATE_BREAK_TURNS: {
      actions: [actions.updateBreakTurns],
    },
    UPDATE_ACTIVE_USERS: {
      actions: [actions.updateActiveUsers],
    },
    UPDATE_INACTIVE_USERS: {
      actions: [actions.updateInactiveUsers],
    },
  },
});

export default timerMachine;
