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
      title: '充值类型',
      dataIndex: 'type',
      align: 'center',
    },
    {
      title: '充值类型名称',
      dataIndex: 'name',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '所属类别',
      dataIndex: 'payCategory',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '排序号',
      dataIndex: 'orderNo',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '是否启用',
      dataIndex: 'enabled',
      align: 'center',
      hideInSearch: true,
      valueEnum: {
        true: { text: '启用', status: 'Success' },
        false: { text: '停用', status: 'Error' },
      },
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
  useEffect(() => {
    findPayCategory();
  }, []);
  const getDatas = () => {
    return dispatch({
      type: 'rechargeChannelType/list',
      payload: {},
    }).then(data => {
      setRcord(data.data);
      return data;
    });
  };
  const findPayCategory = () => {
    return dispatch({
      type: 'common/findPayCategory',
      payload: {},
    });
  };
  const del = params => {
    return dispatch({
      type: 'rechargeChannelType/del',
      payload: { params },
    }).then(data => {
      message.success('删除成功');
      actionRef.current.reload();
    });
  };

  const insertModityRole = params => {
    dispatch({
      type: 'rechargeChannelType/add',
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
          return getDatas();
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
        pagination={false}
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
  loadingState: loading.models.rechargeChannelType,
  common,
}))(Code);
