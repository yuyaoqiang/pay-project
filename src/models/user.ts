import { Effect } from 'dva';
import { Reducer } from 'redux';
import { getPageQuery } from '@/utils/utils';
import router from 'umi/router';
import { UserService } from '@/services';
import { helpers, routers } from '@/utils';
export interface CurrentUser {
  [rondom: string]: any;
}
export interface permissions {
  [rondom: string]: any;
}

export interface UserModelState {
  accountType: string;
  accountTypeName: string;
  cashDeposit: number;
  id: string;
  inviteCodeQuota: number;
  mobile: string;
  realName: string;
  rebate: string;
  receiveOrderState: number;
  secretKey: string;
  userName: string;
  permissions: [];
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    login: Effect;
    logout: Effect;
    getUserInfo: Effect;
    getPermissions: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    clearCurrentUser: Reducer<UserModelState>;
    saveSystemMessage: Reducer<UserModelState>;
    savePermissions: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    accountType: '',
    accountTypeName: '',
    cashDeposit: undefined,
    id: undefined,
    inviteCodeQuota: undefined,
    mobile: '',
    realName: '',
    rebate: '',
    receiveOrderState: undefined,
    secretKey: '',
    userName: '',
    permissions: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(UserService.fakeAccountLogin, payload);
      if (response.code === 200) {
        yield put({ type: 'getPermissions', payload: {} });
        const resp = yield put({ type: 'getUserInfo', payload: {} });
        resp
          .then(res => {
            router.push('/dashboard');
          })
          .catch(e => {
            const { redirect } = getPageQuery();
            if (window.location.pathname !== '/user/login' && !redirect) {
              localStorage.removeItem('persist:root');
              router.push('/user/login');
            }
          });
      }
    },

    *logout({}, { call, put }) {
      const { redirect } = getPageQuery();
      yield put({ type: 'clearCurrentUser' });
      if (window.location.pathname !== '/user/login' && !redirect) {
        router.push('/user/login');
        localStorage.removeItem('persist:root');
      }
    },

    *getUserInfo({ payload }, { call, put }) {
      const response = yield call(UserService.getUserInfo, payload);
      yield put({
        type: 'saveCurrentUser',
        payload: { result: response.data },
      });
      return response;
    },
    *getPermissions({ payload }, { call, put }) {
      const response = yield call(UserService.getPermissions, payload);
      yield put({
        type: 'savePermissions',
        payload: { result: response.data },
      });
      return response;
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        ...action.payload.result,
      };
    },
    saveSystemMessage(state, action) {
      return {
        ...state,
        systemMessage: action.payload,
      };
    },
    savePermissions(state, action) {
      return {
        ...state,
        permissions: action.payload.result,
      };
    },
    clearCurrentUser() {
      return {
        accountType: '',
        accountTypeName: '',
        cashDeposit: undefined,
        id: undefined,
        inviteCodeQuota: undefined,
        mobile: '',
        realName: '',
        rebate: '',
        receiveOrderState: undefined,
        secretKey: '',
        userName: '',
        permissions: [],
      };
    },
  },
};

export default UserModel;
