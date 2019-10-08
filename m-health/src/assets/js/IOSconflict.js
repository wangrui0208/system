/* eslint-disable */
// 苹果手机软键盘启动不回落设置
function SoftKeyboardEvents() {
  const u = navigator.userAgent;
  let flag;
  let myFunction;
  let distanceTop = '';
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  if (isIOS) {
    document.body.addEventListener('focusin', () => { // 软键盘弹起事件
      flag = true;
      distanceTop = document.body.scrollTop;
      clearTimeout(myFunction);
    });
    document.body.addEventListener('focusout', () => { // 软键盘关闭事件
      flag = false;
      if (!flag) {
        myFunction = setTimeout(() => {
          window.scrollTo(0, distanceTop);
          // window.scrollTo({
          //   top: distanceTop,
          //   left: 0,
          //   behavior: 'smooth',
          // }); // 重点->当键盘收起的时候让页面回到原始位置
        }, 200);
      } else {
        return;
      }
    });
  } else {
    return;
  }
};
SoftKeyboardEvents();
/* eslint-enable */
