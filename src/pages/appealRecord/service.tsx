import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static list(params) {
    return request.get('/appeal/findAppealByPage', {
      params,
    });
  }
  static alterToActualPayAmount(params) {
    return request.get('/appeal/alterToActualPayAmount', {
      params,
    });
  }
  static cancelOrder(params) {
    return request.get('/appeal/cancelOrder', {
      params,
    });
  }
  static confirmToPaid(params) {
    return request.get('/appeal/confirmToPaid', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static add(params) {
    return request.post('/merchant/addMerchant', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static del(params) {
    return request.get('/userAccount/delUserAccount', {
      params,
    });
  }
}
export default Service;
