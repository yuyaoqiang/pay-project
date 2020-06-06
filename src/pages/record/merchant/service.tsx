import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static list(params) {
    return request.get('/merchant/findMerchantByPage', {
      params,
    });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static update(params) {
    return request.post('/merchant/updateMerchant', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static add(params) {
    return request.post('/merchant/addMerchant', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findAccountReceiveOrderChannelByAccountId(params) {
    return request.get('/gatheringChannel/findGatheringChannelRateByMerchantId', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static saveGatheringChannelRate(params) {
    return request.post('/gatheringChannel/saveGatheringChannelRate', {
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
    return request.post('/merchant/modifyLoginPwd', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static modifyMoneyPwd(params) {
    return request.post('/merchant/modifyMoneyPwd', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static adjustWithdrawableAmount(params) {
    return request.post('/merchant/adjustWithdrawableAmount', {
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
  static adjustInviteCodeQuota(params) {
    return request.post('/userAccount/adjustInviteCodeQuota', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static appointCodeBusinessmanReceiveOrder(params) {
    return request.post('/merchant/appointCodeBusinessmanReceiveOrder', {
      data: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findAllCodeBusinessman(params) {
    return request.get('/userAccount/findAllCodeBusinessman', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findMerchantAppointCodeBusinessmanByMerchantId(params) {
    return request.get('/merchant/findMerchantAppointCodeBusinessmanByMerchantId', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findVirtualWalletByUserAccountId(params) {
    return request.get('/virtualWallet/findVirtualWalletByUserAccountId', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findAllMerchantAgent(params) {
    return request.get('/merchant/findAllMerchantAgent', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static generateSecretKey(params) {
    return request.get('/merchant/generateSecretKey', {
      params,
    });
  }
}
export default Service;
