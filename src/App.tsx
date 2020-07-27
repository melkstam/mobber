import React from 'react';
import { useMachine } from '@xstate/react';

import logo from './logo.svg';
import './App.css';

import timerMachine from './lib/stateMachine/machine';
import OptionsPage from './pages/OptionsPage';
import TimerPage from './pages/TimerPage';

function App(): React.ReactElement {
  const [state, send] = useMachine(timerMachine);

  let contents;
  if (state.matches('timerOff')) {
    contents = (
      <OptionsPage
        state={state}
        send={send}
      />
    );
  } else {
    contents = <TimerPage />;
  }

  return (
    <div>
      {contents}
    </div>
  );
}

export default App;
