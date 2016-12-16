ko.components.register('m-table', {
    viewModel: function (params) {
        var self = this;
        //前台数据
        //数据模型数组
        // self.memberTable = ko.observableArray([]);
        //标题数组
        self.column = [];
        //数组处理1
        self.memList = [];
        //数组处理寄存器
        self.contentList = [];
        self.listA = [];
        self.listB = [];
        //显示数组
        self.showList = [];
        //翻页信息
        self.pageIndex = ko.observable(0);
        self.pageSize = ko.observable();
        self.pageNum = ko.observable();
        self.goPage = ko.observable(1);
        self.firstPage = ko.observable(0);
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


        //读取数据
        self.loadTableInfo = function (pageI) {
            self.listB = [];
            self.pageIndex(params.postdata.pageIndex);
            self.pageSize(params.postdata.pageSize);
            self.pageNum(Math.ceil((params.postdata.pageNum) / self.pageSize()));

            //封装标题栏
            $.each(params.postdata.title, function (i, v) {
                self.column.push(new ColumnModel(v));
            });
            //开始处理内容
            $.each(params.postdata.memlist, function (index, value) {
                $.each(value, function (i, v) {
                    self.contentList.push(new Content(i, v))
                })
                self.memList.push(new MemModel(self.contentList));
                self.contentList = [];
                // self.memberTable.push(new MemberModel(value));

            });
            //循环建立数组
            for (var j = 0; j < self.memList.length; j++) {
                for (var i = 0; i < self.column.length; i++) {
                    for (var k = 0; k < self.memList[j].length; k++) {
                        if (self.column[i].fieldName == self.memList[j][k].fieldName) {
                            self.listA.push(self.memList[j][k].value);
                            break;
                        }
                    }
                }
                self.listB.push(new MemModel(self.listA));
                self.listA = [];
            }

        }
        self.loadTableInfo();
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
        // function MemberModel(data) {
        //     var self = this;
        //     self.id = ko.observable(data.Id);
        //     self.superId = ko.observable(data.superId);
        //     self.name = ko.observable(data.name);
        //     self.remarks = ko.observable(data.remarks);
        // }


    },
    template: '<table style="border:1px #dee1e2 solid;" class="table table-striped">\
        <thead>\
            <tr data-bind="foreach:column">\
                <th data-bind="text:text">\
                </th>\
            </tr>\
        </thead>\
        <tbody data-bind="foreach:listB">\
            <tr data-bind="foreach:$data">\
                <td data-bind="text:$data"></td>\
            </tr>\
        </tbody>\
    </table>\
    <button class="btn btn-info btn-sm" data-bind="click:lastPage,disable:pageIndex()==0"><</button>\
    <button class="btn btn-info btn-sm" data-bind="click:nextPage,enable:pageIndex()<pageNum()">></button>\
    <span style="padding-left:20px"><button class="btn btn-info" style="width:40px;height:28px;padding:0 0 0 1px;" data-bind="click:turnToPage,disable:(goPage()==null||goPage()>(pageNum()+1)||goPage()<1)">跳到</button>\
        <input class="form-control" style="display:inline;width:50px;height:30px;" data-bind="textInput:goPage">页</span>\
        <span style="padding-left:20px">共<span data-bind="text:pageNum()"></span>页</span>'
});

//传入数据模型
var postdata = {
    "title": [{
        text: "姓名",
        fieldname: "name"
    }, {
        text: "编号",
        fieldname: "Id"
    }, {
        text: "上级编号",
        fieldname: "superId"
    }, {
        text: "备注",
        fieldname: "remarks"
    }],
    "pageIndex": 0,
    "pageSize": 5,
    "pageNum": 7,
    "memlist": [
        {
            "Id": 1,
            "superId": 0,
            "name": "校长",
            "remarks": null
        },
        {
            "Id": 2,
            "superId": 1,
            "name": "副校长",
            "remarks": null
        },
        {
            "Id": 3,
            "superId": 1,
            "name": "政教处主任",
            "remarks": null
        },
        {
            "Id": 4,
            "superId": 3,
            "name": "政教处副主任",
            "remarks": null
        },
        {
            "Id": 5,
            "superId": 1,
            "name": "年级主任",
            "remarks": null
        },
        {
            "Id": 6,
            "superId": 5,
            "name": "授课教师",
            "remarks": null
        },
        {
            "Id": 7,
            "superId": 6,
            "name": "学生",
            "remarks": null
        }
    ]
}




/*
var momo = new showInfoModel();

function showInfoModel() {
    var self = this;
    self.url = 'showTable';
    self.pageIndex = 0;
    self.pageNum = 5;
    self.memberArray = ko.observableArray([
        {
            "Id": 1,
            "superId": 0,
            "name": "校长",
            "remarks": null
        },
        {
            "Id": 2,
            "superId": 1,
            "name": "副校长",
            "remarks": null
        },
        {
            "Id": 3,
            "superId": 1,
            "name": "政教处主任",
            "remarks": null
        },
        {
            "Id": 4,
            "superId": 3,
            "name": "政教处副主任",
            "remarks": null
        },
        {
            "Id": 5,
            "superId": 1,
            "name": "年级主任",
            "remarks": null
        },
        {
            "Id": 6,
            "superId": 5,
            "name": "授课教师",
            "remarks": null
        },
        {
            "Id": 7,
            "superId": 6,
            "name": "学生",
            "remarks": null
        }
    ]);
}
*/


ko.applyBindings();