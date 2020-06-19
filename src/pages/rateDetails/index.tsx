import { connect } from 'dva';
import React, { useState, useRef, useEffect } from 'react';
import { Button, message, Card, Divider } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import InsertModityComponent from './components/InsertModityComponent';
import NoticeContent from './components/NoticeContent';
import { helpers, utils } from '@/utils';
import _ from 'lodash';
import styles from './style.less';
const Code = props => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [contentVisible, handleContentVisible] = useState<boolean>(false);
  const [hasModity, handleHasModity] = useState<boolean>(false);
  const [rcord, setRcord] = useState<any>({});
  const actionRef = useRef<ActionType>();
  const { dispatch, common } = props;

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '通道code',
      dataIndex: 'channelCode',
      align: 'center',
    },
    {
      title: '通道名称',
      dataIndex: 'channelName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '费率	',
      dataIndex: 'rate',
      align: 'center',
      hideInSearch: true,
      render:(item)=>{
        return `${item}%`
      }
    },
    {
      title: '限额',
      dataIndex: 'minAmount',
      align: 'center',
      hideInSearch: true,
      render:(item,record:any)=>{
        return `${record.minAmount}-${record.maxAmount}`
      }
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      align: 'center',
      hideInSearch: true,
      render:(item:boolean,record:any)=>{
        return helpers.isJudge(item)(<span style={{color:'green'}}>启用</span>,<span style={{color:'red'}}>禁用</span>)
      }
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
    },
  ];

  const getDatas = params => {
    return dispatch({
      type: 'rateDetails/list',
      payload: { params },
    }).then(data => {
      return data;
    });
  };
  const del = params => {
    return dispatch({
      type: 'banks/del',
      payload: { params },
    }).then(data => {
      message.success('删除成功');
      actionRef.current.reload();
    });
  };

  const insertModityRole = params => {
    const type = 'banks/add';
    dispatch({
      type,
      payload: { params },
    }).then(data => {
      message.success(data.message||"操作成功");
      handleModalVisible(false);
      actionRef.current?.reload();
    });
  };
  const getRcord = async data => {
    setRcord(data);
    handleHasModity(true);
    handleModalVisible(true);
  };

  return (
    <PageHeaderWrapper title={false}>
      <Card>
      <h3 style={{textAlign:'center'}}>需要变更通道及调整费率请联系客服</h3>
      </Card>
      <ProTable<TableListItem>
        rowKey="id"
        actionRef={actionRef}
        headerTitle="费率详情"
        request={params => {
          const { current: pageNum, pageSize, ...rest } = params;
          params = { pageNum, pageSize, ...rest };
          return getDatas(params);
        }}
        search={false}
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
export default connect(({ common, loading }: ConnectState) => ({
  loadingState: loading.models.banks,
  common,
}))(Code);
