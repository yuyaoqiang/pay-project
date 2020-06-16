import React, { useState } from 'react';
import {
  Form,
  Modal,
  Divider,
  Descriptions,
  Button,
  message,
  Checkbox,
  Card,
  Row,
  Col,
} from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';
import img from '@/assets/1.png';
import { helpers } from '@/utils';

const InfoComponent: React.FC<ModalFormProps> = props => {
  const [noteVisiabel, setNoteVisiabel] = useState(false);
  const [supplementOrderVisiable, setSupplementOrderVisiable] = useState(false);
  const [okLoading, setOkLoading] = useState(false);
  const [noBounty, setNoBounty] = useState(false);
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
  const onChange = e => {
    setNoBounty(e.target.checked);
  };
  const okHandle = () => {
    setNoBounty(false);
    Modal.confirm({
      title: '提示',
      content: (
        <div>
          <p>确认收到款了吗</p>
          <p>
            <Checkbox onChange={onChange}>
              <span style={{ color: 'red' }}>是否不返佣金与代理返点</span>
            </Checkbox>
          </p>
        </div>
      ),
      onOk: () => {
        setOkLoading(true);
        dispatch({
          type: 'merchantOrder/confirmToPaid',
          payload: {
            params: { userAccountId: defulat.receivedAccountId, noBounty, orderId: defulat.id },
          },
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
  const confirmToPaidWithCancelOrderRefund = () => {
    Modal.confirm({
      title: '提示',
      content: (
        <div>
          <p>确定更改为已支付状态吗</p>
          <p>
            <Checkbox onChange={onChange}>
              <span style={{ color: 'red' }}>是否不返佣金与代理返点</span>
            </Checkbox>
          </p>
        </div>
      ),
      onOk: () => {
        setOkLoading(true);
        dispatch({
          type: 'merchantOrder/confirmToPaidWithCancelOrderRefund',
          payload: { params: { noBounty, orderId: defulat.id } },
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
  const confirmToPaidWithUnconfirmedAutoFreeze = () => {
    Modal.confirm({
      title: '提示',
      content: (
        <div>
          <p>确定更改为已支付状态吗</p>
          <p>
            <Checkbox onChange={onChange}>
              <span style={{ color: 'red' }}>是否不返佣金与代理返点</span>
            </Checkbox>
          </p>
        </div>
      ),
      onOk: () => {
        setOkLoading(true);
        dispatch({
          type: 'merchantOrder/confirmToPaidWithUnconfirmedAutoFreeze',
          payload: { params: { noBounty, orderId: defulat.id } },
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
        width={1000}
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
        <Row>
          <Col span={helpers.isJudge(!_.isEmpty(defulat.gatheringCodeStorageId))(18,24)}>
            <Descriptions size={'small'} column={4} layout="vertical" bordered>
              <Descriptions.Item label="订单有效时间">{defulat.usefulTime}</Descriptions.Item>
              <Descriptions.Item label="确认时间">
                {defulat.confirmTime}
                {helpers.isJudge(!_.isEmpty(defulat.confirmWayName))(
                  <span style={{ color: 'red' }}> ({defulat.confirmWayName})</span>,
                  null,
                )}
              </Descriptions.Item>
              <Descriptions.Item label="系统处理时间">{defulat.dealTime}</Descriptions.Item>
              <Descriptions.Item label="通知时间">
                {defulat.payInfo && defulat.payInfo.noticeTime}
              </Descriptions.Item>
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
            {helpers.isJudge(defulat.gatheringChannelName.includes('支付宝'))(
              <Descriptions size={'small'} column={4} layout="vertical" bordered>
                <Descriptions.Item label="支付宝昵称">{defulat.payee}</Descriptions.Item>
                <Descriptions.Item label="真实姓名">{defulat.realName}</Descriptions.Item>
                <Descriptions.Item label="支付宝账号">{defulat.account}</Descriptions.Item>
              </Descriptions>,
              null,
            )}
            {helpers.isJudge(
              ['bankCard', 'alipayTransferBank'].includes(defulat.gatheringChannelCode),
            )(
              <Descriptions size={'small'} column={4} layout="vertical" bordered>
                <Descriptions.Item label="开户行">{defulat.openAccountBank}</Descriptions.Item>
                <Descriptions.Item label="开户人">{defulat.accountHolder}</Descriptions.Item>
                <Descriptions.Item label="卡号">{defulat.bankCardAccount}</Descriptions.Item>
              </Descriptions>,
              null,
            )}

            {helpers.isJudge(defulat.gatheringChannelCode == 'ysf')(
              <Descriptions size={'small'} column={4} layout="vertical" bordered>
                <Descriptions.Item label="云闪付账号">{defulat.account}</Descriptions.Item>
                <Descriptions.Item label="真实姓名">{defulat.realName}</Descriptions.Item>
              </Descriptions>,
              null,
            )}
          </Col>
          {helpers.isJudge(!_.isEmpty(defulat.gatheringCodeStorageId))(
            <Col span={6}>
              <Card>
                <img
                  style={{ width: '100%' }}
                  src={`api/storage/fetch/${defulat.gatheringCodeStorageId}`}
                />
                ,
                {/* {helpers.isJudge(
                defulat.gatheringCodeStorageId == 'alipayIdTransfer' &&
                  !_.isEmpty(defulat.alipayId),
              )('alipayIdTransfer-img', null)} */}
              </Card>
            </Col>,
            null,
          )}
        </Row>
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
                  confirmToPaidWithCancelOrderRefund();
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
                  confirmToPaidWithUnconfirmedAutoFreeze();
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
