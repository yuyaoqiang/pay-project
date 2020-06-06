import { Effect } from 'dva';
import { Reducer } from 'redux';
import { CommonService } from '@/services';

interface SysSetting {
  appUrl: string;
  backgroundLoginGoogleAuth: boolean;
  currencyUnit: string;
  homePageUrl: string;
  id: string;
  latelyUpdateTime: string;
  localStoragePath: string;
  loginCaptchaFlag: boolean;
  memberMeEnabled: boolean;
  merchantLoginGoogleAuth: boolean;
  payTechnicalSupport: string;
  showRankingListFlag: boolean;
  singleDeviceLoginFlag: boolean;
  websiteTitle: string;
}
export interface CommonModelType {
  namespace: 'common';
  state: {
    sysSetting: SysSetting[]; // 系统参数
    merchantList: any[]; // 商户列表
    gatheringChannel: any[]; // 通道
    gatheringCode: any[]; // 收款方式
    orderState: any[]; // 订单状态
    payNoticeState: any[]; // 通知状态
    orderConfirmWay: any[]; //
    merchantAccountType:any[] // 商户类型
    accountChangeType:any[] // 日记账变类型
  };
  effects: {
    [rondom: string]: Effect;
  };
  reducers: {
    [rondom: string]: Reducer;
  };
}

const initState = {
  sysSetting: [], // 系统设置参数
  merchantList: [], // 商户列表
  gatheringChannel: [], // 通道
  gatheringCode: [], // 收款方式
  orderState: [], // 订单状态
  payNoticeState: [], // 通知状态
  orderConfirmWay: [], // 确认方式
  merchantAccountType:[], //商户类型
  MerchantSettlementState:[], //商户结算状态
  appealType:[], // 申述状态
  appealProcessWay:[], // 申述方式
  appealState:[], // 处理方式
  gatheringCodeState:[], // 收款方式-状态
  accountChangeType:[],
  merchantAccountChangeType:[],
  loginState:[],
  rechargeOrderState:[],
  withdrawRecordState:[],
  payCategory:[],
};
/**
 * 通用数据存储中心
 */
const CommonModel: CommonModelType = {
  namespace: 'common',
  state: initState,

  effects: {
    *getSystemSetting({ payload }, { call, put }) {
      const response = yield call(CommonService.getSystemSetting);
      yield put({
        type: 'saveSystemSetting',
        payload: response.data,
      });
      return response;
    },
    *getMerchantList({ payload }, { call, put }) {
      const response = yield call(CommonService.getMerchantList);
      yield put({
        type: 'saveMerchantList',
        payload: response.data,
      });
      return response;
    },
    *gatheringChannel({ payload }, { call, put }) {
      const response = yield call(CommonService.findAllGatheringChannel);
      yield put({
        type: 'saveGatheringChannel',
        payload: response.data,
      });
      return response;
    },
    *gatheringCode({ payload }, { call, put }) {
      const response = yield call(CommonService.findAllGatheringCode);
      yield put({
        type: 'saveGatheringCode',
        payload: response.data,
      });
      return response;
    },
    *getOrderState({ payload }, { call, put }) {
      const response = yield call(CommonService.findMerchantOrderState);
      yield put({
        type: 'saveOrderState',
        payload: response.data,
      });
      return response;
    },
    *findMerchantOrderPayNoticeState({ payload }, { call, put }) {
      const response = yield call(CommonService.findMerchantOrderPayNoticeState);
      yield put({
        type: 'saveNoticeState',
        payload: response.data,
      });
      return response;
    },
    *findMerchantOrderConfirmWay({ payload }, { call, put }) {
      const response = yield call(CommonService.findMerchantOrderConfirmWay);
      yield put({
        type: 'saveOrderConfirmWay',
        payload: response.data,
      });
      return response;
    },
    *findMerchantAccountType({ payload }, { call, put }) {
      const response = yield call(CommonService.findMerchantAccountType);
      yield put({
        type: 'saveMerchantAccountType',
        payload: response.data,
      });
      return response;
    },
    *findMerchantSettlementState({ payload }, { call, put }) {
      const response = yield call(CommonService.findMerchantSettlementState);
      yield put({
        type: 'saveMerchantSettlementState',
        payload: response.data,
      });
      return response;
    },
    *findAppealType({ payload }, { call, put }) {
      const response = yield call(CommonService.findAppealType);
      yield put({
        type: 'saveAppealType',
        payload: response.data,
      });
      return response;
    },
    *findAppealProcessWay({ payload }, { call, put }) {
      const response = yield call(CommonService.findAppealProcessWay);
      yield put({
        type: 'saveAppealProcessWay',
        payload: response.data,
      });
      return response;
    },
    *findAppealState({ payload }, { call, put }) {
      const response = yield call(CommonService.findAppealState);
      yield put({
        type: 'saveAppealState',
        payload: response.data,
      });
      return response;
    },
    *findGatheringCodeState({ payload }, { call, put }) {
      const response = yield call(CommonService.findGatheringCodeState);
      yield put({
        type: 'saveGatheringCodeState',
        payload: response.data,
      });
      return response;
    },
    *findaccountChangeType({ payload }, { call, put }) {
      const response = yield call(CommonService.findaccountChangeType);
      yield put({
        type: 'saveAccountChangeType',
        payload: response.data,
      });
      return response;
    },
    *findMerchantAccountChangeType({ payload }, { call, put }) {
      const response = yield call(CommonService.findMerchantAccountChangeType);
      yield put({
        type: 'saveMerchantAccountChangeType',
        payload: response.data,
      });
      return response;
    },
    *findLoginState({ payload }, { call, put }) {
      const response = yield call(CommonService.findLoginState);
      yield put({
        type: 'saveLoginState',
        payload: response.data,
      });
      return response;
    },
    *findRechargeOrderState({ payload }, { call, put }) {
      const response = yield call(CommonService.findRechargeOrderState);
      yield put({
        type: 'saveRechargeOrderState',
        payload: response.data,
      });
      return response;
    },
    *findWithdrawRecordState({ payload }, { call, put }) {
      const response = yield call(CommonService.findWithdrawRecordState);
      yield put({
        type: 'saveWithdrawRecordState',
        payload: response.data,
      });
      return response;
    },
    *findPayCategory({ payload }, { call, put }) {
      const response = yield call(CommonService.findPayCategory);
      yield put({
        type: 'savePayCategory',
        payload: response.data,
      });
      return response;
    },
  },

  reducers: {
    saveSystemSetting(state, action) {
      return {
        ...state,
        sysSetting: action.payload,
      };
    },
    saveMerchantList(state, action) {
      return {
        ...state,
        merchantList: action.payload,
      };
    },
    saveGatheringChannel(state, action) {
      return {
        ...state,
        gatheringChannel: action.payload,
      };
    },
    saveGatheringCode(state, action) {
      return {
        ...state,
        gatheringCode: action.payload,
      };
    },
    saveOrderState(state, action) {
      return {
        ...state,
        orderState: action.payload,
      };
    },
    saveNoticeState(state, action) {
      return {
        ...state,
        payNoticeState: action.payload,
      };
    },
    saveOrderConfirmWay(state, action) {
      return {
        ...state,
        orderConfirmWay: action.payload,
      };
    },
    saveMerchantAccountType(state, action) {
      return {
        ...state,
        merchantAccountType: action.payload,
      };
    },
    saveMerchantSettlementState(state, action) {
      return {
        ...state,
        merchantSettlementState: action.payload,
      };
    },
    saveAppealState(state, action) {
      return {
        ...state,
        appealState: action.payload,
      };
    },
    saveAppealProcessWay(state, action) {
      return {
        ...state,
        appealProcessWay: action.payload,
      };
    },
    saveAppealType(state, action) {
      return {
        ...state,
        appealType: action.payload,
      };
    },
    saveGatheringCodeState(state, action) {
      return {
        ...state,
        gatheringCodeState: action.payload,
      };
    },
    saveAccountChangeType(state, action) {
      return {
        ...state,
        accountChangeType: action.payload,
      };
    },
    saveMerchantAccountChangeType(state, action) {
      return {
        ...state,
        merchantAccountChangeType: action.payload,
      };
    },
    saveLoginState(state, action) {
      return {
        ...state,
        loginState: action.payload,
      };
    },
    saveRechargeOrderState(state, action) {
      return {
        ...state,
        rechargeOrderState: action.payload,
      };
    },
    saveWithdrawRecordState(state, action) {
      return {
        ...state,
        withdrawRecordState: action.payload,
      };
    },
    savePayCategory(state, action) {
      return {
        ...state,
        payCategory: action.payload,
      };
    },
  },
};

export default CommonModel;
