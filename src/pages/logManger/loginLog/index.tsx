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
    date: [],
  });
  const { dispatch, common } = props;

  useEffect(() => {
    findLoginState();
  }, []);

  const changeDateType = dateRange => {
    setDateRange(dateRange);
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '登录用户名',
      dataIndex: 'userName',
      align: 'center',
    },
    {
      title: '登录系统',
      dataIndex: 'systemName',
      align: 'center',
      hideInSearch:true,
    },
    {
      title: 'ip地址',
      dataIndex: 'ipAddr',
      align: 'center',
    },
    {
      title: '登录地点',
      dataIndex: 'loginLocation',
      align: 'center',
      hideInSearch:true,
    },
    {
      title: '浏览器',
      dataIndex: 'browser',
      align: 'center',
      hideInSearch:true,
    },
    {
      title: '操作系统',
      dataIndex: 'os',
      align: 'center',
      width:100,
      ellipsis:true,
      hideInSearch:true,
    },
    {
      title: '登录状态',
      dataIndex: 'state',
      align: 'center',
      valueEnum: utils.getValueEnum(common.loginState, list => {
        return list.map(m => {
          return {
            type: m.dictItemCode,
            name: m.dictItemName,
          };
        });
      }),
    },
    {
      title: '登录信息',
      dataIndex: 'msg',
      align: 'center',
      hideInSearch:true,
    },
    {
      title: '登录时间',
      dataIndex: 'loginTime',
      align: 'center',
      hideInSearch:true,
    },
    {
      title: '最后访问时间',
      dataIndex: 'lastAccessTime',
      align: 'center',
      hideInSearch:true,
    },
    {
      title: '登录时间',
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

  const findLoginState = () => {
    dispatch({
      type: 'common/findLoginState',
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
      type: 'loginLog/list',
      payload: { params },
    }).then(data => data.data);
  };
  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem>
        rowKey="id"
        actionRef={actionRef}
        headerTitle="登陆日记"
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
