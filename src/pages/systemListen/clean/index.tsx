import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { message, Card, Form, Button, Col, Row, DatePicker } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { FromItemLayout } from '@/general';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import { constant, dateUtils } from '@/utils';
import _ from 'lodash';
import moment from 'moment';
const FormItem = Form.Item;
const { RangePicker } = DatePicker;

const states = [
  {
    id: 'merchantOrder',
    name: '商户订单',
    selectedFlag: false,
  },
  {
    id: 'appeal',
    name: '申诉记录',
    selectedFlag: false,
  },
  {
    id: 'merchantSettlementRecord',
    name: '商户结算记录',
    selectedFlag: false,
  },
  {
    id: 'queueRecord',
    name: '派单排队记录',
    selectedFlag: false,
  },
  {
    id: 'rechargeOrder',
    name: '充值订单',
    selectedFlag: false,
  },
  {
    id: 'withdrawRecord',
    name: '提现记录',
    selectedFlag: false,
  },
  {
    id: 'inviteCode',
    name: '邀请码',
    selectedFlag: false,
  },
  {
    id: 'gatheringCode',
    name: '收款码',
    selectedFlag: false,
  },
  {
    id: 'accountChangeLog',
    name: '帐变日志',
    selectedFlag: false,
  },
  {
    id: 'loginLog',
    name: '登录日志',
    selectedFlag: false,
  },
  {
    id: 'operLog',
    name: '操作日志',
    selectedFlag: false,
  },
];
const getRechargeSetting = props => {
  const [dateRange, setDateRange] = useState({
    hasRadio: '',
    date: [moment(),moment()],
  });
  const { dispatch, form, loadingState } = props;
  const changeDateType = dateRange => {
    setDateRange(dateRange);
  };
  const renderForms = {
    row_1: [
      {
        type: 'checkbox',
        label: '数据类型',
        key: 'dataTypes',
        validator: validator.onlyRequier,
        formData: states,
      },
    ],
  };
  const okHandle = () => {
    if (dateRange.date.length === 0) {
      message.warning('请选择时间范围');
      return;
    }
    form.validateFields((err, fieldsValue) => {
      if (fieldsValue.dataTypes.length===0){
        message.warning('请选择类型');
        return;
      }
      fieldsValue.startTime = moment(dateRange[0]).format(constant.YYYY_MM_DD);
      fieldsValue.endTime = moment(dateRange[1]).format(constant.YYYY_MM_DD);
      dispatch({
        type: 'clean/update',
        payload: { params: fieldsValue },
      }).then(data => {
        message.success("清理成功");
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
      <Card title="数据清理" bordered={false}>
        <Row gutter={[8, 0]}>{generateCols(renderForms.row_1, 24)}</Row>
        <Row gutter={[8, 0]}>
          <Col span={24}>
            <FormItem label={'时间范围'} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
              <RangePicker
                value={dateRange.date}
                disabledDate={current => current && current > moment().endOf('day')}
                onChange={date => {
                  changeDateType({ hasRadio: '', date });
                }}
              />
            </FormItem>
          </Col>
        </Row>
        <div style={{ textAlign: 'center', color: 'red', fontSize: '28' }}>
          清理过的数据是不能恢复的,请谨慎操作!
        </div>
        <div style={{ textAlign: 'center' }}>
          <Button loading={loadingState} onClick={() => okHandle()} type={'danger'} size={'large'}>
            数据清理
          </Button>
        </div>
      </Card>
    </PageHeaderWrapper>
  );
};
export default connect(({ loading, common, user }: ConnectState) => ({
  loadingState: loading.models.clean,
  common,
}))(Form.create()(getRechargeSetting));
