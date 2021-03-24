import {
  IAuction,
  AuctionCurrency,
  AuctionStatus,
  AuctionsFilterBy,
} from '../models/auction.interface';

const auctions: IAuction[] = [
  {
    id: 1,
    title: 'Licitația 1',
    description: 'Descriere 1',
    images: ['assets/icons/icon-512x512.png'],
    reserve: 100,
    currency: AuctionCurrency.EUR,
    status: AuctionStatus.LIVE,
    openTimestamp: new Date(),
    closeTimestamp: new Date(),
    timeBeforeClose: 10,
    bids: [],
    lastBid: 1.0,
    sold: false,
  },
  {
    id: 2,
    title: 'Licitația 2',
    description: 'Descriere 2',
    images: ['assets/icons/icon-512x512.png'],
    currency: AuctionCurrency.USD,
    status: AuctionStatus.LIVE,
    openTimestamp: new Date(),
    closeTimestamp: new Date(),
    timeBeforeClose: 86400,
    bids: [],
    lastBid: 0.0,
    sold: false,
  },
  {
    id: 3,
    title: 'Licitația 3',
    description: 'Descriere 3',
    images: ['assets/icons/icon-512x512.png'],
    currency: AuctionCurrency.EUR,
    status: AuctionStatus.LIVE,
    openTimestamp: new Date(),
    closeTimestamp: new Date(),
    timeBeforeClose: 54000,
    bids: [],
    lastBid: 3.0,
    sold: false,
  },
  {
    id: 4,
    title: 'Licitația 4',
    description: 'Descriere 4',
    images: ['assets/icons/icon-512x512.png'],
    reserve: 400,
    currency: AuctionCurrency.EUR,
    status: AuctionStatus.LIVE,
    openTimestamp: new Date(),
    closeTimestamp: new Date(),
    timeBeforeClose: 2520,
    bids: [],
    lastBid: 4.0,
    sold: false,
  },
  {
    id: 5,
    title: 'Licitația 5',
    description: 'Descriere 5',
    images: ['assets/icons/icon-512x512.png'],
    currency: AuctionCurrency.RON,
    status: AuctionStatus.LIVE,
    openTimestamp: new Date(),
    closeTimestamp: new Date(),
    timeBeforeClose: 259200,
    bids: [],
    lastBid: 5.0,
    sold: false,
  },
  {
    id: 6,
    title: 'Licitația 6',
    description: 'Descriere 6',
    images: ['assets/icons/icon-512x512.png'],
    currency: AuctionCurrency.USD,
    status: AuctionStatus.CLOSED,
    openTimestamp: new Date(),
    closeTimestamp: new Date(),
    timeBeforeClose: 0,
    bids: [],
    lastBid: 60.0,
    sold: true,
  },
  {
    id: 7,
    title: 'Licitația 7',
    description: 'Descriere 7',
    images: ['assets/icons/icon-512x512.png'],
    reserve: 700,
    currency: AuctionCurrency.USD,
    status: AuctionStatus.CLOSED,
    openTimestamp: new Date(),
    closeTimestamp: new Date(),
    timeBeforeClose: 0,
    bids: [],
    lastBid: 70.0,
    sold: false,
  },
];

export const getAuctions = (
  status: AuctionStatus,
  filterBy?: AuctionsFilterBy
) => {
  if (status === AuctionStatus.CLOSED) {
    return getClosedAuctions();
  } else {
    switch (filterBy) {
      case AuctionsFilterBy.ENDING_SOON:
        return getEndingSoonAuctions();
      case AuctionsFilterBy.NEWLY_LISTED:
        return getNewlyListedAuctions();
      case AuctionsFilterBy.NO_RESERVE:
        return getNoReserveAuctions();
      default:
        return getLiveAuctions();
    }
  }
};

const getLiveAuctions = () =>
  auctions.filter((auction) => auction.status === AuctionStatus.LIVE);

const getEndingSoonAuctions = () =>
  sortByEndingSoon(auctions).filter(
    (auction: IAuction) => auction.status === AuctionStatus.LIVE
  );

const getNewlyListedAuctions = () =>
  sortByNewlyListed(auctions).filter(
    (auction: IAuction) => auction.status === AuctionStatus.LIVE
  );

const getClosedAuctions = () =>
  sortByNewlyListed(auctions).filter(
    (auction: IAuction) => auction.status === AuctionStatus.CLOSED
  );

const getNoReserveAuctions = () =>
  sortByEndingSoon(auctions).filter(
    (auction: IAuction) =>
      auction.status === AuctionStatus.LIVE && !auction.reserve
  );

const sortByEndingSoon = (auctions: IAuction[]) =>
  auctions.sort((a, b) =>
    a.timeBeforeClose > b.timeBeforeClose
      ? 1
      : b.timeBeforeClose > a.timeBeforeClose
      ? -1
      : 0
  );

const sortByNewlyListed = (auctions: IAuction[]) =>
  auctions.sort((a, b) => (a.id < b.id ? 1 : b.id < a.id ? -1 : 0));
