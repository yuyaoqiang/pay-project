import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static list(params) {
    return request.get('/recharge/findRechargeOrderByPage', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findRechargeOrderById(params) {
    return request.get('/recharge/findRechargeOrderById', {
      params,
    });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findAllPayChannel(params) {
    return request.get('/recharge/findAllPayChannel', {
      params,
    });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static approval(params) {
    return request.post('/recharge/approval', {
      data: params,
    });
  }
}
export default Service;
