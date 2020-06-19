import { request, constant } from '@/utils';
import Debounce from 'lodash-decorators/debounce';
/**
 * 通用数据接口
 */
class CommonService {
  // 系统设置参数
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static getSystemSetting() {
    return request.get('/masterControl/getSystemSetting');
  }
  // 商户列表
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static getMerchantList() {
    return request.get('/merchant/findAllMerchant');
  }
  // 通道
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findAllGatheringChannel() {
    return request.get('/gatheringChannel/findAllGatheringChannel');
  }
  // // 收款方式列表
  // @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  // static findAllGatheringCode() {
  //   return request.get('/gatheringCode/findAllGatheringCode');
  // }
  // 订单状态
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findMerchantOrderState() {
    return request.get('/dictconfig/findDictItemInCache?dictTypeCode=merchantOrderState');
  }
  // 通知状态
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findMerchantOrderPayNoticeState() {
    return request.get('/dictconfig/findDictItemInCache?dictTypeCode=merchantOrderPayNoticeState');
  }
  // 确认方式
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findMerchantOrderConfirmWay() {
    return request.get('/dictconfig/findDictItemInCache?dictTypeCode=merchantOrderConfirmWay');
  }
  // 商户类型
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findMerchantAccountType() {
    return request.get('/dictconfig/findDictItemInCache?dictTypeCode=merchantAccountType');
  }
  // 商户结算状态
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findMerchantSettlementState() {
    return request.get('/dictconfig/findDictItemInCache?dictTypeCode=merchantSettlementState');
  }
  // 申诉类型
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findAppealType() {
    return request.get('/dictconfig/findDictItemInCache?dictTypeCode=appealType');
  }
  // 申诉-处理方式
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findAppealProcessWay() {
    return request.get('/dictconfig/findDictItemInCache?dictTypeCode=appealProcessWay');
  }
  // 申诉-处理状态
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findAppealState() {
    return request.get('/dictconfig/findDictItemInCache?dictTypeCode=appealState');
  }
  // 收款方式-状态
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findGatheringCodeState() {
    return request.get('/dictconfig/findDictItemInCache?dictTypeCode=gatheringCodeState');
  }
  // 日志-账变状态
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findaccountChangeType() {
    return request.get('/dictconfig/findDictItemInCache?dictTypeCode=accountChangeType');
  }
  // 日志-账变状态
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findMerchantAccountChangeType() {
    return request.get('/dictconfig/findDictItemInCache?dictTypeCode=merchantAccountChangeType');
  }
  // 日志-账变状态
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findLoginState() {
    return request.get('/dictconfig/findDictItemInCache?dictTypeCode=loginState');
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findRechargeOrderState() {
    return request.get('/dictconfig/findDictItemInCache?dictTypeCode=rechargeOrderState');
  }

  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findWithdrawRecordState() {
    return request.get('/dictconfig/findDictItemInCache?dictTypeCode=withdrawRecordState');
  }
  @Debounce(constant.DEBOUNCE_TIME, { leading: true })
  static findPayCategory() {
    return request.get('/dictconfig/findDictItemInCache?dictTypeCode=payCategory');
  }
}

export default CommonService;
