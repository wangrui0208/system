class WeChatAuth {
  constructor(versionInfo, callback, axios) {
    this.versionInfo = versionInfo;
    this.callback = callback;
    this.$axios = axios;
  }
  verifyWeChatAuth() {
    this.setAppId();
    // this.callback();
  }
  setAppId() {
    const versionInfo = this.versionInfo;
    if (versionInfo === 'test' || versionInfo === 'production') {
      const appId = 'wx9ef10825e8e3f447';
      this.getCode(appId);
    } else {
      const appId = 'wx07a946946639833f'; // 开发环境-赵始华测试公众号
      this.getCode(appId);
      // localStorage.wxToken = 'NGdmZTJoR2JzV3JQU1A1THBCOU5EaThkS1BwTE85VVBQWW
      // VKSThhMGtPdjZsL2FjdklYS0JtTHNHMUlBWjBxQ25KLytXNy9ZdVhnPQ';
    }
  }
  getCode(appId) {
    const url = window.location.href;
    const urlParams = this.parseUrl(url);
    const state = urlParams.state;
    const isWechat = navigator.userAgent.toLowerCase().indexOf('micromessenger');
    if ((isWechat > -1) && !state) {
      localStorage.removeItem('wxToken');
      const redirectUri = encodeURI(url);
      window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_base&state=success#wechat_redirect`;
    } else if (state === 'success') {
      const code = urlParams.code;
      this.verifyWeChatCode(code);
    }
  }

  async verifyWeChatCode(code) {
    const wxCode = window.sessionStorage.wxCode;
    if (code === wxCode) {
      return;
    }
    const params = {
      code,
      userType: 0,
    };
    const {
      data,
    } = await this.$axios.get('/api/wp/webapi/wechatAuth/wechatAuthLogin', {
      params,
    });
    if (data.status === 0) {
      localStorage.wxToken = data.data;
      sessionStorage.wxCode = code;
    }
    this.callback(data.status);
    // else {
    //   this.$dialog.alert({
    //     mes: '用户验证失败，请刷新重试',
    //     callback: () => {
    //       localStorage.removeItem('wxToken');
    //     },
    //   });
    // }
  }

  // eslint-disable-next-line class-methods-use-this
  parseUrl(url) {
    const result = [];
    const obj = {};
    const query = url.split('?')[1];
    if (query) {
      if (query.indexOf('&') > -1) {
        const queryArr = query.split('&');
        queryArr.forEach((item) => {
          const value = item.split('=')[1];
          const key = item.split('=')[0];
          obj[key] = value;
          result.push(obj);
        });
      } else {
        const value = query.split('=')[1];
        const key = query.split('=')[0];
        obj[key] = value;
        result.push(obj);
      }
    }
    return obj; // {a:1,b:2,c:3}
  }
}

export default WeChatAuth;
