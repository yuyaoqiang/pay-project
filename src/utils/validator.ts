// 全部匹配
export const onlyRequier = (rule, value, callback) => {
  callback();
};
// 账号字母开头 6-15位
export const checkAccount = (rule, value, callback) => {
  const reg = /^[a-zA-Z]\w{5,14}$/;
  if (!reg.test(value) && value) {
    callback(new Error('必须是字母开头的6-15位字母或字母和数字组合'));
  } else {
    callback();
  }
};
// 账号字母开头 6-15位
export const checkIpv4 = (rule, value, callback) => {
  const reg = /^((25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
  if (!reg.test(value) && value) {
    callback(new Error('请输入合法的ip地址！'));
  } else {
    callback();
  }
};

// 中文名字 可以包含 ·
export const checkChinaName = (rule, value, callback) => {
  const reg = /^[\u4e00-\u9fa5][\u4e00-\u9fa5\·]{1,15}[\u4e00-\u9fa5]{0,}$/;
  if (!reg.test(value) && value) {
    callback(new Error('请输入2-15个汉字或·'));
  } else {
    callback();
  }
};
// 密码 6-20位
export const checkPassword = (rule, value, callback) => {
  const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
  if (!reg.test(value) && value) {
    callback(new Error('登录密码为6~20位字母数字组合'));
  } else {
    callback();
  }
};

// 2-8位数字校验
export const check2_8_number = (rule, value, callback) => {
  const reg = /^\S{2,8}$/;
  if (!reg.test(value) && value) {
    callback(new Error('限2-8位非空字符'));
  } else {
    callback();
  }
};

export const check_4_number = (rule, value, callback) => {
  const reg = /^\S{4}$/;
  if (!reg.test(value) && value) {
    callback(new Error('提款密码应该为4位数字'));
  } else {
    callback();
  }
};

// 1-18位数字校验
export const check1_18_number = (rule, value, callback) => {
  const reg = /^\S{1,18}$/;
  if (!reg.test(value) && value) {
    callback(new Error('最长不能超过18位'));
  } else {
    callback();
  }
};

// 中文昵称
export const checkChinaNickName = (rule, value, callback) => {
  const reg = /^[\u4e00-\u9fa5a-zA-Z0-9]{1}[\u4e00-\u9fa5a-zA-Z0-9\@\#\·\-\_\.\/]{1,7}$/;
  if (!reg.test(value) && value) {
    callback(new Error('必须是以汉字或字母或数字开头的2-8位字符，特殊字符仅可输入@#·-_./'));
  } else {
    callback();
  }
};

//  QQ账号
export const checkQQ = (rule, value, callback) => {
  const reg = /^[1-9][0-9]{3,11}$/;
  if (!reg.test(value) && value) {
    callback(new Error('QQ号码为4-11位数字'));
  } else {
    callback();
  }
};

// 邮箱
export const checkEmail = (rule, value, callback) => {
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  if (!reg.test(value) && value) {
    callback(new Error('Email地址非法'));
  } else {
    callback();
  }
};

//  手机号
export const checkPhoneNumber = (rule, value, callback) => {
  const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
  if (!reg.test(value) && value) {
    callback(new Error('手机号码为11位数字'));
  } else {
    callback();
  }
};
