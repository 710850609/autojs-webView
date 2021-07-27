/** jsBridge交互处理逻辑实现 */
module.exports = {
    handle: handle,
    // 注册被调用方法，名称命名： cmd
    toast: toastAction
}
/**
 * 命令调度入口
 * @param {命令} cmd 
 * @param {参数} params 
 */
function handle(cmd, params) {
    console.log('bridgeHandler处理 cmd=%s, params=%s', cmd, JSON.stringify(params));
    // 调度方法命名
    let fun = this[cmd];
    if (!fun) {
        throw new Error("cmd= " + cmd + " 没有定义实现");
    }
    let ret = fun(params)
    log(ret)
    return fun(params);
}

/**
 * 处理逻辑例子： toast 提示
 */
function toastAction(params) {
    toast(params.msg);
    return {msg: 'toast提示成功'};
}
