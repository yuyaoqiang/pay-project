import { connect } from 'dva';
import React, { useState, useRef } from 'react';
import { Button, message, Divider, Modal, Popover } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import InsertModityComponent from './components/InsertModityComponent';
import UpdatePsd from './components/UpdatePsd';
import GoogleCompoent from './components/GoogleCompoent';
import AllLowerLevelAccount from './components/AllLowerLevelAccount';
import { helpers, constant } from '@/utils';
import styles from './style.less';
import _ from 'lodash';
const BackAccount = props => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [updatePwdModalVisible, handleUpdatePwdModalVisible] = useState<boolean>(false);
  const [googleModalVisible, handleGoogleModalVisible] = useState<boolean>(false);
  const [accountsModalVisible, handleAccountsModalVisible] = useState<boolean>(false);
  const [hasModity, handleHasModity] = useState<boolean>(false);
  const [rcord, setRcord] = useState({});
  const actionRef = useRef<ActionType>();
  const { dispatch } = props;
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '账号',
      dataIndex: 'userName',
      align: 'center',
    },
    {
      title: '姓名',
      dataIndex: 'realName',
      align: 'center',
    },
    {
      title: '电话',
      dataIndex: 'mobile',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '账号状态',
      dataIndex: 'state',
      align: 'center',
      hideInSearch: true,
      valueEnum: {
        1: { text: '启用', status: 'Success' },
        0: { text: '停用', status: 'Error' },
      },
    },
    {
      title: '谷歌验证器',
      dataIndex: 'googleSecretKey',
      align: 'center',
      hideInSearch: true,
      render: (item, record: any) => {
        return helpers.isJudge(_.isEmpty(item))(
          '未绑定',
          <>
            <p>验证器密钥: {item} </p>
            <p>绑定时间: {record.googleAuthBindTime} </p>
          </>,
        );
      },
    },
    {
      title: '注册时间',
      dataIndex: 'registeredTime',
      align: 'center',
      hideInSearch: true,
      render: (item: string) => {
        const strs = helpers.isJudge(_.isEmpty(item))([], item.split(' '));
        return (
          <>
            <p className={styles.mp0}>{strs[0]}</p>
            <p className={styles.mp0}>{strs[1]}</p>
          </>
        );
      },
    },
    {
      title: '最近登录时间',
      dataIndex: 'latelyLoginTime',
      hideInSearch: true,
      align: 'center',
      render: (item: string = '') => {
        let strs = [];
        if (item) {
          strs = item.split(' ');
        }
        return (
          <>
            <p className={styles.mp0}>{strs[0]}</p>
            <p className={styles.mp0}>{strs[1]}</p>
          </>
        );
      },
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
            修改
          </Button>
          <Divider type="vertical" />
          <Popover
            content={
              <div style={{ maxWidth: 120, textAlign: 'center', padding: 4 }}>
                <Button
                  type={'primary'}
                  size={'small'}
                  style={{ margin: 2 }}
                  onClick={() => {
                    getRcord(record);
                    handleUpdatePwdModalVisible(true);

                  }}
                >
                  修改登录密码
                </Button>
                <Button
                  type={'primary'}
                  size={'small'}
                  style={{ margin: 2 }}
                  onClick={() => {
                    getRcord(record);
                    handleGoogleModalVisible(true);
                  }}
                >
                  绑定谷歌验证器
                </Button>
                <Button
                  type={'primary'}
                  size={'small'}
                  style={{ margin: 2 }}
                  onClick={() => {
                    getRcord(record);
                    handleAccountsModalVisible(true);
                  }}
                >
                  我的下级账号
                </Button>
                <Button
                  type={'primary'}
                  size={'small'}
                  style={{ margin: 2 }}
                  onClick={() => {
                    dele(record);
                  }}
                >
                  删除账号
                </Button>
              </div>
            }
          >
            <Button size={'small'}>更多</Button>
          </Popover>
          {}
        </>
      ),
    },
  ];

  const getDatas = params => {
    params.propertie = 'cashDeposit';
    params.direction = 'desc';
    return dispatch({
      type: 'backAccount/list',
      payload: { params },
    }).then(data => data.data);
  };

  const insertModityRole = params => {
    const alertMsg = helpers.isJudge(hasModity)(
      constant.alertMessage.UPDATE_SUCCESS,
      constant.alertMessage.ADD_SUCCESS,
    );
    const type = helpers.isJudge(hasModity)('backAccount/update', 'backAccount/add');
    dispatch({
      type,
      payload: { params },
    }).then(data => {
      message.success(data.message || alertMsg);
      handleModalVisible(false);
      actionRef.current?.reload();
    });
  };
  const updatePwd = params => {
    const { id: userAccountId, loginPwd: newLoginPwd } = params;
    dispatch({
      type: 'backAccount/updatePwd',
      payload: { params: { userAccountId, newLoginPwd } },
    }).then(data => {
      message.success(constant.alertMessage.UPDATE_SUCCESS);
      handleUpdatePwdModalVisible(false);
      actionRef.current?.reload();
    });
  };

  const dele = params => {
    const { id: userAccountId, state } = params;
    if (state === '1') {
      message.error('启用状态不可删除');
      return;
    }
    Modal.confirm({
      title: '提示',
      content: `确认要删除吗？`,
      onOk: () => {
        return dispatch({
          type: 'backAccount/del',
          payload: { params: { userAccountId } },
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
        headerTitle="后台账号"
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
            添加账号
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
      />
      <UpdatePsd
        onSubmit={value => {
          updatePwd(value);
        }}
        onCancel={() => handleUpdatePwdModalVisible(false)}
        modalVisible={updatePwdModalVisible}
        confirmLoading={props.loadingState}
        defulat={rcord}
        hasModity={hasModity}
      />
      {googleModalVisible && (
        <GoogleCompoent
          onCancel={() => handleGoogleModalVisible(false)}
          modalVisible={googleModalVisible}
          confirmLoading={props.loadingState}
          defulat={rcord}
          hasModity={hasModity}
          dispatch={dispatch}
        />
      )}
      {accountsModalVisible && (
        <AllLowerLevelAccount
          onCancel={() => handleAccountsModalVisible(false)}
          modalVisible={accountsModalVisible}
          confirmLoading={props.loadingState}
          defulat={rcord}
          hasModity={hasModity}
          dispatch={dispatch}
        />
      )}
    </PageHeaderWrapper>
  );
};
export default connect(({ loading }: ConnectState) => ({
  loadingState: loading.models.backAccount,
}))(BackAccount);
