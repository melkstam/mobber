import React from 'react';
import { useMachine } from '@xstate/react';

import timerMachine from './lib/timerMachine/timerMachine';
import OptionsPage from './pages/OptionsPage';
import TimerPage from './pages/TimerPage';
import Layout from './components/Layout';
import { TimerContextOptions } from './lib/timerMachine/timerMachineDeclarations';

const { ipcRenderer } = window;

function App(): React.ReactElement {
  const [state, send] = useMachine(timerMachine);

  // Save and load options to and from localstorage
  React.useEffect(() => {
    ipcRenderer.invoke('getOptions').then((options: TimerContextOptions | undefined) => {
      if (options) {
        send({ type: 'UPDATE_OPTIONS', options });
      }
    });
  }, [send]);

  const { timeLeft, turnsLeft, ...options } = state.context;
  React.useEffect(() => {
    ipcRenderer.invoke('saveOptions', options);
  }, [options]);

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
