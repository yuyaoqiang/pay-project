import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Select } from 'antd';
import { connect } from 'dva';
import { helpers } from '@/utils';
const EditableContext = React.createContext<any>({});

interface Item {
  channelCode: string;
  rate: number;
  enabled: string;
  minAmount:number;
  maxAmount:number;
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
    handleSave({ ...record, enabled: value }, index);
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
            <Select.Option key={`item-999`} value={'-1'}>
              请选择
            </Select.Option>
            {common.gatheringChannel.map(item => {
              return (
                <Select.Option key={`item-${item.channelCode}`} value={item.channelCode}>
                  {item.channelName}
                </Select.Option>
              );
            })}
          </Select>,
        )}
      {dataIndex === 'rate' &&
        form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: ' ',
            },
          ],
          initialValue: record.rate,
        })(<Input ref={inputRef} onPressEnter={save} onBlur={save} suffix={'%'} />)}
      {dataIndex === 'minAmount' &&
        form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: ' ',
            },
          ],
          initialValue: record.minAmount,
        })(<Input ref={inputRef} onPressEnter={save} onBlur={save}/>)}
      {dataIndex === 'maxAmount' &&
        form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: ' ',
            },
          ],
          initialValue: record.maxAmount,
        })(<Input ref={inputRef} onPressEnter={save} onBlur={save}/>)}
      {dataIndex === 'enabled' && (
        <Select style={{ width: 120 }} onChange={updateProps} defaultValue={record.enabled+''}>
          <Select.Option key={`publishWay-1`} value={'true'}>
            启用
          </Select.Option>
          <Select.Option key={`publishWay-2`} value={'false'}>
            关闭
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
