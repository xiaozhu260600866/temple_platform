export default {
	data: {
		"listsAction": "",
		"pageSize": 60,
		"canCreate": 0,
		"canEdit": 1,
		"tableName": "project_orders",
		"createAction": "",
		"createEditLabel":"110px",
		"createEditDiagWidth":'700px',
		"exportUrl":"/admin/project/export",
		"editAction": "/admin/project/order-edit",
        "createAction": "/admin/project/order-create",
		"checkAll": true,
		"canDel":true,
		"searchFields": [
		  {
			"name": "",
			"prop": "order_no2",
			"type": "text",
			"label": "订单编号"
		},
		{
			"name": "",
			"prop": "nickname",
			"type": "text",
			"label": "微信呢称"
		},
		{
			"name": "",
			"prop": "project_id",
			"type": "select",
			"datakey":"projectArr",
			"label": "项目名称"
		},
		{
			"name": "",
			"prop": "phone",
			"type": "text",
			"label": "功德主手机"
		},
		{
			"name": "",
			"prop": "bless_name",
			"type": "text",
			"label": "功德主姓名"
		},
		{
			"name": "",
			"prop": "date",
			"type": "betweenDate",
			"label": "日期查询"
		},
		{
			"name": "",
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
			{prop: "order_no2", minWidth: "", width: "80",append_table_: 0,label: "订单号"},
			{prop: "projects.name", minWidth: "120", width: "",append_table_: 0,label: "捐赠项目"},
			{prop: "price", minWidth: "", width: "80",append_table_: 0,label: "单价"},
			{prop: "num", minWidth: "", width: "50",append_table_: 0,label: "数量"},
			{prop: "amount", minWidth: "", width: "80",align:"center",append_table_: 0,label: "总价"},
			{prop: "pay_method_message", minWidth: "", width: "80",align:"center",append_table_: 0,label: "支付方式"},
			{prop: "post_address", minWidth: "100", width: "",align: 'center',append_table_post_address: 1,label: "邮寄/地址"},
			{prop: "phone", minWidth: "", width: "115",append_table_phone: 1,label: "功德主手机"},
			// {prop: "phone2", minWidth: "", width: "115",append_table_: 0,label: "功德主手机2"},
			{prop: "bless_name", minWidth: "", width: "115",append_table_: 0,label: "功德主姓名"},
			{prop: "remark", minWidth: "110", width: "",append_table_: 0,label: "备注"},
			{prop: "no", minWidth: "", width: "80",append_table_: 0,label: "牌位号"},
			{prop: "createorName", minWidth: "", width: "65",append_table_: 0,label: "操作人"},
			{prop: "cashier", minWidth: "", width: "65",append_table_: 0,label: "出纳"},
			{prop: "operator", minWidth: "", width: "65",append_table_: 0,label: "经办人"},
			{prop: "date", minWidth: "", width: "100",append_table_: 0,label: "收据日期"},
			{prop: "created_at", minWidth: "", width: "100",append_table_: 0,label: "时间"},
		],
		formFields:[
			{
				"prop": "project_id",
				"datatype": "require",
                datakey:'projectArr',
				"type": "select",
				'style':"width:300px",
				"label": "项目名称"
			},
            // {
            // 	"prop": "selectType",
            // 	"datatype": "require",
            // 	"type": "text",
            //     defaultValue:2,
            // 	append_form_selectType:1,

            // 	"label": "选择功德主"
            // },

            // {prop:'user_id',name:'bless_name',rowName:'bless_name',label:'选择功德主',type:"searchRadio",url:'/admin/project/order-lists?status=3&type=search',tableFields:[
            //       {prop:'bless_name',label:'功德主姓名',width:"200"},
            //       {prop:'phone',label:'功德主电话',width:"200"},
            //       {prop:'user.nickname',label:'呢称',width:"200"},


            // ],searchFields:[
            //      {prop:'content',label:'功德主姓名/功德主电话'},
            // ]},
			{
				"prop": "order_no2",
				"datatype": "require",
				"type": "text",
				disabled:true,
				'style':"width:300px",
				"label": "单号"
			},
			{
				"prop": "no",
				"datatype": "require",
				"type": "text",
				disabled:true,
				'style':"width:300px",
				"label": "牌位号"
			},
			{
				"prop": "amount",
				"datatype": "require",
				"type": "text",
				disabled:true,
				'style':"width:300px",
				"label": "金额"
			},
			{
				"prop": "is_post",
				"datatype": "",
				"type": "text",
                append_form_is_post:1,
                defaultValue:2,
				'style':"width:300px",
				"label": "是否邮寄"
			},
			{
				"prop": "bless_name",
				"type": "text",
				'style':"width:300px",
				"label": "功德主姓名"
			},
			{
				"prop": "pay_method",
				"type": "select",
				data:[
					{label:'微信',value:1},
					{label:'现金',value:2},
					{label:'银行收讫',value:3},
					{label:'悦农e付3040',value:4},
					{label:'悦农e付3041',value:5},
					{label:'作废单',value:6}
				],
				'style':"width:300px",
				"label": "支付方式"
			},
			{
				"prop": "cashier",
				"type": "select",
				data:[
					{label:'赵萍',value:'赵萍'},
					{label:'区冬梅',value:'区冬梅'},
					{label:'妙艳',value:'妙艳'},
					{label:'妙艳',value:'妙艳'},
				],
				'style':"width:300px",
				"label": "出纳"
			},
			{
				"prop": "operator",
				"type": "select",
				data:[
					{label:'崔艳芳',value:'崔艳芳'},
					{label:'林丽',value:'林丽'},
					{label:'恒此师父',value:'恒此师父'},
					{label:'谭蕾',value:'谭蕾'},
					{label:'梁典静',value:'梁典静'},
					{label:'温秀蓉',value:'温秀蓉'}
				],
				'style':"width:300px",
				"label": "经办人"
			},
			{
				"prop": "pay_method",
				"type": "select",
				data:[
					{label:'微信',value:1},
					{label:'现金',value:2},
					{label:'银行收讫',value:3},
					{label:'悦农e付3040',value:4},
					{label:'悦农e付3041',value:5},
					{label:'作废单',value:6},
				],
				'style':"width:300px",
				"label": "支付方式"
			},
			
			{
				"prop": "phone",
				"type": "text",
				'style':"width:300px",
				"label": "功德主手机"
			},
			{
				"prop": "phone2",
				"type": "text",
				'style':"width:300px",
				"label": "功德主手机2"
			},
			{
				"prop": "date",
				"type": "date",
				'style':"width:300px",
				"label": "收据日期"
			},

			{
				"prop": "remark",
				"type": "textarea",
				'style':"width:300px",
				"label": "备注"
			},
			

		]

	}
}
