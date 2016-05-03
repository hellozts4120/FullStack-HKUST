'use strict';

angular.module('todo-mobile')

    .filter('trust2Html', ['$sce',function($sce) {  
        return function(val) {  
            return $sce.trustAsHtml(val);   
        };
    }])        

    .controller('IndexController', ['$scope', 'cataFactory', function($scope, cataFactory){
        $scope.catagory = cataFactory.getCatagory();
    }])

    .controller('ChildTaskController', ['$scope', '$stateParams', 'cataFactory', 'taskFactory', function($scope, $stateParams, cataFactory, taskFactory){
        $scope.task = taskFactory.getTask();
        $scope.catagory = cataFactory.getCatagoryById(parseInt($stateParams.id));
        $scope.allTask = [];
        $scope.init = function () {
            for (var i in $scope.catagory.child) {
                for (var j in $scope.task) {
                    if ($scope.catagory.child[i] == ($scope.task)[j].id) {
                        $scope.allTask.push($scope.task[j]);
                        break;
                    }
                }
            }
        }
    }])
    
    .controller('TaskViewController', ['$scope', '$stateParams', 'cataFactory', 'taskFactory', function($scope, $stateParams, cataFactory, taskFactory) {
        $scope.catagory = cataFactory.getCatagory();
        for (var i in $scope.catagory) {
            for (var j in $scope.catagory[i].child) {
                if ($scope.catagory[i].child[j] == $stateParams.id) {
                    $scope.fatherID = $scope.catagory[i].id;
                }
            }
        }
        $scope.task = taskFactory.getTask();
        $scope.init = function () {
            for (var i in $scope.task) {
                if (($scope.task)[i].id == $stateParams.id) {
                    $scope.content = ($scope.task)[i];
                    break;
                }
            }
        }
    }])
    
    .controller('CreateController', ['$scope', '$stateParams', 'cataFactory', 'taskFactory', function($scope, $stateParams, cataFactory, taskFactory) {
        $scope.status = $stateParams.id;
        $scope.content = {};
        $scope.catagory = cataFactory.getCatagory();
        for (var i in $scope.catagory) {
            for (var j in $scope.catagory[i].child) {
                if ($scope.catagory[i].child[j] == $stateParams.id) {
                    $scope.fatherID = $scope.catagory[i].id;
                }
            }
        }

        if ($scope.status == 'new') {
            $scope.content.title = '输入分类名';
            $scope.content.id = parseInt(cataFactory.getCatagory().length);
            $scope.content.child = [];
        }
        else {
            $scope.content.title = '输入任务标题';
            $scope.content.date = '输入任务时间';
            $scope.content.content = '输入任务内容';
            $scope.content.id = "t" + taskFactory.getTask().length;
        }
        
        $scope.upload = function () {
            if ($scope.status == 'new') {
                cataFactory.upload($scope.content);
            }
            else {
                cataFactory.uploadTask($scope.fatherID, $scope.content.id);
                taskFactory.upload($scope.content);
            }
        }
    }])
;