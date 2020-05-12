window.Android = function() {
    let invoke = (cmd, params, callback) => {
        try {
            let paramsStr = JSON.stringify(params);
            console.debug(`JavaScript请求调用安卓端: cmd=${cmd}, params=${paramsStr}`);
            window.fetch(`https://jsbridge/${cmd}/${encodeURI(paramsStr)}`, { mode: 'cors', cache: 'no-cache' })
            .then(function(response) {
                return response.json();
            })
            .then((data) => {
                console.debug("JavaScript接收到安卓返回： " + JSON.stringify(data));
                callback(data);
            }) 
            .catch(e => {
                console.error("jsBridge出错了");
                console.trace(e);
            });
        } catch (e) {
            console.trace(e)
        }
    };
    return {invoke: invoke};
}();