import { useContext } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import './App.css';
import { DarkThemeContext } from './common/theme/theme-context';
import { useStyles } from './common/theme/theming';
import Drawer from './common/components/drawer/Drawer';
import Header from './common/components/header/Header';
import Footer from './common/components/footer/Footer';
import AuthRoute from './common/components/auth/AuthRoute';
import Auctions from './common/components/auctions/Auctions';
import Account from './common/components/account/Account';

const useQuery = () => new URLSearchParams(useLocation().search);

function App() {
  const { theme } = useContext(DarkThemeContext);
  const classes = useStyles();
  const queryParams = useQuery();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Drawer />
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
