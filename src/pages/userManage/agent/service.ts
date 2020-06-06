import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';

const userUrl = constant.MUSER_V1;

class AgentService {
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static getAgentList(params) {
    return request.get(`${userUrl}/admin/agent`, { params });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static addAgent(params) {
    return request.post(`${userUrl}/admin/agent/add`, { data: params });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static modifyAgent(params) {
    return request.post(`${userUrl}/admin/agent/modify`, { data: params });
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static getAgentDetail(params) {
    return request.post(`${userUrl}/admin/agent/details`, { data: params });
  }
}
export default AgentService;
