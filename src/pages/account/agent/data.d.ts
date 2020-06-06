export interface TableListItem {
  domain: string;
  type: number;
  is_app_domain: number;
  status: number;
  remark: string;
  created: number;
  updated: number;
}

export interface TableListData {
  list: TableListItem[];
}
