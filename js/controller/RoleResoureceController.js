app.controller("RoleResoureceController", function ($scope, $controller,IRoleResoureceService) {


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
            field: 'role_id',
            title: '角色编号',
            sortable: true,
            align: "center"
        },
            {
            field: 'resource_id',
            title: '资源编号',
            sortable: true,
            align: "center"
        },
            {
            field: 'status',
            title: '状态',
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
            title: '更新时间',
            sortable: true,
            align: "center"
        },
        ];

    $scope.windownInfo.title="新增角色资源";
    $scope.windownInfo.url="../../views/roleresourece/roleresourece-add.html";


    //读取列表数据绑定到表单中
    $scope.findAll=function(){
        IRoleResoureceService.findAll().then(function (response) {
            $scope.pageInfo.options.data = response.data.data.records;
        });
    }



    //分页
    $scope.findPage=function(page,rows){
        IRoleResoureceService.findPage(page,rows).then(function (response) {
            $scope.pageInfo.options.data = response.data.data.records;
        });
    }


    //查询实体
    $scope.findOne=function(id){
        IRoleResoureceService.findOne(id).success(
            function(response){
             $scope.entity= response.data;
            }
        );
    }

    //保存
    $scope.save=function(){
        var serviceObject;//服务层对象
        if($scope.entity.id!=null){//如果有ID
            serviceObject= IRoleResoureceService.update($scope.entity); //修改
        }else{
            serviceObject= IRoleResoureceService.add($scope.entity);//增加
        }
        serviceObject.then(function (response) {
            if (response.data.code === 1000) {
            }
        });
        $scope.closeDialog();
    }


    //批量删除
    $scope.dele=function(){
        if($scope.selectIds.length===0){
            return;
    }


    //获取选中的复选框
    IRoleResoureceService.dele( $scope.selectIds ).success(
        function(response){
            if(response.code===1000){
               $scope.reloadList();//刷新列表
               $scope.selectIds=[];
            }
        });
    };

    $scope.searchEntity={};//定义搜索对象

    //搜索
    $scope.search=function(page,rows){
    IRoleResoureceService.search(page,rows,$scope.searchEntity).success(
            function(response){
               $scope.list=response.data.records;
               $scope.paginationConf.totalItems=response.data.total;//更新总记录数
            }
        );
    }

});