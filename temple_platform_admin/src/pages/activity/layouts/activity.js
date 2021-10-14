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
        "tableName": "activitys",
        "createAction": "/admin/activity/create",
        "editAction": "/admin/activity/edit",
        "checkAll": true,
        //"putaway":'/admin/project/edit-field-all',
        "searchFields": [
          {
            "name": "",
            "prop": "name",
            "type": "text",
            "label": "活动名称"
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
            "prop": "name",
            "minWidth": "180",
            "append_table_": 0,
            "label": "活动名称"
        },
        {
            "name": "",
            "prop": "amount",
            "width": "100",
            "append_table_sort": 0,
            "label": "金额"
        },
        {
            "name": "",
            "prop": "is_index",
            "width": "100",
            "align": "center",
            "type":"editField",
            "url":"/admin/activity/editField",
            "label": "推荐首页"
        },
        {
            "name": "",
            "prop": "putaway",
            "width": "100",
            "align": "center",
            "type":"editField",
            "url":"/admin/activity/editField",
            "label": "上架/下架"
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
            "name": "",
            "prop": "integral",
            "datatype": "require|integer",
            "type": "text",
            "style":"width:100px",
            "label": "积分"
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
