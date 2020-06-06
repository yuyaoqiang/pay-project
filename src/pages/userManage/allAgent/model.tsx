import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { AllAgentData } from './data.d';
import allAgentService from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: AllAgentData) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: AllAgentData;
  effects: any;
  reducers: {
    save: Reducer<AllAgentData>;
  };
}

const initState = {
  allAgentData: [],
};

const Model: ModelType = {
  namespace: 'allAgent',

  state: initState,

  effects: {
    *getAllAgentList({ payload }, { call, put }) {
      return yield call(allAgentService.getAllAgentList, payload.params);
    },
    *addAllAgent({ payload }, { call, put }) {
      return yield call(allAgentService.addAllAgent, payload.params);
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default Model;
