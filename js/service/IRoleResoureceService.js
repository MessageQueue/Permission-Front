//服务层
app.service('IRoleResoureceService',function($http){

    //读取列表数据绑定到表单中
    this.findAll=function(){
        return $http.get('http://localhost:9090/roleresourece/all');
    }
    //分页
    this.findPage=function(page,rows){
        return $http.get('http://localhost:9090/roleresourece/list?page='+page+'&rows='+rows);
    }
    //查询实体
    this.findOne=function(id){
        return $http.get('http://localhost:9090/roleresourece/find?id='+id);
    }
    //增加
    this.add=function(entity){
        return  $http.post('http://localhost:9090/roleresourece/add',entity );
    }
    //修改
    this.update=function(entity){
        return  $http.post('http://localhost:9090/roleresourece/update',entity );
    }
    //删除
    this.dele=function(ids){
        return $http.get('http://localhost:9090/roleresourece/del?ids='+ids);
    }
    //搜索
    this.search=function(page,rows,searchEntity){
        return $http.post('http://localhost:9090/roleresourece/search.do?page='+page+"&rows="+rows, searchEntity);
    }
});
