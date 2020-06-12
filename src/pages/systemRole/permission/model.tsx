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
  namespace: 'permission',

  state: initState,

  effects: {
    *list({ payload }, { call, put }) {
      return yield call(Serivce.list, payload.params);
    },
    *permission({ payload }, { call, put }) {
      return yield call(Serivce.permission, payload.params);
    },
    *add({ payload }, { call, put }) {
      return yield call(Serivce.add, payload.params);
    },
    *update({ payload }, { call, put }) {
      return yield call(Serivce.update, payload.params);
    },
    *del({ payload }, { call, put }) {
      return yield call(Serivce.delete, payload.params);
    },
    *save({ payload }, { call, put }) {
      return yield call(Serivce.save, payload.params);
    },
    *find({ payload }, { call, put }) {
      return yield call(Serivce.find, payload.params);
    },
  },

  reducers: {},
};

export default Model;
