import React, { useState, useEffect } from 'react';
import { Form, Modal, Row, Col, DatePicker } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';
import { helpers } from '@/utils';
import 'braft-editor/dist/index.css';

const AddUpDataComponent: React.FC<ModalFormProps> = props => {
  const { modalVisible, form, onSubmit, onCancel } = props;
  const { confirmLoading, defulat = {}, payCategory } = props;
  const renderItems = [
    {
      type: 'input',
      label: '银行名称',
      key: 'bankName',
      validator: validator.onlyRequier,
      defulatVal: defulat.bankName,
      placeholder: '请输入银行名称',
    },
    {
      type: 'input',
      label: '开户人',
      key: 'accountName',
      validator: validator.onlyRequier,
      defulatVal: defulat.accountName,
      placeholder: '请输入开户人',
    },
    {
      type: 'input',
      label: '卡号',
      key: 'accountNumber',
      validator: validator.onlyRequier,
      defulatVal: defulat.accountNumber,
      placeholder: '请输入卡号',
    },
    {
      type: 'select',
      label: '状态',
      key: 'state',
      validator: validator.onlyRequier,
      defulatVal: defulat.state+'',
      placeholder: '请选择状态',
      formData: [
        {
          name:'启用',
          type:'false'
        },
        {
          name:'禁用',
          type:'true'
        }
      ]
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
        <GenerateFormCompoents formItems={renderItems} form={form} />
      </Form>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(AddUpDataComponent);
