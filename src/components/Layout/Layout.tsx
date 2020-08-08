import React, { ReactElement, ReactNode } from 'react';
import {
  createMuiTheme, ThemeProvider, createStyles, makeStyles, Theme,
} from '@material-ui/core/styles';
import {
  CssBaseline, AppBar, Toolbar, Typography, Container, IconButton, Tooltip,
} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';
import { ArrowLeft } from 'mdi-material-ui';

import { TimerState, TimerSend } from '../../lib/timerMachine/timerMachineDeclarations';

import 'typeface-roboto';
import 'typeface-roboto-mono';

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: deepOrange['900'],
    },
  },
});

const useStyles = makeStyles((theme: Theme) => createStyles({
  appContainer: {
    height: 'calc(100vh - 64px)',
    padding: theme.spacing(2),
  },
  toolBar: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.grey[900],
    minHeight: 64,
    '& > *': {
      flex: 1,
    },
    '& > *:nth-child(2)': {
      textAlign: 'center',
    },
  },
}));

interface LayoutProps {
  children: ReactNode;
  state: TimerState;
  send: TimerSend;
}

export default function Layout({ children, state, send }: LayoutProps): ReactElement {
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <AppBar
        position="sticky"
      >
        <Toolbar className={classes.toolBar}>
          <div>
            {state.matches('timerOn')
            && (
            <Tooltip title="Back to options page">
              <IconButton onClick={() => send('STOP')}><ArrowLeft /></IconButton>
            </Tooltip>
            )}
          </div>

          <Typography variant="h4">
            Mobber
          </Typography>

          <div />
        </Toolbar>
      </AppBar>

      <Container className={classes.appContainer}>
        <>
          {children}
        </>
      </Container>
    </ThemeProvider>
  );
}
