import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

const muserUrl = constant.MUSER_V1;
class DashBoardService {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  async getTotalStat(params: object) {
    return request.get(muserUrl + '/dashboard/totalStat', {
      data: params,
    },);
  }
}
export default new DashBoardService();
