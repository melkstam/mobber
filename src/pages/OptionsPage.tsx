import React, { ReactElement } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Fab } from '@material-ui/core';
import { Play } from 'mdi-material-ui';
import { TimerState, TimerSend } from '../lib/timerMachine/timerMachineDeclarations';
import TimerOptions from '../components/TimerOptions';
import UsersOptions from '../components/UsersOptions';

const useStyles = makeStyles((theme: Theme) => createStyles({
  optionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    '& > *': {
      marginBottom: theme.spacing(2),
    },
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
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
      <UsersOptions
        state={state}
        send={send}
      />
      <Fab
        className={classes.fab}
        variant="extended"
        color="primary"
        onClick={() => send('START')}
      >
        Start mobbing
      </Fab>
    </div>
  );
}
