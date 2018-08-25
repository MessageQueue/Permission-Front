app.controller("UserController", function ($scope, $controller,IUserService) {


    $controller("baseController", {$scope: $scope});
    $scope.windownInfo.title = "用户管理";
    $scope.windownInfo.url="../../views/user/user-add.html";

    $scope.searchEntity = {};


    /**
     *
     * 获取分页数据
     *
     *
     * **/
        $scope.findPage = function (page, rows) {
        IUserService.findPage(page, rows).then(function (response) {
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
        IUserService.findOne(id).then(function (response) {
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
            serviceObject = IUserService.update($scope.entity);
        } else {
            serviceObject = IUserService.add($scope.entity);
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
        IUserService.delete($scope.selectIds).then(function (response) {
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
        IUserService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.data.records;
                $scope.paginationConf.totalItems = response.data.total;//更新总记录数
            }
        );
    };


});