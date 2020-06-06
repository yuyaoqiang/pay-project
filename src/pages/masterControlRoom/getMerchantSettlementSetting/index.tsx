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
    span: 10,
  },
  wrapperCol: {
    span: 10,
  },
};
const GetMerchantSettlementSetting = props => {
  const [configData, setConfigData] = useState({
    merchantSettlementRate:  undefined,
    minServiceFee:  undefined,
  });
  const { dispatch, form, loadingState } = props;
  useEffect(() => {
    getDatas();
  }, []);
  const renderForms = {

    row_1: [
      {
        type: 'input',
        label: '按金额的',
        key: 'merchantSettlementRate',
        validator: validator.onlyRequier,
        defulatVal: configData.merchantSettlementRate,
        placeholder: ' ',
        suffix: '%收取服务费',
      },
      {
        type: 'input',
        label: '单笔最低服务费',
        key: 'minServiceFee',
        validator: validator.onlyRequier,
        defulatVal: configData.minServiceFee,
        placeholder: ' ',
      }
    ],

  };

  const getDatas = () => {
    return dispatch({
      type: 'getMerchantSettlementSetting/get',
      payload: {},
    }).then(data => {
      setConfigData(data.data);
    });
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      dispatch({
        type: 'getMerchantSettlementSetting/update',
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
        <Row gutter={[8, 0]}>{generateCols(renderForms.row_1, 12, defulatItemLayout_2)}</Row>
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
  loadingState: loading.models.getMerchantSettlementSetting,
  common,
}))(Form.create()(GetMerchantSettlementSetting));
