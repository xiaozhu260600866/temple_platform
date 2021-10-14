export default {
	data: {
		"listsAction": "",
		"pageSize": 60,
		"canCreate": 0,
		"canEdit": 0,
		"tableName": "dinner_tickets",
		"createAction": "",
		//auditAction:'/admin/project/ticket-status',
		//exportUrl:"/admin/project/export",
		//"editAction": "/admin/project/order-edit",
		"checkAll": true,
		"canDel":true,
		"tarbars": {
			"prop": "status",
			"data": [{
				"name": "",
				"value": "0",
				"count": 0,
				"label": "待使用"
			}, {
				"name": "",
				"value": "1",
				"count": 0,
				"label": "已使用"
			},
			 {
			 	"name": "",
			 	"value": "2",
			 	"count": 0,
			 	"label": "已过期"
			 },]
		},
		"searchFields": [
		  {
			"name": "",
			"prop": "order_no",
			"type": "text",
			"label": "订单编号"
		},
		
		{
			"name": "",
			"prop": "project_id",
			"type": "select",
			"datakey":"projectArr",
			"label": "项目名称"
		},
		{
			"name": "",
			"prop": "phone",
			"type": "text",
			"label": "功德主手机"
		},
		{
			"name": "",
			"prop": "bless_name",
			"type": "text",
			"label": "功德主姓名"
		},
	
		{
			"name": "",
			"prop": "created_at",
			"type": "betweenDate",
			"label": "日期查询"
		},
		{
			"name": "",
			"prop": "searchType",
			"type": "searchYear",
			children:[
				{prop:'today',label:'今日'},
				{prop:'thismonth',label:'本月'},
				{prop:'thisyear',label:'本年'},
			],
		},

		],
		"tableFields": [
			
			{
				"name": "",
				"prop": "order_no",
				"minWidth": "",
				"width": "130",
				"append_table_": 0,
				"label": "订单号"
			},
			{
				"name": "",
				"prop": "name",
				"minWidth": "150",
				"width": "",
				"append_table_": 0,
				"label": "套券项目"
			},
			{
				"name": "",
				"prop": "amount",
				"minWidth": "",
				"width": "90",
				"align": "center",
				"append_table_": 0,
				"label": "金额"
			},
			{
				"name": "",
				"prop": "getUser.username",
				"minWidth": "",
				"width": "100",
				"append_table_": 0,
				"label": "呢称"
			},
			
			{
				"name": "",
				"prop": "phone",
				"minWidth": "",
				"width": "115",
				"append_table_": 0,
				"label": "功德主手机"
			},
			{
				"name": "",
				"prop": "bless_name",
				"minWidth": "",
				"width": "115",
				"append_table_": 0,
				"label": "功德主姓名"
			},
			{
				"name": "",
				"prop": "bless_address",
				"minWidth": "100",
				"width": "",
				"append_table_": 0,
				"label": "登记人地址"
			},
				 // { 'prop': 'status', 'minWidth': '', 'width': '90', 'align': 'center', 'type': 'editField', 'url': '/admin/project/dinner-ticket-status', 'label': '未/已核消' },
			{
				"name": "",
				"prop": "created_at",
				"minWidth": "",
				"width": "165",
				"append_table_": 0,
				"label": "订单日期"
			},
			{
				"name": "",
				"prop": "finish_date",
				"minWidth": "",
				"width": "165",
				"append_table_": 0,
				"label": "使用日期"
			},
		],
		formFields:[
			{
				"prop": "project_name",
				"datatype": "require",
				"type": "text",
				 disabled:true,
				'style':"width:200px",
				"label": "项目名称"
			},
			{
				"prop": "amount",
				"datatype": "require",
				"type": "text",
				 disabled:true,
				'style':"width:200px",
				"label": "金额"
			},
			{
				"prop": "phone",
				"datatype": "",
				"type": "text",
				'style':"width:200px",
				"label": "功德主手机"
			},
			{
				"prop": "bless_name",

				"type": "text",
				'style':"width:200px",
				"label": "功德主姓名"
			},
			{
				"prop": "bless_address",

				"type": "text",
				'style':"width:200px",
				"label": "登记人地址"
			},
			{
				"prop": "is_post",
			
				"type": "text",
				'style':"width:200px",
				"label": "是否邮寄",
				append_form_is_post:1
			},
			{
				"prop": "remark",

				"type": "textarea",
				'style':"width:200px",
				"label": "备注"
			},
			{
				"prop": "evaluate",

				"type": "textarea",
				'style':"width:200px",
				"label": "回向文"
			},

		]

	}
}
