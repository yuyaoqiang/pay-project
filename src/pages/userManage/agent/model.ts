import { AnyAction, Reducer } from 'redux';
import { EffectsCommandMap } from 'dva';
import service from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: any) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: {};
  effects: {
    [rondom: string]: Effect;
  };
  reducers: {
    [rondom: string]: Reducer<any>;
  };
}

const initState = {};

const Model: ModelType = {
  namespace: 'agent',
  state: initState,
  effects: {
    *getAgentList({ payload }, { call }) {
      return yield call(service.getAgentList, payload.params);
    },
    *addAgent({ payload }, { call }) {
      return yield call(service.addAgent, payload.params);
    },
    *getAgentDetail({ payload }, { call }) {
      return yield call(service.getAgentDetail, payload.params);
    },
    *modifyAgent({ payload }, { call }) {
      return yield call(service.modifyAgent, payload.params);
    },
  },
  reducers: {},
};
export default Model;
