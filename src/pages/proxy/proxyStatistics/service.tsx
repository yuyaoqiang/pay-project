import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static list(params) {
    return request.get('/statisticalAnalysis/findLowerMerchantTradeReport', {
      params,
    });
  }
}
export default Service;
