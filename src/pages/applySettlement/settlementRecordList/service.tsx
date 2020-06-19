import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static list(params) {
    return request.get('/merchant/findMerchantSettlementRecordByPage', {
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
    return request.post('/userAccount/addBackgroundAccount', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static del(params) {
    return request.get('/userAccount/delUserAccount', {
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
  static getGoogleAuthInfo(params) {
    return request.get('/userAccount/getGoogleAuthInfo', {
     params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static generateGoogleSecretKey(params) {
    return request.get('/userAccount/generateGoogleSecretKey', {
     params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static bindGoogleAuth(params) {
    return request.post('/userAccount/bindGoogleAuth', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findAllLowerLevelAccount(params) {
    return request.post('/userAccount/findAllLowerLevelAccount', {
      data: params,
    });
  }
}
export default Service;
