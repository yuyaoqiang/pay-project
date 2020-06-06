import React, { useState, useEffect } from 'react';
import { Form, Modal, Table } from 'antd';
import { TableListItem } from '../data';
import ProTable from '@ant-design/pro-table';
import _ from 'lodash';

const VirtualWallet = props => {
  const { modalVisible, onCancel, confirmLoading, defulat = {} } = props;
  const { dispatch } = props;
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    getDatas();
  }, [defulat]);
  const getDatas = () => {
    return dispatch({
      type: 'agent/findVirtualWalletByUserAccountId',
      payload: { params: { userAccountId: defulat.id } },
    }).then(data => setDatas(data.data));
  };
  const columns: any = [
    {
      title: '钱包类型',
      dataIndex: 'virtualWalletType',
      align: 'center',
    },
    {
      title: '钱包地址',
      dataIndex: 'virtualWalletAddr',
      align: 'center',
    },
  ];
  return (
    <Modal
      width={800}
      destroyOnClose
      title={'我的电子钱包'}
      visible={modalVisible}
      onCancel={() => {
        onCancel();
      }}
      onOk={() => {
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

export default VirtualWallet;
