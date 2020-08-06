import React, { ReactElement } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  TextField, ButtonGroup, Button,
} from '@material-ui/core';
import { ChevronUp, ChevronDown } from 'mdi-material-ui';

import { TimerState, TimerSend } from '../../lib/timerMachine/timerMachineDeclarations';

const useStyles = makeStyles((theme: Theme) => createStyles({
  timerOptionsContainer: {
    display: 'grid',
    gridTemplateColumns: 'max-content 100px max-content',
    '& > span': {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(1, 0),
      fontSize: theme.typography.h6.fontSize,
    },
    '& > span:nth-child(3n+1)': {
      justifyContent: 'flex-end',
      paddingRight: theme.spacing(2),
    },
    '& > span:nth-child(3n+3)': {
      justifyContent: 'flex-start',
      paddingLeft: theme.spacing(1),
    },
    '& input': {
      fontSize: theme.typography.h6.fontSize,
      padding: theme.spacing(2),
      textAlign: 'center',
    },
  },
  stepButtons: {
    '& > button': {
      minWidth: 'auto',
      padding: 0,
      marginLeft: theme.spacing(0.5),
    },
  },
}));

interface TimerOptionsProps {
  state: TimerState;
  send: TimerSend;
}

export default function TimerOptions({ state, send }: TimerOptionsProps): ReactElement {
  const classes = useStyles();
  return (
    <div className={classes.timerOptionsContainer}>
      <span>A</span>
      <span>
        <TextField
          variant="outlined"
          inputProps={{
            'aria-label': 'Set turn time',
          }}
          value={state.context.turnTime}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => send({ type: 'UPDATE_TURN_TIME', time: Number(event.target.value) })}
          onFocus={(event: React.FocusEvent<HTMLInputElement>) => event.target.select()}
        />
        <ButtonGroup
          className={classes.stepButtons}
          orientation="vertical"
          size="small"
        >
          <Button
            size="small"
            variant="text"
            aria-label="Increase turn time"
            onClick={() => send({ type: 'UPDATE_TURN_TIME', time: state.context.turnTime + 1 })}
          >
            <ChevronUp />
          </Button>
          <Button
            size="small"
            variant="text"
            aria-label="Decrease turn time"
            onClick={() => send({ type: 'UPDATE_TURN_TIME', time: state.context.turnTime - 1 })}
          >
            <ChevronDown />
          </Button>
        </ButtonGroup>
      </span>
      <span>minute timer</span>

      <span>with</span>
      <span>
        <TextField
          variant="outlined"
          inputProps={{
            'aria-label': 'Set break time',
          }}
          value={state.context.breakTime}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => send({ type: 'UPDATE_BREAK_TIME', time: Number(event.target.value) })}
          onFocus={(event: React.FocusEvent<HTMLInputElement>) => event.target.select()}
        />
        <ButtonGroup
          className={classes.stepButtons}
          orientation="vertical"
          size="small"
        >
          <Button
            size="small"
            variant="text"
            aria-label="Increase break time"
            onClick={() => send({ type: 'UPDATE_BREAK_TIME', time: state.context.breakTime + 1 })}
          >
            <ChevronUp />
          </Button>
          <Button
            size="small"
            variant="text"
            aria-label="Decrease break time"
            onClick={() => send({ type: 'UPDATE_BREAK_TIME', time: state.context.breakTime - 1 })}
          >
            <ChevronDown />
          </Button>
        </ButtonGroup>
      </span>
      <span>minute breaks</span>

      <span>every</span>
      <span>
        <TextField
          variant="outlined"
          inputProps={{
            'aria-label': 'Set break turns',
          }}
          value={state.context.breakTurns}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => send({ type: 'UPDATE_BREAK_TURNS', turns: Number(event.target.value) })}
          onFocus={(event: React.FocusEvent<HTMLInputElement>) => event.target.select()}
        />
        <ButtonGroup
          className={classes.stepButtons}
          orientation="vertical"
          size="small"
        >
          <Button
            size="small"
            variant="text"
            aria-label="Increase break turns"
            onClick={() => send({ type: 'UPDATE_BREAK_TURNS', turns: state.context.breakTurns + 1 })}
          >
            <ChevronUp />
          </Button>
          <Button
            size="small"
            variant="text"
            aria-label="Decrease break turns"
            onClick={() => send({ type: 'UPDATE_BREAK_TURNS', turns: state.context.breakTurns - 1 })}
          >
            <ChevronDown />
          </Button>
        </ButtonGroup>
      </span>
      <span>turns</span>

    </div>
  );
}
