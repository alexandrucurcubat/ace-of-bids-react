import { FC } from 'react';
import { IAuction } from '../../models/auction.interface';

const AuctionsClosed: FC<{ auctions: IAuction[] }> = ({ auctions }) => {
  return (
    <>
      {auctions.map((auction) => {
        return <p key={auction.id}>{auction.title}</p>;
      })}
    </>
  );
};

export default AuctionsClosed;
