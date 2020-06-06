import { connect } from 'dva';
import React, { useState, useRef } from 'react';
import { Button, message, Divider, Modal, Popover } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import InsertModityComponent from './components/InsertModityComponent';
import UpdatePsd from './components/UpdatePsd';
import CodeQuota from './components/CodeQuota';
import VirtualWallet from './components/VirtualWallet';
import ModifyMoneyPwd from './components/ModifyMoneyPwd';
import AdjustCashDeposit from './components/AdjustCashDeposit';
import ConfigChannle from './components/ConfigChannle';
import AllLowerLevelAccount from './components/AllLowerLevelAccount';
import { helpers, constant } from '@/utils';
import styles from './style.less';
import _ from 'lodash';
import BankCard from './components/BankCard';
const Agent = props => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [bankCardVisible, handleBankCardModalVisible] = useState<boolean>(false);
  const [codeQuotaVisible, handleCodeQuotaModalVisible] = useState<boolean>(false);
  const [virtualWalletVisible, handleVirtualWalletModalVisible] = useState<boolean>(false);
  const [adjustCashDepositModalVisible, handleAdjustCashDepositModalVisible] = useState<boolean>(false);
  const [updatePwdModalVisible, handleUpdatePwdModalVisible] = useState<boolean>(false);
  const [updateMoneyPwdModalVisible, handleUpdateMoneyPwdModalVisible] = useState<boolean>(false);
  const [configChannleModalVisible, handleConfigChannleModalVisible] = useState<boolean>(false);
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
      render: (item, record: any) => {
        return (
          <span style={{ color: 'red' }}>{`${record.userName}(${record.accountLevel})级`}</span>
        );
      },
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
      title: '保证金',
      dataIndex: 'cashDeposit',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '邀请码配额',
      dataIndex: 'inviteCodeQuota',
      align: 'center',
      hideInSearch: true,
      render: (item, record: any) => {
        return `${record.inviteCodeQuota}个`;
      },
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
      title: '接单状态',
      dataIndex: 'receiveOrderStateName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '邀请人',
      dataIndex: 'inviterUserName',
      align: 'center',
      hideInSearch: true,
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
                    handleConfigChannleModalVisible(true);
                  }}
                >
                  配置接单通道
                </Button>
                <Button
                  type={'primary'}
                  size={'small'}
                  style={{ margin: 2 }}
                  onClick={() => {
                    syncReceiveOrderChanne(record);
                  }}
                >
                  同步下级接单通道
                </Button>
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
                    handleUpdateMoneyPwdModalVisible(true);
                  }}
                >
                  修改资金密码
                </Button>
                <Button
                  type={'primary'}
                  size={'small'}
                  style={{ margin: 2 }}
                  onClick={() => {
                    getRcord(record);
                    handleAdjustCashDepositModalVisible(true);
                  }}
                >
                  调整保证金
                </Button>
                <Button
                  type={'primary'}
                  size={'small'}
                  style={{ margin: 2 }}
                  onClick={() => {
                    getRcord(record);
                    handleBankCardModalVisible(true);
                  }}
                >
                  我的银行卡
                </Button>
                <Button
                  type={'primary'}
                  size={'small'}
                  style={{ margin: 2 }}
                  onClick={() => {
                    getRcord(record);
                    handleVirtualWalletModalVisible(true);
                  }}
                >
                  我的电子钱包
                </Button>
                <Button
                  type={'primary'}
                  size={'small'}
                  style={{ margin: 2 }}
                  onClick={() => {
                    getRcord(record);
                    handleCodeQuotaModalVisible(true);
                  }}
                >
                  调整邀请码配额
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
      type: 'agent/list',
      payload: { params },
    }).then(data => data.data);
  };

  const insertModityRole = params => {
    const alertMsg = helpers.isJudge(hasModity)(
      constant.alertMessage.UPDATE_SUCCESS,
      constant.alertMessage.ADD_SUCCESS,
    );
    const type = helpers.isJudge(hasModity)('agent/update', 'agent/add');
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
      type: 'agent/updatePwd',
      payload: { params: { userAccountId, newLoginPwd } },
    }).then(data => {
      message.success(constant.alertMessage.UPDATE_SUCCESS);
      handleUpdatePwdModalVisible(false);
      actionRef.current?.reload();
    });
  };

  const updateMoneyPwd = params => {
    const { id: userAccountId, newMoneyPwd } = params;
    dispatch({
      type: 'agent/modifyMoneyPwd',
      payload: { params: { userAccountId, newMoneyPwd } },
    }).then(data => {
      message.success(constant.alertMessage.UPDATE_SUCCESS);
      handleUpdateMoneyPwdModalVisible(false);
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
          type: 'agent/del',
          payload: { params: { userAccountId } },
        }).then(data => {
          message.success(constant.alertMessage.DLE_SUCCESS);
          actionRef.current?.reload();
        });
      },
    });
  };

  const syncReceiveOrderChanne = params => {
    const { id: userAccountId } = params;
    Modal.confirm({
      title: '提示',
      content: `确定要同步下级接单通道吗?`,
      onOk: () => {
        return dispatch({
          type: 'agent/syncReceiveOrderChanne',
          payload: { params: { userAccountId } },
        }).then(data => {
          message.success(constant.alertMessage.UPDATE_SUCCESS);
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
        headerTitle="代理账号"
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
        user={props.user}
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
      <ModifyMoneyPwd
        onSubmit={value => {
          updateMoneyPwd(value);
        }}
        onCancel={() => handleUpdateMoneyPwdModalVisible(false)}
        modalVisible={updateMoneyPwdModalVisible}
        confirmLoading={props.loadingState}
        defulat={rcord}
        hasModity={hasModity}
      />
      <AdjustCashDeposit
        onCancel={() => handleAdjustCashDepositModalVisible(false)}
        modalVisible={adjustCashDepositModalVisible}
        confirmLoading={props.loadingState}
        defulat={rcord}
        actionRef={actionRef}
        dispatch={dispatch}
        hasModity={hasModity}
      />
      <CodeQuota
        onCancel={() => handleCodeQuotaModalVisible(false)}
        modalVisible={codeQuotaVisible}
        confirmLoading={props.loadingState}
        defulat={rcord}
        actionRef={actionRef}
        dispatch={dispatch}
        hasModity={hasModity}
      />
      {configChannleModalVisible && (
        <ConfigChannle
          handleModalVisible={()=>{handleConfigChannleModalVisible(false)}}
          onCancel={() => handleConfigChannleModalVisible(false)}
          modalVisible={configChannleModalVisible}
          confirmLoading={props.loadingState}
          defulat={rcord}
          actionRef={actionRef}
          hasModity={hasModity}
          dispatch={dispatch}
        />
      )}
       {bankCardVisible && (
        <BankCard
          onCancel={() => handleBankCardModalVisible(false)}
          modalVisible={bankCardVisible}
          confirmLoading={props.loadingState}
          defulat={rcord}
          hasModity={hasModity}
          dispatch={dispatch}
        />
      )}
       {virtualWalletVisible && (
        <VirtualWallet
          onCancel={() => handleVirtualWalletModalVisible(false)}
          modalVisible={virtualWalletVisible}
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
export default connect(({ loading, user }: ConnectState) => ({
  loadingState: loading.models.agent,
  user,
}))(Agent);
