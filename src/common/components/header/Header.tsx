import { FC, MouseEvent, useContext, useState } from 'react';
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

import { useStyles } from '../../theme/theming';
import { DarkThemeContext } from '../../theme/theme-context';

const Header: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { isDarkMode, onSetDarkMode } = useContext(DarkThemeContext);
  const darkModeIcon = isDarkMode ? <Brightness5Icon /> : <Brightness4Icon />;
  const classes = useStyles();
  const isMobile = useMediaQuery((theme: Theme) => {
    return theme.breakpoints.down('xs');
  });

  const handleAuctionsMenuClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAuctionsMenuClose = () => {
    setAnchorEl(null);
  };

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
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleAuctionsMenuClose}
              >
                <MenuItem onClick={handleAuctionsMenuClose}>
                  <ListItemIcon className={classes.listItemIcon}>
                    <RssFeed fontSize="small" />
                  </ListItemIcon>
                  <Typography className={classes.success}>Live</Typography>
                </MenuItem>
                <MenuItem onClick={handleAuctionsMenuClose}>
                  <ListItemIcon className={classes.listItemIcon}>
                    <Gavel fontSize="small" />
                  </ListItemIcon>
                  <Typography>Închise</Typography>
                </MenuItem>
              </Menu>
              <Button style={{ textTransform: 'none' }}>Despre noi</Button>
              <Button style={{ textTransform: 'none' }} color="primary">
                Conectează-te
              </Button>
              <IconButton
                edge="end"
                color={isDarkMode ? 'secondary' : 'inherit'}
                aria-label="mode"
                onClick={() => onSetDarkMode && onSetDarkMode(!isDarkMode)}
              >
                {darkModeIcon}
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
