import React, { useState } from 'react';
import { Form, Modal, message, Descriptions, Divider, Button, Spin } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';
import { helpers } from '@/utils';

const UpdatePsd: React.FC<ModalFormProps> = props => {
  const {
    modalVisible,
    form,
    dispatch,
    onCancel,
    confirmLoading,
    defulat = {},
    chukanBanks,
  } = props;
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
  const addFormPlugin = [
    {
      type: 'select',
      label: '下发卡',
      key: 'chukuanBankId',
      validator: validator.onlyRequier,
      defulatVal: defulat.chukuanBankId,
      formData: chukanBanks,
      placeholder: '请选择下发卡',
    },
  ];

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.id = defulat.id;
      Modal.confirm({
        title: '提示',
        content: `确认要通过审核吗？`,
        onOk: () => {
          dispatch({
            type: 'settlement/settlementApproved',
            payload: { params: { ...fieldsValue } },
          }).then(data => {
            message.success('操作成功');
            onCancel();
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
            type: 'settlement/settlementNotApproved',
            payload: { params: { ...fieldsValue } },
          }).then(data => {
            message.success('操作成功');
            onCancel();
            actionRef.current?.reload();
          });
        },
      });
    });
  };

  const { hasModity } = props;
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
      <Spin spinning={confirmLoading} delay={300}>
        <Descriptions size={'small'} column={5} layout="vertical" bordered>
          <Descriptions.Item label="商户">{defulat.merchantName}</Descriptions.Item>
          <Descriptions.Item label="金额">{defulat.withdrawAmount}</Descriptions.Item>
          <Descriptions.Item label="服务费">{defulat.serviceFee}</Descriptions.Item>
          <Descriptions.Item label="实际到账">{defulat.actualToAccount}</Descriptions.Item>
          <Descriptions.Item label="申请时间">{defulat.applyTime}</Descriptions.Item>
        </Descriptions>
        <Divider />
        <Descriptions size={'small'} column={3} layout="vertical" bordered>
          <Descriptions.Item label="结算银行">{defulat.openAccountBank}</Descriptions.Item>
          <Descriptions.Item label="开户姓名">{defulat.accountHolder}</Descriptions.Item>
          <Descriptions.Item label="银行卡号">{defulat.bankCardAccount}</Descriptions.Item>
        </Descriptions>
        <Divider />
        <Form>
          <GenerateFormCompoents formItems={addForm} form={form} />
          {helpers.isJudge(defulat.state == '1')(
            <GenerateFormCompoents formItems={addFormPlugin} form={form} />,
            null,
          )}
        </Form>
        <div style={{ textAlign: 'center' }}>
          <Button
            style={{ marginRight: 5 }}
            type={'primary'}
            onClick={() => {
              okHandle();
            }}
          >
            审核通过
          </Button>
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
      </Spin>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(UpdatePsd);
