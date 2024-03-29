import { ChangeEvent, FC, MouseEvent } from 'react';
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

const AuctionsHeader: FC<{
  status: AuctionStatus;
  filterBy: AuctionsFilterBy;
  onFilterBy: any;
  auctionsView: AuctionsView;
  onChangeAuctionView: any;
}> = ({ status, filterBy, onFilterBy, auctionsView, onChangeAuctionView }) => {
  const classes = useStyles();

  const handleFilterBy = (event: ChangeEvent<{ value: unknown }>) => {
    onFilterBy(event.target.value as AuctionsFilterBy);
  };

  const handleAuctionsView = (
    event: MouseEvent<HTMLElement>,
    auctionsView: AuctionsView
  ) => {
    if (auctionsView) {
      onChangeAuctionView(auctionsView);
      localStorage.setItem(LocalStorage.AUCTION_VIEW, auctionsView);
    }
  };

  return (
    <>
      <header className="flex space-between pb-16">
        {status === AuctionStatus.LIVE ? (
          <FormControl>
            <InputLabel id="filter-by">
              <RssFeed className={classes.labelIcon} /> <span>Live</span>
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
          <h2 className="pt-16">
            <Gavel />
            <span> Închise</span>
          </h2>
        )}
        <ToggleButtonGroup
          value={auctionsView}
          exclusive
          onChange={handleAuctionsView}
        >
          <ToggleButton value={AuctionsView.GRID}>
            <Apps />
          </ToggleButton>
          <ToggleButton value={AuctionsView.LIST}>
            <ViewListIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </header>
      <Divider />
    </>
  );
};

export default AuctionsHeader;
