<template>
	<div>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view class="pay detail pb50" v-if="data.show">
			<view class="banner">
				<myswiper :lists="data.covers" purl="project"></myswiper>
			</view>
			<view class="box-item">
				<view class="title">{{data.detail.name}}</view>
				<view class="count flex-between">
					<view class="p">已捐 <span class="fc-red plr3"> {{data.detail.orderSum}} </span> 份</view>
					<view class="p">随喜次数<span>{{data.detail.orderNum}}</span>人</view>
				</view>
			</view>
			<view class="box-item why-free">
				<weui-input v-model="ruleform.why" myclass="why-cell" datatype="array" errorMessage="选择为什么放生" label="你今天选择为什么放生？" name="why" changeField="value" type="checkbox" dataKey="whyArr" :row="false"></weui-input>
			</view>
			<view class="box-item m12 bdr6">
				<view class="item_tab">
					<view class="Btitle pb5">
						<view class="name lh-30">选择项目</view>
					</view>
					<view class="tabG">
						<view :class="['item',ruleform.amount == v  ? 'select' :'' ]" v-for="v in amountArr" v-if="v">
							<view @click="ruleform.amount = v">{{ v }}</view>
						</view>
					</view>
				</view>
				
				<view class="buy-num plr15 ptb10 flex-between bd-te">
					<view class="fs-16 lh-30">数量</view>
					<tui-numberbox :value="num" @change="change" :max="10000"></tui-numberbox>
				</view>
				<view class="plr15 ptb10 flex-between bd-te fs-16 lh-30">
					<view>随喜金额</view>
					<view><text class="price">{{getAmount(ruleform.amount) * num}}</text>份</view>
				</view>
			</view>
			<view class="box-item people-info m12 bdr6">
				<view class="Btitle plr15 pt10">
					<view class="name lh-30">功德主资料 </view>
				</view>
				<weui-input v-model="ruleform.bless_name" label="功德主姓名" type="text" name="bless_name" datatype="require" :maxlength="6"></weui-input>
				<weui-input v-model="ruleform.phone" label="功德主手机" type="number" name="phone" :datatype="ruleform.phone_require  && !open ? 'require' : ''"></weui-input>
				<weui-input v-model="ruleform.bless_address" label="功德主地址" type="text" name="bless_address"
				 :datatype="ruleform.address_require ? 'require' : ''"></weui-input>
				<weui-input v-model="ruleform.remark" type="textarea" name="remark" placeholder="请输入备注"></weui-input>
				<weui-input v-model="ruleform.is_post" label="邮寄" name="is_post" changeField="value" type="radio" dataKey="sendTypeArr" :radioType="false" v-if="ruleform.can_post"></weui-input>
				<weui-input v-model="ruleform.post_address" type="text" name="post_address" label="邮寄地址"  datatype="require"
				 v-if="ruleform.can_post && ruleform.is_post  ==1"></weui-input>
			</view>
			<view class="box-item content m12 bdr6">
				<view class="Btitle plr15 pt10">
					<view class="name lh-30">回向文</view>
				</view>
				<view class="plr15 ptb8">
					<textarea style="height: 100px;" @click="ruleform.evaluate = ''" class="remark" name="remarks" id="remarks" title="请输入您的回向文"
					 placeholder="输入您的回向文，可先小回向(若有)，再大回向" cols="" rows="" v-model="ruleform.evaluate"></textarea>
				</view>
			</view>
			<view class="box-item content">
				<view class="tt">
					<view class="name" @click="showType =0" :class="[showType == 0 ? 'hover' : '']">详情</view>
					<view class="name" @click="showType = 1" :class="[showType == 1 ? 'hover' : '']">留言(<text class="Arial fc-red">{{data.orderCount}}</text>)</view>
				</view>
				<!-- 详情 -->
				<view v-if="showType == 0" class="con-detail plr10">
					<u-parse :content="data.detail.content" />
				</view>
				<!-- 留言 -->
				<view v-if="showType ==1">
					<view class="ml15 mr20 lh-30">参与善士</view>
					<view class="list mlr15">
						<view class="items">
							<view class="li" v-for="v in data.lists.data">
								<view class="wenzi ml0">
									<view class="gaiup flex">
										<view class="gai1">{{formatName(v.bless_name ? v.bless_name : v.user.nickname)}}</view>
										<view class="gai2">行善 <span class="fs-16">{{v.amount.split(".")[0]}}</span> 份</view>
									</view>
									<view class="gaidown">{{v.evaluate}}</view>
									<view class="gaitime">{{v.payed_at}}</view>
								</view>
							</view>
						</view>
						<hasMore :parentData="data"></hasMore>
					</view>
				</view>
			</view>

			<view id="footer-btn" class="p0 bd-te pl10">
				<view class="Bitem text-center" @click="goto('/pages/index/index',2)">
					<view class="ticon">
						<i class="iconfont icon-home"></i>
					</view>
					<view class="bname">首页</view>
				</view>
				<view class="Bitem text-center" @click="phone('0750-3663581')">
					<view class="ticon">
						<i class="iconfont icon-tel"></i>
					</view>
					<view class="bname">客堂电话</view>
				</view>
				<view class="flex1 pr10 ptb5 ml20">
					<view class="f-dx-btn dx-btn-orange text-center f-pay-btn" @click="formSubmit">
						<text class="iconfont icon-like-circle fc-white fs-18 pr5"></text>微信支付随喜
					</view>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
	import "../../../public/css/buycss.css";
	import "./index.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import tuiNumberbox from "xiaozhu/uniapp/thorui/components/numberbox/numberbox"
	export default {
		components:{
			uParse,tuiNumberbox
		},
		data() {
			return {
				formAction: '/project/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				amountArr: [],
				ruleform:{},
				showType:0,
				ruleform: {
					name: '',
					phone: '',
					amount: 20,
					otheramount: '',
					is_post:3,
					type:1,
					evaluate: ''
				},
				num: 1,
				vaildate: {},
				open: false,
				getSiteName: this.getSiteName(),
				sendTypeArr:[
					{label:'需要',value:1},
					{label:'不需要',value:2},   
				],
				whyArr:[
					{label:'家庭',value:'家庭'},
					{label:'事业',value:'事业'},
					{label:'病痛',value:'病痛'},
					{label:'烦恼',value:'烦恼'},
					{label:'障碍',value:'障碍'},
					{label:'智慧',value:'智慧'},
					{label:'健康',value:'健康'},
					{label:'生日',value:'生日'},
					{label:'添寿',value:'添寿'}
				],
			}
		},
		computed: {
			amount() {
				let amount = 0;
				if (this.ruleform.amount) {
					amount += parseFloat(this.ruleform.amount);
				}
				if (this.ruleform.amount && this.ruleform.is_top) {
					amount += parseFloat(this.ruleform.top_price);
				}
				return amount.toFixed(2);
			}
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		onReachBottom() {
			this.hasMore(this);
		},
		methods: {
			getAmount(amount){
				amount= amount.replace(/[^0-9]/ig,"");
				return amount;
			},
			change: function(e) {
				this.index = e.index;
				this.current = e.index;
				this.num = e.value
			},
			formSubmitForH5(config, order_no) {
				this.updateUrl(["/pages/index/index"]);
				this.payUniapp(config, msg => {
					return this.goto("/pages/project/order/payed/index?order_no=" + order_no);
				}, msg => {
					return this.goto("/pages/project/order/payed/index?order_no=" + order_no);
				});
			},
			formSubmit() {
				console.log(this.ruleform);
				//r//eturn false;
				if(this.ruleform.why.length == 0){
					this.getError('请选择你今天为什么放生？');
					return false;
				}
				if(this.ruleform.can_post && this.ruleform.is_post == 3){
					this.getError("请选择是否需要邮寄");
					return false;
				}
				if (!this.ruleform.bless_name) {
					this.getError("功德主不能为空");
					return false;
				}
				if (this.ruleform.amount == 0 && !this.ruleform.otheramount) {
					this.getError("金額不能為空");
					return false;
				}
				if (this.ruleform.amount == 0 && this.ruleform.otheramount == 0) {
					this.getError("金額不能為0");
					return false;
				}
				
				if(!this.open && !this.ruleform.phone && this.ruleform.phone_require){
					this.getError("電話不能為空");
					return false;
				}
				if (this.ruleform.phone) {
					var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
					if (!phoneReg.test(this.ruleform.phone)) {
						this.getError("手机格式不正确");
						return false;
					}
				}
				if (this.ruleform.address_require && !this.ruleform.bless_address) {
					this.getError('地址不能为空');
					return false;
				}
				// if(this.ruleform.remark.length >=40){
				// 	this.getError("备注栏限制20个字内，谢谢")
				// 	return false;
				// }
				this.ruleform.project_id = this.data.detail.id;
				
				this.ruleform.amount = this.getAmount(this.ruleform.amount);
				console.log(this.ruleform.amount);
				//return false;
				this.ruleform.num = this.num;
				this.postAjax(this.formAction, this.ruleform).then(msg => {
					if (msg.data.status == 2) {
						this.formSubmitForH5(msg.data.config, msg.data.detail.order_no);
					}
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.setTitle(msg.detail.name);
					this.$refs.page.share(msg.detail.name,msg.detail.firstCover,this.data.siteConfig.share_descript);
					this.amountArr = msg.detail.amount_str.split(",");
					this.ruleform.type = msg.detail.type;
					// if(msg.projectOrder){
					// 	this.ruleform = msg.projectOrder;
					// 	this.ruleform.amount = this.amountArr[0];
					// 	this.ruleform.show_other_price = msg.detail.show_other_price;
					// 	this.ruleform.evaluate = msg.detail.evaluate;
					// 	this.ruleform.address_require = msg.detail.address_require;
					// 	this.ruleform.phone_require = msg.detail.phone_require;
					// 	this.ruleform.can_post = msg.detail.can_post;
					// 	this.ruleform.otheramount = "";
						
					// 	delete this.ruleform.id;
					// 	delete this.ruleform.status;
					// 	delete this.ruleform.online;
					// 	delete this.ruleform.why;
					// 	delete this.ruleform.amount;
					// }else{
						this.ruleform.amount = this.amountArr[0];
						this.ruleform.show_other_price = msg.detail.show_other_price;
						this.ruleform.evaluate = msg.detail.evaluate;
						this.ruleform.address_require = msg.detail.address_require;
						this.ruleform.phone_require = msg.detail.phone_require;
						this.ruleform.can_post = msg.detail.can_post;
					
					// }

				});
			}
		}
	}
</script>
