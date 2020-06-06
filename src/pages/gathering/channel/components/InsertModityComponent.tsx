import React, { useState, useEffect } from 'react';
import { FromItemLayout } from '@/general';
import { Form, Modal, Row, Col, Button } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';
import { helpers } from '@/utils';

const status = [
  { name: '开启', type: true },
  { name: '关闭', type: false },
];
const status2 = [
  { name: '启用', type: true },
  { name: '禁用', type: false },
];
const defulatItemLayout_2 = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 12,
  },
};
const AddUpDataComponent: React.FC<ModalFormProps> = props => {
  const { modalVisible, form, onSubmit, onCancel } = props;
  const { confirmLoading, defulat = {} } = props;
  const renderItems = [
    {
      type: 'input',
      label: '通道code',
      key: 'channelCode',
      validator: validator.onlyRequier,
      defulatVal: defulat.channelCode,
      placeholder: '请输入账号',
    },
    {
      type: 'input',
      label: '通道名称',
      key: 'channelName',
      validator: validator.onlyRequier,
      defulatVal: defulat.channelName,
      placeholder: '请输入姓名',
    },
    {
      type: 'input',
      label: '默认接单返点',
      key: 'defaultReceiveOrderRabate',
      validator: validator.onlyRequier,
      defulatVal: defulat.defaultReceiveOrderRabate,
      placeholder: '请输入账号',
    },
    {
      type: 'select',
      label: '是否启用',
      key: 'enabled',
      placeholder: ' ',
      validator: validator.onlyRequier,
      defulatVal: helpers.isJudge(defulat.enabled === undefined)(true, defulat.enabled),
      formData: status2,
    },
  ];
  const plugin = [
    {
      type: 'select',
      label: '添加收款方式时需设置单笔限额',
      key: 'gatheringWayLimit',
      placeholder: ' ',
      validator: validator.onlyRequier,
      defulatVal: helpers.isJudge(defulat.gatheringWayLimit === undefined)(true, defulat.gatheringWayLimit),
      formData: status,
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
      width={600}
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
        <GenerateFormCompoents formItems={renderItems} form={form} />
        <GenerateFormCompoents formItems={plugin} form={form} itemLayout={defulatItemLayout_2} />
      </Form>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(AddUpDataComponent);
