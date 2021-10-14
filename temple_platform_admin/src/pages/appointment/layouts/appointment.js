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
        "tableName": "appointment",
        exportUrl:"/admin/appointment/lists?excel=1",
        "createAction": "/admin/project/create",

        "checkAll": true,
        //"putaway":'/admin/project/edit-field-all',
        "searchFields": [
          {
            "name": "",
            "prop": "name",
            "type": "text",
            "label": "名称"
          },
          {
            "name": "",
            "prop": "phone",
            "type": "text",
            "label": "电话"
          },
        ],
        "tarbars": {
            "prop": "status",
            "data": [{
                "name": "",
                "value": "0",
                "count": 0,
                "label": "处理中"
            }, {
                "name": "",
                "value": "1",
                "count": 0,
                "label": "已完成"
            }, ]
        },
        "tableFields": [
           {
            "name": "",
            "prop": "name",
            "width": "80",
            "append_table_": 0,
            "label": "姓名"
        },
        {
            "name": "",
            "prop": "phone",
            "width": "120",
            "append_table_": 0,
            "label": "电话"
        },
        {
            "name": "",
            "prop": "affairType",
            "minWidth": "180",
            "label": "预约事务"
        },
        {
            "name": "",
            "prop": "num",
            "width": "80",
            "align": "center",
            "label": "人数"
        },
        {
            "name": "",
            "prop": "date",
            "width": "120",
            "align": "center",
            "label": "日期"
        },
       /* {
            "name": "",
            "prop": "user_name",
            "minWidth": "180",
            "append_table_": 0,
            "label": "捐赠项目负责人"
        }, */
        {
            "name": "",
            "prop": "time",
            "width": "100",
            "align": "center",
            "label": "时间"
        },
        {
            "name": "",
            "prop": "created_at",
            "width": "170",
            "align": "center",
            "label": "提交时间"
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
            "label": "捐赠项目名称"
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
            "prop": "target_amount",
            // "datatype": "require|price",
            "type": "text",
            "style":"width:100px",
            "append_form_user_name": 1,
            "label": "目标金额"
        },
        {
            "name": "",
            "prop": "address_require",
            "datatype": "require",
            "type": "radio",
            "defaultValue":0,
             data:[{label:'否',value:0},{label:'是',value:1}],
            "style":"width:100px",
            "label": "是否必填地址"
        },
        {
            "name": "",
            "prop": "show_other_price",
            "datatype": "require",
            "type": "radio",
            "style":"width:100px",
            "defaultValue":0,
             data:[{label:'否',value:0},{label:'是',value:1}],
            "label": "是否填写其他价格"
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
