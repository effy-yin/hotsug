# hotsug
百度首页热搜风云榜-阅读状态改变及cookie保存插件

##Demo
*[Demo](http://htmlpreview.github.io/?https://github.com/dodoroy/hotsug/blob/master/demo.html)*

![screen](https://raw.github.com/dodoroy/hotsug/master/demo/demo1.png)

![screen](https://raw.github.com/dodoroy/hotsug/master/demo/demo2.png)
## Usage
1.Include jQuery, js-cookie.js and hotsug.js.
```javascript
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="js.cookie.js"></script>
<script type="text/javascript" src="hotsug.js"></script>
```
2.Create html to hold the content.
```html
<ul class="item-list">
  <li data-num="0">...</li>
  <li data-num="1">...</li>
  <li data-num="2">...</li>
  <li data-num="3">...</li>
  <li data-num="4">...</li>
  <li data-num="5">...</li>
  <li data-num="6">...</li>
</ul>
```
3.Create HotSug instance.
```javascript
var hot = new HotSug('#item-list', {options..});
```
or
```javascript
$('.item-list').hotsug({options..});
```
## Options
```javascript
{
  cookieName: 'item-list',  # 保存 cookie 的名称
  dataName: 'num',          # data-num or data-someelse
  hoverElem: 'div',         # 鼠标 hover 的元素
  highlightElem: 'a',       # 设置高亮的元素
  changeTime: '2000',       # 鼠标 hover 多久改变状态
  expires: 7,               # cookie 在浏览器中保存的时间（天）
  maxCount: 10              # 以 cookiName 为名的该条 cookie 最大条数
}
```
## Credit
Created by [@dodo糯](http://weibo.com/dodoroy), *[blog](http://effy.me)*

Feel free to use, share and fork.

Enjoy!
