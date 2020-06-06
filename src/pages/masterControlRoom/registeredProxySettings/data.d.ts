export interface TableListItem {
  is_online: boolean;
  type: number;
  is_app_domain: number;
  status: number;
  remark: string;
  created: number;
  updated: number;
  sticker: string;
}

export interface TableListData {
  list: TableListItem[];
}
