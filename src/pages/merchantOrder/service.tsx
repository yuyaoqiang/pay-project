import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

const muserUrl = constant.MUSER_V1;
class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static list(params) {
    return request.get('/merchantOrder/findMerchantOrderByPage', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static confirmToPaid(params) {
    return request.get('/merchantOrder/confirmToPaid', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static cancelOrderRefund(params) {
    return request.get('/merchantOrder/cancelOrderRefund', {
      params,
    });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static resendNotice(params) {
    return request.get('/merchantOrder/resendNotice', {
      params,
    })
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static supplementOrder(params) {
    return request.post('/merchantOrder/supplementOrder', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static updateNote(params) {
    return request.post('/merchantOrder/updateNote', {
      data: params,
    });
  }

}
export default Service;
