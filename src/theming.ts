import {
  Theme,
  makeStyles,
  unstable_createMuiStrictModeTheme as createMuiTheme,
} from '@material-ui/core';
import cyan from '@material-ui/core/colors/cyan';
import orange from '@material-ui/core/colors/orange';

export const LIGHT_THEME = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: cyan[500],
    },
    secondary: {
      main: orange[500],
    },
  },
});

export const DARK_THEME = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: cyan[500],
    },
    secondary: {
      main: orange[500],
    },
  },
});

export const useStyles = makeStyles(
  (theme: Theme) => ({
    appTitle: {
      flexGrow: 1,
      fontWeight: 'bold',
      '&:hover': {
        cursor: 'default',
      },
    },
    appLoader: {
      zIndex: 9999,
    },
    appContainer: {
      paddingTop: '80px',
      [theme.breakpoints.down('xs')]: {
        paddingTop: '75px',
      },
    },
    drawerFAB: {
      position: 'fixed',
      bottom: '16px',
      right: '16px',
    },
    primary: {
      color: 'var(--primary)',
    },
    secondary: {
      color: 'var(--secondary)',
    },
    success: {
      color: 'var(--success)',
    },
    error: {
      color: 'var(--error)',
    },
    listNested: {
      paddingLeft: theme.spacing(4),
    },
    listItemIcon: {
      minWidth: theme.spacing(4),
    },
    labelSuccess: {
      color: 'var(--success)',
      fontSize: '150%',
    },
    cardMedia: {
      height: '300px',
    },
  }),
  { index: 1 }
);
