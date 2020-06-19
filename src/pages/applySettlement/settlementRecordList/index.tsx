import { connect } from 'dva';
import React, { useState, useRef } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { BeforeCurrentDateComponent } from '@/components/DateComponent';
import { helpers, constant } from '@/utils';
import _ from 'lodash';
import moment from 'moment';
const BackAccount = props => {
  const actionRef = useRef<ActionType>();
  const { dispatch } = props;
  const [dateRange, setDateRange] = useState({
    hasRadio: '',
    date: [moment(),moment()],
  });
  const changeDateType = dateRange => {
    setDateRange(dateRange);
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '申请时间',
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
      }
    },
    {
      title: '订单号',
      dataIndex: 'id',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '金额',
      dataIndex: 'withdrawAmount',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '服务费',
      dataIndex: 'serviceFee',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '实际到账',
      dataIndex: 'actualToAccount',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '结算银行卡',
      dataIndex: '',
      align: 'center',
      hideInSearch: true,
      render: (item, record: any) => {
        return `${record.accountHolder}-${record.openAccountBank}-${record.bankCardAccount}`;
      },
    },
    {
      title: '账号状态',
      dataIndex: 'stateName',
      align: 'center',
      hideInSearch: true,
      render: item => {
        return helpers.isJudge(item == '已到账')(
          <span style={{ color: 'green' }}>{item}</span>,
          <span style={{ color: 'red' }}>{item}</span>,
        );
      },
    },
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      align: 'center',
      hideInSearch: true,
    },
  ];

  const getDatas = params => {
    if (!params.dateRange) {
      params.applyStartTime = moment().format(constant.YYYY_MM_DD);
      params.applyEndTime = moment().format(constant.YYYY_MM_DD);
    } else {
      params.applyStartTime = moment(params.dateRange[0]).format(constant.YYYY_MM_DD);
      params.applyEndTime = moment(params.dateRange[1]).format(constant.YYYY_MM_DD);
    }
    return dispatch({
      type: 'settlementRecordList/list',
      payload: { params },
    }).then(data => data.data);
  };

  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem>
        rowKey="id"
        actionRef={actionRef}
        headerTitle="我的结算记录"
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
export default connect(({ loading }: ConnectState) => ({
  loadingState: loading.models.settlementRecordList,
}))(BackAccount);
