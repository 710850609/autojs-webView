/**
 * 注入脚本
 * 时间： 页面加载完后
 * 注意： 
 *      注入脚本的文件，不能是js后缀文件，autojs打包时会进行加密，导致不能用。
 * 使用： 
 *      window.Android.invoke([安卓端方法], [方法入参，json格式], [回调函数，返回值格式是json对象])
 *      具体参数的数据结构，由接口开发自行定义
 */

window.Android.invoke('toast', 
    {msg: '测试jsBridge1'}, 
    (data) => {
        console.log('接收到callback1:' + JSON.stringify(data));
    }
);

window.Android.invoke('toast', 
    {msg: '测试jsBridge2'}, 
    (data) => {
        console.log('接收到callback2:' + JSON.stringify(data));
    }
);