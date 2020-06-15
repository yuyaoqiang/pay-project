import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { message, Card, Form, Button, Col, Row, Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { FromItemLayout } from '@/general';
import { GenerateFormCompoents } from '@/components/FormComponent';
import _ from 'lodash';
import * as validator from '@/utils/validator';
import { constant, helpers } from '@/utils';
const defulatItemLayout_1 = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 12,
  },
};
const defulatItemLayout_2 = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 12,
  },
};
const SysSetting = props => {
  const [configData, setConfigData] = useState({
    appUrl: '',
    backgroundLoginGoogleAuth: undefined,
    currencyUnit: '',
    homePageUrl: '',
    id: '',
    latelyUpdateTime: '',
    localStoragePath: '',
    loginCaptchaFlag: false,
    memberMeEnabled: false,
    merchantLoginGoogleAuth: false,
    payTechnicalSupport: false,
    showRankingListFlag: false,
    singleDeviceLoginFlag: false,
    websiteTitle: '',
  });
  const { dispatch, form, loadingState } = props;
  useEffect(() => {
    getDatas();
  }, []);
  const renderForms = {
    row_1: [
      {
        type: 'input',
        label: '网站标题',
        key: 'websiteTitle',
        validator: validator.onlyRequier,
        defulatVal: configData.websiteTitle,
        placeholder: '请输入网站标题',
      },
      {
        type: 'input',
        label: '首页地址',
        key: 'homePageUrl',
        validator: validator.onlyRequier,
        defulatVal: configData.homePageUrl,
        placeholder: '请输入首页地址',
      },
    ],
    row_2: [
      {
        type: 'input',
        label: 'app下载地址',
        key: 'appUrl',
        validator: validator.onlyRequier,
        defulatVal: configData.appUrl,
        placeholder: '请输入app下载地址',
      },
      {
        type: 'input',
        label: '本地存储对象路径',
        key: 'localStoragePath',
        validator: validator.onlyRequier,
        defulatVal: configData.localStoragePath,
        placeholder: '请输入本地存储对象路径',
      },
    ],
    row_3: [
      {
        type: 'input',
        label: '支付技术支持',
        key: 'payTechnicalSupport',
        validator: validator.onlyRequier,
        defulatVal: configData.payTechnicalSupport,
        placeholder: '请输入支付技术支持',
      },
      {
        type: 'input',
        label: '货币单位',
        key: 'currencyUnit',
        validator: validator.onlyRequier,
        defulatVal: configData.currencyUnit,
        placeholder: '请输入货币单位',
      },
    ],
    row_4: [
      {
        type: 'input',
        label: '首页地址',
        key: 'remark',
        validator: validator.onlyRequier,
        defulatVal: configData.homePageUrl,
        placeholder: '请输入首页地址',
      },
    ],
    row_5: [
      {
        type: 'switch',
        label: '会员端开启记住密码',
        key: 'memberMeEnabled',
        validator: validator.onlyRequier,
        defulatVal: configData.memberMeEnabled,
        placeholder: '',
      },
      {
        type: 'switch',
        label: '会员端显示排行榜',
        key: 'showRankingListFlag',
        validator: validator.onlyRequier,
        defulatVal: configData.showRankingListFlag,
        placeholder: '',
      },
    ],
    row_6: [
      {
        type: 'switch',
        label: '会员端启用登陆验证码',
        key: 'loginCaptchaFlag',
        validator: validator.onlyRequier,
        defulatVal: configData.loginCaptchaFlag,
        placeholder: '',
      },
      {
        type: 'switch',
        label: '会员端限制单一设备登录',
        key: 'singleDeviceLoginFlag',
        validator: validator.onlyRequier,
        defulatVal: configData.singleDeviceLoginFlag,
        placeholder: '',
      },
    ],
    row_7: [
      {
        type: 'switch',
        label: '商户端登陆启用谷歌身份验证',
        key: 'merchantLoginGoogleAuth',
        validator: validator.onlyRequier,
        defulatVal: configData.merchantLoginGoogleAuth,
        placeholder: '',
      },
      {
        type: 'switch',
        label: '后台管理登陆启用谷歌身份验证',
        key: 'backgroundLoginGoogleAuth',
        validator: validator.onlyRequier,
        defulatVal: configData.backgroundLoginGoogleAuth,
        placeholder: '',
      },
    ],
  };
  const getDatas = () => {
    return dispatch({
      type: 'sysSetting/get',
      payload: {},
    }).then(data => {
      setConfigData(data.data);
    });
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.id = configData.id;
      dispatch({
        type: 'sysSetting/update',
        payload: { params: fieldsValue },
      }).then(data => {
        message.success(data.message || constant.alertMessage.UPDATE_SUCCESS);
      });
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
  return (
    <PageHeaderWrapper title={false}>
      <Spin spinning={loadingState} size="large" wrapperClassName="spin">
        <Card title="系统设置" bordered={false}>
          <Row gutter={[8, 8]}>{generateCols(renderForms.row_1, 12)}</Row>
          <Row gutter={[8, 8]}>{generateCols(renderForms.row_2, 12)}</Row>
          <Row gutter={[8, 8]}>{generateCols(renderForms.row_3, 12)}</Row>
          <Row gutter={[8, 8]}>{generateCols(renderForms.row_4, 12)}</Row>
          <Row gutter={[8, 8]}>{generateCols(renderForms.row_5, 12, defulatItemLayout_1)}</Row>
          <Row gutter={[8, 8]}>{generateCols(renderForms.row_6, 12, defulatItemLayout_1)}</Row>
          <Row gutter={[8, 8]}>{generateCols(renderForms.row_7, 12, defulatItemLayout_2)}</Row>
          <div style={{ textAlign: 'center' }}>
            <Button
              loading={loadingState}
              onClick={() => okHandle()}
              type={'primary'}
              size={'large'}
            >
              提交
            </Button>
          </div>
        </Card>
      </Spin>
    </PageHeaderWrapper>
  );
};
export default connect(({ loading, common, user }: ConnectState) => ({
  loadingState: loading.models.sysSetting,
  common,
}))(Form.create()(SysSetting));
