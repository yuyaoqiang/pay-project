import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static list(params) {
    return request.get('recharge/findAllPayType', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static del(params) {
    return request.get('/recharge/delPayTypeById', {
      params,
    });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static add(params) {
    return request.post('/recharge/addOrUpdatePayType', {
      data: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
  }
}
export default Service;
