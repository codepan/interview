#### 要求设计 LazyMan 类，实现以下功能。
```js
LazyMan('Tony');
// Hi I am Tony

LazyMan('Tony').sleep(10).eat('lunch');
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan('Tony').eat('lunch').sleep(10).eat('dinner');
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan('Tony').eat('lunch').eat('dinner').sleepFirst(5).sleep(10).eat('junk food');
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
```


### 如何把一个字符串的大小写取反（大写变小写小写变大写），例如 'AbC' 变成 'aBc' 。

### 编程题，请写一个函数，完成以下功能
输入 '1, 2, 3, 5, 7, 8, 10' 输出 '1~3, 5, 7~8, 10'

### 写个程序把 entry 转换成如下对象
```js
var entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      xx: 'adxx'
    },
    e: 'ae'
  }
}

// 要求转换成如下对象
var output = {
'a.b.c.dd': 'abcdd',
'a.d.xx': 'adxx',
'a.e': 'ae'
}
```

### 找出字符串中连续出现最多的字符和个数（蘑菇街）
```js
'abcaakjbb' => {'a':2,'b':2}
'abbkejsbcccwqaa' => {'c':3}
```
#### 数组的相关算法






#### 函数柯里（curry）化
```js
function fun (a, b, c, d) {
  return a + b + c + d
}
```
函数现在需要提供4个参数，它就能够工作
```js
fun(3, 4, 5, 6) // 18
```

如果现在少传一个实参，它就出问题了，返回NaN
```js
fun(3, 4, 5) // NaN（3 + 4 + 5 + undefined）
```


为了解决这个问题，对函数进行柯里化，就可以解决

如果少传一个实参，则就会返回一个函数，这个函数有原来函数的功能，但是虚位以待，等待你随时传入参数
```js
const fn = fun(3, 4, 5)
fn(6) // 18
```

现在我们可以写一个函数，这个函数的作用是：可以让函数柯里化

```js
function currying (fn) {
  return function () {
    // 备份实参
    let args = arguments
    return function () {
      return fn(...args, ...arguments)
    }
  }
}

function fun (a, b, c, d) {
  return a + b + c + d
}

fun = currying(fun)

const fn = fun(1, 2)

console.log(fn(3, 4)) // 10
```

#### 写一个函数，检查字符串中连续出现的最长子串是什么？

#### 编写函数，计算两个大整数的和？
```js
const a = '900744621923145867315'
const b = '245245880231258892237342'

function add (a, b) {
  // 位数对齐，位数不够的前面补0
  const maxLength = Math.max(a.length, b.length)
  a = a.padStart(maxLength, 0)
  b = b.padStart(maxLength, 0)

  let t = 0 // 当前位之和
  let f = 0 // 进位，0或者1两种取值
  let sum = ''
  for (let i = maxLength - 1; i >= 0; i--) {
    t = Number.parseInt(a[i]) + Number.parseInt(b[i]) + f
    f = Math.floor(t / 10)
    sum = (t % 10) + sum
  }
  
  if (f === 1) {
    sum = '1' + sum
  }

  return sum
}

console.log(add(a, b)) // '246146624853182038104657'
```
#### 深浅克隆
```js
const isObject = obj => typeof obj === 'object' && obj != null
const deepClone = (obj, hash = new WeakMap()) => {
  if (!isObject(obj)) return obj

  if (hash.has(obj)) {
    return hash.get(obj)
  }
  const types = [Date, RegExp, Set, WeakSet, Map, WeakMap]

  if (types.includes(obj.constructor)) {
    return new obj.constructor(obj)
  }

  const allDesc = Object.getOwnPropertyDescriptors(obj)
  const cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
  hash.set(obj, cloneObj)
  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key], hash) : obj[key]
  }

  return cloneObj
}

// 测试
let obj = {
  bigInt: BigInt(12312),
  set: new Set([2]),
  map: new Map([
    ["a", 22],
    ["b", 33]
  ]),
  num: 0,
  str: "",
  boolean: true,
  unf: undefined,
  nul: null,
  obj: {
    name: "我是一个对象",
    id: 1
  },
  arr: [0, 1, 2],
  func: function () {
    console.log("我是一个函数")
  },
  date: new Date(0),
  reg: new RegExp("/我是一个正则/ig"),
  [Symbol("1")]: 1
}

Object.defineProperty(obj, "inenumerable", {
  enumerable: false,
  value: [1, [2]]
})

obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj))
obj.loop = obj

let cloneObj = deepClone(obj)

console.log("obj", obj)
console.log("cloneObj", cloneObj)

for (let key of Reflect.ownKeys(cloneObj)) {
  if (isObject(cloneObj[key])) {
    // 注意：inenumerable 属性 writable 为 false, 为浅拷贝，输出 true
    console.log(`${key}相同吗？ `, cloneObj[key] === obj[key])
  }
}

// set相同吗？  false
// map相同吗？  false
// obj相同吗？  false
// arr相同吗？  false
// date相同吗？  false
// reg相同吗？  false
// innumerable相同吗？  true
// loop相同吗？  false
```

#### 在js对象上定义一个repeatify函数，这个函数接受一个整数参数，来明确子字符串需要重复几次，这个函数要求字符串重复指定的次数，比如：'abc'.repeatify(3) // 'abcabcabc'
```js
```
#### 一个url后面好多key-value。如localhost?key=val&key2=val2&key3=&key4&，封装一个函数getParam('key')，通过key获得相应等号后面的值
```js
```
#### 获取字符串中不重复的最大子串的长度
```js
function getLengthOfMaxSubstrAndNorepeat (str) {
  if (!str) return 0

  let findedChars = []
  let lengthTotals = [] // 统计每一次循环找到的最大不重复子串的长度
  const findMaxInArray = arr => Math.max.apply(null, arr)

  function next (startIndex) {
    if (startIndex === str.length - 1) {
      return
    }
    for (let i = startIndex; i < str.length; i++) {
      const currentChar = str[i]
      if (!findedChars.includes(currentChar)) {
        findedChars.push(currentChar)
      } else {
        lengthTotals.push(findedChars.length)
        findedChars = []
        const maxLength = findMaxInArray(lengthTotals)
        if (maxLength === str.length - 1) {
          return
        }
        return next(++startIndex)
      }
    }

    if (findedChars.length === str.length - startIndex) {
      lengthTotals.push(str.length - startIndex)
      return
    }
  }
  next(0)

  return findMaxInArray(lengthTotals)
}


const str = 'ab'
console.log(getLengthOfMaxSubstrAndNorepeat(str))
```

