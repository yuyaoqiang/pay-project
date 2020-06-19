
import React, { useState } from 'react';
import { Form, Modal, message } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';
import { helpers } from '@/utils';

const ModifyMoneyPwd: React.FC<ModalFormProps> = props => {
  const { modalVisible, form, onSubmit, onCancel, confirmLoading, defulat = {} } = props;

  const addForm = [
    {
      type: 'input',
      label: '旧的资金密码',
      key: 'oldMoneyPwd',
      validator: validator.onlyRequier,
      placeholder: '请输入旧的资金密码',
    },
    {
      type: 'input',
      label: '资金密码',
      key: 'newMoneyPwd',
      validator: validator.checkAccount,
      placeholder: '请输入资金密码',
    },
    {
      type: 'input',
      label: '确认资金密码',
      key: 'newMoneyPwd2',
      validator: validator.checkAccount,
      placeholder: '请输入确认资金密码',
    },
  ];
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (fieldsValue.newMoneyPwd2!=fieldsValue.newMoneyPwd) {
        message.warn("两次资金密码不一致")
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

export default Form.create<ModalFormProps>()(ModifyMoneyPwd);
