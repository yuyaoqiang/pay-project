import { connect } from 'dva';
import React, { useState, useRef, useEffect } from 'react';
import { Button, message, Divider, Modal, Popover } from 'antd';
import { BeforeCurrentDateComponent } from '@/components/DateComponent';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import ContentCompoent from './components/contentCompoent';

import { helpers, constant, utils } from '@/utils';
import styles from './style.less';
import _ from 'lodash';
import moment from 'moment';

const Settlement = props => {
  const [visiable, handleVisiable] = useState<boolean>(false);
  const [rcord, setRcord] = useState(null);
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
      width:100,
      ellipsis:true,
      align: 'center',
    },
    {
      title: '商户',
      dataIndex: 'merchantName',
      align: 'center',
    },
    {
      title: '通道',
      dataIndex: 'gatheringChannelCode',
      align: 'center',
      hideInTable: true,
      valueEnum: utils.getValueEnum(common.gatheringChannel, list => {
        return list.map(m => {
          return {
            type: m.channelCode,
            name: m.channelName,
          };
        });
      }),
    },
    {
      title: '通道/金额',
      dataIndex: 'withdrawAmount',
      align: 'center',
      hideInSearch: true,
      render: (item, record: any) => {
        return (
          <div>
            {record.gatheringChannelName}/{record.gatheringAmount}
          </div>
        );
      },
    },
    {
      title: '接单人',
      dataIndex: 'receiverUserName',
      align: 'center',
      hideInTable: true,
    },
    {
      title: '接单人/接单时间',
      dataIndex: 'serviceFee',
      align: 'center',
      hideInSearch: true,
      render: (item, record: any) => {
        return (
          <>
            <p style={{margin:0}}>{record.receiverUserName}</p>
            <p style={{margin:0}}>{record.receivedTime}</p>
          </>
        );
      },
    },
    {
      title: '申诉类型',
      dataIndex: 'appealType',
      align: 'center',
      valueEnum: utils.getValueEnum(common.appealType, list => {
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
      title: '处理方式',
      dataIndex: 'processWay',
      align: 'center',
      valueEnum: utils.getValueEnum(common.appealProcessWay, list => {
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
      title: '状态',
      dataIndex: 'state',
      align: 'center',
      valueEnum: utils.getValueEnum(common.appealState, list => {
        return [
          { type: '', name: '全部' },
          ...list.map(m => {
            return {
              type: m.dictItemCode,
              name: m.dictItemName,
              status:helpers.isJudge(m.dictItemName=="已完结")('Success','Error')
            };
          }),
        ];
      }),
    },
    {
      title: '发起时间',
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
      title: '发起时间',
      dataIndex: 'initiationTime',
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
          helpers.isJudge(record.state=='1')( <Button
            type={'danger'}
            size={'small'}
            onClick={() => {
              getRcord(record);
              handleVisiable(true);
            }}
          >
            马上处理
          </Button>,
          <Button
            type={'primary'}
            size={'small'}
            onClick={() => {
              getRcord(record);
              handleVisiable(true);
            }}
          >
            查看详情
          </Button>)

        );
      },
    },
  ];

  const exportExcel = () => {
    var oReq = new XMLHttpRequest();
    oReq.open('get', 'api/appeal/exportExcel', true);
    oReq.responseType = 'blob';
    oReq.setRequestHeader('Content-Type', 'application/json');
    oReq.onload = function(oEvent) {
      var content = oReq.response;
      var elink = document.createElement('a');
      elink.download = '申诉记录.xlsx';
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
      params.initiationStartTime = moment().format(constant.YYYY_MM_DD);
      params.initiationEndTime = moment().format(constant.YYYY_MM_DD);
    } else {
      params.initiationStartTime = moment(params.dateRange[0]).format(constant.YYYY_MM_DD);
      params.initiationEndTime = moment(params.dateRange[1]).format(constant.YYYY_MM_DD);
    }
    return dispatch({
      type: 'appealRecord/list',
      payload: { params },
    }).then(data => data.data);
  };
  const getRcord = async data => {
    setRcord(data);
  };
  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem>
        rowKey="id"
        actionRef={actionRef}
        headerTitle="商户结算"
        toolBarRender={() => [<Button onClick={exportExcel}>导出</Button>]}
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
      {rcord && (
        <ContentCompoent
          onCancel={() => handleVisiable(false)}
          modalVisible={visiable}
          confirmLoading={props.loadingState}
          defulat={rcord}
          dispatch={dispatch}
          actionRef={actionRef}
        />
      )}
    </PageHeaderWrapper>
  );
};
export default connect(({ loading, user, common }: ConnectState) => ({
  loadingState: loading.models.appealRecord,
  user,
  common,
}))(Settlement);
