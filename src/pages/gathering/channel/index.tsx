import { connect } from 'dva';
import React, { useState, useRef, useEffect } from 'react';
import { Button, message, Divider, Modal, Popover } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import InsertModityComponent from './components/InsertModityComponent';
import { helpers, constant, utils } from '@/utils';
import styles from './style.less';
import _ from 'lodash';
const Agent = props => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [hasModity, handleHasModity] = useState<boolean>(false);
  const [rcord, setRcord] = useState({});
  const [allMerchantAgent, setAllMerchantAgent] = useState([]);
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
    },
    {
      title: '默认接单返点',
      dataIndex: 'defaultReceiveOrderRabate',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '是否启用',
      dataIndex: 'enabled',
      align: 'center',
      hideInSearch: true,
      render: (item: boolean, record) => {
        return helpers.isJudge(item)('启用', '禁用');
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record) => (
        <>
          <Button
            type={'primary'}
            size={'small'}
            onClick={() => {
              getRcord(record);
              handleModalVisible(true);
            }}
          >
            编辑
          </Button>
          <Divider type="vertical" />
          <Button
            type={'danger'}
            size={'small'}
            style={{ margin: 2 }}
            onClick={() => {
              dele(record);
            }}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  const getDatas = params => {
    return dispatch({
      type: 'channel/list',
      payload: { params },
    }).then(data => data.data);
  };

  const insertModityRole = params => {
    const alertMsg = helpers.isJudge(hasModity)(
      constant.alertMessage.UPDATE_SUCCESS,
      constant.alertMessage.ADD_SUCCESS,
    );
    const type = helpers.isJudge(hasModity)('channel/update', 'channel/add');
    dispatch({
      type,
      payload: { params },
    }).then(data => {
      message.success(data.message || alertMsg);
      handleModalVisible(false);
      actionRef.current?.reload();
    });
  };
  const dele = params => {
    const { id } = params;
    Modal.confirm({
      title: '提示',
      content: `确认要删除吗？`,
      onOk: () => {
        return dispatch({
          type: 'channel/del',
          payload: { params: { id } },
        }).then(data => {
          message.success(constant.alertMessage.DLE_SUCCESS);
          actionRef.current?.reload();
        });
      },
    });
  };
  const getRcord = async data => {
    setRcord(data);
    handleHasModity(true);
  };
  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem>
        rowKey="id"
        actionRef={actionRef}
        headerTitle="收款通道"
        toolBarRender={() => [
          <Button
            icon="plus"
            type="primary"
            onClick={() => {
              setRcord({});
              handleHasModity(false);
              handleModalVisible(true);
            }}
          >
            新增通道
          </Button>,
        ]}
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
      <InsertModityComponent
        onSubmit={value => {
          insertModityRole(value);
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={modalVisible}
        confirmLoading={props.loadingState}
        defulat={rcord}
        hasModity={hasModity}
        user={props.user}
        common={common}
        dispatch={dispatch}
        allMerchantAgent={allMerchantAgent}
      />
    </PageHeaderWrapper>
  );
};
export default connect(({ loading, user, common }: ConnectState) => ({
  loadingState: loading.models.channel,
  user,
  common,
}))(Agent);
