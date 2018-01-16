var App = angular.module('DEMO', [
    "ngDragDrop",
    "defaultServices",
    "ngSanitize",
    "ngAnimate"
]);


//========================Controller for Index.html Page=======================================//
App.controller('loginCtrl', ['$scope', 'errorMsgFactory', function($scope, errorMsgFactory) {
    $scope.name = "ck"

    if (window.location.href.indexOf("file") === -1) {
        var path = window.location.href.split('index.html');
    }
    if (window.location.href.indexOf("4015") === -1 && window.location.href.indexOf("4005") === -1) {
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
    $scope.toast = function(inputVal, fldname) {
        if (fldname == 'usrname') {
            var msg = 'Please Enter Your Name'
        }
        if (fldname == 'emailadrs') {
            var msg = 'Please Enter Your Email ID'
        }
        if (inputVal == undefined) {
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
App.controller('homeCtrl', ['$timeout', '$scope', '$sce', '$rootScope', '$http', function($timeout, $scope, $sce, $rootScope, $http) {
    //=======================JSON Array For Question Flow====================//
    $scope.queJson = questionJson;
    $scope.gridData = gridBlock;

    if (window.location.href.indexOf("file") === -1) {
        var path = window.location.href.split('home.html');
        console.log("path", path);
    }
    if (window.location.href.indexOf("4015") === -1 && window.location.href.indexOf("4005") === -1) {
        var path = window.location.href.split('usc');
        path[0] = path[0] + "usc/usc/"
    }
    $scope.queBlock = false;
    $('#help-popup').modal('show');

    //===============Functions for question side bar in Responsive==============//
    angular.element('#que-block').addClass('right-menu');
    $scope.queBlock = true;

    $scope.toggleQuestion = function() {
        $scope.queBlock = !$scope.queBlock;
        if ($scope.queBlock) {
            angular.element('#que-block').addClass('right-menu');
        } else {
            angular.element('#que-block').removeClass('right-menu');
        }
    }
    $scope.onDrag = function(e) {
        if ($(window).width() < 992) {
            $(window).scrollLeft(e.clientX);
            $(window).scrollTop(e.clientY);
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
    $scope.totalUnits = 60;
    $scope.currentQue = {};
    var queCounter = 0;
    $scope.freeElectives = 32;
    $scope.radioAns = {};
    $scope.selectedOption = {}
    $scope.isSelected = 1;
    $scope.lastStep = false;
    //===========================//

    //====Fn call on item drag====//
    $scope.getItem = function(itm) {
        $scope.isSelected = 1;
    };
    //===========================//

    $scope.summer = [
        { heading: "Summer" },
        { heading: "Summer" },
        { heading: "Summer" },
        // {title: "Global Leadership Program", desc: "Beijing and Shanghai, China"},
        { heading: "Summer" },
        // {title: "Global Leadership Program", desc: "Beijing and Shanghai, China"}
    ];
    console.log($scope.currentQue, "$scope.currentQue.summer")
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
        var dstIndex = e.target.id; //index of drop block

        if (index.draggable.context.classList[0] == 'que') { // condition for when item drag from right side
            console.log($scope.currentQue.queData, "$scope.currentQue.queData")
            $scope.gridData[dstIndex] = $scope.currentQue.queData[srcIndex]
            $scope.currentQue.queData.splice(srcIndex, 1);
            if (!$scope.currentQue.queData.length) {
                $scope.isSelected = 1;
                if ($scope.freeElectives == 0) {
                    $scope.showLast = 1
                } else {
                    $scope.showLast = 0;
                }
            } else {
                $scope.isSelected = 0;
            }
            $scope.totalUnits = parseInt($scope.totalUnits) + parseInt($scope.gridData[dstIndex].data.points);
        } else if (index.draggable.context.classList[0] == 'grid') { //Condition for when item drag from grid(from one bock to onother block) 
            var temp = angular.copy($scope.gridData[srcIndex]);
            $scope.gridData[srcIndex] = $scope.blankBox;
            $scope.gridData[dstIndex] = temp;
        }
    }
    //=======================================================================//

    $scope.selectedArray = [];
    $scope.showoptnDiv = false;
    $scope.selectedRadio = {};
    //===============Fn call on Select Option to get selected Option==========//
    $scope.slctOptn = function(optnObj, data) {

        $scope.isSelected = 1;
        $scope.selectedOption = angular.copy(optnObj);
        console.log(data, "$scope.selectedArray")
        if (optnObj.suboptn) {
            $('.subradio').val('');
            $scope.selectedRadio = '';
            $scope.showoptnDiv = true;
        } else {
            console.log($('.subradio').val(), "val")

            $scope.showoptnDiv = false;
        }
        return optnObj.showoptnDiv;

    }
    //=======================================================================//


    //===============Fn for Make dynamic Block and their Data==========//
    var cnt = 0;
    var cntlen;
    $scope.getDynamicBlock = function() {
        if ($scope.selectedOption.points) { //Condition for block devides on the bases of points
            if ($scope.optnPoints) {
                cntlen = $scope.optnPoints / 4;
            } else {
                $scope.chkboxArry.filter(function(eleobj) {
                    if (eleobj.points) {
                        cntlen = eleobj.points / 4;
                        $scope.selectedOption.name = eleobj.name
                    }
                })
            }
        }
        if (!$scope.selectedOption.points) {
            cntlen = 3;
        }
        for (var i = 0; i < cntlen; i++) { //Loop for make blocks dynamic on the bases of points
            if ($scope.currentQue.nextBlock == 'afterQ5') { //condition for QUESTN 6
                $scope.selectedOption.name = 'FREE ELECTIVE';
                $scope.selectedOption.points = $scope.freeElectives;
                $scope.color = 'sky-blue rmvBorder';
                $scope.gridData.filter(function(objct) {
                    if (objct.class == 'gray') {
                        cnt++
                    }
                });
            }
            if ($scope.currentQue.nextBlock == 'afterQ4') { //condition for QUESTN 4
                $scope.color = 'purple rmvBorder';
                $scope.blckPoints = '4';
                $scope.selectedOption.name = $scope.chkboxArry[i].optn;
            } else if ($scope.currentQue.nextBlock != 'afterQ5' && $scope.currentQue.nextBlock != 'afterQ4') { //condition for QUESTN 5
                $scope.color = 'green rmvBorder';
                $scope.blckPoints = '4';
                $scope.chkboxArry.filter(function(objct) {
                    if (objct.name) {
                        $scope.selectedOption.name = objct.name;
                    }
                });
            }
            //========== Block Object==============//
            $scope.dynamicBlock = {
                data: {
                    title: $scope.selectedOption.name,
                    desc: '',
                    points: $scope.blckPoints
                },
                class: $scope.color,
                draggable: true,
                droppable: false,
                fixed: false
            }
            //=====================================//
            console.log($scope.currentQue,"$scope.currentQue")
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
    $scope.blockBox = dragBox;
    //======================================================================================//


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
                if ($scope.chkboxArry.length) { //Condition for select min and max 3 options
                    if ($scope.chkboxArry.length < 3) {
                        $scope.chkboxArry.push(itmObj);
                    } else {
                        event.preventDefault();
                        $scope.messagePop = "Must Choose 3 Classes";
                        $('#chebox-popup').modal('show');
                    }
                }
            } else if (itmObj.selected == false) { //Condition for Uncheck the checkbox
                var indx = $scope.chkboxArry.indexOf(itmObj)
                $scope.chkboxArry.splice(indx, 1);
                if (!$scope.chkboxArry.length) {
                    $timeout(function() {
                        $scope.$apply()
                        $scope.isSelected = 0;
                    }, 100);
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
                if ($scope.chkboxArry.length) { //Condition if you have Minimum credit left(Free Elective).
                    if ($scope.freeElectives >= itmObj.points) {
                        $scope.chkboxArry.push(itmObj);
                    } else if ($scope.freeElectives < itmObj.points) {
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
            } else if (itmObj.selected == false) { //Condition for Uncheck the checkbox
                var indx = $scope.chkboxArry.indexOf(itmObj)
                $scope.chkboxArry.splice(indx, 1);
                $scope.freeElectives = $scope.freeElectives + parseInt(itmObj.points);
                $scope.optnPoints = $scope.optnPoints - itmObj.points;
                if (!$scope.chkboxArry.length) {
                    $timeout(function() {
                        $scope.$apply()
                        $scope.isSelected = 0;
                    }, 100)
                }
            }
        }
    }
    //=====================================================================================================//
    $scope.blueBox = {
        data: { title: "", desc: "", points: '' },
        class: 'blue rmvBorder',
        draggable: false,
        droppable: false,
        fixed: false
    }
    // $scope.purpleBlock = [{
    //         data: { title: "FBE 453", desc: "Advanced Practicum in Investment Management", points: 4 },
    //         class: 'purple rmvBorder',
    //         draggable: true,
    //         droppable: false,
    //         fixed: false
    //     },
    //     {
    //         data: { title: "FBE 453", desc: "Advanced Practicum in Investment Management", points: 4 },
    //         class: 'purple rmvBorder',
    //         draggable: true,
    //         droppable: false,
    //         fixed: false
    //     },
    //     {
    //         data: { title: "FBE 453", desc: "Advanced Practicum in Investment Management", points: 4 },
    //         class: 'purple rmvBorder',
    //         draggable: true,
    //         droppable: false,
    //         fixed: false
    //     }
    // ]
    $scope.blockview = true;
    $scope.seniorArry = [];
    $scope.seniorArry2 = [];
    $scope.juniorArry = [];
    $scope.purpleBlock = [];
    $scope.apCourse = [];
    //==============================Funtion Call on  Next button==================================//
    $scope.getNext = function() {
        $scope.selectedArray.push($scope.selectedOption);
        console.log($scope.selectedArray, "$scope.selectedOption");
        if ($scope.showLast == 1) { //Condition to show Div block when 0 elective left
            $scope.lastStep = true;
            $scope.blockview = false
        }
        if ($scope.chkboxArry.length && !$scope.selectedOption.points) { //Condition to check max or min 3 checkboxs are selected for Q5
            if ($scope.chkboxArry.length < 3) {
                $scope.messagePop = "Must Choose 3 Classes";
                $('#chebox-popup').modal('show');
                return false;
            }
        }
        queCounter++
        if ($scope.selectedOption != undefined) {
            if ($scope.selectedOption.points == 4) { //Condition  for point popup 
                $scope.freeElectives = $scope.freeElectives + $scope.selectedOption.points;
                $scope.currentQue = $scope.queJson[queCounter];
                $('#points-popup').modal('show');
                $timeout(function() {
                    $('#points-popup').modal('hide');
                }, 4000);
                if ($scope.currentQue.enableNext) {
                    $scope.isSelected = 1; //to disable button
                } else {
                    $scope.isSelected = 0;
                }
                $scope.selectedOption = {};
                $scope.chkboxArry = [];
                return false;
            }
            if ($scope.selectedOption.points == 0) { //condition when select on a None option 
                $scope.currentQue = $scope.blockBox[$scope.selectedOption.ques];
                $scope.isSelected = 0;
                $scope.selectedOption = {};
                $scope.chkboxArry = []
                queCounter--
                return false;
            }
            $scope.currentQue = $scope.queJson[queCounter];
            console.log($scope.currentQue, 'free');

            $scope.selectedArray.filter(function(obj){
                if(obj.course=='AP'){
                    $scope.apCourse.push(obj);
                    console.log(obj);
                }
            })


            if ($scope.currentQue.autoMove) { //Condition for Question 8

                $scope.gridData = $scope.gridData.map(function(obj) {
                    if (obj.year == "senior") {
                        $scope.seniorArry.push(obj);
                        if (obj.class == 'purple') {
                            $scope.purpleBlock.push(obj);
                        }
                        $scope.blueBox.data.title = 'Master in' + " " + $scope.selectedArray[1].optn + "";
                        if ($scope.selectedOption.optionType == 'Progressive') {
                            obj = $scope.blueBox;
                        }
                        if ($scope.selectedOption.optionType == 'Undergraduate') {
                            obj = {
                                data: 'blank',
                                class: 'cross',
                                draggable: false,
                                droppable: false,
                                fixed: false,
                                year: 'sophomore'
                            }
                        }

                    }
                    if (obj.year == "junior") {
                        $scope.juniorArry.push(obj);
                    }
                    return obj;
                });

                if ($scope.selectedOption.optionType == 'Progressive' || $scope.selectedOption.optionType == 'Undergraduate') { //Condition for first and second Option
                    if ($scope.selectedOption.optionType == 'Undergraduate') {
                        $scope.currentQue.subcontent = "Note: Your extra credits are used for your early Graduation";
                    } else {
                        $scope.currentQue.subcontent = "Note: Your extra credits are used for your" +  " " + $scope.selectedArray[1].optn + "" ;
                    }
                    $scope.gridData[21] = $scope.seniorArry[0];
                    $scope.gridData[20] = $scope.seniorArry[2];
                    $scope.gridData[28] = $scope.purpleBlock[0];
                    $scope.gridData[29] = $scope.purpleBlock[1];
                    $scope.gridData[37] = $scope.purpleBlock[2];
                    $scope.gridData[32] = $scope.blankBox;
                    $scope.gridData[34] = $scope.blankBox;
                    $scope.gridData[36] = $scope.blankBox;
                }
                if ($scope.selectedOption.optionType == 'business') {
                    $scope.currentQue = $scope.queJson[12];
                    queCounter++;
                    return false;
                }
                var json = JSON.stringify($scope.gridData, function(key, value) {
                    if (key === "$$hashKey") {
                        return undefined;
                    }
                    return value;
                });
                $scope.gridData = JSON.parse(json);
                console.log($scope.seniorArry, "$scope.seniorArry");
                console.log($scope.selectedArray[1], "$scope.selectedArry");
                console.log($scope.gridData, "$scope.$scope.purpleBlock");
            }
            if ($scope.currentQue.confirm) {
                $scope.isSelected = 1;
                $scope.currentQue.que = "You’ve selected " + " <strong> " + $scope.selectedOption.optn + " </strong> " + " as your focus in Business Administration."
                $scope.currentQue.content1 = "You will have opportunity to participate in Academic Project," + "<strong>" + $scope.selectedOption.content + "</strong>";
                $scope.currentQue.queData = $scope.currentQue.queData.concat($scope.selectedOption.dargData);
                $scope.questionData = angular.copy($scope.currentQue.queData);
                // $scope.summer = [];
                // $scope.summer = $scope.selectedOption.summer;
                $scope.selectedOption = {};
                $scope.chkboxArry = [];
                return false;
            }
            if ($scope.selectedOption.ques || $scope.currentQue.nextBlock && $scope.freeElectives != 0) {
                $scope.getDynamicBlock();
            }
            console.log($scope.currentQue, "$scope.currentQue");
            $scope.selectedOption = {};
            $scope.chkboxArry = [];
            if ($scope.currentQue.enableNext) {
                $scope.isSelected = 1;
            } else {
                $scope.isSelected = 0;
            }
        }
    }
    //=====================================================================================================//

}]);
//=====================================================================================================//