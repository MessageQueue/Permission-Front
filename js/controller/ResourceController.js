app.controller("ResourceController", function ($scope, $controller, IResourceService) {

    $controller("baseController", {$scope: $scope});
    $scope.windownInfo.title = "新增资源";
    $scope.windownInfo.url = "../../views/resource/resource-add.html";
    $scope.searchEntity = {};


    /**
     *
     * 获取分页数据
     *
     *
     * **/
    $scope.findPage = function (page, rows) {
        IResourceService.findPage(page, rows).then(function (response) {
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
        IResourceService.findOne(id).then(function (response) {
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
            serviceObject = IResourceService.update($scope.entity);
        } else {
            serviceObject = IResourceService.add($scope.entity);
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
        IResourceService.delete($scope.selectIds).then(function (response) {
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
        IResourceService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.data.records;
                $scope.paginationConf.totalItems = response.data.total;//更新总记录数
            }
        );
    };


});