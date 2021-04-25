#### 介绍下重绘和回流（Repaint & Reflow），以及如何进行优化

#### 介绍下 BFC 及其应用，以及IFC、GFC 和 FFC
请移步至[BFC](http://www.codepan.cc/css/BFC.html)
#### link 与 @import 的区别

####  列举一些不可被继承的样式？

#### 隐藏一个元素有哪些方法？分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景。

隐藏一个元素的方法：
* `display:none` `visibility:hidden` `opacity:0`
* 设置 fixed 并设置足够大负距离的 left top 使其“隐藏”；
* 用层叠关系 z-index 把元素叠在最底下使其“隐藏”；
* 用text-indent:-9999px 使其文字隐藏。
* margin设置负值使其隐藏


* display: none (不占空间，不能点击)（场景，显示出原来这里不存在的结构）
* visibility: hidden（占据空间，不能点击）（场景：显示不会导致页面结构发生变动，不会撑开）
* opacity: 0（占据空间，可以点击）（场景：可以跟transition搭配）

* 如果祖先元素遭遇某祸害，则其子孙孙无一例外也要遭殃，比如：
opacity:0和display:none，若父节点元素应用了opacity:0和display:none，无论其子孙元素如何挣扎都不会再出现在大众视野；
* 而若父节点元素应用visibility:hidden，子孙元素应用visibility:visible，那么其就会毫无意外的显现出来。

* display: none 会回流操作 性能开销较大，
* visibility: hidden 是重回操作 比回流操作性能高一些，（回流会计算相邻元素甚至组先级元素的位置，属性等）
* opacity: 0 重建图层，性能较高

结构：
display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击，
visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击
opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

继承：
display: none和opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。
visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。

性能：
displaynone : 修改元素会造成文档回流,读屏器不会读取display: none元素内容，性能消耗较大
visibility:hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取visibility: hidden元素内容
opacity: 0 ： 修改元素会造成重绘，性能消耗较少

联系：它们都能让元素不可见

#### 如何实现水平垂直居中？
基于定位实现
```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  /*
  如果child定宽定高，可以使用此方法
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  */

  /*
  如果child定宽定高，也可以使用此方法，如果没有指定宽高，下面方法是绝对不可取的
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  */

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); // 如果child宽高未知，上述方法无法使用
}
```
基于flex实现
```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```
基于table-cell实现，这个方式父盒子需要定宽高，宽高不能是百分比
```css
.parent {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: 500px;
  height: 500px;
}
.child {
  display: inline-block;
}
```
基于js实现
```js
getBoundingClientRect()
```

#### 如何解决移动端 Retina 屏 1px 像素问题

#### 如何用 css 或 js 实现多行文本溢出省略效果，考虑兼容性

#### 如何处理margin外边距塌陷的问题

#### 伪类和伪元素有什么区别?

#### 已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改。
```html
<img src="1.jpg" style="width:480px!important;”>
```
方法1、2、3
```html
<img src="1.jpg" style="width:480px!important; max-width: 300px">
<img src="1.jpg" style="width:480px!important; transform: scale(0.625, 1);" >
<img src="1.jpg" style="width:480px!important; width:300px!important;">
```
方法4 利用CSS动画的样式优先级高于!important的特性
```css
img {
  animation: test 0s forwards;
}
@keyframes test {
  from {
    width: 300px;
  }
  to {
    width: 300px;
  }
}
```
#### 响应式布局的实现方案
* 媒体查询
* rem
* flex
* vn/vh

 * 视口 viewport
    * 媒体查询 @media query
    * 移动端事件 touch事件 300ms是什么？


# 移动端常见两种布局：
* 流式布局
  宽度自适应，高度写死成px的一种布局模式，例如拉勾网
* rem布局
  使用rem做单位，宽度和高度根据屏幕的大小自动调整的一种布局模式，例如淘宝网

# rem
rem单位的尺寸大小是根据根元素html元素标签的font-size来计算的

举个例子，假如`<html style="font-size: 10px">`，有一个元素的`width:1rem`，那么这个元素的实际宽度就是`1 * 10 = 10px`。

要注意的是：好多浏览器或者说webview默认html的font-size为16px

# 如何让rem发挥威力
* 如何动态的去设置根元素font-size？不同设备下，值要不同
  * @media 媒体查询 (**这种方式及其不推荐，一来很麻烦，二来不可能枚举出所有屏幕宽度**)
    ```css
    @media (max-width: 640px) {
      html { font-size: 50px}
    }
    @media (max-width: 400px) {
      html {font-size: 40px}
    }
    ```
  * js动态计算（编写js代码，来动态计算html的font-size）
    ```js
    (function () {
      const ratio = 10
      const $html = document.documentElement
      const computedRootFontSize = clientWidth => {
        $html.style.fontSize = (clientWidth / 10) + 'px'
      }
      window.addEventListener('resize', () => {
        let clientWidth = $html.clientWidth
        computedRootFontSize(clientWidth)
      })
    })()
    ```
  * css动态设置font-size
  
    CSS有两个新的尺寸单位，分别为`vw`（view width）和`vh`（view height）
    vw这个单位把页面的宽度分成了100份，所以`width: 50vw`的元素的宽度呈现在页面上就占页面宽度的一半
* 如何通过px去换算出rem？
#### CSS实现动画的方式
 * 变形 transform
      * 2D变形 rotate skew scale
      * 3D变形 rotateX rotateY translate3D
      * 景深 perspective
      * 变形原点 transform-origin
      * 背景不可见 backface-visibility