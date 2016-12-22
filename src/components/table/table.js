define(['knockout', 'text!./table.html', 'jquery'], function (ko, templateMarkup, $) {
    //create time:2016-12-20
    function tableViewModel(params) {

        var self = this;
        //前台数据
        //数据模型数组
        // self.memberTable = ko.observableArray([]);
        //标题数组
        self.column = ko.observableArray([]);
        //数组处理1
        self.memList = [];
        //数组处理寄存器
        self.contentList = [];
        self.listA = [];
        self.listB = ko.observableArray([]);
        //显示数组        
        self.showList = [];
        //翻页信息
        self.pageIndex = ko.observable(0);
        self.pageSize = ko.observable();
        self.pageNum = ko.observable();
        self.goPage = ko.observable(1);
        self.firstPage = ko.observable(0);
        self.selectPage = ko.observableArray([]);
        //分页方法
        self.lastPage = function () {
            self.pageIndex(self.pageIndex()--);
            self.loadTableInfo(self.pageIndex());
        }
        self.nextPage = function () {
            self.pageIndex(self.pageIndex()++);
            self.loadTableInfo(self.pageIndex());
        }
        self.turnToPage = function () {
            self.pageIndex(self.goPage() - 1);
            self.loadTableInfo(self.pageIndex());
        }

        loadData();
        function loadData() {
            $.ajax({
                url: "../server/postdata.json"
            }).done(function (data) {
                self.loadTableInfo(self.pageIndex(), data);
            });
        }
        //读取数据
        self.loadTableInfo = function (pageI, data) {
            self.selectPage([]);
            self.listB([]);
            self.pageIndex(data.pageIndex);
            self.pageSize(data.pageSize);
            self.pageNum(Math.ceil((data.pageNum) / self.pageSize()));
            var ax = self.pageIndex() - 3;
            if (ax <= 0) {
                ax = 1;
            }
            for (var i = 0; i < 9; i++) {
                self.selectPage.push(ax);
                ax++;
            }
            //封装标题栏
            $.each(data.title, function (i, v) {
                self.column.push(new ColumnModel(v));
            });
            //开始处理内容
            $.each(data.memlist, function (index, value) {
                $.each(value, function (i, v) {
                    self.contentList.push(new Content(i, v))
                })
                self.memList.push(new MemModel(self.contentList));
                self.contentList = [];
                // self.memberTable.push(new MemberModel(value));

            });
            //循环建立数组
            for (var j = 0; j < self.memList.length; j++) {
                for (var i = 0; i < self.column().length; i++) {
                    for (var k = 0; k < self.memList[j].length; k++) {
                        if (self.column()[i].fieldName == self.memList[j][k].fieldName) {
                            self.listA.push(self.memList[j][k].value);
                            break;
                        }
                    }
                }
                self.listB.push(new MemModel(self.listA));
                self.listA = [];
            }

        }
        // self.loadTableInfo();

        function ColumnModel(data) {
            var self = this;
            self.text = data.text;
            self.fieldName = data.fieldname;
        }
        function MemModel(a) {
            return a;
        }
        function Content(a, b) {
            var self = this;
            self.fieldName = a;
            self.value = b;
        }
    }
    tableViewModel.prototype.dispose = function () { };
    return { viewModel: tableViewModel, template: templateMarkup };
});





