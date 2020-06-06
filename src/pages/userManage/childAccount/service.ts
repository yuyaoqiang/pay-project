import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

const userUrl = constant.MUSER_V1;
const myPayUrl = constant.MPAY_V1;

class childAccountService {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static getChildAccountList(params) {
    return request.get(`${userUrl}/admin/subAcc/list`, { params });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static updateAccount(params) {
    return request.post(`${userUrl}/admin/subAcc/modify`, { data: params });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static delAccount(params) {
    return request.post(`${userUrl}/admin/subAcc/del`, { data: params });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static addAccount(params) {
    return request.post(`${userUrl}/admin/subAcc/add`, { data: params });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static getUserLevel(params) {
    return request.get(`${myPayUrl}/config/userLevelList`, { params });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static modifyUserLevel(params) {
    return request.post(`${userUrl}/admin/subAcc/level/modify`, { data: params });
  }
}
export default childAccountService;
