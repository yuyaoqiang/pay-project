import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';
class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static get(params) {
    return request.get('/masterControl/getCustomerQrcodeSetting', {
      params,
    });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static update(params) {
    return request.post('/masterControl/updateCustomerQrcodeSetting', {
    params
    });
  }

}
export default Service;
