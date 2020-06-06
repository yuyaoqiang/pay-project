import { Icon } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';
import styles from './index.less';
class HeaderSystemState extends React.Component<ConnectProps, ConnectState> {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    this.getSystemMessage();
  };

  getSystemMessage = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'systemInfo/getSystemMessage' });
  };
  intervalId = 0;
  IntervalSystemMessage = () => {
    this.getSystemMessage();
    this.intervalId = window.setInterval(() => {
      this.getSystemMessage();
    }, 10000);
  };
  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  };
  render(): React.ReactNode {
    const { systemMessage } = this.props;
    const className = styles.systemIcon;
    return (
      <>
        {systemMessage && (
          <ul className={className}>
            {/* <li>
              <Icon type="user" />
              当前在线人数:{systemMessage.online_num}
            </li>
            <li>
              <Icon type="setting" />
              充值:{systemMessage.deposit_num}
            </li>
            <li>
              <Icon type="logout" />
              提现:{systemMessage.withdrawal_num}
            </li> */}
          </ul>
        )}
      </>
    );
  }
}

export default connect(({ systemInfo }: ConnectState) => ({
  systemMessage: systemInfo.systemMessage,
}))(HeaderSystemState);
