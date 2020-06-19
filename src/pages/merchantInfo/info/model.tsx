import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import Service from './service';

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
  namespace: 'info',

  state: initState,

  effects: {
    *get({ payload }, { call, put }) {
      return yield call(Service.get, payload.params);
    },
    *getGoogleAuthInfo({ payload }, { call, put }) {
      return yield call(Service.getGoogleAuthInfo, payload.params);
    },
    *generateGoogleSecretKey({ payload }, { call, put }) {
      return yield call(Service.generateGoogleSecretKey, payload.params);
    },
    *bindGoogleAuth({ payload }, { call, put }) {
      return yield call(Service.bindGoogleAuth, payload.params);
    },
    *getBank({ payload }, { call, put }) {
      return yield call(Service.getBank, payload.params);
    },
    *update({ payload }, { call, put }) {
      return yield call(Service.update, payload.params);
    },
    *updatePwd({ payload }, { call, put }) {
      return yield call(Service.updatePwd, payload.params);
    },
    *modifyMoneyPwd1({ payload }, { call, put }) {
      return yield call(Service.modifyMoneyPwd1, payload.params);
    },
  },

  reducers: {},
};

export default Model;
