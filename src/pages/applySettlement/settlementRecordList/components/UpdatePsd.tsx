
import React, { useState } from 'react';
import { Form, Modal } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';
import { helpers } from '@/utils';

const UpdatePsd: React.FC<ModalFormProps> = props => {
  const { modalVisible, form, onSubmit, onCancel, confirmLoading, defulat = {} } = props;

  const addForm = [
    {
      type: 'input',
      label: '账号',
      key: 'userName',
      disabled:true,
      validator: validator.onlyRequier,
      defulatVal: defulat.userName,
      placeholder: '请输入账号',
    },
    {
      type: 'input',
      label: '姓名',disable:true,
      key: 'realName',
      disabled:true,
      validator: validator.onlyRequier,
      defulatVal: defulat.realName,
      placeholder: '请输入姓名',
    },
    {
      type: 'input',
      label: '密码',
      key: 'loginPwd',
      validator: validator.onlyRequier,
      defulatVal: defulat.loginPwd,
      placeholder: '请输入密码',
    },
  ];
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
      width={500}
      destroyOnClose
      confirmLoading={confirmLoading}
      title={'修改密码'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      <Form>
        <GenerateFormCompoents formItems={addForm} form={form} />
      </Form>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(UpdatePsd);
