import { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { AuctionStatus, IAuction } from '../../models/auction.interface';
import { secondsToDhms } from '../../utils/secods-to-dhms';
import { useStyles } from '../../theming';

const AuctionsGrid: FC<{ auctions: IAuction[] }> = ({ auctions }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      {auctions.map((auction) => {
        return (
          <Grid key={auction.id} item xs={12} sm={6} md={4}>
            <Card>
              <div style={{ padding: '16px' }}>
                <Typography variant="h6">{auction.title}</Typography>
                <Typography
                  variant="subtitle1"
                  color={auction.reserve ? 'textSecondary' : 'primary'}
                >
                  {auction.reserve ? 'Cu rezervă' : 'Fără rezervă'}
                </Typography>
              </div>
              <CardMedia
                className={classes.cardMedia}
                image={process.env.PUBLIC_URL + '/logo512.png'}
                title="Auction image"
              />
              <CardContent>
                <Typography variant="body2" color="textPrimary" component="p">
                  {auction.description}
                </Typography>
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
                      color="textPrimary"
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
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AuctionsGrid;
