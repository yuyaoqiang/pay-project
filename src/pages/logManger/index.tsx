import { connect } from 'dva';
import React, { useRef,useState,useEffect} from 'react';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data';
import { BeforeCurrentDateComponent } from '@/components/DateComponent';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { helpers, constant, utils } from '@/utils';
import moment from 'moment';
import _ from 'lodash';
const Agent = props => {
  const actionRef = useRef<ActionType>();
  const [dateRange, setDateRange] = useState({
    hasRadio: '',
    date: [moment(),moment()],
  });
  const { dispatch, common } = props;

  useEffect(() => {
    findMerchantAccountChangeType();
  }, []);

  const changeDateType = dateRange => {
    setDateRange(dateRange);
  };

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '账号',
      dataIndex: 'userName',
      align: 'center',
    },
    {
      title: '订单号',
      dataIndex: 'orderNo',
      align: 'center',
    },
    {
      title: '帐变类型',
      dataIndex: 'accountChangeTypeName',
      align: 'center',
      valueEnum: utils.getValueEnum(common.merchantAccountChangeType, list => {
        return list.map(m => {
          return {
            type: m.dictItemCode,
            name: m.dictItemName,
          };
        });
      }),
    },
    {
      title: '账变时间',
      dataIndex: 'accountChangeTime',
      align: 'center',
      hideInSearch:true,
    },
    {
      title: '账变时间',
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
      title: '备注',
      dataIndex: 'note',
      width:150,
      ellipsis:true,
      align: 'center',
      hideInSearch:true,
    },
    {
      title: '账变金额',
      dataIndex: 'accountChangeAmount',
      align: 'center',
      hideInSearch:true,
    },
    {
      title: '剩余可提现金额',
      dataIndex: 'withdrawableAmount',
      align: 'center',
      hideInSearch:true,
    },
  ];

  const findMerchantAccountChangeType = () => {
    dispatch({
      type: 'common/findMerchantAccountChangeType',
      payload: {},
    });
  };
  const getDatas = params => {
    if (!params.dateRange) {
      params.startTime = moment().format(constant.YYYY_MM_DD);
      params.endTime = moment().format(constant.YYYY_MM_DD);
    } else {
      params.startTime = moment(params.dateRange[0]).format(constant.YYYY_MM_DD);
      params.endTime = moment(params.dateRange[1]).format(constant.YYYY_MM_DD);
    }
    return dispatch({
      type: 'logManger/list',
      payload: { params },
    }).then(data => data.data);
  };
  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem>
        key="orderNo"
        actionRef={actionRef}
        headerTitle="商户账变日志"
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
    </PageHeaderWrapper>
  );
};
export default connect(({ loading, user, common }: ConnectState) => ({
  loadingState: loading.models.channel,
  user,
  common,
}))(Agent);
