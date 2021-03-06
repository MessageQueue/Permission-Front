//服务层
app.service('IDeptService', function ($http) {

    //读取列表数据绑定到表单中
    this.findAll = function () {
        return $http.get('http://localhost:9090/dept/all');
    };
    //分页
    this.findPage = function (page, rows) {
        return $http.get('http://localhost:9090/dept/list?page=' + page + '&rows=' + rows);
    };
    //查询实体
    this.findOne = function (id) {
        return $http.get('http://localhost:9090/dept/find?id=' + id);
    };
    //增加
    this.add = function (entity) {
        return $http.post('http://localhost:9090/dept/add', entity);
    };
    //修改
    this.update = function (entity) {
        return $http.post('http://localhost:9090/dept/update', entity);
    };
    //删除
    this.delete = function (ids) {
        return $http.get('http://localhost:9090/dept/del?ids=' + ids);
    };
    //搜索
    this.search = function (page, rows, searchEntity) {
        return $http.post('http://localhost:9090/dept/search.do?page=' + page + "&rows=" + rows, searchEntity);
    };
    //查找树形结构
    this.searchTree = function (levelId) {
        return $http.get('http://localhost:9090/dept/tree?levelId' + levelId);
    };

    //查找所有节点
    this.findAllTreeNode = function () {
        return $http.get('http://localhost:9090/dept/tree/list');
    };


});
