import {
  FC,
  useState,
  useEffect,
  KeyboardEvent,
  MouseEvent,
  useContext,
} from 'react';
import { Link } from 'react-router-dom';
import { Theme, useMediaQuery } from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import Menu from '@material-ui/icons/Menu';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import MonetizationOn from '@material-ui/icons/MonetizationOn';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Help from '@material-ui/icons/Help';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import RssFeed from '@material-ui/icons/RssFeed';
import Gavel from '@material-ui/icons/Gavel';
import Person from '@material-ui/icons/Person';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import { useStyles } from '../../theming';
import { DarkThemeContext } from '../../store/ThemeProvider';
import { AuthContext } from '../../store/AuthProvider';
import { setDarkMode } from '../../store/actions/theme-actions';
import { openAuthDialog } from '../../store/actions/auth-actions';

const isIOS =
  (process as any).browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const Drawer: FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [showNestedAuctions, setShowNestedAuctions] = useState(false);
  const [showNestedAccount, setShowNestedAccount] = useState(false);
  const { themeState, themeDispatch } = useContext(DarkThemeContext);
  const { authState, authDispatch, onLogout } = useContext(AuthContext);
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs')
  );

  const handleOpenAuthDialog = () => authDispatch(openAuthDialog());
  const handleLogout = () => onLogout();
  const handleNestedAuctions = () => setShowNestedAuctions(!showNestedAuctions);
  const handleNestedAccount = () => setShowNestedAccount(!showNestedAccount);
  const handleToggleDrawer = (isOpened: boolean) => (
    event: KeyboardEvent | MouseEvent
  ) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' ||
        (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsOpened(isOpened);
  };
  const handleSetDarkMode = () =>
    themeDispatch(setDarkMode(!themeState.isDarkMode));

  useEffect(() => {
    isOpened && setIsOpened(isMobile);
  }, [isMobile, isOpened]);

  return (
    <aside>
      <SwipeableDrawer
        anchor="left"
        open={isOpened}
        onClose={handleToggleDrawer(false)}
        onOpen={handleToggleDrawer(true)}
        disableBackdropTransition={!isIOS}
        disableDiscovery={isIOS}
      >
        <List component="nav">
          <ListItem button onClick={handleNestedAuctions}>
            <ListItemIcon color="inherit">
              <MonetizationOn />
            </ListItemIcon>
            <ListItemText primary="Licitații" />
            {showNestedAuctions ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={showNestedAuctions} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                to="/auctions?status=live"
                className={classes.link}
                onClick={handleToggleDrawer(false)}
              >
                <ListItem button className={`${classes.listNested}`}>
                  <ListItemIcon>
                    <RssFeed />
                  </ListItemIcon>
                  <ListItemText primary="Live" className="success" />
                </ListItem>
              </Link>
              <Link
                to="/auctions?status=closed"
                className={classes.link}
                onClick={handleToggleDrawer(false)}
              >
                <ListItem button className={classes.listNested}>
                  <ListItemIcon>
                    <Gavel />
                  </ListItemIcon>
                  <ListItemText primary="Închise" />
                </ListItem>
              </Link>
            </List>
          </Collapse>
          <Link
            to="/about"
            className={classes.link}
            onClick={handleToggleDrawer(false)}
          >
            <ListItem button>
              <ListItemIcon>
                <Help />
              </ListItemIcon>
              <ListItemText primary="Despre noi" />
            </ListItem>
          </Link>
          {authState.isLoggedIn ? (
            <>
              <ListItem button onClick={handleNestedAccount}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Contul meu" />
                {showNestedAccount ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={showNestedAccount} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Link
                    to="/account"
                    className={classes.link}
                    onClick={handleToggleDrawer(false)}
                  >
                    <ListItem button className={classes.listNested}>
                      <ListItemIcon>
                        <Person />
                      </ListItemIcon>
                      <ListItemText primary="Vezi contul" />
                    </ListItem>
                  </Link>
                  <div onClick={handleLogout}>
                    <ListItem
                      button
                      className={classes.listNested}
                      onClick={handleToggleDrawer(false)}
                    >
                      <ListItemIcon>
                        <PowerSettingsNewIcon />
                      </ListItemIcon>
                      <ListItemText primary="Deconectare" className="error" />
                    </ListItem>
                  </div>
                </List>
              </Collapse>
            </>
          ) : (
            <div onClick={handleToggleDrawer(false)}>
              <ListItem button onClick={handleOpenAuthDialog}>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>
                <ListItemText primary="Conectează-te" />
              </ListItem>
            </div>
          )}
          <ListItem button onClick={handleSetDarkMode}>
            <ListItemIcon
              className={themeState.isDarkMode ? classes.secondary : ''}
            >
              {themeState.isDarkMode ? (
                <Brightness5Icon />
              ) : (
                <Brightness4Icon />
              )}
            </ListItemIcon>
            <ListItemText
              primary={themeState.isDarkMode ? 'Mod zi' : 'Mod noapte'}
            />
          </ListItem>
        </List>
      </SwipeableDrawer>
      {isMobile && (
        <Fab
          className={classes.drawerFAB}
          color="primary"
          onClick={handleToggleDrawer(true)}
        >
          <Menu />
        </Fab>
      )}
    </aside>
  );
};

export default Drawer;
