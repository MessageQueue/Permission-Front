app.controller("baseController", function ($scope) {
    //选中的元素
    $scope.selectIds = [];
    $scope.entitys = [];

    //新增窗口相关配置
    $scope.windownInfo = {
        title: "",
        url: ""
    };


    $scope.paginationConf = {
        currentPage: 1,
        totalItems: 8000,
        itemsPerPage: 15,
        pagesLength: 10,
        perPageOptions: [5, 10, 15, 20],
        onChange: function () {
            // var nowPage = $scope.paginationConf.currentPage;
            // var pageSize = $scope.paginationConf.pagesLength;
            // $scope.findPage(nowPage, pageSize);
            $scope.refreshPage();
        }
    };


    $scope.refreshPage = function () {
        console.log("bbbb");
        $scope.findPage($scope.paginationConf.currentPage, $scope.paginationConf.pagesLength);
        console.log("cccc");

    };


    //表格相关配置
    $scope.pageInfo = {
        options: {
            icons: {
                refresh: 'glyphicon-refresh icon-refresh',
                toggle: 'glyphicon-list-alt',
                columns: 'glyphicon-list'
            },
            showRefresh: true,
            striped: true,
            iconSize: 'outline',
            search: true,
            cache: false,
            showColumns: true,
            checkboxHeader: false,
            showHeader: true,
            sidePagination: "server",
            toolbar: "#toolbar",
            searchOnEnterKey: true,
            pagination: true,
            pageNumber: 1,
            pageSize: 10,
            pageList: [5, 10, 20, 50],
            selected: [],
            minimumCountColumns: 3,
            onCheck: function (row) {
                $scope.selectIds.push(row.id);
                $scope.$apply();
            },
            onUncheck: function (row) {
                var index = $scope.selectIds.indexOf(row.id);
                $scope.selectIds.splice(index, 1);
                $scope.$apply();
            },
            onRefresh: function () {
                console.log("cccc");
                // $scope.findAll(param);
                // $scope.findPage($scope.pageInfo.options.pageNumber, $scope.pageInfo.options.pageSize);
            },
            ajax: function (param) {
                $scope.findAll(param);
            }
        }
    };
    $scope.addItem = function () {
        layer.open({
            type: 2,
            title: $scope.windownInfo.title,
            area: ['830px', '450px'], //宽高
            fix: false, //不固定
            maxmin: true,
            content: $scope.windownInfo.url
        });
    };
    $scope.deleteItem = function () {
        if ($scope.selectIds.length === 0) {
            swal({title: "温馨提示", text: "请选择表格中的某一条记录"})
            return;
        }
        $scope.delete();
    };
    $scope.editItem = function () {
        if ($scope.selectIds.length === 0) {
            swal({title: "温馨提示", text: "请选择表格中的某一条记录"});
        }
    };
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
     *
     * 获取当前第几页
     *
     *
     * */
    $scope.getCurrentPageIndex = function (offset) {
        var current = (offset / $scope.pageInfo.options.pageSize) + 1;
        return current;
    }

});
