import { connect } from 'dva';
import React, { useState, useRef, useEffect } from 'react';
import { Button, Tabs, Card } from 'antd';
import { ConnectState } from '@/models/connect';
import VirtualWallet from './others/VirtualWallet';
import BankCard from './others/BankCard';
import GatheringCode from './others/GatheringCode';
import ThirdPartyPay from './others/ThirdPartyPay';
import _ from 'lodash';
import { helpers } from '@/utils';

const Settlement = props => {
  const [types, setTypes] = useState([]);
  const [payChannel, setPayChannel] = useState([]);
  const { dispatch, common } = props;

  useEffect(() => {
    findRechargeOrderState();
    findAllPayChannel();
    getDatas();
  }, []);
  const findRechargeOrderState = () => {
    dispatch({
      type: 'common/findRechargeOrderState',
      payload: {},
    });
  };

  const findAllPayChannel = () => {
    dispatch({
      type: 'rechargeChannel/findAllPayChannel',
      payload: {},
    }).then(res => {
      setPayChannel(res.data);
    });
  };
  const getDatas = () => {
    return dispatch({
      type: 'rechargeChannel/list',
      payload: {},
    }).then(data => {
      return setTypes(data.data);
    });
  };
  const filterData = (data, type) => {
    return data.filter(item => {
      return item.payTypeId === type;
    });
  };
  return (
    <Card>
      <Tabs animated={false} key={'id'}>
        {types.map((item: any) => {
          return (
            <Tabs.TabPane tab={item.name} key={item.id}>
              {helpers.isJudge(item.payCategory === 'virtualWallet')(
                <VirtualWallet
                  data={filterData(payChannel, item.id)}
                  payType={item.id}
                  getDatas={findAllPayChannel}
                />,
                null,
              )}
              {helpers.isJudge(item.payCategory === 'bankCard')(
                <BankCard
                  data={filterData(payChannel, item.id)}
                  payType={item.id}
                  getDatas={findAllPayChannel}
                />,
                null,
              )}
              {helpers.isJudge(item.payCategory === 'gatheringCode')(
                <GatheringCode
                  data={filterData(payChannel, item.id)}
                  payType={item.id}
                  getDatas={findAllPayChannel}
                />,
                null,
              )}
              {helpers.isJudge(item.payCategory === 'thirdPartyPay')(
                <ThirdPartyPay
                  data={filterData(payChannel, item.id)}
                  payType={item.id}
                  getDatas={findAllPayChannel}
                />,
                null,
              )}
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </Card>
  );
};
export default connect(({ loading, user, common }: ConnectState) => ({
  loadingState: loading.models.rechargeOrder,
  user,
  common,
}))(Settlement);
