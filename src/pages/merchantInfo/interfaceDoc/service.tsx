import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';
class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static downloadInterfaceDoc(params) {
    return request.get('/merchant/downloadInterfaceDoc', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static downloadInterfaceDemo(params) {
    return request.get('/merchant/downloadInterfaceDemo', {
      params
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static update(params) {
    return request.post('/merchant/applySettlement', {
    params
    });
  }

}
export default Service;
