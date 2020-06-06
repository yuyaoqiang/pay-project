import { Form, Input, Modal } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (value: { name: string; nick_name: string; password: string }, form: any) => void;
  onCancel: () => void;
  agent: any;
  agentDetail: any;
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const UpdateComponent: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, onSubmit, onCancel, agent, agentDetail } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      onSubmit(fieldsValue, form);
    });
  };
  return (
    <Modal
      destroyOnClose
      title="修改总代理"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      <Form {...formItemLayout}>
        <FormItem label="账号">
          {form.getFieldDecorator('name', {
            rules: [
              { required: true, message: '必须是字母开头的6-15位字母或字母和数字组合', min: 5 },
            ],
          })(<Input placeholder="请输入总代理账号" allowClear />)}
        </FormItem>
        <FormItem label="状态">
          {form.getFieldDecorator('status', {
            rules: [
              { required: true, message: '必须是字母开头的6-15位字母或字母和数字组合', min: 5 },
            ],
          })(<Input placeholder="请输入总代理账号" allowClear />)}
        </FormItem>
        <FormItem label="真实姓名">
          {form.getFieldDecorator('real_name', {
            rules: [{ required: true, message: '限2-8位非空字符', min: 5 }],
          })(<Input placeholder="请输入总代理名称" allowClear />)}
        </FormItem>
        <FormItem label="电话号码">
          {form.getFieldDecorator('password', {
            rules: [{ required: true, message: '登录密码为6~20位字母数字组合', min: 5 }],
          })(<Input placeholder="请输入登录密码" allowClear />)}
        </FormItem>
        <FormItem label="邮箱账号">
          {form.getFieldDecorator('password', {
            rules: [{ required: true, message: '登录密码为6~20位字母数字组合', min: 5 }],
          })(<Input placeholder="请输入登录密码" allowClear />)}
        </FormItem>
        <FormItem label="QQ号码">
          {form.getFieldDecorator('password', {
            rules: [{ required: true, message: '登录密码为6~20位字母数字组合', min: 5 }],
          })(<Input placeholder="请输入登录密码" allowClear />)}
        </FormItem>
        <FormItem label="备注信息">
          {form.getFieldDecorator('password', {
            rules: [{ required: true, message: '登录密码为6~20位字母数字组合', min: 5 }],
          })(<Input placeholder="请输入登录密码" allowClear />)}
        </FormItem>
        <FormItem label="开启修改赔率">
          {form.getFieldDecorator('password', {
            rules: [{ required: true, message: '登录密码为6~20位字母数字组合', min: 5 }],
          })(<Input placeholder="请输入登录密码" allowClear />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(UpdateComponent);
