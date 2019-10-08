// import Router from '../../src/router/index';

// 验证手机号码
export function checkPhoneNum(phoneNum) {
  const phoneReg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
  if (!phoneReg.test(phoneNum)) {
    return false;
  }
  return true;
}

// 验证密码
export function checkPassword(password) {
  const pswReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
  if (!pswReg.test(password)) {
    return false;
  }
  return true;
}

// 判断身份证号格式以及年龄
export function authenticationAccount(idNum) {
  const city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外',
  };
  let tip = '校验成功';
  let isRight = true;
  let sex = '';
  let age = 0;
  let code = [];
  if (idNum.length !== 18) {
    tip = '身份证号格式错误';
    isRight = false;
  } else if (!city[idNum.substr(0, 2)]) {
    tip = '地址编码错误';
    isRight = false;
  } else {
    // 18位身份证需要验证最后一位校验位
    code = idNum.split('');
    // ∑(ai×Wi)(mod 11)
    // 加权因子
    const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验位
    const parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    let sum = 0;
    let ai = 0;
    let wi = 0;
    for (let i = 0; i < 17; i++) {
      ai = code[i];
      wi = factor[i];
      sum += ai * wi;
    }
    // var last = parity[sum % 11];
    if (parity[sum % 11].toString() !== code[17].toString()) {
      tip = '校验位错误';
      isRight = false;
    }

    if (isRight) {
      // 身份证号解析
      const codeStr = idNum.toString();
      if (parseInt(codeStr.substr(16, 1), 10) % 2 === 1) {
        sex = '男';
      } else {
        sex = '女';
      }
      // 获取年龄
      const myDate = new Date();
      const month = myDate.getMonth() + 1;
      const day = myDate.getDate();
      age = myDate.getFullYear() - codeStr.substring(6, 10) - 1;
      const codeMonth = parseInt(codeStr.substring(10, 12), 10);
      const codeDay = parseInt(codeStr.substring(12, 14), 10);
      if (codeMonth < month || (codeMonth === month && codeDay <= day)) {
        age++;
      }
    }
  }
  return {
    isRight,
    age,
    sex,
    tip,
  };
}

export function checkPostCode(code) {
  const postCodeReg = /^[0-9]{6}$/;
  if (!postCodeReg.test(code)) {
    return false;
  }
  return true;
}

// export function getVerificationCode(domEle, duration) {
//   domEle.innerHTML = `${duration}s`;
//   const int = setInterval(() => {
//     if (duration > 1) {
//       domEle.innerHTML = `${duration}s`;
//       duration--;
//     } else {
//       domEle.innerHTML = '重新发送';
//       clearInterval(int);
//     }
//   }, 1000);
// }

/* eslint-disable */
// export function XHRError(responseData) {
//   if (responseData.status === 8001) {
//     sessionStorage.history = Router.app.$route.fullPath;
//     alert('用户验证信息错误，请重新登录！');
//     Router.push('/login');
//   } else if (responseData.status === 8002) {
//     sessionStorage.history = Router.app.$route.fullPath;
//     alert('登录信息已过期，请重新登录！');
//     Router.push('/login');
//   } else if (responseData.status === 8003) {
//     sessionStorage.history = Router.app.$route.fullPath;
//     alert('您的账号在其他设备登录，如不是您本人的操作，请尽快修改密码！');
//     Router.push('/login');
//   } else if ((!responseData.status) && (responseData.status !== 0)) {
//     alert('发生未知错误，请稍后重试！');
//   } else {
//     alert(responseData.msg);
//   }
// }

export function delHtmlTag(test) {
  test = test.replace(/&nbsp;/ig, "");
  return test.replace(/<[^>]+>/g, ''); // 去掉所有的html标记
}

export function setCookie(name, value, duration) {
  const Days = duration; // 单位小时
  const exp = new Date();
  exp.setTime(exp.getTime() + (Days * 60 * 60 * 1000));
  document.cookie = `${name}=${escape(value)};expires=${exp.toGMTString()}`;
}

export function getCookie(name) {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  if (arr) {
    return unescape(arr[2]);
  }
  return null;
}

export function delCookie(name) {
  const exp = new Date();
  exp.setTime(exp.getTime() - 1);
  const cval = getCookie(name);
  if (cval != null) {
    document.cookie = `${name}=${cval};expires=${exp.toGMTString()}`;
  }
}

export function getAdData(classId) {
  // const adList = JSON.parse(localStorage.adList);
  const adList = this.$store.state.adList;
  if (classId === 3 || classId === 9) {
    const list = [];
    for (let i = 0; i < adList.length; i++) {
      if (adList[i].classid === classId) {
        list.push(adList[i]);
      }
    }
    return list;
  }
  let ad;
  for (let i = 0; i < adList.length; i++) {
    if (adList[i].classid === classId) {
      ad = adList[i];
    }
  }
  return ad;
}
// 表情符号存储与编译
export function utf16toEntities(str) {
  var patt = /[\ud800-\udbff][\udc00-\udfff]/g;
  // 检测utf16字符正则
  str = str.replace(patt, function (char) {
    var H, L, code;
    if (char.length === 2) {
      H = char.charCodeAt(0);
      // 取出高位
      L = char.charCodeAt(1);
      // 取出低位
      code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00;
      // 转换算法
      var ss = "&#" + code + ";";
      return ss;
    } else {
      return char;
    }
  });
  str = str.replace(/&#/g, '^^');
  return str;
}

//表情解码
export function entitiestoUtf16(str) {
  // 检测出形如&#12345;形式的字符串
  var strObj = utf16toEntities(str);
  strObj = strObj.replace(/\^\^/g, '&#');
  var patt = /&#\d+;/g;
  var H, L, code;
  var arr = strObj.match(patt) || [];
  for (var i = 0; i < arr.length; i++) {
    code = arr[i];
    code = code.replace('&#', '').replace(';', '');
    // 高位
    H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
    // 低位
    L = (code - 0x10000) % 0x400 + 0xDC00;
    code = "&#" + code + ";";
    var s = String.fromCharCode(H, L);
    strObj.replace(code, s);
  }
  return strObj;
}

// 判断当前环境是微信还是 web
export function crrentEnvironment() {
  // 需要判断用户类型， WEB("web", "WEB"), WX("wx", "微信"),SYSTEM("system","系统用户");
  return (navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1);
}

// 推荐卡号的规则
// 一个大写字母+7个阿拉伯数字
export function recommendCard(val) {
  const cardReg = /^[A-Za-z][0-9]{7}$/;
  if (!cardReg.test(val)) {
    return false;
  }
  return true;
}

// 验证邮箱格式
export function checkEmail(val) {
  const emailReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
  if (!emailReg.test(val)) {
    return false;
  }
  return true;
}

// 纸质票的格式
export function checkPaperTicket(val) {
  val = val.toUpperCase();
  const ticketReg = /^[A-Z]{2}[0-9]{8}$/;
  if (!ticketReg.test(val)) {
    return false;
  }
  return true;
};

// 判断所传日期是否早于当前日期
export function checkTime(val) {
  const dateTime = new Date(val).getTime();
  // 得到当前年月日的时间戳
  const currentTime = new Date();
  const currentY = currentTime.getFullYear();
  let currentM = currentTime.getMonth() + 1;
  if (currentM < 10) {
    currentM = '0' + currentM;
  }
  let currentD = currentTime.getDate();
  if (currentD < 10) {
    currentD = '0' + currentD;
  }
  const currentDate  = currentY + '-' + currentM + '-' + currentD;
  // 当前时间戳
  const currentStamp = new Date(currentDate).getTime();
  if (dateTime >= currentStamp)  {
    return true;
  } else {
    return false;
  }
}

// 判断当前日期的合法性
export function isDateTime(intYear, intMonth, intDay) {
  if (isNaN(intYear) || isNaN(intMonth) || isNaN(intDay)) {
    return false;
  }
  if (intMonth > 12 || intMonth < 1) {
    return false;
  }
  if (intDay < 1 || intDay > 31) {
    return false;
  }
  if ((intMonth === 4 || intMonth === 6 || intMonth === 9 || intMonth === 11) && (intDay > 30)) {
    return false;
  }
  if (intMonth === 2) {
    if (intDay > 29) return false;
    if ((((intYear % 100 === 0) && (intYear % 400 !== 0)) || (intYear % 4 !== 0)) && (intDay > 28)) return false;
  }
  return true;
}

export default {
  checkPhoneNum,
  checkPassword,
  authenticationAccount,
  checkPostCode,
  checkEmail,
  checkTime,
  isDateTime,
  // getVerificationCode,
  // XHRError,
  recommendCard,
  delHtmlTag,
  setCookie,
  getCookie,
  delCookie,
  getAdData,
  utf16toEntities,
  entitiestoUtf16,
  crrentEnvironment,
  checkPaperTicket,
};
