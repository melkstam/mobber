import React, { ReactElement } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { TimerState } from '../../lib/timerMachine/timerMachineDeclarations';
import { msToText } from '../../lib/utils';

const useStyles = makeStyles((theme: Theme) => createStyles({
  timerTextContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  timerText: {
    fontSize: '4rem',
    fontFamily: '"Roboto Mono", "Courier New", monospace',
  },
  turnsLeftText: {
    fontSize: theme.typography.h6.fontSize,
  },
}));

interface TimerTextProps {
  state: TimerState
}

export default function TimerText({ state }: TimerTextProps): ReactElement {
  const classes = useStyles();

  let supportText;
  if (state.matches({ timerOn: 'running' })) {
    const { turnsLeft } = state.context;
    supportText = `${turnsLeft} ${turnsLeft === 1 ? 'turn' : 'turns'} left before break`;
  } else if (state.matches({ timerOn: 'paused' })) {
    const turnsLeft = state.context.turnsLeft + 1;
    supportText = `${turnsLeft} ${turnsLeft === 1 ? 'turn' : 'turns'} left before break`;
  } else if (state.matches({ timerOn: 'breakPause' })) {
    supportText = 'Time for a break!';
  }

  return (
    <div className={classes.timerTextContainer}>
      <span className={classes.timerText}>
        {msToText(state.context.timeLeft)}
      </span>

      <Typography variant="body1" className={classes.turnsLeftText}>
        {supportText}
      </Typography>
    </div>
  );
}
