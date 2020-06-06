import { connect } from 'dva';
import React, { useState, useRef } from 'react';
import { ConnectState } from '@/models/connect';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, message } from 'antd';
import AgentFormComponent from './agentForm';
import _ from 'lodash';
import agentStyle from './style.scss';
import { utils } from '@/utils';
import moment from 'moment';

interface ResponseData {
  code: number;
  result: ResultData;
}

interface ResultData {
  list: Array<any>;
  data: Array<any>;
  total_count: number;
}

const statusObj = {
  0: { text: '正常', color: 'green' },
  1: { text: '停用', color: 'red' },
  2: { text: '冻结', color: 'red' },
};

const UserAgent = props => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [actionType, setActionType] = useState<string>('add');
  const [agentDetail, setAgentDetail] = useState({});
  const actionRef = useRef<ActionType>();
  const { dispatch } = props;
  const columns: ProColumns<any>[] = [
    {
      title: '代理账号',
      dataIndex: 'name',
      align: 'center',
      hideInTable: true,
    },
    {
      title: '代理名称',
      dataIndex: 'nickname',
      align: 'center',
      hideInTable: true,
    },
    {
      title: '代理状态',
      dataIndex: 'status',
      align: 'center',
      hideInTable: true,
      initialValue: '',
      valueEnum: {
        '': { text: '所有', status: '' },
        0: { text: '正常', status: 0 },
        1: { text: '停用', status: 1 },
        2: { text: '冻结', status: 2 },
      },
    },
    {
      title: '未活跃天数',
      dataIndex: 'days',
      align: 'center',
      hideInTable: true,
    },
    {
      key: 'online',
      title: '在线',
      dataIndex: 'online',
      align: 'center',
      hideInSearch: true,
      fixed: 'left',
      width: 60,
      render: text => (
        <span>
          {!text ? <i className={text ? '' : agentStyle.redGreen} /> : null}
          {text ? '在线' : '离线'}
        </span>
      ),
    },
    {
      key: 'name',
      title: '代理账号/代理名称',
      dataIndex: 'name',
      width: 200,
      align: 'center',
      hideInSearch: true,
      fixed: 'left',
      render: (text, row) => (
        <span>
          {text}（{row.nick_name}）
        </span>
      ),
    },
    {
      key: 'customer_count',
      title: '会员数',
      dataIndex: 'customer_count',
      width: 60,
      align: 'center',
      hideInSearch: true,
    },
    {
      key: 'coin',
      title: '可用额度',
      dataIndex: 'coin',
      width: 150,
      align: 'center',
      hideInSearch: true,
      render: text => utils.balanceModify(text),
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 80,
      align: 'center',
      hideInSearch: true,
      render: text => (
        <span style={{ color: statusObj[String(text)].color }}>{statusObj[String(text)].text}</span>
      ),
    },
    {
      key: 'can_set_odds',
      title: '修改赔率',
      dataIndex: 'can_set_odds',
      width: 80,
      align: 'center',
      hideInSearch: true,
      render: text =>
        +text === 0 ? (
          <span style={{ color: 'red' }}>关闭</span>
        ) : (
          <span style={{ color: 'green' }}>开启</span>
        ),
    },
    {
      key: 'open_third_rebate',
      title: '第三方游戏返水',
      dataIndex: 'open_third_rebate',
      width: 150,
      align: 'center',
      hideInSearch: true,
      render: text =>
        +text === 0 ? (
          <span style={{ color: 'red' }}>关闭</span>
        ) : (
          <span style={{ color: 'green' }}>开启</span>
        ),
    },
    {
      key: 'created',
      title: '新增时间',
      dataIndex: 'created',
      width: 180,
      align: 'center',
      hideInSearch: true,
      render: text => (text ? moment(+text * 1000).format('YYYY-MM-DD HH:mm:ss') : null),
    },
    {
      key: 'updated',
      title: '最后活跃',
      dataIndex: 'updated',
      width: 180,
      align: 'center',
      hideInSearch: true,
      render: text => (text ? moment(+text * 1000).format('YYYY-MM-DD HH:mm:ss') : null),
    },
    {
      key: 'not_logged_days',
      title: '未活跃天数',
      dataIndex: 'not_logged_days',
      width: 120,
      align: 'center',
      hideInSearch: true,
    },
    {
      key: 'remark',
      title: '备注',
      dataIndex: 'remark',
      width: 120,
      align: 'center',
      hideInSearch: true,
    },
    {
      key: 'operation',
      title: '操作',
      dataIndex: 'operation',
      width: 250,
      align: 'center',
      hideInSearch: true,
      render: (text, row) => {
        return (
          <React.Fragment>
            <Button
              type={'primary'}
              size={'small'}
              onClick={() => {
                setActionType('edit');
                handleModalVisible(true);
                getDetail(row);
              }}
            >
              修改
            </Button>
          </React.Fragment>
        );
      },
    },
  ];
  const handleAgent = async (params, url) => {
    const res = await dispatch({
      type: url,
      payload: { params },
    });
    if (res.code === 200) {
      message.success(res.message);
      handleModalVisible(false);
      actionRef.current?.reload();
    }
  };

  const getDatas = async params => {
    const res: ResponseData = await dispatch({
      type: 'agent/getAgentList',
      payload: { params },
    });
    if (res.code === 200) {
      res.result.data = _.get(res.result, 'list');
      return res.result;
    }
    return null;
  };

  const getDetail = async row => {
    const params = { name: row.name };
    const res = await dispatch({
      type: 'agent/getAgentDetail',
      payload: { params },
    });
    if (res.code === 200) {
      setAgentDetail({ ...row, ...res.result });
    }
  };

  return (
    <PageHeaderWrapper title={false}>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        rowKey="id"
        bordered
        size="small"
        headerTitle=""
        request={params => {
          const { current: page, pageSize: limit, ...rest } = params;
          params = {
            page,
            limit,
            ...rest,
          };
          return getDatas(params);
        }}
        toolBarRender={() => [
          <Button
            icon="plus"
            type="primary"
            onClick={() => {
              setActionType('add');
              handleModalVisible(true);
            }}
          >
            添加代理
          </Button>,
        ]}
        options={{
          fullScreen: false,
          setting: true,
          reload: true,
          density: false,
        }}
        scroll={{ x: 1400, y: 600 }}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 20,
          position: 'bottom',
          showTotal: (total, range) => `共${total}条记录`,
        }}
      />
      <AgentFormComponent
        onSubmit={(value, url) => {
          handleAgent(value, url);
        }}
        banks={_.get(props.common, 'bankList')}
        type={actionType}
        onCancel={() => handleModalVisible(false)}
        agentInfo={agentDetail}
        modalVisible={modalVisible}
        confirmLoading={props.loadingState}
      />
    </PageHeaderWrapper>
  );
};
export default connect(({ user, common }: ConnectState) => ({
  user,
  common,
}))(UserAgent);
