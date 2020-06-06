import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static list(params) {
    return request.get('/dictconfig/findDictTypeByPage', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static del(params) {
    return request.get('/systemNotice/delSystemNoticeById', {
      params,
    });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static add(params) {
    return request.post('/dictconfig/addOrUpdateDictType', {
      data:params,
    });
  }
}
export default Service;
