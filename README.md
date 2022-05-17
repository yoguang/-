# 前端常见面试题汇总

## 编程题

### 函数柯里化

```js
function curry(fn) {
  const args = [].slice.call(arguments, 1); // 取出多余参数，作为被柯里化函数的参数
  return function () {
    const _args = [...args, ...arguments]; // 合并参数
    if (_args.length < fn.length) {
      // 实参数量小于fn形参数量，执行递归
      return curry(fn, ..._args);
    } else {
      // 实参数量满足条件，执行函数返回结果
      return fn.apply(null, _args);
    }
  };
}
```

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

### 手动实现 new

```js
function myNew(fn) {
  const obj = Object.crete(fn.prototype);
  const result = fn.apply(obj, [...arguments.slice(1)]);
  return typeof result === 'object' ? result ？ obj;
}
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
    const context = this;
    const args = Array.prototype.slice.call(arguments);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}
```

### 节流函数 lodash.throttle

> 规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。

```js
// 后执行
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
// 先执行
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
// 先执行
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
```

### 排序

```js
// 冒泡排序
function bubbleSort(arr) {
  const array = [...arr]; // 新建一个数组，这样不会改变原数组
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] > array[j]) {
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    }
  }
  return array;
}
```

### 扁平数据结构转 Tree

```js
// 来源：https://juejin.cn/post/6983904373508145189#heading-8
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
      // 添加根节点
      result.push(treeItem);
    } else {
      // 判断当前元素是否存在父级节点，不存在创建父级
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        };
      }
      // 将当前元素添加到父节点中
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
}

arrayToTree(arr);
/**
 [{
    id: 1,
    name: "部门1",
    pid: 0,
    children: [
      {
        id: 2,
        name: "部门2",
        pid: 1,
        children: [],
      },
      {
        id: 3,
        name: "部门3",
        pid: 1,
        children: [
          // 结果 ,,,
        ],
      },
    ],
  }];
*/
```

## 概念原理题

### 原型

> 原型：本质上就是一个对象，每一个构造函数都有一个 Func.prototype 属性指向原型对象；原型对象上都会有一个 Func.prototype.constructor 指向 Func 这个构造函数本身

### 原型链

> 当我们在回答原型链时，是不是这么说：“访问一个实例化对象上的某个属性比如 name，先是在实例化对象本身上寻找，如果实例化对象自身上不存在该属性，就往它的构造函数的原型对象上查找，如果还没有就再往上一级（父类）构造函数查找，直到 Object.prototype 原型对象如果还未找到就返回 null。” 是不是感觉很啰嗦......
> 现在我们来看看经典原型链示图，是不是看的一脸懵 😳。不要怕我们来一步一步分析一下。
> ①：我们实例化 Foo 构造函数创建了对象 f1
> ②：f1 对象上有一个隐藏的属性`[[Prototype]]`（主流浏览器都在对象上暴露`__proto__`属性)用于访问对象的原型
> ③：f1.`__proto__` 指向 Foo.prototype 原型对象，然后 Foo.prototype.constructor 又指回构造函数 Foo 自身。
> ④：当访问一个 f1 上的某个属性时，在 Foo.prototype 原型上也没找到，那就会继续向上查找 Foo.prototype.`__proto__` 找到顶层对象 Object.prototype 原型上，存在返回对应的值，不存在就返回 null；至此查找结束，整个查找过程就是原型链。
> ⑤：其他链路重复 ①②③④
> 总结：实例化对象访问其属性，现在对象自身查找，不存在就一层层向上查找原型对象属性，直到顶层对象 Object，如果存在该属性就返回，不存在就返回 null。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b4c23c5ab19466eb9b614b5c2cc78ca~tplv-k3u1fbpfcp-watermark.image?)

### 继承

```js
/**
 * 原型链继承
 * 利用对象原型链特性继承， Son.prototype = new Parent() 将子类的原型指向父类的实例对象。
 * 优点：简单实现继承。
 * 缺点：子类继承父类实例化对象，导致子类所有实例化对象都共享原型对象的属性及方法。
 *
 */
function Parent() {
  this.name = "web前端";
  this.type = ["JS", "HTML", "CSS"];
}
Parent.prototype.Say = function () {
  console.log(this.name);
};
function Son() {}
Son.prototype = new Parent();
son1 = new Son();
son1.Say();

/**
 * 构造函数继承
 * 通过构造函数 call、apply 方法实现继承。
 * 优点：子类实例化对象属性及方法独立，可以给实例化对象添加参数。
 * 缺点：每次实例化对象都会创建一遍方法，无法实现函数复用；无法调用父级构造函数原型对象的方法。
 */

function Parent(name) {
  this.name = name;
}
function Son(name) {
  Parent.call(this, name);
}
son1 = new Son("JS");
console.log(son1); //JS
son2 = new Son("HTML");
console.log(son2); //HTML

/**
 * 组合继承
 * 利用原型链继承和构造函数继承进行组合使用
 * 优点：基于原型链继承实现原型对象方法的继承，利用构造函数实现属性继承且可添加参数
 * 缺点：调用两次父级构造函数
 */

function Parent(name) {
  this.name = name;
  this.type = ["JS", "HTML", "CSS"];
}
Parent.prototype.Say = function () {
  console.log(this.name);
};
function Son(name) {
  Parent.call(this, name);
}
Son.prototype = new Parent();
son1 = new Son("张三");
son2 = new Son("李四");
son1.type.push("VUE");
son2.type.push("PHP");
console.log(son1.type); //['JS','HTML','CSS','VUE']
console.log(son2.type); //['JS','HTML','CSS','PHP']
son1.Say(); //张三
son2.Say(); //李四

/**
 * 原型式继承
 * 新建一个函数对象，将参数作为这个对象的原型对象
 * 优缺点：和原型链类似
 */

function fun(obj) {
  function Son() {}
  Son.prototype = obj;
  return new Son();
}
var parent = {
  name: "张三",
};
var son1 = fun(parent);
var son2 = fun(parent);
console.log(son1.name); //张三
console.log(son2.name); //张三

/**
 * 寄生继承
 * 在原型式继承的基础上，在函数内部新增方法（丰富对象）
 * 优缺点：跟构造函数继承类似，调用一次函数就得创建一遍方法，无法实现函数复用，效率较低。
 */

function fun(obj) {
  function Son() {}
  Son.prototype = obj;
  return new Son();
}
function Parasitic(obj) {
  var clone = fun(obj);
  clone.Say = function () {
    console.log("我是新增的方法");
  };
  return clone;
}
var parent = {
  name: "张三",
};
var parent1 = Parasitic(parent);
var parent2 = Parasitic(parent);
console.log(parent2.Say == parent1.Say); // false

/**
 * 寄生组合继承
 * 结合寄生继承和组合继承的各自优点
 * 优缺点：JS 继承的首选方法
 */

function Parasitic(son, parent) {
  var clone = Object.create(parent.prototype); // 以父级构造函数原型创建一个新对象
  son.prototype = clone; // 指定对象，将子级构造函数对象的原型指向新对象
  clone.constructor = son; // 增强对象
}
function Parent(name) {
  this.name = name;
  this.type = ["JS", "HTML", "CSS"];
}
Parent.prototype.Say = function () {
  console.log(this.name);
};

function Son(name) {
  Parent.call(this, name);
}
Parasitic(Son, Parent);
```

## TypeScript

### Pick 实现

```TS
type Pick<T, k extends keyof T> = {
  [P in keyof K]: T[P];
};
```

### Partial 实现

```TS
type Partial<T> = {
  [P in keyof T]?: T[P]
}

```

### Required 实现

```TS
type Required<T> = {
  [P in keyof T]-?: T[P]
}

```

### Readonly 实现

```TS
type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}
```
