var App = angular.module('DEMO', [
    "ngDragDrop",
    "defaultServices",
    "ngSanitize",
    "ngAnimate"
]);

//========================================Controller for Home.html Page=================================================//
App.controller('homeCtrl', ['$timeout', '$scope', '$sce', '$rootScope', '$http', '$compile', function($timeout, $scope, $sce, $rootScope, $http, $compile) {
    // var myAudio = new Audio("/src/assets/audio/elective.mp3");
    // myAudio.play();
    $('#gamePage').hide();
    $scope.gotoGame = function() {
        $('#gamePage').show();
        $('#introPage').hide();
        $('#help-popup').modal('show');
        if ($(window).width() < 768) {
            $('.banner').css('display', 'none');
            $('.banner-part').css('display', 'none');
            $('footer').css('display', 'none');
        }
    }

    var scrolltop = $('.main-wrapper').offset().top
    $(window).scrollTop(scrolltop);
    $scope.queJson = questionJson;
    $scope.gridData = gridBlock;
    if (window.location.href.indexOf("file") === -1) {
        var path = window.location.href.split('home.html');
        // console.log("path", path);
    }
    if (window.location.href.indexOf("4015") === -1 && window.location.href.indexOf("4005") === -1) {
        var path = window.location.href.split('usc');
        path[0] = path[0] + "usc1/jsusc/"
    }
    // var sound = new Howl({
    //     urls: [path[0] + 'src/assets/audio/elective.mp3']
    // }).play();
    // console.log(path,"url")
    $scope.queBlock = false;


    //===============Functions for question side bar in Responsive==============//
    // angular.element('#que-block').addClass('right-menu');
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
            $(window).scrollLeft(e.clientX + 100);
            $(window).scrollTop(e.clientY);
        }
    }
    $scope.onStart = function(e) {
        $scope.toggleQuestion();
    }

    $scope.startOver = function() {
        window.location.href = path[0] + 'home.html';
        // window.location.href('/home.html')
    }
    $timeout(function() {
        $('.gridbox').css({ 'opacity': '0' });
    }, 10)

    //====Function for animation of block on popup close====//
    $scope.closepopUp = function() {
        $('.gridbox').css({ 'opacity': '1' });
        $('.box-contianer').find('.red').addClass('defaultselect')
        $('.box-contianer').find('.pink').addClass('defaultselect')
        $('.box-contianer').find('.orange').addClass('defaultselect')

    }
    //==========================================================================//

    var defaultHtml = `<div class='box-contianer gridbox' >
                        <div class="grid box slideInDown [item.class]"  data="'bhole'" data-drop="[item.droppable]" data-drag="[item.draggable]" data-jqyoui-options="{revert: 'invalid'}" id='priIndex' jqyoui-draggable="{index:priIndex, animate:true}" jqyoui-droppable="{onDrop : 'onItemDrop($event, priIndex)',onOver: 'getItem([item])', animate:true}">
                            <label class="title">[item.data.title]</label>
                            <p class="desc">[item.data.desc]</p>
                            <span class="points">[item.data.points]</span>
                        </div>
                    </div>`


    $scope.gridData.filter(function(Obj, index) {
        var html = defaultHtml.replace('[item.class]', Obj.class).replace(/\[item.droppable\]/g, Obj.droppable).replace(/\[item.draggable\]/g, Obj.draggable).replace('[item.data.title]', (Obj.data.title) ? Obj.data.title : '').replace('[item.data.desc]', (Obj.data.desc) ? Obj.data.desc : '').replace('[item.data.points]', (Obj.data.points) ? Obj.data.points : '').replace(/priIndex/g, index).replace('[item]', index);
        var template = angular.element(html);
        var linkFn = $compile(template)($scope);
        $('#dataBlock').append(linkFn);
    });


    $scope.bindHTMLArray = function(arr) {
        arr.filter(function(val) {
            var objectR = $scope.gridData[val];
            var html = defaultHtml.replace('[item.class]', objectR.class).replace(/\[item.droppable\]/g, objectR.droppable).replace(/\[item.draggable\]/g, objectR.draggable).replace('[item.data.title]', (objectR.data.title) ? objectR.data.title : '').replace('[item.data.desc]', (objectR.data.desc) ? objectR.data.desc : '').replace('[item.data.points]', (objectR.data.points) ? objectR.data.points : '').replace(/priIndex/g, val).replace('[item]', val);
            var template = angular.element(html);
            var linkFn = $compile(template)($scope);
            $('#' + val + '').parent().replaceWith(linkFn);
        });
    }

    $scope.selectedArray = [
        {},

        {
            optn: 'Accounting',
            dargData: [{
                    data: { title: "ACCT 462", desc: "Detecting Fraudulent Financial Reporting", points: 4 },
                    class: 'purple rmvBorder',
                    draggable: true,
                    droppable: false,
                    fixed: false,
                    year: 'senior',
                    stylecss: {
                        marginLeft: '0px'
                    }
                },
                {
                    data: { title: "ACCT 473", desc: "Financial Statement Auditing", points: 4 },
                    class: 'purple rmvBorder',
                    draggable: true,
                    droppable: false,
                    fixed: false,
                    year: 'senior',
                    stylecss: {
                        marginLeft: '-60px'
                    }
                },
                {
                    data: { title: "ACCT 474", desc: "Tax Issues for Business", points: 4 },
                    class: 'purple rmvBorder',
                    draggable: true,
                    droppable: false,
                    fixed: false,
                    year: 'senior',
                    stylecss: {
                        marginLeft: '-60px'
                    }

                }
            ],
            summer: {
                Internship: [
                    { title: "Summer Leadership Program", desc: "PWC", summerchk: true },
                    { title: "Deal Advisory Internship", desc: "Ernst & Young", summerchk: true },
                ],
                International: [
                    { title: "Global Leader Program", desc: "Beijing and Shanghai, China", summerchk: true },
                    { title: "International Exchange Program", desc: "Paris, France", summerchk: true }
                ]
            },
            content: "National Tax Case Study Competition"
        }

    ];

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
    $scope.dragdiv = [];
    var itemdrop = 0;
    //===========================//

    //====Fn call on item drag====//
    $scope.getItem = function(itm) {
        $scope.isSelected = 1;
        $scope.dragdiv.push(itm);
        var dragitem = $scope.dragdiv[$scope.dragdiv.length - 1];
        $scope.dragdiv.filter(function(obj) {
            if (obj.target.id == dragitem.target.id) {
                $('#' + obj.target.id).css('border', '4px solid #b9b6b5');
            } else {
                $('#' + obj.target.id).css('border', '0px')
            }
        });
    };

    //===========================//

    $scope.summer = [{
            heading: "Summer",
            draggable: false,
            droppable: true,
            fixed: false
        },
        {
            heading: "Summer",
            draggable: false,
            droppable: true,
            fixed: false
        },
        {
            heading: "Summer",
            draggable: false,
            droppable: true,
            fixed: false
        },
        {
            heading: "Summer",
            draggable: false,
            droppable: true,
            fixed: false
        },
    ];
    //===============Fn call on item dro======================================//
    $scope.onItemDrop = function(e, index, item) {
        itemdrop = 1;
        $scope.dragdiv.filter(function(obj) {
            if (obj) {
                $('#' + obj.target.id).css('border', '0px');
            } else {
                // $('#'+ obj.target.id).css('border','0px')
            }
        });
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
            console.log($scope.currentQue.queData[srcIndex], "$scope.currentQue.queData");

            // ============= custom binding HTML =============
            var objectJ = $scope.currentQue.queData[srcIndex];
            var html = defaultHtml.replace('[item.class]', objectJ.class).replace(/\[item.droppable\]/g, objectJ.droppable).replace(/\[item.draggable\]/g, objectJ.draggable).replace('[item.data.title]', (objectJ.data.title) ? objectJ.data.title : '').replace('[item.data.desc]', (objectJ.data.desc) ? objectJ.data.desc : '').replace('[item.data.points]', (objectJ.data.points) ? objectJ.data.points : '').replace(/priIndex/g, dstIndex).replace('[item]', dstIndex);
            var template = angular.element(html);
            var linkFn = $compile(template)($scope);
            $('#' + dstIndex).parent().replaceWith(linkFn);
            // ============= custom binding HTML =============

            $scope.gridData[dstIndex] = $scope.currentQue.queData[srcIndex];
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

            // ============= Previous HTML remove contents =============
            var objectJ = $scope.blankBox;
            // var objectJ = temp;
            var html = defaultHtml.replace('[item.class]', objectJ.class).replace(/\[item.droppable\]/g, objectJ.droppable).replace(/\[item.draggable\]/g, objectJ.draggable).replace('[item.data.title]', (objectJ.data.title) ? objectJ.data.title : '').replace('[item.data.desc]', (objectJ.data.desc) ? objectJ.data.desc : '').replace('[item.data.points]', (objectJ.data.points) ? objectJ.data.points : '').replace(/priIndex/g, srcIndex).replace('[item]', srcIndex);
            var template = angular.element(html);
            var linkFn = $compile(template)($scope);
            $('#' + srcIndex).parent().replaceWith(linkFn);
            // ============= New HTML Add contents =============
            var objectJ1 = temp;
            // var objectJ1 = $scope.blankBox;
            var htmlJ = defaultHtml.replace('[item.class]', objectJ1.class).replace(/\[item.droppable\]/g, objectJ1.droppable).replace(/\[item.draggable\]/g, objectJ1.draggable).replace('[item.data.title]', (objectJ1.data.title) ? objectJ1.data.title : '').replace('[item.data.desc]', (objectJ1.data.desc) ? objectJ1.data.desc : '').replace('[item.data.points]', (objectJ1.data.points) ? objectJ1.data.points : '').replace(/priIndex/g, dstIndex).replace('[item]', dstIndex);
            var template = angular.element(htmlJ);
            var linkFn = $compile(template)($scope);
            $('#' + dstIndex).parent().replaceWith(linkFn);
            // ============= custom binding HTML add Drag contents =============
        }
    }
    //=======================================================================//

    // $scope.selectedArray = [];
    $scope.showoptnDiv = false;
    $scope.selectedRadio = {};
    $scope.countIB = 0;
    $scope.countAP = 0;
    $scope.countALevel = 0;
    $scope.countNone = 0;
    //===============Fn call on Select Option to get selected Option==========//
    $scope.slctOptn = function(optnObj, data, type) {
        if (type == 'radio') {
            $scope.isSelected = 1;
        }
        $scope.selectedOption = angular.copy(optnObj);
        console.log($scope.selectedOption);
        if (optnObj.suboptn) {
            $('.subradio').val('');
            $scope.selectedRadio = '';
            $scope.showoptnDiv = true;
        } else {

            $scope.showoptnDiv = false;
        }
        return optnObj.showoptnDiv;
    }
    //=======================================================================//

    //===============Fn for Make dynamic Block and their Data==========//
    var cnt = 0;
    var cntlen;
    $scope.getDynamicBlock = function() {
        console.log($scope.currentQue, "currentQue");
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
            console.log(cntlen, "cntlen")
        }
        if (!$scope.selectedOption.points && $scope.currentQue.nextBlock != 'afterQ11') {
            cntlen = $scope.freeElectives / 4;
            console.log(cntlen, "cntlen")
        }
        if ($scope.currentQue.nextBlock == 'afterQ11') {
            cntlen = $scope.summmerchkboxArry.length;
            console.log(cntlen, "cntlen")
        }
        for (var i = 0; i < cntlen; i++) { //Loop for make blocks dynamic on the bases of points
            if ($scope.currentQue.nextBlock == 'afterQ5') { //condition for QUESTN 10
                console.log("in 15")
                $scope.selectedOption.name = 'FREE ELECTIVE';
                $scope.selectedOption.desc = ''
                $scope.selectedOption.points = $scope.freeElectives;
                $scope.freeElectives = 0;
                $scope.color = 'sky-blue rmvBorder';
                if (i == 0 || i == 5 || i == 10 || i == 15) {
                    $scope.margin = '0px'
                } else {
                    $scope.margin = '-60px'
                }
                $scope.gridData.filter(function(objct) {
                    if (objct.class == 'gray') {
                        cnt++
                    }
                });
            }
            if ($scope.currentQue.nextBlock == 'afterQ4') { //condition for QUESTN 9
                console.log("in 4")
                $scope.color = 'purple rmvBorder';
                $scope.blckPoints = '4';
                if (i == 0 || i == 5 || i == 10 || i == 15) {
                    $scope.margin = '0px'
                } else {
                    $scope.margin = '-60px'
                }
                $scope.selectedOption.name = $scope.chkboxArry[i].optn;
                $scope.selectedOption.desc = ''
            }
            if ($scope.currentQue.nextBlock == 'afterQ11') {
                console.log("in 11")
                $scope.color = 'box-bottom rmvBorder';
                $scope.selectedOption.name = $scope.summmerchkboxArry[i].optn.title;
                $scope.selectedOption.desc = $scope.summmerchkboxArry[i].optn.desc;
                // $scope.summmerchkboxArry.filter(function(obj){
                //     $scope.selectedOption.name = obj.optn.title;
                //     $scope.selectedOption.name = obj.optn.title;
                //     $scope.selectedOption.desc = obj.optn.desc;
                // })
                // $scope.blckPoints = '4';
            } else if ($scope.currentQue.nextBlock != 'afterQ5' && $scope.currentQue.nextBlock != 'afterQ4') { //condition for QUESTN 5
                $scope.color = 'green rmvBorder';
                $scope.blckPoints = '4';
                if (i == 0 || i == 5 || i == 10 || i == 15) {
                    $scope.margin = '0px'
                } else {
                    $scope.margin = '-60px'
                }

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
                    desc: $scope.selectedOption.desc,
                    points: $scope.blckPoints
                },
                class: $scope.color,
                draggable: true,
                droppable: false,
                fixed: false,
                stylecss: {
                    marginLeft: $scope.margin
                }
            }
            //=====================================//
            console.log($scope.dynamicBlock);
            $scope.currentQue.queData.push($scope.dynamicBlock);
            console.log($scope.currentQue,"$scope.currentQu")
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

    $scope.summmerchkboxArry = [];

    $scope.radioChecked = function(data) {
        $scope.currentQue.enableNext = true;
    }
    $scope.currentQue = $scope.queJson[queCounter];
    $scope.optnPoints = 0;
    $scope.chkboxArry = [];
    $scope.getData = function() {
        return newBoxData;
    }
    if ($scope.currentQue.number == '1') {
        $scope.currentQue.que = 'Required courses <strong> 60 units </strong> are prefilled for you. They are fixed and cannot be moved. Let’s begin.'
    }

    //================Funtion Call on  Select CheckBox Options===========//
    $scope.slectchkbx = function(itmObj, event) {
        console.log("called")
        if (itmObj.points) {

            if (itmObj.selected == true) {
                if (!$scope.chkboxArry.length) {
                    $scope.chkboxArry.push(itmObj);
                    $scope.storeelective = $scope.freeElectives;
                    if ($scope.freeElectives > 44) {
                        $scope.isSelected = 0;
                    } else {
                        $scope.isSelected = 1;
                    }
                    $scope.freeElectives = $scope.freeElectives - parseInt(itmObj.points);
                    return false;
                }
                if ($scope.chkboxArry.length) { //Condition if you have Minimum credit left(Free Elective).
                    if ($scope.freeElectives >= itmObj.points) {
                        $scope.chkboxArry.push(itmObj);
                        $scope.isSelected = 1;
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
                } else if ($scope.chkboxArry.length) {
                    if ($scope.storeelective > 44) {
                        $scope.isSelected = 0;
                    } else {
                        $scope.isSelected = 1;
                    }
                }
            }
        }
        if (itmObj.optn.summerchk == true) {
            $scope.summmerchkboxArry.push(itmObj);
            console.log($scope.summmerchkboxArry, "$scope.chkboxArry");
            $scope.isSelected = 1;
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
    $scope.blockview = true;
    $scope.seniorArry = [];
    $scope.seniorArry2 = [];
    $scope.juniorArry = [];
    $scope.purpleBlock = [];
    $scope.apCourse = [];

    //====================================Function to Count the Course for ques 8=======================================//
    $scope.countCourse = function(slectdarry) {
        slectdarry.filter(function(obj) {
            if (obj.course == 'IB') {
                console.log("in Ib")
                $scope.countIB++;
            }
            if (obj.course == 'AP') {
                console.log("in Ap")
                $scope.countAP++;
            }
            if (obj.course == 'A-level') {
                console.log("in alevel")
                $scope.countALevel++;
            }
            if (obj.course == 'none') {
                $scope.courseNone++;
            }
        });
        console.log($scope.countIB, $scope.countAP, $scope.countALevel, $scope.courseNone >= 3, "IB AP ALevel count");
        if ($scope.countIB == 3 || $scope.countAP == 5 || $scope.countALevel == 2) {
            $scope.countLevel = false;
            $scope.none = 0;
        } else if ($scope.countIB != 3 || $scope.countAP != 5 || $scope.countALevel != 2) {
            $scope.countLevel = true;
            $scope.none = 1;
        }
        return $scope.countLevel;
    }
    //=====================================================================================================//

    //==============================Funtion Call on  Next button==================================//
    $scope.getNext = function() {
        $scope.selectedArray.push($scope.selectedOption);
        console.log($scope.selectedArray, $scope.currentQue, "$scope.selectedOption");
        if($scope.currentQue.lastStep){
            $scope.lastStep = true;
        }
        if ($scope.selectedOption.Category == 'H') {
            $scope.countCourse($scope.selectedArray);
        }
        if ($scope.currentQue.removeClass) {
            $('.box-contianer ').find('.defaultselect').removeClass('defaultselect');
        }
        // if ($scope.showLast == 1) { //Condition to show Div block when 0 elective left
        //     $scope.lastStep = true;
        //     // $scope.blockview = false
        // }
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
                console.log("called")
                $scope.freeElectives = $scope.freeElectives + $scope.selectedOption.points;
                $scope.currentQue = $scope.queJson[queCounter];
                $('#points-popup').modal('show');
                $timeout(function() {
                    $('#points-popup').modal('hide');
                }, 3000);
                if ($scope.currentQue.title == 'Q8') {
                    $scope.currentQue.que = 'Nice! You have <strong>' + $scope.freeElectives + '</strong> of credits. Now you have the following options:'
                }
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
                console.log("called");
                $scope.currentQue = $scope.blockBox[$scope.selectedOption.ques];
                $scope.isSelected = 0;
                $scope.selectedOption = {};
                $scope.chkboxArry = []
                queCounter--
                return false;
            }
            $scope.currentQue = $scope.queJson[queCounter];
            console.log($scope.currentQue, "currentQue");
            if (!$scope.currentQue.minordrag) {
                if (!$scope.countLevel) {
                    if ($scope.currentQue.autoMove) {
                        $scope.gridData = $scope.gridData.map(function(obj, val) {
                            if (obj.year == "senior") {
                                $scope.seniorArry.push(obj);
                                if (obj.class == 'purple rmvBorder') {
                                    $scope.purpleBlock.push(obj);
                                }
                                $scope.blueBox.data.title = 'Master in' + " " + $scope.selectedArray[1].optn + "";
                                if ($scope.selectedOption.optionType == 'Progressive') {
                                    obj = $scope.blueBox;

                                    // ========= HTML Binding ==========
                                    var objectR = $scope.blueBox;
                                    var html = defaultHtml.replace('[item.class]', objectR.class).replace(/\[item.droppable\]/g, objectR.droppable).replace(/\[item.draggable\]/g, objectR.draggable).replace('[item.data.title]', (objectR.data.title) ? objectR.data.title : '').replace('[item.data.desc]', (objectR.data.desc) ? objectR.data.desc : '').replace('[item.data.points]', (objectR.data.points) ? objectR.data.points : '').replace(/priIndex/g, val).replace('[item]', val);
                                    var template = angular.element(html);
                                    var linkFn = $compile(template)($scope);
                                    $('#' + val + '').parent().replaceWith(linkFn);
                                    // ========= HTML Binding ==========
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
                                    // ========= HTML Binding ==========
                                    var objectR = obj;
                                    var html = defaultHtml.replace('[item.class]', objectR.class).replace(/\[item.droppable\]/g, objectR.droppable).replace(/\[item.draggable\]/g, objectR.draggable).replace('[item.data.title]', (objectR.data.title) ? objectR.data.title : '').replace('[item.data.desc]', (objectR.data.desc) ? objectR.data.desc : '').replace('[item.data.points]', (objectR.data.points) ? objectR.data.points : '').replace(/priIndex/g, val).replace('[item]', val);
                                    var template = angular.element(html);
                                    var linkFn = $compile(template)($scope);
                                    $('#' + val + '').parent().replaceWith(linkFn);
                                    // ========= HTML Binding ==========
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
                                $scope.currentQue.subcontent = "Note: Your extra credits are used for your Master in " + " " + $scope.selectedArray[1].optn + "degree.";
                            }
                            $scope.gridData[21] = $scope.seniorArry[0];
                            $scope.gridData[20] = $scope.seniorArry[2];
                            $scope.gridData[28] = $scope.purpleBlock[0];
                            $scope.gridData[29] = $scope.purpleBlock[1];
                            $scope.gridData[37] = $scope.purpleBlock[2];
                            $scope.gridData[32] = $scope.blankBox;
                            $scope.gridData[34] = $scope.blankBox;
                            $scope.gridData[36] = $scope.blankBox;

                            // Bind HTML contents by Array Loop
                            var arrayNumber = [21, 20, 28, 29, 37, 32, 34, 36];
                            $scope.bindHTMLArray(arrayNumber);
                            $scope.freeElectives = '32';

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
                    }
                } else if ($scope.countLevel) {
                    queCounter = queCounter + 2;
                    $scope.currentQue = $scope.queJson[queCounter]
                }
            }

        }
        if ($scope.currentQue.title == 'Q11') { //Conditions for question 11(Extra Curicular Activities)
            console.log($scope.selectedArray[0], "question 12");
            $scope.optionsData = [{
                    subTitle: 'Internship',
                    options: [
                        { optn: $scope.selectedArray[1].summer.Internship[0] },
                        { optn: $scope.selectedArray[1].summer.Internship[1] },
                    ],
                },
                {
                    subTitle: 'International Experiences',
                    options: [
                        { optn: $scope.selectedArray[1].summer.International[0] },
                        { optn: $scope.selectedArray[1].summer.International[1] },
                    ]
                }
            ];
            $scope.currentQue.options = $scope.currentQue.options.concat($scope.optionsData);
            $scope.isSelected = 0;
            console.log($scope.currentQue, "questions");
        }
        if ($scope.currentQue.confirm) {
            $scope.isSelected = 1;
            $scope.currentQue.que = "You’ve selected " + " <strong> " + $scope.selectedOption.optn + " </strong> " + " as your focus in Business Administration."
            $scope.currentQue.content1 = "You will have opportunity to participate in Academic Project," + "<strong>" + $scope.selectedOption.content + "</strong>";
            $scope.currentQue.queData = $scope.currentQue.queData.concat($scope.selectedOption.dargData);
            $scope.questionData = angular.copy($scope.currentQue.queData);
            $scope.selectedOption = {};
            $scope.chkboxArry = [];
            return false;
        }
        if ($scope.selectedOption.ques || $scope.currentQue.sumrdrag || $scope.currentQue.nextBlock && $scope.freeElectives != 0 && $scope.selectedOption.Category != 'H') {
            console.log("in if");
            $scope.getDynamicBlock();
        }
        $scope.selectedOption = {};
        $scope.chkboxArry = [];
        if ($scope.currentQue.enableNext) {
            $scope.isSelected = 1;
        } else {
            $scope.isSelected = 0;
        }
    }
    //=====================================================================================================//
}]);