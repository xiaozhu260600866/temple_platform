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
        "tableName": "projects",
        "createAction": "/admin/merchant/create",
        "editAction": "/admin/merchant/edit",
        "checkAll": true,
        //"putaway":'/admin/project/edit-field-all',
        "searchFields": [
          {
            "name": "",
            "prop": "company_name",
            "type": "text",
            "label": "商家名称"
        },
		{
		    "name": "",
		    "prop": "phone",
		    "type": "text",
		    "label": "商家电话"
		},
		{
		    "name": "",
		    "prop": "name",
		    "type": "text",
		    "label": "商家联系人"
		},
       /* {
            "name": "",
            "prop": "user_name",
            "type": "text",
            "label": "负责人名称"
        }, */

        ],
       
        "tableFields": [
			{
			    "name": "",
			    "prop": "company_name",
			    "minWidth": "180",
			    "width": "",
			    "append_table_": 0,
			    "label": "商家名称"
			},
           {
            "name": "",
            "prop": "name",
            "minWidth": "180",
            "width": "",
            "append_table_": 0,
            "label": "商家联系人"
        },
        {
            "name": "",
            "prop": "username",
            "minWidth": "180",
            "width": "",
            "append_table_": 0,
            "label": "帐号"
        },
		{
		    "name": "",
		    "prop": "phone",
		    "minWidth": "180",
		    "width": "",
		    "append_table_": 0,
		    "label": "电话"
		},
		
       /* {
            "name": "",
            "prop": "user_name",
            "minWidth": "180",
            "width": "",
            "append_table_": 0,
            "label": "捐赠项目负责人"
        }, */
        
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
            "prop": "company_name",
            "datatype": "require",
            "type": "text",
            'style':"width:200px",
            "append_form_": 0,
            "label": "商家联系人"
        },

        {
            "name": "",
            "prop": "name",
            "datatype": "require",
            "type": "text",
            "append_form_": 0,
            "label": "联系人"
        },
		{
		    "name": "",
		    "prop": "phone",
		    "datatype": "require|phone",
		    "type": "text",
		    "append_form_": 0,
		    "label": "电话号码"
		},
		{
		    "name": "",
		    "prop": "username",
		    "datatype": "require",
		    "type": "text",
		    "append_form_": 0,
		    "label": "帐号"
		},
		{
		    "name": "",
		    "prop": "password",
		    //"datatype": "",
		    "type": "password",
		    "append_form_": 0,
		    "label": "密码"
		},
        
		{
		    "name": "",
		    "prop": "site_name",
		    "datatype": "require",
		    "type": "text",
		    "append_form_": 0,
		    "label": "商家识别号"
		},
		{
		    "name": "",
		    "prop": "role_id",
		    "datatype": "require",
		    "type": "select",
			datakey:'roles',
		    "style":"width:120px",
		    "append_form_": 0,
		    "label": "角色"
		},
        {
            "name": "",
            "prop": "remark",
            //"datatype": "require",
            "type": "textarea",
            "style":"height:80px",
            "append_form_": 0,
            "label": "备注"
        },
       
       ]
    }
}
