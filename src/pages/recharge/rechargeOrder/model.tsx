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
  namespace: 'rechargeOrder',

  state: initState,

  effects: {
    *list({ payload }, { call, put }) {
      return yield call(Serivce.list, payload.params);
    },
    *findAllPayChannel({ payload }, { call, put }) {
      return yield call(Serivce.findAllPayChannel, payload.params);
    },
    *findRechargeOrderById({ payload }, { call, put }) {
      return yield call(Serivce.findRechargeOrderById, payload.params);
    },
    *approval({ payload }, { call, put }) {
      return yield call(Serivce.approval, payload.params);
    },
  },

  reducers: {},
};

export default Model;
