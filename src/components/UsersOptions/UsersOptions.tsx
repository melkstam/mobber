import React, { ReactElement } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Paper, Typography, TextField, IconButton, Tooltip,
} from '@material-ui/core';
import { Plus, Shuffle } from 'mdi-material-ui';
import { TimerState, TimerSend } from '../../lib/timerMachine/timerMachineDeclarations';
import UserChip from '../UserChip';
import { shuffleArray } from '../../lib/utils';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    width: '100%',
  },
  usersBox: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    '&:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
  activeUsersTitleRow: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  newUserContainer: {
    display: 'flex',
    alignItems: 'center',
    '& > div': {
      flexGrow: 1,
    },
  },
  noUserText: {
    color: theme.palette.text.hint,
    fontStyle: 'italic',
  },
}));

interface UsersOptionsProps {
  state: TimerState;
  send: TimerSend;
}

export default function UsersOptions({ state, send }: UsersOptionsProps): ReactElement {
  const [name, setName] = React.useState<string>('');

  const handleOnAddUser = () => {
    if (name === '') return;
    send({ type: 'UPDATE_ACTIVE_USERS', users: [...state.context.activeUsers, name] });
    setName('');
  };

  const handleSetDriver = (index: number) => {
    const user = state.context.activeUsers[index];
    const activeUsers = [...state.context.activeUsers];
    activeUsers.splice(index, 1);
    send({ type: 'UPDATE_ACTIVE_USERS', users: [user, ...activeUsers] });
  };

  const handleSetUserInactive = (index: number) => {
    const user = state.context.activeUsers[index];
    const activeUsers = [...state.context.activeUsers];
    activeUsers.splice(index, 1);
    send({ type: 'UPDATE_ACTIVE_USERS', users: activeUsers });
    send({ type: 'UPDATE_INACTIVE_USERS', users: [...state.context.inactiveUsers, user] });
  };

  const handleSetUserActive = (index: number) => {
    const user = state.context.inactiveUsers[index];
    const inactiveUsers = [...state.context.inactiveUsers];
    inactiveUsers.splice(index, 1);
    send({ type: 'UPDATE_INACTIVE_USERS', users: inactiveUsers });
    send({ type: 'UPDATE_ACTIVE_USERS', users: [...state.context.activeUsers, user] });
  };

  const handleRemoveUser = (index: number) => {
    const inactiveUsers = [...state.context.inactiveUsers];
    inactiveUsers.splice(index, 1);
    send({ type: 'UPDATE_INACTIVE_USERS', users: inactiveUsers });
  };

  const handleShuffleUsers = () => {
    const shuffledUsers = shuffleArray(state.context.activeUsers);
    send({ type: 'UPDATE_ACTIVE_USERS', users: shuffledUsers });
  };

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Paper className={classes.usersBox}>
        <div className={classes.activeUsersTitleRow}>
          <Typography variant="h6">
            Active users
          </Typography>

          <Tooltip title="Shuffle users">
            <IconButton
              size="small"
              onClick={handleShuffleUsers}
              data-testid="shuffle-users-button"
            >
              <Shuffle />
            </IconButton>
          </Tooltip>
        </div>

        <div data-testid="active-users-container">
          {state.context.activeUsers.length === 0 && <Typography className={classes.noUserText}>No active users</Typography>}
          {state.context.activeUsers.map((user, index) => (
            <UserChip
              key={user}
              name={user}
              driver={index === 0}
              onClick={() => handleSetDriver(index)}
              onClear={() => handleSetUserInactive(index)}
            />
          ))}
        </div>

        <div className={classes.newUserContainer}>
          <TextField
            placeholder="New user…"
            data-testid="add-new-user-input"
            aria-label="Add new user"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                handleOnAddUser();
                ev.preventDefault();
              }
            }}
          />

          <Tooltip title="Add user">
            <IconButton
              size="small"
              onClick={handleOnAddUser}
              data-testid="submit-button"
            >
              <Plus />
            </IconButton>
          </Tooltip>
        </div>
      </Paper>

      <Paper className={classes.usersBox}>
        <Typography variant="h6">
          Inactive users
        </Typography>
        {state.context.inactiveUsers.length === 0 && <Typography className={classes.noUserText}>No inactive users</Typography>}
        <div data-testid="inactive-users-container">
          {state.context.inactiveUsers.map((user, index) => (
            <UserChip
              key={user}
              name={user}
              onClick={() => handleSetUserActive(index)}
              onClear={() => handleRemoveUser(index)}
            />
          ))}
        </div>
      </Paper>
    </div>
  );
}
