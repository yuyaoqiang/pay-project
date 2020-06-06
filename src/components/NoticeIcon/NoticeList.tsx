import { Avatar, List } from 'antd';

import React from 'react';
import classNames from 'classnames';
import { NoticeIconData } from './index';
import styles from './NoticeList.less';
import { helpers } from '@/utils';
import { router } from 'umi';

export interface NoticeIconTabProps {
  count?: number;
  name?: string;
  showClear?: boolean;
  showViewMore?: boolean;
  style?: React.CSSProperties;
  title: string;
  tabKey: string;
  data?: NoticeIconData[];
  onClick?: (item: NoticeIconData) => void;
  onClear?: () => void;
  emptyText?: string;
  clearText?: string;
  viewMoreText?: string;
  list: NoticeIconData[];
  onViewMore?: (e: any) => void;
}
const goPage = item => {
  if (item.type === 'appeal') router.push(`/appealRecord?appealState=1`);
  if (item.type === 'recharge') router.push(`/recharge/rechargeOrder?orderState=1`);
  if (item.type === 'withdraw') router.push(`/recharge/withdrawRecord?state=1`);
  if (item.type === 'settlement') router.push(`/record/settlement?state=1`);
  if (item.type === 'auditGatheringCode') router.push(`/gathering/code?state=2`);
};
const NoticeList: React.SFC<NoticeIconTabProps> = ({
  data = [],
  onClick,
  onClear,
  title,
  onViewMore,
  emptyText,
  showClear = false,
  clearText,
  viewMoreText,
  showViewMore = false,
}) => {
  if (data.length === 0) {
    return (
      <div className={styles.notFound}>
        <img
          src="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
          alt="not found"
        />
        <div>{emptyText}</div>
      </div>
    );
  }

  return (
    <div>
      <List<NoticeIconData>
        className={styles.list}
        dataSource={data.slice(0, 5)}
        renderItem={(item: any, i) => {
          const itemCls = classNames(styles.item, {
            [styles.read]: item.read,
          });
          return (
            <List.Item className={itemCls} key={item.key || i} onClick={() => goPage(item)}>
              {item.type === 'appeal' && (
                <List.Item.Meta
                  className={styles.meta}
                  avatar={
                    <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png" />
                  }
                  title={
                    <div className={styles.title}>
                      收到来自<span style={{ color: 'red' }}>{item.merchantName}</span>
                      的申述请求,申诉类型为
                      <span style={{ color: 'red' }}>{item.appealTypeName}</span>
                      <div className={styles.extra}>{item.extra}</div>
                    </div>
                  }
                  description={
                    <div>
                      <div className={styles.datetime}>{item.initiationTime}</div>
                    </div>
                  }
                />
              )}
              {item.type === 'recharge' && (
                <List.Item.Meta
                  className={styles.meta}
                  avatar={
                    <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png" />
                  }
                  title={
                    <div className={styles.title}>
                      收到来自用户<span style={{ color: 'red' }}>{item.userName}</span>
                      的充值请求,充值金额为
                      <span style={{ color: 'red' }}>{item.rechargeAmount}元</span>
                      <div className={styles.extra}>{item.extra}</div>
                    </div>
                  }
                  description={
                    <div>
                      <div className={styles.datetime}>{item.submitTime}</div>
                    </div>
                  }
                />
              )}
              {item.type === 'withdraw' && (
                <List.Item.Meta
                  className={styles.meta}
                  avatar={
                    <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png" />
                  }
                  title={
                    <div className={styles.title}>
                      收到来自用户<span style={{ color: 'red' }}>{item.userName}</span>
                      的提现请求,提现金额为
                      <span style={{ color: 'red' }}>{item.withdrawAmount}元</span>
                      <div className={styles.extra}>{item.extra}</div>
                    </div>
                  }
                  description={
                    <div>
                      <div className={styles.datetime}>{item.submitTime}</div>
                    </div>
                  }
                />
              )}
              {item.type === 'settlement' && (
                <List.Item.Meta
                  className={styles.meta}
                  avatar={
                    <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png" />
                  }
                  title={
                    <div className={styles.title}>
                      收到来自商户<span style={{ color: 'red' }}>{item.merchantName}</span>
                      的结算请求,结算金额为
                      <span style={{ color: 'red' }}>{item.withdrawAmount}元</span>
                      <div className={styles.extra}>{item.extra}</div>
                    </div>
                  }
                  description={
                    <div>
                      <div className={styles.datetime}>{item.applyTime}</div>
                    </div>
                  }
                />
              )}
              {item.type === 'auditGatheringCode' && (
                <List.Item.Meta
                  className={styles.meta}
                  avatar={
                    <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png" />
                  }
                  title={
                    <div className={styles.title}>
                      收到所属账号<span style={{ color: 'red' }}>{item.userName}</span>
                      的操作请求,类型为
                      <span style={{ color: 'red' }}>{item.auditTypeName}收款码</span>
                      <div className={styles.extra}>{item.extra}</div>
                    </div>
                  }
                  description={
                    <div>
                      <div className={styles.datetime}>{item.createTime}</div>
                    </div>
                  }
                />
              )}
            </List.Item>
          );
        }}
      />
      {/* <div className={styles.bottomBar}>
        {showClear ? (
          <div onClick={onClear}>
            {clearText} {title}
          </div>
        ) : null}
        {showViewMore ? (
          <div
            onClick={e => {
              if (onViewMore) {
                onViewMore(e);
              }
            }}
          >
            {viewMoreText}
          </div>
        ) : null}
      </div> */}
    </div>
  );
};

export default NoticeList;
