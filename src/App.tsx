import React from 'react';
import { useMachine } from '@xstate/react';

import './App.css';

import timerMachine from './lib/timerMachine/timerMachine';
import OptionsPage from './pages/OptionsPage';
import TimerPage from './pages/TimerPage';
import Layout from './components/Layout';

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
    contents = (
      <TimerPage
        state={state}
        send={send}
      />
    );
  }

  return (
    <Layout
      state={state}
      send={send}
    >
      {contents}
    </Layout>
  );
}

export default App;
