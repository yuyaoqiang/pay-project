import { connect } from 'dva';
import React, { useRef, useState, useEffect } from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button,message } from 'antd';
import { TableListItem } from './data';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { helpers, constant, utils } from '@/utils';
import moment from 'moment';
import _ from 'lodash';
const Agent = props => {
  const actionRef = useRef<ActionType>();
  const [dateRange, setDateRange] = useState({
    hasRadio: '',
    date: [],
  });
  const { dispatch, common } = props;
  const changeDateType = dateRange => {
    setDateRange(dateRange);
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '会话id',
      dataIndex: 'sessionId',
      align: 'center',
      width: 200,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '登录用户',
      dataIndex: 'userName',
      align: 'center',
    },
    {
      title: '登录系统',
      dataIndex: 'systemName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: 'ip地址',
      dataIndex: 'ipAddr',
      align: 'center',
    },
    {
      title: '登录地点',
      dataIndex: 'loginLocation',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作系统',
      dataIndex: 'os',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '登录时间',
      dataIndex: 'loginTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '最后访问时间',
      dataIndex: 'lastAccessTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record: any) => (
        <div>
          <Button
            type={'danger'}
            size={'small'}
            onClick={() => {
              loginOut({ sessionId: record.sessionId });
            }}
          >
            退出登录
          </Button>
        </div>
      ),
    },
  ];
  const loginOut = params => {
    return dispatch({
      type: 'online/loginOut',
      payload: { params },
    }).then(data => {
      message.success('操作成功');
      actionRef.current.reload();
    });
  };
  const getDatas = params => {
    if (!params.dateRange) {
      params.startTime = moment().format(constant.YYYY_MM_DD);
      params.endTime = moment().format(constant.YYYY_MM_DD);
    } else {
      params.startTime = moment(params.dateRange[0]).format(constant.YYYY_MM_DD);
      params.endTime = moment(params.dateRange[1]).format(constant.YYYY_MM_DD);
    }
    return dispatch({
      type: 'online/list',
      payload: { params },
    }).then(data => data.data);
  };
  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem>
        rowKey="id"
        actionRef={actionRef}
        headerTitle="在线账号"
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
