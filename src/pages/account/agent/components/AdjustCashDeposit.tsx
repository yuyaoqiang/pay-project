import React, { useState, useEffect } from 'react';
import { Form, Modal, message } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';
import { helpers } from '@/utils';

const UpdatePsd: React.FC<ModalFormProps> = props => {
  const [type, setType] = useState('');
  const [channels, setChannels] = useState([]);
  useEffect(() => {
    getDatas();
  }, []);
  const { modalVisible, form, dispatch, onCancel, confirmLoading, defulat = {} } = props;
  const { actionRef } = props;

  const addForm = [
    {
      type: 'input',
      label: '账号',
      key: 'userName',
      disabled: true,
      validator: validator.onlyRequier,
      defulatVal: defulat.userName,
      placeholder: '请输入账号',
    },
    {
      type: 'input',
      label: '姓名',
      key: 'realName',
      disabled: true,
      validator: validator.onlyRequier,
      defulatVal: defulat.realName,
      placeholder: '请输入姓名',
    },
    {
      type: 'input',
      label: '原保证金',
      key: 'cashDeposit',
      disabled: true,
      validator: validator.onlyRequier,
      defulatVal: defulat.cashDeposit,
      placeholder: '请输入原保证金',
    },
    {
      type: 'select',
      label: '帐变类型',
      key: 'accountChangeTypeCode',
      validator: validator.onlyRequier,
      onChange: value => {
        setType(value);
      },
      defulatVal: defulat.accountChangeTypeCode,
      formData: [
        { type: '', name: '请选择' },
        { type: '8', name: '手工加保证金' },
        { type: '9', name: '手工减保证金' },
        { type: '19', name: '补单加保证金' },
        { type: '20', name: '补单减保证金' },
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
  const addPulginForm = [
    {
      type: 'select',
      label: '通道类型',
      key: 'channelId',
      validator: validator.onlyRequier,
      defulatVal: defulat.channelId,
      formData: channels,
      placeholder: '请选择',
    },
  ];
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (hasModity) {
        fieldsValue.userAccountId = defulat.id;
      }
      dispatch({
        type: 'agent/adjustCashDeposit',
        payload: { params: { ...fieldsValue } },
      }).then(data => {
        message.success('修改成功');
        onCancel();
        actionRef.current?.reload();
      });
    });
  };

  const getDatas = () => {
    const params = { accountId: defulat.id };
    return dispatch({
      type: 'agent/findAccountReceiveOrderChannelByAccountId',
      payload: { params },
    }).then(data => {
      let arr = [];
      if (data.data) {
        data.data.map(item => {
          arr.push({
            type: item.channelId,
            name: item.channelName,
          });
        });
        setChannels(arr);
      }
    });
  };

  const { hasModity } = props;
  return (
    <Modal
      width={500}
      destroyOnClose
      confirmLoading={confirmLoading}
      title={'调整保证金'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      <Form>
        <GenerateFormCompoents formItems={addForm} form={form} />
        {helpers.isJudge(['19', '20'].includes(type))(
          <GenerateFormCompoents formItems={addPulginForm} form={form} />,
          null,
        )}
      </Form>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(UpdatePsd);
