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
  namespace: 'clean',

  state: initState,

  effects: {
    *update({ payload }, { call, put }) {
      return yield call(Service.update, payload.params);
    },
  },

  reducers: {},
};

export default Model;
