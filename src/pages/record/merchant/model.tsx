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
  namespace: 'merchant',

  state: initState,

  effects: {
    *list({ payload }, { call, put }) {
      return yield call(Serivce.list, payload.params);
    },
    *add({ payload }, { call, put }) {
      return yield call(Serivce.add, payload.params);
    },
    *update({ payload }, { call, put }) {
      return yield call(Serivce.update, payload.params);
    },
    *del({ payload }, { call, put }) {
      return yield call(Serivce.del, payload.params);
    },
    *updatePwd({ payload }, { call, put }) {
      return yield call(Serivce.updatePwd, payload.params);
    },
    *modifyMoneyPwd({ payload }, { call, put }) {
      return yield call(Serivce.modifyMoneyPwd, payload.params);
    },
    *adjustWithdrawableAmount({ payload }, { call, put }) {
      return yield call(Serivce.adjustWithdrawableAmount, payload.params);
    },
    *adjustInviteCodeQuota({ payload }, { call, put }) {
      return yield call(Serivce.adjustInviteCodeQuota, payload.params);
    },
    *appointCodeBusinessmanReceiveOrder({ payload }, { call, put }) {
      return yield call(Serivce.appointCodeBusinessmanReceiveOrder, payload.params);
    },
    *findAccountReceiveOrderChannelByAccountId({ payload }, { call, put }) {
      return yield call(Serivce.findAccountReceiveOrderChannelByAccountId, payload.params);
    },
    *findAllCodeBusinessman({ payload }, { call, put }) {
      return yield call(Serivce.findAllCodeBusinessman, payload.params);
    },
    *findMerchantAppointCodeBusinessmanByMerchantId({ payload }, { call, put }) {
      return yield call(Serivce.findMerchantAppointCodeBusinessmanByMerchantId, payload.params);
    },
    *findVirtualWalletByUserAccountId({ payload }, { call, put }) {
      return yield call(Serivce.findVirtualWalletByUserAccountId, payload.params);
    },
    *saveGatheringChannelRate({ payload }, { call, put }) {
      return yield call(Serivce.saveGatheringChannelRate, payload.params);
    },
    *findAllLowerLevelAccount({ payload }, { call, put }) {
      return yield call(Serivce.findAllLowerLevelAccount, payload.params);
    },
    *syncReceiveOrderChanne({ payload }, { call, put }) {
      return yield call(Serivce.syncReceiveOrderChanne, payload.params);
    },
    *findAllMerchantAgent({ payload }, { call, put }) {
      return yield call(Serivce.findAllMerchantAgent, payload.params);
    },
    *generateSecretKey({ payload }, { call, put }) {
      return yield call(Serivce.generateSecretKey, payload.params);
    },
  },

  reducers: {},
};

export default Model;
