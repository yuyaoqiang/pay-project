import React, { useState, useEffect } from 'react';
import { Form, Input, Select, DatePicker, Button, Checkbox } from 'antd';
import moment from 'moment';
import * as _ from 'lodash';

const RangePicker = DatePicker.RangePicker;
const disabledDate = current => current && current > moment().endOf('day');
interface RuleProps {
  required: boolean;
  message: string;
  validator?: () => void;
}

// const range = {
//   今天: [moment(), moment()],
//   昨天: [moment().subtract(1, 'day'), moment().subtract(1, 'day')],
//   本月: [moment().startOf('month'), moment().endOf('day')],
//   上月: [
//     moment()
//       .subtract(1, 'month')
//       .startOf('month'),
//     moment()
//       .subtract(1, 'month')
//       .endOf('month'),
//   ],
// };

interface FormItemProps {
  type: string;
  label: string;
  value?: any;
  name?: string;
  style?: object;
  placeholder?: string | Array<string>;
  options?: Array<any>;
  rules?: Array<RuleProps>;
  isMultiple?: boolean;
  visible?: boolean;
  showTime?: boolean;
  onChange?: (val: any) => void;
  renderer?: () => React.ReactNode;
}

interface FilterProps {
  fileds: Array<FormItemProps>;
  layout?: object;
  params?: object;
  filter?: object;
  onSearch: (query?: any) => void;
  reset?: (query?: any) => void;
  renderer?: () => React.ReactNode;
}

const FilterList = (props: FilterProps) => {
  const { onSearch, params, renderer } = props;
  const searchParams = _.merge(
    params,
    ..._.keys(props.filter).map(key => {
      return { [key]: 1 };
    }),
  );
  const [query, setQuery] = useState({ ...searchParams });
  const changeValue = (val, name) => {
    setQuery({ ...query, [name]: val });
  };

  const resetData = () => {
    setQuery({ ...searchParams });
    onSearch({ ...searchParams });
  };

  const generateCheckBox = filters => {
    return !_.isEmpty(filters)
      ? Object.keys(filters).map(key => {
          return (
            <Checkbox
              key={key}
              checked={query[key] ? true : false}
              onChange={e => {
                setQuery({
                  ...query,
                  [key]: e.target.checked ? 1 : 0,
                });
              }}
            >
              {filters[key]}
            </Checkbox>
          );
        })
      : null;
  };
  function generateFormItem() {
    return props.fileds.map((item, k) => {
      if (item.renderer) {
        return <Form.Item key={k}>{item.renderer()}</Form.Item>;
      }
      switch (item.type) {
        case 'input':
          return (
            <Form.Item label={item.label} key={k}>
              <Input
                value={query[item.name]}
                placeholder={item.placeholder}
                onChange={e => {
                  if (item.onChange) {
                    item.onChange(e.target.value);
                  }
                  changeValue(e.target.value, item.name);
                }}
                style={item.style}
              />
            </Form.Item>
          );
        case 'input-group':
          return (
            <Form.Item label={item.label} key={k}>
              <Input.Group style={{ display: 'flex', alignItems: 'center', marginTop: 5 }}>
                <Input
                  value={query[item.value[0]]}
                  placeholder={item.placeholder[0]}
                  style={item.style}
                  onChange={e => changeValue(e.target.value, item.value[0])}
                />
                <span style={{ marginLeft: 10, marginRight: 10 }}>至</span>
                <Input
                  value={query[item.value[1]]}
                  placeholder={item.placeholder[1]}
                  style={item.style}
                  onChange={e => changeValue(e.target.value, item.value[1])}
                />
              </Input.Group>
            </Form.Item>
          );
        case 'select':
          return !item.visible ? (
            <Form.Item label={item.label} key={k}>
              <Select
                mode={item.isMultiple ? 'multiple' : 'default'}
                value={query[item.name]}
                allowClear={true}
                onChange={value => {
                  if (item.onChange) {
                    item.onChange(value);
                  }
                  changeValue(value, item.name);
                }}
                style={item.style}
                placeholder={item.placeholder}
              >
                {item.options.map(n => (
                  <Select.Option value={n.id} key={n.name}>
                    {n.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          ) : null;
        case 'rangepicker':
          return (
            <Form.Item label={item.label} key={k}>
              <RangePicker
                style={item.style}
                allowClear={false}
                disabledDate={disabledDate}
                showTime={item.showTime ? item.showTime : false}
                format={item.showTime ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'}
                value={[moment(query[item.name[0]] * 1000), moment(query[item.name[1]] * 1000)]}
                onChange={dates => {
                  setQuery({
                    ...query,
                    [item.name[0]]: moment(dates[0]).valueOf() / 1000,
                    [item.name[1]]: moment(dates[1]).valueOf() / 1000,
                  });
                }}
              />
            </Form.Item>
          );
        default:
          return null;
      }
    });
  }

  useEffect(() => {
    onSearch({ ...query });
  }, []);

  return (
    <Form layout="inline" {...props.layout}>
      {generateFormItem()}
      <Form.Item>
        <Button type="primary" style={{ marginRight: 10 }} onClick={() => onSearch({ ...query })}>
          查询
        </Button>
        <Button onClick={() => resetData()} style={{ marginRight: 20 }}>
          重置
        </Button>
        {generateCheckBox(_.get(props, 'filter'))}
      </Form.Item>
      {renderer ? <Form.Item>{renderer()}</Form.Item> : null}
    </Form>
  );
};

export default FilterList;
