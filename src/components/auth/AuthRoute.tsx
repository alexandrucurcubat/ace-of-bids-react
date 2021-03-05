import { FC, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { AuthContext } from '../../context/AuthProvider';
import { LocalStorage } from '../../models/local-storage.enum';

const AuthRoute: FC<{ path: string }> = ({ children, ...props }) => {
  const { authState } = useContext(AuthContext);
  return (
    <Route
      {...props}
      render={({ location }) => {
        if (authState.isLoggedIn) {
          return <>{children}</>;
        } else if (!localStorage.getItem(LocalStorage.JWT)) {
          return (
            <Redirect
              to={{
                pathname: '/auctions',
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
};

export default AuthRoute;
