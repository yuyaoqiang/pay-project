// 表单提交格式
export interface InsertModityFormType {
  type: string;
  label: string;
  key: string;
  defulatVal?: string;
  validator: (rule: any, value: any, callback: any) => void;
  placeholder: string;
  formData?: any[];
}
// 生成表单列表
interface FormItem {
  label: string;
  styles?: any;
  key: string;
  type: string;
  props?: string;
  formData?: any;
  mode?: string;
  hasVisibal?: boolean;
  disabled?: boolean;
  defulatVal?: string | Array | boolean;
  validator?: Function;
  onChange?: Function;
  placeholder: string;
  suffix?:string;
}
interface FromItemLayout {
  labelCol: {
    span: number;
  };
  wrapperCol: {
    span: number;
  };
}
