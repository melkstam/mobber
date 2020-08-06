import React, { ReactElement } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import {
  Paper, Typography, TextField, IconButton,
} from '@material-ui/core';
import { Plus } from 'mdi-material-ui';
import { TimerState, TimerSend } from '../../lib/timerMachine/timerMachineDeclarations';
import UserChip from '../UserChip';

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
  newUserContainer: {
    display: 'flex',
    alignItems: 'center',
    '& > div': {
      flexGrow: 1,
    },
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

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Paper className={classes.usersBox}>
        <Typography variant="h6">
          Active users
        </Typography>
        <div data-testid="active-users-container">
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
            margin="dense"
            value={name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                handleOnAddUser();
                ev.preventDefault();
              }
            }}
          />
          <IconButton
            size="small"
            onClick={handleOnAddUser}
            data-testid="submit-button"
          >
            <Plus />
          </IconButton>
        </div>
      </Paper>

      <Paper className={classes.usersBox}>
        <Typography variant="h6">
          Inactive users
        </Typography>
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
