export default {
    data: {
        "listsAction": "",
        "pageSize": 30,
        "canCreate": 1,
        "canEdit": 1,
		online:1,
		classType:1,
        canupload:false,
        classUrl:"",
        createEditLabel:"110px",
        createEditDiagWidth:'900px',
        "tableName": "room_appointments",
        "createAction": "/admin/roomAppointment/create",
        "editAction": "/admin/roomAppointment/edit",
        "checkAll": true,
        //"putaway":'/admin/project/edit-field-all',
        "searchFields": [
          {
            "name": "",
            "prop": "name",
            "type": "text",
            "label": "房间名称"
        },
        ],
        "tableFields": [
           {
            "name": "",
            "prop": "name",
            "minWidth": "180",
            "width": "",
            "append_table_": 0,
            "label": "房间名称"
        },
        {
            "name": "",
            "prop": "num",
            "minWidth": "",
            "width": "100",
            "append_table_": 0,
            "label": "房间数量"
        }, {
            "name": "",
            "prop": "price",
            "minWidth": "",
            "width": "100",
            "append_table_": 0,
            "label": "房间价格"
        },],
        "formFields": [
           {
            "name": "",
            "prop": "name",
            "datatype": "require",
            "type": "text",
            'style':"width:200px",
            "append_form_": 0,
            "label": "房间名称"
        },
		{
		    "name": "",
		    "prop": "num",
		    "datatype": "require|number",
		    "type": "text",
		    'style':"width:200px",
		    "append_form_": 0,
		    "label": "房间数量"
		},
		{
		    "name": "",
		    "prop": "price",
		    "datatype": "require|price",
		    "type": "text",
		    'style':"width:200px",
		    "append_form_": 0,
		    "label": "价格"
		},
		{
		    "name": "",
		    "prop": "remark",
		    "datatype": "require",
		    "type": "text",
		    'style':"width:200px",
		    "append_form_": 0,
		    "label": "简介"
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
		
        {
            "prop": "cover",
            "datatype": "array",
            "type": "upload",
            "append_form_": 0,
            "label": "轮播图",
            "allowUpLoadNum": "5",
            uploadMessage:'图片最佳尺寸是300*300px',
            "upurl": "room"
        },
		{
		    "prop": "thump_pic",
		    "datatype": "array",
		    "type": "upload",
		    "append_form_": 0,
		    "label": "封面",
		    "allowUpLoadNum": "1",
		    uploadMessage:'图片最佳尺寸是300*300px',
		    "upurl": "room"
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
