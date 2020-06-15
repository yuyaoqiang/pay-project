import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { message, Card, Form, Button, Input, Col, Row, Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { FromItemLayout } from '@/general';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { GenerateFormCompoents } from '@/components/FormComponent';
import _ from 'lodash';
import * as validator from '@/utils/validator';
import { constant, helpers } from '@/utils';
const defulatItemLayout_0 = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 10,
  },
};
const GetRechargeSetting = props => {
  const { dispatch, form, loadingState } = props;

  const [configData, setConfigData] = useState({
    cantContinuousSubmit: undefined,
    id: undefined,
    latelyUpdateTime: undefined,
    orderEffectiveDuration: undefined,
    quickInputAmount: undefined,
    rechargeExplain: undefined,
    rechargeLowerLimit: undefined,
    rechargeUpperLimit: undefined,
    returnWaterRate: undefined,
    returnWaterRateEnabled: undefined,
  });
  const [editorState, setEditorState] = useState<any>(BraftEditor.createEditorState(null));

  useEffect(() => {
    setEditorState(BraftEditor.createEditorState(configData.rechargeExplain));
  }, [configData.rechargeExplain]);

  useEffect(() => {
    getDatas();
  }, []);
  const renderForms = {
    row_1: [
      {
        type: 'switch',
        label: '限制不能连续提交充值订单',
        key: 'cantContinuousSubmit',
        validator: validator.onlyRequier,
        defulatVal: configData.cantContinuousSubmit,
        placeholder: ' ',
      },
    ],
    row_2: [
      {
        type: 'input',
        label: '快捷录入金额',
        key: 'quickInputAmount',
        validator: validator.onlyRequier,
        defulatVal: configData.quickInputAmount,
        placeholder: ' ',
        onChange: item => {
          setConfigData({ ...configData });
        },
      },
      {
        type: 'input',
        label: '充值订单有效时长',
        key: 'orderEffectiveDuration',
        validator: validator.onlyRequier,
        defulatVal: configData.orderEffectiveDuration,
        placeholder: ' ',
        suffix: '分钟',
      },
    ],
    row_3: [
      {
        type: 'switch',
        label: '启用充值返水率',
        key: 'returnWaterRateEnabled',
        validator: validator.onlyRequier,
        defulatVal: configData.returnWaterRateEnabled,
        placeholder: ' ',
        onChange: item => {
          setConfigData({ ...configData, returnWaterRateEnabled: item });
        },
      },
    ],
  };
  const handleEditorChange = editorState => {
    setEditorState(editorState);
  };
  const getDatas = () => {
    return dispatch({
      type: 'getRechargeSetting/get',
      payload: {},
    }).then(data => {
      setConfigData(data.data);
    });
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (!configData.rechargeLowerLimit || !configData.rechargeUpperLimit) {
        message.error('请填写限额/最低/最高');
        return;
      }
      if (configData.returnWaterRateEnabled && _.isEmpty(configData.returnWaterRate + '')) {
        message.error('请填写返水率');
        return;
      }
      if (configData.returnWaterRateEnabled) {
        fieldsValue.returnWaterRate = configData.returnWaterRate;
      }
      const htmlContent = editorState.toHTML();
      if (!htmlContent) {
        message.warning('请填写公告内容');
        return;
      }
      fieldsValue.rechargeLowerLimit = configData.rechargeLowerLimit;
      fieldsValue.rechargeUpperLimit = configData.rechargeUpperLimit;
      fieldsValue.rechargeExplain = htmlContent;
      dispatch({
        type: 'getRechargeSetting/update',
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
          <Row gutter={[8, 0]}>
            {generateCols(renderForms.row_1, 12, {
              labelCol: { span: 14 },
              wrapperCol: { span: 8 },
            })}
          </Row>
          <Row gutter={[8, 0]}>{generateCols(renderForms.row_2, 12, defulatItemLayout_0)}</Row>
          <Row gutter={[8, 0]}>
            <Col key={`row-15`} span={9}>
              <GenerateFormCompoents
                formItems={[renderForms.row_3[0]]}
                form={form}
                itemLayout={{ labelCol: { span: 14 }, wrapperCol: { span: 8 } }}
              />
            </Col>
            {helpers.isJudge(configData.returnWaterRateEnabled)(
              <Col key={`row-16`} span={12}>
                <Form.Item label="充值反水率" labelCol={{ span: 14 }} wrapperCol={{ span: 8 }}>
                  <Input
                    className="site-input-right"
                    value={configData.returnWaterRate}
                    onChange={item =>
                      setConfigData({ ...configData, returnWaterRate: item.target.value })
                    }
                    style={{
                      width: 100,
                      textAlign: 'center',
                    }}
                    suffix={'%'}
                    placeholder="最大值"
                  />
                </Form.Item>
              </Col>,
              null,
            )}
          </Row>
          <Row>
            <Col key={`row-16`} span={12}>
              <Form.Item label="限额/最低/最高" labelCol={{ span: 10 }} wrapperCol={{ span: 10 }}>
                <Input.Group compact>
                  <Input
                    style={{ width: 100, textAlign: 'center' }}
                    value={configData.rechargeLowerLimit}
                    onChange={item =>
                      setConfigData({ ...configData, rechargeLowerLimit: item.target.value })
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
                    value={configData.rechargeUpperLimit}
                    onChange={item =>
                      setConfigData({ ...configData, rechargeUpperLimit: item.target.value })
                    }
                    style={{
                      width: 100,
                      textAlign: 'center',
                    }}
                    placeholder="最大值"
                  />
                </Input.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 0]}>
            <Col span={24}>
              <Form.Item label={'公告内容'} labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
                <div className="my-component" style={{ border: '1px solid #d9d9d9' }}>
                  <BraftEditor
                    value={editorState}
                    onChange={handleEditorChange}
                    contentStyle={{ height: '150px' }}
                  />
                </div>
              </Form.Item>
            </Col>
          </Row>
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
  loadingState: loading.models.getRechargeSetting,
  common,
}))(Form.create()(GetRechargeSetting));
