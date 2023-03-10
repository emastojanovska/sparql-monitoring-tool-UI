import { combineReducers } from '@reduxjs/toolkit';
import queryData from "app/store/query-data/queryDataReducer";
import endpoint from "app/store/sparql-endpoints/endpointReducer"
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import fuse from './fuse';
import i18n from './i18nSlice';
import user from './userSlice';

const createReducer = (asyncReducers) => (state, action) => {
  const combinedReducer = combineReducers({
    fuse,
    i18n,
    user,
    queryData,
    endpoint,
    ...asyncReducers,
  });

  /*
	Reset the redux store when user logged out
	 */
  if (action.type === 'user/userLoggedOut') {
    // state = undefined;
  }

  return combinedReducer(state, action);
};

export const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['endpoint']
}

export const persistedReducer = persistReducer(persistConfig, createReducer());


export default createReducer;
