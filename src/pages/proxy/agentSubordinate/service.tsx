import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static list(params) {
    return request.get('/merchant/findMerchantByPageWithInviter', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static generateSecretKey(params) {
    return request.get('/merchant/generateSecretKey', {
      params,
    });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static update(params) {
    return request.post('/merchant/updateLowerLevelMerchant', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static add(params) {
    return request.post('/merchant/addLowerLevelMerchant', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findLowerLevelGatheringChannelRate(params) {
    return request.get('/gatheringChannel/findLowerLevelGatheringChannelRate', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static saveAccountReceiveOrderChannel(params) {
    return request.post('/userAccount/saveAccountReceiveOrderChannel', {
      data: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static del(params) {
    return request.get('/userAccount/delUserAccount', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static syncReceiveOrderChanne(params) {
    return request.get('/userAccount/syncReceiveOrderChanne', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static updatePwd(params) {
    return request.post('/merchant/modifyLowerLevelLoginPwd', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static modifyMoneyPwd(params) {
    return request.post('/merchant/modifyLowerLevelMoneyPwd', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static adjustCashDeposit(params) {
    return request.post('/userAccount/adjustCashDeposit', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findAllLowerLevelAccount(params) {
    return request.post('/userAccount/findAllLowerLevelAccount', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static saveGatheringChannelRate(params) {
    return request.post('/gatheringChannel/saveLowerLevelGatheringChannelRate', {
      data: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findBankCardByUserAccountId(params) {
    return request.get('/bankCard/findBankCardByUserAccountId', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findVirtualWalletByUserAccountId(params) {
    return request.get('/virtualWallet/findVirtualWalletByUserAccountId', {
      params,
    });
  }
}
export default Service;
