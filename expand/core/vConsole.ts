(() => {
    if (document.getElementById('mxvConsole2')) {} else {
        var version = '3.3.4';
        function getCache(type) {
            try {
                const local = JSON.parse(window.localStorage[type]);
                return local.data ? local : null;
            } catch (e) {
                return null;
            }
        }
        function setCache(type, data) {
            if (!data) {
                return;
            }
            window.localStorage[type] = JSON.stringify({
                version,
                data
            });
        }
        async function getVconsole() {
            const cache = getCache('vconsole');
            if (cache && cache.version == version) {
                return cache.data;
            }
            return window.fetch('https://cdn.bootcss.com/vConsole/' + version + '/vconsole.min.js')
                .then(res => res.text())
                .then(data => {
                    setCache('vconsole', data);
                    return data;
                }).catch(e => {
                    console.log("console 失败了")
                    console.error(JSON.stringify(e));
                });
        }
        async function buildVconsole() {
            const data = await getVconsole();
            writeJs(data);
            // const vConsole = new VConsole();
        }

        function writeJs(text) {
            var link = document.createElement('script');
            link.innerHTML = text + "";
            // console.log(document.getElementsByTagName("head")[0].innerHTML);
            document.getElementsByTagName('head').item(0).appendChild(link);
        }

        function init() {
            try {
                // getVconsole();
                buildVconsole();
            } catch (e) {
                console.error(JSON.stringify(e));
            }
        }
        init();
    }
    var pans = document.createElement('b');
    pans.id = 'mxvConsole2';
    document.body.appendChild(pans);
})();