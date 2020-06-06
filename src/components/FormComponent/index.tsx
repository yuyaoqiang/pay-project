import React from 'react';
import { Form, Input, InputNumber, Select, Radio, Checkbox, Row, DatePicker, Switch } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { FormItem, FromItemLayout } from '@/general';
import { helpers, dateUtils } from '@/utils';
const { RangePicker } = DatePicker;
interface MyFormComponentProps extends FormComponentProps {
  formItems: FormItem[];
  itemLayout?: FromItemLayout;
}

const defulatItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const FormItem = Form.Item;
const { Option } = Select;
const Textarea = Input.TextArea;
export const GenerateFormCompoents = (props: MyFormComponentProps) => {
  const { formItems, form, itemLayout } = props;
  return (
    <>
      {formItems.map(item => {
        if (item.hasVisibal) return null;
        return renderFormItem(item, form, itemLayout);
      })}
    </>
  );
};

const renderFormItem = (item: FormItem, form, itemLayout: FromItemLayout) => {
  const layout = itemLayout || defulatItemLayout;
  switch (item.type) {
    case 'text':
      return (
        <FormItem
          key={item.key}
          label={item.label}
          labelCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.labelCol)}
          wrapperCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.wrapperCol)}
        >
          {item.defulatVal}
        </FormItem>
      );
    case 'input':
      return (
        <FormItem
          key={item.key}
          label={item.label}
          labelCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.labelCol)}
          wrapperCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.wrapperCol)}
        >
          {form.getFieldDecorator(item.key, {
            rules: [
              {
                // 如果validator存在，就确认是必填项
                required: !!item.validator,
                message: item.placeholder,
              },
              {
                // input验证
                validator: item.validator,
              },
            ],
            initialValue: item.defulatVal,
            validateFirst: true,
          })(
            <Input placeholder={item.placeholder} suffix={item.suffix} disabled={item.disabled} />,
          )}
        </FormItem>
      );
    case 'input_password':
      return (
        <FormItem
          key={item.key}
          label={item.label}
          labelCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.labelCol)}
          wrapperCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.wrapperCol)}
        >
          {form.getFieldDecorator(item.key, {
            rules: [
              {
                // 如果validator存在，就确认是必填项
                required: !!item.validator,
                message: item.placeholder,
              },
              {
                // input验证
                validator: item.validator,
              },
            ],
            initialValue: item.defulatVal,
            validateFirst: true,
          })(<Input.Password placeholder={item.placeholder} allowClear />)}
        </FormItem>
      );
    case 'input_number':
      return (
        <FormItem
          key={item.key}
          label={item.label}
          labelCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.labelCol)}
          wrapperCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.wrapperCol)}
        >
          {form.getFieldDecorator(item.key, {
            rules: [
              {
                // 如果validator存在，就确认是必填项
                required: !!item.validator,
                message: item.placeholder,
              },
              {
                // input验证
                validator: item.validator,
              },
            ],
            initialValue: item.defulatVal,
            validateFirst: true,
          })(
            <InputNumber
              placeholder={item.placeholder}
              min={0}
              style={{ width: '100%' }}
              onChange={value => {
                item.onChange ? item.onChange(value, false) : () => {};
              }}
            />,
          )}
        </FormItem>
      );
    case 'textarea':
      return (
        <FormItem
          key={item.key}
          label={item.label}
          labelCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.labelCol)}
          wrapperCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.wrapperCol)}
        >
          {form.getFieldDecorator(item.key, {
            rules: [
              {
                // 如果validator存在，就确认是必填项
                required: !!item.validator,
                message: item.placeholder,
              },
              {
                // input验证
                validator: item.validator,
              },
            ],
            initialValue: item.defulatVal,
            validateFirst: true,
          })(<Textarea placeholder={item.placeholder} rows={4} />)}
        </FormItem>
      );
    case 'select':
      return (
        <FormItem
          key={item.key}
          label={item.label}
          labelCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.labelCol)}
          wrapperCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.wrapperCol)}
        >
          {form.getFieldDecorator(item.key, {
            rules: [
              {
                required: !!item.validator,
                message: item.placeholder,
              },
              {
                // input验证
                validator: item.validator,
              },
            ],
            initialValue: item.defulatVal,
            validateFirst: true,
          })(
            <Select
              allowClear
              style={{ width: '100%' }}
              placeholder={item.placeholder}
              // 开启多选 还是单选
              mode={helpers.isJudge(!!item.mode)('multiple', '')}
              // 级联回调 用于清空二级联动的值
              onChange={value => {
                item.onChange ? item.onChange(value, false) : () => {};
              }}
            >
              {item.formData &&
                item.formData.map(option => (
                  <Option key={item.key + option.type} value={option.type}>
                    {option.name}
                  </Option>
                ))}
            </Select>,
          )}
        </FormItem>
      );
    case 'checkbox':
      return (
        <FormItem
          key={item.key}
          label={item.label}
          labelCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.labelCol)}
          wrapperCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.wrapperCol)}
        >
          {form.getFieldDecorator(item.key, {
            initialValue: item.defulatVal,
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Row type="flex" justify="start">
                {item.formData &&
                  item.formData.map((checkbox, index) => {
                    return (
                      <div key={checkbox.id} style={{ marginLeft: '10px', marginTop: '10px' }}>
                        <Checkbox key={checkbox.id} value={checkbox.id}>
                          {checkbox.name}
                        </Checkbox>
                      </div>
                    );
                  })}
              </Row>
            </Checkbox.Group>,
          )}
        </FormItem>
      );
    case 'singlTime':
      return (
        <FormItem
          key={item.key}
          label={item.label}
          labelCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.labelCol)}
          wrapperCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.wrapperCol)}
        >
          {form.getFieldDecorator(item.key, {
            rules: [
              {
                // 如果validator存在，就确认是必填项
                required: !!item.validator,
                message: item.placeholder,
              },
            ],
          })(
            <DatePicker
              showTime
              onChange={value => {
                item.onChange ? item.onChange(value, false) : () => {};
              }}
            />,
          )}
        </FormItem>
      );
    case 'dateTime':
      return (
        <FormItem
          key={item.key}
          label={item.label}
          labelCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.labelCol)}
          wrapperCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.wrapperCol)}
        >
          {form.getFieldDecorator(item.key, {
            rules: [
              {
                // 如果validator存在，就确认是必填项
                required: !!item.validator,
                message: item.placeholder,
              },
            ],
          })(
            <RangePicker
              onChange={value => {
                item.onChange ? item.onChange(value, false) : () => {};
              }}
            />,
          )}
        </FormItem>
      );
    case 'time':
      return (
        <FormItem
          key={item.key}
          label={item.label}
          labelCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.labelCol)}
          wrapperCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.wrapperCol)}
        >
          {form.getFieldDecorator(item.key, {
            rules: [
              {
                // 如果validator存在，就确认是必填项
                required: !!item.validator,
                message: item.placeholder,
              },
            ],
            initialValue: [
              dateUtils.dateTimeFormat(item.defulatVal[0]),
              dateUtils.dateTimeFormat(item.defulatVal[1]),
            ],
          })(
            <RangePicker
              onChange={value => {
                item.onChange ? item.onChange(value, false) : () => {};
              }}
            />,
          )}
        </FormItem>
      );
    case 'radio':
      return (
        <FormItem
          key={item.key}
          label={item.label}
          labelCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.labelCol)}
          wrapperCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.wrapperCol)}
        >
          {form.getFieldDecorator(item.key, {
            rules: [
              {
                // 如果validator存在，就确认是必填项
                required: !!item.validator,
                message: item.placeholder,
              },
              {
                // input验证
                validator: item.validator,
              },
            ],
            validateFirst: true,
            initialValue: item.defulatVal,
          })(
            <Radio.Group>
              {item.formData &&
                item.formData.map((radio, index) => {
                  return (
                    <Radio
                      key={radio.type}
                      value={radio.type}
                      onChange={value => {
                        item.onChange ? item.onChange(value, false) : () => {};
                      }}
                    >
                      {radio.name}
                    </Radio>
                  );
                })}
            </Radio.Group>,
          )}
        </FormItem>
      );
    case 'switch':
      return (
        <FormItem
          key={item.key}
          label={item.label}
          labelCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.labelCol)}
          wrapperCol={helpers.isJudge(!layout)(defulatItemLayout.labelCol, layout.wrapperCol)}
        >
          {form.getFieldDecorator(item.key, {
            rules: [
              {
                // 如果validator存在，就确认是必填项
                required: !!item.validator,
                message: item.placeholder,
              },
              {
                // input验证
                validator: item.validator,
              },
            ],
            valuePropName: 'checked',
            initialValue: item.defulatVal,
          })(
            <Switch
              onChange={value => {
                item.onChange ? item.onChange(value, false) : () => {};
              }}
            />,
          )}
        </FormItem>
      );
    default:
      return null;
  }
};
