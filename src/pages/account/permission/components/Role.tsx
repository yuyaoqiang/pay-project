import React, { useState, useEffect } from 'react';
import { Form, Modal, message, Checkbox, Spin } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import _ from 'lodash';
import { helpers } from '@/utils';
const defulatItemLayout_2 = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const AddUpDataComponent: React.FC<ModalFormProps> = props => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState([]);
  const { modalVisible, onSubmit, onCancel } = props;
  const { confirmLoading, dispatch, defulat = {}, accounts } = props;
  useEffect(() => {
    findRole();
  }, [defulat]);

  const save = () => {
    const params = { id: defulat.id, accountIds: values.join(',') };
    return dispatch({
      type: 'permission/accountSave',
      payload: { params },
    }).then(data => {
      message.success('保存权限成功');
      onCancel();
    });
  };

  const findRole = () => {
    const params = { id: defulat.id };
    setLoading(true);
    return dispatch({
      type: 'permission/roleList',
      payload: { params },
    }).then(data => {
      setLoading(false);
      let ids = [];
      data.data.map(item => {
        ids.push(item.accountId);
      });
      setValues(ids);
    });
  };
  const onChange = checkedValues => {
    setValues(checkedValues);
  };
  return (
    <Modal
      width={600}
      destroyOnClose
      confirmLoading={confirmLoading}
      title={'账号列表'}
      visible={modalVisible}
      onOk={() => {
        save();
      }}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      <Form.Item label={'账号'} {...defulatItemLayout_2}>
        <Checkbox.Group options={accounts} value={values} onChange={onChange} />
      </Form.Item>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(AddUpDataComponent);
