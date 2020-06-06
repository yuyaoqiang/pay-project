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
  namespace: 'rechargeChannel',

  state: initState,

  effects: {
    *list({ payload }, { call, put }) {
      return yield call(Serivce.list, payload.params);
    },
    *findAllPayChannel({ payload }, { call, put }) {
      return yield call(Serivce.findAllPayChannel, payload.params);
    },
    *delPayChannelById({ payload }, { call, put }) {
      return yield call(Serivce.delPayChannelById, payload.params);
    },
    *approval({ payload }, { call, put }) {
      return yield call(Serivce.approval, payload.params);
    },
    *addOrUpdatePayChannel({ payload }, { call, put }) {
      return yield call(Serivce.addOrUpdatePayChannel, payload.params);
    },
  },

  reducers: {},
};

export default Model;
