import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

class Service {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static list(params) {
    return request.get('/merchant/findMerchantSettlementRecordByPage', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findChukanBankByPage(params) {
    return request.get('merchant/findChukanBankByPage', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static settlementApproved(params) {
    return request.get('/merchant/settlementApproved', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static settlementNotApproved(params) {
    return request.get('/merchant/settlementNotApproved', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static add(params) {
    return request.post('/merchant/addMerchant', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static del(params) {
    return request.get('/userAccount/delUserAccount', {
      params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static settlementConfirmCredited(params) {
    return request.get('/merchant/settlementConfirmCredited', {
      params,
    });
  }
}
export default Service;
