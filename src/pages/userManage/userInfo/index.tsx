import React from 'react';
import { connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { Button } from 'antd';

const UserInfo = () => (
  <React.Fragment>
    <Button type="primary">个人信息</Button>
  </React.Fragment>
);
export default connect(({ loading, user }: ConnectState) => ({
  loadingState: loading.models.userInfo,
  permission: user.permission,
}))(UserInfo);
