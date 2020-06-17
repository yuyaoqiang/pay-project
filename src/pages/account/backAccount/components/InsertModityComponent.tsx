import React, { useState } from 'react';
import { Form, Modal } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';
import { helpers } from '@/utils';

const status = [
  { name: '启用', type: '1' },
  { name: '禁用', type: '0' },
];

const AddUpDataComponent: React.FC<ModalFormProps> = props => {
  const { modalVisible, form, onSubmit, onCancel, confirmLoading, defulat = {} } = props;

  const addForm = [
    {
      type: 'input',
      label: '账号',
      key: 'userName',
      validator: validator.onlyRequier,
      defulatVal: defulat.userName,
      placeholder: '请输入账号',
    },
    {
      type: 'input',
      label: '姓名',
      key: 'realName',
      validator: validator.onlyRequier,
      defulatVal: defulat.realName,
      placeholder: '请输入姓名',
    },
    {
      type: 'input',
      label: '电话',
      key: 'mobile',
      validator: validator.checkPhoneNumber,
      defulatVal: defulat.mobile,
      placeholder: '请输入电话',
    },
  ];

  const updateForm = [
    {
      type: 'radio',
      label: '状态',
      key: 'state',
      placeholder: ' ',
      validator: validator.onlyRequier,
      defulatVal: defulat.state,
      formData: status,
    },
  ];
  const addFormPlugin = [
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
      onSubmit({...defulat,...fieldsValue} );
    });
  };
  const { hasModity } = props;
  const formItems = helpers.isJudge(hasModity)(addForm, addForm);
  return (
    <Modal
      width={500}
      destroyOnClose
      confirmLoading={confirmLoading}
      title={helpers.isJudge(hasModity)('修改账号', '添加账号')}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      <Form>
        <GenerateFormCompoents formItems={formItems} form={form} />
        {helpers.isJudge(hasModity)(
          <GenerateFormCompoents formItems={updateForm} form={form} />,
          <GenerateFormCompoents formItems={addFormPlugin} form={form} />,
        )}
      </Form>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(AddUpDataComponent);
