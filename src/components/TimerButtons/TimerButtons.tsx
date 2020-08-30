import React, { ReactElement } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Fab, Tooltip } from '@material-ui/core';
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
      <Tooltip title="Start timer">
        <Fab
          aria-label="Start"
          onClick={() => send('START')}
          data-testid="start-timer-button"
        >
          <Play />
        </Fab>
      </Tooltip>
    );
  } else if (state.matches({ timerOn: 'running' })) {
    buttons = (
      <Tooltip title="Pause timer">
        <Fab
          aria-label="Pause"
          onClick={() => send('PAUSE')}
          data-testid="pause-timer-button"
        >
          <Pause />
        </Fab>
      </Tooltip>
    );
  } else if (state.matches({ timerOn: 'break' })) {
    buttons = (
      <Fab
        aria-label="Skip break"
        variant="extended"
        onClick={() => send('NEXT_TURN')}
        data-testid="skip-break-button"
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
          data-testid="skip-break-button"
        >
          Skip break
        </Fab>
        <Fab
          aria-label="Take break"
          variant="extended"
          color="primary"
          onClick={() => send('START')}
          data-testid="take-break-button"
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
