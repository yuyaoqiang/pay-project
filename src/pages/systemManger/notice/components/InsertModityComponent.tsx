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
    span: 4,
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
      label: '标题',
      key: 'title',
      validator: validator.onlyRequier,
      defulatVal: defulat.title,
      placeholder: '请输入标题',
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
      width={900}
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
        <Row gutter={[8, 0]}>
          <Col span={24}>
            <FormItem label={'发布时间'} labelCol={{ span: 4 }} wrapperCol={{ span: 18 }}>
              <DatePicker
                showTime
                value={dateRange.date}
                onChange={date => {
                  changeDateType({ hasRadio: '', date });
                }}
              />
            </FormItem>
          </Col>
        </Row>
        <Row gutter={[8, 0]}>
          <Col span={24}>
            <Form.Item label={'公告内容'} labelCol={{ span: 4}} wrapperCol={{ span: 18 }}>
              <div className="my-component" style={{ border: '1px solid #d9d9d9' }}>
                <BraftEditor
                  value={editorState}
                  onChange={handleEditorChange}
                  contentStyle={{ height: '150px' }}
                />
              </div>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default Form.create<ModalFormProps>()(AddUpDataComponent);
