import React from 'react';
import { useMachine } from '@xstate/react';

import logo from './logo.svg';
import './App.css';

import timerMachine from './lib/stateMachine/machine';

function App(): React.ReactElement {
  const [state, send] = useMachine(timerMachine);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit
          {' '}
          <code>src/App.tsx</code>
          {' '}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
