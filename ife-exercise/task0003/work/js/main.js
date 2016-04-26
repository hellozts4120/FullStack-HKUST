localStorage.clear();

(function() {
    var _List1, _List2, _List3;
    var taskCount = 0;
    var _List1Title, _List2Title, _List3Content, _ListRelation;
    var pattern = document.getElementsByTagName("body")[0];
    var dateTemplate = "<div id=\"childtask-{{date}}\"><div class=\"childtask-date\">{{date}}</div></div>";
    var taskTemplate = "<div class=\"childtask\" id=\"{{ID3}}\">{{title}}</div>";
    var template1 = "<div class=\"cata-item\" id=\"cata-item-{{id}}\"><img src=\"img/tasklist.png\">{{name}}<div class=\"cata-delete\"><img src=\"img/delete.png\"></div></div><div class=\"cata-tasklist\" id=\"cata-item-{{id}}-tasklist\"></div>";
    var template2 = "<div class=\"cata-task\" id=\"task-{{parentID}}-{{taskID}}\"><img src=\"img/childtask.png\">{{content}}({{childtaskNum}})<div class=\"cata-delete\"><img src=\"img/delete.png\"></div></div>";
    
    //增加父级分类
    function addList1(name) {
        if (_List1Title[_List1] != undefined) {
            while (_List1Title[_List1] != undefined) {
                _List1++;
            }
        }
        _List1Title[_List1] = {
            id: _List1,
            title: name
        };
        localStorage.List1Title = JSON.stringify(_List1Title);
        _ListRelation[_List1] = {
            id: _List1,
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
            id: _List2,
            title: name
        };
        localStorage.List2Title = JSON.stringify(_List2Title);
        _ListRelation[parentList]["task"][_List2] = {
            id: _List2,
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
            id: _List3,
            title: name,
            time: date,
            content: content
        };
        localStorage.List3Content = JSON.stringify(_List3Content);
        _ListRelation[grandParent]["task"][parent]["childTask"][_List3] = {
            id: _List3,
            grandParentID: grandParent,
            parentID: parent
        }
        localStorage.ListRelation = JSON.stringify(_ListRelation);
        _List3++;
        localStorage.List3++;  
        init();
    }
    
    function sortToDoByDate(todo1, todo2) {
        var date1 = _List3Content[todo1]["time"].split("-");
        var date2 = _List3Content[todo2]["time"].split("-");
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
    
    function handleTaskHeader(tagChild, status) {
        if ($(".task-header-clicked").length) {
            $(".task-header-clicked")[0].setAttribute("class", "task-header-button");
        }
        addClass(tagChild, "task-header-clicked");
        var taskArray = getChildTask($(".cata-task-clicked")[0].id).sort(sortToDoByDate);
        var fliterdArray = [];
        switch(status) {
            case 1: 
                fliterdArray = taskArray;
                break;
            case 2:
                for (var cur in taskArray) {
                    if (_List3Content[taskArray[cur]].status != undefined) {
                        fliterdArray.push(taskArray[cur]);
                    }
                }
                break;
            case 3:
                for (var cur in taskArray) {
                    if (_List3Content[taskArray[cur]].status == undefined) {
                        fliterdArray.push(taskArray[cur]);
                    }
                }
                break;    
        }
        
        var dateArray = [];
        
        for (var i = 0; i < fliterdArray.length; i++) {
            dateArray.push(_List3Content[fliterdArray[i]].time);
        }
        if (dateArray.length) {
            dateArray = uniqArray(dateArray);
        }
        $("#task-content").innerHTML = "";
        for (var i = 0; i < dateArray.length; i++) {
            $("#task-content").innerHTML += dateTemplate.replace(/{{date}}/g, dateArray[i]);
        }
        for (var i = 0; i < fliterdArray.length; i++) {
            $("#childtask-" + _List3Content[fliterdArray[i]]["time"]).innerHTML += taskTemplate.replace(/{{ID3}}/g, "childtask-" + fliterdArray[i]).replace(/{{title}}/g, _List3Content[fliterdArray[i]]["title"]);
        }
    }
    
    function delegateEvent() {
        
        pattern.onclick = function(e) {
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
                    if (dateArray.indexOf(_List3Content[taskArray[i]].time) == -1) {
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
            
            //need debug here...
            if(tagChild.nodeType == 1 && tagChild.id == "task-header-all") {
                handleTaskHeader(tagChild, 1);
                
            }
            
            if(tagChild.nodeType == 1 && tagChild.id=="task-header-done") {            
                handleTaskHeader(tagChild, 2);
            }
            
            if(tagChild.nodeType == 1 && tagChild.id=="task-header-undone") {
                handleTaskHeader(tagChild, 3);
            }
            
            if(tagChild.nodeType == 1 && tagChild.parentNode.id == "add-task") {
                if($(".cata-item-clicked")[0] != undefined){
                    if($(".cata-item-clicked")[0].id == "cata-item-1"){
                        alert("不能为默认分类添加子分类！");
                        return;
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
                else {
                    alert("输入有误，添加失败！")
                }
                $("#prompt2").removeAttribute("style");
                $("#prompt2").removeAttribute("class");
            }
            
            if(tagChild.nodeType == 1 && tagChild.id == "prompt2-cancel") {
                $("#prompt2").removeAttribute("style");
                $("#prompt2").removeAttribute("class");
            }
            
            if(tagChild.nodeType == 1 && (tagChild.id == "add-childtask" || tagChild.parentNode.id == "add-childtask")) {
                $("#content-header").innerHTML = "";
                $("#content-date").innerHTML = "";
                $("#content-body").innerHTML = "";
                var curItem = $(".cata-task-clicked")[0];
                if (curItem == undefined) return;
                var grandpa = curItem.id.split("-")[1];
                var parent = curItem.id.split("-")[2];
                addList3("New Task", "", "", parent, grandpa);
                $("#task-" + grandpa + "-" + parent).click();
                $("#childtask-" + (_List3 - 1)).click();
                $("#taskEdit").click();
                init();
            }
            
            if (tagChild.nodeType == 1 && tagChild.getAttribute("class") == "childtask") {
                var id = tagChild.id.split("-")[1];
                $("#content-header").innerHTML = _List3Content[id]["title"];
                $("#content-date").innerHTML = _List3Content[id]["time"];
                $("#content-body").innerHTML = _List3Content[id]["content"];
                if ((_List3Content[id].status != undefined && _List3Content[id].status == "completed") || $("#childtask-title") == undefined) {
                    $("#taskComplete").setAttribute("style", "display:block;");
                    $("#taskSave").setAttribute("style", "display:none;");
                }
                else {
                    $("#taskComplete").setAttribute("style", "display:none;");
                    $("#taskSave").setAttribute("style", "display:block;");
                }
                
                if($(".childtask-clicked").length){
                    $(".childtask-clicked")[0].setAttribute('class','childtask');
                }
                addClass(tagChild, "childtask-clicked");
            }
            
            if((tagChild.id == "taskEdit" || tagChild.parentNode.id == "taskEdit") && $(".childtask-clicked").length) {
                if($("#childtask-title") == undefined) {
                    $("#taskSave").setAttribute("style", "display:block;");
                    $("#taskComplete").setAttribute("style", "display:none;");
                    var curTitle = $("#content-header").innerHTML;
                    var curDate = $("#content-date").innerHTML;
                    $("#content-header").innerHTML = "<input class=\"content-header-input\" id=\"childtask-title\"><p id=\"childtask-title-count\">还可输入12个字</p>";
                    $("#content-date").innerHTML = "<input class=\"content-header-input\" id=\"childtask-time\"><p id=\"childtask-time-alert\">请使用yyyy-mm-dd格式</p>";
                    $("#childtask-title").value = curTitle;
                    $("#childtask-time").value = curDate;
                    $("#content-body").contentEditable = true;
                    
                    $("#content-body-count").style.display = "block";
                    $("#childtask-title-count").innerHTML = "还可输入" + (20-$("#childtask-title").value.length) + "个字";
                }
            }
                        
            if((tagChild.id == "taskSave" || tagChild.parentNode.id == "taskSave") && $(".childtask-clicked").length) {
                var time = $("#childtask-time").value;
                if (!/^\d\d\d\d-\d\d-\d\d$/.test(time)) {
                    alert("时间输入格式错误！请使用yyyy-mm-dd格式");
                    return;
                }
                
                if (parseInt(time.split("-")[1]) > 12 || parseInt(time.split("-")[1]) < 1 || parseInt(time.split("-")[2]) > 31 || parseInt(time.split("-")[2]) < 1) {
                    alert("时间数值输入有误！请检查后重新输入");
                    return;
                }
                
                if (confirm('确认保存修改吗？')) {
                    $("#taskSave").setAttribute("style", "display:none;");
                    $("#taskComplete").setAttribute("style", "display:block;");
                    var curItem = $(".childtask-clicked")[0];
                    var id = curItem.id.split("-")[1];
                    
                    _List3Content[id].title = $("#childtask-title").value;
                    _List3Content[id].time = $("#childtask-time").value;
                    _List3Content[id].content = $("#content-body").innerHTML;
                    $("#content-body").contentEditable = false;		
                    $("#content-body-count").style.display = "none";
                    var ID = curItem.id.split("-")[1];
                    $("#content-header").innerHTML = _List3Content[ID].title;
                    $("#content-date").innerHTML = _List3Content[ID].time;
                    $("#content-body").innerHTML = _List3Content[ID].content;
                    $("#task-header-all").click();
                    localStorage.ID3_content = JSON.stringify(_List3Content);
                }
            }
            
            //console.log(tagChild.parentNode);
            if(tagChild.parentNode.id == "taskComplete" && $(".childtask-clicked").length){
                if(confirm("确定任务完成？")){
                    var curItem = $(".childtask-clicked")[0];
                    var id = curItem.id.split("-")[1];
                    _List3Content[id].status = "complete";
                    localStorage.List3Content = JSON.stringify(_List3Content);
                    addClass($("#taskComplete"), "complete");
                    alert("完成任务！");
                }
            }
            
            //debug here...
            if (tagChild.nodeType == 1 && tagChild.parentNode.getAttribute("class") == "cata-delete") {
                var ID1 = tagChild.parentNode.parentNode.id.split('-')[1];
                var ID2 = tagChild.parentNode.parentNode.id.split('-')[2];
                if (ID1 == 'item') {
                    if (ID2 == 1) {
                        alert("不能删除默认分类！");
                        return;
                    }
                    if (confirm("确认删除此分类吗？")) {
                        var targetNode = tagChild.parentNode.parentNode;
                        targetNode.style.display = "none";
                        for (var cur = 0; cur < targetNode.childNodes.length; cur++) {
                            targetNode.childNodes[cur].style.display = "none";
                        }
                        for (var cur in _ListRelation[ID2]["task"]) {
                            delete _List2Title[cur];
                        }
                        delete _ListRelation[ID2];
                        delete _List1Title[ID2];
                        localStorage.ListRelation = JSON.stringify(_ListRelation);
                        localStorage.List1Title = JSON.stringify(_List1Title);
                        localStorage.List2Title = JSON.stringify(_List2Title);
                    }

                }
                else {
                    if (ID1 == 1) {
                        alert("不能删除默认子分类！");
                        return;
                    }
                    if (confirm("确认删除此子分类吗？")) {
                        tagChild.parentNode.parentNode.style.display = "none";
                        delete _ListRelation[ID1]["task"][ID2];
                        delete _List2Title[ID2];
                        localStorage.ListRelation = JSON.stringify(_ListRelation);
                        localStorage.List2Title = JSON.stringify(_List2Title);
                    }
                }
            }
            
            tagChild = null;
        };
        
        pattern.onkeyup = function(e) {
            var target = e.path[0];
            if(target.id == "childtask-title"){
                var str = target.value;
                if (str.length <= 20) {
                    $("#childtask-title-count").innerHTML = "还可输入" + (20 - str.length) + "个字";
                }
                else {
                    $("#childtask-title").value = str.slice(0,19);
                }
            }
            
            if(target.id == "childtask-time") {
                var str = target.value;
                if (/^\d\d\d\d-\d\d-\d\d$/.test(str)) {
                    $("#childtask-time").style.border = "2px solid green";
                }
                else {
                    $("#childtask-time-alert").style.display = "block";
                    $("#childtask-time").style.border = "2px solid red";
                }
            }
            
            if(target.id == "content-body"){
                var str = target.value;
                if (str.length <= 200) {
                    $("#content-body-count").innerHTML = "还可输入" + (200 - str.length) + "个字";
                }
                else {
                    $("#content-body").value = str.slice(0,199);
                }
            }
        };
    }
    
    window.init = init;
})()

init();