import React, { useState } from 'react';
import { Form, Modal, Divider, Descriptions, Button, message } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';
import { helpers, constant } from '@/utils';

const InfoComponent: React.FC<ModalFormProps> = props => {
  const [noteVisiabel, setNoteVisiabel] = useState(false);
  const [supplementOrderVisiable, setSupplementOrderVisiable] = useState(false);
  const [okLoading, setOkLoading] = useState(false);
  const [supplementOrderLoadding, setSupplementOrderLoadding] = useState(false);
  const [delLoading, setDelLoading] = useState(false);
  const [noteLoading, setNoteLoading] = useState(false);
  const { modalVisible, form, onCancel, confirmLoading, actionRef, defulat = {}, dispatch } = props;
  const renderItems = [
    {
      type: 'textarea',
      label: '备注',
      key: 'note',
      validator: validator.onlyRequier,
      defulatVal: defulat.note,
      placeholder: '请输入备注',
    },
  ];
  const renderItems1 = [
    {
      type: 'input',
      label: '补单金额',
      key: 'gatheringAmount',
      validator: validator.onlyRequier,
      defulatVal: defulat.gatheringAmount,
      placeholder: '请输入金额进行补单',
    },
  ];
  const okHandle = () => {
    Modal.confirm({
      title: '提示',
      content: `确认收到款了吗`,
      onOk: () => {
        setOkLoading(true);
        dispatch({
          type: 'merchantOrder/confirmToPaid',
          payload: { params: { userAccountId: defulat.receivedAccountId, orderId: defulat.id } },
        })
          .then(data => {
            onCancel();
            setOkLoading(false);
            message.success('操作成功');
            actionRef.current?.reload();
          })
          .catch(err => {
            setOkLoading(false);
          });
      },
    });
  };
  const delHandle = () => {
    Modal.confirm({
      title: '提示',
      content: `确定要取消订单退款吗?`,
      onOk: () => {
        setDelLoading(true);
        dispatch({
          type: 'merchantOrder/cancelOrderRefund',
          payload: { params: { id: defulat.id } },
        })
          .then(data => {
            onCancel();
            setDelLoading(false);
            message.success('操作成功');
            actionRef.current?.reload();
          })
          .catch(err => {
            setDelLoading(false);
          });
      },
    });
  };
  const noteAction = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      setNoteLoading(true);
      fieldsValue.id = defulat.id;
      dispatch({
        type: 'merchantOrder/updateNote',
        payload: { params: { ...fieldsValue } },
      })
        .then(data => {
          onCancel();
          setNoteLoading(false);
          message.success('操作成功');
          actionRef.current?.reload();
        })
        .catch(err => {
          setNoteLoading(false);
          message.success('操作失败');
        });
    });
  };
  const supplementOrder = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      fieldsValue.id = defulat.id;
      dispatch({
        type: 'merchantOrder/supplementOrder',
        payload: { params: { ...fieldsValue } },
      }).then(data => {
        onCancel();
        message.success('操作成功');
        actionRef.current?.reload();
      });
    });
  };

  return (
    <>
      <Modal
        width={400}
        destroyOnClose
        confirmLoading={confirmLoading}
        title={'进行补单'}
        visible={supplementOrderVisiable}
        onOk={() => {
          supplementOrder();
        }}
        onCancel={() => {
          setSupplementOrderVisiable(false);
        }}
        centered
      >
        <Form>
          <GenerateFormCompoents formItems={renderItems1} form={form} />
        </Form>
      </Modal>

      <Modal
        width={400}
        destroyOnClose
        confirmLoading={noteLoading}
        title={'修改备注'}
        visible={noteVisiabel}
        onOk={() => {
          noteAction();
        }}
        onCancel={() => {
          setNoteVisiabel(false);
        }}
        centered
      >
        <Form>
          <GenerateFormCompoents formItems={renderItems} form={form} />
        </Form>
      </Modal>

      <Modal
        width={700}
        destroyOnClose
        confirmLoading={confirmLoading}
        title={
          <span>
            订单信息<span></span>
          </span>
        }
        visible={modalVisible}
        footer={[]}
        onCancel={() => {
          onCancel();
        }}
        centered
      >
        <Descriptions size={'small'} column={5} layout="vertical" bordered>
          <Descriptions.Item label="订单有效时间">{defulat.usefulTime}</Descriptions.Item>
          <Descriptions.Item label="确认时间">
            {defulat.confirmTime}
            {helpers.isJudge(!_.isEmpty(defulat.confirmWayName))(
              <span style={{ color: 'red' }}> ({defulat.confirmWayName})</span>,
              null,
            )}
          </Descriptions.Item>
          <Descriptions.Item label="系统处理时间">{defulat.dealTime}</Descriptions.Item>
        </Descriptions>
        <Divider />
        <Descriptions size={'small'} column={4} layout="vertical" bordered>
          <Descriptions.Item label="处理人">{defulat.dealAccountUserName}</Descriptions.Item>
          <Descriptions.Item label="备注">{defulat.note}</Descriptions.Item>
          <Descriptions.Item label="异步通知地址">
            {defulat.payInfo && defulat.payInfo.notifyUrl}
          </Descriptions.Item>
          <Descriptions.Item label="同步通知地址">
            {defulat.payInfo && defulat.payInfo.returnUrl}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions size={'small'} column={4} layout="vertical" bordered>
          <Descriptions.Item label="支付地址">{defulat.payUrl}</Descriptions.Item>
        </Descriptions>
        <Descriptions size={'small'} column={4} layout="vertical" bordered>
          <Descriptions.Item label="附加信息">
            {defulat.payInfo && defulat.payInfo.attch}
          </Descriptions.Item>
          <Descriptions.Item label="订单ip">
            {defulat.payInfo && defulat.payInfo.ip}
          </Descriptions.Item>
          <Descriptions.Item label="通知时间">
            {defulat.payInfo && defulat.payInfo.noticeTime}
          </Descriptions.Item>
          {helpers.isJudge(['wechat', 'alipay', 'jdpay'].includes(defulat.gatheringChannelCode))(
            <Descriptions.Item label="收款人">{defulat.payee}</Descriptions.Item>,
            null,
          )}
        </Descriptions>
        {helpers.isJudge(['bankCard'].includes(defulat.gatheringChannelCode))(
          <Descriptions size={'small'} column={4} layout="vertical" bordered>
            <Descriptions.Item label="银行卡信息">
              {defulat.openAccountBank}/{defulat.accountHolder}/{defulat.bankCardAccount}
            </Descriptions.Item>
            ,
          </Descriptions>,
          null,
        )}
        {helpers.isJudge(['wechatMobile'].includes(defulat.gatheringChannelCode))(
          <Descriptions size={'small'} column={4} layout="vertical" bordered>
            <Descriptions.Item label="微信手机转账信息">
              {defulat.mobile}/{defulat.realName}
            </Descriptions.Item>
          </Descriptions>,
          null,
        )}
        {helpers.isJudge(['alipayIdTransfer'].includes(defulat.gatheringChannelCode))(
          <Descriptions size={'small'} column={4} layout="vertical" bordered>
            <Descriptions.Item label="支付宝id转账信息">
              {defulat.account}/{defulat.alipayId}
            </Descriptions.Item>
          </Descriptions>,
          null,
        )}
        <Divider />
        <div style={{ textAlign: 'center' }}>
          {helpers.isJudge(defulat.orderState == '4')(
            <Button
              style={{ marginRight: 5 }}
              type={'primary'}
              onClick={() => {
                setNoteVisiabel(true);
              }}
            >
              修改备注
            </Button>,
            null,
          )}

          {helpers.isJudge(defulat.orderState == '2')(
            <>
              <Button
                style={{ marginRight: 5 }}
                loading={okLoading}
                type={'primary'}
                onClick={() => {
                  okHandle();
                }}
              >
                确认已支付
              </Button>
              <Button
                style={{ marginRight: 5 }}
                type={'danger'}
                loading={delLoading}
                onClick={() => {
                  delHandle();
                }}
              >
                取消订单退款
              </Button>
              <Button
                style={{ marginRight: 5 }}
                type={'primary'}
                onClick={() => {
                  setNoteVisiabel(true);
                }}
              >
                修改备注
              </Button>
            </>,
            null,
          )}

          {helpers.isJudge(defulat.orderState == '9')(
            <>
              <Button
                style={{ marginRight: 5 }}
                type={'primary'}
                onClick={() => {
                  okHandle();
                }}
              >
                确认已支付
              </Button>
              <Button
                style={{ marginRight: 5 }}
                type={'primary'}
                onClick={() => {
                  setNoteVisiabel(true);
                }}
              >
                修改备注
              </Button>
              <Button
                style={{ marginRight: 5 }}
                type={'primary'}
                onClick={() => {
                  setSupplementOrderVisiable(true);
                }}
              >
                补单
              </Button>
            </>,
            null,
          )}

          {helpers.isJudge(defulat.orderState == '7')(
            <>
              <Button
                style={{ marginRight: 5 }}
                type={'primary'}
                onClick={() => {
                  okHandle();
                }}
              >
                确认已支付
              </Button>
              <Button
                style={{ marginRight: 5 }}
                type={'primary'}
                onClick={() => {
                  setNoteVisiabel(true);
                }}
              >
                修改备注
              </Button>
              <Button
                style={{ marginRight: 5 }}
                type={'primary'}
                onClick={() => {
                  setSupplementOrderVisiable(true);
                }}
              >
                补单
              </Button>
              <Button
                style={{ marginRight: 5 }}
                type={'primary'}
                onClick={() => {
                  okHandle();
                }}
              >
                修改接单人
              </Button>
            </>,
            null,
          )}
        </div>
      </Modal>
    </>
  );
};

export default Form.create<ModalFormProps>()(InfoComponent);
