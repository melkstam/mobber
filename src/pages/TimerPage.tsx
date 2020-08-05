import React, { ReactElement } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import { Play, Pause } from 'mdi-material-ui';
import { TimerSend, TimerState } from '../lib/timerMachine/timerMachineDeclarations';
import CurrentUser from '../components/CurrentUser';
import TimerText from '../components/TimerText';

const useStyles = makeStyles((theme: Theme) => createStyles({
  timerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    '& > *': {
      marginBottom: theme.spacing(4),
    },
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
  },
}));

interface TimerPageProps {
  state: TimerState;
  send: TimerSend;
}

export default function TimerPage({ state, send }: TimerPageProps): ReactElement {
  const classes = useStyles();
  let playPauseFab;
  if (state.matches({ timerOn: 'paused' })) {
    playPauseFab = (
      <Fab
        className={classes.fab}
        onClick={() => send('START')}
      >
        <Play />
      </Fab>
    );
  } else {
    playPauseFab = (
      <Fab
        className={classes.fab}
        onClick={() => send('PAUSE')}
      >
        <Pause />
      </Fab>
    );
  }

  return (
    <div className={classes.timerContainer}>
      <TimerText state={state} />

      <CurrentUser
        state={state}
        send={send}
      />

      {playPauseFab}
    </div>
  );
}
