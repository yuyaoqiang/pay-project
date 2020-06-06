import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static list(params) {
    return request.get('/recharge/findAllPayType', {
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
  static delPayChannelById(params) {
    return request.get('recharge/delPayChannelById', {
      params,
    });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static approval(params) {
    return request.post('/recharge/approval', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static addOrUpdatePayChannel(params) {
    return request.post('/recharge/addOrUpdatePayChannel', {
      data: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
  }
}
export default Service;
