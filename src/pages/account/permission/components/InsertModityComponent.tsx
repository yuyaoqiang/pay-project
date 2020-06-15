import React, { useState, useEffect } from 'react';
import { Form, Modal, Row, Col, DatePicker } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import BraftEditor from 'braft-editor';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';
import moment from 'moment';
import { helpers } from '@/utils';
import 'braft-editor/dist/index.css';
const FormItem = Form.Item;
const defulatItemLayout_2 = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};
const AddUpDataComponent: React.FC<ModalFormProps> = props => {
  const { modalVisible, form, onSubmit, onCancel } = props;
  const { confirmLoading, defulat = {} } = props;
  const [dateRange, setDateRange] = useState({
    hasRadio: '',
    date: moment(),
  });
  const status = [
    { name: '可用', type: 'ENABLE' },
    { name: '不可用', type: 'DISABLE' },
  ];

  const renderItems = [
    {
      type: 'input',
      label: '名称',
      key: 'name',
      validator: validator.onlyRequier,
      defulatVal: defulat.name,
      placeholder: '请输入名称',
    },
    {
      type: 'radio',
      label: '状态',
      key: 'status',
      validator: validator.onlyRequier,
      defulatVal: defulat.status,
      formData: status,
      placeholder: '请输入字典名称',
    },
    {
      type: 'textarea',
      label: '描述',
      key: 'description',
      validator: validator.onlyRequier,
      defulatVal: defulat.description,
      placeholder: '请输入描述',
    },
  ];
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (hasModity) {
        fieldsValue.id = defulat.id;
      }
      onSubmit({ ...defulat, ...fieldsValue });
    });
  };
  const { hasModity } = props;
  return (
    <Modal
      width={500}
      destroyOnClose
      confirmLoading={confirmLoading}
      title={helpers.isJudge(hasModity)('修改', '添加')}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      <Form>
        <GenerateFormCompoents formItems={renderItems} form={form} itemLayout={defulatItemLayout_2}/>
      </Form>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(AddUpDataComponent);
