/**
 * 通过权限匹配得到最终的权限控制左侧栏
 * @param orgin 待过滤的路由列表
 * @param persionsList 权限列表
 */
export const filterPermiss = (orgin: any, persionsList = []) => {
  const permissionsFiltered = orgin.filter((item: any) => {
    const newChildren = item.children.filter((children: any) => {
      return persionsList[children.path];
    });
    item.children = newChildren;
    return item.children.length;
  });
  return permissionsFiltered;
};
