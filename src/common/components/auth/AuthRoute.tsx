import { FC, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthContext } from './context/auth-context';

const AuthRoute: FC<{ path: string }> = ({ children, ...rest }) => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/auctions',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
