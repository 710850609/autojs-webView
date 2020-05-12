"ui";
var color = "#009688";
ui.layout(
<vertical>
    <horizontal h="300px">
        <button text="加载本地MarkDown文件" id="loadMdBtn" style="Widget.AppCompat.Button.Colored" w="auto" />
        <button text="加载网页" id="loadHtmlBtn" style="Widget.AppCompat.Button.Colored" w="auto" />
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
    // ui.webView.loadUrl("https://cn.bing.com/");
    // ui.webView.loadUrl("https://m.baidu.com/");
    ui.webView.loadUrl("https://main.m.taobao.com/");
});
ui.consoleBtn.on("click", () => {
    app.startActivity("console");
});