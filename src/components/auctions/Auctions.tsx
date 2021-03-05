import { FC } from 'react';
import { Redirect } from 'react-router-dom';

const Auctions: FC<{ status: string | null }> = ({ status }) => (
  <>
    {status === 'live' && <p>Licitații live</p>}
    {status === 'closed' && <p>Licitații închise</p>}
    {status !== 'live' && status !== 'closed' && (
      <Redirect to="/auctions?status=live" />
    )}
  </>
);

export default Auctions;
