export interface TableListItem {
  key: number;
  online?: string;
  name: string;
  real_name: string;
  agent_count: number;
  customer_count: number;
  usable_coin: number;
  status: string;
  created: Date;
  updated: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
  [any: string]: any;
}

export interface AllAgentData {
  allAgentData: AllAgentDataType[];
}
