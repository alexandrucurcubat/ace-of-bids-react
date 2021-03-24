import { FC, MouseEvent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Theme, useMediaQuery } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import RssFeed from '@material-ui/icons/RssFeed';
import Gavel from '@material-ui/icons/Gavel';
import Person from '@material-ui/icons/Person';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

import { useStyles } from '../../theming';
import { DarkThemeContext } from '../../store/ThemeProvider';
import { AuthContext } from '../../store/AuthProvider';
import { openAuthDialog } from '../../store/actions/auth-actions';
import { setDarkMode } from '../../store/actions/theme-actions';


const Header: FC = () => {
  const [auctionsMenu, setAuctionsMenu] = useState<null | HTMLElement>(null);
  const [accountMenu, setAccountMenu] = useState<null | HTMLElement>(null);
  const { themeState, themeDispatch } = useContext(DarkThemeContext);
  const { authState, authDispatch, onLogout } = useContext(AuthContext);
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('xs')
  );

  const handleOpenAuthDialog = () => authDispatch(openAuthDialog());
  const handleLogout = () => onLogout();
  const handleAuctionsMenuClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAuctionsMenu(event.currentTarget);
  const handleAccountMenuClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAccountMenu(event.currentTarget);
  const handleAuctionsMenuClose = () => setAuctionsMenu(null);
  const handleAccountMenuClose = () => setAccountMenu(null);
  const handleSetDarkMode = () =>
    themeDispatch(setDarkMode(!themeState.isDarkMode));

  return (
    <>
      <AppBar color="default" position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.appTitle}>
            Ace<span className="primary">of</span>Bids
          </Typography>
          {!isMobile && (
            <>
              <Button
                className={classes.noTextTransform}
                onClick={handleAuctionsMenuClick}
              >
                Licitații
              </Button>
              <Menu
                anchorEl={auctionsMenu}
                keepMounted
                open={Boolean(auctionsMenu)}
                onClose={handleAuctionsMenuClose}
              >
                <Link to="/auctions?status=live" className={classes.link}>
                  <MenuItem onClick={handleAuctionsMenuClose}>
                    <ListItemIcon className={classes.listItemIcon}>
                      <RssFeed fontSize="small" />
                    </ListItemIcon>
                    <Typography className={classes.success}>Live</Typography>
                  </MenuItem>
                </Link>
                <Link to="/auctions?status=closed" className={classes.link}>
                  <MenuItem onClick={handleAuctionsMenuClose}>
                    <ListItemIcon className={classes.listItemIcon}>
                      <Gavel fontSize="small" />
                    </ListItemIcon>
                    <Typography>Închise</Typography>
                  </MenuItem>
                </Link>
              </Menu>
              <Button
                component={Link}
                to={'/about'}
                className={classes.noTextTransform}
              >
                Despre noi
              </Button>
              {authState.isLoggedIn ? (
                <>
                  <Button
                    color="primary"
                    onClick={handleAccountMenuClick}
                    className={classes.noTextTransform}
                  >
                    Contul meu
                  </Button>
                  <Menu
                    anchorEl={accountMenu}
                    keepMounted
                    open={Boolean(accountMenu)}
                    onClose={handleAccountMenuClose}
                  >
                    <Link to="/account" className={classes.link}>
                      <MenuItem onClick={handleAccountMenuClose}>
                        <ListItemIcon className={classes.listItemIcon}>
                          <Person fontSize="small" />
                        </ListItemIcon>
                        <Typography className={classes.listItemIcon}>
                          {authState.loggedUser?.username}
                        </Typography>
                      </MenuItem>
                    </Link>
                    <div onClick={handleLogout}>
                      <MenuItem onClick={handleAccountMenuClose}>
                        <ListItemIcon className={classes.listItemIcon}>
                          <PowerSettingsNewIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography className="error">Deconectare</Typography>
                      </MenuItem>
                    </div>
                  </Menu>
                </>
              ) : (
                <Button
                  className={classes.noTextTransform}
                  onClick={() => handleOpenAuthDialog()}
                  color="primary"
                >
                  Conectează-te
                </Button>
              )}

              <IconButton
                edge="end"
                color={themeState.isDarkMode ? 'secondary' : 'inherit'}
                onClick={handleSetDarkMode}
              >
                {themeState.isDarkMode ? (
                  <Brightness5Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
