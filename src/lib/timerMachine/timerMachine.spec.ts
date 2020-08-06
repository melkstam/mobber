import { interpret } from 'xstate';
import timerMachine from './timerMachine';

describe('Timer machine', () => {
  describe('States', () => {
    it('should start in timer off state', () => {
      const timerService = interpret(timerMachine);
      timerService.start();

      expect(timerService.state.matches('timerOff')).toBeTruthy();
    });

    it('should transition from timer off to timer on and running on START', () => {
      const timerService = interpret(timerMachine);
      timerService.start();

      timerService.send('START');

      expect(timerService.state.matches('timerOn')).toBeTruthy();
      expect(timerService.state.matches({ timerOn: 'running' })).toBeTruthy();
    });

    it('should transition from running to timer off on STOP', () => {
      const timerService = interpret(timerMachine);
      timerService.start();
      timerService.send('START');

      timerService.send('STOP');

      expect(timerService.state.matches('timerOff')).toBeTruthy();
    });

    it('should transition from paused to timer off on STOP', () => {
      const timerService = interpret(timerMachine);
      timerService.start();
      timerService.send('START');
      timerService.send('PAUSE');

      timerService.send('STOP');

      expect(timerService.state.matches('timerOff')).toBeTruthy();
    });

    it('should transition from running to paused on PAUSE', () => {
      const timerService = interpret(timerMachine);
      timerService.start();
      timerService.send('START');

      timerService.send('PAUSE');

      expect(timerService.state.matches({ timerOn: 'paused' })).toBeTruthy();
    });

    it('should transition from paused to running on START', () => {
      const timerService = interpret(timerMachine);
      timerService.start();
      timerService.send('START');
      timerService.send('PAUSE');

      timerService.send('START');

      expect(timerService.state.matches({ timerOn: 'running' })).toBeTruthy();
    });
  });

  describe('Actions', () => {
    describe('UPDATE_TURN_TIME', () => {
      it('should set new turn time on UPDATE_TURN_TIME event', () => {
        const timerService = interpret(timerMachine);
        timerService.start();

        const currentTurnTime = timerService.state.context.turnTime;
        timerService.send({ type: 'UPDATE_TURN_TIME', time: currentTurnTime + 1 });

        expect(timerService.state.context.turnTime).toBe(currentTurnTime + 1);
      });

      it('should not set negative turn time on UPDATE_TURN_TIME event', () => {
        const timerService = interpret(timerMachine);
        timerService.start();

        const currentTurnTime = timerService.state.context.turnTime;
        timerService.send({ type: 'UPDATE_TURN_TIME', time: -100 });

        expect(timerService.state.context.turnTime).toBe(currentTurnTime);
      });

      it('should not set non-integer turn time on UPDATE_TURN_TIME event', () => {
        const timerService = interpret(timerMachine);
        timerService.start();

        const currentTurnTime = timerService.state.context.turnTime;
        timerService.send({ type: 'UPDATE_TURN_TIME', time: Math.PI });

        expect(timerService.state.context.turnTime).toBe(currentTurnTime);
      });
    });

    describe('UPDATE_BREAK_TIME', () => {
      it('should set new turn time on UPDATE_BREAK_TIME event', () => {
        const timerService = interpret(timerMachine);
        timerService.start();

        const currentBreakTime = timerService.state.context.breakTime;
        timerService.send({ type: 'UPDATE_BREAK_TIME', time: currentBreakTime + 1 });

        expect(timerService.state.context.breakTime).toBe(currentBreakTime + 1);
      });

      it('should not set negative turn time on UPDATE_BREAK_TIME event', () => {
        const timerService = interpret(timerMachine);
        timerService.start();

        const currentBreakTime = timerService.state.context.breakTime;
        timerService.send({ type: 'UPDATE_BREAK_TIME', time: -100 });

        expect(timerService.state.context.breakTime).toBe(currentBreakTime);
      });

      it('should not set non-integer turn time on UPDATE_BREAK_TIME event', () => {
        const timerService = interpret(timerMachine);
        timerService.start();

        const currentBreakTime = timerService.state.context.breakTime;
        timerService.send({ type: 'UPDATE_TURN_TIME', time: Math.PI });

        expect(timerService.state.context.breakTime).toBe(currentBreakTime);
      });
    });

    describe('UPDATE_BREAK_TURNS', () => {
      it('should set new turn time on UPDATE_BREAK_TURNS event', () => {
        const timerService = interpret(timerMachine);
        timerService.start();

        const currentTurns = timerService.state.context.breakTurns;
        timerService.send({ type: 'UPDATE_BREAK_TURNS', turns: currentTurns + 1 });

        expect(timerService.state.context.breakTurns).toBe(currentTurns + 1);
      });

      it('should not set negative turn time on UPDATE_BREAK_TURNS event', () => {
        const timerService = interpret(timerMachine);
        timerService.start();

        const currentTurns = timerService.state.context.breakTurns;
        timerService.send({ type: 'UPDATE_BREAK_TURNS', turns: -100 });

        expect(timerService.state.context.breakTurns).toBe(currentTurns);
      });

      it('should not set non-integer turn time on UPDATE_BREAK_TURNS event', () => {
        const timerService = interpret(timerMachine);
        timerService.start();

        const currentTurns = timerService.state.context.breakTurns;
        timerService.send({ type: 'UPDATE_BREAK_TURNS', turns: Math.PI });

        expect(timerService.state.context.breakTurns).toBe(currentTurns);
      });
    });

    describe('UPDATE_ACTIVE_USERS', () => {
      it('should set new active users on UPDATE_ACTIVE_USERS event', () => {
        const timerService = interpret(timerMachine);
        timerService.start();

        const activeUsers = ['Lucas', 'Amelia'];
        timerService.send({ type: 'UPDATE_ACTIVE_USERS', users: activeUsers });

        expect(timerService.state.context.activeUsers).toBe(activeUsers);
      });
    });

    describe('UPDATE_INACTIVE_USERS', () => {
      it('should set new active users on UPDATE_ACTIVE_USERS event', () => {
        const timerService = interpret(timerMachine);
        timerService.start();

        const inactiveUsers = ['Lucas', 'Amelia'];
        timerService.send({ type: 'UPDATE_INACTIVE_USERS', users: inactiveUsers });

        expect(timerService.state.context.inactiveUsers).toBe(inactiveUsers);
      });
    });

    describe('TICK_TIMER', () => {
      it('should decrease time left with 100 ms', () => {
        const timerService = interpret(timerMachine);
        timerService.start();

        const currentTimeLeft = timerService.state.context.timeLeft;
        timerService.send('TICK');

        expect(timerService.state.context.timeLeft).toBe(currentTimeLeft - 100);
      });
    });

    describe('NEXT_TURN', () => {
      it('should set state paused when state is running', () => {
        const timerService = interpret(timerMachine);
        timerService.start();

        timerService.send('START');
        timerService.send('NEXT_TURN');

        expect(timerService.state.matches({ timerOn: 'paused' })).toBeTruthy();
      });

      it('should set state paused when state is paused', () => {
        const timerService = interpret(timerMachine);
        timerService.start();

        timerService.send('START');
        timerService.send('PAUSE');
        timerService.send('NEXT_TURN');

        expect(timerService.state.matches({ timerOn: 'paused' })).toBeTruthy();
      });
    });

    describe('PREV_TURN', () => {
      it('should set state paused when state is running', () => {
        const timerService = interpret(timerMachine);
        timerService.start();

        timerService.send('START');
        timerService.send('PREV_TURN');

        expect(timerService.state.matches({ timerOn: 'paused' })).toBeTruthy();
      });

      it('should set state paused when state is paused', () => {
        const timerService = interpret(timerMachine);
        timerService.start();

        timerService.send('START');
        timerService.send('PAUSE');
        timerService.send('PREV_TURN');

        expect(timerService.state.matches({ timerOn: 'paused' })).toBeTruthy();
      });
    });
  });
});
