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
      title={'订单信息'}
      visible={modalVisible}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      <Card>
        <Row>
          <Col span={7} >审核时间:</Col>
          <Col span={16}>{defulat.approvalTime}</Col>
        </Row>
        <Row>
          <Col span={7}>备注说明:</Col>
          <Col span={16}>{defulat.note}</Col>
        </Row>
        <Row>
          <Col span={7}>确认到帐时间:</Col>
          <Col span={16}>{defulat.confirmCreditedTime}</Col>
        </Row>
      </Card>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(InfoComponent);
