import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
var role = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")).role : '';
Vue.use(Router)
export default new Router({
	//mode: 'history',
	routes: [{
			path: '*',
			redirect: '/vueadmin/project/order-lists?searchType=thisyear&status=3',
			hidden: true,
		},
		{
			path: '/vueadmin',
			name: '常用',
			url: '/vueadmin',
			iconCls: 'iconfont icon8', //图标样式class
			component: resolve => require(['../default'], resolve),
			children: [
				// {
				// 	iconCls: 'iconfont icon-temple-home', //图标样式class
				// 	path: 'index*',
				// 	url: '/vueadmin/index',
				// 	name: '首页',
				// 	component: resolve => require(['../pages/index/index'], resolve),
				// 	open: false,
				// 	meta: {
				// 	   keepAlive: false // 需要被缓存
				// 	},
				// 	permission: []
				// },
				// {
				// 	path: 'appointmentRoom*',
				// 	url: 'appointmentRoom',
				// 	name: '房间管理',
				// 	open: false,
				// 	iconCls: 'iconfont icon-temple-room', //图标样式class
				// 	component: resolve => require(['../p'], resolve),
				// 	children: [
				// 		{
				// 			path: 'list*',
				// 			url: '/vueadmin/appointmentRoom/list',
				// 			name: '房间管理',
				// 			iconCls: 'iconfont icon8', //图标样式class
				// 			meta: {
				// 			   keepAlive: false // 需要被缓存
				// 			},
				// 			component: resolve => require(['../pages/roomAppointment/lists'], resolve),
				// 			permission: [],
				// 		},
				// 		{
				// 			path: 'order-list*',
				// 			url: '/vueadmin/appointmentRoom/order-list?status=12',
				// 			name: '订单列表',
				// 			iconCls: 'iconfont icon8', //图标样式class
				// 			meta: {
				// 			   keepAlive: false // 需要被缓存
				// 			},
				// 			component: resolve => require(['../pages/roomAppointment/order_lists'], resolve),
				// 			permission: [],
				// 		},
				
				// 	]
				// },
    //             {
    //             	path: 'activity*',
    //             	url: 'activity',
    //             	name: '一元牌位',
    //             	open: false,
    //             	iconCls: 'iconfont icon-temple-activity', //图标样式class
    //             	component: resolve => require(['../p'], resolve),
    //             	children: [

    //             		{
    //             			path: 'list*',
    //             			url: '/vueadmin/activity/list',
    //             			name: '一元牌位',
    //             			iconCls: 'iconfont icon8', //图标样式class
    //             			meta: {
    //             			   keepAlive: false // 需要被缓存
    //             			},
    //             			component: resolve => require(['../pages/activity/lists'], resolve),
    //             			permission: [],
    //             		},
    //                     {
    //                     	path: 'order-list*',
    //                     	url: '/vueadmin/activity/order-list?amount=1',
    //                     	name: '订单管理',
    //                     	iconCls: 'iconfont icon8', //图标样式class
    //                     	meta: {
    //                     	   keepAlive: false // 需要被缓存
    //                     	},
    //                     	component: resolve => require(['../pages/activity/order/lists'], resolve),
    //                     	permission: [],
    //                     },
    //                     {
    //                     	path: 'order-printf*',
    //                     	url: '/vueadmin/activity/order-printf?amount=1&printf=0',
    //                     	name: '一元牌位人工打印',
    //                     	iconCls: 'iconfont icon8', //图标样式class
    //                     	meta: {
    //                     	   keepAlive: false // 需要被缓存
    //                     	},
    //                     	component: resolve => require(['../pages/activity/order/printf'], resolve),
    //                     	permission: [],
    //                     },
				// 		{
				// 			path: 'auto-order-printf*',
				// 			url: '/vueadmin/activity/auto-order-printf?printf=0',
				// 			name: '一元牌位自动打印',
				// 			iconCls: 'iconfont icon8', //图标样式class
				// 			meta: {
				// 			   keepAlive: false // 需要被缓存
				// 			},
				// 			component: resolve => require(['../pages/activity/order/auto_printf'], resolve),
				// 			permission: [],
				// 		},
    //                     {
    //                     	path: 'share-list*',
    //                     	url: '/vueadmin/activity/share-list',
    //                     	name: '活动分享',
    //                     	iconCls: 'iconfont icon8', //图标样式class
    //                     	meta: {
    //                     	   keepAlive: false // 需要被缓存
    //                     	},
    //                     	component: resolve => require(['../pages/activity/share/lists'], resolve),
    //                     	permission: [],
    //                     },

    //             	]
    //             },
                // {
                // 	path: 'tablet*',
                // 	url: 'tablet',
                // 	name: '牌位管理',
                // 	open: false,
                // 	iconCls: 'iconfont icon-temple-tablet', //图标样式class
                // 	component: resolve => require(['../p'], resolve),
                // 	children: [
                // 		{
                // 			path: 'order-lists*',
                // 			url: '/vueadmin/tablet/order-lists?searchType=thisyear&status=3&type=0',
                // 			name: '牌位订单',
                // 			iconCls: 'iconfont icon8', //图标样式class
                // 			component: resolve => require(['../pages/tablet/order_lists'], resolve),
                // 			permission: [],
                // 			meta: {
                // 			   keepAlive: false // 需要被缓存
                // 			},
                // 		},
                //         {
                //         	path: 'order-printf*',
                //         	url: '/vueadmin/tablet/order-printf?searchType=thisyear&status=3&type=0&printf=0',
                //         	name: '牌位打印',
                //         	iconCls: 'iconfont icon8', //图标样式class
                //         	component: resolve => require(['../pages/tablet/printf'], resolve),
                //         	permission: [],
                //         	meta: {
                //         	   keepAlive: false // 需要被缓存
                //         	},
                //         },
                // 		{
                // 			path: 'list*',
                // 			url: '/vueadmin/tablet/list?putaway=1',
                // 			name: '牌位项目管理',
                // 			iconCls: 'iconfont icon8', //图标样式class
                // 			meta: {
                // 			   keepAlive: false // 需要被缓存
                // 			},
                // 			component: resolve => require(['../pages/tablet/lists'], resolve),
                // 			permission: [],
                // 		},

                // 	]
                // },
				{
					path: 'project*',
					url: 'project',
					name: '日行一善',
					open: false,
					iconCls: 'iconfont icon-temple-project', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [
						// {
						// 	path: '2order-lists*',
						// 	url: '/vueadmin/project/2order-lists?searchType=thisyear&status=3&project_id=170',
						// 	name: '还寿生经订单',
						// 	iconCls: 'iconfont icon8', //图标样式class
						// 	component: resolve => require(['../pages/project/order_lists2'], resolve),
						// 	permission: [],
						// 	meta: {
						// 	   keepAlive: false // 需要被缓存
						// 	},
						// },
						{
							path: 'order-lists*',
							url: '/vueadmin/project/order-lists?searchType=thisyear&status=3',
							name: '捐赠订单',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/project/order_lists'], resolve),
							permission: [],
							meta: {
							   keepAlive: false // 需要被缓存
							},
						},
						{
							path: 'list*',
							url: '/vueadmin/project/list?putaway=1&online=1',
							name: '捐赠项目管理',
							iconCls: 'iconfont icon8', //图标样式class
							meta: {
							   keepAlive: false // 需要被缓存
							},
							component: resolve => require(['../pages/project/lists'], resolve),
							permission: [],
						},
						{
							path: 'post-lists*',
							url: '/vueadmin/project/post-lists?type=1',
							name: '广告管理',
							meta: {
							   keepAlive: false // 需要被缓存
							},
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/poster/lists'], resolve),
							permission: [],
						},
					]
				},
				// {
				// 	path: 'dinnerTicket*',
				// 	url: 'project',
				// 	name: '餐券放生管理',
				// 	open: false,
				// 	iconCls: 'iconfont icon-temple-coupon', //图标样式class
				// 	component: resolve => require(['../p'], resolve),
				// 	children: [
				// 		{
				// 			path: 'order-lists*',
				// 			url: '/vueadmin/dinnerTicket/order-lists?searchType=thisyear&status=0',
				// 			name: '餐券管理',
				// 			iconCls: 'iconfont icon8', //图标样式class
				// 			component: resolve => require(['../pages/dinnerTicket/order_lists'], resolve),
				// 			permission: [],
				// 			meta: {
				// 			   keepAlive: false // 需要被缓存
				// 			},
				// 		},
				// 		{
				// 			path: 'list*',
				// 			url: '/vueadmin/dinnerTicket/list?putaway=1&online=1',
				// 			name: '餐券放生项目',
				// 			iconCls: 'iconfont icon8', //图标样式class
				// 			meta: {
				// 			   keepAlive: false // 需要被缓存
				// 			},
				// 			component: resolve => require(['../pages/dinnerTicket/lists'], resolve),
				// 			permission: [],
				// 		},
						
				// 	]
				// },
				{
					path: 'offline*',
					url: 'offline',
					name: '线下捐赠',
					hidden:true,
					open: false,
					iconCls: 'iconfont icon-temple-offline', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [
                        {
                        	path: 'list*',
                        	url: '/vueadmin/offline/list?putaway=1&online=0',
                        	name: '线下捐赠项目',
                        	iconCls: 'iconfont icon8', //图标样式class
                        	meta: {
                        	   keepAlive: false // 需要被缓存
                        	},
                        	component: resolve => require(['../pages/offline/project/lists'], resolve),
                        	permission: [],
                        },
						{
							path: 'order-lists*',
							url: '/vueadmin/offline/order-lists?searchType=thisyear&status=3&online=0',
							name: '线下捐赠订单',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/offline/order_lists'], resolve),
							permission: [],
							meta: {
							   keepAlive: false // 需要被缓存
							},
						},
						{
							path: 'cashier',
							url: '/vueadmin/offline/cashier',
							name: '线下开单',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/offline/cashier'], resolve),
							permission: [],
							meta: {
							   keepAlive: false // 需要被缓存
							},
						},
						{
								path: 'member-lists*',
								url: '/vueadmin/offline/member-lists?online=0',
								name: '线下会员列表',
								meta: {
								   keepAlive: false // 需要被缓存
								},
								iconCls: 'iconfont icon8', //图标样式class
								component: resolve => require(['../pages/user/lists'], resolve),
								permission: [{
									name: '删除',
									url: '/vueadmin/user/lists/del'
								}, 
							],
						},

					]
				},
                // {
                // 	path: 'appointment*',
                // 	url: 'appointment',
                // 	name: '预约订单',
                // 	open: false,
                // 	iconCls: 'iconfont icon-temple-appointment', //图标样式class
                // 	component: resolve => require(['../p'], resolve),
                // 	children: [
                // 		{
                // 			path: 'lists*',
                // 			url: '/vueadmin/appointment/lists?status=0',
                // 			name: '我的预约',
                // 			iconCls: 'iconfont icon8', //图标样式class
                // 			component: resolve => require(['../pages/appointment/lists'], resolve),
                // 			permission: [],
                // 			meta: {
                // 			   keepAlive: false // 需要被缓存
                // 			},
                // 		}

                // 	]
                // },
				{
					path: 'shop*',
					url: 'shop',
					name: '商城系统',
					open: false,
					iconCls: 'iconfont icon-temple-shop', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'lists*',
							url: '/vueadmin/shop/product/lists',
							name: '产品管理',
							meta: {
							   keepAlive: false // 需要被缓存
							},
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/product/lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/shop/product/lists/del'
							}, {
								name: '新建',
								url: '/vueadmin/shop/product/lists/create'
							}, {
								name: '修改',
								url: '/vueadmin/shop/product/lists/edit'
							}, {
								name: '类别',
								url: '/vueadmin/shop/product/lists/class'
							}, ]
						},

						{
							path: 'order-lists*',
							url: '/vueadmin/shop/order-lists?status=12',
							name: '商城订单',
							meta: {
							   keepAlive: false // 需要被缓存
							},
							iconCls: 'iconfont icon12', //图标样式class
							component: resolve => require(['../pages/shop/order/lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/shop/order-lists/del'
							}, {
								name: '新建',
								url: '/vueadmin/shop/order-lists/create'
							}, {
								name: '修改',
								url: '/vueadmin/shop/order-lists/edit'
							}, {
								name: '类别',
								url: '/vueadmin/shop/order-lists/class'
							},

							],
						},
						// {
						// 	path: 'cancel-lists*',
						// 	url: '/vueadmin/shop/cancel-lists?status=0',
						// 	name: '订单（取消）',
						// 	meta: {
						// 	   keepAlive: false // 需要被缓存
						// 	},
						// 	iconCls: 'iconfont icon12', //图标样式class
						// 	component: resolve => require(['../pages/shop/order/cancel_lists'], resolve),
						// 	permission: [{
						// 		name: '删除',
						// 		url: '/vueadmin/shop/cancel-lists/del'
						// 	}, {
						// 		name: '新建',
						// 		url: '/vueadmin/shop/cancel-lists/create'
						// 	}, {
						// 		name: '修改',
						// 		url: '/vueadmin/shop/cancel-lists/edit'
						// 	}, {
						// 		name: '类别',
						// 		url: '/vueadmin/shop/cancel-lists/class'
						// 	},

						// 	],
						// },
						// {
						// 	path: 'order-count*',
						// 	url: '/vueadmin/shop/order-count?dateSelect=today',
						// 	name: '采购单',
						// 	iconCls: 'iconfont icon12', //图标样式class
						// 	component: resolve => require(['../pages/shop/order/count'], resolve),
						// 	permission: [{
						// 		name: '删除',
						// 		url: '/vueadmin/shop/order-count/del'
						// 	}, {
						// 		name: '新建',
						// 		url: '/vueadmin/shop/order-count/create'
						// 	}, {
						// 		name: '修改',
						// 		url: '/vueadmin/shop/order-count/edit'
						// 	}, {
						// 		name: '类别',
						// 		url: '/vueadmin/shop/order-count/class'
						// 	}, ],
						// },


						// {
						// 	path: 'coupon-lists*',
						// 	url: '/vueadmin/shop/coupon-lists',
						// 	name: '优惠券',
						// 	meta: {
						// 	   keepAlive: false // 需要被缓存
						// 	},
						// 	iconCls: 'iconfont icon8', //图标样式class
						// 	component: resolve => require(['../pages/shop/coupon/lists'], resolve),
						// 	permission: []
						// },
						// {
						// 	path: 'order-evaluate-lists*',
						// 	url: '/vueadmin/shop/order-evaluate-lists',
						// 	name: '订单评价',
						// 	iconCls: 'iconfont icon12', //图标样式class
						// 	component: resolve => require(['../pages/shop/order/evaluate_lists'],
						// 		resolve),
						// 	permission: [],
						// },

						// {
						// 	path: 'coupon-create*',
						// 	url: '/vueadmin/shop/coupon/coupon-create',
						// 	name: '优惠券',
						// 	hidden: true,
						// 	iconCls: 'iconfont icon8', //图标样式class
						// 	component: resolve => require(['../pages/shop/coupon/create_edit'],
						// 		resolve),
						// },
						{
							path: 'order-info*',
							url: '/vueadmin/shop/order-info',
							name: '查看详情',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/order/info'], resolve),
						},
						{
							path: 'create*',
							url: '/vueadmin/shop/product/create',
							name: '产品增加',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/product/create_edit'],
								resolve),
						}, {
							path: 'edit*',
							url: '/vueadmin/shop/product/edit',
							name: '产品修改',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/product/create_edit'],
								resolve),
						},
						/*	{
								path: 'commission-order-lists*',
								url: '/vueadmin/shop/commission-order-lists',
								name: '员工订单',
								iconCls: 'iconfont icon12', //图标样式class
								component: resolve => require(['../pages/shop/commission/order_lists'], resolve),
								permission: [],
							},
							{
								path: 'commission-lists*',
								url: '/vueadmin/shop/commission-lists',
								name: '员工佣金',
								iconCls: 'iconfont icon12', //图标样式class
								component: resolve => require(['../pages/shop/commission/lists'], resolve),
								permission: [],
							},
							{
								path: 'commission-setting*',
								url: '/vueadmin/shop/commission-setting',
								name: '佣金设置',
								iconCls: 'iconfont icon12', //图标样式class
								component: resolve => require(['../pages/shop/commission/staff_setting'], resolve),
								permission: [],
						// 	},*/
						// {
						// 	path: 'poster-lists*',
						// 	url: '/vueadmin/shop/poster-lists?type=1',
						// 	name: '广告管理',
						// 	meta: {
						// 	   keepAlive: false // 需要被缓存
						// 	},
						// 	iconCls: 'iconfont icon12', //图标样式class
						// 	component: resolve => require(['../pages/shop/poster/lists'], resolve),
						// 	permission: [{
						// 		name: '删除',
						// 		url: '/vueadmin/shop/poster-lists/del'
						// 	}, {
						// 		name: '新建',
						// 		url: '/vueadmin/shop/poster-lists/create'
						// 	}, {
						// 		name: '修改',
						// 		url: '/vueadmin/shop/poster-lists/edit'
						// 	}, {
						// 		name: '类别',
						// 		url: '/vueadmin/shop/poster-lists/class'
						// 	}, ],
						// },


					]
				},

				{
					path: 'dis*',
					url: 'dis',
					name: '分销管理',
					hidden:true,
					open: false,
					iconCls: 'iconfont icon-temple-distribution', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'list-info*',
							url: '/vueadmin/dis/list-info?status=12&community_id=null',
							name: '分销管理',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/dis/lists_info'], resolve),
							permission: [],
							meta: {
							   keepAlive: false // 需要被缓存
							},

						},
						{
							path: 'come-out-lists*',
							url: '/vueadmin/dis/come-out-lists?status=0',
							name: '提现审核',
							meta: {
							   keepAlive: false // 需要被缓存
							},
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/dis/come_out_lists'],
								resolve),
							permission: [],
						},
						{
							path: 'config*',
							url: '/vueadmin/dis/config?status=0',
							name: '分销设置',
							meta: {
							   keepAlive: false // 需要被缓存
							},
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/dis/config'], resolve),
							permission: [],

						},


					]
				},
				{
					path: 'article*',
					url: 'article',
					name: '文章管理',
					open: false,
					iconCls: 'iconfont icon-temple-article', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'list*',
							meta: {
							   keepAlive: false // 需要被缓存
							},
							url: '/vueadmin/article/lists',
							name: '文章管理',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/article/lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/article/lists/del'
							}, {
								name: '新建',
								url: '/vueadmin/article/lists/create'
							}, {
								name: '修改',
								url: '/vueadmin/article/lists/edit'
							}, {
								name: '类别',
								url: '/vueadmin/article/lists/class'
							}, ]

						},
						{
							path: 'create*',
							url: '/vueadmin/article/create',
							name: '文章管理',
							iconCls: 'iconfont icon8', //图标样式class
							hidden:true,
							component: resolve => require(['../pages/article/create_edit'], resolve),
							permission: [],

						},
						{
							path: 'edit*',
							url: '/vueadmin/article/edit',
							name: '文章管理',
							hidden:true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/article/create_edit'], resolve),
							permission: [],

						},
						// {
						// 	path: 'post-lists*',
						// 	url: '/vueadmin/article/post-lists?type=1',
						// 	name: '广告管理',
							
						// 	iconCls: 'iconfont icon8', //图标样式class
						// 	component: resolve => require(['../pages/website/poster/lists'], resolve),
						// 	permission: [],
						// },

					]
				},

				{
					path: 'integral*',
					url: 'integral',
					name: '积分商城',
					open: false,
					hidden:true,
					iconCls: 'iconfont icon-temple-integral', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [

						{
							path: 'lists*',
							url: '/vueadmin/integral/lists',
							name: '积分奖品',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/integral/lists'], resolve),
							permission: [],
						},
						{
							path: 'order-lists*',
							url: '/vueadmin/integral/order-lists?status=3',
							name: '积分订单',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/integral/order_lists'],
								resolve),
							permission: [],
						},

						{
							path: 'order-info*',
							url: '/vueadmin/integral/order-info',
							name: '查看详情',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/integral/info'], resolve),
						},
						{
							path: 'create*',
							url: '/vueadmin/integral/create',
							name: '积分产品增加',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/integral/create_edit'],
								resolve),
						},
						{
							path: 'edit*',
							url: '/vueadmin/integral/edit',
							name: '积分产品修改',
							hidden: true,
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/shop/integral/create_edit'],
								resolve),
						}


					]
				},
				{
					path: 'user*',
					url: '/user',
					name: '会员管理',
					open: false,
					iconCls: 'iconfont icon-temple-vip', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [
						 {
								path: 'lists*',
								url: '/vueadmin/user/lists',
								name: '会员列表',
								meta: {
								   keepAlive: false // 需要被缓存
								},
								iconCls: 'iconfont icon8', //图标样式class
								component: resolve => require(['../pages/user/on_line_lists'], resolve),
								permission: [{
									name: '删除',
									url: '/vueadmin/user/lists/del'
								}, 
							],
						},
						{

							path: 'info*',
							url: '/vueadmin/user/info',
							name: '会员详情',

							iconCls: 'iconfont icon8', //图标样式class
							hidden: true,
							component: resolve => require(['../pages/user/info'], resolve),
						},
						// {

						// 	path: 'lev*',
						// 	url: '/vueadmin/user/lev',
	  //                       meta: {
	  //                          keepAlive: false // 需要被缓存
	  //                       },
						// 	name: '会员等级',
						// 	iconCls: 'iconfont icon8', //图标样式class
						// 	component: resolve => require(['../pages/user/lev/lists'], resolve),
						// 	permission: [],
						// },
						// {
						// 	path: 'coupon-record*',
						// 	url: '/vueadmin/user/coupon-record',
	  //                       meta: {
	  //                          keepAlive: false // 需要被缓存
	  //                       },
						// 	name: '会员领券',
						// 	iconCls: 'iconfont icon8', //图标样式class
						// 	component: resolve => require(['../pages/user/coupon_record'], resolve),
						// 	permission: [{
						// 			name: '删除',
						// 			url: '/vueadmin/user/coupon-record/del'
						// 		},
						// 		{
						// 			name: '兑换',
						// 			url: '/vueadmin/user/coupon-record/exchange'
						// 		},


						// 	]
						// },
					]
				},

				{
					path: 'setting*',
					url: '/vueadmin/setting',
					name: '员工帐号',
					open: false,
					iconCls: 'iconfont icon-temple-staff', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'staff-lists*',
							url: '/vueadmin/setting/staff-lists',
							name: '员工管理',
							meta: {
							   keepAlive: false // 需要被缓存
							},
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/staff/lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/setting/staff-lists/del'
							}, {
								name: '新建',
								url: '/vueadmin/setting/staff-lists/create'
							}, {
								name: '修改',
								url: '/vueadmin/setting/staff-lists/edit'
							}, ]
						},
						{
							path: 'role*',
							url: '/vueadmin/setting/role',
							name: '角色列表',
							hidden:true,
							meta: {
							   keepAlive: false // 需要被缓存
							},
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/role/lists'], resolve),
							permission: []
						},

					]
				},
				
				
				{
					path: 'merchant*',
					url: '/vueadmin/merchant',
					name: '商家帐号',
					hidden:false,
					open: false,
					iconCls: 'iconfont icon-temple-staff', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'lists*',
							url: '/vueadmin/merchant/lists',
							name: '商家管理',
							meta: {
							   keepAlive: false // 需要被缓存
							},
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/merchant/lists'], resolve),
							permission: [{
								name: '删除',
								url: '/vueadmin/setting/merchant-lists/del'
							}, {
								name: '新建',
								url: '/vueadmin/setting/merchant-lists/create'
							}, {
								name: '修改',
								url: '/vueadmin/setting/merchant-lists/edit'
							}, ]
						},
						{
							path: 'role*',
							url: '/vueadmin/merchant/role',
							name: '角色列表',
							meta: {
							   keepAlive: false // 需要被缓存
							},
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/role/merchant_lists'], resolve),
							permission: []
						},
						{
							path: 'comeOut*',
							url: '/vueadmin/merchant/comeOut?status=0',
							name: '提现',
							meta: {
							   keepAlive: false // 需要被缓存
							},
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/merchant/come_out_lists'], resolve),
							permission: []
						},
				
					]
				},
				


				{
					path: 'system*',
					url: '/vueadmin/system',
					name: '系统管理',
					open: false,
					iconCls: 'iconfont icon-temple-config', //图标样式class
					component: resolve => require(['../p'], resolve),
					children: [{
							path: 'config*',
							url: '/vueadmin/system/config',
							name: '基本设置',
							iconCls: 'iconfont icon8', //图标样式class
							component: resolve => require(['../pages/system/config'], resolve),
							permission: []
						},
						{
							path: 'password*',
							name: '修改密码',
							permission: [],
							url: '/vueadmin/system/password',
							component: resolve => require(['../pages/system/password'], resolve),
						},

					]
				},
			]
		},
		{
			path: '/login/index',
			name: 'login',
			hidden: true,
			component: resolve => require(['../pages/login/index'], resolve)
		},
		{
			path: '/login/ip-allow',
			name: 'login',
			hidden: true,
			component: resolve => require(['../pages/login/allow_ip'], resolve)
		},
		{
			path: '/publishCode/index',
			name: 'publishCode',
			hidden: true,
			component: resolve => require(['../pages/publishCode/index'], resolve)
		},

		{
			path: '/website/index',
			name: '微官网',
			hidden: true,
			component: resolve => require(['../pages/website/new/index'], resolve)
		},
	]
})
