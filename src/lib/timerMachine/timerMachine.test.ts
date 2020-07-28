import { interpret } from 'xstate';
import timerMachine from './timerMachine';

describe('Timer machine', () => {
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
