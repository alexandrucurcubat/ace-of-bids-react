import { FC, useEffect, useState } from 'react';

import {
  AuctionsFilterBy,
  AuctionStatus,
  AuctionsView,
  IAuction,
} from '../models/auction.interface';
import { getAuctions } from '../api/auctions-api';
import AuctionsGrid from '../components/auctions/AuctionsGrid';
import { useInterval } from '../hooks/interval';
import AuctionsHeader from '../components/auctions/AuctionsHeader';
import { LocalStorage } from '../models/local-storage.enum';
import AuctionsList from '../components/auctions/AuctionsList';

const localAuctionsView =
  (localStorage.getItem(LocalStorage.AUCTION_VIEW) as AuctionsView) ||
  AuctionsView.GRID;

const Auctions: FC<{ status: AuctionStatus }> = ({ status }) => {
  const [auctions, setAuctions] = useState<IAuction[]>([]);
  const [filterBy, setFilterBy] = useState(AuctionsFilterBy.ENDING_SOON);
  const [auctionsView, setAuctionsView] = useState(localAuctionsView);

  const onChangeAuctionView = (view: AuctionsView) => {
    setAuctionsView(view);
  };

  useInterval(() => {
    setAuctions(
      auctions.map((auction: IAuction) => {
        auction.timeBeforeClose !== 0
          ? auction.timeBeforeClose--
          : (auction.status = AuctionStatus.CLOSED);
        return auction;
      })
    );
  }, 1000);

  useEffect(() => {
    setAuctions(getAuctions(status, filterBy));
  }, [status, filterBy]);

  const handleFilterBy = (filterBy: AuctionsFilterBy) => setFilterBy(filterBy);

  return (
    <>
      <AuctionsHeader
        status={status}
        filterBy={filterBy}
        onFilterBy={handleFilterBy}
        auctionsView={auctionsView}
        onChangeAuctionView={onChangeAuctionView}
      />
      <div className={auctionsView === AuctionsView.GRID ? 'pt-16' : ''}>
        {auctionsView === AuctionsView.GRID ? (
          <AuctionsGrid auctions={auctions} />
        ) : (
          <AuctionsList auctions={auctions} />
        )}
      </div>
    </>
  );
};

export default Auctions;
