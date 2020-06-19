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
  const [payChannel, setPayChannel] = useState([]);
  const actionRef = useRef<ActionType>();
  const [dateRange, setDateRange] = useState({
    hasRadio: '',
    date: [moment(),moment()],
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
      title: '充值用户',
      dataIndex: 'userName',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '支付通道',
      dataIndex: 'payChannelId',
      align: 'center',
      hideInTable: true,
      valueEnum: utils.getValueEnum(payChannel, list => {
        return list.map(m => {
          return {
            type: m.id,
            name: m.channelName,
          };
        });
      }),
    },
    {
      title: '订单状态',
      dataIndex: 'orderState',
      align: 'center',
      valueEnum: utils.getValueEnum(common.rechargeOrderState, list => {
        return list.map(m => {
          return {
            type: m.dictItemCode,
            name: m.dictItemName,
          };
        });
      }),
    },
    {
      title: '支付通道/充值金额/实际支付',
      align: 'center',
      hideInSearch: true,
      render: (item, record: any) => {
        return (
          <div>
            {`${record.payChannelName}/${record.rechargeAmount}`}
            {helpers.isJudge(record.actualPayAmount != null)(`/${record.actualPayAmount}`, null)}
          </div>
        );
      },
    },
    {
      title: '提交时间',
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
      title: '提交时间',
      dataIndex: 'submitTime',
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
      title: '支付时间',
      dataIndex: 'payTime',
      align: 'center',
      hideInSearch: true,
      render: (item: string) => {
        let strs = [];
        if (item == null) {
          item = '';
        } else {
          strs = item.split(' ');
        }
        return (
          <>
            <p className={styles.mp0}>{strs[0]}</p>
            <p className={styles.mp0}>{strs[1]}</p>
          </>
        );
      },
    },
    {
      title: '结算时间',
      dataIndex: 'settlementTime',
      align: 'center',
      hideInSearch: true,
      render: (item: string) => {
        let strs = [];
        if (item == null) {
          item = '';
        } else {
          strs = item.split(' ');
        }
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
      width:110,
      render: (_, record: any) => {
        return (
          <div>
            {helpers.isJudge(record.orderState == '1')(
              helpers.isJudge(record.depositTime != null)(
                <Button
                  type={'primary'}
                  size={'small'}
                  onClick={() => {
                    handleHasModity(true)
                    findRechargeOrderById(record.id);
                  }}
                >
                  审核
                </Button>,
                <Button
                  type={'primary'}
                  size={'small'}
                  onClick={() => {
                    getRcord(record);
                    handleAdjustCashDeposit(true);
                  }}
                >
                  取消订单
                </Button>,
              ),
              null,
            )}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    findRechargeOrderState();
    findAllPayChannel();
  }, []);
  const findRechargeOrderState = () => {
    dispatch({
      type: 'common/findRechargeOrderState',
      payload: {},
    });
  };
  const findRechargeOrderById = id => {
    dispatch({
      type: 'rechargeOrder/findRechargeOrderById',
      payload: { params: { id } },
    }).then(data => {
      handleAdjustCashDeposit(true);
      getRcord(data.data);
      handleHasModity(false)
    });
  };
  const findAllPayChannel = () => {
    dispatch({
      type: 'rechargeOrder/findAllPayChannel',
      payload: {},
    }).then(res => {
      setPayChannel(res.data);
    });
  };

  const exportExcel = () => {
    var oReq = new XMLHttpRequest();
    oReq.open('get', 'api/recharge/exportExcel', true);
    oReq.responseType = 'blob';
    oReq.setRequestHeader('Content-Type', 'application/json');
    oReq.onload = function(oEvent) {
      var content = oReq.response;
      var elink = document.createElement('a');
      elink.download = '充值订单.xlsx';
      elink.style.display = 'none';
      var blob = new Blob([content]);
      elink.href = URL.createObjectURL(blob);
      document.body.appendChild(elink);
      elink.click();
      document.body.removeChild(elink);
    };
    oReq.send();
  };

  const getDatas = params => {
    if (!params.dateRange) {
      params.submitStartTime = moment().format(constant.YYYY_MM_DD);
      params.submitEndTime = moment().format(constant.YYYY_MM_DD);
    } else {
      params.submitStartTime = moment(params.dateRange[0]).format(constant.YYYY_MM_DD);
      params.submitEndTime = moment(params.dateRange[1]).format(constant.YYYY_MM_DD);
    }
    return dispatch({
      type: 'rechargeOrder/list',
      payload: { params },
    }).then(data => {
      return data.data;
    });
  };
  const getRcord = async data => {
    setRcord(data);
    handleHasModity(true);
  };
  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem>
        rowKey="id"
        toolBarRender={() => [<Button onClick={exportExcel}>导出</Button>]}
        actionRef={actionRef}
        headerTitle="充值订单"
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
      {handleInfoModalVisible && (
        <InfoComponent
          onCancel={() => handleInfoModalVisible(false)}
          modalVisible={infoModalVisible}
          confirmLoading={props.loadingState}
          defulat={rcord}
        />
      )}
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
  loadingState: loading.models.rechargeOrder,
  user,
  common,
}))(Settlement);
