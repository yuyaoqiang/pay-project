import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import Serivce from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: any) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: any;
  effects: any;
  reducers: {
    [rondom: string]: Reducer<any>;
  };
}

const initState = {};

const Model: ModelType = {
  namespace: 'backAccount',

  state: initState,

  effects: {
    *list({ payload }, { call, put }) {
      return yield call(Serivce.list, payload.params);
    },
    *add({ payload }, { call, put }) {
      return yield call(Serivce.add, payload.params);
    },
    *update({ payload }, { call, put }) {
      return yield call(Serivce.update, payload.params);
    },
    *del({ payload }, { call, put }) {
      return yield call(Serivce.del, payload.params);
    },
    *updatePwd({ payload }, { call, put }) {
      return yield call(Serivce.updatePwd, payload.params);
    },
    *getGoogleAuthInfo({ payload }, { call, put }) {
      return yield call(Serivce.getGoogleAuthInfo, payload.params);
    },
    *generateGoogleSecretKey({ payload }, { call, put }) {
      return yield call(Serivce.generateGoogleSecretKey, payload.params);
    },
    *bindGoogleAuth({ payload }, { call, put }) {
      return yield call(Serivce.bindGoogleAuth, payload.params);
    },
    *findAllLowerLevelAccount({ payload }, { call, put }) {
      return yield call(Serivce.findAllLowerLevelAccount, payload.params);
    },
  },

  reducers: {},
};

export default Model;
