import React, { useState } from 'react';
import { Form, Modal, message, Descriptions, Divider, Button } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';
const status = [
  { name: '人工取消', type: '5' },
  { name: '确认已支付', type: '2' },
];
const UpdatePsd: React.FC<ModalFormProps> = props => {
  const { modalVisible, form, dispatch, onCancel, confirmLoading, defulat = {} } = props;
  const { actionRef } = props;
  const addForm = [
    {
      type: 'input_number',
      label: '实际存款金额',
      key: 'rechargeAmount',
      validator: validator.onlyRequier,
      defulatVal: defulat.rechargeAmount,
      placeholder: '请输入实际存款金额',
    },
    {
      type: 'select',
      label: '审核结果',
      key: 'approvalResult',
      validator: validator.onlyRequier,
      defulatVal: defulat.approvalResult,
      formData: status,
      placeholder: '请选择审核结果',
    },
  ];

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.id = defulat.id;
      fieldsValue.actualPayAmount= fieldsValue.rechargeAmount
      Modal.confirm({
        title: '提示',
        content: `确认要提交吗？`,
        onOk: () => {
          dispatch({
            type: 'rechargeOrder/approval',
            payload: { params: { ...fieldsValue } },
          }).then(data => {
            onCancel();
            message.success('操作成功');
            actionRef.current?.reload();

          });
        },
      });
    });
  };
  return (
    <Modal
      width={600}
      destroyOnClose
      title={'结算审核'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        onCancel();
      }}
      footer={[]}
      centered
    >
      <Descriptions size={'small'} column={5} layout="vertical" bordered>
        <Descriptions.Item label="收款银行">{defulat.bankName}</Descriptions.Item>
        <Descriptions.Item label="收款人">{defulat.accountHolder}</Descriptions.Item>
        <Descriptions.Item label="卡号">{defulat.bankCardAccount}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions size={'small'} column={4} layout="vertical" bordered>
        <Descriptions.Item label="充值用户">{defulat.userName}</Descriptions.Item>
        <Descriptions.Item label="存款人">{defulat.depositor}</Descriptions.Item>
        <Descriptions.Item label="存款时间">{defulat.depositTime}</Descriptions.Item>
        <Descriptions.Item label="存款金额">{defulat.rechargeAmount}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Form>
        <GenerateFormCompoents formItems={addForm} form={form} />
      </Form>
      <div style={{ textAlign: 'center' }}>
        <Button
          style={{ marginRight: 5 }}
          type={'primary'}
          onClick={() => {
            okHandle();
          }}
        >
          确定
        </Button>
        <Button type={'danger'} style={{ marginLeft: 5 }} onClick={() => onCancel()}>
          取消
        </Button>
      </div>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(UpdatePsd);
