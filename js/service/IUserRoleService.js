//服务层
app.service('IUserRoleService',function($http){

    //读取列表数据绑定到表单中
    this.findAll=function(){
        return $http.get('http://localhost:9090/userrole/all');
    }
    //分页
    this.findPage=function(page,rows){
        return $http.get('http://localhost:9090/userrole/list?page='+page+'&rows='+rows);
    }
    //查询实体
    this.findOne=function(id){
        return $http.get('http://localhost:9090/userrole/find?id='+id);
    }
    //增加
    this.add=function(entity){
        return  $http.post('http://localhost:9090/userrole/add',entity );
    }
    //修改
    this.update=function(entity){
        return  $http.post('http://localhost:9090/userrole/update',entity );
    }
    //删除
    this.dele=function(ids){
        return $http.get('http://localhost:9090/userrole/del?ids='+ids);
    }
    //搜索
    this.search=function(page,rows,searchEntity){
        return $http.post('http://localhost:9090/userrole/search.do?page='+page+"&rows="+rows, searchEntity);
    }
});
