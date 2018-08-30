app.controller("DeptController", function ($scope, $controller, IDeptService) {


    $controller("baseController", {$scope: $scope});
    $scope.windownInfo.title = "部门管理";
    $scope.windownInfo.url = "../../views/dept/dept-add.html";

    $scope.searchEntity = {};


    /**
     *
     * 获取分页数据
     *
     *
     * **/
    $scope.findPage = function (page, rows) {
        IDeptService.findPage(page, rows).then(function (response) {
            $scope.entitys = response.data.data.records;
            $scope.paginationConf.totalItems = response.data.data.total;

        });
    };


    /**
     *
     * 获取单一实体
     *
     * */
    $scope.findOneEntity = function (id) {
        IDeptService.findOne(id).then(function (response) {
            if (response.data.code === 1000) {
                $scope.entity = response.data.data;
            }
        });
    };


    /**
     *
     *
     * 保存或则更改实体
     *
     * **/
    $scope.saveOrUpdateEntity = function () {
        var serviceObject;
        if ($scope.entity.id != null) {
            serviceObject = IDeptService.update($scope.entity);
        } else {
            serviceObject = IDeptService.add($scope.entity);
        }
        serviceObject.then(function (response) {
            if (response.data.code === 1000) {
                $scope.closeDialog();
                window.parent.document.getElementById("refresh").click();
            }
        });
        $scope.selectIds = [];
    };


    /***
     *
     *
     * 删除实体
     *
     * */
    $scope.delete = function () {
        IDeptService.delete($scope.selectIds).then(function (response) {
            console.log(response);
            if (response.data.code === 1000) {
                $scope.refreshPage();
                $scope.selectIds = [];
            }
        });
    };


    /**
     *
     * 查找实体
     *
     * */
    $scope.search = function (page, rows) {
        IDeptService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.data.records;
                $scope.paginationConf.totalItems = response.data.total;//更新总记录数
            }
        );
    };


    angular.element(document).ready(function () {
        $("#deptTree").click(function () {
            console.log("focus");
            $("#tree_panel").slideToggle();

        });
        // $("#deptTree").blur(function () {
        //     console.log("lost focus");
        //     $("#tree_panel").slideUp();
        // });
        $("#treeview1").click(function (e ) {
            $("#tree_panel").show();
            console.log("click tree");
        })
    });


});