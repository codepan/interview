# 编写parse函数，实现访问对象里属性的值
```js
let obj = { a: 1, b: { c: 2 }, d: [1, 2, 3], e: [{ f: [4, 5, 6] }] };
let r1 = parse(obj, 'a') // 1
let r2 = parse(obj, 'b.c') // 2
let r3 = parse(obj, 'd[2]') // 3
let r4 = parse(obj, 'e[0].f[0]') // 4
console.log(r1, r2, r3, r4)
```
```js
// 方法1
function parse (obj, str) {
  return new Function('obj', `return obj.${str}`)(obj)
}
// 方法2
function parse (obj, str) {
  str = str.replace(/\[(\d+)\]/g, '.$1')
  const attrs = str.split('.')
  attrs.forEach(attr => {
    obj = obj[attr]
  })
  return obj
}
```