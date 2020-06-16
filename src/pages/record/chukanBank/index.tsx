import { connect } from 'dva';
import React, { useState, useRef, useEffect } from 'react';
import { Button, message, Card, Divider } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import InsertModityComponent from './components/InsertModityComponent';
import _ from 'lodash';
const Code = props => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [hasModity, handleHasModity] = useState<boolean>(false);
  const [rcord, setRcord] = useState<any>({});
  const actionRef = useRef<ActionType>();
  const { dispatch, common } = props;

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '银行名称',
      dataIndex: 'bankName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '开户人',
      dataIndex: 'accountName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '卡号',
      dataIndex: 'accountNumber',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '下发总金额',
      dataIndex: 'chukuanAmount',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'state',
      align: 'center',
      hideInSearch: true,
      valueEnum: {
        false: { text: '启用', status: 'Success' },
        true: { text: '禁用', status: 'Error' },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
      valueType:"dateTime"
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record: any) => (
        <div>
          <Button
            size={'small'}
            type={'primary'}
            onClick={() => {
              handleHasModity(true);
              handleModalVisible(true);
              getRcord(record);
            }}
          >
            编辑
          </Button>
          <Divider type={'vertical'} />
          <Button
            type={'danger'}
            size={'small'}
            onClick={() => {
              del({ id: record.id });
            }}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];
  const getDatas = params => {
    return dispatch({
      type: 'chukanBank/list',
      payload: { params },
    }).then(data => {
      return data.data;
    });
  };
  const del = params => {
    return dispatch({
      type: 'chukanBank/del',
      payload: { params },
    }).then(data => {
      message.success('删除成功');
      actionRef.current.reload();
    });
  };

  const insertModityRole = params => {
    dispatch({
      type: 'chukanBank/add',
      payload: { params },
    }).then(data => {
      message.success(data.message || '操作成功');
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
      <ProTable<TableListItem>
        rowKey="id"
        actionRef={actionRef}
        headerTitle="类型维护"
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
            添加
          </Button>,
        ]}
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
          setting: false,
          reload: false,
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
        dispatch={dispatch}
        payCategory={common.payCategory}
      />
    </PageHeaderWrapper>
  );
};
export default connect(({ common, loading }: ConnectState) => ({
  loadingState: loading.models.chukanBank,
  common,
}))(Code);
