import _ from 'lodash';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
export const isJudge = function(flag: boolean) {
  return function(first: any, second: any) {
    if (flag) {
      return first;
    } else {
      return second;
    }
  };
};
// 获取store
export const getStore = () => {
  let win: any = window;
  return win.g_app._store.getState();
};
// 获取token
export const getToken = () => {
  const store = getStore();
  return _.get(store, 'user.currentUser.token');
};

// 按钮权限判断
export const checkPermission = menuType => {
  const store = getStore();
  const permissions = _.get(store, 'user.permissions.treeData');
  if (permissions) {
    return _.includes(permissions, menuType);
  }
  return false;
};

export const getTotal = (attr, list) => {
  const result = list.filter(item => {
    return item.type == attr;
  });
  return isJudge(result.length!==0)(result.length,0);
};
export const getList = (attr, list) => {
  const result = list.filter(item => {
    return item.type == attr;
  });
  return result;
};
