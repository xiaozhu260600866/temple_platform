export default {
	data: {
		"listsAction": "",
		"pageSize": 30,
		"canCreate": 0,
		"canEdit": 0,
        canDel:0,
		checkAll:true,
		canupload:false,
		classUrl:"",
		createEditLabel:"110px",
		createEditDiagWidth:'900px',
		"tableName": "activity_orders",
		exportUrl:"/admin/activity/order-lists?excel=1",
		// "createAction": "/admin/activity/create",
		// "editAction": "/admin/activity/edit",

		//"putaway":'/admin/project/edit-field-all',
        "tarbars": {
        	"prop": "printf",
        	"data": [{
        		"name": "",
        		"value": "0",
        		"count": 0,
        		"label": "未打印"
        	}, {
        		"name": "",
        		"value": "1",
        		"count": 0,
        		"label": "已打印"
        	}, ]
        },
		 "searchFields": [
		   {
			"name": "",
			"prop": "yname",
			"type": "text",
			"label": "阳上人"
		},
	   {
			"name": "",
			"prop": "phone",
			"type": "text",
			"label": "电话"
		},
        {
        			"name": "",
        			"prop": "no",
        			"type": "text",
        			"label": "牌位编号"
        		},
                {
                	"prop": "created_at",
                	"type": "betweenDate",
                	"label": "日期查询"
                },
                {
                	"prop": "printf",
                	"type": "betweenDate",
                	"label": "打印日期查询"
                },

		],
		"tarbars": {
		    "prop": "amount",
		    "data": [{
		        "name": "",
		        "value": "1",
		        "count": 0,
		        "label": "一天(未打印)"
		    }, {
		        "name": "",
		        "value": "300",
		        "count": 0,
		        "label": "30天"
		    },{
		        "name": "",
		        "value": "1800",
		        "count": 0,
		        "label": "180天"
		    },{
		        "name": "",
		        "value": "3650",
		        "count": 0,
		        "label": "一年"
		    }, {
		        "name": "",
		        "value": "100",
		        "count": 0,
		        "label": "一天(已打印)"
		    }]
		},
		"tableFields": [
			{
				"name": "",
				"prop": "order_no",
				"width": "140",
				"append_table_": 0,
				"label": "订单号"
			},
            {
            	"name": "",
            	"prop": "no",
            	"width": "140",
            	"append_table_": 0,
            	"label": "牌位编号"
            },
			{
				"name": "",
				"prop": "surname",
				"width": "80",
				"append_table_": 0,
				"label": "姓氏"
			},
			{
				"name": "",
				"prop": "fName",
				"width": "80",
				"append_table_": 0,
				"label": "先父"
			},
			{
				"name": "",
				"prop": "mName",
				"width": "80",
				"append_table_": 0,
				"label": "先母"
			},
			{
				"name": "",
				"prop": "yname",
				"width": "100",
				"append_table_sort": 0,
				"label": "阳上人"
			},
			// {
			// 	"name": "",
			// 	"prop": "yname2",
			// 	"width": "100",
			// 	"append_table_sort": 0,
			// 	"label": "阳上人"
			// },
			// {
			// 	"name": "",
			// 	"prop": "yname3",
			// 	"width": "100",
			// 	"append_table_sort": 0,
			// 	"label": "阳上人"
			// },
			// {
			// 	"name": "",
			// 	"prop": "yname4",
			// 	"width": "100",
			// 	"append_table_sort": 0,
			// 	"label": "阳上人"
			// },

			{
				"name": "",
				"prop": "phone",
				"width": "120",
				"append_table_sort": 0,
				"label": "电话"
			},
			{
				"name": "",
				"prop": "evaluate",
				"minWidth": "200",
				"append_table_sort": 0,
				"label": "回向文"
			},
			{
				"name": "",
				"prop": "address",
				"minWidth": "150",
				"append_table_sort": 0,
				"label": "地址"
			},
            // {
            //     "name": "",
            //     "prop": "printf",
            //     "minWidth": "",
            //     "width": "80",
            //     "align":" center",
            //      type:"editField",
            //      url:"/admin/activity/orderEditField",
            //     "label": "打印状态"
            // },
            {
                "name": "",
                "prop": "printf",
                "minWidth": "",
                "width": "80",
                "align":" center",

                "label": "打印次数"
            },
            {
                "name": "",
                "prop": "printf_date",
                "minWidth": "",
                "width": "100",
                "align":" center",
            
                "label": "打印日期"
            },
		],
		"formFields": [
		   {
			"name": "",
			"prop": "name",
			"datatype": "require",
			"type": "text",
			'style':"width:200px",
			"append_form_": 0,
			"label": "活动名称"
		},

		{
			"name": "",
			"prop": "amount",
			"datatype": "require|price",
			"type": "text",
			"style":"width:100px",
			"label": "金额"
		},

		{
			"prop": "cover",
			"datatype": "array",
			"type": "upload",
			"append_form_": 0,
			"label": "轮播图",
			 uploadMessage:'图片最佳尺寸是800*450px',
			"allowUpLoadNum": "5",
			"upurl": "project"
		},

		{
			"name": "",
			"prop": "evaluate",
			"datatype": "require",
			"type": "textarea",
			"style":"height:80px",
			"append_form_": 0,
			"label": "回向文"
		},

		{
			"name": "",
			"prop": "content",
			"datatype": "",
			"type": "editor",
			"style":"",
			"append_form_": 0,
			"label": "详情"
		},
	   ]
	}
}
