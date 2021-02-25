import {
  FC,
  useState,
  useEffect,
  KeyboardEvent,
  MouseEvent,
  useContext,
} from 'react';
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

import './Drawer.css';
import { useStyles } from '../../theme/theming';
import { DarkThemeContext } from '../../theme/theme-context';

const Drawer: FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [showNestedAuctions, setShowNestedAuctions] = useState(false);
  const { isDarkMode, onSetDarkMode } = useContext(DarkThemeContext);
  const darkModeIcon = isDarkMode ? <Brightness5Icon /> : <Brightness4Icon />;
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => {
    return theme.breakpoints.down('xs');
  });
  const isIOS =
    (process as any).browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

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

  const handleNestedAuctions = () => {
    setShowNestedAuctions(!showNestedAuctions);
  };

  useEffect(() => {
    if (isOpened) {
      setIsOpened(isMobile);
    }
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
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button onClick={handleNestedAuctions}>
            <ListItemIcon color="inherit">
              <MonetizationOn />
            </ListItemIcon>
            <ListItemText primary="Licitații" />
            {showNestedAuctions ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={showNestedAuctions} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={`${classes.listNested} ${classes.success}`}
              >
                <ListItemIcon>
                  <RssFeed />
                </ListItemIcon>
                <ListItemText primary="Live" color="primary" />
              </ListItem>
              <ListItem button className={classes.listNested}>
                <ListItemIcon>
                  <Gavel />
                </ListItemIcon>
                <ListItemText primary="Închise" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Despre noi" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Help />
            </ListItemIcon>
            <ListItemText primary="Conectează-te" />
          </ListItem>
          <ListItem
            button
            onClick={() => onSetDarkMode && onSetDarkMode(!isDarkMode)}
          >
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
