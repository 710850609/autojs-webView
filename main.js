"ui";
var color = "#009688";
ui.layout(
<vertical>
    <horizontal h="300px">
        <button text="MarkDown" id="loadMdBtn" style="Widget.AppCompat.Button.Colored" w="auto" />
        <button text="远程网页" id="loadHtmlBtn" style="Widget.AppCompat.Button.Colored" w="auto" />
        <button text="本地网页" id="loadLocalHtmlBtn" style="Widget.AppCompat.Button.Colored" w="auto" />
        <button text="控制台" id="consoleBtn" style="Widget.AppCompat.Button.Colored" w="auto" />
    </horizontal>
    <vertical h="auto" w="*">
        <webview id="webView" layout_below="title" w="auto" h="auto"/>
    </vertical>
</vertical>
);

let webViewExpand = require("expand/core/webViewExpand.js");

ui.loadMdBtn.on("click", ()=>{
    webViewExpand.init(ui.webView, []);
    let mdFile = files.cwd() + "/README.md";
    webViewExpand.showMarkdown(ui.webView, mdFile);
});
ui.loadHtmlBtn.on("click", ()=>{
    webViewExpand.init(ui.webView, ["expand/inject/demo.ts"], true);
    // webViewExpand.init(ui.webView, [], true);
    // ui.webView.loadUrl("https://cn.bing.com/");
    // ui.webView.loadUrl("https://m.baidu.com/");
    ui.webView.loadUrl("https://main.m.taobao.com/");
    // ui.webView.loadUrl("https://github.com/710850609/autojs-webView");
});
ui.consoleBtn.on("click", () => {
    app.startActivity("console");
});
ui.loadLocalHtmlBtn.on('click', () => {
    
    webViewExpand.init(ui.webView, [], false);
    let path = "file:" + files.path("index.html");
    ui.webView.loadUrl(path);
});