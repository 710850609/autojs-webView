function defineReactive(data, key, val) {
    observe(val); // 递归遍历所有子属性
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            return val;
        },
        set: function(newVal) {
            val = newVal;
            console.log('属性' + key + '已经被监听了，现在值为：“' + newVal.toString() + '”');
            
            events.broadcast.emit("data_change_event", newVal.toString());
        }
    });
}
 
function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    });
};
 
events.broadcast.on("data_change_event", function(name){
    console.log("数据已经变更:" + name);
});
//保持脚本运行
setInterval(()=>{}, 5000);
function notifyDataChange(data) {
}


var data = {
    book1: {
        name: ''
    },
    book2: '',
    book3: [
        "1", '2', '5'
    ]
};

observe(data);
// data.book1.name = 'vue权威指南'; // 属性name已经被监听了，现在值为：“vue权威指南”
// data.book2 = '没有此书籍';  // 属性book2已经被监听了，现在值为：“没有此书籍”
// data.book3[1] = 'a'
log(JSON.stringify(data))
data.a = 'a'
observe(data)
data.a = '1'