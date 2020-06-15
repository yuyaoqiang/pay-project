import React, { useState } from 'react';
import { Form, Modal, message, Descriptions, Divider, Button, Card, Row, Col } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';
import { helpers } from '@/utils';

const ContentCompoent: React.FC<ModalFormProps> = props => {
  const [rejectLoading, setRejectLoading] = useState(false);
  const [resovleLoading, setResovleLoading] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { modalVisible, form, dispatch, onCancel, defulat = {} } = props;
  const { actionRef } = props;
  const confirmToPaid = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      setConfirmLoading(true);
      fieldsValue.appealId = defulat.id;
      Modal.confirm({
        title: '提示',
        content: `确认已支付吗？`,
        onOk: () => {
          dispatch({
            type: 'appealRecord/confirmToPaid',
            payload: { params: { ...fieldsValue } },
          }).then(data => {
            message.success('操作成功');
            setConfirmLoading(false);
            actionRef.current?.reload();
            onCancel();
          });
        },
      });
    });
  };

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      setResovleLoading(true);
      fieldsValue.appealId = defulat.id;
      Modal.confirm({
        title: '提示',
        content: `确认要通过审核吗？`,
        onOk: () => {
          dispatch({
            type: 'appealRecord/alterToActualPayAmount',
            payload: { params: { ...fieldsValue } },
          }).then(data => {
            message.success('操作成功');
            setResovleLoading(false);
            actionRef.current?.reload();
            onCancel();
          });
        },
      });
    });
  };

  const rejectHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      setRejectLoading(true);
      fieldsValue.appealId = defulat.id;
      Modal.confirm({
        title: '提示',
        content: `确定审核不通过吗`,
        onOk: () => {
          dispatch({
            type: 'appealRecord/cancelOrder',
            payload: { params: { ...fieldsValue } },
          }).then(data => {
            message.success('操作成功');
            actionRef.current?.reload();
            setRejectLoading(false);
            onCancel();
          });
        },
      });
    });
  };
  return (
    <Modal
      width={'80%'}
      destroyOnClose
      title={'申诉详情'}
      visible={modalVisible}
      onOk={() => {
        onCancel();
      }}
      onCancel={() => {
        onCancel();
      }}
      footer={[]}
      centered
    >
      <Descriptions size={'middle'} bordered column={3}>
        <Descriptions.Item label="订单号">{defulat.orderNo}</Descriptions.Item>
        <Descriptions.Item label="商户/发起方">
          {defulat.merchantName + '/' + defulat.initiatorObjName}
          {defulat.attch != null || defulat.attch != '' ? '/' + defulat.attch : ''}
        </Descriptions.Item>
        <Descriptions.Item label="通道/金额">
          {defulat.gatheringChannelName + '/' + defulat.gatheringAmount}元
        </Descriptions.Item>
      </Descriptions>
      <Descriptions size={'middle'} column={3} bordered>
        <Descriptions.Item label="接单人/接单时间">
          {defulat.receiverUserName + '/' + defulat.receivedTime}
        </Descriptions.Item>
        <Descriptions.Item label="申诉类型">{defulat.appealTypeName}</Descriptions.Item>
        <Descriptions.Item label="状态">{defulat.stateName}</Descriptions.Item>
      </Descriptions>
      <Descriptions size={'middle'} column={3} bordered>
        <Descriptions.Item label="发起时间">{defulat.initiationTime}</Descriptions.Item>
        {helpers.isJudge(defulat.appealType == '2' || defulat.appealType == '4')(
          <Descriptions.Item
            label={
              defulat.initiatorObj == 'user' ? '用户反映实际支付金额:' : '商户反映实际支付的金额:'
            }
          >
            {defulat.actualPayAmount}元
          </Descriptions.Item>,
          null,
        )}

        {helpers.isJudge(defulat.state == '2')(
          <Descriptions.Item label="处理方式">{defulat.processWayName}</Descriptions.Item>,
          null,
        )}
      </Descriptions>
      {helpers.isJudge(defulat.appealType == '1')(
        <Row gutter={24} style={{ margin: '10px 0' }}>
          <Col span={12}>
            <Card title="商户的截图" style={{ height: 300 }}>
              {helpers.isJudge(
                defulat.merchantSreenshotIds == null || defulat.merchantSreenshotIds.length == 0,
              )(
                <div style={{ textAlign: 'center' }}>未提供截图</div>,
                <div>
                  {defulat.merchantSreenshotIds.map(item => {
                    return <img src={`/api/storage/fetch/${item}`}></img>;
                  })}
                </div>,
              )}
            </Card>
          </Col>
        </Row>,
        null,
      )}
      {helpers.isJudge(defulat.appealType == '2' || defulat.appealType == '4')(
        <Row gutter={24} style={{ margin: '10px 0' }}>
          <Col span={12}>
            <Card title="用户的截图" style={{ height: 300 }}>
              {helpers.isJudge(
                defulat.userSreenshotIds == null || defulat.userSreenshotIds.length == 0,
              )(
                <div style={{ textAlign: 'center' }}>未提供截图</div>,
                <div>
                  {defulat.userSreenshotIds.map(item => {
                    return <img src={`/api/storage/fetch/${item}`}></img>;
                  })}
                </div>,
              )}
            </Card>
          </Col>
          <Col span={12} style={{ margin: '10px 0' }}>
            <Card title="商户的截图" style={{ height: 300 }}>
              {helpers.isJudge(
                defulat.merchantSreenshotIds == null || defulat.merchantSreenshotIds.length == 0,
              )(
                <div style={{ textAlign: 'center' }}>未提供截图</div>,
                <div>
                  {defulat.merchantSreenshotIds.map(item => {
                    return <img src={`/api/storage/fetch/${item}`}></img>;
                  })}
                </div>,
              )}
            </Card>
          </Col>
        </Row>,
        null,
      )}
      {helpers.isJudge(defulat.appealType == '3')(
        <Row gutter={24}>
          <Col span={12}>
            <Card title="商户的截图" style={{ height: 300 }}>
              {helpers.isJudge(
                defulat.merchantSreenshotIds == null || defulat.merchantSreenshotIds.length == 0,
              )(
                <div style={{ textAlign: 'center' }}>未提供截图</div>,
                <div>
                  {defulat.merchantSreenshotIds.map(item => {
                    return <img src={`/api/storage/fetch/${item}`}></img>;
                  })}
                </div>,
              )}
            </Card>
          </Col>
          <Col span={12}>
            <Card title="用户的截图" style={{ height: 300 }}>
              {helpers.isJudge(
                defulat.userSreenshotIds == null || defulat.userSreenshotIds.length == 0,
              )(
                <div style={{ textAlign: 'center' }}>未提供截图</div>,
                <div>
                  {defulat.userSreenshotIds.map(item => {
                    return <img src={`/api/storage/fetch/${item}`}></img>;
                  })}
                </div>,
              )}
            </Card>
          </Col>
        </Row>,
        null,
      )}
      <div style={{ textAlign: 'center' }}>
        {helpers.isJudge(defulat.state == '1' && defulat.appealType == '3')(
          <Button
            style={{ marginRight: 5 }}
            loading={confirmLoading}
            type={'primary'}
            onClick={() => {
              confirmToPaid();
            }}
          >
            确认已支付
          </Button>,
          null,
        )}
        {helpers.isJudge(
          defulat.state == '1' && (defulat.appealType == '2' || defulat.appealType == '4'),
        )(
          <Button
            style={{ marginRight: 5 }}
            type={'primary'}
            loading={resovleLoading}
            onClick={() => {
              okHandle();
            }}
          >
            改为实际支付金额
          </Button>,
          null,
        )}
        {helpers.isJudge(
          defulat.state == '1' &&
            (defulat.appealType == '1' ||
              defulat.appealType == '2' ||
              defulat.appealType == '3' ||
              defulat.appealType == '4'),
        )(
          <Button
            style={{ marginRight: 5 }}
            loading={rejectLoading}
            type={'danger'}
            onClick={() => {
              rejectHandle();
            }}
          >
            取消订单
          </Button>,
          null,
        )}
      </div>
    </Modal>
  );
};
export default Form.create<ModalFormProps>()(ContentCompoent);
