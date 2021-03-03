import { useContext, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import './App.css';
import Drawer from './common/components/drawer/Drawer';
import Header from './common/components/header/Header';
import Footer from './common/components/footer/Footer';
import { DarkThemeContext } from './common/theme/theme-context';
import { useStyles } from './common/theme/theming';
import AuthDialog from './common/components/auth/AuthDialog';
import AuthProvider from './common/components/auth/context/auth-provider';

function App() {
  const [isAuthDialogOpened, setAuthDialogOpened] = useState(false);
  const { theme } = useContext(DarkThemeContext);
  const classes = useStyles();

  const handleOpenAuthDialog = () => setAuthDialogOpened(true);
  const handleCloseAuthDialog = () => setAuthDialogOpened(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider onCloseAuthDialog={handleCloseAuthDialog}>
        <Drawer onOpenAuthDialog={handleOpenAuthDialog} />
        <Header onOpenAuthDialog={handleOpenAuthDialog} />
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
        <AuthDialog
          isAuthDialogOpened={isAuthDialogOpened}
          onCloseAuthDialog={handleCloseAuthDialog}
        />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
