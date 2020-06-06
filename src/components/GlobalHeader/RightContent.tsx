import { Icon, Tooltip, Menu } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { ConnectProps, ConnectState } from '@/models/connect';
import Avatar from './AvatarDropdown';
import NoticeIconView from './NoticeIconView';

import HeaderSystemState from './HeaderSystemState';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark'| 'realDark';
export interface GlobalHeaderRightProps extends ConnectProps {
  theme?: SiderTheme;
  layout: 'sidemenu' | 'topmenu';
}

const GlobalHeaderRight: React.SFC<GlobalHeaderRightProps> = props => {
  const { theme, layout } = props;
  let className = styles.right;
  if (theme === 'dark' && layout === 'topmenu') {
    className = `${styles.right}  ${styles.dark}`;
  }
  return (
    <div className={className}>
      <NoticeIconView/>
      <HeaderSystemState />
      <Avatar />
    </div>
  );
};

export default connect(({ settings, user }: ConnectState) => ({
  theme: settings.navTheme,
  layout: settings.layout,
}))(GlobalHeaderRight);
