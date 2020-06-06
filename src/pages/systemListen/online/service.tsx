import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static list(params) {
    return request.get('/loginLog/findOnlineAccountByPage', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static loginOut(params) {
    return request.get('/loginLog/logout', {
      params,
    });
  }
}
export default Service;
