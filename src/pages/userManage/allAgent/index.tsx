import { connect } from 'dva';
import React, { useState, useRef } from 'react';
import allAgentService from './service';
import { Button, message } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import AddComponent from './components/AddComponent';
import UpdateComponent from './components/UpdateComponent';
import { BeforeCurrentDateComponent } from '@/components/DateComponent';

const updateAllAgent = params => {
  return allAgentService.updateAllAgent(params).then(res => res);
};
const getAllAgentDetails = params => {
  return allAgentService.getAllAgentDetails(params).then(res => res.result);
};
const AllAgent = props => {
  const [addModalVisible, handleAddModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdatelVisible] = useState<boolean>(false);
  const [agent, setAgent] = useState({});
  const [agentDetail, setAgentDetail] = useState({});
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '在线',
      dataIndex: 'online',
      hideInSearch: true,
      align: 'center',
      valueEnum: {
        false: { text: '离线', status: 'Default' },
        true: { text: '停用', status: 'Error' },
      },
    },
    {
      title: '总代理账号',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '总代理真实姓名:',
      dataIndex: 'real_name',
      hideInTable: true,
    },
    {
      title: '代理数',
      dataIndex: 'agent_count',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: '会员数',
      dataIndex: 'customer_count',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '可用额度',
      dataIndex: 'usable_coin',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      hideInSearch: true,
      valueEnum: {
        0: { text: '可用', status: 'Success' },
        1: { text: '停用', status: 'Default' },
        2: { text: '冻结', status: 'Error' },
      },
    },
    {
      title: '新增时间',
      dataIndex: 'created',
      valueType: 'date',
      align: 'center',
      width: 100,
      renderFormItem: (value, self: any) => {
        return <BeforeCurrentDateComponent self={self} />;
      },
    },
    {
      title: '最后活动时间',
      dataIndex: 'updated',
      valueType: 'dateTime',
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
          <a
            onClick={() => {
              getAgent(record);
            }}
          >
            修改
          </a>
          ,
        </>
      ),
    },
  ];
  const getAllAgentList = params => {
    const { dispatch } = props;
    return dispatch({
      type: 'allAgent/getAllAgentList',
      payload: { params },
    }).then(data => data);
  };
  const addAllAgent = params => {
    const { dispatch } = props;
    dispatch({
      type: 'allAgent/addAllAgent',
      payload: { params },
    }).then(data => {
      message.success(data.message);
      handleAddModalVisible(false);
    });
  };
  const updateSumbit = async (value, form) => {
    const res = await updateAllAgent(value);
    handleAddModalVisible(false);
    message.success(res.message);
    form.resetFields();
    if (actionRef.current) {
      actionRef.current.reload();
    }
  };
  const getAgent = async agent => {
    const params = { name: agent.name };
    const data = await getAllAgentDetails(params);
    setAgentDetail(data);
    setAgent(agent);
    handleUpdatelVisible(true);
  };
  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem>
        rowKey="id"
        actionRef={actionRef}
        headerTitle="总代理列表"
        toolBarRender={() => [
          <Button icon="plus" type="primary" onClick={() => handleAddModalVisible(true)}>
            新增总代理
          </Button>,
        ]}
        tableAlertRender={(selectedRowKeys, selectedRows) => (
          <div>
            已选择 <a>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
            <span>代理数总计 {selectedRows.reduce((pre, item) => pre + item.agent_count, 0)}</span>
          </div>
        )}
        request={params => getAllAgentList(params)}
        columns={columns}
        rowSelection={{}}
        bordered
        size={'small'}
        options={{
          fullScreen: false,
          setting: true,
          reload: true,
        }}
        pagination={{
          defaultPageSize: 20,
          position: 'bottom',
          showTotal: (total, range) => `共${total}条记录`,
        }}
      />
      <AddComponent
        onSubmit={value => {
          addAllAgent(value);
        }}
        onCancel={() => handleAddModalVisible(false)}
        modalVisible={addModalVisible}
        confirmLoading={props.loadingState}
      />
      <UpdateComponent
        onSubmit={(value, form) => {
          updateSumbit(value, form);
        }}
        onCancel={() => handleUpdatelVisible(false)}
        modalVisible={updateModalVisible}
        agent={agent}
        agentDetail={agentDetail}
      />
    </PageHeaderWrapper>
  );
};
export default connect(({ loading, allAgent, user }: ConnectState) => ({
  loadingState: loading.models.allAgent,
  permission: user.permission,
  allAgent,
}))(AllAgent);
