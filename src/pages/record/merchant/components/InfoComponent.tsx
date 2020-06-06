import React, { useState, useEffect } from 'react';
import { Form, Modal, message, Button ,Card,Row,Col} from 'antd';
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
      title={'商户信息'}
      visible={modalVisible}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      <Card>
        <Row>
          <Col span={7} >接入密钥:</Col>
          <Col span={16}>{defulat.secretKey}</Col>
        </Row>
        <Row>
          <Col span={7}>异步通知地址:</Col>
          <Col span={16}>{defulat.notifyUrl}</Col>
        </Row>
        <Row>
          <Col span={7}>同步通知地址:</Col>
          <Col span={16}>{defulat.returnUrl}</Col>
        </Row>
        <Row>
          <Col span={7}>谷歌验证器密钥:</Col>
          <Col span={16}>{defulat.googleAuthBindTime != null ? defulat.googleSecretKey : '未绑定' }</Col>
        </Row>
      </Card>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(InfoComponent);
