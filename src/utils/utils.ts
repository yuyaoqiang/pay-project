import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';
import { Route } from '@/models/connect';
import moment from 'moment';
import _ from 'lodash';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const getPageQuery = () => parse(window.location.href.split('?')[1]);
/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getAuthorityFromRouter = <T extends { path: string }>(
  router: T[] = [],
  pathname: string,
): T | undefined => {
  const authority = router.find(({ path }) => path && pathRegexp(path).exec(pathname));
  if (authority) return authority;
  return undefined;
};

export const getRouteAuthority = (path: string, routeData: Route[]) => {
  let authorities: string[] | string | undefined;
  routeData.forEach(route => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      }
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

// get Intersection Array
export const getIntersection = (origin: string, target: Array<any>) => {
  if (_.isEmpty(origin)) return [];
  const arr = _.sortBy(_.split(origin, ','), n => {
    return parseInt(n);
  });
  return arr.map(item => _.find(target, t => t.id === _.parseInt(item)));
};

// string Arrary to number Array
export const stringToNumberForArray = (origin: string) => {
  if (_.isEmpty(origin)) return [];
  const stringArray = _.split(origin, ',');
  return _.map(stringArray, _.parseInt);
};

// Array to  valueEnum Object 转为枚举
export const getValueEnum = (origin = [], cb) => {
  const valueEnum = {};
  const list = cb(origin);
  _.map(list, l => {
    valueEnum[l.type] = { text: l.name, status:l.status?'Success':'' };
  });
  return valueEnum;
};

// Array to  valueEnum Object 转为固定表单多选列表数据格式
export const translateArray = (origin = [], cb) => {
  const array = [];
  const list = cb(origin);
  _.map(list, l => {
    array.push({ type: l.type, name: l.name });
  });
  return array;
};

export const reportTimeHandle = timeArr => {
  let startDate = parseTime(timeArr[0], '{y}-{m}-{d}');
  let endDate = parseTime(timeArr[1], '{y}-{m}-{d}');
  startDate = startDate + ' ' + '00:00:00';
  endDate = endDate + ' ' + '00:00:00';

  const selfStartTime = moment(startDate)
    .startOf()
    .valueOf();
  const selfEndTime = moment(endDate)
    .startOf()
    .valueOf();
  return [selfStartTime + 43200000, selfEndTime + 129600000];
};

export function parseTime(time, cFormat) {
  if (time < 1) return null;
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value];
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return time_str;
}

export const balanceModify = function(value, num = 3) {
  if (!value) return '0.000';
  return parseFloat(value)
    .toFixed(num + 1)
    .slice(0, -1);
};

export const filterObj = (obj: object) => {
  const newObj = {};
  _.forEach(obj, (value, key) => {
    if (value !== '') {
      newObj[key] = value;
    }
  });
  return newObj;
};
