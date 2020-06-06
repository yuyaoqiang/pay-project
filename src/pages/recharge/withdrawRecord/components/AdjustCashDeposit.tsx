import React, { useState } from 'react';
import { Form, Modal, message, Descriptions, Divider, Button } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';
import { helpers } from '@/utils';
const UpdatePsd: React.FC<ModalFormProps> = props => {
  const { modalVisible, form, dispatch, onCancel, hasModity, defulat = {} } = props;
  const { actionRef } = props;
  const addForm = [
    {
      type: 'textarea',
      label: '备注说明',
      key: 'note',
      disabled: true,
      validator: validator.onlyRequier,
      defulatVal: defulat.note,
      placeholder: '请输入备注说明',
    },
  ];

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.id = defulat.id;
      fieldsValue.actualPayAmount = fieldsValue.rechargeAmount;
      Modal.confirm({
        title: '提示',
        content: `确认要提交吗？`,
        onOk: () => {
          dispatch({
            type: 'withdrawRecord/approved',
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
  const rejectHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.id = defulat.id;
      Modal.confirm({
        title: '提示',
        content: `确定审核不通过吗`,
        onOk: () => {
          dispatch({
            type: 'withdrawRecord/notApproved',
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
        <Descriptions.Item label="开户银行">{defulat.openAccountBank}</Descriptions.Item>
        <Descriptions.Item label="开户人">{defulat.accountHolder}</Descriptions.Item>
        <Descriptions.Item label="卡号">{defulat.bankCardAccount}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions size={'small'} column={2} layout="vertical" bordered>
        <Descriptions.Item label="发起用户">{defulat.userName}</Descriptions.Item>
        <Descriptions.Item label="提现金额">{defulat.withdrawAmount}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Form>
        <GenerateFormCompoents formItems={addForm} form={form} />
      </Form>
      <div style={{ textAlign: 'center' }}>
        {helpers.isJudge(hasModity)(
          <Button
            style={{ marginRight: 5 }}
            type={'primary'}
            onClick={() => {
              okHandle();
            }}
          >
            审核通过
          </Button>,
          null,
        )}

        <Button
          type={'danger'}
          style={{ marginLeft: 5 }}
          onClick={() => {
            rejectHandle();
          }}
        >
          审核不通过
        </Button>
      </div>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(UpdatePsd);
