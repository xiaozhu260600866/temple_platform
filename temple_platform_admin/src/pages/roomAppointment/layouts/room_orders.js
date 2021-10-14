export default {
	data: {
		"listsAction": "",
		"pageSize": 60,
		"canCreate": 0,
		"canEdit": 1,
		"tableName": "room_appointment_orders",
		"createAction": "",
		"exportUrl":"/admin/project/export",
		"editAction": "/admin/project/order-edit",
		"checkAll": true,
		"canDel":false,
		// "tarbars": {
		// 	"prop": "status",
		// 	"data": [{
		// 		"name": "",
		// 		"value": "3",
		// 		"count": 0,
		// 		"label": "已支付"
		// 	}, {
		// 		"name": "",
		// 		"value": "0",
		// 		"count": 0,
		// 		"label": "未支付"
		// 	}, ]
		// },
		"searchFields": [
			{"name": "","prop": "order_no","type": "text","label": "订单编号"},
			{"name": "","prop": "nickname","type": "text","label": "微信呢称"},
			{"name": "","prop": "phone","type": "text","label": "手机"},
			{"name": "","prop": "name","type": "text","label": "姓名"},
			{"name": "","prop": "created_at","type": "betweenDate","label": "日期查询"},
			{"name": "","prop": "searchType","type": "searchYear",
				children:[
					{prop:'today',label:'今日'},
					{prop:'thismonth',label:'本月'},
					{prop:'thisyear',label:'本年'},
				],
			},
		],
		"tableFields": [
			{"name": "","prop": "order_no","minWidth": "","width": "130","append_table_": 0,"label": "订单号"},
			{"name": "","prop": "room.name","minWidth": "120","width": "","append_table_": 0,"label": "房间类别"},
			{"name": "","prop": "start_date","minWidth": "","width": "110","align": "center","append_table_": 0,"label": "入住日期"},
			// {"name": "","prop": "start_date","minWidth": "","width": "80","align": "center","append_table_": 0,"label": "入住人数"},
			{"name": "","prop": "num","minWidth": "","width": "80","align": "center","append_table_": 0,"label": "房间数量"},
			{"name": "","prop": "amount","minWidth": "","width": "90","align": "center","append_table_": 0,"label": "金额"},
			{"name": "","prop": "nickname","minWidth": "80","width": "","append_table_": 0,"label": "呢称"},
			{"name": "","prop": "name","minWidth": "","width": "100","append_table_": 0,"label": "姓名"},
			{"name": "","prop": "phone","minWidth": "","width": "115","append_table_": 0,"label": "手机"},
			{"name": "","prop": "house.name","minWidth": "","width": "100","append_table_": 0,"label": "房号"},
			{"name": "","prop": "status_message","minWidth": "","width": "100","append_table_": 0,"label": "状态"},
			{"name": "","prop": "created_at","minWidth": "","width": "165","append_table_": 0,"label": "时间"},
		],
		formFields:[
			{"prop": "project_name","datatype": "require","type": "text", "disabled":true,'style':"width:200px","label": "项目名称"},
			{"prop": "amount","datatype": "require","type": "text", "disabled":true,'style':"width:200px","label": "金额"},
			{"prop": "phone","datatype": "","type": "text",'style':"width:200px","label": "功德主手机"},
			{"prop": "bless_name","type": "text",'style':"width:200px","label": "功德主姓名"},
			{"prop": "bless_address","type": "text",'style':"width:200px","label": "登记人地址"},
			{"prop": "is_post","type": "text",'style':"width:200px","label": "是否邮寄","append_form_is_post":1},
			{"prop": "remark","type": "textarea",'style':"width:200px","label": "备注"},
			{"prop": "evaluate","type": "textarea",'style':"width:200px","label": "回向文"},
		]
	}
}
