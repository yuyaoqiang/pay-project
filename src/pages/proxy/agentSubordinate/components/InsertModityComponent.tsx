import React, { useState, useEffect } from 'react';
import { FromItemLayout } from '@/general';
import { Form, Modal, Row, Col, Button } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';
import { helpers } from '@/utils';

const status = [
  { name: '启用', type: '1' },
  { name: '禁用', type: '0' },
];

const AddUpDataComponent: React.FC<ModalFormProps> = props => {
  const { modalVisible, form, onSubmit, onCancel } = props;
  const { confirmLoading, defulat = {}, common, allMerchantAgent, dispatch } = props;
  const [visiable, setVisiable] = useState('merchantAgent');
  const [secretKey, setSecretKey] = useState('');

  const updateRenderItems = {
    row_1: [
      {
        type: 'input',
        label: '用户名',
        key: 'userName',
        validator: validator.onlyRequier,
        defulatVal: defulat.userName,
        placeholder: '请输入用户名',
      },
      {
        type: 'input',
        label: '商户号',
        key: 'merchantNum',
        validator: validator.onlyRequier,
        defulatVal: defulat.merchantNum,
        placeholder: '请输入姓名',
      },
    ],
    row_2: [
      {
        type: 'input',
        label: '商户名称',
        key: 'merchantName',
        validator: validator.onlyRequier,
        defulatVal: defulat.merchantName,
        placeholder: '请输入账号',
      },
      {
        type: 'radio',
        label: '状态',
        key: 'state',
        placeholder: ' ',
        validator: validator.onlyRequier,
        defulatVal: defulat.state,
        formData: status,
      },
    ],
  };
  const commodRenderItems = {
    row_3: [
      {
        type: 'input',
        label: '异步通知地址',
        key: 'notifyUrl',
        defulatVal: defulat.notifyUrl,
        placeholder: '请输入异步通知地址',
      },
    ],
    row_4: [
      {
        type: 'input',
        label: '同步通知地址',
        key: 'returnUrl',
        defulatVal: defulat.returnUrl,
        placeholder: '请输入同步通知地址',
      },
    ],
    row_5: [
      {
        type: 'input',
        label: '接入密钥',
        key: 'secretKey',
        validator: validator.onlyRequier,
        defulatVal: defulat.secretKey||secretKey,
        placeholder: '请输入接入密钥',
      },
    ],
  };
  const addRenderItems = {
    row_1: [
      {
        type: 'input',
        label: '账号',
        key: 'userName',
        validator: validator.onlyRequier,
        defulatVal: defulat.userName,
        placeholder: '请输入账号',
      },
      {
        type: 'input',
        label: '登录密码',
        key: 'loginPwd',
        validator: validator.onlyRequier,
        defulatVal: defulat.loginPwd,
        placeholder: '请输入登录密码',
      },
    ],
    row_2: [
      {
        type: 'input',
        label: '商户号',
        key: 'merchantNum',
        validator: validator.onlyRequier,
        defulatVal: defulat.merchantNum,
        placeholder: '请输入商户号',
      },
      {
        type: 'input',
        label: '商户名称',
        key: 'merchantName',
        validator: validator.onlyRequier,
        defulatVal: defulat.merchantName,
        placeholder: '请输入商户名称',
      },
    ],
  };
  const generateSecretKey = () => {
    dispatch({
      type: 'agentSubordinate/generateSecretKey',
      payload: {},
    }).then(data => {
      setSecretKey(data.data);
    });
  };
  const generateCols = (row, colSize?: number, layout?: FromItemLayout) => {
    return row.map((item, index) => {
      return (
        <Col key={`row${index}`} span={colSize}>
          <GenerateFormCompoents formItems={[item]} form={form} itemLayout={layout} />
        </Col>
      );
    });
  };

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (hasModity) {
        fieldsValue.id = defulat.id;
      }
      onSubmit({ ...defulat, ...fieldsValue });
    });
  };
  const { hasModity } = props;
  return (
    <Modal
      width={700}
      destroyOnClose
      confirmLoading={confirmLoading}
      title={helpers.isJudge(hasModity)('修改账号', '添加账号')}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      {helpers.isJudge(hasModity)(
        <Form>
          <Row gutter={[8, 8]}>{generateCols(updateRenderItems.row_1, 12)}</Row>
          <Row gutter={[8, 8]}>{generateCols(updateRenderItems.row_2, 12)}</Row>
          <Row gutter={[8, 8]}>
            <Col key={`row99`} span={24}>
              <GenerateFormCompoents formItems={commodRenderItems.row_5} form={form} />
              <Button>生成秘钥</Button>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>{generateCols(commodRenderItems.row_3, 24)}</Row>
          <Row gutter={[8, 8]}>{generateCols(commodRenderItems.row_4, 24)}</Row>
        </Form>,
        <Form>
          <Row gutter={[8, 8]}>{generateCols(addRenderItems.row_1, 12)}</Row>
          <Row gutter={[8, 8]}>{generateCols(addRenderItems.row_2, 12)}</Row>
          <Row gutter={[8, 8]}>
            <Col key={`row99`} span={24}>
              <GenerateFormCompoents formItems={commodRenderItems.row_5} form={form} />
              <Button onClick={()=>{generateSecretKey()}}>生成秘钥</Button>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>{generateCols(commodRenderItems.row_3, 24)}</Row>
          <Row gutter={[8, 8]}>{generateCols(commodRenderItems.row_4, 24)}</Row>
        </Form>,
      )}
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(AddUpDataComponent);
