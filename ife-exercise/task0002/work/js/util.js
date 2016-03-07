/*    Part2    */

// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return (Object.prototype.toString.call(arr) === '[object Array]');
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return (Object.prototype.toString.call(fn) === '[object Function]');
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    if (typeof src === 'number' || typeof src === 'boolean' || typeof src === 'string') {
        return src.valueOf();
    }
    
    if (isArray(src)) {
        var targetArray = [];
        var thisArray = src.valueOf();
        for (var cur in src) {
            targetArray.push(cloneObject(thisArray[cur]));
        }
        return targetArray;
    }
    
    if (Object.prototype.toString.call(src) == '[object Date]') {
        return new Date(src.valueOf());
    }
    
    // important, need to think about the type of constructor;
    if (typeof src == 'object') {
        var thisConstructor = src.constructor;
        var newObject = new thisConstructor();
        for (var cur in src) {
            if (src.hasOwnProperty(cur)) {
                if (src[cur] === 'null') {
                    newObject[cur] = null;
                }
                
                else {
                    newObject[cur] = cloneObject(src[cur]);
                }
            }
        }
        return newObject;
    }
    
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    if (!isArray(arr)) {
        return false;
    }
    var targetArray = new Array();
    var thisArray = cloneObject(arr);
    thisArray.sort();
    for (var cur = 0; cur < thisArray.length - 1; cur++) {
        if (thisArray[cur] == thisArray[cur + 1]) continue;
        else {
            targetArray.push(thisArray[cur]);
        }
    }
    if (targetArray.indexOf(thisArray[thisArray.length - 1]) == -1) {
        targetArray.push(thisArray[thisArray.length - 1]);
    }
    return targetArray;
}

// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    var regex1 = /^\s*/;
    var regex2 = /\s*$/;
    return (str.replace(regex1, "")).replace(regex2, "");
}

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
// 其中fn函数可以接受两个参数：item和index
function each(arr, fn) {
    if (!isArray(arr) || !isFunction(fn)) {
        return false;
    }
    for (var cur = 0; cur < arr.length; cur++) {
        fn(arr[cur], cur);
    }
}

// 获取一个对象里面第一层元素的数量，返回一个整数
// 用 propertyIsEnumerable！！ important
function getObjectLength(obj) {
    var n = 0;
    for (var cur in obj) {
        n++;
    }
    return n;
}

// 判断是否为邮箱地址
// 第一部分：由字母、数字、下划线、短线“-”、点号“.”组成，
// 第二部分：为一个域名，域名由字母、数字、短线“-”、域名后缀组成，
// 而域名后缀一般为.xxx或.xxx.xx，一区的域名后缀一般为2-4位，如cn,com,net，现在域名有的也会大于4位
function isEmail(emailStr) {
    var regex = /^([\w-*\.*]+)@([\w-]+)((\.[\w-]{2,4}){1,2})$/;
    return regex.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var regex = /^1[0-9]{10}$/;
    return regex.test(phone);
}

/*    Part3    */

//判断element中是否已有某个名为newClassName的样式，为后续使用准备
function hasClass(element, newClassName) {
    var classNames = element.className.split(/\s+/);
    for (var cur = 0; cur < classNames.length; cur++) {
        if (classNames[cur] == newClassName) {
            return true;
        }
    }
    return false;
}

// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if (!hasClass(element, newClassName)) {
        element.className = element.className + " " + newClassName;
    }    
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if (hasClass(element, oldClassName)) {
        var regex = new RegExp('(\\s|^)' + oldClassName + '(\\s|$)');
        element.className = element.className.replace(regex, "");
    }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return (element.parentNode == siblingNode.parentNode);
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    return element.getBoundingClientRect();    //important!!
}


// 得到真正的Array
function toArray(root) {
    var arr = [];
    for (var cur = 0; cur < root.length; cur++) {
        arr.push(root[cur]);
    }
    return arr;
}

// 在数组中查找指定元素
function searchNodeInArray(result, element) {
    for (var cur = 0; cur < result.length; cur++) {
        if (result[cur] == element) return true;
    }
    return false;
}

// 查找指定element的父节点中是否存在满足查询条件的DOM结点
function searchParents(element, selector) {
    var searchResult = $(selector);
    var tempNode = element;
    if (!isArray(searchResult)) {
        var temp = [searchResult];
        searchResult = temp;
    }
    while(tempNode.parentNode) {
        if (searchNodeInArray(searchResult, tempNode)) {
            return true;
        }
        else {
            tempNode = tempNode.parentNode;
        }
    }
    return false;
}

// 对含DOM结点的集合root进行过滤
function fliterParent(root, selector) {
    var arr = toArray(root);
    for (var cur = 0; cur < arr.length; cur++) {
        if (!searchParents(arr[cur], selector)) {
            arr.splice(cur, 1);
            cur--;
        }
    }
    return arr;
}

// 实现一个简单的Query
function $(selector) {
    var idRegex = /^#([\w\-\.\:]+)/;
    var tagRegex = /^\w+$/;
    var classRegex = /^\.([\w\-\.\:]+)/;
    // [data-log]
    // [data-log="test"]
    // [data-log=test]
    // [data-log='test']
    var attrRegex = /(\w+)?\[([^=\]]+)(?:=(["'])?([^\]"']+)\3?)?\]/;    //important!!
    var selectActions = trim(selector).split(" ");
    
    //复合查找
    if (selectActions.length > 1) {    
        var root = $(selectActions[selectActions.length - 1]);
        if (root.length == 0) {
            return null;
        }
        
        if (!isArray(root)) {
            root = toArray(root);
        }
        for (var cur = 2; cur <= selectActions.length; cur++) {
            root = fliterParent(root, selectActions[selectActions.length - cur]);
        }
        return root;
    }
    
    //通过id查找
    if (idRegex.test(selector)) {
        return document.getElementById(selector.slice(1, selector.length));
    }
    
    //通过tagname查找
    if (tagRegex.test(selector)) {
        return document.getElementsByTagName(selector)[0];    //only return first tag;
    }
    
    //通过class查找
    if (classRegex.test(selector)) {
        if (document.getElementsByClassName) {    //浏览器支持getElementsByClassName
            return document.getElementsByClassName(selector.slice(1, selector.length));
        }
        else {
            var allNodes = document.getElementsByTagName("*");
            var result = [];
            for (var cur = 0; cur < allNodes.length; cur++) {
                if (hasClass(allNodes[cur], selector.slice(1, selector.length))) {
                    result.push(allNodes[cur]);
                }
            }
            return result;
        }
    }
    
    //通过属性查找
    if (attrRegex.test(selector)) {
        var result = [];
        var allNodes = document.getElementsByTagName("*");
        var matchResult = selector.match(attrRegex);
        var tag = matchResult[1]; 
        var key = matchResult[2];
        var value = matchResult[4];
        for (var cur = 0; cur < allNodes.length; cur++) {
            if (value) {
                var temp = allNodes[cur].getAttribute(key);
                if (temp === value) {
                    result.push(allNodes[cur]);
                }
                else {
                    continue;
                }
            }
            else {
                if (allNodes[cur].hasAttribute(key)) {
                    result.push(allNodes[cur]);
                }
            }
        }
        return result;
    }
}

/*    Part4    */

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListener) {
        element.removeEventListener(event, listener, false);
    }
    else if (element.detachEvent) {
        element.detachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    if (element.addEventListener) {
        element.addEventListener("keydown", function(e) {
            e = e || window.event;
            if ((e.keyCode || e.which) == 13) {
                listener();
            }
        }, false);
    }
    else {
        element.attachEvent("onkeydown", function(e) {
            e = e || window.event;
            if ((e.keyCode || e.which) == 13) {
                listener();
            }
        })
    }
}

$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;

// 先简单一些， 使用事件代理绑定
// have some bug here!!!
function delegateEvent(element, tag, eventName, listener) {
    //var ele = $(element);
    addEvent(element, eventName, function(e) {
        e = arguments[0] || window.event;
        var target = e.srcElement ? e.srcElement : e.target;
        if (target.tagName.toLowerCase() === tag) {
            listener();
        }
    });
}

$.delegate = delegateEvent;

/*    Part5    */

// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var agent = navigator.userAgent;
    if ((/msie (\d+\.\d+)/.test(agent)) || (/MSIE (\d+\.\d+)/.test(agent))) {
        return (document.documentMode || RegExp["$1"]);
    }
    else {
        return false;
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var expireTime;
    if (expiredays != null) {
        expireTime = new Date();
        expireTime.setTime(expireTime.getTime() + expiredays * 24 * 60 * 60 * 1000);
    }
    document.cookie = cookieName + "=" + cookieValue + ((expiredays == null) ? "" : ";expires="+expireTime.toUTCString());
}

// 获取cookie值
function getCookie(cookieName) {
    var cookie = document.cookie.split(";");
    var value;
    each(cookie, function(item, index) {
        if (trim(item.split("=")[0]) == cookieName) {
            value = trim(item.split("=")[1]);
        }
    });
    return value;
}

/*    Part6    */

// Ajax
function ajax(url, options) {
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    }
    else {
        var xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var type = (options.type || 'GET').toUpperCase();
    var data = (options.data || "");
    var onsuccess = (options.onsuccess || "");
    var onfail = (options.fail || "");
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200 && onsuccess != "") {
            onsuccess(xhr.responseText, xhr);
        }
        
        if (xhr.status == 404 && onfail != "") {
            onfail(xhr.responseText, xhr);
        }
        
    }
    
    if (data != "") {
        url = url + "?";
        for (var cur in data) {
            url = url + cur + "=" + data[cur] + "&";
        }
    }
    
    if (type == "POST") {
        console.log('post');
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(data);
    }
    else {
        console.log('get');
        xhr.open("GET", url, true);
        //xhr.send();
    }
}

