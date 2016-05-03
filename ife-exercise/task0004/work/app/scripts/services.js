'use strict';

angular.module('todo-mobile')

.service('cataFactory', function() {

    //localStorage.clear();
    if (!localStorage.getItem("category")) {
        var Cata = [
            {id : 0, title : "任务分类1", child : ['t1', 't2', 't5']},
            {id : 1, title : "任务分类2", child : ['t3', 't4', 't7']},
            {id : 2, title : "任务分类3", child : ['t6', 't8', 't9']},
            {id : 3, title : "任务分类4", child : ['t10', 't11', 't12', 't13']} 
        ];
        localStorage.setItem('category', JSON.stringify(Cata));
    }
    else var Cata = JSON.parse(localStorage.getItem('category'));

    this.getCatagory = function () {
        
        return Cata;

    };
    
    this.getCatagoryById = function (id) {
        for (var i = 0; i < Cata.length; i++) {
            if (Cata[i]["id"] == id) {
                return Cata[i];
            }
        }
    }
})

.service('taskFactory', function() {
    if (!localStorage.getItem("task")) {
        var Task = [
            {id : "t1" ,  title : "任务1" , date : "2016-04-01" , content : "任务1描述任务描述任务描述任务描述任务描述任务描述"},
            {id : "t2" ,  title : "任务2" , date : "2016-04-02" , content : "任务2描述任务描述任务描述任务描述任务描述任务描述"},
            {id : "t3" ,  title : "任务3" , date : "2016-04-03" , content : "任务3描述任务描述任务描述任务描述任务描述任务描述"},
            {id : "t4" ,  title : "任务4" , date : "2016-04-04" , content : "任务4描述任务描述任务描述任务描述任务描述任务描述"},
            {id : "t5" ,  title : "任务5" , date : "2016-04-05" , content : "任务5描述任务描述任务描述任务描述任务描述任务描述"},
            {id : "t6" ,  title : "任务6" , date : "2016-04-06" , content : "任务6描述任务描述任务描述任务描述任务描述任务描述"},
            {id : "t7" ,  title : "任务7" , date : "2016-04-07" , content : "任务7描述任务描述任务描述任务描述任务描述任务描述"},
            {id : "t8" ,  title : "任务8" , date : "2016-04-09" , content : "任务8描述任务描述任务描述任务描述任务描述任务描述"},
            {id : "t9" ,  title : "任务9" , date : "2016-04-24" , content : "任务9描述任务描述任务描述任务描述任务描述任务描述"},
            {id : "t10" ,  title : "任务10" , date : "2016-04-12" , content : "任务10描述任务描述任务描述任务描述任务描述任务描述"},
            {id : "t11" ,  title : "任务11" , date : "2016-04-05" , content : "任务11描述任务描述任务描述任务描述任务描述任务描述"},
            {id : "t12" ,  title : "任务12" , date : "2016-04-30" , content : "任务12描述任务描述任务描述任务描述任务描述任务描述"},
            {id : "t13" ,  title : "任务13" , date : "2016-04-23" , content : "任务13描述任务描述任务描述任务描述任务描述任务描述"}
        ];
        localStorage.setItem('task', JSON.stringify(Task));
    }
    else var Task = JSON.parse(localStorage.getItem('task'));
    
    this.getTask = function () {
        
        return Task;

    };
        
    this.getIdFeedback = function (id) {
        
        for (var i = 0; i < Feedbacks.length; i++) {
            if (Feedbacks[i]["_id"] == id) {
                return Feedbacks[i];
            }
        }

    };

})