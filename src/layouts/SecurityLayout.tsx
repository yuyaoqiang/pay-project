import React from 'react';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
import { stringify } from 'querystring';
import { ConnectState, ConnectProps } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import { helpers } from '@/utils';
interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: CurrentUser;
}

interface SecurityLayoutState {
  isReady: boolean;
}
class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  getUserInfo = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'user/getUserInfo', payload: {} }).then(res=>{
      this.setState({
        isReady: true,
      });
    });
  };
  hasOpenDarkTheme = () => {
    const { navTheme } = this.props.settings;
    return helpers.isJudge(navTheme === 'realDark')(true, false);
  };
  componentWillMount=()=>{
    this.getUserInfo()
  }
  render() {
    const { children, loading, user } = this.props;
    const { isReady } = this.state;
    const isLogined = user && user.userName;
    const openDarkTheme = this.hasOpenDarkTheme();

    const queryString = stringify({
      redirect: window.location.href,
    });
    if ((!isLogined && loading) || !isReady) {
      return <PageLoading />;
    }
    if (!isLogined) {
      return <Redirect to={`/user/login?${queryString}`}></Redirect>;
    }
    return <div className={openDarkTheme ? 'theme-fix-dark' : 'theme-fix-light'}>{children}</div>;
  }
}

export default connect(({ user, settings, loading }: ConnectState) => ({
  user,
  settings,
  loading: loading.models.user,
}))(SecurityLayout);
