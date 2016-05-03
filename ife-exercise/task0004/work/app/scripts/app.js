'use strict';

angular.module('todo-mobile', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'IndexController'
                    }
                }

            })
        
            // route for the data page
            .state('app.childtask', {
                url:'data/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/childtask.html',
                        controller  : 'ChildTaskController'                  
                    }
                }
            })
            
            // route for the data page
            .state('app.view', {
                url:'view/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/view.html',
                        controller  : 'TaskViewController'                  
                    }
                }
            })
            
            .state('app.new', {
                url:'new/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/new.html',
                        controller  : 'CreateController'                  
                    }
                }
            })
    
        $urlRouterProvider.otherwise('/');
    })
;