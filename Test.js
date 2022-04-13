// 手动实现 bind
Function.prototype._bind = function (context) {
  let self = this;
  const _out_args = Array.prototype.slice.call(arguments, 1);
  return function () {
    const _in_args = Array.prototype.slice.call(arguments);
    const args = _out_args.concat(_in_args);
    return self.apply(context, args);
  };
};

function func () {
  console.log(this.name);
  console.log(arguments)
}
const obj = { name: 'whh' };
func._bind(obj, 4)(1,2,3);

// 斐波那契数列
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

let result = fibonacci(1);
console.log('fibonacci result: ', result);
result = fibonacci(2);
console.log('fibonacci result: ', result);
result = fibonacci(3);
console.log('fibonacci result: ', result);
result = fibonacci(4);
console.log('fibonacci result: ', result);
result = fibonacci(5);
console.log('fibonacci result: ', result);

result = fibonacci(9);
console.log('fibonacci result: ', result);

// 防抖
function debounce(func, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    const _that = this;
    const args = Array.prototype.slice.call(arguments);
    timer = setTimeout(() => {
      func.apply(_that, args);
    }, delay);
  }
}

function run () {
  console.log('debounce--------->', arguments);
}

const _run = debounce(run, 1000);

_run(1);
_run(2);