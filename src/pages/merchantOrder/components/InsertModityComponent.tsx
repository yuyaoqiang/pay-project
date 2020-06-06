import React, { useState, useEffect } from 'react';
import { Form, Modal, Card, Button, Table } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import EditableCell, { EditableFormRow } from './index';
import _ from 'lodash';
import sytles from '../style.less';
const newData = {
  gatheringChannelCode:'',
  gatheringAmount:'',
  orderNo:'',
  attch:'',
  publishWay:1,
  publishTime:'',
}
const AddUpDataComponent: React.FC<ModalFormProps> = props => {
  const { modalVisible, form, onSubmit, onCancel, confirmLoading, defulat = {} } = props;
  const { hasModity } = props;
  const [fromData, setFromData] = useState([]);
  useEffect(()=>{
    setFromData([...fromData,newData])
  },[])
  const columns = [
    {
      title: '通道',
      dataIndex: 'gatheringChannelCode',
      editable: true,
      align: 'center',
      palceholder: '请选择',
    },
    {
      title: '金额',
      dataIndex: 'gatheringAmount',
      editable: true,
      align: 'center',
      palceholder: '请输入',
    },
    {
      title: '商户订单号',
      dataIndex: 'orderNo',
      editable: true,
      align: 'center',
      palceholder: '请选择',
    },
    {
      title: '附加信息',
      dataIndex: 'attch',
      editable: true,
      align: 'center',
      palceholder: '请选择',
    },
    {
      title: '发单方式',
      dataIndex: 'publishWay',
      editable: true,
      align: 'center',
      palceholder: '请选择',
    },
    {
      title: '发单时间',
      dataIndex: 'publishTime',
      editable: true,
      align: 'center',
      palceholder: '请选择',
    },
    {
      title: '操作',
      dataIndex: 'operaiton',
      align: 'center',
      render: (text, record, index) => {
        return <Button type={"danger"} size={"small"} onClick={() => handleDel(index)}>删除</Button>;
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
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (hasModity) {
        fieldsValue.id = defulat.id;
      }
      onSubmit(fieldsValue);
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
  const handleAdd=()=>{
    setFromData([...fromData,newData])
  }
  return (
    <Modal
      width={1300}
      style={{padding:'10px'}}
      destroyOnClose
      confirmLoading={confirmLoading}
      title={'新增订单'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
       <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
          新增
        </Button>
      <Table
        style={{height:'400px',margin:'0 10px'}}
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        size={'small'}
        key={'index'}
        dataSource={fromData}
        columns={columnsData}
        pagination={false}
        scroll={{ y: 300 }}
      />
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(AddUpDataComponent);
