import React, { useState, useEffect } from 'react';
import { Form, Modal, Row, Col, DatePicker } from 'antd';
import { ModalFormProps } from '@/interfaceGlobal';
import _ from 'lodash';
import 'braft-editor/dist/index.css';
const NoticeContent: React.FC<ModalFormProps> = props => {
  const { modalVisible, form, onSubmit, onCancel } = props;
  const { confirmLoading, defulat = {} } = props;
  return (
    <Modal
      width={900}
      destroyOnClose
      confirmLoading={confirmLoading}
      title={"公告内容"}
      visible={modalVisible}
      footer={[]}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      <h3 style={{textAlign:"center"}}>{defulat.title}</h3>
      <p style={{textAlign:"center"}}>{defulat.publishTime}</p>
      <p dangerouslySetInnerHTML={{__html:defulat.content}}></p>
    </Modal>
  );
};

export default NoticeContent;
