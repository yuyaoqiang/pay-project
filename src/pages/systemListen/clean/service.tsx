import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';
class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static update(params) {
    return request.post('/dataClean/dataClean', {
      data: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
    });
  }

}
export default Service;
