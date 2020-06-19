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
  namespace: 'levelMerchantOrder',

  state: initState,

  effects: {
    *list({ payload }, { call, put }) {
      return yield call(Serivce.list, payload.params);
    },

    *confirmToPaid({ payload }, { call, put }) {
      return yield call(Serivce.confirmToPaid, payload.params);
    },
    *confirmToPaidWithUnconfirmedAutoFreeze({ payload }, { call, put }) {
      return yield call(Serivce.confirmToPaidWithUnconfirmedAutoFreeze, payload.params);
    },
    *confirmToPaidWithCancelOrderRefund({ payload }, { call, put }) {
      return yield call(Serivce.confirmToPaidWithCancelOrderRefund, payload.params);
    },
    *resendNotice({ payload }, { call, put }) {
      return yield call(Serivce.resendNotice, payload.params);
    },
    *cancelOrder({ payload }, { call, put }) {
      return yield call(Serivce.cancelOrder, payload.params);
    },

    *cancelOrderRefund({ payload }, { call, put }) {
      return yield call(Serivce.cancelOrderRefund, payload.params);
    },

    *supplementOrder({ payload }, { call, put }) {
      return yield call(Serivce.supplementOrder, payload.params);
    },

    *updateNote({ payload }, { call, put }) {
      return yield call(Serivce.updateNote, payload.params);
    },
  },

  reducers: {},
};

export default Model;
