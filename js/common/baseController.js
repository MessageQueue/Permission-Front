app.controller("baseController", function ($scope) {

    /**
     *
     * 复选框中的ID
     *
     * */
    $scope.selectIds = [];


    /**
     *
     * 分页查找中的实体
     *
     * **/
    $scope.entitys = [];


    /**
     *
     * 新增实体
     *
     * */
    $scope.entity = {};


    /***
     *
     * 新增窗口配置
     *
     *
     * */
    $scope.windownInfo = {
        title: "",
        url: ""
    };


    /**
     *
     * 是否是更新操作
     *
     * */
    $scope.isUpdate = false;


    /**
     *
     * 分页插件配置
     *
     * **/
    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 10,
        itemsPerPage: 10,
        pagesLength: 10,
        perPageOptions: [10, 20, 30],
        onChange: function () {
            $scope.refreshPage();
        }
    };


    /**
     *
     * 刷新
     *
     * **/
    $scope.refreshPage = function () {
        $scope.findPage($scope.paginationConf.currentPage, 10);
    };


    /**
     *
     * 新增实体界面
     *
     * **/
    $scope.modalInsertUi = function () {
        layer.open({
            type: 2,
            title: $scope.windownInfo.title,
            area: ['830px', '450px'], //宽高
            fix: false, //不固定
            maxmin: true,
            skin: 'demo-class',
            content: $scope.windownInfo.url
        });
    };


    /**
     *
     * 删除实体
     *
     * **/
    $scope.deleteEntity = function () {
        if ($scope.selectIds.length === 0) {
            swal({title: "温馨提示", text: "请选择表格中的某一条记录"});
            return;
        }
        swal({
            title: "您确定要删除吗",
            text: "删除后将无法恢复，请谨慎操作！",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1BB495",
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            closeOnConfirm: false
        }, function () {
            $scope.delete();
            swal({
                title: "删除成功!",
                text: "您已经永久删除了这条信息。",
                type: "success",
                timer: 500
            });
        });
    };


    /***
     *
     * 编辑实体
     *
     * */
    $scope.updateEntity = function () {
        if ($scope.selectIds.length === 0) {
            swal({title: "温馨提示", text: "请选择表格中的某一条记录"});
            return;
        }
        if ($scope.selectIds.length >= 2) {
            swal({title: "温馨提示", text: "编辑的时候,只能对单行数据进行编辑"});
            return;
        }
        // var params = 111;
        layer.open({
            type: 2,
            title: $scope.windownInfo.title,
            area: ['830px', '450px'], //宽高
            fix: false, //不固定
            maxmin: true,
            skin: 'demo-class',
            content: $scope.windownInfo.url + "?id=" + $scope.selectIds[0],
        });
    };


    /**
     *
     * 关闭窗口
     *
     * */
    $scope.closeDialog = function () {
        parent.layer.closeAll();
    };


    /**
     *
     * 处理CheckBox选中和非选中
     *
     * */
    $scope.checkItem = function ($event, item) {
        var checkbox = $event.target;
        if (!checkbox.checked) {
            var index = $scope.selectIds.indexOf(item.id);
            $scope.selectIds.splice(index, 1);
        } else {
            $scope.selectIds.push(item.id);
        }
    };


    /**
     *
     * 判断insert
     *
     * */
    $scope.judgeInsertOrUpdate = function () {
        var param = getQueryString("id");
        if (param.length !== 0) {
            $scope.findOneEntity(param);
            $scope.isUpdate = true;
        } else {
            $scope.isUpdate = false;
        }

    }


});
