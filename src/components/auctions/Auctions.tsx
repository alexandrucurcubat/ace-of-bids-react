import { FC, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import {
  AuctionsFilterBy,
  AuctionStatus,
  IAuction,
} from '../../models/auction.interface';
import { getAuctions } from './api/auctions-api';
import AuctionsClosed from './AuctionsClosed';
import AuctionsLive from './AuctionsLive';
import { useInterval } from '../../hooks/interval';
import AuctionsHeader from './AuctionsHeader';

const renderAuctionsByStatus = (
  status: AuctionStatus | null,
  auctions: IAuction[]
) => {
  if (status === AuctionStatus.LIVE) {
    return <AuctionsLive auctions={auctions} />;
  } else if (status === AuctionStatus.CLOSED) {
    return <AuctionsClosed auctions={auctions}  />;
  } else {
    <Redirect to="/auctions?status=live" />;
  }
};

const Auctions: FC<{ status: AuctionStatus }> = ({ status }) => {
  const [auctions, setAuctions] = useState<IAuction[]>([]);
  const [filterBy, setFilterBy] = useState(AuctionsFilterBy.ENDING_SOON);

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
      />
      <div>{renderAuctionsByStatus(status, auctions)}</div>
    </>
  );
};

export default Auctions;
