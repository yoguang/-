# 前端常见面试题汇总

## 编程题

### 手动实现 JavaScript bind 函数

```js
Function.prototype._bind = function (context) {
  let self = this; // 保存 this
  const _out_args = Array.prototype.slice.call(arguments, 1); // 接收 bind(obj, 1,2) 函数参数
  return function () {
    const _in_args = Array.prototype.slice.call(arguments); // 接收目标函数参数
    const args = _out_args.concat(_in_args); // 合并参数
    return self.apply(context, args);
  };
};
```

### 斐波那契数列

```js
// 递归实现
function fibonacci(num) {
  if (num <= 0) {
    throw Error("数字应为大于0的整数");
    return;
  }
  if (num === 1 || num === 2) {
    return 1;
  }
  if (num > 2) {
    return fibonacci(num - 1) + fibonacci(num - 2);
  }
}
// 优化方案
function fibonacci2(num) {}
```

### 防抖函数 lodash.debounce

> 在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。

```js
function debounce(func, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    const _that = this;
    const args = Array.prototype.slice.call(arguments);
    timer = setTimeout(() => {
      func.apply(_that, args);
    }, delay);
  };
}
```

### 节流函数 lodash.throttle

> 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

```js
function throttle(func, delay) {}
```
