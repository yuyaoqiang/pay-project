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
  const { modalVisible, form, dispatch, onCancel, confirmLoading, defulat = {} } = props;
  const { actionRef } = props;
  useEffect(() => {
    getDatas();
  }, []);
  const addForm = [
    {
      type: 'input',
      label: '商户名称',
      key: 'merchantName',
      disabled: true,
      validator: validator.onlyRequier,
      defulatVal: defulat.merchantName,
      placeholder: '请输入商户名称',
    },
    {
      type: 'input',
      label: '原可提现金额',
      key: 'withdrawableAmount',
      disabled: true,
      validator: validator.onlyRequier,
      defulatVal: defulat.withdrawableAmount,
      placeholder: '请输入原可提现金额',
    },
    {
      type: 'select',
      label: '帐变类型',
      key: 'accountChangeTypeCode',
      validator: validator.onlyRequier,
      defulatVal: defulat.accountChangeTypeCode,
      onChange: value => {
        setType(value);
      },
      formData: [
        { type: '', name: '请选择' },
        { type: '2', name: '手工加可提现金额' },
        { type: '3', name: '手工减可提现金额' },
        { type: '6', name: '补单加可提现金额' },
        { type: '7', name: '补单减可提现金额' },
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
  const getDatas = () => {
    const params = { merchantId: defulat.id };
    return dispatch({
      type: 'merchant/findAccountReceiveOrderChannelByAccountId',
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
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (hasModity) {
        fieldsValue.merchantId = defulat.id;
      }
      dispatch({
        type: 'merchant/adjustWithdrawableAmount',
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
        {helpers.isJudge(['6', '7'].includes(type))(
          <GenerateFormCompoents formItems={addPulginForm} form={form} />,
          null,
        )}
      </Form>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(UpdatePsd);
