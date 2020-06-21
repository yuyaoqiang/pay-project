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
  namespace: 'codeDel',

  state: initState,

  effects: {
    *list({ payload }, { call, put }) {
      return yield call(Serivce.list, payload.params);
    },
    *update({ payload }, { call, put }) {
      return yield call(Serivce.update, payload.params);
    },
    *updateToNormalState({ payload }, { call, put }) {
      return yield call(Serivce.updateToNormalState, payload.params);
    },
    *delGatheringCodeById({ payload }, { call, put }) {
      return yield call(Serivce.delGatheringCodeById, payload.params);
    },
    *del({ payload }, { call, put }) {
      return yield call(Serivce.del, payload.params);
    },
    *restoreGatheringCodeById({ payload }, { call, put }) {
      return yield call(Serivce.restoreGatheringCodeById, payload.params);
    },
    *changeNormal({ payload }, { call, put }) {
      return yield call(Serivce.changeNormal, payload.params);
    },
  },

  reducers: {},
};

export default Model;
