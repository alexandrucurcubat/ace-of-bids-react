import { IUser } from './user.interface';

export interface IAuction {
  id: number;
  title: string;
  description: string;
  images: string[];
  reserve?: number;
  currency: AuctionCurrency;
  status: AuctionStatus;
  openTimestamp: Date;
  closeTimestamp?: Date;
  timeBeforeClose: number;
  bids: IBid[];
  lastBid?: number;
  sold: boolean;
}

export interface IBid {
  id: number;
  amount: number;
  bidder: IUser;
  timestamp: Date;
}

export enum AuctionsView {
  GRID = 'grid',
  LIST = 'list',
}

export enum AuctionsFilterBy {
  ENDING_SOON = 'endingSoon',
  NEWLY_LISTED = 'newlyListed',
  NO_RESERVE = 'noReserve',
}

export enum AuctionStatus {
  LIVE = 'live',
  CLOSED = 'closed',
}

export enum AuctionCurrency {
  EUR = 'EUR',
  USD = 'USD',
  RON = 'RON',
}
