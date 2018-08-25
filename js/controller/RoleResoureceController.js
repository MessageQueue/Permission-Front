app.controller("RoleResoureceController", function ($scope, $controller,IRoleResoureceService) {


    $controller("baseController", {$scope: $scope});
    $scope.windownInfo.title = "角色资源管理";
    $scope.windownInfo.url="../../views/roleresourece/roleresourece-add.html";

    $scope.searchEntity = {};


    /**
     *
     * 获取分页数据
     *
     *
     * **/
        $scope.findPage = function (page, rows) {
        IRoleResoureceService.findPage(page, rows).then(function (response) {
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
        IRoleResoureceService.findOne(id).then(function (response) {
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
            serviceObject = IRoleResoureceService.update($scope.entity);
        } else {
            serviceObject = IRoleResoureceService.add($scope.entity);
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
        IRoleResoureceService.delete($scope.selectIds).then(function (response) {
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
        IRoleResoureceService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.data.records;
                $scope.paginationConf.totalItems = response.data.total;//更新总记录数
            }
        );
    };


});