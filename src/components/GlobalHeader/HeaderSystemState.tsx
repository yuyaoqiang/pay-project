import { Icon } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';
import styles from './index.less';
class HeaderSystemState extends React.Component<ConnectProps, ConnectState> {
  constructor(props) {
    super(props);
  }
  render(): React.ReactNode {
    const className = styles.systemIcon;
    return (
      <>
      </>
    );
  }
}

export default connect(({ systemInfo }: ConnectState) => ({
}))(HeaderSystemState);
