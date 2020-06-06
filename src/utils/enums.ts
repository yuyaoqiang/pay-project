// 分页条数
export enum pageSizeOptions {
  PAGE_SIZE_OPTION_20 = '20',
  PAGE_SIZE_OPTION_30 = '30',
  PAGE_SIZE_OPTION_50 = '50',
  PAGE_SIZE_OPTION_200 = '200',
}

//分页条数转为数组

export const getPageSizeOptions = (): Array<string> => {
  return [
    pageSizeOptions.PAGE_SIZE_OPTION_20,
    pageSizeOptions.PAGE_SIZE_OPTION_30,
    pageSizeOptions.PAGE_SIZE_OPTION_50,
    pageSizeOptions.PAGE_SIZE_OPTION_200,
  ];
};
