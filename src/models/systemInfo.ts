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
    getSystemMessage: Effect;
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
    *getSystemMessage({ payload }, { call, put }) {
      const response = yield call(SystemInfoService.getSystemMessage);
      let list=[]
      _.forEach(response.data, function(value, key) {
        value.content.map(item=>{
          item.type=key
          list.push(item)
        })
      });
      yield put({
        type: 'saveSystemMessage',
        payload: list,
      });
    },

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
