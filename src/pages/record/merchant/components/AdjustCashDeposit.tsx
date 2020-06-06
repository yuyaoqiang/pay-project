
import React, { useState } from 'react';
import { Form, Modal,message } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';

const UpdatePsd: React.FC<ModalFormProps> = props => {
  const { modalVisible, form, dispatch, onCancel, confirmLoading, defulat = {} } = props;
  const { actionRef } = props;

  const addForm = [
    {
      type: 'input',
      label: '商户名称',
      key: 'merchantName',
      disabled:true,
      validator: validator.onlyRequier,
      defulatVal: defulat.merchantName,
      placeholder: '请输入商户名称',
    },
    {
      type: 'input',
      label: '原可提现金额',
      key: 'withdrawableAmount',
      disabled:true,
      validator: validator.onlyRequier,
      defulatVal: defulat.withdrawableAmount,
      placeholder: '请输入原可提现金额',
    },
    {
      type: 'select',
      label: '帐变类型',
      key: 'accountChangeTypeCode',
      validator: validator.onlyRequier,
      defulatVal: '',
      formData: [
        { type: '', name: '请选择' },
        { type: "8", name: '手工增保证金' },
        { type: "9", name: '手工减保证金' },
      ],
      placeholder: '请选择',
    },
    {
      type: 'input',
      label: '帐变金额',
      key: 'accountChangeAmount',
      validator: validator.onlyRequier,
      defulatVal: defulat.accountChangeAmount,
      placeholder: '请输入帐变金额',
    },
  ];
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (hasModity) {
        fieldsValue.merchantId = defulat.id;
      }
      dispatch({
        type:'merchant/adjustWithdrawableAmount',
        payload: { params:{...fieldsValue} },
      }).then(data => {
        message.success("修改成功");
        onCancel();
        actionRef.current?.reload();
      });
    });
  };
  const { hasModity } = props;
  return (
    <Modal
      width={500}
      destroyOnClose
      confirmLoading={confirmLoading}
      title={'调整金额'}
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
