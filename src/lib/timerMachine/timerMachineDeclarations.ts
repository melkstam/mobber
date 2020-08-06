import { State, Interpreter } from 'xstate';

export interface TimerContext {
  turnTime: number;
  breakTime: number;
  breakTurns: number;
  activeUsers: string[];
  inactiveUsers: string[];
  timeLeft: number;
  turnsLeft: number;
}

export interface TimerStates {
  states: {
    timerOff: {},
    timerOn: {
      states: {
        running: {},
        paused: {},
        break: {},
        breakPause: {},
      }
    }
  }
}

export type StartEvent = { type: 'START'};
export type PauseEvent = { type: 'PAUSE'};
export type StopEvent = { type: 'STOP'};
export type TickEvent = { type: 'TICK'};
export type NextTurnEvent = { type: 'NEXT_TURN'};
export type PrevTurnEvent = { type: 'PREV_TURN'};
export type UpdateTurnTimeEvent = { type: 'UPDATE_TURN_TIME', time: number };
export type UpdateBreakTimeEvent = { type: 'UPDATE_BREAK_TIME', time: number };
export type UpdateBreakTurnsEvent = { type: 'UPDATE_BREAK_TURNS', turns: number };
export type UpdateActiveUsersEvent = { type: 'UPDATE_ACTIVE_USERS', users: string[] };
export type UpdateInactiveUsersEvent = { type: 'UPDATE_INACTIVE_USERS', users: string[] };

export type TimerEvent =
    | StartEvent
    | PauseEvent
    | StopEvent
    | TickEvent
    | NextTurnEvent
    | PrevTurnEvent
    | UpdateTurnTimeEvent
    | UpdateBreakTimeEvent
    | UpdateBreakTurnsEvent
    | UpdateActiveUsersEvent
    | UpdateInactiveUsersEvent;

export type TimerState = State<TimerContext, TimerEvent, TimerStates>;
export type TimerSend = Interpreter<TimerContext, TimerStates, TimerEvent>['send'];
