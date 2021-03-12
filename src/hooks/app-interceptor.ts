import { useEffect } from 'react';
import fetchIntercept from 'fetch-intercept';

import { setIsLoading } from '../context/actions/app-actions';
import { LocalStorage } from '../models/local-storage.enum';

let totalRequests = 0;

export const useAppInterceptor = (appDispatch: any) => {
  const unregisterInterceptor = fetchIntercept.register({
    request: function (url, config) {
      totalRequests++;
      appDispatch(setIsLoading(true));

      const isApiUrl =
        process.env.REACT_APP_API_URL &&
        url.startsWith(process.env.REACT_APP_API_URL);
      const jwt = localStorage.getItem(LocalStorage.JWT);
      if (isApiUrl && jwt) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${jwt}`,
        };
      }
      return [url, config];
    },

    requestError: function (error) {
      return Promise.reject(error);
    },

    response: function (response) {
      totalRequests--;
      if (totalRequests === 0) {
        appDispatch(setIsLoading(false));
      }
      return response;
    },

    responseError: function (error) {
      return Promise.reject(error);
    },
  });

  useEffect(() => {
    return unregisterInterceptor();
  }, [unregisterInterceptor]);
};
