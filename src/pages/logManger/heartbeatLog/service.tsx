import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static list(params) {
    return request.get('/monitoringAppHeartbeatLog/findMonitoringAppHeartbeatLogByPage', {
      params,
    });
  }
}
export default Service;
