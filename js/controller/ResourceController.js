app.controller("ResourceController", function ($scope, $controller, IResourceService) {


    $controller("baseController", {$scope: $scope});

    $scope.pageInfo.options.columns = [{
        checkbox: true
    },
        {
            field: 'id',
            title: 'id',
            sortable: true,
            align: "center"
        },
        {
            field: 'p_id',
            title: '上级资源',
            sortable: true,
            align: "center"
        },
        {
            field: 'name',
            title: '资源名称',
            sortable: true,
            align: "center"
        },
        {
            field: 'url',
            title: '资源地址',
            sortable: true,
            align: "center"
        },
        {
            field: 'status',
            title: '资源状态',
            sortable: true,
            align: "center"
        },
        {
            field: 'create_date',
            title: '创建时间',
            sortable: true,
            align: "center"
        },
        {
            field: 'update_date',
            title: '修改时间',
            sortable: true,
            align: "center"
        },
    ];


    $scope.windownInfo.title = "新增资源";
    $scope.windownInfo.url = "../../views/resource/resource-add.html";


    //读取列表数据绑定到表单中
    $scope.findAll = function (params) {
        console.log($scope.pageInfo);
        var index = $scope.getCurrentPageIndex(params.data.offset);
        IResourceService.findPage(index, $scope.pageInfo.options.pageSize).then(function (response) {
            // params.success({
            //     total: response.data.data.total,
            //     rows: response.data.data.records,
            //     pageNumber: response.data.data.current
            //
            // });
        });
    };

    $scope.findAll = function (page, rows) {
        // console.log($scope.pageInfo);
        // var index = $scope.getCurrentPageIndex(params.data.offset);
        IResourceService.findPage(index, $scope.pageInfo.options.pageSize).then(function (response) {
            // params.success({
            //     total: response.data.data.total,
            //     rows: response.data.data.records,
            //     pageNumber: response.data.data.current
            //
            // });
        });
    };


    //分页
    $scope.findPage = function (page, rows) {
        IResourceService.findPage(page, rows).then(function (response) {
            $scope.entitys = response.data.data.records;
            $scope.paginationConf.totalItems = response.data.data.total;

        });
    };


    //查询实体
    $scope.findOne = function (id) {
        IResourceService.findOne(id).success(
            function (response) {
                $scope.entity = response.data;
            }
        );
    };

    //保存
    $scope.save = function () {
        var serviceObject;//服务层对象
        if ($scope.entity.id != null) {
            serviceObject = IResourceService.update($scope.entity); //修改
        } else {
            serviceObject = IResourceService.add($scope.entity);//增加
        }
        serviceObject.then(function (response) {
            if (response.data.code === 1000) {
                $scope.refreshPage();
            }
        });
        $scope.closeDialog();
    }


    //批量删除
    $scope.delete = function () {
        if ($scope.selectIds.length === 0) {
            return;
        }
        IResourceService.delete($scope.selectIds).then(function (response) {
            console.log(response);
            if (response.data.code === 1000) {
                $scope.refreshPage();
                $scope.selectIds = [];
            }
        });
    };

    $scope.searchEntity = {};//定义搜索对象

    //搜索
    $scope.search = function (page, rows) {
        IResourceService.search(page, rows, $scope.searchEntity).success(
            function (response) {
                $scope.list = response.data.records;
                $scope.paginationConf.totalItems = response.data.total;//更新总记录数
            }
        );
    };


});