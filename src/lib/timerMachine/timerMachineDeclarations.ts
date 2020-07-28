export interface TimerContext {
  turnTime: number;
  breakTime: number;
  breakTurns: number;
}

export interface TimerStates {
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

export type StartEvent = { type: 'START'};
export type PauseEvent = { type: 'PAUSE'};
export type StopEvent = { type: 'STOP'};

export type TimerEvent =
    | StartEvent
    | PauseEvent
    | StopEvent;
