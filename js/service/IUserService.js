//服务层
app.service('IUserService',function($http){

    //读取列表数据绑定到表单中
    this.findAll=function(){
        return $http.get('http://localhost:9090/user/all');
    }
    //分页
    this.findPage=function(page,rows){
        return $http.get('http://localhost:9090/user/list?page='+page+'&rows='+rows);
    }
    //查询实体
    this.findOne=function(id){
        return $http.get('http://localhost:9090/user/find?id='+id);
    }
    //增加
    this.add=function(entity){
        return  $http.post('http://localhost:9090/user/add',entity );
    }
    //修改
    this.update=function(entity){
        return  $http.post('http://localhost:9090/user/update',entity );
    }
    //删除
    this.dele=function(ids){
        return $http.get('http://localhost:9090/user/del?ids='+ids);
    }
    //搜索
    this.search=function(page,rows,searchEntity){
        return $http.post('http://localhost:9090/user/search.do?page='+page+"&rows="+rows, searchEntity);
    }
});
