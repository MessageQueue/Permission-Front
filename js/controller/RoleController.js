app.controller("RoleController", function ($scope, $controller,IRoleService) {


    $controller("baseController", {$scope: $scope});
    $scope.windownInfo.title = "角色管理";
    $scope.windownInfo.url="../../views/role/role-add.html";

    $scope.searchEntity = {};


    /**
     *
     * 获取分页数据
     *
     *
     * **/
        $scope.findPage = function (page, rows) {
        IRoleService.findPage(page, rows).then(function (response) {
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
        IRoleService.findOne(id).then(function (response) {
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
            serviceObject = IRoleService.update($scope.entity);
        } else {
            serviceObject = IRoleService.add($scope.entity);
        }
        serviceObject.then(function (response) {
            if (response.data.code === 1000) {
                    $scope.closeDialog();
                window.parent.document.getElementById("refresh").click();
            }
        });
            $scope.selectIds=[];
    };


    /***
     *
     *
     * 删除实体
     *
     * */
        $scope.delete = function () {
        IRoleService.delete($scope.selectIds).then(function (response) {
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
        IRoleService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.data.records;
                $scope.paginationConf.totalItems = response.data.total;//更新总记录数
            }
        );
    };


});