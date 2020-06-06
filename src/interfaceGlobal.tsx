import { FormComponentProps } from 'antd/es/form';
// 弹出框规则
export interface ModalFormProps extends FormComponentProps {
  modalVisible: boolean;
  confirmLoading: boolean;
  onSubmit: (value: any, treeData?: any) => void;
  onCancel: () => void;
  [random: string]: any;
}
