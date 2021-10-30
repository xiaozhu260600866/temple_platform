<template>
	<div>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view class="pay detail" v-if="data.show">
			<view class="pay-price box-item fs-15">
				<view class="Btitle">
					<view class="name">选择随喜金额</view>
				</view>
				<view class="row">
					<view :class="['item',ruleform.amount == v  ? 'select' :'' ]" v-for="v in amountArr" v-if="v">
						<!-- <view :class="['price',ruleform.amount == v ? 'fc-white': '']" @click="ruleform.amount  = v" v-if="v == 100">{{ v }}元小金钥匙 </view>
						<view :class="['price',ruleform.amount == v ? 'fc-white': '']" @click="ruleform.amount  = v" v-if="v == 600">{{ v }}元大金钥匙 </view> -->
						<view :class="['price',ruleform.amount == v ? 'fc-white': '']" @click="ruleform.amount  = v">{{ v }} </view>
					</view>
				</view>
				<view class="row">
					<view :class="['item other',ruleform.amount == 0 ? 'select' :'' ]" @click="ruleform.amount = 0" v-if="ruleform.show_other_price">
						<view class="txt">其他</view>
						<input class="input" type="number" maxlength="7" v-model="ruleform.otheramount">
						<view class="txt">元</view>
					</view>
				<!-- 	<view class="anonymous flex-middle ml15 mr5">
						<view :class="['select', open ? 'yes' : '']" @click="open = !open"></view>
						<view class="name fc-9">匿名随喜</view>
					</view> -->
				</view>
				<!-- <view class="order-price" v-if="ruleform.amount == 0">
					<weui-input v-model="ruleform.otheramount" label="随喜金额" type="number" name="name"  @click="ruleform.evaluate = ''"></weui-input>
				</view> -->
			</view>
			<view class="box-item people-info">
				<view class="Btitle">
					<view class="name">功德主资料 </view>
				</view>
				<!-- <weui-input v-model="ruleform.name" label="登记人姓名" type="text" name="name" datatype="require" v-if="!open"></weui-input> -->
				<weui-input v-model="ruleform.bless_name" label="功德主姓名" type="text" name="bless_name" datatype="require" :maxlength="6"></weui-input>
				<weui-input v-model="ruleform.phone" label="功德主手机" type="number" name="phone" :datatype="ruleform.phone_require  && !open ? 'require' : ''"></weui-input>
				<weui-input v-model="ruleform.bless_address" label="功德主地址" type="text" name="bless_address"
				 :datatype="ruleform.address_require ? 'require' : ''"></weui-input>
				<weui-input v-model="ruleform.remark" type="textarea" name="remark" placeholder="请输入备注"></weui-input>
				<!-- <weui-input v-model="ruleform.is_post" type="switch" name="is_post" label="邮寄" v-if="ruleform.can_post"></weui-input> -->
				<weui-input v-model="ruleform.is_post" label="邮寄" name="is_post" changeField="value" type="radio" dataKey="sendTypeArr" :radioType="false" v-if="ruleform.can_post"></weui-input>
				<weui-input v-model="ruleform.post_address" type="text" name="post_address" label="邮寄地址"  datatype="require"
				 v-if="ruleform.can_post && ruleform.is_post  ==1"></weui-input>
			</view>
			<view class="box-item">
				<view class="Btitle">
					<view class="name">回向文</view>
				</view>
				<view class="content">
					<textarea @click="ruleform.evaluate = ''" class="remark" name="remarks" id="remarks" title="请输入您的回向文"
					 placeholder="输入您的回向文，可先小回向(若有)，再大回向" v-model="ruleform.evaluate"></textarea>
				</view>
			</view>
			<view class="p20 pb30">
				<dx-button type="primary" size="lg" block round @click="formSubmit">微信支付随喜</dx-button>
			</view>
		</view>
	</div>
</template>

<script>
	import "../../../../public/css/buycss.css";
	import "./index.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components:{
			uParse
		},
		data() {
			return {
				formAction: '/project/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				amountArr: [],
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
				vaildate: {},
				open: false,
				getSiteName: this.getSiteName(),
				sendTypeArr:[
					{label:'需要',value:1},
					{label:'不需要',value:2},   
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
			return this.shareSource(this, '商城1');
		},
		onLoad(options) {
			this.ajax();
		},

		methods: {
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
				
				this.ruleform.amount = parseFloat(this.ruleform.amount);
				console.log(this.ruleform.amount);

				this.postAjax(this.formAction, this.ruleform).then(msg => {
					if (msg.data.status == 2) {
						this.formSubmitForH5(msg.data.config, msg.data.detail.order_no);
					}
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.setTitle(msg.detail.name);
					this.amountArr = msg.detail.amount_str.split(",");
					this.ruleform.type = msg.detail.type;
					if(msg.projectOrder){
						this.ruleform = msg.projectOrder;
						this.ruleform.amount = this.amountArr[0];
						this.ruleform.show_other_price = msg.detail.show_other_price;
						this.ruleform.evaluate = msg.detail.evaluate;
						this.ruleform.address_require = msg.detail.address_require;
						this.ruleform.phone_require = msg.detail.phone_require;
						this.ruleform.can_post = msg.detail.can_post;
						this.ruleform.otheramount = "";
						
						delete this.ruleform.id;
						delete this.ruleform.status;
						delete this.ruleform.online;
					}else{
						this.ruleform.amount = this.amountArr[0];
						this.ruleform.show_other_price = msg.detail.show_other_price;
						this.ruleform.evaluate = msg.detail.evaluate;
						this.ruleform.address_require = msg.detail.address_require;
						this.ruleform.phone_require = msg.detail.phone_require;
						this.ruleform.can_post = msg.detail.can_post;
					
					}

				});
			}
		}
	}
</script>
