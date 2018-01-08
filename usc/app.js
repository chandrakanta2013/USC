var App = angular.module('DEMO', [
    "ngDragDrop",
    "defaultServices"
]);


//========================Controller for Index.html Page=======================================//
App.controller('loginCtrl', ['$scope','errorMsgFactory', function($scope,errorMsgFactory) {
    $scope.name = "ck"
    
    if(window.location.href.indexOf("file")===-1){
        var path = window.location.href.split('index.html');
    }
    if(window.location.href.indexOf("4015")===-1 && window.location.href.indexOf("4005")===-1){
        var path = window.location.href.split('usc');
        path[0] = path[0] + "usc/usc/"
    }
    //===============Function for Signin==============//
    $scope.signin = function(obj) {
        $scope.loginObj = JSON.stringify(obj);
        window.location.href = path[0] + "home.html"
    };
    //===============================================//
    $scope.notCall = 0; 

    //===============Function for show error msg in toast==============//
    $scope.toast = function(inputVal,fldname){
        if(fldname=='usrname'){
            var msg = 'Please Enter Your Name'
        }
        if(fldname=='emailadrs'){
            var msg = 'Please Enter Your Email ID'
        }
           if(inputVal==undefined){
           iziToast.info({
                message: msg,
                messageSize: '16',
                id: 'question',
                toastOnce: true,
                position: 'topCenter',
                timeout: 5000,
                backgroundColor: 'rgb(255, 190, 25)',
                messageColor: 'white',
                progressBar: false,
                close: false,
                target: ''
            });  
        }
    }
    //======================================================================//
}]);

//========================================Controller for Home.html Page=================================================//
App.controller('homeCtrl', ['$timeout', '$scope', '$rootScope', '$http', function($timeout, $scope, $rootScope, $http) {
   if(window.location.href.indexOf("file")===-1){
        var path = window.location.href.split('home.html');
        console.log("path",path);
    }
    if(window.location.href.indexOf("4015")===-1 && window.location.href.indexOf("4005")===-1){
        var path = window.location.href.split('usc');
        path[0] = path[0] + "usc/usc/"
    }
    $scope.queBlock = false;

    //===============Functions for question side bar in Responsive==============//
    $scope.toggleQuestion = function() {
        $scope.queBlock = !$scope.queBlock;
        if ($scope.queBlock) {
            angular.element('#que-block').addClass('right-menu')
        } else {
            angular.element('#que-block').removeClass('right-menu')
        }
    }
    $scope.onStart = function(e) {
        $scope.toggleQuestion();
    }
    //==========================================================================//

    //====Make gray Block JSON====//
    $scope.blankBox = {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false
    }
    //===========================//

    //====Make new Block JSON====//
    $scope.newBoxData = {
        data: {
            title: 'GLP/LINC',
            desc: 'test',
            points: '2'
        },
        class: 'pink',

        draggable: true,
        droppable: false,
        fixed: true
    }
    //===========================//

    //====Gloabl Variables====//
    $scope.showLast = 0;
    $scope.totalUnits = 70;
    $scope.currentQue = {};
    var queCounter = 0;
    $scope.freeElectives = 32;
    $scope.radioAns = {};
    $scope.selectedOption = {}
    $scope.isSelected = 0;   
    $scope.lastStep = false;
     //===========================//

    //====Fn call on item drag====//
    $scope.getItem = function(itm) {
        $scope.isSelected = 1;
    };
    //===========================//

    //===============Fn call on item dro======================================//
    $scope.onItemDrop = function(e, index, item) {
        var json = JSON.stringify($scope.gridData, function(key, value) {
            if (key === "$$hashKey") {
                return undefined;
            }
            return value;
        });
        $scope.gridData = JSON.parse(json)
        var srcIndex = index.draggable.context.id; //index of that question block
        var dstIndex = e.target.id;  //index of drop block

        if (index.draggable.context.classList[0] == 'que') {        // condition for when item drag from right side
            $scope.gridData[dstIndex] = $scope.currentQue.queData[srcIndex]
            $scope.currentQue.queData.splice(srcIndex, 1);
            if(!$scope.currentQue.queData.length){
                $scope.isSelected = 1;
                if($scope.freeElectives==0){
                    $scope.showLast = 1
                }else{
                    $scope.showLast = 0;
                }
            }else{
                $scope.isSelected = 0;
            }
            $scope.totalUnits = parseInt($scope.totalUnits) + parseInt($scope.gridData[dstIndex].data.points);
        } else if (index.draggable.context.classList[0] == 'grid') {   //Condition for when item drag from grid(from one bock to onother block) 
            var temp = angular.copy($scope.gridData[srcIndex]);
            $scope.gridData[srcIndex] = $scope.blankBox;
            $scope.gridData[dstIndex] = temp;
        }
    }
    //=======================================================================//
    
    
    //===============Fn call on Select Option to get selected Option==========//
    $scope.slctOptn = function(optnObj) {
        $scope.isSelected = 1; 
        $scope.selectedOption = angular.copy(optnObj);
    }
    //=======================================================================//

    //===============Fn for Make dynamic Block and their Data==========//
    var cnt =0;
    var cntlen;
    $scope.getDynamicBlock = function(){
        if($scope.selectedOption.points){    //Condition for block devides on the bases of points
            if($scope.optnPoints){
                cntlen = $scope.optnPoints / 4;
            }else{
                $scope.chkboxArry.filter(function(eleobj){
                    if(eleobj.points){
                        cntlen = eleobj.points / 4;
                        $scope.selectedOption.name = eleobj.name
                    }
                })
            }
        }
        if(!$scope.selectedOption.points){
            cntlen = 3;
        }
        for(var i = 0; i<cntlen; i++){              //Loop for make blocks dynamic on the bases of points
            if($scope.currentQue.nextBlock=='afterQ5'){     //condition for QUESTN 6
                $scope.selectedOption.name = 'FREE ELECTIVE';
                $scope.selectedOption.points = $scope.freeElectives;
                $scope.color = 'sky-blue';
                $scope.gridData.filter(function(objct){
                    if(objct.class=='gray'){
                        cnt++
                    }
                });
            }
            if($scope.currentQue.nextBlock=='afterQ4'){   //condition for QUESTN 4
                $scope.color = 'purple';
                $scope.blckPoints = '4';
                $scope.selectedOption.name =  $scope.chkboxArry[i].optn;
            }else if($scope.currentQue.nextBlock!='afterQ5' && $scope.currentQue.nextBlock!='afterQ4'){   //condition for QUESTN 5
                $scope.color = 'green';
                $scope.blckPoints = '4';
                $scope.chkboxArry.filter(function(objct){
                    if(objct.name){
                        $scope.selectedOption.name = objct.name;
                    }
                });
            }
            //========== Block Object==============//
            $scope.dynamicBlock = {
                data: {
                    title: $scope.selectedOption.name,
                    desc:'',
                    points: $scope.blckPoints
                },
                class: $scope.color,
                draggable: true,
                droppable: false,
                fixed: false
            }
            //=====================================//
            $scope.currentQue.queData.push($scope.dynamicBlock);
        }
        var json = JSON.stringify($scope.currentQue.queData, function(key, value) {
            if (key === "$$hashKey") {
                return undefined;
            }
            return value;
        });
        $scope.currentQue.queData = JSON.parse(json)
    }   
    //=======================================================================//

    //===============JSON Array For Blocks of first three Questn==========//
    $scope.blockBox = [{
        headingText: "You have selected the following focus in the Marshall School of Business. Please drag the blocks and drop them into open spaces in the junior and senior years",
        enableNext: true,
        showQueBlocks: true,
        queData: [{
            data: {
                title: 'MATH 118',
                desc: 'Fund. Principle of the Calculus',
                points: '4'
            },
            class: 'brown',
            draggable: true,
            droppable: false,
            fixed: false
        }]
    }, {
        headingText: "Please drag the block and drop it into space depending on when you wish to take it",
        enableNext: true,
        showQueBlocks: true,
        queData: [{
            data: {
                title: 'GE 1',
                desc: '',
                points: '4'
            },
            class: 'orange',
            draggable: true,
            droppable: false,
            fixed: false
        }]
    }, {
        headingText: "Please drag the block and drop it into space depending on when you wish to take it",
        enableNext: true,
        showQueBlocks: true,
        queData: [{
            data: {
                title: 'GE 2',
                desc: '',
                points: '4'
            },
            class: 'orange',
            draggable: true,
            droppable: false,
            fixed: false
        }]
    }]
    //======================================================================================//

    //==============================JSON Array For Question Flow============================================================================//
    $scope.queJson = [{
            title: 'Q1',
            heading: 'Calculus',
            que: 'Have you taken or will you take:',
            type: 'radio',
            options: [
                { optn: 'AP Calculus exam? (Score of 4 or 5 only)', points: 4 },
                { optn: 'IB Mathematics Higher Level exam (Score of 5, 6, or 7)', points: 4 },
                { optn: 'A-Level Mathematics exam (Score of A*, A, or B)', points: 4 },
                { optn: 'None', points: 0, ques: 0 }
            ],
            successMsg: 'You’ve saved 4 free elective credits in your bank for your minor(s)',
            enableNext: false,
        }, {
            title: 'GE-intro',
            heading: 'General Education Courses',
            que: 'All students at USC are required to satisfy the university’s liberal arts core requirements, the General Education courses.  Incoming students can waive certain GE classes with select AP, IB, and A-Level exam scores.',
            type: 'text',
            enableNext: true
        }, {
            title: 'Q2',
            heading: 'GE Category A',
            que: 'Have you taken or will you take one of the following exams, with its corresponding score?',
            type: 'radio',
            options: [
                { optn: 'AP Art History (Score of 4 or 5)', points: 4 },
                { optn: 'IB Dance (Higher Level; Score of 5, 6, or 7)', points: 4 },
                { optn: 'IB Film (Higher Level; Score of 5, 6, or 7)', points: 4 },
                { optn: 'IB Music (Higher Level; Score of 5, 6, or 7)', points: 4 },
                { optn: 'IB Theater (Higher Level; Score of 5, 6, or 7)', points: 4 },
                { optn: 'IB Visual Arts (Higher Level; Score of 5, 6, or 7)', points: 4 },
                { optn: 'A-Level Art & Design (Score of A*, A, or B)', points: 4 },
                { optn: 'A-Level Music (Score of A*, A, or B)', points: 4 },
                { optn: 'None', points: 0, ques: 1 }
            ],
            successMsg: 'You’ve saved 4 free elective credits in your bank for your minor(s)',
            enableNext: false
        }, {
            title: 'Q3',
            heading: 'GE Category E',
            que: 'Have you taken or will you take one of the following exams, with its corresponding score?',
            type: 'radio',
            options: [
                { optn: 'AP Chemistry (Score of 4 or 5)', points: 4 },
                { optn: 'AP Physics 1 (Score of 4 or 5)', points: 4 },
                { optn: 'AP Physics 2 (Score of 4 or 5)', points: 4 },
                { optn: 'AP Physics B (Score of 4 or 5)', points: 4 },
                { optn: "AP Physics (C'Electricity/Magnetism) (Score of 4 or 5)", points: 4 },
                { optn: "AP Physics (C'Mechanics) (Score of 4 or 5)", points: 4 },
                { optn: 'IB Chemistry (Higher Level; Score of 5, 6, or 7)', points: 4 },
                { optn: 'IB Physics (Higher Level; Score of 5, 6, or 7)', points: 4 },
                { optn: 'A-Level Chemistry (Score of A*, A, or B)', points: 4 },
                { optn: 'A-Level Physics  (Score of A*, A, or B)', points: 4 },
                { optn: 'None', points: 0, ques: 2 }
            ],
            points: 4,
            successMsg: 'You’ve saved 4 free elective credits in your bank for your minor(s)',
            enableNext: false
        }, {
            title: 'Minor intro',
            heading: 'Minor',
            que: 'Now It’s time to use your bank credits!   In total, USC offers over 150 different minor programs for undergraduate students.  The minors below represent some of the most popular minor programs amongst USC Marshall students.',
            type: 'text',
            enableNext: true,
        }, {
            title: 'Q4',
            heading: 'Focus',
            que: 'Choose a focus in Business Administration (must choose three classes)',
            type: 'checkbox',
            subTitle: true,
            options: [{
                subTitle: 'Marketing',
                options: [
                    { optn: 'Keep: MKT 450: Consumer Behavior and Marketing' },
                    { optn: 'MKT 405: Advertising and Promotion' },
                    { optn: 'MKT 465: Global Marketing Management' },
                    { optn: 'Remove: MKT 410: Professional Selling' }
                ]
            }, {
                subTitle: 'Finance',
                options: [
                    { optn: 'Keep: FBE 421: Financial Analysis and Valuation' },
                    { optn: 'FBE 432: Corporate Financial Strategy' },
                    { optn: 'FBE 459: Financial Derivatives' },
                    { optn: 'Remove: FBE 427: Real Estate Law' }
                ]
            }, {
                subTitle: 'Finance',
                options: [
                    { optn: 'Keep: FBE 421: Financial Analysis and Valuation' },
                    { optn: 'FBE 432: Corporate Financial Strategy' },
                    { optn: 'FBE 459: Financial Derivatives' },
                    { optn: 'Remove: FBE 427: Real Estate Law ADD' }
                ]
            }, {
                subTitle: 'Entrepreneurship',
                options: [
                    { optn: 'BAEP 451: The Management of New Enterprise' },
                    { optn: 'BAEP 453: Venture Management' },
                    { optn: 'BAEP 491: Introduction to Social Entrepreneurship' }
                ]
            }, {
                subTitle: 'Management and Organization',
                options: [
                    { optn: 'MOR 462: Management Consulting' },
                    { optn: 'MOR 469: Negotiation and Persuasion' },
                    { optn: 'MOR 492: Global Strategy' }
                ]
            }, {
                subTitle: 'Information and Operations Management',
                options: [
                    { optn: 'IOM 433: Business Information Systems Analysis and Design' },
                    { optn: 'IOM 443: The Business of Interactive Digital Media' },
                    { optn: 'IOM 482: Supply Chain Management' }
                ]
            }, {
                subTitle: 'Business Communication',
                options: [
                    { optn: 'BUCO 425: Ethics and Professional Communication' },
                    { optn: 'BUCO 458: Managing  Communication and New Media' },
                    { optn: 'BUCO 460: International Business Communication' }
                ]
            }],
            points: 4,
            successMsg: 'You have [8] elective credits left.',
            enableNext: false
        }, {
            enableNext: true,
            showQueBlocks: true,
            heading: "You have selected the following focus in the Marshall School of Business. Please drag the blocks and drop them into open spaces in the junior and senior years",
            nextBlock: 'afterQ4',
            queData: []
        }, {
            title: 'Q5',
            heading: 'Minor',
            que: 'Select one or more minor programs depending on the free elective units in your bank',
            type: 'checkbox',
            options: [
                { optn: 'Philosophy (20 units of free electives needed)', name:'Philosophy Minor', points: '20',ques: 'minor' },
                { optn: 'Real Estate Development (24 units of free electives needed)', name:'Real Estate Development Minor',points: '24',ques: 'minor' },
                { optn: 'Cinematic Arts (24 units of free electives needed)', name:'Cinematic Arts Minor', points: '24',ques: 'minor' },
                { optn: 'Music Industry (20 units of free electives needed)', name:'Music Industry Minor', points: '20',ques: 'minor' },
                { optn: 'Political Science (20 units of free electives needed)', name:'Political Science Minor', points: '20',ques: 'minor' },
                { optn: 'Sports Media Studies ( 24 units of free electives needed)', name:'Sports Media Studies Minor', points: '24',ques: 'minor' },
                { optn: 'None', points: '0',ques: 'minor' }
            ],
            successMsg: 'You’ve saved 4 free elective credits in your bank for your minor(s)',
            enableNext: false
        },{
            enableNext: true,
            showQueBlocks: true,
            headingText: "You have selected the following focus in the Marshall School of Business. Please drag the blocks and drop them into open spaces in the junior and senior years",
            queData: []
            
        },
        {
            enableNext: true,
            showQueBlocks: true,
            headingText: "You have" + $scope.freeElectives + "elective credits left.Drag and drop to the grid", 
            nextBlock: 'afterQ5',
            queData: []
        }
    ]
    //===============================End of JSON Array========================================================================================//
  

    $scope.radioChecked = function(data) {
        $scope.currentQue.enableNext = true;
    }
    $scope.currentQue = $scope.queJson[queCounter];
    $scope.optnPoints = 0;
    $scope.chkboxArry = [];
    $scope.getData = function() {
        return newBoxData;
    }
    
    //================Funtion Call on  Select CheckBox Options===========//
    $scope.slectchkbx = function(itmObj, event) {
        if (!itmObj.points) {
            if (itmObj.selected == true) {  
                if (!$scope.chkboxArry.length) {
                    $scope.chkboxArry.push(itmObj);
                    return false;
                }
                if ($scope.chkboxArry.length) {       //Condition for select min and max 3 options
                    if ($scope.chkboxArry.length < 3) {
                        $scope.chkboxArry.push(itmObj);
                    } else {
                        event.preventDefault();
                        $scope.messagePop = "Must Choose 3 Classes";
                        $('#chebox-popup').modal('show');
                    }
                }
            } else if (itmObj.selected == false) {     //Condition for Uncheck the checkbox
                var indx = $scope.chkboxArry.indexOf(itmObj)
                $scope.chkboxArry.splice(indx, 1);
                if(!$scope.chkboxArry.length){
                    $timeout(function(){
                        $scope.$apply()
                        $scope.isSelected = 0;    
                    },100);
                }
            }
        }
        if (itmObj.points) {
            if (itmObj.selected == true) {
                if (!$scope.chkboxArry.length) {
                    $scope.chkboxArry.push(itmObj);
                    $scope.freeElectives = $scope.freeElectives - parseInt(itmObj.points);
                    $scope.isSelected = 1;  
                    return false;
                }   
                if ($scope.chkboxArry.length) {    //Condition if you have Minimum credit left(Free Elective).
                    if($scope.freeElectives >= itmObj.points){
                        $scope.chkboxArry.push(itmObj);
                    }
                    else if($scope.freeElectives < itmObj.points){
                        $scope.notCall = 1;
                        event.preventDefault();
                        $scope.messagePop = "You don't have enough Credit";
                        $('#chebox-popup').modal('show');
                        return false;
                    }   
                    $scope.chkboxArry.filter(function(ele) {
                        if (itmObj.points == '0') {
                            if (ele.points != '0') {
                                ele.selected = false;
                                $scope.freeElectives = $scope.freeElectives + parseInt(ele.points);
                            }
                            var indx = $scope.chkboxArry.indexOf(ele)
                            $scope.chkboxArry.splice(indx, 1);
                        }
                        if (itmObj.points != '0') {
                            if (ele.points == '0') {
                                ele.selected = false;
                            }
                            $scope.optnPoints = $scope.optnPoints + parseInt(ele.points);
                        }
                    });
                }
                $scope.freeElectives = $scope.freeElectives - parseInt(itmObj.points);
            } else if (itmObj.selected == false) {   //Condition for Uncheck the checkbox
                var indx = $scope.chkboxArry.indexOf(itmObj)
                $scope.chkboxArry.splice(indx, 1);
                $scope.freeElectives = $scope.freeElectives + parseInt(itmObj.points);
                $scope.optnPoints = $scope.optnPoints -  itmObj.points;
                if(!$scope.chkboxArry.length){
                    $timeout(function(){
                        $scope.$apply()
                        $scope.isSelected = 0;    
                    },100)
                }
            }
        }
    }
    //=====================================================================================================//

    $scope.blockview = true;
    //==============================Funtion Call on  Next button==================================//
    $scope.getNext = function() {
        if($scope.showLast==1){    //Condition to show Div block when 0 elective left
            $scope.lastStep = true;
            $scope.blockview = false
        }
        if ($scope.chkboxArry.length && !$scope.selectedOption.points) {  //Condition to check max or min 3 checkboxs are selected for Q5
            if ($scope.chkboxArry.length < 3) {
                $scope.messagePop = "Must Choose 3 Classes";
                $('#chebox-popup').modal('show');
                return false;
            }
        }
        queCounter++
        if ($scope.selectedOption != undefined) {     
            if ($scope.selectedOption.points == 4) {    //Condition  for point popup 
                $scope.freeElectives = $scope.freeElectives + $scope.selectedOption.points;
                $scope.currentQue = $scope.queJson[queCounter];
                $('#points-popup').modal('show');
                $timeout(function() {
                    $('#points-popup').modal('hide');
                }, 1000);
                if($scope.currentQue.enableNext){
                    $scope.isSelected = 1;   //to disable button
                }else{
                    $scope.isSelected = 0;
                }
                $scope.selectedOption = {};
                $scope.chkboxArry = [];
                return false;
            }
            if ($scope.selectedOption.points == 0) {     //condition when select on a None option 
                $scope.currentQue = $scope.blockBox[$scope.selectedOption.ques];
                $scope.isSelected = 0;
                $scope.selectedOption = {};
                $scope.chkboxArry = []
                queCounter--
                return false;
            }
            $scope.currentQue = $scope.queJson[queCounter];
            console.log($scope.freeElectives,'free')
            if($scope.selectedOption.ques || $scope.currentQue.nextBlock && $scope.freeElectives!=0){
                $scope.getDynamicBlock();  
                // $scope.blockview = false  //call function for dynamic block
            }
            $scope.selectedOption = {};
            $scope.chkboxArry = [];
            if($scope.currentQue.enableNext){
                $scope.isSelected = 1;
            }else{
                $scope.isSelected = 0;
            }
        }
    }
    //=====================================================================================================//

    //==============================JSON Array For Grid Data======================================================//
    $scope.gridData = [{
        data: {
            title: 'WRIT 150',
            desc: 'Writing and Critical Reasoning',
            points: '4'
        },
        class: 'orange',
        draggable: false,
        droppable: false,
        fixed: true
    }, {
        data: {
            title: 'ECON 351x',
            desc: 'Microeconomics for Business',
            points: '4'
        },
        class: 'pink',
        draggable: false,
        droppable: false,
        fixed: true
    }, {
        data: {
            title: 'ECON 352x',
            desc: 'Microeconomics for Business',
            points: '4'
        },
        class: 'pink',
        draggable: false,
        droppable: false,
        fixed: true
    }, {
        data: {
            title: 'BUAD 307',
            desc: 'Marketing Fundamentals',
            points: '4'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true
    }, {
        data: {
            title: 'BUAD 311',
            desc: 'Operations Management',
            points: '4'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true
    }, {
        data: {
            title: 'BUAD 497',
            desc: 'Strategic Management',
            points: '4'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true
    }, {
        data: {
            title: 'BUAD 425',
            desc: 'Data Analysis for Decision Making',
            points: '2'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false
    }, {
        data: {
            title: 'GESM',
            desc: 'Social Issues',
            points: '4'
        },
        class: 'orange',
        draggable: false,
        droppable: false,
        fixed: true
    }, {
        data: {
            title: 'BUAD 310',
            desc: 'Applied Business Statistics',
            points: '4'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true
    }, {
        data: {
            title: 'BUAD 280',
            desc: 'Accounting I',
            points: '3'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true
    }, {
        data: {
            title: 'BUAD 281',
            desc: 'Accounting II',
            points: '3'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true
    }, {
        data: {
            title: 'BUAD 306',
            desc: 'Business Finance',
            points: '4'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true
    }, {
        data: {
            title: 'WRIT 340',
            desc: 'Advanced Writing for Business',
            points: '4'
        },
        class: 'orange',
        draggable: false,
        droppable: false,
        fixed: true
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false
    }, {
        data: {
            title: 'MATH 118',
            desc: 'Principle Of Calculus',
            points: '4'
        },
        class: 'light-green',
        draggable: false,
        droppable: false,
        fixed: false
    }, {
        data: {
            title: 'BUAD 304',
            desc: 'Leading Organizations',
            points: '4'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true
    }, {
        data: {
            title: 'GE - B',
            desc: '',
            points: '4'
        },
        class: 'orange',
        draggable: false,
        droppable: false,
        fixed: true
    }, {
        data: {
            title: 'BUAD 302',
            desc: 'Communication Strategy in Business',
            points: '4'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true
    }, {
        data: {
            title: 'GE - C',
            desc: '',
            points: '4'
        },
        class: 'orange',
        draggable: false,
        droppable: false,
        fixed: true
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false
    }, {
        data: {
            title: 'GLP/LINC',
            desc: '',
            points: '2'
        },
        class: 'pink',
        draggable: false,
        droppable: false,
        fixed: true
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false
    }, {
        data: 'blank',
        class: 'cross',
        draggable: false,
        droppable: false,
        fixed: false
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false
    }, {
        data: 'blank',
        class: 'cross',
        draggable: false,
        droppable: false,
        fixed: false
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false
    }, {
        data: 'blank',
        class: 'cross',
        draggable: false,
        droppable: false,
        fixed: false
    }, {
        data: 'blank',
        class: 'cross',
        draggable: false,
        droppable: false,
        fixed: false
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false
    }, {
        data: 'blank',
        class: 'cross',
        draggable: false,
        droppable: false,
        fixed: false
    }]
    // $scope.signout = function() {
    //     location.href = path[0] + "index.html"
    // };
}]);
//=====================================================================================================//
