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
import { DarkThemeContext } from '../../context/ThemeProvider';
import { AuthContext } from '../../context/AuthProvider';
import { setDarkMode } from '../../context/actions/theme-actions';
import { openAuthDialog } from '../../context/actions/auth-actions';

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
                style={{ textTransform: 'none' }}
                aria-controls="auctions-menu"
                aria-haspopup="true"
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
                <Link
                  to="/auctions?status=live"
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <MenuItem onClick={handleAuctionsMenuClose}>
                    <ListItemIcon className={classes.listItemIcon}>
                      <RssFeed fontSize="small" />
                    </ListItemIcon>
                    <Typography className={classes.success}>Live</Typography>
                  </MenuItem>
                </Link>
                <Link
                  to="/auctions?status=closed"
                  style={{ textDecoration: 'none', display: 'block' }}
                >
                  <MenuItem onClick={handleAuctionsMenuClose}>
                    <ListItemIcon className={classes.listItemIcon}>
                      <Gavel fontSize="small" />
                    </ListItemIcon>
                    <Typography
                      style={{
                        color: themeState.isDarkMode ? 'white' : 'black',
                      }}
                    >
                      Închise
                    </Typography>
                  </MenuItem>
                </Link>
              </Menu>
              <Button
                component={Link}
                to={'/about'}
                style={{ textTransform: 'none' }}
              >
                Despre noi
              </Button>
              {authState.isLoggedIn ? (
                <>
                  <Button
                    color="primary"
                    aria-controls="account-menu"
                    aria-haspopup="true"
                    onClick={handleAccountMenuClick}
                    style={{ textTransform: 'none' }}
                  >
                    Contul meu
                  </Button>
                  <Menu
                    anchorEl={accountMenu}
                    keepMounted
                    open={Boolean(accountMenu)}
                    onClose={handleAccountMenuClose}
                  >
                    <Link
                      to="/account"
                      style={{ textDecoration: 'none', display: 'block' }}
                    >
                      <MenuItem onClick={handleAccountMenuClose}>
                        <ListItemIcon className={classes.listItemIcon}>
                          <Person fontSize="small" />
                        </ListItemIcon>
                        <Typography
                          className={classes.listItemIcon}
                          style={{
                            color: themeState.isDarkMode ? 'white' : 'black',
                          }}
                        >
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
                  style={{ textTransform: 'none' }}
                  onClick={() => handleOpenAuthDialog()}
                  color="primary"
                >
                  Conectează-te
                </Button>
              )}

              <IconButton
                edge="end"
                color={themeState.isDarkMode ? 'secondary' : 'inherit'}
                aria-label="mode"
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
