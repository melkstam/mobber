import React, { ReactElement } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  IconButton, Chip, Typography, Tooltip,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from 'mdi-material-ui';
import { TimerState, TimerSend } from '../../lib/timerMachine/timerMachineDeclarations';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    '& > button': { // Icon buttons
      margin: theme.spacing(0, 2),
    },
  },
  usersContainer: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    columnGap: theme.spacing(1),
    rowGap: `${theme.spacing(2)}px`,
    alignItems: 'center',
    marginTop: 4,
    '& > div': { // Chip
      height: 40,
      borderRadius: 20,
      fontSize: theme.typography.h6.fontSize,
    },
    '& > h6': {
      textAlign: 'right',
    },
  },
}));

interface CurrentUsersProps {
  state: TimerState,
  send: TimerSend
}

export default function CurrentUser({ state, send }: CurrentUsersProps): ReactElement {
  const onNextDriver = () => {
    send('NEXT_TURN');
  };

  const onPrevDriver = () => {
    send('PREV_TURN');
  };

  const oneActive = state.context.activeUsers.length === 1;

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Tooltip title="Previous driver">
        <IconButton onClick={onPrevDriver}>
          <ChevronLeft />
        </IconButton>
      </Tooltip>

      <div className={classes.usersContainer}>
        <Typography variant="h6">Driver:</Typography>
        <Chip
          label={state.context.activeUsers[0]}
          data-testid="current-driver-user"
        />

        {oneActive && (
        <>
          <Typography variant="h6">Up next:</Typography>
          <Chip
            label={state.context.activeUsers[1]}
            data-testid="next-driver-user"
          />
        </>
        )}
      </div>

      <Tooltip title="Next driver">
        <IconButton onClick={onNextDriver}>
          <ChevronRight />
        </IconButton>
      </Tooltip>
    </div>
  );
}
