# call 和 apply 的区别是什么，哪个性能更好一些
* call：第一个参数是为函数内部指定this指向，后续的参数则是函数执行时所需要的参数，一个一个传递。
* apply：第一个参数与call相同，为函数内部this指向，而函数的参数，则以数组的形式传递，作为apply第二参数。
* call 的性能更好

```js
/// call源码实现
Function.prototype.call = function (context, ...args) {
  const fn = Symbol('fn')
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}
```
```js
// apply源码实现
Function.prototype.apply = function(context, args) {
  const fn = Symbol('fn')
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}
```
```js
// bind实现
Function.prototype.bind = function (context, ...args) {
  const fn = Symbol('fn')
  context[fn] = this
  return function (...others) {
    const result = context[fn](...args, ...others)
    delete context[fn]
    return result
  }
}
```

```js
function fn1 () {
  console.log(1)
}
function fn2 () {
   console.log(2)
}
fn1.call.call(fn2)
```