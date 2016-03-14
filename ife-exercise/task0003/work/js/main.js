(function() {
    var _List1, _List2, _List3;
    var taskCount = 0;
    var _List1Title, _List2Title, _List3Content, _ListRelation;
    
    //增加父级分类
    function addList1(name) {
        if (_List1Title[_List1] != undefined) {
            while (_List1Title[_List1] != undefined) {
                _List1++;
            }
        }
        _List1Title[_List1] = {
            num: _List1,
            title: name
        };
        localStorage.List1Title = JSON.stringify(_List1Title);
        _ListRelation[_List1] = {
            num: _List1,
            task: {}
        }
        localStorage.ListRelation = JSON.stringify(_ListRelation);
        _List1++;
        localStorage.List1++;      
        if (_List1 > 2) {
            init();
        }    
    }
    
    //增加子级分类
    function addList2(name, parentList) {
        if (_List2Title[_List2] != undefined) {
            while (_List2Title[_List2] != undefined) {
                _List2++;
            }
        }
        _List2Title[_List2] = {
            num: _List2,
            title: name
        };
        localStorage.List1Title = JSON.stringify(_List2Title);
        _ListRelation[parentList]["task"][_List2] = {
            num: _List2,
            childTask: {},
            parentID: parentList
        }
        localStorage.ListRelation = JSON.stringify(_ListRelation);
        _List2++;
        localStorage.List2++;       
        init();        
    }
    
    //增加TO-DO内容
    function addList3(name, date, content, parent, grandParent) {
        if (_List3Content[_List3] != undefined) {
            while (_List3Content[_List3] != undefined) {
                _List3++;
            }
        }
        _List3Content[_List3] = {
            num: _List3,
            title: name,
            time: date,
            content: content
        };
        localStorage.List3Content = JSON.stringify(_List3Content);
        _ListRelation[grandParent]["task"][parent]["childTask"][_List3] = {
            num: _List3,
            grandParentID: grandParent,
            parentID: parent
        }
        localStorage.ListRelation = JSON.stringify(_ListRelation);
        _List3++;
        localStorage.List3++;  
        init();
    }
    
    function init() {
        //read from localstorage, list1,2,3 means 3 layers of lists
        //List1Title: 分类标题表, List2Title: 子分类标题表, List3Content: TO-DO的内容表，ListRelation：三层表的关系
        taskCount = 0;
        if (localStorage.List1 == undefined) {
            _List1 = 1;
            localStorage.List1 = _List1;
        }
        else {
            _List1 = localStorage.List1;
        }
        if (localStorage.List2 == undefined) {
            _List2 = 1;
            localStorage.List2 = _List2;
        }
        else {
            _List2 = localStorage.List2;
        }
        if (localStorage.List3 == undefined) {
            _List3 = 1;
            localStorage.List3 = _List3;
        }
        else {
            _List3 = localStorage.List3;
        }
        
        //实例化各表数据
        if (localStorage.getItem("List1Title")) {
            if (localStorage.List1Title) {
                _List1Title = JSON.parse(localStorage.List1Title);
            }
            else _List1Title = {};
        }
        else {
            _List1Title = {};
            localStorage.List1Title = "";
        }
        
        if (localStorage.getItem("List2Title")) {
            if (localStorage.List2Title) {
                _List2Title = JSON.parse(localStorage.List2Title);
            }
            else _List2Title = {};
        }
        else {
            _List2Title = {};
            localStorage.List2Title = "";
        }
        
        if (localStorage.getItem("List3Content")) {
            if (localStorage.List3Content) {
                _List3Content = JSON.parse(localStorage.List3Content);
            }
            else _List3Content = {};
        }
        else {
            _List3Content = {};
            localStorage.List3Content = "";
        }
        
        if (localStorage.getItem("ListRelation")) {
            if (localStorage.ListRelation) {
                _ListRelation = JSON.parse(localStorage.ListRelation);
            }
            else _ListRelation = {};
        }
        else {
            _ListRelation = {};
            localStorage.ListRelation = "";
        }
        
        //初次使用，添加“默认分类”
        if (_List1Title[1] == undefined) {
            addList1("默认分类");
        }
    }
    
    window.init = init;
})()

init();
