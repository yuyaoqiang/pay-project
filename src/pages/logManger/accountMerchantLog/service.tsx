import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static list(params) {
    return request.get('/merchant/findAccountChangeLogByPage', {
      params,
    });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static update(params) {
    return request.post('/gatheringChannel/addOrUpdateGatheringChannel', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static add(params) {
    return request.post('/gatheringChannel/addOrUpdateGatheringChannel', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static del(params) {
    return request.get('/gatheringChannel/delGatheringChannelById', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static exportExcel(params) {
    return request.get('/userAccount/accountChangeLogExportExcel', {
      params,
      headers: {
        responseType: 'arraybuffer',
      },
    });
  }
}
export default Service;
