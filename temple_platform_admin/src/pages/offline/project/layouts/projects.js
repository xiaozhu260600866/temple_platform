export default {
	data: {
		"listsAction": "",
		"pageSize": 30,
		"canCreate": 1,
		"canEdit": 1,
		online:0,
		canupload:false,
		classType:1,
		classUrl:"",
		createEditLabel:"110px",
		createEditDiagWidth:'900px',
		"tableName": "projects",
		"createAction": "/admin/project/create",
		"editAction": "/admin/project/edit",
		 classAction:'/admin/project/',
		"checkAll": true,
		//"putaway":'/admin/project/edit-field-all',
		"searchFields": [
		  {
			"name": "",
			"prop": "name",
			"type": "text",
			"label": "捐赠项目名称"
		},
	   /* {
			"name": "",
			"prop": "user_name",
			"type": "text",
			"label": "负责人名称"
		}, */

		],
		"tarbars": {
			"prop": "putaway",
			"data": [{
				"name": "",
				"value": "1",
				"count": 0,
				"label": "上架"
			}, {
				"name": "",
				"value": "0",
				"count": 0,
				"label": "下架"
			}, ]
		},
		"tableFields": [
			{"name": "","prop": "name","minWidth": "180","width": "","append_table_": 0,"label": "捐赠项目"},
			{"name": "","prop": "fclassName","minWidth": "100","width": "","append_table_": 0,"label": "分类名"},
			{"name": "","prop": "putaway","minWidth": "","width": "100","align":"center","type":"editField","url":"/admin/project/editField","label": "上架/下架"},
			{"name": "","prop": "price2","minWidth": "","width": "100","append_form_": 0,"label": "价格"},
			{"name": "","prop": "sort","minWidth": "","width": "80", "type":"sort", "url":"/admin/project/editField","append_table_sort": 0,"label": "排序"},
	   /* {
			"name": "",
			"prop": "sort",
			"minWidth": "180",
			"width": "",
			"append_table_sort": 0,
			"label": "排序"
		}, */
	   ],
		"formFields": [
		   {
			"name": "",
			"prop": "name",
			"datatype": "require",
			"type": "text",
			'style':"width:200px",
			"append_form_": 0,
			"label": "捐赠项目名称"
		},
		{
			"name": "",
			"prop": "price2",
			"datatype": "require|price",
			"type": "text",
			'style':"width:200px",
			"append_form_": 0,
			"label": "价格"
		},

		{
			"name": "",
			"prop": "fclass",
			"datatype": "require",
			"type": "select",
			"datakey":"ProjectClass",
			"append_form_": 0,
			"label": "分类"
		},
		{
			"name": "",
			"prop": "sort",
			"datatype": "require|number",
			"type": "text",
			"style":"width:60px",
			"defaultValue":0,
			"append_form_": 0,
			"label": "排序"
		},
	   ]
	}
}
