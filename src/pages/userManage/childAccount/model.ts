import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import service from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: any) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    [rondom: string]: Effect;
  };
  reducers: {
    [rondom: string]: Reducer<any>;
  };
}

const initState = {};

const Model: ModelType = {
  namespace: 'childAccount',
  state: initState,
  effects: {
    *getChildAccounts({ payload }, { call }) {
      return yield call(service.getChildAccountList, payload.params);
    },
    *updateChildAccount({ payload }, { call }) {
      return yield call(service.updateAccount, payload.params);
    },
    *delAccount({ payload }, { call }) {
      return yield call(service.delAccount, payload.params);
    },
    *addAccount({ payload }, { call }) {
      return yield call(service.addAccount, payload.params);
    },
    *getUserLevelList({ payload }, { call }) {
      return yield call(service.getUserLevel, payload.params);
    },
    *modifyUserLevel({ payload }, { call }) {
      return yield call(service.modifyUserLevel, payload.params);
    },
  },
  reducers: {},
};
export default Model;
