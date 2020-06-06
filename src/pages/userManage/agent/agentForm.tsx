import React from 'react';
import { Form, Modal } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';

const AgentFormComponent = props => {
  const { form, modalVisible, onSubmit, onCancel, confirmLoading, type, banks, agentInfo } = props;
  const addForm = [
    {
      type: 'input',
      label: '代理账号',
      key: 'name',
      validator: validator.checkAccount,
      placeholder: '请输入代理账号',
    },
    {
      type: 'input_password',
      label: '登录密码',
      key: 'passwd',
      validator: validator.checkPassword,
      placeholder: '请输入登录密码',
    },
    {
      type: 'input_password',
      label: '提款密码',
      key: 'drew_passwd',
      validator: validator.check_4_number,
      placeholder: '请输入提款密码(4位纯数字)',
    },
    {
      type: 'input',
      label: '代理名称',
      key: 'nickname',
      validator: validator.check2_8_number,
      placeholder: '请输入代理名称',
    },
    {
      type: 'radio',
      label: '是否为系统代理',
      defulatVal: 0,
      key: 'agent_type',
      validator: validator.onlyRequier,
      formData: [
        { type: 0, name: '是' },
        { type: 1, name: '否' },
      ],
    },
    {
      type: 'radio',
      label: '开启修改赔率',
      defulatVal: false,
      key: 'can_set_odds',
      validator: validator.onlyRequier,
      formData: [
        { type: false, name: '关闭' },
        { type: true, name: '启动' },
      ],
    },
    {
      type: 'radio',
      label: '开启第三方游戏返水',
      defulatVal: 0,
      key: 'open_third_rebate',
      validator: validator.onlyRequier,
      formData: [
        { type: 0, name: '关闭' },
        { type: 1, name: '启用' },
      ],
    },
  ];
  const modifyForm = [
    {
      type: 'input',
      label: '代理账号',
      key: 'name',
      defulatVal: agentInfo.name,
      disabled: true,
    },
    {
      type: 'radio',
      label: '状态',
      key: 'status',
      defulatVal: agentInfo.status,
      validator: validator.onlyRequier,
      formData: [
        { type: 0, name: '正常' },
        { type: 1, name: '停用' },
        { type: 2, name: '冻结' },
      ],
    },
    {
      type: 'radio',
      label: '是否为系统代理',
      defulatVal: agentInfo.agent_type,
      key: 'agent_type',
      validator: validator.onlyRequier,
      formData: [
        { type: 0, name: '是' },
        { type: 1, name: '否' },
      ],
    },
    {
      type: 'input_password',
      label: '登录密码',
      key: 'password',
      placeholder: '请输入新的登录密码(留空则不修改)',
    },
    {
      type: 'input',
      label: '真实姓名',
      key: 'real_name',
      defulatVal: agentInfo.real_name,
      placeholder: '请输入新的真实姓名，2-15个汉字或·',
    },
    {
      type: 'select',
      label: '开户银行',
      key: 'bank_type',
      placeholder: '请选择开户银行',
      defulatVal: agentInfo.bank_type ? agentInfo.bank_type : undefined,
      formData: banks.map(item => {
        return { ...item, key: item.id, type: item.name };
      }),
    },
    {
      type: 'input',
      label: '银行账号',
      key: 'bank_no',
      defulatVal: agentInfo.bank_no,
      placeholder: '请输入新的真实姓名，2-15个汉字或·',
    },
    {
      type: 'input',
      label: '支行地址',
      key: 'bank_address',
      defulatVal: agentInfo.bank_address,
      placeholder: '请输入新的支行地址',
    },
    {
      type: 'input',
      label: '电话号码',
      key: 'phone',
      defulatVal: agentInfo.phone,
      placeholder: '请输入新的电话号码',
    },
    {
      type: 'input',
      label: '邮箱账号',
      key: 'email',
      defulatVal: agentInfo.email,
      placeholder: '请输入新的邮箱账号',
    },
    {
      type: 'input',
      label: 'QQ-号码',
      key: 'qq',
      defulatVal: agentInfo.qq,
      placeholder: '请输新的入QQ号码',
    },
    {
      type: 'input',
      label: '提款密码',
      key: 'drew_passwd',
      defaultVal: agentInfo.drew_passwd,
      placeholder: '请输入新的提款密码(4位纯数字)',
    },
    {
      type: 'input',
      label: '备注信息',
      key: 'remark',
      defaultVal: agentInfo.remark,
      placeholder: '请输入新的备注信息',
    },
    {
      type: 'radio',
      label: '开启修改赔率',
      key: 'can_set_odds',
      defulatVal: agentInfo.can_set_odds,
      validator: validator.onlyRequier,
      formData: [
        { type: false, name: '关闭' },
        { type: true, name: '启用' },
      ],
    },
    {
      type: 'radio',
      label: '开启第三方游戏返水',
      key: 'open_third_rebate',
      defulatVal: agentInfo.open_third_rebate,
      validator: validator.onlyRequier,
      formData: [
        { type: 0, name: '关闭' },
        { type: 1, name: '启用' },
      ],
    },
    {
      type: 'radio',
      label: '显示聊天室',
      key: 'show_chatroom',
      defulatVal: agentInfo.show_chatroom,
      validator: validator.onlyRequier,
      formData: [
        { type: 0, name: '不显示' },
        { type: 1, name: '显示' },
      ],
    },
    {
      type: 'radio',
      label: '显示在线客服',
      key: 'show_online_service',
      defulatVal: agentInfo.show_online_service,
      validator: validator.onlyRequier,
      formData: [
        { type: 0, name: '不显示' },
        { type: 1, name: '显示' },
      ],
    },
    {
      type: 'radio',
      label: '显示开奖直播',
      key: 'show_lottery_live',
      defulatVal: agentInfo.show_lottery_live,
      validator: validator.onlyRequier,
      formData: [
        { type: 0, name: '不显示' },
        { type: 1, name: '显示' },
      ],
    },
    {
      type: 'radio',
      label: '显示手机APP下载',
      key: 'show_appdownload',
      defulatVal: agentInfo.show_appdownload,
      validator: validator.onlyRequier,
      formData: [
        { type: 0, name: '不显示' },
        { type: 1, name: '显示' },
      ],
    },
  ];
  const okHandle = url => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      onSubmit(fieldsValue, url);
    });
  };

  return (
    <Modal
      width={600}
      destroyOnClose
      title={type === 'add' ? '添加代理' : '修改代理'}
      confirmLoading={confirmLoading}
      visible={modalVisible}
      onOk={() => {
        const url = type === 'add' ? 'agent/addAgent' : 'agent/modifyAgent';
        okHandle(url);
      }}
      onCancel={() => {
        onCancel(false);
      }}
      centered
    >
      <Form>
        <GenerateFormCompoents formItems={type === 'add' ? addForm : modifyForm} form={form} />
      </Form>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(AgentFormComponent);
