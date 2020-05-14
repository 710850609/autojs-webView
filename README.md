# autojs-webView
autojs的webView实现，支持初始化脚本注入、jsBridge两端互调

## 一、功能介绍
-   1 支持启动时注入自定义JavaScript脚本
-   2 webview输出到autojs控制台
-   3 支持渲染markdown文件
-   4 支持jsBridge，H5端调用安卓端autojs方法
-   5 支持inent url打开app页面
-   6 支持vconsole
    * 存在部分页面不兼容vsconsole，如：https://m.baidu.com/  https://github.com/

## 二、项目结构说明
```javascript
autojs-webView
├── LICENSE
├── README.md
├── expand -------------------------------------->  webView扩展功能目录
│   ├── core ------------------------------------>  webView扩展核心目录
│   │   ├── jsBridge.ts ------------------------->  
│   │   ├── vConsole.ts ------------------------->  
│   │   ├── vconsole.min.ts --------------------->  
│   │   └── webViewExpand.js -------------------->  webView扩展API
│   ├── handler --------------------------------->  
│   │   ├── bridgeHandler.js -------------------->  autoJs提供给网页调用的方法
│   │   └── webErrorHandler.js ------------------>  
│   └── inject ---------------------------------->  页面注入JavaScript脚本文件
│       └── demo.ts ----------------------------->  页面注入JavaScript脚本例子
├── main.js ------------------------------------->  
└── project.json -------------------------------->  
```    

## 三、webViewExpand.js 方法说明
### 1 init(webViewWidget, jsFileList [, supportVConsole])
> 初始化扩展支持，页面加载完时注入脚本

    - webViewWidget： webView组件
    - jsFileList: 待注入的多个脚本文件路径，数组格式
    - supportVConsole: 是否支持VConsole， 默认false

### 2 showMarkdown(markdownFilePath)
> webView渲染MarkDown文件，基于 [markedjs](https://github.com/markedjs/marked) 实现

    - markdownFilePath： markdown文件绝对路径

### 3 callJavaScript(webViewWidget, script [, callback])
> autoJs在网页执行JavaScript代码

    - webViewWidget： webView组件
    - script: JavaScript脚本
    - callback: 执行完回调函数


## 三、网页调用autoJs方法说明
### 1 定义autoJs方法的方法名、入参数据结构、返回值的数据结构
> 扩展对出入参的数据格式都规定为JSON，这里只需要定义JSON的数据结构即可

### 2 提供autoJs被调用的方法实现
> 在 [bridgeHandler.js](expand/handler/bridgeHandler.js) 中定义，并注册到 module.exports 中
例如
```javascript
/**
 * 处理逻辑例子： toast 提示
 */
function toastAction(params) {
    toast(params.msg);
    return {msg: 'toast提示成功'};
}
module.exports = {
    handle: handle,
    // 注册被调用方法
    toast: toastAction
}
```
### 3 执行```webViewExpand.init```方法，开启webView扩展
```javascript
webViewExpand.init(ui.webView, ["expand/inject/demo.ts"], true);
```

### 4 在网页中调用autoJs方法
```javascript
"ui";
ui.layout(
    <vertical>
        <webview id="webView" layout_below="title" w="auto" h="auto" />
    </vertical>
);

// 在页面中调用autoJs方法
let js = "try{window.Android.invoke('toast', " + 
"{msg: '测试jsBridge1'}, " +
"(data) => {" +
"    console.log('接收到callback1:' + JSON.stringify(data));" +
"}" +
");}catch(e){console.trace(e)}";
let webViewExpand = require("expand/core/webViewExpand.js");

// 开启webView扩展
webViewExpand.init(ui.webView, [], true);
// 加载页面 */
ui.webView.loadUrl("https://cn.bing.com/");
// 等待页面加载完，或是在init方法中注入JavaScript脚本文件触发执行
setTimeout(() => {
    webViewExpand.callJavaScript(ui.webView, js);
}, 2000);
````