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
    id: 686,
    path: 'merchantOrder',
    name: '商户订单',
    hideInMenu: true,
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
    id: 687,
    path: 'appealRecord',
    name: '申述记录',
    hideInMenu: true,
    children: [
      {
        id: 687,
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
    hideInMenu: true,
    id:'824',
    meta: {
      title: '统计管理',
      icon: 'statistics',
    },
    children: [
      {
        id:'825',
        path: 'tradeReport',
        name: '平台报表',
        hideInMenu: true,
      },
      {
        id:'826',
        path: 'channelTradeReport',
        name: '通道报表',
        hideInMenu: true,
      },
      {
        id:'827',
        path: 'merchantTradeReport',
        name: '商户报表',
        hideInMenu: true,
      },
      {
        id:'828',
        path: 'userTradeReport',
        name: '用户报表',
        hideInMenu: true,
      },
    ],
  },
  {
    path: 'masterControlRoom',
    name: '总控室',
    id: '673',
    meta: {
      title: '总控室',
      icon: 'user',
    },
    hideInMenu: true,
    children: [
      {
        id: '674',
        path: 'sysSetting',
        name: '系统设置',
        hideInMenu: true,
      },
      {
        id: '675',
        path: 'outOrderSetting',
        name: '下单设置',
        hideInMenu: true,
      },
      {
        id: '676',
        path: 'registeredProxySettings',
        name: '注册代理设置',
        hideInMenu: true,
      },
      { id: '677', path: 'getOrderSetting', name: '接单设置', hideInMenu: true },
      {
        id: '678',
        path: 'getReceiveOrderRiskSetting',
        name: '接单风控',
        hideInMenu: true,
      },
      {
        id: '679',
        path: 'getRechargeSetting',
        name: '充值设置',
        hideInMenu: true,
      },
      { id: '680', path: 'getWithdrawSetting', name: '提现设置', hideInMenu: true },
      { id: '684', path: 'wsMessageSetting', name: 'WS消息设置', hideInMenu: true },
      { id: '681', path: 'getMerchantSettlementSetting', name: '商户结算', hideInMenu: true },
      { id: '682', path: 'customerQrcodeSetting', name: '客服二维码', hideInMenu: true },
      { id: '683', path: 'refreshCache', name: '刷新缓存', hideInMenu: true },
    ],
  },
  {
    id: '688',
    path: 'account',
    name: '账号相关',
    hideInMenu: true,
    meta: {
      title: '账号相关',
      icon: 'user',
    },
    children: [
      {
        id: '689',
        path: 'backAccount',
        name: '后台账号',
        hideInMenu: true,
      },
      {
        id: '690',
        path: 'agent',
        name: '代理账号',
        hideInMenu: true,
      },
      {
        id: '690',
        path: 'member',
        name: '会员账号',
        hideInMenu: true,
      },
      {
        id: '690',
        path: 'creditMember',
        name: '信用会员账号',
        hideInMenu: true,
      },
      {
        id:'815',
        path: 'permission',
        name: '角色管理',
        hideInMenu: true,
      },
    ],
  },
  {
    id:'691',
    path: 'record',
    name: '商户相关',
    hideInMenu: true,
    meta: {
      title: '商户相关',
      icon: 'record',
    },
    children: [
      {
        id:'692',
        path: 'merchant',
        name: '商户管理',
        hideInMenu: true,
      },
      {
        id:'693',
        path: 'settlement',
        name: '商户结算',
        hideInMenu: true,
      },
      {
        id:'829',
        path: 'chukanBank',
        name: '下发卡管理',
        hideInMenu: true,
      },
    ],
  },
  {
    id:'694',
    path: 'gathering',
    name: '收款相关',
    hideInMenu: true,
    meta: {
      title: '收款相关',
      icon: 'gathering',
    },
    children: [
      {
        id:'695',
        path: 'code',
        name: '收款方式',
        hideInMenu: true,
      },
      {
        id:'696',
        path: 'channel',
        name: '收款通道',
        hideInMenu: true,
      },
    ],
  },
  {
    id: '701',
    path: 'logManger',
    name: '日志管理',
    hideInMenu: true,
    meta: {
      title: '日志管理',
      icon: 'logManger',
    },
    children: [
      {
        id: '702',
        path: 'accountChangeLog',
        name: '码商账变日志',
        hideInMenu: true,
      },
      {
        id: '703',
        path: 'accountMerchantLog',
        name: '商户账变日志',
        hideInMenu: true,
      },
      {
        id: '704',
        path: 'loginLog',
        name: '登陆日志',
        hideInMenu: true,
      },
      {
        id: '705',
        path: 'operLog',
        name: '操作日志',
        hideInMenu: true,
      },
      {
        id: '706',
        path: 'heartbeatLog',
        name: '监控APP心跳日志',
        hideInMenu: true,
      },
    ],
  },
  {
    id: '707',
    path: 'systemListen',
    name: '系统监控',
    hideInMenu: true,
    meta: {
      title: '系统监控',
      icon: 'systemListen',
    },
    children: [
      {
        id: '708',
        path: 'online',
        name: '在线账号',
        hideInMenu: true,
      },
      {
        id: '709',
        path: 'clean',
        name: '数据清理',
        hideInMenu: true,
      },
    ],
  },
  {
    id: '697',
    path: 'recharge',
    name: '充值提现',
    hideInMenu: true,
    meta: {
      title: '充值提现',
      icon: 'recharge',
    },
    children: [
      {
        id: '698',
        path: 'rechargeOrder',
        name: '充值订单',
        hideInMenu: true,
      },
      {
        id: '699',
        path: 'withdrawRecord',
        name: '提现记录',
        hideInMenu: true,
      },
      {
        id: '700',
        path: 'rechargeChannel',
        name: '充值通道',
        hideInMenu: true,
      },
      {
        id: '700',
        path: 'rechargeChannelType',
        name: '充值类型维护',
        hideInMenu: true,
      },
    ],
  },
  {
    id: '710',
    path: 'systemManger',
    name: '系统管理',
    hideInMenu: true,
    meta: {
      title: '系统管理',
      icon: 'systemManger',
    },
    children: [
      {
        id: '711',
        path: 'notice',
        name: '系统公告',
        hideInMenu: true,
      },
      {
        id: '712',
        path: 'dict',
        name: '字典管理',
        hideInMenu: true,
      },
    ],
  },
];
