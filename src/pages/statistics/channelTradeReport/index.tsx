import { connect } from 'dva';
import React, { useRef, useState, useEffect } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data';
import { BeforeCurrentDateComponent } from '@/components/DateComponent';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { helpers, constant, utils } from '@/utils';
import moment from 'moment';
import _ from 'lodash';
const Agent = props => {
  const actionRef = useRef<ActionType>();
  const [dateRange, setDateRange] = useState({
    hasRadio: '',
    date: [moment(),moment().add(1, 'day')],
  });
  const [total, setTotal] = useState(0);
  const { dispatch } = props;
  const changeDateType = dateRange => {
    setDateRange(dateRange);
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '通道',
      dataIndex: 'channelName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '交易金额',
      dataIndex: 'paidAmount',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '手续费',
      dataIndex: 'poundage',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '代理返点',
      dataIndex: 'rebateAmount',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '已支付订单量',
      dataIndex: 'paidOrderNum',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '订单量',
      dataIndex: 'orderNum',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '下发手续费',
      dataIndex: 'withdrawPoundage',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '成功率',
      dataIndex: 'successRate',
      align: 'center',
      hideInSearch: true,
      render:(item)=>{
        return `${item}%`
      }
    },
    {
      title: '日期',
      dataIndex: 'dateRange',
      align: 'center',
      hideInTable: true,
      renderFormItem: (item, self: any) => {
        return (
          <BeforeCurrentDateComponent
            self={self}
            dateRange={dateRange}
            changeDateType={changeDateType}
          />
        );
      },
    },
  ];
  const getDatas = params => {
    if (!params.dateRange) {
      params.beginDate = moment().format(constant.YYYY_MM_DD);
      params.endDate = moment()
        .add(1, 'day')
        .format(constant.YYYY_MM_DD);
    } else {
      params.beginDate = moment(params.dateRange[0]).format(constant.YYYY_MM_DD);
      params.endDate = moment(params.dateRange[1])
        .add(1, 'day')
        .format(constant.YYYY_MM_DD);
    }
    return dispatch({
      type: 'channelTradeReport/list',
      payload: { params },
    }).then(data => {
      let sum = data.data.statistics.sum || {};
      data.data.data.push({ ...sum, reportDate: '总计' });
      setTotal(data.data.statistics.withdrawableAmount);
      return data.data;
    });
  };
  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem>
        rowKey="id"
        actionRef={actionRef}
        headerTitle="通道报表"
        request={params => {
          const { current: pageNum, pageSize, ...rest } = params;
          params = { pageNum, pageSize, ...rest };
          return getDatas(params);
        }}
        columns={columns}
        bordered
        size={'small'}
        options={{
          fullScreen: false,
          setting: true,
          reload: true,
          density: false,
        }}
        pagination={false}
      />
    </PageHeaderWrapper>
  );
};
export default connect(({ loading, user, common }: ConnectState) => ({
  loadingState: loading.models.channelTradeReport,
  user,
  common,
}))(Agent);
