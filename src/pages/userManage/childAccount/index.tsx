import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { ConnectState } from '@/models/connect';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import _ from 'lodash';
import { Button, Modal, Form, Radio, Input, Select, message, Table, Checkbox } from 'antd';
import FilterList from '@/components/FilterList';
import moment from 'moment';
import childStyle from './style.scss';

interface ResponseData {
  code: number;
  result: ResultData;
}

interface ResultData {
  list: Array<any>;
  total_count: number;
}

const ChildAccount = props => {
  const { dispatch } = props;
  const [dataList, setDataList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [showRecharge, setShowRecharge] = useState(false);
  const [action, setAction] = useState('edit');
  const [detail, setDetail] = useState({});
  const [levels, setLevels] = useState([]);
  const [type, setType] = useState('deposit_level_ids');
  const [query, setQuery] = useState({
    page: 1,
    limit: 20,
    name: '',
  });
  const statusObj = {
    0: { text: '正常', color: 'green' },
    1: { text: '停用', color: 'red' },
    2: { text: '冻结', color: 'red' },
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 16 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  const searchFileds = [
    {
      type: 'input',
      label: '账号名称',
      name: 'name',
      placeholder: '请输入账号名称',
      style: { width: 220 },
    },
  ];

  const columns: ProColumns<any>[] = [
    {
      key: 'online',
      title: '在线',
      dataIndex: 'online',
      width: 60,
      align: 'center',
      hideInSearch: true,
      render: text => (
        <span>
          {!text ? <i className={text ? '' : childStyle.redGreen} /> : null}
          {text ? '在线' : '离线'}
        </span>
      ),
    },
    {
      key: 'name',
      title: '账号',
      dataIndex: 'name',
      width: 120,
      align: 'center',
      hideInSearch: true,
    },
    {
      key: 'real_name',
      title: '名称',
      dataIndex: 'real_name',
      width: 120,
      align: 'center',
      hideInSearch: true,
    },
    {
      key: 'role',
      title: '角色',
      dataIndex: 'role',
      width: 120,
      align: 'center',
      hideInSearch: true,
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 120,
      align: 'center',
      hideInSearch: true,
      render: text => (
        <span style={{ color: statusObj[String(text)].color }}>{statusObj[String(text)].text}</span>
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
      key: 'active_time',
      title: '最后活跃时间',
      dataIndex: 'active_time',
      width: 180,
      align: 'center',
      hideInSearch: true,
      render: text => (text ? moment(+text * 1000).format('YYYY-MM-DD HH:mm:ss') : null),
    },
    {
      key: 'handle',
      title: '操作',
      dataIndex: 'handle',
      width: 200,
      align: 'center',
      hideInSearch: true,
      render: (text, row) => {
        return (
          <React.Fragment>
            <Button
              type="link"
              size="small"
              onClick={() => {
                const role = _.find(
                  _.get(props.common, 'permissions'),
                  item => item.name === _.get(row, 'role'),
                );
                setDetail({ ...row, role_id: _.get(role, 'id') });
                setVisible(true);
                setAction('edit');
              }}
            >
              修改
            </Button>
            <Button
              type="danger"
              size="small"
              style={{ background: 'transparent', color: 'red', marginLeft: 5 }}
              onClick={() => {
                Modal.confirm({
                  title: '提示',
                  content: (
                    <span>
                      `确认要删除 [{' '}
                      <span style={{ color: 'red', fontWeight: 700 }}>{row.name}</span> ] ？`
                    </span>
                  ),
                  onOk() {
                    delAccount({ name: row.name });
                  },
                  onCancel() {
                    message.info('已取消删除');
                  },
                  type: 'warning',
                });
              }}
            >
              删除
            </Button>
          </React.Fragment>
        );
      },
    },
  ];

  const delAccount = async params => {
    const res = await dispatch({
      type: 'childAccount/delAccount',
      payload: {
        params,
      },
    });
    if (res.code === 200) {
      message.success(res.message);
      getDatas(query);
    }
  };

  const getUserLevelList = async () => {
    const params = {
      limit: 20,
      page: 1,
    };
    const res = await dispatch({
      type: 'childAccount/getUserLevelList',
      payload: { params },
    });
    if (res.code === 200) {
      setLevels(res.result);
    }
  };

  const renderModel = () => {
    const url = action === 'edit' ? 'updateChildAccount' : 'addAccount';
    return (
      <Modal
        title={action === 'edit' ? '修改子账号' : '添加子账号'}
        visible={visible}
        onOk={() => handleAccount(detail, url)}
        onCancel={() => setVisible(false)}
      >
        <Form {...formItemLayout}>
          <Form.Item label={'账号状态'}>
            <Radio.Group
              value={_.get(detail, 'status')}
              onChange={e => setDetail({ ...detail, status: e.target.value })}
            >
              <Radio value={0}>正常</Radio>
              <Radio value={1}>停用</Radio>
              <Radio value={2}>冻结</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label={'用户账号'}>
            <Input
              disabled={action === 'edit' ? true : false}
              value={_.get(detail, 'name')}
              placeholder={'请输入用户账号'}
              onChange={e => setDetail({ ...detail, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label={'用户名称'}>
            <Input
              value={_.get(detail, 'real_name')}
              placeholder={'请输入新的用户名称'}
              allowClear={true}
              onChange={e => setDetail({ ...detail, real_name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label={'登录密码'}>
            <Input
              value={_.get(detail, 'passwd')}
              allowClear={true}
              placeholder={'请输入登录密码'}
              maxLength={20}
              type={'password'}
              onChange={e => {
                e.target.value = e.target.value.replace(/[^0-9a-zA-Z.]/g, '');
                setDetail({ ...detail, passwd: e.target.value });
              }}
            />
          </Form.Item>
          <Form.Item label={'角色'}>
            <Select
              value={_.get(detail, 'role_id')}
              allowClear={true}
              placeholder={'请选择角色'}
              onChange={value => setDetail({ ...detail, role_id: value })}
            >
              {_.get(props, 'common.permissions').map(item => {
                return (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  const rechargeColumn = [
    {
      key: 'name',
      title: '账号',
      width: 130,
      dataIndex: 'name',
      align: 'center',
      hideInSearch: true,
    },
    {
      key: 'nickname',
      title: '名称',
      width: 130,
      dataIndex: 'nickname',
      align: 'center',
      hideInSearch: true,
    },
    {
      key: 'role',
      title: '角色',
      width: 100,
      dataIndex: 'role',
      align: 'center',
      hideInSearch: true,
    },
    {
      key: type,
      title: type === 'deposit_level_ids' ? '充值分层设置' : '提款分层设置',
      dataIndex: type,
      align: 'center',
      hideInSearch: true,
      render: (text, row, index) => {
        return (
          <Checkbox.Group
            value={dataList[index][type].split(',')}
            onChange={value => {
              const Item = _.find(dataList, item => item.id === row.id);
              Item[type] = value.join();
              setDataList(
                dataList.map(item => {
                  if (item.id === Item.id) {
                    item = Item;
                  }
                  return item;
                }),
              );
            }}
          >
            {levels.map(item => {
              return (
                <Checkbox key={item.id} value={String(item.id)}>
                  {item.name}
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      },
    },
  ];

  const modifyLevel = async () => {
    const params = [];
    dataList.map(item => {
      params.push({ name: item.name, [type]: item[type] });
    });
    const res = await dispatch({
      type: 'childAccount/modifyUserLevel',
      payload: {
        params,
      },
    });
    if (res.code === 200) {
      message.success('修改成功');
      setShowRecharge(false);
    }
  };

  const renderRechargeModel = () => {
    return (
      <Modal
        title={type === 'deposit_level_ids' ? '充值分层设置' : '提款分层设置'}
        visible={showRecharge}
        width={1200}
        onOk={() => modifyLevel()}
        onCancel={() => setShowRecharge(false)}
      >
        <Table
          bordered
          dataSource={dataList}
          scroll={{ y: 540 }}
          headerTitle=""
          search={false}
          pagination={false}
          columns={rechargeColumn}
          size={'small'}
        />
        <h4>注意: 如果没有勾选任何层，则表示可处理所有</h4>
      </Modal>
    );
  };

  const getDatas = async params => {
    const res: ResponseData = await dispatch({
      type: 'childAccount/getChildAccounts',
      payload: { params },
    });
    if (res.code === 200) {
      setDataList(res.result.list);
    }
    return null;
  };

  const handleAccount = async (data, url) => {
    const { role_id, status, passwd, name, real_name } = data;
    const params = { role_id, status, passwd, name, real_name };
    const res = await dispatch({
      type: `childAccount/${url}`,
      payload: { params },
    });
    if (res.code === 200) {
      setVisible(false);
      message.success(res.message);
      getDatas(query);
    }
  };

  useEffect(() => {
    getUserLevelList();
  }, []);

  return (
    <PageHeaderWrapper title={false}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <FilterList fileds={searchFileds} onSearch={getDatas} params={query} />
        <div>
          <Button
            type={'primary'}
            onClick={() => {
              setAction('add');
              setDetail({ role_id: undefined });
              setVisible(true);
            }}
          >
            添加子账号
          </Button>
          <Button
            type={'primary'}
            onClick={() => {
              setShowRecharge(true);
              setType('deposit_level_ids');
            }}
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            充值分层设置
          </Button>
          <Button
            type={'primary'}
            onClick={() => {
              setShowRecharge(true);
              setType('withdrawal_level_ids');
            }}
          >
            提款分层设置
          </Button>
        </div>
      </div>
      <ProTable
        columns={columns}
        rowKey="id"
        bordered
        size="small"
        headerTitle=""
        search={false}
        dataSource={dataList}
        options={{
          fullScreen: false,
          setting: true,
          reload: true,
          density: true,
        }}
        scroll={{ y: 600 }}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 20,
          position: 'bottom',
          showQuickJumper: true,
          showTotal: (total, range) => `共${total}条记录`,
        }}
      />
      {renderModel()}
      {renderRechargeModel()}
    </PageHeaderWrapper>
  );
};
export default connect(({ user, common }: ConnectState) => ({
  user,
  common,
}))(ChildAccount);
