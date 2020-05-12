/** jsBridge交互处理逻辑实现 */

/**
 * 处理逻辑例子
 */
function toastAction(params) {
    toast(params.msg);
    return {msg: 'toast提示成功'};
}


/**
 * 命令调度入口
 * @param {命令} cmd 
 * @param {参数} params 
 */
function handle(cmd, params) {
    console.log('处理 cmd = %s, params = %s', cmd, JSON.stringify(params));
    // 调度方法命名
    let fun = this[cmd];
    if (!fun) {
        throw new Error("cmd= " + cmd + " 没有定义实现");
    }
    return fun(params);
}
module.exports = {
    handle: handle,
    // 注册被调用方法，名称命名： cmd
    toast: toastAction
}