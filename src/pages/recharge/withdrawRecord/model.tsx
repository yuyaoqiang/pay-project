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
  namespace: 'withdrawRecord',

  state: initState,

  effects: {
    *list({ payload }, { call, put }) {
      return yield call(Serivce.list, payload.params);
    },
    *confirmCredited({ payload }, { call, put }) {
      return yield call(Serivce.confirmCredited, payload.params);
    },
    *notApproved({ payload }, { call, put }) {
      return yield call(Serivce.notApproved, payload.params);
    },
    *approved({ payload }, { call, put }) {
      return yield call(Serivce.approved, payload.params);
    },
  },

  reducers: {},
};

export default Model;
