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
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const getRechargeSetting = props => {
  const [banks, setBanks] = useState([]);
  const { dispatch, form, loadingState, user } = props;
  useEffect(() => {
    getBank();
  }, []);
  const renderForms = [
    {
      type: 'input_number',
      label: '提现金额',
      key: 'withdrawAmount',
      validator: validator.onlyRequier,
      placeholder: '请输入提现金额',
    },
    {
      type: 'select',
      label: '结算银行卡',
      key: 'merchantBankCardId',
      validator: validator.onlyRequier,
      placeholder: '请选择银行卡',
      formData: banks.map(item => {
        return {
          name: `${item.accountHolder}-${item.openAccountBank}-${item.bankCardAccount}`,
          type: item.id,
        };
      }),
    },
    {
      type: 'input_number',
      label: '资金密码',
      key: 'moneyPwd',
      validator: validator.onlyRequier,
      placeholder: '请输入资金密码',
    },
  ];
  const getBank = () => {
    return dispatch({
      type: 'settlementRecord/getBank',
      payload: {},
    }).then(data => {
      setBanks(data.data);
    });
  };
  const getUser = () => {
    return dispatch({
      type: 'user/getUserInfo',
      payload: {},
    });
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      dispatch({
        type: 'settlementRecord/update',
        payload: { params: fieldsValue },
      }).then(data => {
        getUser();
        message.success(data.message || '提现成功');
      });
    });
  };
  return (
    <PageHeaderWrapper title={false}>
      <Spin spinning={loadingState} size="large" wrapperClassName="spin">
        <Card title="申请结算" bordered={false} key={'indx'}>
          <div style={{ textAlign: 'center' }}>
            <Button type={'danger'} ghost size={'large'}>
              可提现金额{user.withdrawableAmount}
            </Button>
          </div>
          <GenerateFormCompoents
            formItems={renderForms}
            form={form}
            itemLayout={defulatItemLayout_2}
          />
          <div style={{ textAlign: 'center' }}>
            <Button onClick={() => okHandle()} type={'primary'} size={'large'}>
              提交
            </Button>
          </div>
        </Card>
      </Spin>
    </PageHeaderWrapper>
  );
};
export default connect(({ loading, common, user }: ConnectState) => ({
  loadingState: loading.models.settlementRecord,
  common,
  user,
}))(Form.create()(getRechargeSetting));
