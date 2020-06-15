import { extend } from 'umi-request';
import connect from 'dva';
import { message } from 'antd';
import { helpers, constant } from './index';
import router from 'umi/router';
import moment from 'moment';


const request = extend({
  prefix: helpers.isJudge(ENVIRONMENT === 'dev')('/api/', '/api/'),
  // prefix: '/api/',
  timeout: 12000,
  credentials: 'include',
});

// 请求前拦截增加token
request.interceptors.request.use((url, options) => {
  return {
    url,
    options: {
      ...options,
      headers: {
        ...options.headers,
        credentials:document.cookie,
      },
    },
  };
});

// 错误统一处理
request.interceptors.response.use(async response => {
  const data = await response.clone().json();
  if (data && data.code === 200) {
    return response;
  }
  if (data && data.code === 400) {
    debugger
    message.error(data.msg);
    return Promise.reject(response);
  }
  if (data && data.code === 403) {
    message.error('请求发生未知错误!');
    return Promise.reject(response);
  }
  if (data && data.code === 500) {
    return Promise.reject(response);
  }
  if (data && data.code === 999) {
    message.error(data.msg);
    router.push("/user/login")
    return Promise.reject(response);
  }
  message.error(data.message);
  return Promise.reject(response);
});

request.use(async (ctx, next) => {
  const { req } = ctx;
  req.options.requestType='form';
  const { dateRange, ...rest } = req.options.params as any;
  // 转换时间范围
  if (dateRange && dateRange.length > 0) {
    const [start_time, end_time] = dateRange;
    const params = {
      ...rest,
      submitStartTime: moment(start_time).format(constant.YYYY_MM_DD),
      submitEndTime: moment(end_time).format(constant.YYYY_MM_DD),
    };
    req.options.params = params;
  }

  await next();

  const { res } = ctx;
  if (res.code == 200 && res.data &&  res.data.content) {
    res.data.data = res.data.content;
    return ctx;
  }
  return ctx;
});
export default request;
