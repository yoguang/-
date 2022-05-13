// 扁平数据结构转 Tree

let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
];

function arrayToTree(items) {
  const result = []; // 存放结果集
  const itemMap = {}; //
  for (const item of items) {
    const id = item.id;
    const pid = item.pid;

    if (!itemMap[id]) {
      itemMap[id] = {
        children: [],
      };
    }

    itemMap[id] = {
      ...item,
      children: itemMap[id]["children"],
    };

    const treeItem = itemMap[id];

    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        };
      }
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
}
console.log('arrayToTree---->', JSON.stringify(arrayToTree(arr), null,2))

// 函数柯里化
function curry (fn) {
  const args = [].slice.call(arguments, 1);
  return function () {
    const _args = [...args, ...arguments];
    if (_args.length <= fn.length) {
      return curry(fn, ..._args);
    } else {
      return fn.apply(null, _args);
    }
  }
}
function add(a, b, c) {
  return a + b + c;
}

const _add = curry(add, 4)
console.log('_add return------>', _add(1)(2)(3))

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

function throttle(func, delay) {
  let timer = null;
  return function () {
    const args = Array.prototype.slice.call(arguments);
    const context = this;
    if (!timer) {
    timer = setTimeout(() => {
      func.apply(context, args);
      timer = null;
    }, delay);
    }
  };
}

function throttle2(func, delay) {
  let timer = null;
  return function () {
    const args = Array.prototype.slice.call(arguments);
    const context = this;
    if (!timer) {
      func.apply(context, args);
      timer = setTimeout(() => {
        timer = null;
      }, delay);
    }
  };
}


function throttle3(func, delay) {
  let pre = Date.now();
  return function () {
    const args = Array.prototype.slice.call(arguments);
    const context = this;
    const now = Date.now();
    if (now - pre >= delay) {
        func.apply(context, args);
        pre = Date.now();
    }
  };
}

// 冒泡排序

function bubbleSort(arr) {
  const array = [...arr]; // 新建一个数组，这样不会改变原数组
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        const temp = array[i]; // 保存大的值
        array[i] =  array[j]; // 交换值
        array[j] = temp; // 把大值向后移动一位
      }
    }
  }
  return array;
}
const numArr = [5, 4, 0, 2, 1];
console.log('bubbleSort----->', bubbleSort(numArr));
console.log('numArr----->', numArr)
