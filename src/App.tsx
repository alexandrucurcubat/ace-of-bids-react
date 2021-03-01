import React, { useContext } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';
import Drawer from './common/components/drawer/Drawer';
import Header from './common/components/header/Header';
import Footer from './common/components/footer/Footer';
import { DarkThemeContext } from './common/theme/theme-context';
import { useStyles } from './common/theme/theming';

const App = () => {
  const { theme } = useContext(DarkThemeContext);
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Drawer />
      <Header />
      <Container fixed className={classes.appContainer}>
        <Switch>
          <Route path="/auctions/live">Licitații live</Route>
          <Route path="/auctions/closed">Licitații închise</Route>
          <Route path="/about">Despre noi</Route>
          <Route path="/account">Contul meu</Route>
          <Route path="/">
            <Redirect to="/auctions/live" />
          </Route>
        </Switch>
      </Container>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
