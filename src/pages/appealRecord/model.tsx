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
  namespace: 'appealRecord',

  state: initState,

  effects: {
    *list({ payload }, { call, put }) {
      return yield call(Serivce.list, payload.params);
    },
    *alterToActualPayAmount({ payload }, { call, put }) {
      return yield call(Serivce.alterToActualPayAmount, payload.params);
    },
    *confirmToPaid({ payload }, { call, put }) {
      return yield call(Serivce.confirmToPaid, payload.params);
    },
    *cancelOrder({ payload }, { call, put }) {
      return yield call(Serivce.cancelOrder, payload.params);
    },
    *add({ payload }, { call, put }) {
      return yield call(Serivce.add, payload.params);
    },
    *del({ payload }, { call, put }) {
      return yield call(Serivce.del, payload.params);
    },
  },

  reducers: {},
};

export default Model;
