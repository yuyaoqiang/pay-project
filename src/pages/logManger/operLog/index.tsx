import { connect } from 'dva';
import React, { useRef,useState,useEffect} from 'react';
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
    date: [moment(),moment()],
  });
  const { dispatch, common } = props;
  const changeDateType = dateRange => {
    setDateRange(dateRange);
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '操作用户',
      dataIndex: 'operName',
      align: 'center',
    },
    {
      title: 'ip地址',
      dataIndex: 'ipAddr',
      align: 'center',
    },
    {
      title: '关键字',
      dataIndex: 'param',
      align: 'center',
      hideInTable:true,
    },
    {
      title: '系统',
      dataIndex: 'system',
      align: 'center',
      hideInSearch:true,
    },
    {
      title: '模块',
      dataIndex: 'module',
      align: 'center',
      hideInSearch:true,
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'center',
      hideInSearch:true,
    },
    {
      title: '请求方式',
      dataIndex: 'requestMethod',
      align: 'center',
      hideInSearch:true,
    },
    {
      title: 'url',
      dataIndex: 'requestUrl',
      align: 'center',
      width:'150',
      ellipsis:true,
      hideInSearch:true,
    },
    {
      title: '操作时间',
      dataIndex: 'operTime',
      align: 'center',
      hideInSearch:true,
    },
    {
      title: '请求参数',
      dataIndex: 'requestParam',
      align: 'center',
      hideInSearch:true,
      width:200,
      ellipsis:true,
    },
    {
      title: '操作时间',
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
      params.startTime = moment().format(constant.YYYY_MM_DD);
      params.endTime = moment().format(constant.YYYY_MM_DD);
    } else {
      params.startTime = moment(params.dateRange[0]).format(constant.YYYY_MM_DD);
      params.endTime = moment(params.dateRange[1]).format(constant.YYYY_MM_DD);
    }
    return dispatch({
      type: 'operLog/list',
      payload: { params },
    }).then(data => data.data);
  };
  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem>
        rowKey="id"
        actionRef={actionRef}
        headerTitle="操作日志"
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
  loadingState: loading.models.channel,
  user,
  common,
}))(Agent);
