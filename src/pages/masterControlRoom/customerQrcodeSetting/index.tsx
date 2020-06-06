import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { message, Card, Form, Button, Input, Col, Row, Select } from 'antd';
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
    span: 10,
  },
  wrapperCol: {
    span: 10,
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
  const [configData, setConfigData] = useState({
    customerServiceExplain: undefined,
    qrcodeStorageId: undefined,
  });
  const [imgAddress, setImgAddress] = useState<string>('');
  useEffect(() => {
    setImgAddress(configData.qrcodeStorageId);
  }, [configData]);
  const { dispatch, form, loadingState } = props;
  useEffect(() => {
    getDatas();
  }, []);
  const renderForms = {
    row_1: [
      {
        type: 'textarea',
        label: '客服说明',
        key: 'customerServiceExplain',
        validator: validator.onlyRequier,
        defulatVal: configData.customerServiceExplain,
        placeholder: ' ',
      },
    ],
  };

  const getDatas = () => {
    return dispatch({
      type: 'customerQrcodeSetting/get',
      payload: {},
    }).then(data => {
      setConfigData(data.data);
    });
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.qrcodeStorageId = imgAddress;
      dispatch({
        type: 'customerQrcodeSetting/update',
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
        <Form>
          <Form.Item label={'客服二维码'} {...defulatItemLayout_1}>
            <GeneralUploadComponent {...props} imgAddress={`/storage/fetch/${imgAddress}`} setImgAddress={setImgAddress} />
          </Form.Item>
        </Form>
        ,
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
}))(Form.create()(CustomerQrcodeSetting));
