export default {
	data: {
		"listsAction": "",
		"pageSize": 60,
		"canCreate": 0,
		"canEdit": 0,
		"tableName": "tablet_order_infos",
		"createAction": "",
		"exportUrl":"/admin/tablet/order-lists?status=3&excel=1&type=5",
		"editAction": "/admin/tablet/order-edit",
		"checkAll": true,
		"canDel":false,
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
			{
				"prop": "yname",
				"width": "100",
				"label": "阳上人",
			},
			{
				"prop": "yname2",
				"width": "100",
				"label": "阳上人",
			},
			{
				"prop": "name",
				"width": "80",
				"align":"center",
				"label": "男方姓氏",
			},
			{
				"prop": "name2",
				"width": "80",
				"align":"center",
				"label": "女方姓氏",
			},
			{
				"prop": "selectType",
				"width": "90",
				"align":"center",
				"label": "类型",
			},
			{
				"prop": "address",
				"minWidth": "120",
				"label": "地址"
			},
			{

				"prop": "phone",
				"width": "100",
				"label": "电话"
			},
           {
				"name": "",
				"prop": "printf",
				"minWidth": "",
				"width": "80",
				"align":"center",
				"type":"editField",
				"url":"/admin/tablet/orderEditField",
				"label": "打印状态"
			},
			{
				"name": "",
				"prop": "printf_text",
				"minWidth": "",
				"width": "180",
				"align":"center",
				"type":"sort",
				"url":"/admin/tablet/orderEditField",
				"label": "打印文字"
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
				"disabled":true,
				'style':"width:200px",
				"label": "项目名称"
			},
			{
				"prop": "amount",
				"datatype": "require",
				"type": "text",
				"disabled":true,
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
