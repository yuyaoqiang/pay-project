import React, { useState, useEffect } from 'react';
import { Form, Modal, Card, Button, Table ,message} from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import EditableCell, { EditableFormRow } from './index';
import _ from 'lodash';
const  newData={
  channelCode:'-1',
  rebate:'0',
  state:'1',
}
const ConfigChannle: React.FC<ModalFormProps> = props => {
  const { modalVisible, onCancel, confirmLoading, defulat = {} } = props;
  const { hasModity, dispatch,handleModalVisible,actionRef } = props;
  const [fromData, setFromData] = useState([]);
  useEffect(() => {
    getDatas();

  }, []);

  const getDatas = () => {
    const params = { accountId: defulat.id };
    return dispatch({
      type: 'agent/findAccountReceiveOrderChannelByAccountId',
      payload: { params },
    }).then(data => {
      setFromData(data.data);
    });
  };

  const columns = [
    {
      title: '通道',
      dataIndex: 'channelCode',
      editable: true,
      align: 'center',
      palceholder: '请选择',
    },
    {
      title: '返点',
      dataIndex: 'rebate',
      editable: true,
      align: 'center',
      palceholder: '请输入',
    },
    {
      title: '状态',
      dataIndex: 'state',
      editable: true,
      align: 'center',
      palceholder: '请选择',
    },
    {
      title: '操作',
      dataIndex: 'operaiton',
      align: 'center',
      render: (text, record, index) => {
        return (
          <Button type={'danger'} size={'small'} onClick={() => handleDel(index)}>
            删除
          </Button>
        );
      },
    },
  ];
  const handleDel = i => {
    setFromData(fromData.filter((item, index) => i !== index));
  };
  const handleSave = (row, index) => {
    const newData = [...fromData];
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setFromData(newData);
  };
  const okHandle = () => {
    const params={channels:fromData,userAccountId:defulat.id}
    dispatch({
      type:'agent/saveAccountReceiveOrderChannel',
      payload: { params },
    }).then(data => {
      message.success("修改成功");
      handleModalVisible();
      actionRef.current?.reload();
    });
  };
  const columnsData: any = columns.map(col => {
    return {
      ...col,
      onCell: (record, index) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        align: col.align,
        index: index,
        placeholder: col.palceholder,
        handleSave: handleSave,
      }),
    };
  });
  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell,
    },
  };
  const handleAdd = () => {
    setFromData([...fromData, newData]);
  };
  return (
    <Modal
      width={800}
      style={{ padding: '10px' }}
      destroyOnClose
      confirmLoading={confirmLoading}
      title={'接单通道设置'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      <div style={{textAlign:'right'}}>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>增加</Button>
      </div>
      <Table
        loading={confirmLoading}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        size={'small'}
        key={'id'}
        dataSource={fromData}
        columns={columnsData}
        pagination={false}
        scroll={{ y: 300 }}
      />
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(ConfigChannle);
