export default {
    data: {
        "listsAction": "",
        "pageSize": 30,
        "canCreate": 0,
        "canEdit": 0,
        canupload:false,
        classUrl:"",
        createEditLabel:"110px",
        createEditDiagWidth:'900px',
        "tableName": "activity_shares",
        // "createAction": "/admin/activity/create",
        // "editAction": "/admin/activity/edit",
        "checkAll": true,
        //"putaway":'/admin/project/edit-field-all',
       //   "searchFields": [
       //     {
       //      "name": "",
       //      "prop": "yname",
       //      "type": "text",
       //      "label": "阳上人"
       //  },
       // {
       //      "name": "",
       //      "prop": "phone",
       //      "type": "text",
       //      "label": "电话"

       //  ],
        "tableFields": [
            {
                "name": "",
                "prop": "getShare.nickname",
                "minWidth": "180",
                "width": "",
                "append_table_": 0,
                "label": "分享人"
            },
           {
            "name": "",
            "prop": "getUser.nickname",
            "minWidth": "180",
            "width": "",
            "append_table_": 0,
            "label": "呢称"
        },

        {
            "name": "",
            "prop": "created_at",
            "minWidth": "180",
            "append_table_sort": 0,
            "label": "时间"
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
