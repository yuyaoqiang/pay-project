import { IConfig, IPlugin } from 'umi-types';
import { themeConfig } from './themePluginConfig';
import slash from 'slash2';

const { environment: ENVIRONMENT } = process.env;
const plugins: IPlugin[] = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];
if (ENVIRONMENT === 'pro') {
  plugins.push(['umi-plugin-antd-theme', themeConfig]);
}
export default {
  plugins,
  hash: true,
  history:'hash',
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/',
              redirect: '/dashboard',
            },
            {
              path: '/welcome',
              name: '用户中心',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/merchantOrder',
              component: './merchantOrder',
            },
            {
              path: '/appealRecord',
              component: './appealRecord',
            },
            {
              path: '/masterControlRoom',
              name: 'masterControlRoom',
              routes: [
                {
                  name: 'sysSetting',
                  path: '/masterControlRoom/sysSetting',
                  component: './masterControlRoom/sysSetting',
                },
                {
                  name: 'outOrderSetting',
                  path: '/masterControlRoom/outOrderSetting',
                  component: './masterControlRoom/outOrderSetting',
                },
                {
                  name: 'registeredProxySettings',
                  path: '/masterControlRoom/registeredProxySettings',
                  component: './masterControlRoom/registeredProxySettings',
                },
                {
                  name: 'getOrderSetting',
                  path: '/masterControlRoom/getOrderSetting',
                  component: './masterControlRoom/getOrderSetting',
                },
                {
                  name: 'getReceiveOrderRiskSetting',
                  path: '/masterControlRoom/getReceiveOrderRiskSetting',
                  component: './masterControlRoom/getReceiveOrderRiskSetting',
                },
                {
                  name: 'getRechargeSetting',
                  path: '/masterControlRoom/getRechargeSetting',
                  component: './masterControlRoom/getRechargeSetting',
                },
                {
                  name: 'getWithdrawSetting',
                  path: '/masterControlRoom/getWithdrawSetting',
                  component: './masterControlRoom/getWithdrawSetting',
                },
                {
                  name: 'getMerchantSettlementSetting',
                  path: '/masterControlRoom/getMerchantSettlementSetting',
                  component: './masterControlRoom/getMerchantSettlementSetting',
                },
                {
                  name: 'customerQrcodeSetting',
                  path: '/masterControlRoom/customerQrcodeSetting',
                  component: './masterControlRoom/customerQrcodeSetting',
                },
                {
                  name: 'refreshCache',
                  path: '/masterControlRoom/refreshCache',
                  component: './masterControlRoom/refreshCache',
                },
                {
                  name: 'wsMessageSetting',
                  path: '/masterControlRoom/wsMessageSetting',
                  component: './masterControlRoom/wsMessageSetting',
                },
              ],
            },
            {
              path: '/account',
              name: 'account',
              routes: [
                {
                  name: 'account',
                  path: '/account/backAccount',
                  component: './account/backAccount',
                },
                {
                  name: 'agent',
                  path: '/account/agent',
                  component: './account/agent',
                },
                {
                  name: 'member',
                  path: '/account/member',
                  component: './account/member',
                },
                {
                  name: 'creditMember',
                  path: '/account/creditMember',
                  component: './account/creditMember',
                },
                {
                  name: 'permission',
                  path: '/account/permission',
                  component: './account/permission',
                },
              ]
            },
            {
              path: '/record',
              name: 'record',
              routes: [
                {
                  name: 'record',
                  path: '/record/merchant',
                  component: './record/merchant',
                },
                {
                  name: 'settlement',
                  path: '/record/settlement',
                  component: './record/settlement',
                },
              ]
            },
            {
              path: '/gathering',
              name: 'gathering',
              routes: [
                {
                  name: 'gathering',
                  path: '/gathering/code',
                  component: './gathering/code',
                },
                {
                  name: 'channel',
                  path: '/gathering/channel',
                  component: './gathering/channel',
                },
              ]
            },
            {
              path: '/logManger',
              name: 'logManger',
              routes: [
                {
                  name: 'accountChangeLog',
                  path: '/logManger/accountChangeLog',
                  component: './logManger/accountChangeLog',
                },
                {
                  name: 'accountMerchantLog',
                  path: '/logManger/accountMerchantLog',
                  component: './logManger/accountMerchantLog',
                },
                {
                  name: 'loginLog',
                  path: '/logManger/loginLog',
                  component: './logManger/loginLog',
                },
                {
                  name: 'operLog',
                  path: '/logManger/operLog',
                  component: './logManger/operLog',
                },
                {
                  name: 'heartbeatLog',
                  path: '/logManger/heartbeatLog',
                  component: './logManger/heartbeatLog',
                },
              ]
            },
            {
              path: '/statistics',
              name: 'statistics',
              routes: [
                {
                  name: 'tradeReport',
                  path: '/statistics/tradeReport',
                  component: './statistics/tradeReport',
                },
                {
                  name: 'channelTradeReport',
                  path: '/statistics/channelTradeReport',
                  component: './statistics/channelTradeReport',
                },
                {
                  name: 'merchantTradeReport',
                  path: '/statistics/merchantTradeReport',
                  component: './statistics/merchantTradeReport',
                },
                {
                  name: 'userTradeReport',
                  path: '/statistics/userTradeReport',
                  component: './statistics/userTradeReport',
                },
              ]
            },
            {
              path: '/systemListen',
              name: 'systemListen',
              routes: [
                {
                  name: 'online',
                  path: '/systemListen/online',
                  component: './systemListen/online',
                },
                {
                  name: 'clean',
                  path: '/systemListen/clean',
                  component: './systemListen/clean',
                },

              ]
            },
            {
              path: '/recharge',
              name: 'recharge',
              routes: [
                {
                  name: 'rechargeOrder',
                  path: '/recharge/rechargeOrder',
                  component: './recharge/rechargeOrder',
                },
                {
                  name: 'withdrawRecord',
                  path: '/recharge/withdrawRecord',
                  component: './recharge/withdrawRecord',
                },
                {
                  name: 'rechargeChannel',
                  path: '/recharge/rechargeChannel',
                  component: './recharge/rechargeChannel',
                },
                {
                  name: 'rechargeChannelType',
                  path: '/recharge/rechargeChannelType',
                  component: './recharge/rechargeChannelType',
                },
              ]
            },
            {
              path: '/systemManger',
              name: 'systemManger',
              routes: [
                {
                  name: 'notice',
                  path: '/systemManger/notice',
                  component: './systemManger/notice',
                },
                {
                  name: 'dict',
                  path: '/systemManger/dict',
                  component: './systemManger/dict',
                },

              ]
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ENVIRONMENT: ENVIRONMENT || 'dev',
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string,
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  // chainWebpack: webpackPlugin,
  proxy: {
    '/api/': {
      target: 'http://8.129.189.10:8081',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
} as IConfig;
