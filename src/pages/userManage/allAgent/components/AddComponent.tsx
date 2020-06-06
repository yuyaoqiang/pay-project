import React from 'react';
import { Form, Modal } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
const defulatItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const formItems = [
  {
    type: 'input',
    label: '总代理账号',
    key: 'name',
    validator: validator.checkAccount,
    placeholder: '请输入总代理账号',
  },
  {
    type: 'input',
    label: '总代理名称',
    key: 'nick_name',
    validator: validator.check2_8_number,
    placeholder: '请输入总代理名称',
  },
  {
    type: 'input',
    label: '登录密码',
    key: 'password',
    validator: validator.checkPassword,
    placeholder: '请输入登录密码',
  },
];
const AddComponent: React.FC<ModalFormProps> = props => {
  const { modalVisible, form, onSubmit, onCancel, confirmLoading } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      onSubmit(fieldsValue);
    });
  };
  return (
    <Modal
      width={500}
      destroyOnClose
      confirmLoading={confirmLoading}
      title="添加总代理"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      <Form {...defulatItemLayout}>
        <GenerateFormCompoents formItems={formItems} form={form} />
      </Form>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(AddComponent);
