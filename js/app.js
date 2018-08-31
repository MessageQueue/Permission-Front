//获取url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
};


//格式化TreeJs
function factoryTreeJsId(id) {
    return "JS_" + id;
}

function getTreeJsId(param) {
    var values = param.split("_");
    return values[values.length - 1];
}