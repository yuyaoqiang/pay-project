import React from 'react';
import { DatePicker, Radio } from 'antd';
import moment from 'moment';
import * as dateUtils from '@/utils/dateUtils';
const { RangePicker } = DatePicker;

/**
 * 时间日期公共组件,各种时间选择，限制范围等！
 */

const disabledDate = current => current && current > moment().endOf('day');
const disabledOneYearsDate = current =>
  (current && current > moment().endOf('day')) || current < moment().subtract(12, 'months');

// 日期快捷选择
export const OptDateComponent = props => {
  const { self, changeDateType, dateRange } = props;
  const onChange = ele => {
    const hasRadio = ele.target.value;
    let date = [];
    switch (hasRadio) {
      case 'today':
        date = dateUtils.today_date_range();
        break;
      case 'yestertody':
        date = dateUtils.yesterday_date_range();
        break;
      case 'month':
        date = dateUtils.moth_date_range();
        break;
      case 'last_month':
        date = dateUtils.last_moth_date_range();
        break;
    }
    self.onChange(hasRadio);
    changeDateType({ hasRadio, date });
  };
  if (!dateRange.hasRadio) {
    self.value = dateRange.hasRodio;
  }
  return (
    <Radio.Group value={self.value} buttonStyle="solid" onChange={onChange}>
      <Radio.Button value="today">今日</Radio.Button>
      <Radio.Button value="yestertody">昨日</Radio.Button>
      <Radio.Button value="month">本月</Radio.Button>
      <Radio.Button value="last_month">上月</Radio.Button>
    </Radio.Group>
  );
};

// 日期快捷选择
export const FasterOptDateComponent = props => {
  const { self, dateRange, changeDateType } = props;
  if (dateRange.hasRadio) {
    self.value = dateRange.date;
  }
  return (
    <RangePicker
      value={self.value}
      disabledDate={disabledDate}
      onChange={date => {
        changeDateType({ hasRadio: '', date });
        self.onChange(date);
      }}
    />
  );
};

// 只能选择当前日期及当前日期之前的
export const BeforeCurrentDateComponent = props => {
  const { self } = props;
  return (
    <RangePicker
      value={self.value}
      disabledDate={disabledDate}
      onChange={date => {
        self.onChange(date);
      }}
    />
  );
};

// 选择所有时间
export const AllDateComponent = props => {
  const { self } = props;
  return (
    <RangePicker
      value={self.value}
      onChange={date => {
        self.onChange(date);
      }}
    />
  );
};

// 最多选择当前时间之前的1年时间
export const OneYearsDateComponent = props => {
  const { self } = props;
  return (
    <RangePicker
      value={self.value}
      disabledDate={disabledOneYearsDate}
      onChange={date => {
        self.onChange(date);
      }}
    />
  );
};
