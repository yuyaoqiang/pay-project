import { connect } from 'dva';
import React, { useState, useRef, useEffect } from 'react';
import { Button, message, Divider, Modal, Popover } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import InsertModityComponent from './components/InsertModityComponent';
import UpdatePsd from './components/UpdatePsd';
import InfoComponent from './components/InfoComponent';
import ModifyMoneyPwd from './components/ModifyMoneyPwd';
import ConfigChannle from './components/ConfigChannle';
import { helpers, constant } from '@/utils';
import _ from 'lodash';
const Agent = props => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [infoModalVisible, handleInfoModalVisible] = useState<boolean>(false);
  const [updatePwdModalVisible, handleUpdatePwdModalVisible] = useState<boolean>(false);
  const [updateMoneyPwdModalVisible, handleUpdateMoneyPwdModalVisible] = useState<boolean>(false);
  const [configChannleModalVisible, handleConfigChannleModalVisible] = useState<boolean>(false);
  const [hasModity, handleHasModity] = useState<boolean>(false);
  const [rcord, setRcord] = useState({});
  const actionRef = useRef<ActionType>();
  const { dispatch, common } = props;
  useEffect(() => {
    findMerchantAccountType();
  }, []);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '用户名',
      dataIndex: 'userName',
      align: 'center',
      hideInSearch: true,
      render: (item, record: any) => {
        return (
          <a
            onClick={() => {
              getRcord(record);
              handleInfoModalVisible(true);
            }}
          >{`${record.userName}`}</a>
        );
      },
    },
    {
      title: '商户号',
      dataIndex: 'merchantNum',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '商户名称',
      dataIndex: 'merchantName',
      align: 'center',
    },

    {
      title: '可提现金额',
      dataIndex: 'withdrawableAmount',
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
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '最近登录时间',
      dataIndex: 'latelyLoginTime',
      hideInSearch: true,
      align: 'center',
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
            style={{ margin: 2 }}
            onClick={() => {
              getRcord(record);
              handleConfigChannleModalVisible(true);
            }}
          >
            通道费率
          </Button>
          <Button
            type={'primary'}
            size={'small'}
            style={{ margin: 2 }}
            onClick={() => {
              getRcord(record);
              handleModalVisible(true);
            }}
          >
            修改
          </Button>
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
                    handleUpdateMoneyPwdModalVisible(true);
                  }}
                >
                  修改资金密码
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

  const findMerchantAccountType = () => {
    dispatch({
      type: 'common/findMerchantAccountType',
      payload: {},
    }).then(data => data.data);
  };

  const getDatas = params => {
    params.propertie = 'cashDeposit';
    params.direction = 'desc';
    return dispatch({
      type: 'agentSubordinate/list',
      payload: { params },
    }).then(data => data.data);
  };

  const insertModityRole = params => {
    const alertMsg = helpers.isJudge(hasModity)(
      constant.alertMessage.UPDATE_SUCCESS,
      constant.alertMessage.ADD_SUCCESS,
    );
    const type = helpers.isJudge(hasModity)('agentSubordinate/update', 'agentSubordinate/add');
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
    const { id, loginPwd: newLoginPwd } = params;
    dispatch({
      type: 'agentSubordinate/updatePwd',
      payload: { params: { id, newLoginPwd } },
    }).then(data => {
      message.success(constant.alertMessage.UPDATE_SUCCESS);
      handleUpdatePwdModalVisible(false);
      actionRef.current?.reload();
    });
  };

  const updateMoneyPwd = params => {
    const { id, newMoneyPwd } = params;
    dispatch({
      type: 'agentSubordinate/modifyMoneyPwd',
      payload: { params: { id, newMoneyPwd } },
    }).then(data => {
      message.success(constant.alertMessage.UPDATE_SUCCESS);
      handleUpdateMoneyPwdModalVisible(false);
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
        headerTitle="商户管理"
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
            新增下级用户
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
        dispatch={dispatch}
        common={common}
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
      {configChannleModalVisible && (
        <ConfigChannle
          handleModalVisible={() => {
            handleConfigChannleModalVisible(false);
          }}
          onCancel={() => handleConfigChannleModalVisible(false)}
          modalVisible={configChannleModalVisible}
          confirmLoading={props.loadingState}
          defulat={rcord}
          actionRef={actionRef}
          hasModity={hasModity}
          dispatch={dispatch}
        />
      )}
      <InfoComponent
        onCancel={() => handleInfoModalVisible(false)}
        modalVisible={infoModalVisible}
        confirmLoading={props.loadingState}
        defulat={rcord}
        actionRef={actionRef}
        dispatch={dispatch}
      />
    </PageHeaderWrapper>
  );
};
export default connect(({ loading, user, common }: ConnectState) => ({
  loadingState: loading.models.agentSubordinate,
  user,
  common,
}))(Agent);
