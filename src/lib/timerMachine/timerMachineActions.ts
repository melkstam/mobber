import { assign } from 'xstate';
import {
  TimerContext, UpdateTurnTimeEvent, UpdateBreakTurnsEvent, UpdateBreakTimeEvent, UpdateActiveUsersEvent, UpdateInactiveUsersEvent,
} from './timerMachineDeclarations';

export const updateTurnTime = assign<TimerContext, UpdateTurnTimeEvent>({
  turnTime: (context, event) => {
    if (event.time <= 0 || !Number.isInteger(event.time)) {
      return context.turnTime;
    }
    return event.time;
  },
});

export const updateBreakTime = assign<TimerContext, UpdateBreakTimeEvent>({
  breakTime: (context, event) => {
    if (event.time <= 0 || !Number.isInteger(event.time)) {
      return context.breakTime;
    }
    return event.time;
  },
});

export const updateBreakTurns = assign<TimerContext, UpdateBreakTurnsEvent>({
  breakTurns: (context, event) => {
    if (event.turns <= 0 || !Number.isInteger(event.turns)) {
      return context.breakTurns;
    }
    return event.turns;
  },
});

export const updateActiveUsers = assign<TimerContext, UpdateActiveUsersEvent>({
  activeUsers: (_, event) => event.users,
});

export const updateInactiveUsers = assign<TimerContext, UpdateInactiveUsersEvent>({
  inactiveUsers: (_, event) => event.users,
});
