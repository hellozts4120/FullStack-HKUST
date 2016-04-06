localStorage.clear();

(function() {
    var _List1, _List2, _List3;
    var taskCount = 0;
    var _List1Title, _List2Title, _List3Content, _ListRelation;
    var pattern = document.getElementsByTagName("body")[0];
    
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
        localStorage.List2Title = JSON.stringify(_List2Title);
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
    
    function sortToDoByDate(todo1, todo2) {
        var date1 = _List3Content[todo1]["date"].split("-");
        var date2 = _List3Content[todo2]["date"].split("-");
        if (date1[0] > date2[0]) {
            return 1;
        }
        else if (date1[0] == date2[0] && date1[1] > date2[1]) {
            return 1;
        }
        else if (date1[0] == date2[0] && date1[1] == date2[1] && date1[2] > date2[2]) {
            return 1;
        }
        else return -1;
    }
    
    function getChildTask(id) {
        var childArray = [];
        var cataId = id.split("-")[1];
        var taskId = id.split("-")[2];
        for (item in _ListRelation[cataId]["task"][taskId]["childTask"]) {
            childArray.push(item);
        }
        return childArray;
    }
    
    function initCategory() {
        $("#cata-list").innerHTML = "";
        var template1 = "<div class=\"cata-item\" id=\"cata-item-{{id}}\"><img src=\"img/tasklist.png\">{{name}}<div class=\"cata-delete\"><img src=\"img/delete.png\"></div></div><div class=\"cata-tasklist\" id=\"cata-item-{{id}}-tasklist\"></div>";
        var template2 = "<div class=\"cata-task\" id=\"task-{{parentID}}-{{taskID}}\"><img src=\"img/childtask.png\">{{content}}({{childtaskNum}})<div class=\"cata-delete\"><img src=\"img/delete.png\"></div></div>";
        for (var listItem in _List1Title) {
            $("#cata-list").innerHTML += template1.replace(/{{name}}/g, _List1Title[listItem]["title"]).replace(/{{id}}/g, listItem);
            for (var taskItem in _ListRelation[listItem]["task"]) {
                var childCount = 0;
                for (var childtaskItem in _ListRelation[listItem]["task"][taskItem]["childTask"]) {
                    childCount++;
                    taskCount++;
                }
                $("#cata-item-" + listItem + "-tasklist").innerHTML += template2.replace(/{{parentID}}/g, listItem).replace(/{{taskID}}/g, taskItem).replace(/{{content}}/g, _List2Title[taskItem]["title"]).replace(/{{childtaskNum}}/g, childCount);
            }
            $("#cata-all").innerHTML = "所有任务（" + taskCount + "）";
        }
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
            addList2("默认子分类","1");
        }
        
        //初始化最左栏category
        initCategory();
        
        //处理事件
        delegateEvent();
    }
    
    function delegateEvent() {
        
        addEvent(pattern, "click", function(e) {
            e = e || window.event;
            var tagChild = e.srcElement || e.target;
            var dateTemplate = "<div id=\"childtask-{{date}}\"><div class=\"childtask-date\">{{date}}</div></div>";
            var taskTemplate = "<div class=\"childtask\" id=\"{{ID3}}\">{{title}}</div>";
            if (tagChild.nodeType == 1 && (tagChild.getAttribute("class") == "cata-item" || tagChild.getAttribute("class") == "cata-item cata-item-clicked")) {
                if(tagChild.nextSibling.getAttribute("class") != "cata-tasklist"){
                    tagChild.nextSibling.setAttribute("class", "cata-tasklist");
                    return;
                }
                if($(".cata-item-clicked")[0] != undefined){
                    $(".cata-item-clicked")[0].setAttribute("class", "cata-item");
                }
                addClass(tagChild, "cata-item-clicked");
                addClass($("#" + tagChild.id + "-tasklist"), "cata-tasklist-clicked");
            }
            
            if(tagChild.nodeType == 1 && tagChild.parentNode.id == "add-cata") {
                $("#prompt").setAttribute("style", "display:block;");
                $("#prompt").setAttribute("class", "cata-input");
            }
            
            if(tagChild.nodeType == 1 && tagChild.id == "prompt-yes") {
                if ($("#prompt").getAttribute("class") == "cata-input" && $("#prompt-input").value) {
                    alert("添加分类成功！");
                    addList1($("#prompt-input").value);
                }
                else {
                    alert("输入有误，添加失败！")
                }
                $("#prompt").removeAttribute("style");
                $("#prompt").removeAttribute("class");
            }
            
            if(tagChild.nodeType == 1 && tagChild.id == "prompt-cancel") {
                $("#prompt").removeAttribute("style");
                $("#prompt").removeAttribute("class");
            }
            
            if(tagChild.nodeType == 1 && tagChild.getAttribute("class") == "cata-task"){
                var taskArray = getChildTask(tagChild.id).sort(sortToDoByDate);;
                var dateArray = [];
                for (var i = 0; i < taskArray.length; i++) {
                    if (dateArray.indexOf(_List3Content[taskArray[i]]).time == -1) {
                        dateArray.push(_List3Content[taskArray[i]].time);
                    }
                }
                $("#task-content").innerHTML = "";
                for (var i = 0; i < dateArray.length; i++) {
                    $("#task-content").innerHTML += dateTemplate.replace(/{{date}}/g, dateArray[i]);
                }
                for (var i = 0; i < taskArray.length; i++) {
                    $("#childtask-" + _List3Content[taskArray[i]].time).innerHTML += taskTemplate.replace(/{{ID3}}/g, "childtask-" + taskArray[i]).replace(/{{title}}/g, _List3Content[taskArray[i]]["title"]);
                }
                
                if ($(".cata-task-clicked").length) {
                    $(".cata-task-clicked")[0].setAttribute("class", "cata-task");
                }
                addClass(tagChild, "cata-task-clicked");
                if ($(".cata-item-clicked")[0] != undefined) {
                    $(".cata-item-clicked")[0].setAttribute("class", "cata-item");
                }
                addClass(tagChild.parentNode.previousSibling,"cata-item-clicked");
                $('#task-header-all').click();
            }
            
            if(tagChild.nodeType == 1 && tagChild.parentNode.id == "add-task") {
                if($(".cata-item-clicked")[0] != undefined){
                    if($(".cata-item-clicked")[0].id == "cata-item-1"){
                        alert("不能为默认分类添加子分类！");
                        return;
                    }
                    else {
                        alert("输入有误，添加失败！")
                    }
                    $("#prompt2").setAttribute("style", "display:block;");
                    $("#prompt2").setAttribute("class", "cata-input");
				}
            }
            
            if(tagChild.nodeType == 1 && tagChild.id == "prompt2-yes") {
                if ($("#prompt2").getAttribute("class") == "cata-input" && $("#prompt2-input").value) {
                    alert("添加子分类成功！");
                    addList2($("#prompt2-input").value, $(".cata-item-clicked")[0].id.split("-")[2]);
                }
                $("#prompt2").removeAttribute("style");
                $("#prompt2").removeAttribute("class");
            }
            
            if(tagChild.nodeType == 1 && tagChild.id == "prompt2-cancel") {
                $("#prompt2").removeAttribute("style");
                $("#prompt2").removeAttribute("class");
            }
            
            if(tagChild.nodeType == 1 && tagChild.id == "add-childtask") {
                
            }
            
            //debug here...
            if (tagChild.nodeType == 1 && tagChild.parentNode.getAttribute("class") == "cata-delete") {
                var ID1 = tagChild.parentNode.parentNode.id.split('-')[1];
                var ID2 = tagChild.parentNode.parentNode.id.split('-')[2];
                console.log(ID1);
                if (ID1 == 1) {
                    alert("不能删除默认分类！");
                    return;

                }
                if (ID2 == 1) {
                    alert("不能删除默认子分类！");
                    return;
                }
                if (confirm("确认删除此分类吗？")) {
                    tagChild.parentNode.style.display = "none";
                    delete _ListRelation[ID1]["task"][ID2];
                    delete _List2Title[ID2];
                    localStorage.ListRelation = JSON.stringify(_ListRelation);
                    localStorage.List2Title = JSON.stringify(_List2Title);
                }
            }
        });
        
        addEvent(pattern, "keyup", function(e) {
            console.log(e.path[0].id);
        });
    }
    
    window.init = init;
})()

init();
