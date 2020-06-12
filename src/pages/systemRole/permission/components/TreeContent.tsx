import React, { useState, useEffect,useRef } from 'react';
import { Form, Modal, Tree, message, Button } from 'antd';
import _ from 'lodash';
import 'braft-editor/dist/index.css';
const { TreeNode } = Tree;
const defulatItemLayout_2 = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const TreeContent = props => {
  const { modalVisible, dispatch, onCancel } = props;
  const { confirmLoading, treeData, defulat } = props;
  const [permisison, setPermisison] = useState([]);
  const actionRef = useRef();
  const [defaultPermisison, setDefaultPermisison] = useState([]);
  useEffect(() => {
    findRole();
  }, [defulat]);
  const save = () => {
    const params = { id: defulat.id, permissionIds: permisison.join(",") };
    return dispatch({
      type: 'permission/save',
      payload: { params },
    }).then(data => {
      message.success('保存权限成功');
      onCancel();
    });
  };

  const findRole = () => {
    const params = { id: defulat.id };
    return dispatch({
      type: 'permission/find',
      payload: { params },
    }).then(data => {
      let ids =[]
      forDatas([data.data],ids);
      setDefaultPermisison([...ids])
    });

  };
  const forDatas = (data,ids) => {
   return data.map(item => {
      if (item.check) {
          ids.push(item.id.toString())
          if(item.child.length>0){
            forDatas(item.child,ids);
          }
      }
    });
  };
  const onCheck = (checkedKeys, info) => {
    console.log(checkedKeys)
    setPermisison(checkedKeys);
  };
  console.log(defaultPermisison)
  return (
    <Modal
      style={{ height: '500px' }}
      width={500}
      destroyOnClose
      confirmLoading={confirmLoading}
      title={'权限设置'}
      visible={modalVisible}
      onOk={() => {
        save();
      }}
      onCancel={() => {
        onCancel();
      }}
      centered
    >
      <Form.Item label={'权限设置'} {...defulatItemLayout_2}>
        <Tree
          checkable={true}
          onCheck={onCheck}
          defaultSelectedKeys={defaultPermisison}
          defaultExpandedKeys={defaultPermisison}
          defaultCheckedKeys={defaultPermisison}
          treeData={[treeData]}
        ></Tree>
      </Form.Item>
    </Modal>
  );
};

export default TreeContent;
