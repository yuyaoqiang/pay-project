import { Alert, Checkbox } from 'antd';
import React, { Component } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Dispatch, AnyAction } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';
import { ConnectState } from '@/models/connect';

const { Tab, UserName, Password, Mobile, GoogleVerCode, Submit } = LoginComponents;
interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  userLogin: any;
  submitting?: boolean;
  getUserInfo?: boolean;
}
interface LoginState {
  utype: string;
  autoLogin: boolean;
}

class Login extends Component<LoginProps, LoginState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: LoginState = {
    utype: 'account',
    autoLogin: true,
  };

  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (err: unknown, values: any) => {
    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'user/login',
        payload: { ...values },
      });
    }
  };

  onTabChange = (utype: string) => {
    this.setState({
      utype,
    });
  };

  onGetCaptcha = () =>
    new Promise<boolean>((resolve, reject) => {
      if (!this.loginForm) {
        return;
      }

      this.loginForm.validateFields([], {}, async (err: unknown, values: any) => {
        if (err) {
          reject(err);
        } else {
          const { dispatch } = this.props;

          try {
            const success = await ((dispatch({
              type: 'login/getCaptcha',
              payload: values.mobile,
            }) as unknown) as Promise<unknown>);
            resolve(!!success);
          } catch (error) {
            reject(error);
          }
        }
      });
    });

  renderMessage = (content: string) => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { submitting, getUserInfo } = this.props;
    const { utype } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={utype}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={(form?: FormComponentProps['form']) => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab="商户登录">
            <UserName
              name="username"
              placeholder={`${'商户名'}`}
              rules={[
                {
                  required: true,
                  message: '请输入商户名!',
                },
              ]}
            />
            <Password
              name="password"
              placeholder={'请输入密码!'}
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();

                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
            <GoogleVerCode
              name="googleVerCode"
              placeholder={`如未绑定谷歌安全密钥，此处留空!`}
              rules={[
                {
                  required: false,
                  message: '如未绑定谷歌安全密钥，此处留空!',
                },
              ]}
            />
          </Tab>
          {/* <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>
          </div> */}
          <Submit loading={submitting || getUserInfo}>登录</Submit>
        </LoginComponents>
      </div>
    );
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  userLogin: user,
  submitting: loading.effects['user/login'],
  getUserInfo: loading.effects['user/getUserInfo'],
}))(Login);
