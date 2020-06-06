import { connect } from 'dva';
import React, { useState } from 'react';
import { Form, Button, Modal, Table, Divider, message } from 'antd';
import { ConnectState } from '@/models/connect';
import * as validator from '@/utils/validator';
import { helpers, constant } from '@/utils';
import { GenerateFormCompoents } from '@/components/FormComponent';
import _ from 'lodash';
const status2 = [
  { name: '启用', type: true },
  { name: '禁用', type: false },
];
const UpdatePsd = props => {
  const [hasModity, handleHasModity] = useState<boolean>(false);
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [record, setRcord] = useState<any>({});
  const { data, form, dispatch, payType, getDatas } = props;
  const columns: any = [
    {
      title: '通道code',
      dataIndex: 'channelCode',
      align: 'center',
    },
    {
      title: '通道名称',
      dataIndex: 'channelName',
      align: 'center',
    },
    {
      title: '排序号',
      dataIndex: 'orderNo',
      align: 'center',
    },
    {
      title: '是否启用',
      dataIndex: 'enabled',
      align: 'center',
      render: item => {
        return helpers.isJudge(item == true)('启用', '禁用');
      },
    },
    {
      title: '支付平台code',
      dataIndex: 'payPlatformCode',
      align: 'center',
    },
    {
      title: '支付平台名称',
      dataIndex: 'payPlatformName',
      align: 'center',
    },
    {
      title: '对应通道code',
      dataIndex: 'payPlatformChannelCode',
      align: 'center',
    },
    {
      title: '操作',
      dataIndex: 'option',
      align: 'center',
      render: (_, record: any) => {
        return (
          <div>
              <Button
              type={'primary'}
              size={'small'}
              onClick={() => {
                handleHasModity(true);
                handleModalVisible(true);
                setRcord(record);
              }}
            >
              编辑
            </Button>
            <Divider type={'vertical'} />
            <Button
              type={'danger'}
              size={'small'}
              onClick={() => {
                del(record);
              }}
            >
              删除
            </Button>
          </div>
        );
      },
    },
  ];
  const del = async data => {
    const params = { id: data.id };
    Modal.confirm({
      title: '提示',
      content: `确定审核不通过吗`,

      onOk: () => {
        dispatch({
          type: 'rechargeChannel/delPayChannelById',
          payload: { params },
        }).then(data => {
          getDatas();
          message.success('操作成功');
          handleModalVisible(false);
          handleHasModity(false);
        });
      },
      onCancel: () => {
        handleModalVisible(false);
        handleHasModity(false);
      },
    });
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (hasModity) {
        fieldsValue.id = record.id;
      }
      fieldsValue.payTypeId = payType;
      insertModityRole(fieldsValue);
    });
  };
  const insertModityRole = params => {
    const alertMsg = helpers.isJudge(hasModity)(
      constant.alertMessage.UPDATE_SUCCESS,
      constant.alertMessage.ADD_SUCCESS,
    );
    dispatch({
      type: 'rechargeChannel/addOrUpdatePayChannel',
      payload: { params },
    }).then(data => {
      getDatas();
      message.success(data.message || alertMsg);
      handleModalVisible(false);
    });
  };
  const renderItems = [
    {
      type: 'input',
      label: '通道code',
      key: 'channelCode',
      validator: validator.onlyRequier,
      defulatVal: record.channelCode,
      placeholder: '请输入通道code',
    },
    {
      type: 'input',
      label: '通道名称',
      key: 'channelName',
      validator: validator.onlyRequier,
      defulatVal: record.channelName,
      placeholder: '请输入通道名称',
    },
    {
      type: 'input',
      label: '排序号',
      key: 'orderNo',
      validator: validator.onlyRequier,
      defulatVal: record.orderNo,
      placeholder: '请输入排序号',
    },
    {
      type: 'select',
      label: '是否启用',
      key: 'enabled',
      placeholder: ' ',
      validator: validator.onlyRequier,
      defulatVal: helpers.isJudge(record.enabled === undefined)(true, record.enabled),
      formData: status2,
    },
    {
      type: 'input',
      label: '支付平台code',
      key: 'payPlatformCode',
      validator: validator.onlyRequier,
      defulatVal: record.payPlatformCode,
      placeholder: '请输入支付平台code',
    },
    {
      type: 'input',
      label: '支付平台名称',
      key: 'payPlatformName',
      validator: validator.onlyRequier,
      defulatVal: record.payPlatformName,
      placeholder: '请输入支付平台名称',
    },
    {
      type: 'input',
      label: '对应通道code',
      key: 'payPlatformChannelCode',
      validator: validator.onlyRequier,
      defulatVal: record.payPlatformChannelCode,
      placeholder: '请输入对应通道code',
    },
  ];
  return (
    <>
      <div style={{ textAlign: 'right', marginRight: 20 }}>
        <Button type={'primary'} onClick={() => handleModalVisible(true)}>
          添加
        </Button>
      </div>
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        bordered
        size={'small'}
        pagination={false}
      />
      <Modal
        width={600}
        destroyOnClose
        confirmLoading={props.loadingState}
        title={helpers.isJudge(hasModity)('修改', '添加')}
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => {
          handleModalVisible(false);
        }}
        centered
      >
        <Form>
          <GenerateFormCompoents formItems={renderItems} form={form} />
        </Form>
      </Modal>
    </>
  );
};

export default connect(({ loading, user, common }: ConnectState) => ({
  loadingState: loading.models.rechargeChannel,
  user,
  common,
}))(Form.create()(UpdatePsd));

