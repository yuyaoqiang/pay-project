import { connect } from 'dva';
import React, { useState, useRef, useEffect } from 'react';
import { Button, message, Card } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { MaskImg } from '@/components/MaskImg';
import UpdateCompoent from './components/InsertModityComponent';
import { helpers, utils } from '@/utils';
import _ from 'lodash';
import styles from './style.less';
const Code = props => {
  useEffect(() => {
    findGatheringCodeState();
  }, []);
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [hasModity, handleHasModity] = useState<boolean>(false);
  const [maskVisiable, handlMaskVisiable] = useState<boolean>(false);
  const [rcord, setRcord] = useState<any>({});
  const actionRef = useRef<ActionType>();
  const { dispatch, common } = props;

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '状态',
      dataIndex: 'state',
      align: 'center',
      valueEnum: utils.getValueEnum(common.gatheringCodeState, list => {
        return list.map(m => {
          return {
            type: m.dictItemCode,
            name: m.dictItemName,
          };
        });
      }),
    },
    {
      title: '通道/所属账号/邀请人/使用情况',
      dataIndex: 'merchantName',
      ellipsis: true,
      align: 'center',
      hideInSearch: true,
      render: (item, record: any) => {
        return (
          <p>
            {record.gatheringChannelName +
              '/' +
              record.userName +
              '/' +
              record.inviterUserName +
              '/' +
              (record.inUse != null && record.inUse ? '已上码' : '已下码')}
          </p>
        );
      },
    },
    {
      title: '详细信息',
      dataIndex: 'merchantOrderNo',
      align: 'center',
      hideInSearch: true,
      render: (item, record: any) => {
        return (
          <div>
            <p className={styles.marginZero}>
              {'收款人/真实姓名:' + record.payee + '/' + record.realName}
            </p>
            <p className={styles.marginZero}>{'支付宝账号:' + record.account}</p>
          </div>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '最后接单时间',
      dataIndex: 'lastReceivedTime',
      align: 'center',
      hideInSearch: true,
    },
    {
      title: '通道',
      dataIndex: 'gatheringChannelName',
      ellipsis: true,
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
      title: '所属账号',
      dataIndex: 'userName',
      align: 'center',
      hideInTable: true,
    },
    {
      title: '收款人',
      dataIndex: 'payee',
      align: 'center',
      hideInTable: true,
    },
    {
      title: '真实姓名',
      dataIndex: 'realName',
      align: 'center',
      hideInTable: true,
    },
    {
      title: '支付宝账号',
      dataIndex: 'account',
      align: 'center',
      hideInTable: true,
    },
    {
      title: '累计收款/收款次数/接单次数/成功率',
      ellipsis: true,
      align: 'center',
      hideInSearch: true,
      render: (item, record: any) => {
        return (
          <div>
            <p>
              {record.totalTradeAmount +
                '元' +
                '/' +
                record.totalPaidOrderNum +
                '次' +
                '/' +
                record.totalOrderNum +
                '次' +
                '/' +
                record.totalSuccessRate +
                '%'}
            </p>
          </div>
        );
      },
    },
    {
      title: '今日收款/收款次数/接单次数/成功率',
      ellipsis: true,
      align: 'center',
      render: (item, record: any) => {
        return (
          <div>
            <p>
              {record.todayTradeAmount +
                '元' +
                '/' +
                record.todayPaidOrderNum +
                '次' +
                '/' +
                record.todayOrderNum +
                '次' +
                '/' +
                record.todaySuccessRate +
                '%'}
            </p>
          </div>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'center',
      render: (_, record: any) => (
        <div style={{ display: 'flex', flexFlow: 'column' }}>
          <Button
            className={styles.marginBotton}
            type={'danger'}
            size={'small'}
            onClick={() => {
              del({ id: record.id });
            }}
          >
            删除
          </Button>
          <Button
            className={styles.marginBotton}
            type={'primary'}
            size={'small'}
            onClick={() => {
              handlMaskVisiable(true);
              getRcord(record);
            }}
          >
            查看二维码
          </Button>
          {helpers.isJudge(record.state == '1')(
            helpers.isJudge(record.inUse)(
              <Button
                className={styles.marginBotton}
                type={'danger'}
                size={'small'}
                onClick={() => {
                  update({ id: record.id, inUse: false });
                }}
              >
                下码
              </Button>,
              <Button
                className={styles.marginBotton}
                type={'primary'}
                size={'small'}
                onClick={() => {
                  update({ id: record.id, inUse: true });
                }}
              >
                上码
              </Button>,
            ),
            null,
          )}

          {helpers.isJudge(record.state == '2')(
            <Button
              className={styles.marginBotton}
              type={'primary'}
              size={'small'}
              onClick={() => {
                getRcord(record);
                handleModalVisible(true)
              }}
            >
              审核
            </Button>,
            null,
          )}
          {helpers.isJudge(record.state == '3')(
            <Button
              type={'primary'}
              size={'small'}
              onClick={() => {
                getRcord(record);
              }}
            >
              改为正常
            </Button>,
            null,
          )}
        </div>
      ),
    },
  ];

  const getDatas = params => {
    return dispatch({
      type: 'code/list',
      payload: { params },
    }).then(data => {
      setRcord(data.data);
      return data.data;
    });
  };
  const update = params => {
    return dispatch({
      type: 'code/update',
      payload: { params },
    }).then(data => {
      message.success('修改成功');
      actionRef.current.reload();
    });
  };
  const del = params => {
    return dispatch({
      type: 'code/del',
      payload: { params },
    }).then(data => {
      message.success('删除成功');
      actionRef.current.reload();
    });
  };
  const findGatheringCodeState = () => {
    dispatch({
      type: 'common/findGatheringCodeState',
      payload: {},
    });
  };
  const getRcord = async data => {
    setRcord(data);
  };

  return (
    <PageHeaderWrapper title={false}>
      <ProTable<TableListItem>
        rowKey="orderNo"
        actionRef={actionRef}
        headerTitle="收款方式"
        toolBarRender={() => [
          <Button
            icon="plus"
            type="primary"
            onClick={() => {
              setRcord({});
              handleHasModity(false);
              handleModalVisible(true);
            }}
          >
            添加
          </Button>,
        ]}
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
          return <Card>{`已支付总计：${rcord.totalMoney}元`}</Card>;
        }}
      />
      {helpers.isJudge(maskVisiable)(
        <MaskImg
          imgSrc={`/storage/fetch/${rcord.storageId}`}
          visiable={() => {
            handlMaskVisiable(false);
          }}
        />,
        null,
      )}
      <UpdateCompoent
        onCancel={() => handleModalVisible(false)}
        modalVisible={modalVisible}
        confirmLoading={props.loadingState}
        defulat={rcord}
        hasModity={hasModity}
        dispatch={dispatch}
        actionRef={actionRef}
      />
    </PageHeaderWrapper>
  );
};
export default connect(({ common, loading }: ConnectState) => ({
  loadingState: loading.models.code,
  common,
}))(Code);
