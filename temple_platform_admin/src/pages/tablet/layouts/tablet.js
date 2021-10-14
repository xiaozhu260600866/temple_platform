export default {
    data: {
        "listsAction": "",
        "pageSize": 30,
        "canCreate": 1,
        "canEdit": 1,
        canupload:false,
        classUrl:"",
        createEditLabel:"110px",
        createEditDiagWidth:'900px',
        "tableName": "tablets",
        "createAction": "/admin/tablet/create",
        "editAction": "/admin/tablet/edit",
         classAction:'/admin/tablet/',
        "checkAll": true,
        //"putaway":'/admin/project/edit-field-all',
        "searchFields": [
          {
            "name": "",
            "prop": "name",
            "type": "text",
            "label": "牌位名称1"
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

           {
            "name": "",
            "prop": "name",
            "minWidth": "180",
            "width": "",
            "append_table_": 0,
            "label": "牌位"
        },
        {
            "name": "",
            "prop": "fclassName",
            "minWidth": "180",
            "width": "",
            "append_table_": 0,
            "label": "分类名"
        },
        {
            "name": "",
            "prop": "putaway",
            "minWidth": "180",
            "width": "",
             type:"editField",
             url:"/admin/tablet/editField",
            "label": "上架/下架"
        },
        {
            "name": "",
            "prop": "can_index",
            "minWidth": "180",
            "width": "",
             type:"editField",
             url:"/admin/tablet/editField",
            "label": "是否推荐到首页"
        },
		{
		    "name": "",
		    "prop": "company_show",
		    "minWidth": "180",
		    "width": "",
		     type:"editField",
		     url:"/admin/tablet/editField",
		    "label": "企业微信的隐藏与显示"
		},
       /* {
            "name": "",
            "prop": "user_name",
            "minWidth": "180",
            "width": "",
            "append_table_": 0,
            "label": "牌位负责人"
        }, */
		{
		    "name": "",
		    "prop": "show_index",
		    "minWidth": "180",
		    "width": "",
		     type:"editField",
		     url:"/admin/tablet/editField",
		    "label": "推荐到首页"
		},
        {
            "name": "",
            "prop": "sort",
            "minWidth": "180",
             type:"sort",
             url:"/admin/tablet/editField",
            "append_table_sort": 0,
            "label": "排序"
        },
		{
		    "name": "",
		    "prop": "printf_text",
		    "minWidth": "180",
		     type:"sort",
		     url:"/admin/tablet/editField",
		    "append_table_sort": 0,
		    "label": "打印文字"
		},
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
                "prop": "type",
                "minWidth": "180",
                "width": "",
                "append_table_": 0,
                type:'radio',
                defaultValue:1,
                data:[
                  {label:'普通牌位',value:1},
                  {label:'超度牌位',value:2},
                  {label:'阶段性祈福牌位',value:3},
                ],
                "label": "类型"
            },

           {
            "name": "",
            "prop": "name",
            "datatype": "require",
            "type": "text",
            'style':"width:200px",
            "append_form_": 0,
            column:2,
            "label": "牌位名称"
        },
        {
            "name": "",
            "prop": "amount_type",
            "minWidth": "180",
            "width": "",
            "append_table_": 0,
            type:'radio',
            defaultValue:0,
            data:[
              {label:'否',value:0},
              {label:'是',value:1},
             
            ],
            "label": "是否按价格计算牌位数量"
        },

        {
            "name": "",
            "prop": "fclass",
            "datatype": "require",
            "type": "select",
            "datakey":"TabletClass",
            "append_form_": 0,
            "label": "分类"
        },
        {
            "name": "",
            "prop": "sort",
            "datatype": "require|number",
            "type": "text",
            "style":"width:60px",
            column:2,
            "defaultValue":0,
            "append_form_": 0,
            "label": "排序"
        },
        {
            "name": "",
            "prop": "can_post",
            "datatype": "require",
            "type": "switch",
            "defaultValue":0,
            "label": "是否邮寄"
        },

        {
            "name": "",
            "prop": "address_require",
            "datatype": "require|price",
            "type": "text",
            "style":"width:100px",
            "append_form_address_require": 1,
            column:2,
            "label": "必填地址"
        },
        {
            "name": "",
            "prop": "show_other_price",
            "datatype": "require|price",
            "type": "text",
            "style":"width:100px",
            "append_form_show_other_price": 1,
            "label": "填写其他价格"
        },
        {
            "name": "",
            "prop": "amount_str",
            "datatype": "require",
            "type": "text",
            "style":"width:500px",
            "append_form_user_name": 0,
            "label": "捐赠金额"
        },
        {
            "name": "",
            "prop": "cd_content",
            "datatype": "require",
            "type": "text",
            "style":"height:80px",
            "append_form_": 0,
            "label": "超度内容"
        },
        {
            "prop": "thumb_pic",
            "datatype": "array",
            "type": "upload",
            "append_form_": 0,
            "label": "封面",
            "allowUpLoadNum": "1",
            uploadMessage:'图片最佳尺寸是300*300px',
            "upurl": "project"
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
            "prop": "intro",
            //"datatype": "require",
            "type": "textarea",
            "style":"height:80px",
            "append_form_": 0,
            "label": "备注"
        },
        {
            "name": "",
            "prop": "evaluate",
            //"datatype": "require",
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
