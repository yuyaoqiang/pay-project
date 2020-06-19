import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { message, Card, Form, Button, Descriptions, Spin } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import UpdatePsd from './components/UpdatePsd';
import ModifyMoneyPwd from './components/ModifyMoneyPwd';
import GoogleCompoent from './components/GoogleCompoent';
import _ from 'lodash';
import { constant } from '@/utils';
const Info = props => {
  const { dispatch, form, loadingState, user ,userLoadingState} = props;
  const [banks, setBanks] = useState([]);
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [hasModity, handleHasModity] = useState<boolean>(false);
  const [googleModalVisible, handleGoogleModalVisible] = useState<boolean>(false);
  const [rcord, setRcord] = useState({});
  const [updatePwdModalVisible, handleUpdatePwdModalVisible] = useState<boolean>(false);
  const [updateMoneyPwdModalVisible, handleUpdateMoneyPwdModalVisible] = useState<boolean>(false);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = () => {
    return dispatch({
      type: 'user/getUserInfo',
      payload: {},
    });
  };
  const updatePwd = params => {
    dispatch({
      type: 'info/updatePwd',
      payload: { params},
    }).then(data => {
      message.success(constant.alertMessage.UPDATE_SUCCESS);
      handleUpdatePwdModalVisible(false);
    });
  };
  const updateMoneyPwd = params => {
    dispatch({
      type: 'info/modifyMoneyPwd1',
      payload: { params},
    }).then(data => {
      message.success(constant.alertMessage.UPDATE_SUCCESS);
      handleUpdateMoneyPwdModalVisible(false);
    });
  };

  return (
    <PageHeaderWrapper title={false}>
      <Spin spinning={loadingState||userLoadingState} size="large" wrapperClassName="spin">
        <Card title="" bordered={false} key={'indx'}>
          <Descriptions title="用户信息" column={{ xs: 8 }} size={'middle'}>
            <Descriptions.Item label="账号">{user.userName}</Descriptions.Item>
            <Descriptions.Item label="商户号">{user.merchantNum}</Descriptions.Item>
            <Descriptions.Item label="商户名称">{user.merchantName}</Descriptions.Item>
            <Descriptions.Item label="接入密钥">{user.secretKey}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{user.createTime}</Descriptions.Item>
            <Descriptions.Item label="最近登录时间">{user.latelyLoginTime}</Descriptions.Item>
          </Descriptions>
          <div style={{ textAlign: 'center' }}>
            <Button
              style={{ margin: 5 }}
              onClick={() => {
                handleUpdatePwdModalVisible(true);
              }}
              type={'primary'}
              size={'small'}
            >
              修改密码
            </Button>
            <Button
              style={{ margin: 5 }}
              onClick={() => {
                handleUpdateMoneyPwdModalVisible(true);
              }}
              type={'primary'}
              size={'small'}
            >
              修改资金密码
            </Button>
            <Button
              style={{ margin: 5 }}
              onClick={() => {
                handleGoogleModalVisible(true);
              }}
              type={'primary'}
              size={'small'}
            >
              绑定谷歌生成器
            </Button>
          </div>
          <UpdatePsd
            onSubmit={value => {
              updatePwd(value);
            }}
            onCancel={() => handleUpdatePwdModalVisible(false)}
            modalVisible={updatePwdModalVisible}
            confirmLoading={props.loadingState}
            defulat={rcord}
            hasModity={hasModity}
          />
          <ModifyMoneyPwd
            onSubmit={value => {
              updateMoneyPwd(value);
            }}
            onCancel={() => handleUpdateMoneyPwdModalVisible(false)}
            modalVisible={updateMoneyPwdModalVisible}
            confirmLoading={props.loadingState}
            defulat={rcord}
            hasModity={hasModity}
          />
          {googleModalVisible && (
            <GoogleCompoent
              onCancel={() => handleGoogleModalVisible(false)}
              modalVisible={googleModalVisible}
              confirmLoading={props.loadingState}
              defulat={rcord}
              hasModity={hasModity}
              dispatch={dispatch}
            />
          )}
        </Card>
      </Spin>
    </PageHeaderWrapper>
  );
};
export default connect(({ loading, common, user }: ConnectState) => ({
  loadingState: loading.models.info,
  userLoadingState: loading.models.user,
  common,
  user,
}))(Form.create()(Info));
