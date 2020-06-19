import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static list(params) {
    return request.get('/gatheringCode/findGatheringCodeByPage', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static del(params) {
    return request.get('/gatheringCode/delGatheringCodeById', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static changeNormal(params) {
    return request.get('/gatheringCode/updateToNormalState', {
      params,
    });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static update(params) {
    return request.get('/gatheringCode/updateInUseFlag', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static updateToNormalState(params) {
    return request.get('/gatheringCode/updateToNormalState', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static delGatheringCodeById(params) {
    return request.get('/gatheringCode/delGatheringCodeById', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static restoreGatheringCodeById(params) {
    return request.get('/gatheringCode/restoreGatheringCodeById', {
      params,
    });
  }
}
export default Service;
