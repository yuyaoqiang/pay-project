import { connect } from 'dva';
import React, { useState, useRef, useEffect } from 'react';
import { Button, message, Divider, Modal, Popover } from 'antd';
import { BeforeCurrentDateComponent } from '@/components/DateComponent';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import InfoComponent from './components/InfoComponent';
import AdjustCashDeposit from './components/AdjustCashDeposit';

import { helpers, constant, utils } from '@/utils';
import styles from './style.less';
import _ from 'lodash';
import moment from 'moment';

const Settlement = props => {
  const [infoModalVisible, handleInfoModalVisible] = useState<boolean>(false);
  const [adjustCashDeposit, handleAdjustCashDeposit] = useState<boolean>(false);
  const [hasModity, handleHasModity] = useState<boolean>(false);
  const [rcord, setRcord] = useState({});
  const actionRef = useRef<ActionType>();
  const [dateRange, setDateRange] = useState({
    hasRadio: '',
    date: [],
  });
  const { dispatch, common } = props;
  const changeDateType = dateRange => {
    setDateRange(dateRange);
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      align: 'center',
      render: (item, record: any) => {
        return (
          <Button
            type="link"
            onClick={() => {
              getRcord(record);
              handleInfoModalVisible(true);
            }}
            size="small"
          >{`${record.orderNo}`}</Button>
        );
      },
    },
    {
      title: '商户',
      dataIndex: 'merchantId',
      align: 'center',
      hideInTable: true,
      valueEnum: utils.getValueEnum(common.merchantList, list => {
        return [
          { type: '', name: '全部' },
          ...list.map(m => {
            return {
              type: m.id,
              name: m.merchantName,
            };
          }),
        ];
      }),
    },
    {
      title: '商户',
      dataIndex: 'merchantName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '金额',
      dataIndex: 'withdrawAmount',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '服务费',
      dataIndex: 'serviceFee',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '实际到账',
      dataIndex: 'actualToAccount',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: '结算银行卡',
      hideInSearch: true,
      align: 'center',
      render: (item, record: any) => {
        return (
          <>
            <p style={{ margin: 0 }}>{record.openAccountBank}</p>
            <p style={{ margin: 0 }}>{record.accountHolder}</p>
            <p style={{ margin: 0 }}>{record.bankCardAccount}</p>
          </>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      align: 'center',
      valueEnum: utils.getValueEnum(common.merchantSettlementState, list => {
        return [
          { type: '', name: '全部' },
          ...list.map(m => {
            return {
              type: m.dictItemCode,
              name: m.dictItemName,
            };
          }),
        ];
      }),
    },
    {
      title: '申请时间',
      dataIndex: 'dateRange',
      align: 'center',
      hideInTable: true,
      renderFormItem: (item, self: any) => {
        return (
          <BeforeCurrentDateComponent
            self={self}
            dateRange={dateRange}
            changeDateType={changeDateType}
          />
        );
      },
    },
    {
      title: '申请时间',
      dataIndex: 'applyTime',
      align: 'center',
      hideInSearch: true,
      render: (item: string) => {
        const strs = helpers.isJudge(_.isEmpty(item))([], item.split(' '));
        return (
          <>
            <p className={styles.mp0}>{strs[0]}</p>
            <p className={styles.mp0}>{strs[1]}</p>
          </>
        );
      },
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record: any) => {
        return (
          <div>
            {helpers.isJudge(record.state == '1')(
              <Button
                type={'primary'}
                size={'small'}
                onClick={() => {
                  getRcord(record);
                  handleAdjustCashDeposit(true);
                }}
              >
                进行审核
              </Button>,
              null,
            )}
            {helpers.isJudge(record.state == '2')(
              <>
                <Button
                  type={'primary'}
                  size={'small'}
                  onClick={() => {
                    getRcord(record);
                    handleAdjustCashDeposit(true);
                  }}
                >
                  确认到帐
                </Button>
                <Divider type="vertical" />
                <Button
                  type={'danger'}
                  size={'small'}
                  onClick={() => {
                    getRcord(record);
                    handleAdjustCashDeposit(true);
                  }}
                >
                  审核不通过
                </Button>
              </>,
              null,
            )}
          </div>
        );
      },
    },
  ];
  // if (row.state == '1') {
  //   return [ '<button type="button" class="withdraw-approval-btn btn btn-outline-primary btn-sm" style="margin-right: 4px;">进行审核</button>' ].join('');
  // } else if (row.state == '2') {
  //   return [ '<button type="button" class="confirm-credited-btn btn btn-outline-primary btn-sm" style="margin-right: 4px;">确认到帐</button>',
  //       '<button type="button" class="not-approved-btn btn btn-outline-secondary btn-sm">审核不通过</button>' ].join('');
  // }
  useEffect(() => {
    findMerchantSettlementState();
  }, []);
  const findMerchantSettlementState = () => {
    dispatch({
      type: 'common/findMerchantSettlementState',
      payload: {},
    });
  };
  const getDatas = params => {
    if (!params.dateRange) {
      params.applyStartTime = moment().format(constant.YYYY_MM_DD);
      params.applyEndTime = moment().format(constant.YYYY_MM_DD);
    } else {
      params.applyStartTime = moment(params.dateRange[0]).format(constant.YYYY_MM_DD);
      params.applyEndTime = moment(params.dateRange[1]).format(constant.YYYY_MM_DD);
    }
    return dispatch({
      type: 'settlement/list',
      payload: { params },
    }).then(data => data.data);
  };
  const getRcord = async data => {
    setRcord(data);
    handleHasModity(true);
  };
  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem>
        rowKey="id"
        actionRef={actionRef}
        headerTitle="商户结算"
        request={params => {
          const { current: pageNum, pageSize, ...rest } = params;
          params = { pageNum, pageSize, ...rest };
          return getDatas(params);
        }}
        columns={columns}
        bordered
        size={'small'}
        options={{
          fullScreen: false,
          setting: true,
          reload: true,
          density: false,
        }}
        pagination={{
          defaultCurrent: 1,
          defaultPageSize: 20,
          position: 'bottom',
          showTotal: (total, range) => `共${total}条记录`,
        }}
      />
      <InfoComponent
        onCancel={() => handleInfoModalVisible(false)}
        modalVisible={infoModalVisible}
        confirmLoading={props.loadingState}
        defulat={rcord}
      />
      <AdjustCashDeposit
        onCancel={() => handleAdjustCashDeposit(false)}
        modalVisible={adjustCashDeposit}
        confirmLoading={props.loadingState}
        defulat={rcord}
        dispatch={dispatch}
        actionRef={actionRef}
      />
    </PageHeaderWrapper>
  );
};
export default connect(({ loading, user, common }: ConnectState) => ({
  loadingState: loading.models.settlement,
  user,
  common,
}))(Settlement);
