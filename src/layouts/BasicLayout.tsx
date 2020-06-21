import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
  SettingDrawer,
} from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import Link from 'umi/link';
import { Dispatch } from 'redux';
import { connect, router } from 'dva';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState, UserModelState } from '@/models/connect';
import routers from '@/utils/routers';
import logo from '../assets/logo.svg';
import { helpers } from '@/utils';

export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
  user: UserModelState;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { dispatch, children, settings, user } = props;
  const [router, setRouter] = useState(routers);
  useEffect(() => {
    // getPermissions();
    getSystemSetting();
    // getMerchantList();
    gatheringChannel();
    gatheringCode();
    getOrderState();
    findMerchantOrderPayNoticeState();
    findMerchantOrderConfirmWay();
    findAppealType();
    findAppealState();
    findAppealProcessWay();
    findMerchantOrderConfirmWay();
    filterRouter();
  }, []);

  // const [deepRouters,setDeepRouters]=useState([])

  // const getPermissions = () => {
  //   dispatch({ type: 'user/getPermissions', payload: {} }).then(res=>{
  //     setDeepRouters(helpers.permissionsFilter(routers,res.data))
  //   })
  // };
  const getSystemSetting = (): void => {
    dispatch({ type: 'common/getSystemSetting', payload: {} });
  };
  const getMerchantList = (): void => {
    dispatch({ type: 'common/getMerchantList', payload: {} });
  };
  const gatheringChannel = (): void => {
    dispatch({ type: 'common/gatheringChannel', payload: {} });
  };
  const gatheringCode = (): void => {
    dispatch({ type: 'common/gatheringCode', payload: {} });
  };
  const getOrderState = (): void => {
    dispatch({ type: 'common/getOrderState', payload: {} });
  };
  const findMerchantOrderPayNoticeState = (): void => {
    dispatch({ type: 'common/findMerchantOrderPayNoticeState', payload: {} });
  };
  const findMerchantOrderConfirmWay = (): void => {
    dispatch({ type: 'common/findMerchantOrderConfirmWay', payload: {} });
  };
  const handleMenuCollapse = (payload: boolean): void => {
    dispatch({ type: 'global/changeLayoutCollapsed', payload });
  };
  const findAppealState = (): void => {
    dispatch({ type: 'common/findAppealState', payload: {} });
  };
  const findAppealProcessWay = (): void => {
    dispatch({ type: 'common/findAppealProcessWay', payload: {} });
  };
  const findAppealType = (): void => {
    dispatch({ type: 'common/findAppealType', payload: {} });
  };
  const filterRouter = () => {
    let filter = [];
    routers.map(item => {
      if (user.accountType == 'merchant' && item.id == '9999') {
        item.hideInMenu = true;
      }
      filter.push(item);
    });
    setRouter(filter)
  };
  return (
    <ProLayout
      logo={logo}
      siderWidth={210}
      menuHeaderRender={(logoDom, titleDom) => (
        <Link to="/">
          {logoDom}
          {titleDom}
        </Link>
      )}
      onCollapse={handleMenuCollapse}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || menuItemProps.children) {
          return defaultDom;
        }

        return <Link to={menuItemProps.path as string}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => [
        {
          path: '/',
          breadcrumbName: '首页',
        },
        ...routers,
      ]}
      itemRender={(route, params, routes, paths) => {
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      menuDataRender={() => router}
      rightContentRender={() => <RightContent />}
      {...props}
      {...settings}
    >
      {children}
      <SettingDrawer
        settings={settings}
        hideHintAlert
        onSettingChange={config => {
          dispatch({
            type: 'settings/changeSetting',
            payload: config,
          });
        }}
      ></SettingDrawer>
    </ProLayout>
  );
};

export default connect(({ global, settings, user }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
  user,
}))(BasicLayout);
