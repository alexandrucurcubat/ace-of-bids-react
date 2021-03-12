import { ChangeEvent, FC, MouseEvent, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import RssFeed from '@material-ui/icons/RssFeed';
import Apps from '@material-ui/icons/Apps';
import ViewListIcon from '@material-ui/icons/ViewList';
import Gavel from '@material-ui/icons/Gavel';
import Divider from '@material-ui/core/Divider';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import './AuctionsHeader.css';
import {
  AuctionsFilterBy,
  AuctionStatus,
  AuctionsView,
} from '../../models/auction.interface';
import { useStyles } from '../../theming';
import { LocalStorage } from '../../models/local-storage.enum';

const filterByOptions = [
  { value: AuctionsFilterBy.ENDING_SOON, option: 'Se închid în curând' },
  { value: AuctionsFilterBy.NEWLY_LISTED, option: 'Deschise recent' },
  { value: AuctionsFilterBy.NO_RESERVE, option: 'Fără rezervă' },
];

const localAuctionsView =
  (localStorage.getItem(LocalStorage.AUCTION_VIEW) as AuctionsView) ||
  AuctionsView.GRID;

const AuctionsHeader: FC<{
  status: AuctionStatus;
  filterBy: AuctionsFilterBy;
  onFilterBy: any;
}> = ({ status, filterBy, onFilterBy }) => {
  const [auctionsView, setAuctionsView] = useState(localAuctionsView);
  const classes = useStyles();

  const handleFilterBy = (event: ChangeEvent<{ value: unknown }>) => {
    onFilterBy(event.target.value as AuctionsFilterBy);
  };

  const handleAuctionsView = (
    event: MouseEvent<HTMLElement>,
    auctionsView: AuctionsView
  ) => {
    setAuctionsView(auctionsView);
    localStorage.setItem(LocalStorage.AUCTION_VIEW, auctionsView);
  };

  return (
    <>
      <div className="header">
        {status === AuctionStatus.LIVE ? (
          <FormControl>
            <InputLabel className={classes.labelSuccess} id="filter-by">
              <RssFeed /> Live
            </InputLabel>
            <Select
              labelId="filter-by"
              value={filterBy}
              onChange={handleFilterBy}
            >
              {filterByOptions.map((o, i) => (
                <MenuItem key={i} value={o.value}>
                  {o.option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <div className="header-closed">
            <Gavel />
            Închise
          </div>
        )}
        <ToggleButtonGroup
          value={auctionsView}
          exclusive
          onChange={handleAuctionsView}
        >
          <ToggleButton value={AuctionsView.GRID} aria-label="grid">
            <Apps />
          </ToggleButton>
          <ToggleButton value={AuctionsView.LIST} aria-label="list">
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <Divider />
    </>
  );
};

export default AuctionsHeader;
