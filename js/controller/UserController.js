app.controller("UserController", function ($scope, $controller,IUserService) {


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
            field: 'name',
            title: '用户名称',
            sortable: true,
            align: "center"
        },
            {
            field: 'avartar',
            title: '用户头像',
            sortable: true,
            align: "center"
        },
            {
            field: 'account',
            title: '用户账号',
            sortable: true,
            align: "center"
        },
            {
            field: 'passwd',
            title: '用户密码',
            sortable: true,
            align: "center"
        },
            {
            field: 'email',
            title: '用户邮箱',
            sortable: true,
            align: "center"
        },
            {
            field: 'salt',
            title: '加盐秘钥',
            sortable: true,
            align: "center"
        },
            {
            field: 'phone',
            title: '用户电话',
            sortable: true,
            align: "center"
        },
            {
            field: 'brithday',
            title: '用户生日',
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
            field: 'sex',
            title: '性别',
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

    $scope.windownInfo.title="新增用户";
    $scope.windownInfo.url="../../views/user/user-add.html";


    //读取列表数据绑定到表单中
    $scope.findAll=function(){
        IUserService.findAll().then(function (response) {
            $scope.pageInfo.options.data = response.data.data.records;
        });
    }



    //分页
    $scope.findPage=function(page,rows){
        IUserService.findPage(page,rows).then(function (response) {
            $scope.pageInfo.options.data = response.data.data.records;
        });
    }


    //查询实体
    $scope.findOne=function(id){
        IUserService.findOne(id).success(
            function(response){
             $scope.entity= response.data;
            }
        );
    }

    //保存
    $scope.save=function(){
        var serviceObject;//服务层对象
        if($scope.entity.id!=null){//如果有ID
            serviceObject= IUserService.update($scope.entity); //修改
        }else{
            serviceObject= IUserService.add($scope.entity);//增加
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
    IUserService.dele( $scope.selectIds ).success(
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
    IUserService.search(page,rows,$scope.searchEntity).success(
            function(response){
               $scope.list=response.data.records;
               $scope.paginationConf.totalItems=response.data.total;//更新总记录数
            }
        );
    }

});