# cookie
互联网在当初设计出来的时候，自带的一个问题。

浏览器和服务器的**识别问题**，服务器不认识这是同一个用户。

http是无连接的，无状态的，请求完毕之后，链接就断掉了，没有长久的数据通路。

cookie就是第一次请求服务器时，服务器在下行http响应报文头中，添加一个 set-cookie 属性，要求浏览器设置cookie。以后浏览器访问同一个请求时，就都会在上行请求报文头中，携带cookie上去，方便服务器对自己进行识别。

cookie是英语“曲奇”、“小点心”的意思，没有什么特殊的含义，cookie一定是字符串。

**用cookie做登录**

如果使用cookie来记录登录的用户，它由于太过于简单，所以会带来一个很大的问题：cookie是可以被篡改的

例如下面的一个例子：
```js
// 用户登录成功之后我们调用setCookie方法来设置一个cookie
setCookie('username', 'codepan')
```

```js
// 在任何一个地方我们来判断当前登录的用户
const username = getCookie('username')
if (username) {
  console.log(`欢迎您，亲爱的会员：${username}`)
} else {
  console.log('您还没有登录，请登录')
}
```

现在我们简单的使用cookie中存放的username来判断当前登录的用户，cookie是可以被篡改的，如果我此时将cookie修改为`username=jetty`，那么我就是一个伪装的jetty用户

用cookie做登录，是非常不安全的，因为cookie都是明文传输的，黑客想怎么修改就能怎么修改

做登录要用session技术，但是，我们必须介绍cookie的一个技能，就是充当本地存储

**用cookie做本地存储**

旅游网站：能够记录下用户访问的城市名字

当然了，现在我们知道有localStorage、sessionStorage可以做这件事情，但是以前没有这些技术的时候，我们必须想到cookie的作用
```js
$http.post('getCityInfo', {city: '北京'}).then(response => {})
```

```js
function getCityInfo(data) {
  const { city } = data

  const cityHistory = getCookie('cityHistory')
  if (cityHistory) {
    setCookie('cityHistory', cityHistory + ',' + city)
  } else {
    setCookie('cityHistory', city)
  }
}
```
```js
const cityHistory = getCookie('cityHistory')
console.log(`猜你喜欢，你的历史访问足迹：${cityHistory}`)
```

cookie充当本地存储到底有什么问题呢？
问题就是：非常的匪夷所思，本来是前端要存储数据，结果需要不断的通过http请求、响应，在浏览器和服务器之间来回穿梭、传递，不断地 Set-Cookie、Cookie，效率比较低，并且服务器也要参与其中。
# session
session就是密文的cookie，也就是说：session不是新技术，本质上就是cookie，只不过不是傻傻的明文传输了，而是随机乱码。

```js
setSession('username', 'codepan')
setSession('age', 23)
```

响应头中的 Set-Cookie会存放一个形如：`Set-Cookie: SESSIONID=3ff33t32788fgdfdf`。这堆`3ff33t32788fgdfdf`乱码中就保存着咱们设置的username和age信息，服务器会记录下来这个乱码。之后请求头中 Cookie 就会携带这串乱码，发送到服务器`Cookie: SESSIONID=3ff33t32788fgdfdf`。

服务器中只需要从session中获取username和age就行，无需关心这串乱码
```js
const username = getSession('usernam')
const age = getSession('age')
```

但是这样做其实依然是不安全的，因为这串乱码，黑客也可以拿到，拿到用户的session之后就可以伪装成该用户，同时它自身本就依赖cookie

浏览器和服务器之间的唯一的识别因素，就是这串乱码

服务器确实耗费了一定的内存，存储每个用户的映射信息

SESSIONID|username|age
---|---|---
3ff33t32788fgdfdf|codepan|23
hh7gfgbfg6sffdg5f|jetty|30

# token

通过浏览器的个人身份用户名、浏览器版本、操作系统版本、IP地址，一起计算出一个加密字符串，这个加密字符串的算法，是只有服务器知道的。

token必须依赖一个算法：md5、SHA256

这两个加密算法是不可逆算法

任何明文数据加密之后，都可以得到等长的一个32位的字符串

比如我们现在可以将操作系统版本、浏览器版本、IP地址、用户名、手机号等等这些信息放在一起加密得出一个32位长的字符串

服务器掌握信息的算法，而浏览器掌握信息本身

token是一个加密的字符串，里面有个人的身份信息、设备信息等。

只有服务器掌握加密算法，他人难以攻克。


当客户端请求登录接口时，服务端会根据算法得出token，然后将token响应给客户端，客户端拿到token之后可以利用本地存储，将token存储起来，再之后客户端请求接口的时候，需要携带上服务端通过登录接口返回给客户端的那个token，然后服务器根据加密算法，再次计算得出token，将两个token进行比对，如果比对成功，则表明token有效，反之无效。

注意：token是不能知道当前登录的用户是谁的，它只能验证当前这个人是否是合法登录的用户

token比session差在哪里：token是不能判断用户是谁的，只能知道用户是不是合法登录过。



