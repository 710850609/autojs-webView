window.Android = function() {
    let getJsBridgeFrame = () => {
        let bridgeFrame = document.getElementById("jsBridgeFrame");
        /** 判断是否存在，即使页面被删除了改frame，也可以动态增加 */
        if (!bridgeFrame) {
            bridgeFrame = document.createElement('iframe');
            bridgeFrame.style = "display: none";
            document.body.append(bridgeFrame);
        }
        return bridgeFrame;
    };
    /** H5回调者维护 */
    const h5Callbackers = {};
    let h5CallbackIndex = 1;
    /** 注册回调函数 */
    let setCallback = (callback) => {
        let callId = h5CallbackIndex++;
        h5Callbackers[callId] = {"callback": callback};
        return callId;
    };
    /** 获取回调函数, 只能获取一次 */
    let getCallback = (callId) => {
        let callback = h5Callbackers[callId];
        if (callback) {
            delete h5Callbackers[callId];
        }
        return callback;
    };

    let invoke = (cmd, params, callback) => {
        let callId = null;
        try {
            let paramsStr = JSON.stringify(params);
            console.debug(`JavaScript请求调用安卓端: cmd=${cmd}, params=${paramsStr}`);
            let jsBridgeFrame = getJsBridgeFrame();
            callId = setCallback(callback);
            jsBridgeFrame.src = `jsbridge://${cmd}/${callId}/${encodeURI(paramsStr)}`;
        } catch (e) {
            if (callId) {
                getCallback(callId);
            }
            console.trace(e);
        }
    };
    let callback = (data) => {
        /** data 格式为 {callId: Number, params: JSON} */
        let callId = data.callId;
        let params = data.params;            
        let callbackFun = getCallback(callId);
        console.debug(`安卓端回调JavaScript: callId=${callId}, params=${JSON.stringify(params)}, callback=${callbackFun}`);
        if (callbackFun) {
            callbackFun.callback(params);
        }
    };
    return {invoke: invoke, callback: callback};
}();