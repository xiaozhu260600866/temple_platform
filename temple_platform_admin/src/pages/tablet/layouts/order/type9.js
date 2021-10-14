export default {
	data: {
		"listsAction": "",
		"pageSize": 60,
		"canCreate": 0,
		"canEdit": 0,
		"tableName": "tablet_order_infos",
		"createAction": "",
		exportUrl:"/admin/tablet/order-lists?status=3&excel=1&type=9",
		"editAction": "/admin/tablet/order-edit",
		"checkAll": true,
		"canDel":true,
		"tarbars": {
			"prop": "status",
			"data": [{
				"value": "3",
				"label": "已支付"
			}, {
				"name": "",
				"label": "待支付"
			}, ]
		},
		"searchFields": [
			{
				"prop": "order_no",
				"label": "订单编号"
			},
            {
            	"prop": "no",
            	"label": "编号"
            },
			{
				"prop": "nickname",
				"label": "微信呢称"
			},
			{
				"prop": "tablet_id",
				"type": "select",
				"datakey":"projectArr",
				"label": "牌位名称"
			},
			{
				"prop": "created_at",
				"type": "betweenDate",
				"label": "日期查询"
			},
			{
				"prop": "phone",
				"type": "text",
				"label": "电话号码"
			},
			{
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
				"prop": "order_no",
				"width": "120",
				"label": "订单号"
			},
			{
				"prop": "no",
				"width": "80",
				"align":"center",
				"label": "编号"
			},
				{
				"prop": "tablet_name",
				"minWidth": "100",
				"label": "牌位名称"
			},
			{
				"prop": "amount",
				"width": "100",
				"label": "金额"
			},
			{
				"prop": "nickname",
				"width": "100",
				"label": "呢称"
			},
			// {
			//     "prop": "name",
			//     "width": "100",
			//     "label": "疾病名"
			// },
			{
			    "name": "",
			    "prop": "yname",
			    "width": "80",
			    "align": "center",
			    "type":"sort",
			    "url":"/admin/tablet/orderEditField",
			    "label": "阳上人"
			},
			{
			    "name": "",
			    "prop": "address",
			    "width": "250",
			    "align": "center",
			    "type":"sort",
			    "url":"/admin/tablet/orderEditField",
			    "label": "地址"
			},
			{
			    "name": "",
			    "prop": "phone",
			    "width": "100",
			    "align": "center",
			    "type":"sort",
			    "url":"/admin/tablet/orderEditField",
			    "label": "电话"
			},
			{
				"prop": "created_at",
				"width": "100",
				"label": "时间"
			},
		],
		formFields:[
			{
				"prop": "tablet_name",
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
				"label": "手机"
			},
			{
				"prop": "door",

				"type": "text",
				'style':"width:200px",
				"label": "某门"
			},
			{
				"prop": "bless_address",

				"type": "text",
				'style':"width:200px",
				"label": "登记人地址"
			},
			{
				"prop": "cd_content",

				"type": "text",
				'style':"width:200px",
				"label": "超度内容"
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
