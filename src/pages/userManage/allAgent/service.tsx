import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

const muserUrl = constant.MUSER_V1;
class AllAgentService {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  async getAllAgentList(params) {
    return request.post(muserUrl + '/admin/agentManager', {
      data: params,
    });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  async addAllAgent(params) {
    return request.post(muserUrl + '/admin/agentManager/add', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  async updateAllAgent(params) {
    return request.post(muserUrl + '/admin/agentManager/update', {
      data: params,
    });
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  async getAllAgentDetails(params) {
    return request.post(muserUrl + '/admin/agentManager/details', {
      data: params,
    });
  }
}
export default new AllAgentService();
