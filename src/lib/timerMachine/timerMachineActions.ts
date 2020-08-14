import { assign, InvokeCreator, InvokeCallback } from 'xstate';
import {
  TimerContext,
  UpdateTurnTimeEvent,
  UpdateBreakTurnsEvent,
  UpdateBreakTimeEvent,
  UpdateActiveUsersEvent,
  UpdateInactiveUsersEvent,
  TimerEvent,
  TickEvent,
  NextTurnEvent,
  PrevTurnEvent,
  StartEvent,
} from './timerMachineDeclarations';
import { rotateArray } from '../utils';

declare global {
  interface Window {
    ipcRenderer: {
      invoke: (name: string) => void
    }
  }
}
const { ipcRenderer } = window;

export const startTimer: InvokeCreator<TimerContext> = (
  context,
): InvokeCallback => (
  callback: (event: TimerEvent) => void,
) => {
  const nextTurnEvent: NextTurnEvent = { type: 'NEXT_TURN' };
  const tickEvent: TickEvent = { type: 'TICK' };

  const stopTimer = setTimeout(() => callback(nextTurnEvent), context.timeLeft);
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

export const start = assign<TimerContext, StartEvent | NextTurnEvent>({
  timeLeft: (context) => context.turnTime * 60 * 1000,
  turnsLeft: (context) => context.breakTurns - 1,
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

export const setBreak = assign<TimerContext, StartEvent | NextTurnEvent>({
  timeLeft: (context) => context.breakTime * 60 * 1000,
});

export const minimize = (): void => {
  ipcRenderer.invoke('minimize');
};

export const maximize = (): void => {
  ipcRenderer.invoke('maximize');
};
