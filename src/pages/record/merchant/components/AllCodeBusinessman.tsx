import React, { useState, useEffect } from 'react';
import { Modal, Form, Row, Col,message } from 'antd';
import { GenerateFormCompoents } from '@/components/FormComponent';
import { FromItemLayout } from '@/general';
import _ from 'lodash';

const defulatItemLayout_1 = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 20,
  },
};

const AllCodeBusinessman = props => {
  const { modalVisible, onCancel, confirmLoading, defulat = {} } = props;
  const { dispatch, form } = props;
  const [checked, setChecked] = useState([]);
  const [datas, setDatas] = useState([]);
  useEffect(() => {
    getDatas();
    findMerchantAppointCodeBusinessmanByMerchantId();
  }, [defulat]);

  const getDatas = () => {
    return dispatch({
      type: 'merchant/findAllCodeBusinessman',
      payload: { params: {} },
    }).then(data => setDatas(data.data));
  };

  const findMerchantAppointCodeBusinessmanByMerchantId = () => {
    return dispatch({
      type: 'merchant/findMerchantAppointCodeBusinessmanByMerchantId',
      payload: { params: {merchantId:defulat.id} },
    }).then(data =>{
      if(data.data.length>0){
        let str =[];
        data.data.map(item=>{
         str.push(item.userAccountId)
        })
        setChecked(str)
      }else{
        setChecked([])
      }

    });
  };
  const filterData = type => {
    const list = [];
    datas.map(item => {
      if (item.accountType == type) {
        list.push({
          id: item.id,
          name: item.realName,
        });
      }
    });
    return list;
  };
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      let userAccountIds=[...fieldsValue.agent,...fieldsValue.member]
      const params = { merchantId: defulat.id, userAccountIds };
      dispatch({
        type: 'merchant/appointCodeBusinessmanReceiveOrder',
        payload: { params },
      }).then(data => {
        message.success('修改成功');
        onCancel();
      });
    });

  };

  const renderItems = {
    row_7: [
      {
        type: 'checkbox',
        label: '代理',
        key: 'agent',
        defulatVal: checked,
        formData: filterData('agent'),
      },
    ],
    row_8: [
      {
        type: 'checkbox',
        label: '会员',
        key: 'member',
        defulatVal: checked,
        formData: filterData('member'),
      },
    ],
  };

  const generateCols = (row, colSize?: number, layout?: FromItemLayout) => {
    return row.map((item, index) => {
      return (
        <Col key={`row${index}`} span={colSize}>
          <GenerateFormCompoents formItems={[item]} form={form} itemLayout={layout} />
        </Col>
      );
    });
  };

  return (
    <Modal
      width={800}
      confirmLoading={confirmLoading}
      destroyOnClose
      title={'指定码商接单'}
      onOk={okHandle}
      visible={modalVisible}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      <div style={{color:'red'}}>注意:设置指定码商接单后,只能由指定的码商接单,其他码商就看不到并且接不了该商户的单了,请谨慎使用此功能</div>
      <Row gutter={[8, 0]}>{generateCols(renderItems.row_8, 24, defulatItemLayout_1)}</Row>
      <Row gutter={[8, 0]}>{generateCols(renderItems.row_7, 24, defulatItemLayout_1)}</Row>
    </Modal>
  );
};
export default Form.create()(AllCodeBusinessman);
