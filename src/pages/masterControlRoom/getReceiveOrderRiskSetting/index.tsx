import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { message, Card, Form, Button, Input, Col, Row, Select } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { FromItemLayout } from '@/general';
import { GenerateFormCompoents } from '@/components/FormComponent';
import _ from 'lodash';
import * as validator from '@/utils/validator';
import { constant, helpers } from '@/utils';

const defulatItemLayout_2 = {
  labelCol: {
    span: 18,
  },
  wrapperCol: {
    span: 1,
  },
};
const defulatItemLayout_1 = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 3,
  },
};
const defulatItemLayout_0 = {
  labelCol: {
    span: 14,
  },
  wrapperCol: {
    span: 4,
  },
};
const GetReceiveOrderRiskSetting = props => {
  const [configData, setConfigData] = useState({
    auditGatheringCode: undefined,
    banReceiveRepeatIpOrder: undefined,
    banReceiveRepeatOrder: undefined,
    continuationGatheringFailOffLine: undefined,
    floatAmountDirection: undefined,
    floatAmountMode: undefined,
    gatheringCodeEverydayGatheringUpperLimit: undefined,
    gatheringCodeEverydayUsedUpperLimit: undefined,
    gatheringCodeGatheringUpperLimit: undefined,
    gatheringCodeReceiveOrderInterval: undefined,
    gatheringCodeUsedUpperLimit: undefined,
    id: undefined,
    latelyUpdateTime: undefined,
    maxFloatAmount: undefined,
    minFloatAmount: undefined,
    noOpsStopReceiveOrder: undefined,
    onlyReceiveAppointMerchantOrder: undefined,
    waitConfirmOrderUpperLimit: undefined,
  });
  const { dispatch, form, loadingState } = props;
  useEffect(() => {
    getDatas();
  }, []);
  const renderForms = {
    row_1: [
      {
        type: 'switch',
        label: '审核收款方式',
        key: 'auditGatheringCode',
        validator: validator.onlyRequier,
        defulatVal: configData.auditGatheringCode,
        placeholder: '',
      },
      {
        type: 'switch',
        label: '同一收款方式禁止接相同金额的订单',
        key: 'banReceiveRepeatOrder',
        validator: validator.onlyRequier,
        defulatVal: configData.banReceiveRepeatOrder,
        placeholder: '',
      },
    ],
    row_2: [
      {
        type: 'switch',
        label: '同一收款方式禁止接相同ip地址的订单',
        key: 'banReceiveRepeatIpOrder',
        validator: validator.onlyRequier,
        defulatVal: configData.banReceiveRepeatIpOrder,
        placeholder: '',
      },
      {
        type: 'switch',
        label: '商户指定码商接单后,该码商不再接其他商户的单',
        key: 'onlyReceiveAppointMerchantOrder',
        validator: validator.onlyRequier,
        defulatVal: configData.onlyReceiveAppointMerchantOrder,
        placeholder: '',
      },
    ],
    row_3: [
      {
        type: 'input',
        label: '待审核订单数量上限',
        key: 'waitConfirmOrderUpperLimit',
        validator: validator.onlyRequier,
        defulatVal: configData.waitConfirmOrderUpperLimit,
        placeholder: ' ',
        suffix: '单',
      },
      {
        type: 'input',
        label: '单个收款方式接单间隔',
        key: 'gatheringCodeReceiveOrderInterval',
        validator: validator.onlyRequier,
        defulatVal: configData.gatheringCodeReceiveOrderInterval,
        placeholder: ' ',
        suffix: '秒',
      },
    ],
    row_4: [
      {
        type: 'switch',
        label: '单个收款方式',
        key: 'gatheringCodeEverydayUsedUpperLimit',
        validator: validator.onlyRequier,
        defulatVal: configData.gatheringCodeEverydayUsedUpperLimit,
        placeholder: '',
      },
      {
        type: 'input',
        label: '每日 收款次数上限',
        key: 'gatheringCodeUsedUpperLimit',
        validator: validator.onlyRequier,
        defulatVal: configData.gatheringCodeUsedUpperLimit,
        placeholder: ' ',
        suffix: '次',
      },
    ],
    row_5: [
      {
        type: 'switch',
        label: '单个收款方式',
        key: 'gatheringCodeEverydayGatheringUpperLimit',
        validator: validator.onlyRequier,
        defulatVal: configData.gatheringCodeEverydayGatheringUpperLimit,
        placeholder: ' ',
      },
      {
        type: 'input',
        label: '每日 收款金额上限',
        key: 'gatheringCodeGatheringUpperLimit',
        validator: validator.onlyRequier,
        defulatVal: configData.gatheringCodeGatheringUpperLimit,
        placeholder: ' ',
        suffix: '',
      },
    ],
    row_6: [
      {
        type: 'input',
        label: '超过',
        key: 'noOpsStopReceiveOrder',
        validator: validator.onlyRequier,
        defulatVal: configData.noOpsStopReceiveOrder,
        placeholder: ' ',
        suffix: '分钟无操作停止接单',
      },
      {
        type: 'input',
        label: '连续',
        key: 'continuationGatheringFailOffLine',
        validator: validator.onlyRequier,
        defulatVal: configData.continuationGatheringFailOffLine,
        placeholder: ' ',
        suffix: '次收款失败禁用该收款方式',
      },
    ],
    row_7: [
      {
        type: 'input',
        label: '超过',
        key: 'noOpsStopReceiveOrder',
        validator: validator.onlyRequier,
        defulatVal: configData.noOpsStopReceiveOrder,
        placeholder: ' ',
        suffix: '分钟无操作停止接单',
      },
      {
        type: 'input',
        label: '连续',
        key: 'continuationGatheringFailOffLine',
        validator: validator.onlyRequier,
        defulatVal: configData.continuationGatheringFailOffLine,
        placeholder: ' ',
        suffix: '次收款失败禁用该收款方式',
      },
    ],
    row_8: [
      {
        type: 'switch',
        label: '浮动金额模式',
        key: 'floatAmountMode',
        validator: validator.onlyRequier,
        defulatVal: configData.floatAmountMode,
        placeholder: ' ',
        onChange: item => {
          setConfigData({ ...configData, floatAmountMode: item });
        },
      },
    ],
  };

  const getDatas = () => {
    return dispatch({
      type: 'getReceiveOrderRiskSetting/get',
      payload: {},
    }).then(data => {
      setConfigData(data.data);
    });
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (configData.floatAmountMode) {
        fieldsValue.floatAmountDirection = configData.floatAmountDirection;
        fieldsValue.minFloatAmount = configData.minFloatAmount;
        fieldsValue.maxFloatAmount = configData.maxFloatAmount;
      } else {
        fieldsValue.floatAmountDirection = 'up';
        fieldsValue.minFloatAmount = 0;
        fieldsValue.maxFloatAmount = 0;
      }
      dispatch({
        type: 'getReceiveOrderRiskSetting/update',
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
      <Card title="下单设置" bordered={false}>
        <Row gutter={[8, 0]}>{generateCols(renderForms.row_1, 12, defulatItemLayout_0)}</Row>
        <Row gutter={[8, 0]}>{generateCols(renderForms.row_2, 12, defulatItemLayout_0)}</Row>
        <Row gutter={[8, 0]}>
          {generateCols(renderForms.row_3, 12, {
            labelCol: {
              span: 12,
            },
            wrapperCol: {
              span: 4,
            },
          })}
        </Row>

        <Row gutter={[8, 0]}>
          <Col key={`row-17`} span={12}>
            <GenerateFormCompoents
              formItems={[renderForms.row_6[0]]}
              form={form}
              itemLayout={{
                labelCol: {
                  span: 6,
                },
                wrapperCol: {
                  span: 10,
                },
              }}
            />
          </Col>
          <Col key={`row-18`} span={12}>
            <GenerateFormCompoents
              formItems={[renderForms.row_6[1]]}
              form={form}
              itemLayout={{
                labelCol: {
                  span: 6,
                },
                wrapperCol: {
                  span: 10,
                },
              }}
            />
          </Col>
        </Row>
        <Row gutter={[8, 0]}>
          <Col key={`row-11`} span={9}>
            <GenerateFormCompoents
              formItems={[renderForms.row_4[0]]}
              form={form}
              itemLayout={defulatItemLayout_2}
            />
          </Col>
          <Col key={`row-12`} span={12}>
            <GenerateFormCompoents
              formItems={[renderForms.row_4[1]]}
              form={form}
              itemLayout={defulatItemLayout_1}
            />
          </Col>
        </Row>
        <Row gutter={[8, 0]}>
          <Col key={`row-13`} span={9}>
            <GenerateFormCompoents
              formItems={[renderForms.row_5[0]]}
              form={form}
              itemLayout={defulatItemLayout_2}
            />
          </Col>
          <Col key={`row-14`} span={12}>
            <GenerateFormCompoents
              formItems={[renderForms.row_5[1]]}
              form={form}
              itemLayout={defulatItemLayout_1}
            />
          </Col>
        </Row>
        <Row gutter={[8, 0]}>
          <Col key={`row-15`} span={9}>
            <GenerateFormCompoents
              formItems={[renderForms.row_8[0]]}
              form={form}
              itemLayout={defulatItemLayout_2}
            />
          </Col>
          {helpers.isJudge(configData.floatAmountMode)(
            <Col key={`row-16`} span={12}>
              <Form.Item label="范围" labelCol={{ span: 2 }} wrapperCol={{ span: 15 }}>
                <Input.Group compact>
                  <Select
                    value={configData.floatAmountDirection}
                    onChange={item => setConfigData({ ...configData, floatAmountDirection: item })}
                  >
                    <Select.Option value="up">向上</Select.Option>
                    <Select.Option value="down">向下</Select.Option>
                  </Select>
                  <Input
                    style={{ width: 100, textAlign: 'center' }}
                    value={configData.minFloatAmount}
                    onChange={item =>
                      setConfigData({ ...configData, minFloatAmount: item.target.value })
                    }
                    placeholder="最小值"
                  />
                  <Input
                    className="site-input-split"
                    style={{
                      width: 30,
                      borderLeft: 0,
                      borderRight: 0,
                      pointerEvents: 'none',
                    }}
                    placeholder="~"
                    disabled
                  />
                  <Input
                    className="site-input-right"
                    value={configData.maxFloatAmount}
                    onChange={item =>
                      setConfigData({ ...configData, maxFloatAmount: item.target.value })
                    }
                    style={{
                      width: 100,
                      textAlign: 'center',
                    }}
                    placeholder="最大值"
                  />
                </Input.Group>
              </Form.Item>
            </Col>,
            null,
          )}
        </Row>

        <div style={{ textAlign: 'center' }}>
          <Button loading={loadingState} onClick={() => okHandle()} type={'primary'} size={'large'}>
            提交
          </Button>
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};
export default connect(({ loading, common, user }: ConnectState) => ({
  loadingState: loading.models.getReceiveOrderRiskSetting,
  common,
}))(Form.create()(GetReceiveOrderRiskSetting));
