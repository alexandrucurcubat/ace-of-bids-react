import { useContext } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';

import './App.css';
import { useStyles } from './theming';
import { AppContext } from './context/AppProvider';
import { DarkThemeContext } from './context/ThemeProvider';
import Drawer from './components/drawer/Drawer';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import AuthRoute from './components/auth/AuthRoute';
import Auctions from './components/auctions/Auctions';
import Account from './components/account/Account';

const useQuery = () => new URLSearchParams(useLocation().search);

function App() {
  const { appState } = useContext(AppContext);
  const { themeState } = useContext(DarkThemeContext);
  const classes = useStyles();
  const queryParams = useQuery();

  return (
    <ThemeProvider theme={themeState.theme}>
      <CssBaseline />
      <Drawer />
      {appState.isLoading && <LinearProgress className={classes.appLoader} />}
      <Header />
      <Container fixed className={classes.appContainer}>
        <Switch>
          <Route path="/auctions">
            <Auctions status={queryParams.get('status')} />
          </Route>
          <Route path="/about">Despre noi</Route>
          <AuthRoute path="/account">
            <Account />
          </AuthRoute>
          <Route path="/">
            <Redirect to="/auctions" />
          </Route>
        </Switch>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
