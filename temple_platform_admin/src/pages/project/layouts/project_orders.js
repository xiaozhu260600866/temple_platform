export default {
	data: {
		"listsAction": "",
		"pageSize": 60,
		"canCreate": 0,
		"canEdit": 1,
		"tableName": "project_orders",
		"createAction": "",
		exportUrl:"/admin/project/export",
		"editAction": "/admin/project/order-edit",
		"checkAll": true,
		"canDel":false,
		"tarbars": {
			"prop": "status",
			"data": [{
				"name": "",
				"value": "3",
				"count": 0,
				"label": "已支付"
			}, {
				"name": "",
				"value": "0",
				"count": 0,
				"label": "未支付"
			}, ]
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
			"prop": "nickname",
			"type": "text",
			"label": "微信呢称"
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
				"width": "100",
				"append_table_": 0,
				"label": "订单号"
			},
			{
				"name": "",
				"prop": "projects.name",
				"minWidth": "120",
				"width": "",
				"append_table_": 0,
				"label": "捐赠项目"
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
				"prop": "user.username",
				"minWidth": "",
				"width": "100",
				"append_table_": 0,
				"label": "呢称"
			},
			{
				"name": "",
				"prop": "post_address",
				"minWidth": "",
				"width": "100",
				"append_table_post_address": 1,
				"label": "邮寄/地址"
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
				"minWidth": "",
				"width": "115",
				"append_table_": 0,
				"label": "登记人地址"
			},
			{
				"name": "",
				"prop": "remark",
				"minWidth": "170",
				"width": "",
				"append_table_": 0,
				"label": "备注"
			},
			{
				"name": "",
				"prop": "evaluate",
				"minWidth": "170",
				"width": "",
				"append_table_": 0,
				"label": "回向文"
			},
			{
				"name": "",
				"prop": "created_at",
				"minWidth": "",
				"width": "100",
				"append_table_": 0,
				"label": "时间"
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
