# 第一步：URL解析
**地址解析**

![](assets/url.png)

**编码**

```js
'http://www.codepan.top/login.html?name=张三&from=http://www.codepan.top/utiljs'
```

url参数比较特殊：
name参数是中文
from参数又是一个url地址

对整个url进行编码：处理空格、中文
encodeURI()/decodeURI()

对传递的参数进行编码：空格、中文、冒号、双斜杠
encodeURIComponent()/decodeURIComponent()

```js
`http://www.codepan.top/login.html?name=${encodeURIComponent('张三')}&from=${encodeURIComponent('http://www.codepan.top/utiljs')}`
```

前后端交互主要使用以上两种编码方式，如下这种编码方式不是所有的后端语言都支持unescape的
escape
unescape



# 第二步：缓存检查

系统学习，可以移步[至这里](http://www.codepan.top/http)

* 缓存位置
  * memory Cache : 内存缓存
  * disk Cache：硬盘缓存

* 缓存类型（服务器端设置，前端浏览器会帮助我们实现，前端不需要写代码）
  * 强缓存
  * 协商缓存

缓存检测机制：
* 先检查是否存在强缓存
  * 有、且未失效，走强缓存
  * 没有或失效，检查是否有协商缓存
    * 有，走协商缓存
    * 没有，正常请求，获取最新资源

打开网页：查找 disk cache 中是否有匹配，如有则使用，如没有则发送网络请求

普通刷新 (F5)：因TAB没关闭，因此memory cache是可用的，会被优先使用，其次才是disk cache

强制刷新 (Ctrl + F5)：浏览器不使用缓存，因此发送的请求头部均带有 Cache-control: no-cache，服务器直接返回 200 和最新内容

**强缓存 Expires/Cache-Control**

浏览器对于强缓存的处理：根据第一次请求资源时返回的响应头来确定的

* Expires：缓存过期时间，用来指定资源到期的时间（HTTP/1.0）

* Cache-Control：cache-control: max-age=2592000第一次拿到资源后的2592000秒内（30天），再次发送请求，读取缓存中的信息（HTTP/1.1）

* 两者同时存在的话，Cache-Control优先级高于Expires

![](assets/cache-force.png)

强缓存存在问题：如果服务器资源更新了，但是本地还是有缓存的，这样就拿不到最新内容（这里需要明确：html页面不做强缓存，原因是静态资源都是在html文件中引入的）

解决办法：
* 静态资源名称变更，webpack增加文件hash
  
  index.bg657.js  index.mg543.js
* 静态资源增加时间戳url参数

  ```html
  <script src="index.js?88836442088"></script>
  <script src="index.js?54322309984"></script>
  ```

* 不使用强缓存，使用协商缓存


**协商缓存 Last-Modified/ETag**

协商缓存就是没有强缓存或强制缓存失效后，浏览器携带缓存标识向服务器发起请求（无论本地是否存在缓存，都会先向服务器发起请求），由服务器根据缓存标识决定是否使用缓存的过程
![](assets/cache.png)

**数据缓存**

![](assets/cache-data.png)


# 第三步：DNS解析（域名解析）

递归查询
迭代查询

![](assets/dns-1.png)
![](assets/dns-2.png)

每一次DNS解析时间预计在20~120毫秒
* 减少DNS请求次数
* DNS预获取（DNS Prefetch）

```html
<meta http-equiv="x-dns-prefetch-control" content="on">
<link rel="dns-prefetch" href="//static.360buyimg.com"/>
<link rel="dns-prefetch" href="//misc.360buyimg.com"/>
<link rel="dns-prefetch" href="//img10.360buyimg.com"/>
<link rel="dns-prefetch" href="//d.3.cn"/>
<link rel="dns-prefetch" href="//d.jd.com"/>
```

服务器拆分的优势
* 资源的合理利用
* 抗压能力加强
* 提高HTTP并发、(同一个院可以并发4-7个请求)

![](assets/server.png)

# 第四步：TCP三次握手

* seq序号，用来标识从TCP源端向目的端发送的字节流，发起方发送数据时对此进行标记
* ack确认序号，只有ACK标志位为1时，确认序号字段才有效，ack=seq+1
* 标志位
  * ACK：确认序号有效
  * RST：重置连接
  * SYN：发起一个新连接
  * FIN：释放一个连接
  * ......

![](assets/tcp-3.png)

> 三次握手为什么不用两次，或者四次?
TCP作为一种可靠传输控制协议，其核心思想：既要保证数据可靠传输，又要提高传输的效率！

> 三次握手：确保连接的有效性


# 第五步：数据传输

* HTTP报文
  * 请求报文
  * 响应报文

* 响应状态码

  * 200 OK
  * 202 Accepted ：服务器已接受请求，但尚未处理（异步）
  * 204 No Content：服务器成功处理了请求，但不需要返回任何实体内容
  * 206 Partial Content：服务器已经成功处理了部分 GET 请求（断点续传 Range/If-Range/Content-Range/Content-Type:”multipart/byteranges”/  * Content-Length….）
  * 301 Moved Permanently
  * 302 Move Temporarily
  * 304 Not Modified
  * 305 Use Proxy
  * 400 Bad Request : 请求参数有误
  * 401 Unauthorized：权限（Authorization）
  * 404 Not Found
  * 405 Method Not Allowed
  * 408 Request Timeout
  * 500 Internal Server Error
  * 503 Service Unavailable
  * 505 HTTP Version Not Supported
  * ……

# 第六步：TCP四次挥手
![](assets/tcp-4.png)


为什么连接的时候是三次握手，关闭的时候却是四次握手？

服务器端收到客户端的SYN连接请求报文后，可以直接发送SYN+ACK报文

但关闭连接时，当服务器端收到FIN报文时，很可能并不会立即关闭链接，所以只能先回复一个ACK报文，告诉客户端：”你发的FIN报文我收到了”，只有等到服务器端所有的报文都发送完了，我才能发送FIN报文，因此不能一起发送，故需要四步握手。

> 四次挥手：为了及时给与反馈

C-S 我给你发送数据，你收到了吗，我要关闭连接了

S-C 我收到你发送的数据啦，但是数据我还正在准备，你得等一会

S-C 我数据准备好了，我给你发送过去

C-S 我收到你发送的数据了，咱俩关闭连接

Connection: keep-alive

# 第七步：页面渲染

性能优化汇总
/*
 *     1.利用缓存
 *       + 对于静态资源文件实现强缓存和协商缓存（扩展：文件有更新，如何保证及时刷新？）  
 *       + 对于不经常更新的接口数据采用本地存储做数据缓存（扩展：cookie / localStorage / vuex|redux 区别？）
 *     2.DNS优化
 *       + 分服务器部署，增加HTTP并发性（导致DNS解析变慢）
 *       + DNS Prefetch
 *     3.TCP的三次握手和四次挥手
 *       + Connection:keep-alive
 *     4.数据传输
 *       + 减少数据传输的大小
 *         + 内容或者数据压缩（webpack等）
 *         + 服务器端一定要开启GZIP压缩（一般能压缩60%左右）
 *         + 大批量数据分批次请求（例如：下拉刷新或者分页，保证首次加载请求数据少）
 *       + 减少HTTP请求的次数
 *         + 资源文件合并处理
 *         + 字体图标
 *         + 雪碧图 CSS-Sprit
 *         + 图片的BASE64
 *       + ......
 *     5.CDN服务器“地域分布式”
 *     6.采用HTTP2.0
 * ==============
 * 网络优化是前端性能优化的中的重点内容，因为大部分的消耗都发生在网络层，尤其是第一次页面加载，如何减少等待时间很重要“减少白屏的效果和时间”
 *     + LOADDING 人性化体验
 *     + 骨架屏：客户端骨屏 + 服务器骨架屏
 *     + 图片延迟加载
 *     + ....
 */
HTTP1.0 VS HTTP1.1 VS HTTP2.0
Alt text

HTTP1.0和HTTP1.1的一些区别

缓存处理，HTTP1.0中主要使用 Last-Modified，Expires 来做为缓存判断的标准，HTTP1.1则引入了更多的缓存控制策略：ETag，Cache-Control…

带宽优化及网络连接的使用，HTTP1.1支持断点续传，即返回码是206（Partial Content）

错误通知的管理，在HTTP1.1中新增了24个错误状态响应码，如409（Conflict）表示请求的资源与资源的当前状态发生冲突；410（Gone）表示服务器上的某个资源被永久性的删除…

Host头处理，在HTTP1.0中认为每台服务器都绑定一个唯一的IP地址，因此，请求消息中的URL并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机（Multi-homed Web Servers），并且它们共享一个IP地址。HTTP1.1的请求消息和响应消息都应支持Host头域，且请求消息中如果没有Host头域会报告一个错误（400 Bad Request）

长连接，HTTP1.1中默认开启Connection： keep-alive，一定程度上弥补了HTTP1.0每次请求都要创建连接的缺点

HTTP2.0和HTTP1.X相比的新特性

新的二进制格式（Binary Format），HTTP1.x的解析是基于文本，基于文本协议的格式解析存在天然缺陷，文本的表现形式有多样性，要做到健壮性考虑的场景必然很多，二进制则不同，只认0和1的组合，基于这种考虑HTTP2.0的协议解析决定采用二进制格式，实现方便且健壮

header压缩，HTTP1.x的header带有大量信息，而且每次都要重复发送，HTTP2.0使用encoder来减少需要传输的header大小，通讯双方各自cache一份header fields表，既避免了重复header的传输，又减小了需要传输的大小

服务端推送（server push），例如我的网页有一个sytle.css的请求，在客户端收到sytle.css数据的同时，服务端会将sytle.js的文件推送给客户端，当客户端再次尝试获取sytle.js时就可以直接从缓存中获取到，不用再发请求了

// 通过在应用生成HTTP响应头信息中设置Link命令
Link: </styles.css>; rel=preload; as=style, </example.png>; rel=preload; as=image

多路复用（MultiPlexing）

- HTTP/1.0  每次请求响应，建立一个TCP连接，用完关闭
- HTTP/1.1 「长连接」 若干个请求排队串行化单线程处理，后面的请求等待前面请求的返回才能获得执行机会，一旦有某请求超时等，后续请求只能被阻塞，毫无办法，也就是人们常说的线头阻塞；
- HTTP/2.0 「多路复用」多个请求可同时在一个连接上并行执行，某个请求任务耗时严重，不会影响到其它连接的正常执行；


# DNS解析(域名解析)
域名---->外网IP

DNS也是有缓存的，如果之前解析过，可能会在本地有缓存（不一定，因为本地缓存消失了）

* 递归查询（本地解析）
* 迭代查询（远程解析）







