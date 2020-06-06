import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Select } from 'antd';
import { connect } from 'dva';
import { helpers } from '@/utils';
const EditableContext = React.createContext<any>({});

interface Item {
  channelCode: string;
  rebate: number;
  state: number;
}

interface EditableRowProps {
  index: number;
  form: any;
}

const EditableRow: React.FC<EditableRowProps> = ({ form, index, ...props }) => {
  return (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
  );
};
export const EditableFormRow = Form.create()(EditableRow);

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: Item;
  common: any;
  index: number;
  handleSave: (record: Item, index: number) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  common,
  index,
  ...restProps
}) => {
  const inputRef = useRef();
  const form = useContext(EditableContext);
  const save = e => {
    form.validateFields((error, values) => {
      if (error) return;
      handleSave({ ...record, ...values }, index);
    });
  };
  const updateProps = value => {
    handleSave({ ...record, state: value }, index);
  };
  let childNode = editable ? (
    <Form.Item style={{ margin: 0 }}>
      {dataIndex === 'channelCode' &&
        form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: ' ',
            },
          ],
          initialValue: record.channelCode,
        })(
          <Select style={{ width: 120 }} onChange={save}>
            <Select.Option key={`item-999`} value={"-1"}>请选择</Select.Option>
            {common.gatheringChannel.map(item => {
              return <Select.Option key={`item-${item.channelCode}`} value={item.channelCode}>{item.channelName}</Select.Option>;
            })}
          </Select>,
        )}
      {dataIndex === 'rebate' &&
        form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: ' ',
            },
          ],
          initialValue: record.rebate,
        })(<Input ref={inputRef} onPressEnter={save} onBlur={save} suffix={"%"} />)}

      {dataIndex === 'state' && (
        <Select style={{ width: 120 }} onChange={updateProps} defaultValue={record.state}>
          <Select.Option key={`publishWay-1`} value={'1'}>
            开启中
          </Select.Option>
          <Select.Option key={`publishWay-2`}value={'2'}>
            关闭中
          </Select.Option>
          <Select.Option key={`publishWay-3`} value={'3'}>
            已禁用
          </Select.Option>
        </Select>
      )}
    </Form.Item>
  ) : (
    <div className="editable-cell-value-wrap">{children}</div>
  );

  return <td {...restProps}>{childNode}</td>;
};
export default connect(({ common, loading }: any) => ({
  loadingState: loading.models.merchantOrder,
  common,
}))(EditableCell);
