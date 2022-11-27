import { api } from './api';
import { clearProfile } from 'store/profileSlice';
import { setToken } from 'store/authSlice';
import { RootState } from 'store/store';
import { isExpired } from 'react-jwt';
import { Middleware, Dispatch } from 'redux';
import { MiddlewareAPI, AnyAction } from 'redux';
import { redirect } from 'react-router-dom';

const checkTokenMW: Middleware<Dispatch> =
  ({ dispatch, getState }: MiddlewareAPI) =>
  (next) =>
  async (action: AnyAction) => {
    if (action.type != 'auth/setToken') {
      const token = (getState() as RootState).auth.token;

      if (token && isExpired(token)) {
        localStorage.clear();
        await dispatch(setToken(''));
        await dispatch(clearProfile);
        await dispatch(api.util.resetApiState());

        console.log('Token has expired!');
        return redirect('/login');
      }
    }
    return next(action);
  };

export default checkTokenMW;
