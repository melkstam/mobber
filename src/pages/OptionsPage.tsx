import React, { ReactElement } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { TimerState, TimerSend } from '../lib/timerMachine/timerMachineDeclarations';
import TimerOptions from '../components/TimerOptions';

const useStyles = makeStyles((theme: Theme) => createStyles({
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

interface OptionsPageProps {
  state: TimerState;
  send: TimerSend;
}

export default function OptionsPage({ state, send }: OptionsPageProps): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.optionsContainer}>
      <TimerOptions
        state={state}
        send={send}
      />
    </div>
  );
}
