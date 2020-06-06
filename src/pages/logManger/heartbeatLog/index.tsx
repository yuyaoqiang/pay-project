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
    date: [],
  });
  const { dispatch, common } = props;
  const changeDateType = dateRange => {
    setDateRange(dateRange);
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户',
      dataIndex: 'userName',
      align: 'center',
    },
    {
      title: 'ip地址',
      dataIndex: 'ipAddr',
      align: 'center',
    },
    {
      title: '地点',
      dataIndex: 'loginLocation',
      align: 'center',
      hideInSearch:true,
    },
    {
      title: '账号密钥',
      dataIndex: 'secretKey',
      align: 'center',
      width:'150',
      ellipsis:true,
      hideInSearch:true,
    },
    {
      title: '微信收款人',
      dataIndex: 'wechatPayee',
      align: 'center',
      hideInSearch:true,
    },
    {
      title: '支付宝收款人',
      dataIndex: 'alipayPayee',
      align: 'center',

      hideInSearch:true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch:true,
    },
    {
      title: '最后心跳时间',
      dataIndex: 'lastHeartbeatTime',
      align: 'center',
      hideInSearch:true,
    },
    {
      title: '最后心跳时间',
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
      type: 'heartbeatLog/list',
      payload: { params },
    }).then(data => data.data);
  };
  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem>
        rowKey="id"
        actionRef={actionRef}
        headerTitle="监控APP心跳日记"
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
