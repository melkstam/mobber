import { interpret } from 'xstate';
import timerMachine from './machine';

describe('Timer machine', () => {
  it('should start in stopped state', () => {
    const timerService = interpret(timerMachine);
    timerService.start();

    expect(timerService.state.value).toBe('stopped');
  });

  it('should transition from stopped to running on START', () => {
    const timerService = interpret(timerMachine);
    timerService.start();

    timerService.send('START');

    expect(timerService.state.value).toBe('running');
  });

  it('should transition from running to stopped on STOP', () => {
    const timerService = interpret(timerMachine);
    timerService.start();
    timerService.send('START');

    timerService.send('STOP');

    expect(timerService.state.value).toBe('stopped');
  });

  it('should transition from running to paused on PAUSE', () => {
    const timerService = interpret(timerMachine);
    timerService.start();
    timerService.send('START');

    timerService.send('PAUSE');

    expect(timerService.state.value).toBe('paused');
  });

  it('should transition from paused to stopped on STOP', () => {
    const timerService = interpret(timerMachine);
    timerService.start();
    timerService.send('START');
    timerService.send('PAUSE');

    timerService.send('STOP');

    expect(timerService.state.value).toBe('stopped');
  });

  it('should transition from paused to running on START', () => {
    const timerService = interpret(timerMachine);
    timerService.start();
    timerService.send('START');
    timerService.send('PAUSE');

    timerService.send('START');

    expect(timerService.state.value).toBe('running');
  });
});
