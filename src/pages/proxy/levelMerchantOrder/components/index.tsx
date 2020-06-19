import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Select } from 'antd';
import { connect } from 'dva';
import { helpers } from '@/utils';
const EditableContext = React.createContext<any>({});

interface Item {
  gatheringChannelCode: string;
  gatheringAmount: string;
  orderNo: string;
  attch: string;
  publishWay: number;
  publishTime: string;
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
  const updateProps = ( value) => {
    handleSave({ ...record, publishWay: value }, index);
  };
  let childNode = editable ? (
    <Form.Item style={{ margin: 0 }}>
      {dataIndex === 'gatheringChannelCode' &&
        form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: ' ',
            },
          ],
        })(
          <Select style={{ width: 120 }} onChange={save}>
            {common.gatheringChannel.map(item => {
              return <Select.Option value={item.channelCode}>{item.channelName}</Select.Option>;
            })}
          </Select>,
        )}
      {dataIndex === 'gatheringAmount' &&
        form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: ' ',
            },
          ],
        })(<Input ref={inputRef} onPressEnter={save} onBlur={save} />)}
      {dataIndex === 'orderNo' &&
        form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: ' ',
            },
          ],
        })(<Input ref={inputRef} onPressEnter={save} onBlur={save} />)}
      {dataIndex === 'attch' &&
        form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: ' ',
            },
          ],
        })(<Input ref={inputRef} onPressEnter={save} onBlur={save} />)}
      {dataIndex === 'publishWay' && (
        <Select style={{ width: 120 }} onChange={updateProps} defaultValue={record.publishWay
        }>
          <Select.Option key="1" value={1}>
            立即发单
          </Select.Option>
          <Select.Option key="2" value={2}>
            延迟发单
          </Select.Option>
        </Select>
      )}
      {dataIndex === 'publishTime' &&
        helpers.isJudge(record.publishWay === 1)('立即发单', '延迟发单')}
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
