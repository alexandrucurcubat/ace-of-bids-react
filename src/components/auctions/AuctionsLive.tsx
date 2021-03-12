import { FC } from 'react';
import { IAuction } from '../../models/auction.interface';
import { secondsToDhms } from '../../utils/secods-to-dhms';

const AuctionsLive: FC<{ auctions: IAuction[] }> = ({ auctions }) => {
  return (
    <>
      {auctions.map((auction) => {
        return (
          <p key={auction.id}>
            {auction.title} {secondsToDhms(auction.timeBeforeClose)}
          </p>
        );
      })}
    </>
  );
};

export default AuctionsLive;
