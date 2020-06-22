import React from 'react';
import { Form, Modal, message, Button, Card, Row, Col } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import _ from 'lodash';

const InfoComponent: React.FC<ModalFormProps> = props => {
  const { modalVisible, onCancel, confirmLoading, defulat = {}, dispatch,actionRef } = props;
  const onClick = () => {
    const params = { id: defulat.id };
    return dispatch({
      type: 'merchant/regenerateSecretKey',
      payload: { params },
    }).then(data => {
      onCancel();
      actionRef.current?.reload();
      message.success(data.data || '重置谷歌验证码成功');
    });
  };
  return (
    <Modal
      width={700}
      destroyOnClose
      confirmLoading={confirmLoading}
      title={'详细信息'}
      footer={[]}
      visible={modalVisible}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      <Card>
        <Row>
          <Col span={7}>接入密钥:</Col>
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
          <Col span={16}>
            {defulat.googleAuthBindTime != null ? defulat.googleSecretKey : '未绑定'}
          </Col>
        </Row>
        <Row>
          <Col span={7}>谷歌验证器绑定时间:</Col>
          <Col span={16}>
            {defulat.googleAuthBindTime != null ? defulat.googleAuthBindTime : ''}
          </Col>
        </Row>
        {/* <div style={{textAlign:'center',paddingTop:15}}>
          <Button type={'primary'} loading={confirmLoading} onClick={onClick}>
            重置谷歌验证码
          </Button>
        </div> */}
      </Card>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(InfoComponent);
