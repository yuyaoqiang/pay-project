import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { message, Card, Form, Button, Col, Row, Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { FromItemLayout } from '@/general';
import { GenerateFormCompoents } from '@/components/FormComponent';
import _ from 'lodash';
import * as validator from '@/utils/validator';
import { constant } from '@/utils';

const defulatItemLayout_2 = {
  labelCol: {
    span: 18,
  },
  wrapperCol: {
    span: 4,
  },
};
const defulatItemLayout_1 = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 10,
  },
};
const GetOrderSetting = props => {
  const [configData, setConfigData] = useState({
    appealCancelOrderEnabled: undefined,
    cashDepositMinimumRequire: undefined,
    cashPledge: undefined,
    dispatchMode: undefined,
    freezeEffectiveDuration: undefined,
    freezeModelEnabled: undefined,
    id: undefined,
    latelyUpdateTime: undefined,
    manualConfirmOrder: undefined,
    openAutoReceiveOrder: undefined,
    orderPayEffectiveDuration: undefined,
    receiveOrderAppealInterval: undefined,
    receiveOrderEffectiveDuration: undefined,
    receiveOrderSound: undefined,
    receiveOrderSuccessToAuditPage: undefined,
    sameCityPriority: undefined,
    showAllOrder: undefined,
    stopStartAndReceiveOrder: undefined,
    unconfirmedAutoFreezeDuration: undefined,
    dispatchQueueRange: undefined,
    dispatchQueueSort: undefined,
  });
  const [otherData, setOtherData] = useState({
    dispatchQueueRange: [],
    dispatchQueueSort: [],
  });
  const { dispatch, form, loadingState } = props;
  useEffect(() => {
    getDatas();
  }, []);
  const renderForms = {
    row_1: [
      {
        type: 'switch',
        label: '暂停发单接单',
        key: 'stopStartAndReceiveOrder',
        validator: validator.onlyRequier,
        defulatVal: configData.stopStartAndReceiveOrder,
        placeholder: '',
      },
      {
        type: 'switch',
        label: '显示所有订单',
        key: 'showAllOrder',
        validator: validator.onlyRequier,
        defulatVal: configData.showAllOrder,
        placeholder: '',
      },
    ],
    row_2: [
      {
        type: 'input',
        label: '接单有效时长',
        key: 'receiveOrderEffectiveDuration',
        validator: validator.onlyRequier,
        defulatVal: configData.receiveOrderEffectiveDuration,
        placeholder: '该项为必填项',
        suffix: '分钟',
      },
      {
        type: 'input',
        label: '支付有效时长',
        key: 'orderPayEffectiveDuration',
        validator: validator.onlyRequier,
        defulatVal: configData.orderPayEffectiveDuration,
        placeholder: '该项为必填项',
        suffix: '分钟',
      },
    ],
    row_3: [
      {
        type: 'input',
        label: '接单申诉间隔',
        key: 'receiveOrderAppealInterval',
        validator: validator.onlyRequier,
        defulatVal: configData.receiveOrderAppealInterval,
        placeholder: '该项为必填项',
        suffix: '秒',
      },
      {
        type: 'input',
        label: '保证金最低要求',
        key: 'cashDepositMinimumRequire',
        validator: validator.onlyRequier,
        defulatVal: configData.cashDepositMinimumRequire,
        placeholder: '该项为必填项',
      },
    ],
    row_4: [
      {
        type: 'input',
        label: '押金',
        key: 'cashPledge',
        validator: validator.onlyRequier,
        defulatVal: configData.cashPledge,
        placeholder: '该项为必填项',
      },
      {
        type: 'input',
        label: '订单冻结时长',
        key: 'freezeEffectiveDuration',
        validator: validator.onlyRequier,
        defulatVal: configData.freezeEffectiveDuration,
        placeholder: '该项为必填项',
        suffix: '分钟',
      },
    ],
    row_5: [
      {
        type: 'switch',
        label: '派单模式',
        key: 'dispatchMode',
        validator: validator.onlyRequier,
        defulatVal: configData.dispatchMode,
        placeholder: '',
      },
      {
        type: 'switch',
        label: '同城优先派单',
        key: 'sameCityPriority',
        validator: validator.onlyRequier,
        defulatVal: configData.sameCityPriority,
        placeholder: '',
      },
    ],
    row_6: [
      {
        type: 'switch',
        label: '启用申诉取消订单功能',
        key: 'appealCancelOrderEnabled',
        validator: validator.onlyRequier,
        defulatVal: configData.appealCancelOrderEnabled,
        placeholder: '',
      },
      {
        type: 'switch',
        label: '接单提示音',
        key: 'receiveOrderSound',
        validator: validator.onlyRequier,
        defulatVal: configData.receiveOrderSound,
        placeholder: '',
      },
    ],
    row_7: [
      {
        type: 'switch',
        label: '开放自动接单功能',
        key: 'openAutoReceiveOrder',
        validator: validator.onlyRequier,
        defulatVal: configData.openAutoReceiveOrder,
        placeholder: '',
      },
      {
        type: 'switch',
        label: '人工确认订单',
        key: 'manualConfirmOrder',
        validator: validator.onlyRequier,
        defulatVal: configData.manualConfirmOrder,
        placeholder: '',
      },
    ],
    row_8: [
      {
        type: 'switch',
        label: '接单成功后自动跳转到审核页面',
        key: 'receiveOrderSuccessToAuditPage',
        validator: validator.onlyRequier,
        defulatVal: configData.receiveOrderSuccessToAuditPage,
        placeholder: '',
      },
    ],
    row_9: [
      {
        type: 'switch',
        label: '冻结模式',
        key: 'freezeModelEnabled',
        validator: validator.onlyRequier,
        defulatVal: configData.freezeModelEnabled,
        placeholder: '',
      },
      {
        type: 'input',
        label: '超过',
        key: 'unconfirmedAutoFreezeDuration',
        validator: validator.onlyRequier,
        defulatVal: configData.unconfirmedAutoFreezeDuration,
        placeholder: ' ',
        suffix: '分钟未确认冻结该订单',
      },
    ],
    row_10: [
      {
        type: 'select',
        label: '接单排队范围',
        key: 'dispatchQueueRange',
        validator: validator.onlyRequier,
        defulatVal: configData.dispatchQueueRange,
        formData: otherData.dispatchQueueRange,
        placeholder: '该项为必填项',
      },
      {
        type: 'select',
        label: '接单排队顺序',
        key: 'dispatchQueueSort',
        validator: validator.onlyRequier,
        defulatVal: configData.dispatchQueueSort,
        formData: otherData.dispatchQueueSort,
        placeholder: '该项为必填项',
      },
    ],
  };

  const getDatas = () => {
    return dispatch({
      type: 'getOrderSetting/get',
      payload: {},
    }).then(data => {
      let sorts = [];
      let ranges = [];
      const otherData = _.get(data.data, 'otherData');
      otherData.dispatchQueueSortData.map(item => {
        sorts.push({ name: item.description, type: item.value });
      });
      otherData.dispatchQueueRangeData.map(item => {
        ranges.push({ name: item.description, type: item.value });
      });
      setOtherData({ dispatchQueueSort: sorts, dispatchQueueRange: ranges });
      setConfigData(data.data);
    });
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      dispatch({
        type: 'getOrderSetting/update',
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
        <Card title="下单设置" bordered={false}>
          <Row gutter={[8, 0]}>{generateCols(renderForms.row_1, 12)}</Row>
          <Row gutter={[8, 0]}>{generateCols(renderForms.row_10, 12)}</Row>
          <Row gutter={[8, 0]}>{generateCols(renderForms.row_2, 12)}</Row>
          <Row gutter={[8, 0]}>{generateCols(renderForms.row_3, 12)}</Row>
          <Row gutter={[8, 0]}>{generateCols(renderForms.row_4, 12)}</Row>
          <Row gutter={[8, 0]}>{generateCols(renderForms.row_5, 12)}</Row>
          <Row gutter={[8, 0]}>{generateCols(renderForms.row_6, 12)}</Row>
          <Row gutter={[8, 0]}>{generateCols(renderForms.row_7, 12)}</Row>
          <Row gutter={[8, 0]}>
            <Col key={`row-1`} span={4}>
              <GenerateFormCompoents
                formItems={[renderForms.row_9[0]]}
                form={form}
                itemLayout={defulatItemLayout_2}
              />
            </Col>
            <Col key={`row-5`} span={16}>
              <GenerateFormCompoents
                formItems={[renderForms.row_9[1]]}
                form={form}
                itemLayout={defulatItemLayout_1}
              />
            </Col>
          </Row>
          <Row gutter={[8, 0]}>{generateCols(renderForms.row_8, 12)}</Row>

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
  loadingState: loading.models.getOrderSetting,
  common,
}))(Form.create()(GetOrderSetting));
