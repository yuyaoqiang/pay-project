import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { message, Card, Form, Button, Col, Row, Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import _ from 'lodash';

const getRechargeSetting = props => {
  const { dispatch, form, loadingState, user } = props;
  const getUser = () => {
    return dispatch({
      type: 'user/getUserInfo',
      payload: {},
    });
  };
  const downloadInterfaceDoc = () => {
    const link = document.createElement('a')
    const body = document.querySelector('body')
    link.href = "api/merchant/downloadInterfaceDoc"
    link.download = "汇丰宝付V1.0.doc"
    link.style.display = 'none'
    body.appendChild(link)
    link.click()
    body.removeChild(link)
    window.open()
  };
  const downloadInterfaceDemo = () => {
    const link = document.createElement('a')
    const body = document.querySelector('body')
    link.href = "api/merchant/downloadInterfaceDemo"
    link.download = "Demo.java"
    link.style.display = 'none'
    body.appendChild(link)
    link.click()
    body.removeChild(link)
    window.open()
  };

  return (
    <PageHeaderWrapper title={false}>
        <Card title="" bordered={false} key={'indx'}>
          <div style={{ textAlign: 'center' }}>
            <Button style={{margin:5}} onClick={() => downloadInterfaceDoc()} type={'primary'} >
              点击下载对接文档
            </Button>
            <Button style={{margin:5}} onClick={() => downloadInterfaceDemo()} type={'primary'}>
              点击下载对接Demo
            </Button>
          </div>
        </Card>
    </PageHeaderWrapper>
  );
};
export default connect(({ loading, common, user }: ConnectState) => ({
  common,
  user,
}))(Form.create()(getRechargeSetting));
