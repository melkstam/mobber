import React, { ReactElement } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import { Fab, Tooltip } from '@material-ui/core';
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
  const noActive = state.context.activeUsers.length === 0;
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

      <Tooltip title={noActive ? 'Add at least one active user to start mobbing' : ''}>
        <span className={classes.fab}>
          <Fab
            disabled={noActive}
            variant="extended"
            color="primary"
            onClick={() => send('START')}
            data-testid="start-mobbing-button"
          >
            Start mobbing
          </Fab>
        </span>
      </Tooltip>
    </div>
  );
}
