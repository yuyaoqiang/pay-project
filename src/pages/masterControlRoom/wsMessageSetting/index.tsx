import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { message, Card, Form, Button, Spin, Col, Row, Select } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { FromItemLayout } from '@/general';
import { GeneralUploadComponent } from '@/components/UploadComponent';
import { GenerateFormCompoents } from '@/components/FormComponent';
import _ from 'lodash';
import * as validator from '@/utils/validator';
import { constant, helpers } from '@/utils';

const defulatItemLayout_2 = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const defulatItemLayout_1 = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 14,
  },
};
const CustomerQrcodeSetting = props => {
  const [configData, setConfigData] = useState("");
  const [imgAddress, setImgAddress] = useState<string>('');

  const { dispatch, form, loadingState } = props;
  useEffect(() => {
    getDatas();
  }, []);
  const renderForms = {
    row_1: [
      {
        type: 'input',
        label: '地址',
        key: 'host',
        validator: validator.onlyRequier,
        defulatVal: configData,
        placeholder: ' ',
      },
    ],
  };

  const getDatas = () => {
    return dispatch({
      type: 'wsMessageSetting/get',
      payload: {},
    }).then(data => {
      setConfigData(_.get(data,'data.host'));
    });
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      dispatch({
        type: 'wsMessageSetting/update',
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
        <Card title="WS消息设置" bordered={false}>
          <Row gutter={[8, 0]}>{generateCols(renderForms.row_1, 12, defulatItemLayout_2)}</Row>
          ,
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
  loadingState: loading.models.wsMessageSetting,
  common,
}))(Form.create()(CustomerQrcodeSetting));
