import { connect } from 'dva';
import React from 'react';
import { message, Card, Form, Button, Col } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { FromItemLayout } from '@/general';
import { GenerateFormCompoents } from '@/components/FormComponent';
import _ from 'lodash';
import { constant, helpers } from '@/utils';

const GetMerchantSettlementSetting = props => {
  const { dispatch, form, loadingState } = props;

  const okHandle = () => {
    dispatch({
      type: 'refreshCache/get',
      payload: { },
    }).then(data => {
      message.success(data.message);
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
      <Card title="刷新缓存" bordered={false}>
        <div style={{ textAlign: 'center' }}>
          <Button loading={loadingState} onClick={() => okHandle()} type={'primary'} size={'large'}>
            刷新缓存
          </Button>
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};
export default connect(({ loading, common, user }: ConnectState) => ({
  loadingState: loading.models.refreshCache,
  common,
}))(Form.create()(GetMerchantSettlementSetting));
