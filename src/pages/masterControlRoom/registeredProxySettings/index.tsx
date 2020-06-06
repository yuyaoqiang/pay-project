import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { message, Card, Form, Button, Col, Row } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import { GenerateFormCompoents } from '@/components/FormComponent';
import _ from 'lodash';
import * as validator from '@/utils/validator';
import { constant } from '@/utils';

const defulatItemLayout_1 = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 8,
  },
};
const RegisteredProxySettings = props => {
  const { dispatch, form, loadingState } = props;

  const [configData, setConfigData] = useState({
    agentExplain: undefined,
    id: undefined,
    inviteCodeEffectiveDuration: undefined,
    inviteRegisterEnabled: undefined,
    latelyUpdateTime: undefined,
    onlyOpenMemberAccount: undefined,
    registerEnabled: undefined,
  });
  const [editorState, setEditorState] = useState<any>(BraftEditor.createEditorState(null));

  useEffect(() => {
    setEditorState(BraftEditor.createEditorState(configData.agentExplain));
  }, [configData.agentExplain]);

  useEffect(() => {
    getDatas();
  }, []);
  const renderForms = {
  row_1: [
    {
      type: 'switch',
      label: '开放注册功能',
      key: 'registerEnabled',
      validator: validator.onlyRequier,
      defulatVal: configData.registerEnabled,
      placeholder: '',
    },
    {
      type: 'switch',
      label: '启用邀请码注册模式',
      key: 'inviteRegisterEnabled',
      validator: validator.onlyRequier,
      defulatVal: configData.inviteRegisterEnabled,
      placeholder: '',
    },
  ],
  row_2: [
    {
      type: 'switch',
      label: '限制下级开户只能开会员账号',
      key: 'onlyOpenMemberAccount',
      validator: validator.onlyRequier,
      defulatVal: configData.onlyOpenMemberAccount,
      placeholder: '',
    },
    {
      type: 'input',
      label: '邀请码有效时长',
      key: 'inviteCodeEffectiveDuration',
      validator: validator.onlyRequier,
      defulatVal: configData.inviteCodeEffectiveDuration,
      placeholder: '时间不能为空',
      suffix:"天"
    },
  ],
}
  const getDatas = () => {
    return dispatch({
      type: 'registeredProxySettings/get',
      payload: {},
    }).then(data => {
      setConfigData(data.data);
    });
  };
  const handleEditorChange = editorState => {
    setEditorState(editorState);
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const htmlContent = editorState.toHTML();
      if (!htmlContent) {
        message.warning('请填写公告内容');
        return;
      }
      fieldsValue.agentExplain = htmlContent;
      dispatch({
        type: 'registeredProxySettings/update',
        payload: { params: fieldsValue },
      }).then(data => {
        message.success(data.message || constant.alertMessage.UPDATE_SUCCESS);
      });
    });
  };
  const generateCols = (row, colSize?: number, layout?: any) => {
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
      <Card title="系统设置" bordered={false}>
      <Row gutter={[8, 8]}>{generateCols(renderForms.row_1, 10,defulatItemLayout_1)}</Row>
      <Row gutter={[8, 8]}>{generateCols(renderForms.row_2, 10,defulatItemLayout_1)}</Row>
      <Form>
        <Row gutter={[8, 0]}>
            <Col span={24}>
              <Form.Item label={'公告内容'} labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
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
      </Form>
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
  loadingState: loading.models.registeredProxySettings,
  common,
}))(Form.create()(RegisteredProxySettings));
