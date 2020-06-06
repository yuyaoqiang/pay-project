import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistEnhancer = () => createStore => (reducer, initialState, enhancer) => {
  const store = createStore(persistReducer(persistConfig, reducer), initialState, enhancer);
  const persist = persistStore(store);
  return { ...store, persist };
};

/* eslint-disable */
export const dva = {
  config: {
    onError(e) {
      e.preventDefault();
    },
    extraEnhancers: [persistEnhancer()],
  },
};
