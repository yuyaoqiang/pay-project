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
      title: '字典code',
      dataIndex: 'dictTypeCode',
      align: 'center',
    },
    {
      title: '字典名称',
      dataIndex: 'dictTypeName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'note',
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
            size={'small'}
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

  const getDatas = params => {
    return dispatch({
      type: 'role/list',
      payload: { params },
    }).then(data => {
      setRcord(data.data);
      return data.data;
    });
  };
  const del = params => {
    return dispatch({
      type: 'dict/del',
      payload: { params },
    }).then(data => {
      message.success('删除成功');
      actionRef.current.reload();
    });
  };

  const insertModityRole = params => {
    const type = 'dict/add';
    dispatch({
      type,
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
        headerTitle="系统公告"
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
        dispatch={dispatch}
      />
      <NoticeContent
        onCancel={() => handleContentVisible(false)}
        modalVisible={contentVisible}
        confirmLoading={props.loadingState}
        defulat={rcord}
        hasModity={hasModity}
      />
    </PageHeaderWrapper>
  );
};
export default connect(({ common, loading }: ConnectState) => ({
  loadingState: loading.models.dict,
  common,
}))(Code);
