import { connect } from 'dva';
import React, { useState, useRef } from 'react';
import { Button, message, Card, Spin, Modal } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { BeforeCurrentDateComponent } from '@/components/DateComponent';
import InsertModityComponent from './components/InsertModityComponent';
import InfoComponent from './components/InfoComponent';
import { helpers, utils, constant } from '@/utils';
import _ from 'lodash';
import moment from 'moment';
import styles from './style.less';
const MerchantOrder = props => {
  const [dateRange, setDateRange] = useState({
    hasRadio: '',
    date: [moment(), moment()],
  });
  const [noBounty, setNoBounty] = useState(false);
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [data, setData] = useState<any>({});
  const [infoModalVisible, handleInfoModalVisible] = useState<boolean>(false);
  const [hasModity, handleHasModity] = useState<boolean>(false);
  const [rcord, setRcord] = useState<any>({});
  const actionRef = useRef<ActionType>();
  const { dispatch, common } = props;
  const changeDateType = dateRange => {
    setDateRange(dateRange);
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '订单号',
      dataIndex: 'orderNo',
      align: 'center',
      hideInTable: true,
    },
    {
      title: '商户订单号',
      dataIndex: 'orderNo',
      align: 'center',
      hideInTable: true,
    },
    {
      title: '订单号/商户/商户订单号',
      ellipsis: true,
      align: 'center',
      render: (item, rcord: any) => {
        return (
          <a
            onClick={() => {
              getRcord(rcord);
              setNoBounty(false);
              handleInfoModalVisible(true);
            }}
          >
            <p className={styles.mg0}>{rcord.orderNo}</p>
            <p className={styles.mg0}> {rcord.merchantName}</p>
            <p className={styles.mg0}>{rcord.payInfo && rcord.payInfo.orderNo}</p>
          </a>
        );
      },
    },

    {
      title: '订单状态',
      dataIndex: 'orderStateName',
      align: 'center',
      width: 80,
      hideInSearch: true,
      render: (item, record: any) => {
        return (
          <span className={helpers.isJudge(record.orderState == '4')(styles['color-green'], null)}>
            {item}
          </span>
        );
      },
    },
    {
      title: '订单状态',
      dataIndex: 'orderState',
      align: 'center',
      hideInTable: true,
      valueEnum: utils.getValueEnum(common.orderState, list => {
        return [
          { name: '全部', type: 'all' },
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
      title: '通道',
      dataIndex: 'channelId',
      ellipsis: true,
      align: 'center',
      hideInTable: true,
      valueEnum: utils.getValueEnum(common.gatheringChannel, list => {
        return [
          { name: '全部', type: 'all' },
          ...list.map(m => {
            return {
              type: m.id,
              name: m.channelName,
            };
          }),
        ];
      }),
    },
    {
      title: '通道/金额/费率',
      ellipsis: true,
      align: 'center',
      render: (item, record: any) => {
        return (
          <div>
            <p>
              {record.gatheringChannelName +
                '/' +
                record.gatheringAmount +
                common.sysSetting.currencyUnit +
                '/' +
                record.rate +
                '%'}
            </p>
            {helpers.isJudge(record.merchantAgentRate != null)(
              <p>商户代理费率:{record.merchantAgentRate}%</p>,
              null,
            )}
          </div>
        );
      },
    },
    {
      title: '提交时间',
      dataIndex: 'submitTime',
      ellipsis: true,
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '通知状态',
      ellipsis: true,
      align: 'center',
      hideInSearch: true,
      dataIndex: 'payInfo.noticeState',
      width: 120,
      render: (item, record: any) => {
        let reslut = { dictItemName: '' };
        common.payNoticeState.map(m => {
          if (m.dictItemCode == record.payInfo.noticeState) {
            reslut = m;
          }
        });
      return helpers.isJudge(reslut.dictItemName=="通知成功")(<span style={{color:'green'}}>{reslut.dictItemName}</span>,<span style={{color:'red'}}>{reslut.dictItemName}</span>);
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
  ];
  const dele = params => {
    const { id } = params;
    Modal.confirm({
      title: '提示',
      content: `确认要取消订单吗？`,
      onOk: () => {
        return dispatch({
          type: 'merchantOrder/cancelOrder',
          payload: { params: { id } },
        }).then(data => {
          message.success(constant.alertMessage.DLE_SUCCESS);
          actionRef.current?.reload();
        });
      },
    });
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
      type: 'levelMerchantOrder/list',
      payload: { params },
    }).then(data => {
      setData(data.data);
      return data.data;
    });
  };

  const resendNotice = id => {
    dispatch({
      type: 'merchantOrder/resendNotice',
      payload: { params: { id } },
    })
      .then(data => {
        message.success('操作成功');
        actionRef.current?.reload();
      })
      .catch(() => {});
  };

  const insertModityRole = params => {
    const type = helpers.isJudge(hasModity)(
      'merchantOrder/updateIpWhitelist',
      'merchantOrder/addIpWhitelist',
    );
    dispatch({
      type,
      payload: { params },
    }).then(data => {
      message.success(data.message);
      handleModalVisible(false);
      actionRef.current?.reload();
    });
  };
  const getRcord = async data => {
    setRcord(data);
  };
  return (
    <>
      <PageHeaderWrapper title={false}>
        <Spin spinning={props.loadingState}>
        <ProTable<TableListItem>
          rowKey={'id'}
          actionRef={actionRef}
          headerTitle="商户订单列表"
          // toolBarRender={() => [
          //   <Button
          //     icon="plus"
          //     type="primary"
          //     onClick={() => {
          //       setRcord({});
          //       handleHasModity(false);
          //       handleModalVisible(true);
          //     }}
          //   >
          //     添加
          //   </Button>,
          // ]}
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
          footer={() => {
            return <Card>{`已支付总计：${data.statistics || 0}元`}</Card>;
          }}
        />
        </Spin>

        {modalVisible && (
          <InsertModityComponent
            onSubmit={value => {
              insertModityRole(value);
            }}
            onCancel={() => handleModalVisible(false)}
            modalVisible={modalVisible}
            confirmLoading={props.loadingState}
            defulat={rcord}
            hasModity={hasModity}
          />
        )}
        {infoModalVisible && (
          <InfoComponent
            onCancel={() => handleInfoModalVisible(false)}
            modalVisible={infoModalVisible}
            confirmLoading={props.loadingState}
            defulat={rcord}
            dispatch={dispatch}
            actionRef={actionRef}
            noBounty={noBounty}
            setNoBounty={setNoBounty}
          />
        )}
      </PageHeaderWrapper>
    </>
  );
};
export default connect(({ common, loading }: ConnectState) => ({
  loadingState: loading.models.levelMerchantOrder,
  common,
}))(MerchantOrder);
