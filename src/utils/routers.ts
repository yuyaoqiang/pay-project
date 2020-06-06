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
    id: 12,
    path: 'merchantOrder',
    name: '商户订单',
    children: [
      {
        id: 1001,
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
    path: 'appealRecord',
    name: '申述记录',
    children: [
      {
        path: 'appealRecord',
        name: '申述记录',
        meta: {
          title: '申述记录',
          icon: 'appealRecord',
          noCache: true,
          affix: true,
        },
        hideInMenu: true,
      },
    ],
  },
  {
    path: 'statistics',
    name: '统计管理',
    meta: {
      title: '统计管理',
      icon: 'statistics',
    },
    children: [
      {
        path: 'tradeReport',
        name: '平台报表',
      },
    ]
  },
  {
    path: 'masterControlRoom',
    name: '总控室',
    meta: {
      title: '总控室',
      icon: 'user',
    },
    children: [
      {
        path: 'sysSetting',
        name: '系统设置',
      },
      {
        path: 'outOrderSetting',
        name: '下单设置',
      },
      {
        path: 'registeredProxySettings',
        name: '注册代理设置',
      },
      {
        path: 'getOrderSetting',
        name: '接单设置',
      },
      {
        path: 'getReceiveOrderRiskSetting',
        name: '接单风控',
      },
      {
        path: 'getRechargeSetting',
        name: '充值设置',
      },
      {
        path: 'getWithdrawSetting',
        name: '提现设置',
      },
      {
        path: 'getMerchantSettlementSetting',
        name: '商户结算',
      },
      {
        path: 'customerQrcodeSetting',
        name: '客服二维码',
      },
      {
        path: 'refreshCache',
        name: '刷新缓存',
      },
    ]
  },
  {
    path: 'account',
    name: '账号相关',
    meta: {
      title: '账号相关',
      icon: 'user',
    },
    children: [
      {
        path: 'backAccount',
        name: '后台账号',
      },
      {
        path: 'agent',
        name: '代理账号',
      },
      {
        path: 'member',
        name: '会员账号',
      },
      {
        path: 'creditMember',
        name: '信用会员账号',
      },
    ]
  },
  {
    path: 'record',
    name: '商户相关',
    meta: {
      title: '商户相关',
      icon: 'record',
    },
    children: [
      {
        path: 'merchant',
        name: '商户管理',
      },
      {
        path: 'settlement',
        name: '商户结算',
      },
    ]
  },
  {
    path: 'gathering',
    name: '收款相关',
    meta: {
      title: '收款相关',
      icon: 'gathering',
    },
    children: [
      {
        path: 'code',
        name: '收款方式',
      },
      {
        path: 'channel',
        name: '收款通道',
      },
    ]
  },
  {
    path: 'logManger',
    name: '日记管理',
    meta: {
      title: '日记管理',
      icon: 'logManger',
    },
    children: [
      {
        path: 'accountChangeLog',
        name: '码商账变日记',
      },
      {
        path: 'accountMerchantLog',
        name: '商户账变日记',
      },
      {
        path: 'loginLog',
        name: '登陆日记',
      },
      {
        path: 'operLog',
        name: '操作日记',
      },
      {
        path: 'heartbeatLog',
        name: '监控APP心跳日记',
      },
    ]
  },
  {
    path: 'systemListen',
    name: '系统监控',
    meta: {
      title: '系统监控',
      icon: 'systemListen',
    },
    children: [
      {
        path: 'online',
        name: '在线账号',
      },
      {
        path: 'clean',
        name: '数据清理',
      },
    ]
  },
  {
    path: 'recharge',
    name: '充值提现',
    meta: {
      title: '充值提现',
      icon: 'recharge',
    },
    children: [
      {
        path: 'rechargeOrder',
        name: '充值订单',
      },
      {
        path: 'withdrawRecord',
        name: '提现记录',
      },
      {
        path: 'rechargeChannel',
        name: '充值通道',
      },
      {
        path: 'rechargeChannelType',
        name: '充值类型维护',
      },
    ]
  },
  {
    path: 'systemManger',
    name: '系统管理',
    meta: {
      title: '系统管理',
      icon: 'systemManger',
    },
    children: [
      {
        path: 'notice',
        name: '系统公告',
      },
      {
        path: 'dict',
        name: '字典管理',
      },
    ]
  },
];
