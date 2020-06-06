import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { message, Card, Form, Button, Col, Row } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { FromItemLayout } from '@/general';
import { GenerateFormCompoents } from '@/components/FormComponent';
import _ from 'lodash';
import * as validator from '@/utils/validator';
import { constant } from '@/utils';

const defulatItemLayout_2 = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};
const defulatItemLayout_1 = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 6,
  },
};
const getRechargeSetting = props => {
  const [configData, setConfigData] = useState({
    id: undefined,
    latelyUpdateTime: undefined,
    limitIpFlag: undefined,
    limitNum: undefined,
    limitTime: undefined,
  });
  const { dispatch, form, loadingState } = props;
  useEffect(() => {
    getDatas();
  }, []);
  const renderForms = {
    row_1: [
      {
        type: 'switch',
        label: '下单启用IP限制',
        key: 'limitIpFlag',
        validator: validator.onlyRequier,
        defulatVal: configData.limitIpFlag,
        placeholder: '',
      },
    ],
    row_2: [
      {
        type: 'input_number',
        label: '同一IP',
        key: 'limitTime',
        validator: validator.onlyRequier,
        defulatVal: configData.limitTime,
        placeholder: '时间不能为空',
      },
      {
        type: 'input_number',
        label: '分钟内下单请求不能超过',
        key: 'limitNum',
        validator: validator.onlyRequier,
        defulatVal: configData.limitNum,
        placeholder: '次数不能为空',
      },
    ],
  };

  const getDatas = () => {
    return dispatch({
      type: 'outOrderSetting/get',
      payload: {},
    }).then(data => {
      setConfigData(data.data);
    });
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      dispatch({
        type: 'outOrderSetting/update',
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
        <Row gutter={[8, 0]}>{generateCols(renderForms.row_1, 12)}</Row>
        <Row gutter={[8, 0]}>
          <Col key={`row-1`} span={4}>
            <GenerateFormCompoents
              formItems={[renderForms.row_2[0]]}
              form={form}
              itemLayout={defulatItemLayout_2}
            />
          </Col>
          <Col key={`row-5`} span={12}>
            <GenerateFormCompoents
              formItems={[renderForms.row_2[1]]}
              form={form}
              itemLayout={defulatItemLayout_1}
            />
          </Col>
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
  loadingState: loading.models.outOrderSetting,
  common,
}))(Form.create()(getRechargeSetting));
