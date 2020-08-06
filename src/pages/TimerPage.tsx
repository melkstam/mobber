import React, { ReactElement } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { TimerSend, TimerState } from '../lib/timerMachine/timerMachineDeclarations';
import CurrentUser from '../components/CurrentUser';
import TimerText from '../components/TimerText';
import TimerButtons from '../components/TimerButtons';

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

  const isBreak = state.matches({ timerOn: 'break' }) || state.matches({ timerOn: 'breakPause' });
  return (
    <div className={classes.timerContainer}>
      <TimerText state={state} />

      { !isBreak && (
      <CurrentUser
        state={state}
        send={send}
      />
      )}

      <TimerButtons
        state={state}
        send={send}
      />
    </div>
  );
}
