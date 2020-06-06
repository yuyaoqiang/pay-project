import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static list(params) {
    return request.get('/userAccount/findAgentByPage', {
      params,
    });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static update(params) {
    return request.post('/userAccount/updateUserAccount', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static add(params) {
    return request.post('/userAccount/addAgent', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findAccountReceiveOrderChannelByAccountId(params) {
    return request.get('/userAccount/findAccountReceiveOrderChannelByAccountId', {
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
    return request.post('/userAccount/modifyLoginPwd', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static modifyMoneyPwd(params) {
    return request.post('/userAccount/modifyMoneyPwd', {
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
  static adjustInviteCodeQuota(params) {
    return request.post('/userAccount/adjustInviteCodeQuota', {
      data: params,
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
