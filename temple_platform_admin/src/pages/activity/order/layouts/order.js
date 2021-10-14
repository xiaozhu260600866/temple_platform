export default {
	data: {
		"listsAction": "",
		"pageSize": 30,
		"canCreate": 0,
		"canEdit": 0,
		canupload:false,
		classUrl:"",
		createEditLabel:"110px",
		createEditDiagWidth:'900px',
		"tableName": "activity_orders",
        exportUrl:"/admin/activity/order-lists?excel=1",
		// "createAction": "/admin/activity/create",
		// "editAction": "/admin/activity/edit",
		"checkAll": true,
		//"putaway":'/admin/project/edit-field-all',
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

		],
		"tarbars": {
		    "prop": "amount",
		    "data": [{
		        "name": "",
		        "value": "1",
		        "count": 0,
		        "label": "一天"
		    }, {
		        "name": "",
		        "value": "30",
		        "count": 0,
		        "label": "30天"
		    },{
		        "name": "",
		        "value": "180",
		        "count": 0,
		        "label": "180天"
		    },{
		        "name": "",
		        "value": "365",
		        "count": 0,
		        "label": "一年"
		    }, ]
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
            	"prop": "amount",
            	"width": "140",
            	"append_table_": 0,
            	"label": "金额"
            },
            {
                "name": "",
                "prop": "surname",
                "width": "80",
                "align": "center",
                "type":"sort",
                "url":"/admin/activity/orderEditField",
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
                "align": "center",
                "type":"sort",
                "url":"/admin/activity/orderEditField",
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
                "width": "180",
                "align": "center",
                "type":"sort",
                "url":"/admin/activity/orderEditField",
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
                "width": "200",
                "align": "center",
                "type":"sort",
                "url":"/admin/activity/orderEditField",
                "label": "地址"
            },
			{
			    "name": "",
			    "prop": "created_at",
			    "width": "200",
			    "align": "center",
			  	"label": "支付时间"
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
