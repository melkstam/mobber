import React, { ReactElement, ReactNode } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {
  CssBaseline, AppBar, Toolbar, Typography, makeStyles, Theme, createStyles, Container,
} from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors';

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
    backgroundColor: theme.palette.grey[900],
    minHeight: 64,
  },
}));

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps): ReactElement {
  const classes = useStyles();
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <AppBar
        position="sticky"
      >
        <Toolbar className={classes.toolBar}>
          <Typography variant="h5">
            Mobber
          </Typography>
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
