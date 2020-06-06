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
      label: '充值类型',
      key: 'type',
      validator: validator.onlyRequier,
      defulatVal: defulat.type,
      placeholder: '请输入充值类型',
    },
    {
      type: 'input',
      label: '名称',
      key: 'name',
      validator: validator.onlyRequier,
      defulatVal: defulat.name,
      placeholder: '请输入名称',
    },
    {
      type: 'select',
      label: '所属类别',
      key: 'payCategory',
      validator: validator.onlyRequier,
      defulatVal: defulat.payCategory,
      placeholder: '请选择所属类别',
      formData: payCategory.map(item => {
        return {
          ...item,
          key: item.dictItemCode,
          type: item.dictItemCode,
          name: item.dictItemName,
        };
      }),
    },
    {
      type: 'input',
      label: '排序号',
      key: 'orderNo',
      validator: validator.onlyRequier,
      defulatVal: defulat.orderNo,
      placeholder: '请选择所属类别',
    },
    {
      type: 'select',
      label: '是否启用',
      key: 'enabled',
      validator: validator.onlyRequier,
      defulatVal: helpers.isJudge(String(defulat.enabled) == 'undefined')('true',String(defulat.enabled)),
      placeholder: '请选择是否启用',
      formData: [
        {
          type: 'true',
          name: '启用',
          key: '1',
        },
        {
          type: 'false',
          name: '禁用',
          key: '2',
        },
      ],
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
