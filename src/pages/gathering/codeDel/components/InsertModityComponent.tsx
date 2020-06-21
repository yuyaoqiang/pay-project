import React, { useState } from 'react';
import { Form, Modal, message, Descriptions, Divider, Button } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import img from '@/assets/1.png';
import _ from 'lodash';
import { helpers } from '@/utils';
const UpdatePsd: React.FC<ModalFormProps> = props => {
  const { modalVisible, form, dispatch, onCancel, hasModity, defulat = {} } = props;
  const [loading,setLoading]=useState(false)
  const [canceLoading,setCanceLoading]=useState(false)
  const { actionRef } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.id = defulat.id;
      Modal.confirm({
        title: '提示',
        content: `确认要提交吗？`,
        onOk: () => {
          setLoading(true)
          dispatch({
            type: 'code/updateToNormalState',
            payload: { params: { ...fieldsValue } },
          }).then(data => {
            onCancel();
            setLoading(false)
            message.success('操作成功');
            actionRef.current?.reload();
          });
        },
      });
    });
  };
  const rejectHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.id = defulat.id;
      Modal.confirm({
        title: '提示',
        content: `确定删除该收款方式`,
        onOk: () => {
          setCanceLoading(true)
          dispatch({
            type: 'code/delGatheringCodeById',
            payload: { params: { ...fieldsValue } },
          }).then(data => {
            onCancel();
            setCanceLoading(false)
            message.success('操作成功');
            actionRef.current?.reload();
          });
        },
      });
    });
  };

  return (
    <Modal
      width={500}
      destroyOnClose
      title={'新增-待审核'}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        onCancel();
      }}
      footer={[]}
      centered
    >
      {helpers.isJudge(
        defulat.gatheringChannelCode == 'wechat' || defulat.gatheringChannelCode == 'alipay',
      )(
        <Descriptions size={'small'} column={5} layout="vertical" bordered>
          <Descriptions.Item label="通道">{defulat.gatheringChannelName}</Descriptions.Item>
          <Descriptions.Item label="收款人">{defulat.payee}</Descriptions.Item>
          <Descriptions.Item label="所属账号">{defulat.userName}</Descriptions.Item>
        </Descriptions>,
        null,
      )}
      {helpers.isJudge(defulat.gatheringChannelCode == 'bankCard')(
        <>
          <Descriptions size={'small'} column={5} layout="vertical" bordered>
            <Descriptions.Item label="通道">{defulat.gatheringChannelName}</Descriptions.Item>
            <Descriptions.Item label="所属账号">{defulat.userName}</Descriptions.Item>
          </Descriptions>
          <Divider />
          <Descriptions size={'small'} column={5} layout="vertical" bordered>
            <Descriptions.Item label="银行">{defulat.openAccountBank}</Descriptions.Item>
            <Descriptions.Item label="开户人">{defulat.accountHolder}</Descriptions.Item>
            <Descriptions.Item label="卡号">{defulat.bankCardAccount}</Descriptions.Item>
          </Descriptions>
        </>,
        null,
      )}
      {helpers.isJudge(defulat.gatheringChannelCode == 'wechatMobile')(
        <Descriptions size={'small'} column={5} layout="vertical" bordered>
          <Descriptions.Item label="通道">{defulat.gatheringChannelName}</Descriptions.Item>
          <Descriptions.Item label="手机号">{defulat.mobile}</Descriptions.Item>
          <Descriptions.Item label="姓名">{defulat.realName}</Descriptions.Item>
        </Descriptions>,
        null,
      )}
      {helpers.isJudge(defulat.gatheringChannelCode == 'alipayTransfer')(
        <Descriptions size={'small'} column={5} layout="vertical" bordered>
          <Descriptions.Item label="通道">{defulat.gatheringChannelName}</Descriptions.Item>
          <Descriptions.Item label="账号">{defulat.account}</Descriptions.Item>
          <Descriptions.Item label="姓名">{defulat.realName}</Descriptions.Item>
        </Descriptions>,
        null,
      )}
      {helpers.isJudge(defulat.gatheringChannelCode == 'alipayIdTransfer')(
        <Descriptions size={'small'} column={5} layout="vertical" bordered>
          <Descriptions.Item label="通道">{defulat.gatheringChannelName}</Descriptions.Item>
          <Descriptions.Item label="账号">{defulat.account}</Descriptions.Item>
          <Descriptions.Item label="支付宝id">{defulat.alipayId}</Descriptions.Item>
        </Descriptions>,
        null,
      )}
      {helpers.isJudge(
        defulat.gatheringChannelCode && defulat.gatheringChannelCode.startsWith('digiccy'),
      )(
        <Descriptions size={'small'} column={5} layout="vertical" bordered>
          <Descriptions.Item label="通道">{defulat.gatheringChannelName}</Descriptions.Item>
          <Descriptions.Item label="所属账号">{defulat.userName}</Descriptions.Item>
          <Descriptions.Item label="钱包地址">{defulat.address}</Descriptions.Item>
        </Descriptions>,
        null,
      )}
      {helpers.isJudge(defulat.auditType == '2')(
        <>
          <Descriptions size={'small'} column={5} layout="vertical" bordered>
            <Descriptions.Item label="累计收款">{defulat.totalTradeAmount}元</Descriptions.Item>
            <Descriptions.Item label="收款次数">{defulat.totalOrderNum}次</Descriptions.Item>
            <Descriptions.Item label="接单次数">{defulat.totalPaidOrderNum}次</Descriptions.Item>
            <Descriptions.Item label="成功率">{defulat.todaySuccessRate}%</Descriptions.Item>
          </Descriptions>
          <Divider />
          <Descriptions size={'small'} column={5} layout="vertical" bordered>
            <Descriptions.Item label="今日收款">{defulat.todayTradeAmount}元</Descriptions.Item>
            <Descriptions.Item label="收款次数">{defulat.todayOrderNum}次</Descriptions.Item>
            <Descriptions.Item label="接单次数">{defulat.todayPaidOrderNum}次</Descriptions.Item>
            <Descriptions.Item label="成功率">{defulat.todaySuccessRate}%</Descriptions.Item>
          </Descriptions>
        </>,
        null,
      )}
      {helpers.isJudge(!_.isEmpty(defulat.storageId))(
        <div style={{ textAlign: 'center' ,margin:'10px 0'}}>
          <img style={{ width: '80%' }} src={img}  />
        </div>,
        null,
      )}

      <div style={{ textAlign: 'center' }}>
        {helpers.isJudge(defulat.auditType == '1')(
          <Button
            style={{ marginRight: 5 }}
            loading={loading}
            type={'primary'}
            onClick={() => {
              okHandle();
            }}
          >
            审核通过
          </Button>,
          null,
        )}
        {helpers.isJudge(defulat.auditType == '1')(
          <Button
            type={'danger'}
            loading={canceLoading}
            style={{ marginLeft: 5 }}
            onClick={() => {
              rejectHandle();
            }}
          >
            删除该收款方式
          </Button>,
          null,
        )}
        {helpers.isJudge(defulat.auditType == '2')(
          <Button
            type={'danger'}
            style={{ marginLeft: 5 }}
            onClick={() => {
              rejectHandle();
            }}
          >
            确定删除
          </Button>,
          null,
        )}
        {helpers.isJudge(defulat.auditType == '2')(
          <Button
            type={'danger'}
            style={{ marginLeft: 5 }}
            onClick={() => {
              rejectHandle();
            }}
          >
            不删除
          </Button>,
          null,
        )}
      </div>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(UpdatePsd);
