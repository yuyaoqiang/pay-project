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
const ProxyStatistics = props => {
  const actionRef = useRef<ActionType>();
  const [dateRange, setDateRange] = useState({
    hasRadio: '',
    date: [moment(), moment().add(1, 'day')],
  });
  const { dispatch } = props;
  const changeDateType = dateRange => {
    setDateRange(dateRange);
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '通道名称',
      dataIndex: 'merchantName',
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
      title: '实收金额',
      dataIndex: 'rebateAmount',
      align: 'center',
      hideInSearch: true,
      render: (item, record: any) => {
        return record.paidAmount + record.manualAmount - record.poundage;
      },
    },
    {
      title: '补单金额',
      dataIndex: 'manualAmount',
      align: 'center',
      hideInSearch: true,
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
      type: 'proxyStatistics/list',
      payload: { params },
    }).then(data => {
      let statistics = data.data.statistics.sum || {};
      data.data.data.push({ ...statistics, merchantName: '总计' });
      return data.data;
    });
  };
  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem>
        rowKey="merchantName"
        actionRef={actionRef}
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
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 20,
          position: 'bottom',
          showTotal: (total, range) => `共${total}条记录`,
        }}
      />
    </PageHeaderWrapper>
  );
};
export default connect(({ loading, user, common }: ConnectState) => ({
  loadingState: loading.models.proxyStatistics,
  user,
  common,
}))(ProxyStatistics);