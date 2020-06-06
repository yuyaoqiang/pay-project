import React, { useState, useEffect } from 'react';
import { Form, Modal, Table } from 'antd';
import { TableListItem } from '../data';
import ProTable from '@ant-design/pro-table';
import _ from 'lodash';

const BankCard = props => {
  const { modalVisible, onCancel, confirmLoading, defulat = {} } = props;
  const { dispatch } = props;
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    getDatas();
  }, [defulat]);
  const getDatas = () => {
    return dispatch({
      type: 'agent/findBankCardByUserAccountId',
      payload: { params: { userAccountId: defulat.id } },
    }).then(data => setDatas(data.data));
  };
  const columns: any = [
    {
      title: '开户人',
      dataIndex: 'accountHolder',
      align: 'center',
    },
    {
      title: '开户银行',
      dataIndex: 'openAccountBank',
      align: 'center',
    },
    {
      title: '卡号',
      dataIndex: 'bankCardAccount',
      align: 'center',
      hideInSearch: true,
    },
  ];
  return (
    <Modal
      width={800}
      destroyOnClose
      title={'我的银行卡'}
      visible={modalVisible}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      <Table
        loading={confirmLoading}
        dataSource={datas}
        rowKey={'id'}
        columns={columns}
        pagination={false}
      />
    </Modal>
  );
};

export default BankCard;
