import React, { useState, useEffect, useRef } from 'react';
import { Form, Modal, Tree, message, Button, Spin } from 'antd';
import _ from 'lodash';
import 'braft-editor/dist/index.css';
import { helpers } from '@/utils';
const { TreeNode } = Tree;
const defulatItemLayout_2 = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const treeData1 = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          {
            title: '0-0-0-0',
            key: '0-0-0-0',
          },
          {
            title: '0-0-0-1',
            key: '0-0-0-1',
          },
          {
            title: '0-0-0-2',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          {
            title: '0-0-1-0',
            key: '0-0-1-0',
          },
          {
            title: '0-0-1-1',
            key: '0-0-1-1',
          },
          {
            title: '0-0-1-2',
            key: '0-0-1-2',
          },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      {
        title: '0-1-0-0',
        key: '0-1-0-0',
      },
      {
        title: '0-1-0-1',
        key: '0-1-0-1',
      },
      {
        title: '0-1-0-2',
        key: '0-1-0-2',
      },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];
const TreeContent = props => {
  const { modalVisible, dispatch, onCancel } = props;
  const { confirmLoading, treeData, defulat } = props;
  const [permisison, setPermisison] = useState([]);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    findRole();
  }, [defulat]);
  const save = () => {
    const params = { id: defulat.id, permissionIds: permisison.join(',') };
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
      if(data.data){
        const arr =data.data.split(",");
        setPermisison(arr);;
      }
      setFlag(true);

    });
  };
  const forDatas = (data, ids) => {
    return data.map(item => {
      if (item.check) {
        ids.push(item.id.toString());
        if (item.child.length > 0) {
          forDatas(item.child, ids);
        }
      }
    });
  };
  const onCheck = (checkedKeys, info) => {
    setPermisison(checkedKeys);
  };
  const renderTreeNode = treeNode => {
    return treeNode.map(item => {
      if (!item.children) {
        return <TreeNode title={item.title} key={item.key?.toString()} />;
      } else {
        return (
          <TreeNode title={item.title} key={item.key?.toString()}>
            {renderTreeNode(item.children)}
          </TreeNode>
        );
      }
    });
  };
  const rednerTree = () => {
    return (
      <Tree
        checkable
        key={'root'}
        checkedKeys={permisison}
        onCheck={onCheck}
        treeData={[treeData]}
      >
      </Tree>
    );
  };
  return (
    <Modal
      style={{ height: '500px' }}
      width={500}
      bodyStyle={{ height: 400, overflow: 'hidden', overflowY: 'auto' }}
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
      {helpers.isJudge(flag)(
        <Form.Item label={'权限设置'} {...defulatItemLayout_2}>
          {rednerTree()}
        </Form.Item>,
        <Spin></Spin>,
      )}
    </Modal>
  );
};

export default TreeContent;
