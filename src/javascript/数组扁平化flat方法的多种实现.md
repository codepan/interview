# 数组扁平化flat方法的多种实现？
```js
let arr = [
  [1],
  [2, 3],
  [4, 5, 6, [7, 8, [9, 10, [11]]]],
  12
]
```
```js
// 方法1：ES6中 Array.prototype.flat()
console.log(arr.flat(Infinity))

// 方法2：toString
function flat (arr) {
  return arr.toString().split(',').map(item => +item)
}
console.log(flat(arr))

// 方法3：stringify
function flat (arr) {
  let str = JSON.stringify(arr)
  str = str.replace(/[\[\]]/g, '')
  return str.split(',').map(item => +item)
}
console.log(flat(arr))

// 方法4：concat
function flat (arr) {
  while(arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
console.log(flat(arr))

// 方法5：递归
function flat (arr) {
  let result = []
  function _loop (arr) {
    arr.forEach(item => {
      if (Array.isArray(item)) {
        _loop(item)
      } else {
        result.push(item)
      }
    })
  }
  _loop(arr)
  return result
}
```