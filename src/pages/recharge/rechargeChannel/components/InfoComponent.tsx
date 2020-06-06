import React, { useState, useEffect } from 'react';
import { Form, Modal, message, Button, Descriptions } from 'antd';
import QRCode from 'qrcode.react';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';
import { helpers, constant } from '@/utils';

const InfoComponent: React.FC<ModalFormProps> = props => {
  const [authInfo, setAuthInfo] = useState({ googleSecretKey: null, googleAuthBindTime: null });
  const { modalVisible, form, onSubmit, onCancel, confirmLoading, defulat = {}, dispatch } = props;
  return (
    <Modal
      width={700}
      destroyOnClose
      confirmLoading={confirmLoading}
      title={'订单信息'}
      visible={modalVisible}
      footer={[]}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      <Descriptions bordered size={'small'}>
        <Descriptions.Item label="系统处理时间">{defulat.dealTime}</Descriptions.Item>
        <Descriptions.Item label="备注">{defulat.note}</Descriptions.Item>
        <Descriptions.Item label="收款银行">{defulat.payChannelName}</Descriptions.Item>
        <Descriptions.Item label="收款人">{defulat.accountHolder}</Descriptions.Item>
        <Descriptions.Item label="卡号">{defulat.bankCardAccount}</Descriptions.Item>
        <Descriptions.Item label="存款人">{defulat.depositor}</Descriptions.Item>
        <Descriptions.Item label="存款时间">{defulat.depositTime}</Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(InfoComponent);
