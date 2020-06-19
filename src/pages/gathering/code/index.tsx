import { connect } from 'dva';
import React, { useState, useRef, useEffect } from 'react';
import { Button, message, Modal, Select } from 'antd';
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
  const [isDel, setIsDel] = useState(false);
  let columns: any = [
    {
      title: '状态',
      dataIndex: 'state',
      width: 80,
      align: 'center',
      valueEnum: utils.getValueEnum(common.gatheringCodeState, list => {
        return list.map(m => {
          return {
            type: m.dictItemCode,
            name: m.dictItemName,
            status: helpers.isJudge(m.dictItemName === '正常')('Success', 'Error'),
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
            {helpers.isJudge(
              ['alipayTransferBank', 'bankCard'].includes(record.gatheringChannelCode),
            )(
              <>
                <p className={styles.marginZero}>
                  {'银行/开户人:' + record.openAccountBank + '/' + record.accountHolder}
                </p>
                <p className={styles.marginZero}>{'卡号:' + record.bankCardAccount}</p>
              </>,
              null,
            )}
            {helpers.isJudge(['ysf'].includes(record.gatheringChannelCode))(
              <>
                <p className={styles.marginZero}>{'真实姓名:' + record.realName}</p>
                <p className={styles.marginZero}>{'云闪付账号:' + record.account}</p>
              </>,
              null,
            )}
            {helpers.isJudge(
              record.gatheringChannelCode != 'ysf' &&
                record.gatheringChannelCode != 'alipayTransferBank' &&
                record.gatheringChannelCode != 'bankCard',
            )(
              <>
                <p className={styles.marginZero}>
                  {'收款人/真实姓名:' + record.payee + '/' + record.realName}
                </p>
                <p className={styles.marginZero}>{'支付宝账号:' + record.account}</p>
              </>,
              null,
            )}
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
      title: '删除时间',
      dataIndex: 'deletedTime',
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
      title: '删除状态',
      dataIndex: 'deletedFlag',
      align: 'center',
      hideInTable: true,
      initialValue: '0',
      renderFormItem: (i, self) => {
        if (self.value === '0') {
          setIsDel(false);
        } else {
          setIsDel(true);
        }
        return (
          <Select
            defaultValue={i.initialValue}
            onChange={item => {
              self.onChange(item);
            }}
          >
            <Select.Option value={'1'}>删除</Select.Option>
            <Select.Option value={'0'}>未删除</Select.Option>
          </Select>
        );
      },
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
      title: '累计收款/收款次数/接单次数/成功率',
      ellipsis: true,
      align: 'center',
      hideInSearch: true,
      render: (item, record: any) => {
        return (
          <div>
            <p>
              {record.totalReceiveOrderAmt +
                '元' +
                '/' +
                record.totalReceiveOrderQty +
                '次' +
                '/' +
                record.totalDispatchOrderQty +
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
              {record.todaySuccessOrderAmt +
                '元' +
                '/' +
                record.todaySuccessOrderQty +
                '次' +
                '/' +
                record.todayDispatchOrderQty +
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
          {helpers.isJudge(record.deletedFlag == '0')(
            <Button
              className={styles.marginBotton}
              type={'danger'}
              size={'small'}
              onClick={() => {
                del({ id: record.id });
              }}
            >
              删除
            </Button>,
            null,
          )}
          {helpers.isJudge(record.deletedFlag == '0')(
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
            </Button>,
            null,
          )}

          {helpers.isJudge(record.deletedFlag == '0' && record.state == '1')(
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

          {helpers.isJudge(record.deletedFlag == '0' && record.state == '2')(
            <Button
              className={styles.marginBotton}
              type={'primary'}
              size={'small'}
              onClick={() => {
                getRcord(record);
                handleModalVisible(true);
              }}
            >
              审核
            </Button>,
            null,
          )}
          {helpers.isJudge(record.deletedFlag == '0' && record.state == '3')(
            <Button
              type={'primary'}
              size={'small'}
              onClick={() => {
                changeNormal({id:record.id});
              }}
            >
              改为正常
            </Button>,
            null,
          )}
          {helpers.isJudge(record.deletedFlag == '1')(
            <Button
              type={'primary'}
              size={'small'}
              onClick={() => {
                restore({ id: record.id });
              }}
            >
              恢复
            </Button>,
            null,
          )}
        </div>
      ),
    },
  ];
  let columns2: any = [
    {
      title: '状态',
      width: 80,
      dataIndex: 'state',
      align: 'center',
      valueEnum: utils.getValueEnum(common.gatheringCodeState, list => {
        return list.map(m => {
          return {
            type: m.dictItemCode,
            name: m.dictItemName,
            status: helpers.isJudge(m.dictItemName === '正常')('Success', 'Error'),
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
            {helpers.isJudge(
              ['alipayTransferBank', 'bankCard'].includes(record.gatheringChannelCode),
            )(
              <>
                <p className={styles.marginZero}>
                  {'银行/开户人:' + record.openAccountBank + '/' + record.accountHolder}
                </p>
                <p className={styles.marginZero}>{'卡号:' + record.bankCardAccount}</p>
              </>,
              null,
            )}
            {helpers.isJudge(['ysf'].includes(record.gatheringChannelCode))(
              <>
                <p className={styles.marginZero}>{'真实姓名:' + record.realName}</p>
                <p className={styles.marginZero}>{'云闪付账号:' + record.account}</p>
              </>,
              null,
            )}
            {helpers.isJudge(
              record.gatheringChannelCode != 'ysf' &&
                record.gatheringChannelCode != 'alipayTransferBank' &&
                record.gatheringChannelCode != 'bankCard',
            )(
              <>
                <p className={styles.marginZero}>
                  {'收款人/真实姓名:' + record.payee + '/' + record.realName}
                </p>
                <p className={styles.marginZero}>{'支付宝账号:' + record.account}</p>
              </>,
              null,
            )}
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
      title: '删除状态',
      dataIndex: 'deletedFlag',
      align: 'center',
      hideInTable: true,
      initialValue: '0',
      renderFormItem: (i, self) => {
        if (self.value === '0') {
          setIsDel(false);
        } else {
          setIsDel(true);
        }
        return (
          <Select
            defaultValue={i.initialValue}
            onChange={item => {
              self.onChange(item);
            }}
          >
            <Select.Option value={'1'}>删除</Select.Option>
            <Select.Option value={'0'}>未删除</Select.Option>
          </Select>
        );
      },
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
      title: '累计收款/收款次数/接单次数/成功率',
      ellipsis: true,
      align: 'center',
      hideInSearch: true,
      render: (item, record: any) => {
        return (
          <div>
            <p>
              {record.totalReceiveOrderAmt +
                '元' +
                '/' +
                record.totalReceiveOrderQty +
                '次' +
                '/' +
                record.totalDispatchOrderQty +
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
              {record.todayReceiveOrderAmt +
                '元' +
                '/' +
                record.todayReceiveOrderQty +
                '次' +
                '/' +
                record.todayDispatchOrderQty +
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
          {helpers.isJudge(record.deletedFlag == '0')(
            <Button
              className={styles.marginBotton}
              type={'danger'}
              size={'small'}
              onClick={() => {
                del({ id: record.id });
              }}
            >
              删除
            </Button>,
            null,
          )}
          {helpers.isJudge(record.deletedFlag == '0')(
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
            </Button>,
            null,
          )}

          {helpers.isJudge(record.deletedFlag == '0' && record.state == '1')(
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

          {helpers.isJudge(record.deletedFlag == '0' && record.state == '2')(
            <Button
              className={styles.marginBotton}
              type={'primary'}
              size={'small'}
              onClick={() => {
                getRcord(record);
                handleModalVisible(true);
              }}
            >
              审核
            </Button>,
            null,
          )}
          {helpers.isJudge(record.deletedFlag == '0' && record.state == '3')(
            <Button
              type={'primary'}
              size={'small'}
              onClick={() => {
                changeNormal({id:record.id});
              }}
            >
              改为正常
            </Button>,
            null,
          )}
          {helpers.isJudge(record.deletedFlag == '1')(
            <Button
              type={'primary'}
              size={'small'}
              onClick={() => {
                getRcord(record);
              }}
            >
              恢复
            </Button>,
            null,
          )}
        </div>
      ),
    },
  ];
  const getDatas = params => {
    if (!params.deletedFlag) {
      params.deletedFlag = 0;
    }
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
  const changeNormal = params => {
    Modal.confirm({
      title: '提示',
      content: `确定改为正常吗?`,
      onOk: () => {
        return dispatch({
          type: 'code/changeNormal',
          payload: { params },
        }).then(data => {
          message.success('修改成功');
          actionRef.current.reload();
        });
      },
    });
  };
  const del = params => {
    Modal.confirm({
      title: '提示',
      content: `确定要删除吗?`,
      onOk: () => {
        return dispatch({
          type: 'code/del',
          payload: { params },
        }).then(data => {
          message.success('删除成功');
          actionRef.current.reload();
        });
      },
    });
  };
  const restore = params => {
    Modal.confirm({
      title: '提示',
      content: `确定要恢复吗?`,
      onOk: () => {
        return dispatch({
          type: 'code/restoreGatheringCodeById',
          payload: { params },
        }).then(data => {
          message.success('恢复成功');
          actionRef.current.reload();
        });
      },
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
      {helpers.isJudge(!isDel)(
        <ProTable<TableListItem>
          loading={props.loadingState}
          rowKey="id"
          actionRef={actionRef}
          headerTitle="收款方式"
          request={params => {
            const { current: pageNum, pageSize, ...rest } = params;
            params = { pageNum, pageSize, ...rest };
            return getDatas(params);
          }}
          columns={columns2}
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
        />,
        <ProTable<TableListItem>
          rowKey="id"
          loading={props.loadingState}
          actionRef={actionRef}
          headerTitle="收款方式"
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
        />,
      )}
      {helpers.isJudge(maskVisiable)(
        <MaskImg
          imgSrc={`/api/storage/fetch/${rcord.storageId}`}
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
