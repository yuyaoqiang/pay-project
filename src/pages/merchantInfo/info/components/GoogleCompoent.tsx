import React, { useState, useEffect } from 'react';
import { Form, Modal, message, Button } from 'antd';
import QRCode from 'qrcode.react';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';
import { helpers, constant } from '@/utils';

const UpdatePsd: React.FC<ModalFormProps> = props => {
  const [authInfo, setAuthInfo] = useState({ googleSecretKey: null, googleAuthBindTime: null });
  const { modalVisible, form, onSubmit, onCancel, confirmLoading, defulat = {}, dispatch } = props;
  useEffect(() => {
    getGoogleAuthInfo();
  }, []);
  const addForm = [
    {
      type: 'input',
      label: '谷歌验证码',
      key: 'googleVerCode',
      disable: true,
      validator: validator.onlyRequier,
      defulatVal: defulat.googleVerCode,
      placeholder: '请输入账号',
    },
  ];

  const getGoogleAuthInfo = () => {
    dispatch({
      type: 'info/getGoogleAuthInfo',
      payload: { params: { userAccountId: defulat.id } },
    }).then(data => {
      const res = data.data;
      const googleSecretKey = res.googleSecretKey;
      const googleAuthBindTime = res.googleAuthBindTime;
      setAuthInfo({ googleSecretKey, googleAuthBindTime });
      if (res.googleAuthBindTime == null) {
        message.warn('首次绑定,系统自动分配谷歌密钥');
        generateGoogleSecretKey();
      }
    });
  };

  const generateGoogleSecretKey = () => {
    dispatch({
      type: 'info/generateGoogleSecretKey',
      payload: { params: {} },
    }).then(data => {
      message.success("获取秘钥成功")
      setAuthInfo({ googleSecretKey: data.data, googleAuthBindTime: '' });
    });
  };

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
        fieldsValue.userAccountId = defulat.id;
        fieldsValue.googleSecretKey = authInfo.googleSecretKey
      dispatch({
        type: 'info/bindGoogleAuth',
        payload: { params: fieldsValue },
      }).then(data => {
        message.success("绑定成功")
      });
    });
  };
  return (
    <Modal
      width={500}
      destroyOnClose
      confirmLoading={confirmLoading}
      title={'绑定谷歌验证器'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      <div style={{ textAlign: 'center' }}>
        <p>请打开谷歌验证器APP，选择"扫描二维码"，或手动输入密钥</p>
        <p>后台账号:{defulat.userName}</p>
        <p>
          谷歌密钥:{authInfo.googleSecretKey}
          <Button
            type={'primary'}
            size={'small'}
            onClick={() => {
              generateGoogleSecretKey();
            }}
          >
            更换秘钥
          </Button>
        </p>
        {helpers.isJudge(authInfo.googleSecretKey !== null)(
          <QRCode
            style={{ display: 'inline-block'}}
            value={`otpauth://totp/${defulat.userName}?secret=${authInfo.googleSecretKey}`}
            size={200}
          />,
          <div style={{ height: 200 }}></div>,
        )}
      </div>
      <Form>
        <GenerateFormCompoents formItems={addForm} form={form} />
      </Form>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(UpdatePsd);
