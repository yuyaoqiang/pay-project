
import React, { useState } from 'react';
import { Form, Modal, message } from 'antd';
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
      label: '旧的登录密码',
      key: 'oldLoginPwd',
      validator: validator.onlyRequier,
      placeholder: '请输入旧的登录密码',
    },
    {
      type: 'input',
      label: '登录密码',
      key: 'newLoginPwd',
      validator: validator.checkAccount,
      placeholder: '请输入登录密码',
    },
    {
      type: 'input',
      label: '确认登录密码',
      key: 'newLoginPwd2',
      validator: validator.checkAccount,
      placeholder: '请输入确认登录密码',
    },
  ];
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (fieldsValue.newLoginPwd!=fieldsValue.newLoginPwd2) {
        message.warn("两次密码不一致")
        return;
      }
      onSubmit(fieldsValue);
    });
  };
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
