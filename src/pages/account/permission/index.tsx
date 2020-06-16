import { connect } from 'dva';
import React, { useState, useRef, useEffect } from 'react';
import { Button, message, Card, Divider, Spin } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import PageLoading from '@/components/PageLoading';
import InsertModityComponent from './components/InsertModityComponent';
import TreeContent from './components/TreeContent';
import Role from './components/role';
import { helpers, utils } from '@/utils';
import _ from 'lodash';
const Code = props => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [treeVisible, handleTreeVisible] = useState<boolean>(false);
  const [roleVisible, handleRoleVisible] = useState<boolean>(false);
  const [hasModity, handleHasModity] = useState<boolean>(false);
  const [delLoading, handleDelLoading] = useState<boolean>(false);
  const [rcord, setRcord] = useState<any>({});
  const [accounts, setAccounts] = useState<any>([]);
  const [tree, setTree] = useState<any>({});
  const actionRef = useRef<ActionType>();
  const { dispatch } = props;
  useEffect(() => {
    permission();
    accountAll();
  }, []);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      hideInSearch: true,
      valueEnum: {
        ENABLE: {
          text: '可用',
          status: 'Success',
        },
        DISABLE: {
          text: '不可用',
          status: 'Error',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'description',
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
            type={'primary'}
            style={{margin:2}}
            onClick={() => {
              getRcord(record);
              handleRoleVisible(true);
            }}
          >
            账号列表
          </Button>
          <Button
            size={'small'}
            style={{margin:2}}
            onClick={() => {
              getRcord(record);
              handleTreeVisible(true);
            }}
          >
            角色权限
          </Button>

          {helpers.isJudge(record.name === 'admin')(
            null,
            <Button
            size={'small'}
            style={{margin:2}}
            onClick={() => {
              handleModalVisible(true);
              handleHasModity(true);
              getRcord(record);
            }}
          >
            编辑
          </Button>
          )}
          {helpers.isJudge(record.name === 'admin')(
            null,
            <Button
              type={'danger'}
              style={{margin:2}}
              loading={delLoading}
              size={'small'}
              onClick={() => {
                del({ id: record.id });
              }}
            >
              删除
            </Button>
          )}
        </div>
      ),
    },
  ];
  const accountAll = () => {
    const params = {};
    return dispatch({
      type: 'permission/accountAll',
      payload: { params },
    }).then(data => {
      let lists = [];
      data.data.map(item => {
        lists.push({
          label: item.username,
          value: item.id,
        });
      });
      setAccounts(lists);
    });
  };
  const getDatas = () => {
    return dispatch({
      type: 'permission/list',
      payload: {},
    }).then(data => {
      return data;
    });
  };
  const permission = () => {
    return dispatch({
      type: 'permission/permission',
      payload: {},
    }).then(data => {
      if (data.data) {
        let befroe = JSON.stringify(data.data);
        let json = befroe
          .replace(/id/g, 'key')
          .replace(/child/g, 'children')
          .replace(/name/g, 'title');
        let after = JSON.parse(json);
        setTree(after);
      }
    });
  };
  const del = params => {
    return dispatch({
      type: 'permission/del',
      payload: { params },
    }).then(data => {
      message.success('删除成功');
      actionRef.current.reload();
    });
  };

  const insertModityRole = params => {
    const type = helpers.isJudge(hasModity)('permission/update', 'permission/add');
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
  };

  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem>
        rowKey="id"
        actionRef={actionRef}
        headerTitle="角色列表"
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
          setting: true,
          reload: true,
          density: false,
        }}
        pagination={false}
      />
      {modalVisible && (
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
      )}
      {treeVisible && (
        <TreeContent
          onCancel={() => handleTreeVisible(false)}
          modalVisible={treeVisible}
          confirmLoading={props.loadingState}
          defulat={rcord}
          treeData={tree}
          dispatch={dispatch}
        />
      )}
      {roleVisible && (
        <Role
          onCancel={() => handleRoleVisible(false)}
          modalVisible={roleVisible}
          confirmLoading={props.loadingState}
          defulat={rcord}
          dispatch={dispatch}
          accounts={accounts}
        />
      )}
    </PageHeaderWrapper>
  );
};
export default connect(({ common, loading }: ConnectState) => ({
  loadingState: loading.models.permission,
  common,
}))(Code);
