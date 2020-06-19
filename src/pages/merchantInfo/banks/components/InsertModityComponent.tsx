import React, { useState, useEffect } from 'react';
import { Form, Modal, Row, Col, DatePicker } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import BraftEditor from 'braft-editor';
import { GenerateFormCompoents } from '@/components/FormComponent';
import * as validator from '@/utils/validator';
import _ from 'lodash';
import moment from 'moment';
import { helpers } from '@/utils';
import 'braft-editor/dist/index.css';
const FormItem = Form.Item;
const defulatItemLayout_2 = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};
const AddUpDataComponent: React.FC<ModalFormProps> = props => {
  const { modalVisible, form, onSubmit, onCancel } = props;
  const { confirmLoading, defulat = {} } = props;
  const [dateRange, setDateRange] = useState({
    hasRadio: '',
    date: moment(),
  });
  const [editorState, setEditorState] = useState<any>(BraftEditor.createEditorState(null));
  useEffect(() => {
    setEditorState(BraftEditor.createEditorState(defulat.content));
  }, [defulat]);

  const changeDateType = dateRange => {
    setDateRange(dateRange);
  };
  const handleEditorChange = editorState => {
    setEditorState(editorState);
  };
  const renderItems = [
    {
      type: 'input',
      label: '开户银行',
      key: 'openAccountBank',
      validator: validator.onlyRequier,
      defulatVal: defulat.openAccountBank,
      placeholder: '请输入开户银行',
    },
    {
      type: 'input',
      label: '开户姓名',
      key: 'accountHolder',
      validator: validator.onlyRequier,
      defulatVal: defulat.accountHolder,
      placeholder: '请输入开户姓名',
    },
    {
      type: 'input',
      label: '银行卡号',
      key: 'bankCardAccount',
      validator: validator.onlyRequier,
      defulatVal: defulat.bankCardAccount,
      placeholder: '请输入银行卡号',
    },
  ];
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      if (hasModity) {
        fieldsValue.id = defulat.id;
      }
      onSubmit({ ...defulat, ...fieldsValue });
    });
  };
  const { hasModity } = props;
  return (
    <Modal
      width={500}
      destroyOnClose
      confirmLoading={confirmLoading}
      title={helpers.isJudge(hasModity)('修改', '添加')}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      <Form>
        <GenerateFormCompoents formItems={renderItems} form={form} itemLayout={defulatItemLayout_2}/>
      </Form>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(AddUpDataComponent);
