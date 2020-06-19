import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';
class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static get(params) {
    return request.get('/merchant/findMerchantSettlementRecordByPage', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static getBank(params) {
    return request.get('/merchant/findMerchantBankCardByMerchantId', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static getGoogleAuthInfo(params) {
    return request.get('/merchant/getGoogleAuthInfo', {
     params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static generateGoogleSecretKey(params) {
    return request.get('/merchant/generateGoogleSecretKey', {
     params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static bindGoogleAuth(params) {
    return request.post('/merchant/bindGoogleAuth', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static update(params) {
    return request.post('/merchant/applySettlement', {
    params
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static updatePwd(params) {
    return request.post('/merchant/modifyLoginPwd', {
    params
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static modifyMoneyPwd1(params) {
    return request.post('/merchant/modifyMoneyPwd', {
    params
    });
  }
}
export default Service;
