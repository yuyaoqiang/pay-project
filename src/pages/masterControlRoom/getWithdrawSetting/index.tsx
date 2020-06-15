import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { message, Card, Form, Button, Col, Row, Input,Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { FromItemLayout } from '@/general';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { GenerateFormCompoents } from '@/components/FormComponent';
import _ from 'lodash';
import * as validator from '@/utils/validator';
import { constant } from '@/utils';

const defulatItemLayout_2 = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 10,
  },
};
const getRechargeSetting = props => {
  const { dispatch, form, loadingState } = props;
  const [configData, setConfigData] = useState({
    everydayWithdrawTimesUpperLimit: undefined,
    id: undefined,
    latelyUpdateTime: undefined,
    withdrawExplain: undefined,
    withdrawLowerLimit: undefined,
    withdrawUpperLimit: undefined,
  });
  const [editorState, setEditorState] = useState<any>(BraftEditor.createEditorState(null));

  useEffect(() => {
    setEditorState(BraftEditor.createEditorState(configData.withdrawExplain));
  }, [configData.withdrawExplain]);
  useEffect(() => {
    getDatas();
  }, []);
  const renderForms = {
    row_1: [
      {
        type: 'input',
        label: '每日提现次数上限',
        key: 'everydayWithdrawTimesUpperLimit',
        validator: validator.onlyRequier,
        defulatVal: configData.everydayWithdrawTimesUpperLimit,
        placeholder: '',
        suffix: '次',
      },
    ],
  };
  const handleEditorChange = editorState => {
    setEditorState(editorState);
  };
  const getDatas = () => {
    return dispatch({
      type: 'getWithdrawSetting/get',
      payload: {},
    }).then(data => {
      setConfigData(data.data);
    });
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (!configData.withdrawLowerLimit || !configData.withdrawUpperLimit) {
        message.error('请填写限额/最低/最高');
        return;
      }
      const htmlContent = editorState.toHTML();
      if (!htmlContent) {
        message.warning('请填写公告内容');
        return;
      }
      fieldsValue.withdrawLowerLimit = configData.withdrawLowerLimit;
      fieldsValue.withdrawUpperLimit = configData.withdrawUpperLimit;
      fieldsValue.withdrawExplain = htmlContent;
      dispatch({
        type: 'getWithdrawSetting/update',
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
          <Row gutter={[8, 0]}>{generateCols(renderForms.row_1, 12, defulatItemLayout_2)}</Row>
          <Row>
            <Col key={`row-16`} span={12}>
              <Form.Item label="限额/最低/最高" labelCol={{ span: 10 }} wrapperCol={{ span: 10 }}>
                <Input.Group compact>
                  <Input
                    style={{ width: 100, textAlign: 'center' }}
                    value={configData.withdrawLowerLimit}
                    onChange={item =>
                      setConfigData({ ...configData, withdrawLowerLimit: item.target.value })
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
                    value={configData.withdrawUpperLimit}
                    onChange={item =>
                      setConfigData({ ...configData, withdrawUpperLimit: item.target.value })
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
              <Form.Item label={'提现说明'} labelCol={{ span: 5 }} wrapperCol={{ span: 17 }}>
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
  loadingState: loading.models.getWithdrawSetting,
  common,
}))(Form.create()(getRechargeSetting));
