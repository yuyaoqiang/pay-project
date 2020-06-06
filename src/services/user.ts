import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';
class UserService {
  //获取用户信息
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static getUserInfo(params) {
    return request.get('/userAccount/getUserAccountInfo', {
      params,
    });
  }
  // 登陆
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static fakeAccountLogin(params) {
    return request.post('/login', {
      params,
    });
  }
  // 登出
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static logout() {
    return request.get('/self/logout');
  }
}

export default UserService;
