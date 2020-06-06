import React, { Component } from 'react';
import { Tag, message } from 'antd';
import { connect } from 'dva';
import groupBy from 'lodash/groupBy';
import moment from 'moment';
import { NoticeItem } from '@/models/global';
import NoticeIcon from '../NoticeIcon';
import { CurrentUser } from '@/models/user';
import { ConnectProps, ConnectState } from '@/models/connect';
import styles from './index.less';
import { helpers } from '@/utils';

export interface GlobalHeaderRightProps extends ConnectProps {
  notices?: NoticeItem[];
  currentUser?: CurrentUser;
  fetchingNotices?: boolean;
  onNoticeVisibleChange?: (visible: boolean) => void;
  onNoticeClear?: (tabName?: string) => void;
}

class GlobalHeaderRight extends Component<GlobalHeaderRightProps> {

  changeReadState = (clickedItem: NoticeItem): void => {
    const { id } = clickedItem;
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'global/changeNoticeReadState',
        payload: id,
      });
    }
  };

  handleNoticeClear = (title: string, key: string) => {
    const { dispatch } = this.props;
    message.success(`${'清空了'} ${title}`);
    if (dispatch) {
      dispatch({
        type: 'global/clearNotices',
        payload: key,
      });
    }
  };

  getNoticeData = (): {
    [key: string]: NoticeItem[];
  } => {
    const { notices = [],systemInfo } = this.props;
    if (notices.length === 0) {
      return {};
    }

    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };

      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime as string).fromNow();
      }

      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }

      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }
        [newNotice.status];
        newNotice.extra = (
          <Tag
            color={color}
            style={{
              marginRight: 0,
            }}
          >
            {newNotice.extra}
          </Tag>
        );
      }

      return newNotice;
    });
    return groupBy(newNotices, 'type');
  };

  getUnreadData = (noticeData: { [key: string]: NoticeItem[] }) => {
    const unreadMsg: {
      [key: string]: number;
    } = {};
    Object.keys(noticeData).forEach(key => {
      const value = noticeData[key];

      if (!unreadMsg[key]) {
        unreadMsg[key] = 0;
      }

      if (Array.isArray(value)) {
        unreadMsg[key] = value.filter(item => !item.read).length;
      }
    });
    return unreadMsg;
  };

  render() {
    const { currentUser, fetchingNotices, onNoticeVisibleChange ,systemInfo} = this.props;
    const noticeData = this.getNoticeData();
    const unreadMsg = this.getUnreadData(noticeData);
    return (
      <NoticeIcon
        className={styles.action}
        count={helpers.isJudge(!systemInfo.message)('',systemInfo.message.length)}
        onItemClick={item => {
          this.changeReadState(item as NoticeItem);
        }}
        loading={fetchingNotices}
        clearText="清空"
        viewMoreText="查看更多"
        onClear={this.handleNoticeClear}
        onPopupVisibleChange={onNoticeVisibleChange}
        onViewMore={() => message.info('Click on view more')}
        clearClose
      >
        <NoticeIcon.Tab
          tabKey="appeal"
          count={helpers.getTotal('appeal',systemInfo.message)}
          list={helpers.getList('appeal',systemInfo.message)}
          title="申诉"
          emptyText="你已查看所有申诉"
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="recharge"
          count={helpers.getTotal('recharge',systemInfo.message)}
          list={helpers.getList('recharge',systemInfo.message)}
          title="充值"
          emptyText="您已读完所有充值"
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="withdraw"
          title="提现"
          emptyText="你已完成所有提现"
          count={helpers.getTotal('withdraw',systemInfo.message)}
          list={helpers.getList('withdraw',systemInfo.message)}
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="settlement"
          title="结算"
          emptyText="你已完成所有结算"
          count={helpers.getTotal('settlement',systemInfo.message)}
          list={helpers.getList('settlement',systemInfo.message)}
          showViewMore
        />
        <NoticeIcon.Tab
          tabKey="auditGatheringCode"
          title="审核收款码"
          emptyText="审核收款码"
          count={helpers.getTotal('auditGatheringCode',systemInfo.message)}
          list={helpers.getList('auditGatheringCode',systemInfo.message)}
          showViewMore
        />
      </NoticeIcon>
    );
  }
}

export default connect(({ user, global,systemInfo, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  systemInfo:systemInfo,
  fetchingMoreNotices: loading.effects['global/fetchMoreNotices'],
  fetchingNotices: loading.effects['global/fetchNotices'],
  notices: global.notices,
}))(GlobalHeaderRight);
