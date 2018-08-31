app.controller("DeptController", function ($scope, $controller, IDeptService) {


    $controller("baseController", {$scope: $scope});
    $scope.windownInfo.title = "部门管理";
    $scope.windownInfo.url = "../../views/dept/dept-add.html";

    $scope.searchEntity = {};
    $scope.treeEntity = [];

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
                $scope.entity.status = String($scope.entity.status);
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
        if ($scope.pageType !== "index") {
            $scope.getTreeNodes();
        }
        $("#deptTree").click(function (event) {
            var treeView = $("#treeView");
            treeView.slideToggle();
            event.stopPropagation();
            treeView.jstree({
                core: {data: $scope.treeEntity}
            });
            $(document).click(function (e) {
                if (treeView.css('display') === 'block') {
                    treeView.slideUp();
                }
            });
            treeView.click(function (event) {
                event = event || window.event;
                event.stopPropagation();
            });
            treeView.bind("activate_node.jstree", function (event, e) {
                var currentNode = e.node;
                console.log(currentNode.text);
                console.log(currentNode.id);

                $scope.entity.parentName = currentNode.text;
                $scope.entity.pId = getTreeJsId(currentNode.id)
                $scope.$apply();
            });
        });

    });


    /**
     *
     * 获取节点数据
     *
     * */
    $scope.getTreeNodes = function () {
        IDeptService.findAllTreeNode().then(function (response) {
            var models = response.data.data;
            var rootNode = {
                id: factoryTreeJsId(models.id),
                text: models.name,
                icon: models.hasChild ? "fa fa-folder" : "fa fa-file-text-o",
                children: [],
                state: {
                    "opened": true
                }
            };
            $scope.loopChildNodes(models, rootNode);
            $scope.treeEntity.push(rootNode);
        });
    };


    /**
     *
     * 便利数据中的元素
     *
     * */
    $scope.loopChildNodes = function (parentNode, rootNode) {
        for (var i = 0; i < parentNode.childs.length; i++) {
            var childNode = parentNode.childs[i];
            var id = factoryTreeJsId(childNode.id);
            var model = {
                id: id,
                text: childNode.name,
                icon: childNode.hasChild ? "fa fa-folder" : "fa fa-file-text-o",
                children: [],
                state: {
                    "opened": true
                }
            };
            rootNode.children.push(model);
            $scope.loopChildNodes(childNode, rootNode.children[i]);
        }
    }


});