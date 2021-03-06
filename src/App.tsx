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
import AuctionsContainer from './components/auctions/AuctionsContainer';
import Account from './components/account/Account';
import { useAppInterceptor } from './hooks/app-interceptor';
import { AuctionStatus } from './models/auction.interface';

const useQuery = () => new URLSearchParams(useLocation().search);

function App() {
  const { appState, appDispatch } = useContext(AppContext);
  const { themeState } = useContext(DarkThemeContext);
  const classes = useStyles();
  const queryParams = useQuery();

  useAppInterceptor(appDispatch);

  return (
    <ThemeProvider theme={themeState.theme}>
      <CssBaseline />
      <Drawer />
      {appState.isLoading && <LinearProgress className={classes.appLoader} />}
      <Header />
      <Container fixed className={classes.appContainer}>
        <Switch>
          <Route path="/auctions">
            <AuctionsContainer
              status={queryParams.get('status') as AuctionStatus}
            />
          </Route>
          <Route path="/about">Despre noi</Route>
          <AuthRoute path="/account">
            <Account />
          </AuthRoute>
          <Route path="/">
            <Redirect to="/auctions?status=live" />
          </Route>
        </Switch>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
