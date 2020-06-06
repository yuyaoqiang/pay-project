import React from 'react';
import { Form, Modal, message } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';

const CodeQuota: React.FC<ModalFormProps> = props => {
  const { modalVisible, form, dispatch, actionRef, onCancel, confirmLoading, defulat = {} } = props;

  const addForm = [
    {
      type: 'input_number',
      label: '邀请码配额',
      key: 'inviteCodeQuota',
      validator: validator.onlyRequier,
      defulatVal: defulat.inviteCodeQuota,
      placeholder: '请输入邀请码配额',
    },
  ];
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (hasModity) {
        fieldsValue.userAccountId = defulat.id;
      }
      dispatch({
        type: 'creditMember/adjustInviteCodeQuota',
        payload: { params: { ...fieldsValue } },
      }).then(data => {
        message.success('修改成功');
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
      title={'设置邀请码配额'}
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

export default Form.create<ModalFormProps>()(CodeQuota);
