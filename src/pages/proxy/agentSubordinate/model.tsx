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
  namespace: 'agentSubordinate',

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
    *generateSecretKey({ payload }, { call, put }) {
      return yield call(Serivce.generateSecretKey, payload.params);
    },
    *updatePwd({ payload }, { call, put }) {
      return yield call(Serivce.updatePwd, payload.params);
    },
    *modifyMoneyPwd({ payload }, { call, put }) {
      return yield call(Serivce.modifyMoneyPwd, payload.params);
    },
    *adjustCashDeposit({ payload }, { call, put }) {
      return yield call(Serivce.adjustCashDeposit, payload.params);
    },
    *saveGatheringChannelRate({ payload }, { call, put }) {
      return yield call(Serivce.saveGatheringChannelRate, payload.params);
    },
    *findBankCardByUserAccountId({ payload }, { call, put }) {
      return yield call(Serivce.findBankCardByUserAccountId, payload.params);
    },
    *findVirtualWalletByUserAccountId({ payload }, { call, put }) {
      return yield call(Serivce.findVirtualWalletByUserAccountId, payload.params);
    },
    *saveAccountReceiveOrderChannel({ payload }, { call, put }) {
      return yield call(Serivce.saveAccountReceiveOrderChannel, payload.params);
    },
    *findAllLowerLevelAccount({ payload }, { call, put }) {
      return yield call(Serivce.findAllLowerLevelAccount, payload.params);
    },
    *syncReceiveOrderChanne({ payload }, { call, put }) {
      return yield call(Serivce.syncReceiveOrderChanne, payload.params);
    },
    *findLowerLevelGatheringChannelRate({ payload }, { call, put }) {
      return yield call(Serivce.findLowerLevelGatheringChannelRate, payload.params);
    },
  },

  reducers: {},
};

export default Model;
