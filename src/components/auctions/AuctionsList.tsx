import { FC, Fragment } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import { AuctionStatus, IAuction } from '../../models/auction.interface';
import { secondsToDhms } from '../../utils/secods-to-dhms';

const AuctionsList: FC<{ auctions: IAuction[] }> = ({ auctions }) => {
  return (
    <List component="nav">
      {auctions.map((auction) => (
        <Fragment key={auction.id}>
          <ListItem button>
            <ListItemAvatar>
              <Avatar
                alt="auction image"
                src={process.env.PUBLIC_URL + '/logo192.png'}
              />
            </ListItemAvatar>
            <div>
              <Typography variant="body2">{auction.title}</Typography>
              <Typography
                variant="body2"
                color={auction.reserve ? 'textSecondary' : 'primary'}
              >
                {auction.reserve ? 'Cu rezervă' : 'Fără rezervă'}
              </Typography>
            </div>
            <ListItemSecondaryAction className="flex-column align-items-end">
              {auction.status === AuctionStatus.LIVE ? (
                <>
                  {auction.lastBid !== 0 ? (
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      component="p"
                    >
                      Ultima ofertă:{' '}
                      <span className="fw-500">
                        {`${auction.lastBid} ${auction.currency}`}
                      </span>
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="p"
                    >
                      Nu sunt oferte
                    </Typography>
                  )}
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Închide în:
                    <span
                      className={
                        auction.timeBeforeClose < 10800 ? 'error' : 'success'
                      }
                    >
                      {` ${secondsToDhms(auction.timeBeforeClose)}`}
                    </span>
                  </Typography>
                </>
              ) : (
                <>
                  {auction.sold ? (
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="p"
                    >
                      S-a vândut cu{' '}
                      <span className="fw-500">{`${auction.lastBid} ${auction.currency}`}</span>
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      color="textPrimary"
                      component="p"
                    >
                      Nu s-a vândut
                    </Typography>
                  )}
                </>
              )}
            </ListItemSecondaryAction>
          </ListItem>
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};

export default AuctionsList;
