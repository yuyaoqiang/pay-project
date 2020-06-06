import moment from 'moment';

export const today_date_range = () => {
  const start = moment().startOf('day');
  const end = moment().endOf('day');
  return [start, end];
};

export const yesterday_date_range = () => {
  const start = moment()
    .subtract(1, 'days')
    .startOf('day');
  const end = moment()
    .subtract(1, 'days')
    .endOf('day');
  return [start, end];
};
export const moth_date_range = () => {
  const start = moment()
    .subtract(1, 'days')
    .startOf('day');
  const end = moment()
    .subtract(1, 'days')
    .endOf('day');
  return [start, end];
};
export const last_moth_date_range = () => {
  const start = moment()
    .month(moment().month() - 1)
    .startOf('month');
  const end = moment()
    .month(moment().month() - 1)
    .endOf('month');
  return [start, end];
};

export const dateTimeFormat = millisecond => {
  if (millisecond === 0 || millisecond === undefined) {
    return moment();
  }
  return moment(millisecond * 1000);
};
