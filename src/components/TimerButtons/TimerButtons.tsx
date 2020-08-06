import React, { ReactElement } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Fab } from '@material-ui/core';
import { Play, Pause } from 'mdi-material-ui';
import { TimerState, TimerSend } from '../../lib/timerMachine/timerMachineDeclarations';

const useStyles = makeStyles((theme: Theme) => createStyles({
  timerButtonsContainer: {
    position: 'absolute',
    bottom: theme.spacing(2),
    width: '100%',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
}));

interface TimerButtonsProps {
  state: TimerState,
  send: TimerSend
}

export default function TimerButtons({ state, send }: TimerButtonsProps): ReactElement {
  const classes = useStyles();

  let buttons;
  if (state.matches({ timerOn: 'paused' })) {
    buttons = (
      <Fab
        aria-label="Start"
        onClick={() => send('START')}
      >
        <Play />
      </Fab>
    );
  } else if (state.matches({ timerOn: 'running' })) {
    buttons = (
      <Fab
        aria-label="Pause"
        onClick={() => send('PAUSE')}
      >
        <Pause />
      </Fab>
    );
  } else if (state.matches({ timerOn: 'break' })) {
    buttons = (
      <Fab
        aria-label="Skip break"
        variant="extended"
        onClick={() => send('NEXT_TURN')}
      >
        Skip break
      </Fab>
    );
  } else if (state.matches({ timerOn: 'breakPause' })) {
    buttons = (
      <>
        <Fab
          aria-label="Skip break"
          variant="extended"
          onClick={() => send('NEXT_TURN')}
        >
          Skip break
        </Fab>
        <Fab
          aria-label="Take break"
          variant="extended"
          color="primary"
          onClick={() => send('START')}
        >
          Take break
        </Fab>
      </>
    );
  }

  return (
    <div className={classes.timerButtonsContainer}>
      {buttons}
    </div>
  );
}
