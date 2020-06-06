import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';
class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static get(params) {
    return request.get('/masterControl/getRechargeSetting', {
      params,
    });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static update(params) {
    return request.post('/masterControl/updateRechargeSetting', {
    params
    });
  }

}
export default Service;
