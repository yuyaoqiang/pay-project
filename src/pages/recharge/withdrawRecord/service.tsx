import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static list(params) {
    return request.get('/withdraw/findWithdrawRecordByPage', {
      params,
    });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static confirmCredited(params) {
    return request.get('/withdraw/confirmCredited', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static notApproved(params) {
    return request.get('/withdraw/notApproved', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static approved(params) {
    return request.get('/withdraw/approved', {
      params,
    });
  }
}
export default Service;
