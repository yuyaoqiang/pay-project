
import React, { useState } from 'react';
import { Form, Modal,Table } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import _ from 'lodash';
const AllLowerLevelAccount: React.FC<ModalFormProps> = props => {
  const { modalVisible, form, onSubmit, onCancel, confirmLoading, defulat = {} } = props;
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '12%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '30%',
      key: 'address',
    },
  ];
  const data = [
    {
      key: 1,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      children: [
        {
          key: 11,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park',
        },
        {
          key: 12,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
          children: [
            {
              key: 121,
              name: 'Jimmy Brown',
              age: 16,
              address: 'New York No. 3 Lake Park',
            },
          ],
        },
        {
          key: 13,
          name: 'Jim Green sr.',
          age: 72,
          address: 'London No. 1 Lake Park',
          children: [
            {
              key: 131,
              name: 'Jim Green',
              age: 42,
              address: 'London No. 2 Lake Park',
              children: [
                {
                  key: 1311,
                  name: 'Jim Green jr.',
                  age: 25,
                  address: 'London No. 3 Lake Park',
                },
                {
                  key: 1312,
                  name: 'Jimmy Green sr.',
                  age: 18,
                  address: 'London No. 4 Lake Park',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    },
    onSelect: (record, selected, selectedRows) => {
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
    },
  };

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (hasModity) {
        fieldsValue.id = defulat.id;
      }
      onSubmit(fieldsValue);
    });
  };
  const { hasModity } = props;
  return (
    <Modal
      width={1200}
      bodyStyle={{height:530}}
      destroyOnClose
      centered
      confirmLoading={confirmLoading}
      title={'下级列表'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        onCancel();
      }}
    >
       <Table columns={columns} scroll={{y:400}} rowSelection={rowSelection} pagination={false} dataSource={data} />
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(AllLowerLevelAccount);
