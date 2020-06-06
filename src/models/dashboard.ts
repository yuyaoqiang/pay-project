import { Effect } from 'dva';
import { Reducer } from 'redux';
import router from 'umi/router';
import { UserService } from '@/services';
import { routers, permission } from '@/utils';

export interface DashboardModelState {}

export interface DashboardModelType {
  namespace: 'dashboard';
  state: any;
  effects: {
    getTotalState: Effect;
    getTimelineStat: Effect;
    getTerminal: Effect;
  };
  reducers: {
    saveTotalState: Reducer<DashboardModelState>;
    saveTimelineStat: Reducer<DashboardModelState>;
    saveTerminal: Reducer<DashboardModelState>;
  };
}

const UserModel: DashboardModelType = {
  namespace: 'dashboard',
  state: {
    currentUser: {},
    permissionsFiltered: [],
  },

  effects: {
    *getTotalState({ payload }, { call, put }) {
      const response = yield call(UserService.fakeAccountLogin, payload);
      if (response.code === 200) {
        const permissions = response.result.perms;
        const permissionsFiltered = permission.filterPermiss(routers, permissions);
        yield put({
          type: 'saveCurrentUser',
          payload: { result: response.result, permissionsFiltered },
        });
        router.push('/welcome');
      }
    },
    *getTimelineStat({ payload }, { call, put }) {
      const response = yield call(UserService.fakeAccountLogin, payload);
      if (response.code === 200) {
        const permissions = response.result.perms;
        const permissionsFiltered = permission.filterPermiss(routers, permissions);
        yield put({
          type: 'saveCurrentUser',
          payload: { result: response.result, permissionsFiltered },
        });
        router.push('/welcome');
      }
    },
    *getTerminal({ payload }, { call, put }) {
      const response = yield call(UserService.fakeAccountLogin, payload);
      if (response.code === 200) {
        const permissions = response.result.perms;
        const permissionsFiltered = permission.filterPermiss(routers, permissions);
        yield put({
          type: 'saveCurrentUser',
          payload: { result: response.result, permissionsFiltered },
        });
        router.push('/welcome');
      }
    },
  },

  reducers: {
    saveTotalState(state, action) {
      return {
        ...state,
        currentUser: action.payload.result || {},
      };
    },
    saveTimelineStat(state, action) {
      return {
        ...state,
        currentUser: action.payload.result || {},
        permissionsFiltered: action.payload.permissionsFiltered,
      };
    },
    saveTerminal(state, action) {
      return {
        ...state,
        currentUser: action.payload.result || {},
        permissionsFiltered: action.payload.permissionsFiltered,
      };
    },
  },
};

export default UserModel;
