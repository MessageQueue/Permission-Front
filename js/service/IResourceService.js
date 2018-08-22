//服务层
app.service('IResourceService', function ($http) {

    //读取列表数据绑定到表单中
    this.findAll = function () {
        return $http.get('http://localhost:9090/resource/all');
    };
    //分页
    this.findPage = function (page, rows) {
        return $http.get('http://localhost:9090/resource/list?page=' + page + '&rows=' + rows);
    };
    //查询实体
    this.findOne = function (id) {
        return $http.get('http://localhost:9090/resource/find?id=' + id);
    };
    //增加
    this.add = function (entity) {
        return $http.post('http://localhost:9090/resource/add', entity);
    };
    //修改
    this.update = function (entity) {
        return $http.post('http://localhost:9090/resource/update', entity);
    };
    //删除
    this.delete = function (ids) {
        return $http.get('http://localhost:9090/resource/del?ids=' + ids);
    };
    //搜索
    this.search = function (page, rows, searchEntity) {
        return $http.post('http://localhost:9090/resource/search.do?page=' + page + "&rows=" + rows, searchEntity);
    };
});
