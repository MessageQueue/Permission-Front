var tableFive = {
    showRefresh: true,
    striped: true,
    icons: {
        refresh: 'glyphicon-refresh icon-refresh',
        toggle: 'glyphicon-list-alt',
        columns: 'glyphicon-list'
    },
    iconSize: 'outline',
    pagination: true,
    pageNumber: 3,
    search: true,
    showColumns: true,
    showHeader: true,
    searchOnEnterKey: true,
    pageSize: 10,
    pageList: [10, 20, 50],
    minimumCountColumns: 3,
    onCheck:function (row) {
        console.log(row);
    }



};