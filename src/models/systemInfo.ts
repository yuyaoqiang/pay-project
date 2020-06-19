import { Effect } from 'dva';
import { Reducer } from 'redux';
import { SystemInfoService } from '@/services';
import _ from "lodash";
export interface SystemInfoModelState {
  message: object;
}
export interface SystemInfoModelType {
  namespace: 'systemInfo';
  state: SystemInfoModelState;
  effects: {
    upload: Effect;
  };
  reducers: {
    saveSystemMessage: Reducer;
  };
}

const SystemInfoModel: SystemInfoModelType = {
  namespace: 'systemInfo',
  state: {
    message: [],
  },

  effects: {
    *upload({ payload }, { call, put }) {
      return yield call(SystemInfoService.upload, payload);
    },
  },

  reducers: {
    saveSystemMessage(state, action) {
      return {
        ...state,
        message: action.payload,
      };
    },
  },
};

export default SystemInfoModel;
