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

import './Drawer.css';
import { useStyles } from '../../theme/theming';
import { DarkThemeContext } from '../../theme/theme-context';
import { AuthContext } from '../auth/context/auth-context';

interface DrawerProps {
  onOpenAuthDialog: () => void;
}

const isIOS =
  (process as any).browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

const Drawer: FC<DrawerProps> = ({ onOpenAuthDialog }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [showNestedAuctions, setShowNestedAuctions] = useState(false);
  const [showNestedAccount, setShowNestedAccount] = useState(false);
  const { isDarkMode, onSetDarkMode } = useContext(DarkThemeContext);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const darkModeIcon = isDarkMode ? <Brightness5Icon /> : <Brightness4Icon />;
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs')
  );

  const handleOpenAuthDialog = () => onOpenAuthDialog();
  const handleSetDarkMode = () => onSetDarkMode && onSetDarkMode(!isDarkMode);
  const handleLogout = () => logout && logout();
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

  useEffect(() => {
    isOpened && setIsOpened(isMobile);
  }, [isMobile, isOpened]);

  return (
    <>
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
                to="/auctions/live"
                style={{ textDecoration: 'none', display: 'block' }}
                onClick={handleToggleDrawer(false)}
              >
                <ListItem
                  button
                  className={`${classes.listNested} ${classes.success}`}
                >
                  <ListItemIcon>
                    <RssFeed />
                  </ListItemIcon>
                  <ListItemText primary="Live" color="primary" />
                </ListItem>
              </Link>
              <Link
                to="/auctions/closed"
                style={{ textDecoration: 'none', display: 'block' }}
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
            style={{
              textDecoration: 'none',
              display: 'block',
              color: isDarkMode ? 'white' : 'black',
            }}
            onClick={handleToggleDrawer(false)}
          >
            <ListItem button>
              <ListItemIcon>
                <Help />
              </ListItemIcon>
              <ListItemText primary="Despre noi" />
            </ListItem>
          </Link>
          {isLoggedIn ? (
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
                    style={{ textDecoration: 'none', display: 'block' }}
                    onClick={handleToggleDrawer(false)}
                  >
                    <ListItem button className={classes.listNested}>
                      <ListItemIcon>
                        <Person />
                      </ListItemIcon>
                      <ListItemText
                        primary="Vezi contul"
                        style={{ color: isDarkMode ? 'white' : 'black' }}
                      />
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
            <ListItemIcon className={isDarkMode ? classes.secondary : ''}>
              {darkModeIcon}
            </ListItemIcon>
            <ListItemText primary={isDarkMode ? 'Mod zi' : 'Mod noapte'} />
          </ListItem>
        </List>
      </SwipeableDrawer>
      {isMobile && (
        <Fab
          className={classes.drawerFAB}
          color="primary"
          aria-label="drawer"
          onClick={handleToggleDrawer(true)}
        >
          <Menu />
        </Fab>
      )}
    </>
  );
};

export default Drawer;
