import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static list(params) {
    return request.get('/role/find-all', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static roleList(params) {
    return request.get('/role/account/find', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static accountAll(params) {
    return request.get('/role/account/all', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static add(params) {
    return request.post('/role/add', {
      data: params,
    });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static update(params) {
    return request.post('/role/update', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static delete(params) {
    return request.post('/role/delete', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static save(params) {
    return request.post('/role/permission/save', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static accountSave(params) {
    return request.post('/role/account/save', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static permission(params) {
    return request.get('masterControl/permission-description', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static find(params) {
    return request.get('/role/permission/find', {
      params,
    });
  }
}
export default Service;
