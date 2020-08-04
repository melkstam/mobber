import { assign, InvokeCreator, InvokeCallback } from 'xstate';
import {
  TimerContext,
  UpdateTurnTimeEvent,
  UpdateBreakTurnsEvent,
  UpdateBreakTimeEvent,
  UpdateActiveUsersEvent,
  UpdateInactiveUsersEvent,
  TimerEvent,
  StopEvent,
  TickEvent,
  NextTurnEvent,
  PrevTurnEvent,
} from './timerMachineDeclarations';
import { rotateArray } from '../utils';

export const startTimer: InvokeCreator<TimerContext> = (
  context,
): InvokeCallback => (
  callback: (event: TimerEvent) => void,
) => {
  const stopEvent: StopEvent = { type: 'STOP' };
  const tickEvent: TickEvent = { type: 'TICK' };

  const stopTimer = setTimeout(() => callback(stopEvent), context.timeLeft);
  const tickTimer = setInterval(() => callback(tickEvent), 100);

  return () => {
    clearInterval(tickTimer);
    clearTimeout(stopTimer);
  };
};

export const tickTimer = assign<TimerContext, TickEvent>({
  timeLeft: (context) => context.timeLeft - 100,
});

export const updateTurnTime = assign<TimerContext, UpdateTurnTimeEvent>({
  turnTime: (context, event) => {
    if (event.time <= 0 || !Number.isInteger(event.time)) {
      return context.turnTime;
    }
    return event.time;
  },
  timeLeft: (context, event) => {
    if (event.time <= 0 || !Number.isInteger(event.time)) {
      return context.timeLeft;
    }
    return event.time * 60 * 1000;
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
  turnsLeft: (context, event) => {
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

export const setNextTurn = assign<TimerContext, NextTurnEvent>({
  activeUsers: (context) => rotateArray(context.activeUsers),
  timeLeft: (context) => context.turnTime * 60 * 1000,
  turnsLeft: (context) => context.turnsLeft - 1,
});

export const setPrevTurn = assign<TimerContext, PrevTurnEvent>({
  activeUsers: (context) => rotateArray(context.activeUsers, -1),
  timeLeft: (context) => context.turnTime * 60 * 1000,
  turnsLeft: (context) => context.turnsLeft + 1,
});
