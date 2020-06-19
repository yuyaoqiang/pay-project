export default [
  {
    id: 10,
    path: 'dashboard',
    name: '仪表盘',
    children: [
      {
        id: 1001,
        path: 'dashboard',
        name: '仪表盘',
        meta: {
          title: '仪表盘',
          icon: 'dashboard',
          noCache: true,
          affix: true,
        },
        hideInMenu: true,
      },
    ],
  },
  {
    path: 'merchanStatistics',
    name: '统计分析',
    hideInMenu: false,
    children: [
      {
        path: 'merchanStatistics',
        name: '统计分析1',
        meta: {
          title: '统计分析1',
          icon: 'merchanStatistics',
          noCache: true,
          affix: true,
        },
        hideInMenu: true,
      },
    ],
  },
  {
    id: 686,
    path: 'merchantOrder',
    name: '商户订单',
    hideInMenu: false,
    children: [
      {
        id: 686,
        path: 'merchantOrder',
        name: '商户订单',
        meta: {
          title: '商户订单',
          icon: 'merchantOrder',
          noCache: true,
          affix: true,
        },
        hideInMenu: true,
      },
    ],
  },

  {
    id: '701',
    path: 'logManger',
    name: '账变日志',
    hideInMenu: false,
    meta: {
      title: '商户账变日志',
      icon: '商户账变日志',
    },
    children: [
      {
        id: '703',
        path: 'logManger',
        name: '商户账变日志',
        hideInMenu: true,
      },

    ],
  },

  {
    id: '710',
    path: 'applySettlement',
    name: '申请结算',
    hideInMenu: false,
    meta: {
      title: '申请结算',
      icon: 'applySettlement',
    },
    children: [
      {
        id: '711',
        path: 'settlementRecord',
        name: '申请结算页面',
        hideInMenu: false,
      },
      {
        id: '712',
        path: 'settlementRecordList',
        name: '我的结算记录',
        hideInMenu: false,
      },
    ],
  },
  {
    id: '711',
    path: 'merchantInfo',
    name: '商户信息',
    hideInMenu: false,
    meta: {
      title: '商户详情',
      icon: 'merchantInfo',
    },
    children: [
      {
        id: '712',
        path: 'info',
        name: '商户详情',
        hideInMenu: false,
      },
      {
        id: '713',
        path: 'banks',
        name: '银行卡管理',
        hideInMenu: false,
      },
      {
        id: '714',
        path: 'interfaceDoc',
        name: '接口文档',
        hideInMenu: false,
      },
    ],
  },
  {
    id: '9999',
    path: 'proxy',
    name: '代理中心',
    hideInMenu: false,
    meta: {
      title: '代理中心',
      icon: 'proxy',
    },
    children: [
      {
        id: '712',
        path: 'agentSubordinate',
        name: '下级商户管理',
        hideInMenu: false,
      },
      {
        id: '712',
        path: 'levelMerchantOrder',
        name: '下级商户订单',
        hideInMenu: false,
      },
      {
        id: '712',
        path: 'proxyStatistics',
        name: '下级商户统计',
        hideInMenu: false,
      },
    ],
  },
  {
    id: 686,
    path: 'rateDetails',
    name: '费率详情',
    hideInMenu: false,
    children: [
      {
        id: 686,
        path: 'rateDetails',
        name: '费率详情',
        meta: {
          title: '费率详情',
          icon: 'rateDetails',
          noCache: true,
          affix: true,
        },
        hideInMenu: true,
      },
    ],
  },
];
