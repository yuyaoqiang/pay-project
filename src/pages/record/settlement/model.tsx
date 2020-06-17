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
  namespace: 'settlement',

  state: initState,

  effects: {
    *list({ payload }, { call, put }) {
      return yield call(Serivce.list, payload.params);
    },
    *add({ payload }, { call, put }) {
      return yield call(Serivce.add, payload.params);
    },
    *settlementApproved({ payload }, { call, put }) {
      return yield call(Serivce.settlementApproved, payload.params);
    },
    *findChukanBankByPage({ payload }, { call, put }) {
      return yield call(Serivce.findChukanBankByPage, payload.params);
    },
    *settlementNotApproved({ payload }, { call, put }) {
      return yield call(Serivce.settlementNotApproved, payload.params);
    },
    *del({ payload }, { call, put }) {
      return yield call(Serivce.del, payload.params);
    },
    *settlementConfirmCredited({ payload }, { call, put }) {
      return yield call(Serivce.settlementConfirmCredited, payload.params);
    },
  },

  reducers: {},
};

export default Model;
