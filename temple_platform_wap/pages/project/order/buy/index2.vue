<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view class="pay detail" v-if="data.show">
			<view class="box-item buy-index2">
				<view class="B_title plr15 ptb20">
					<view class="name fs-20">功德主资料 </view>
				</view>
				<weui-input v-model="ruleform.bless_name" label="功德主姓名" type="text" name="bless_name" datatype="require" :maxlength="6"></weui-input>
				<weui-input v-model="ruleform.phone" label="手机号码" type="number" name="phone" datatype="require"></weui-input>
				<weui-input v-model="ruleform.born_year" label="出生年份" datatype="require" name="born_year" changeField="value" type="select" dataKey="category" placeholder="请选择年份" @callback="bornCallBack"></weui-input>
				<weui-input v-model="ruleform.book_name + '　共' +(amount-20)+'元'" myclass="book_num" label="还寿生经数" name="book_name" changeField="value" type="txt" v-if="ruleform.book_name">
					
				</weui-input>
				<!-- <weui-input v-model="ruleform.num" label="供灯" name="num" type="txt"></weui-input> -->
				<weui-input v-model="ruleform.num2" label="供灯" name="num2" type="txt"></weui-input>
				<weui-input v-model="amount" label="总功德金" name="num" type="txt" v-if="ruleform.book_name"></weui-input>
				<weui-input v-model="ruleform.bless_address" label="功德主现住址" type="text" name="bless_address" datatype="require"></weui-input>
				<weui-input v-model="ruleform.remark" type="textarea" name="remark" placeholder="如有特别说明请备注"></weui-input>
			</view>
			<view class="box-item content buy-index2">
				<view class="Btitle plr15 pt10">
					<view class="name fs-19 lh-30">回向文</view>
				</view>
				<view class="plr15 ptb8">
					<textarea style="height: 100px;" @click="ruleform.evaluate = ''" class="remark" name="remarks" id="remarks" title="请输入您的回向文"
					 placeholder="输入您的回向文，可先小回向(若有)，再大回向" cols="" rows="" v-model="ruleform.evaluate"></textarea>
				</view>
			</view>
			<view class="plr20 pb30">
				<view class="dx-btn dx-btn-big dx-btn-orange w-b100 fs-19" @click="formSubmit">微信支付随喜</view>
			</view>
		</view>
	</view>
</template>
<style scoped="">
@import "../../../../public/css/buycss.css";
@import "./index.css";
</style>
<script>
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
				category:[],
				ruleform: {
					name: '',
					phone: '',
					amount: 20,
					otheramount: '',
					is_post:3,
					type:1,
					evaluate: '',
					num: 20,
					num2: '20元/盏'
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
				if(this.ruleform.book_num){
					amount = this.ruleform.book_num *  this.ruleform.num;
				}
				amount+=20;
				return amount.toFixed(2);
			},
			bookNum(){
				let bookNum = 0
			}
		},


		onShareAppMessage() {
			return this.shareSource(this, '商城1');
		},
		onLoad(options) {
			this.ajax();
		},

		methods: {
			bornCallBack(data){
				this.$set(this.ruleform,"book_name",data.name2);
				this.$set(this.ruleform,"book_num",data.num);
				this.$set(this.ruleform,"num",20);
				console.log(data)
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
				if(this.ruleform.can_post && this.ruleform.is_post == 3){
					this.getError("请选择是否需要邮寄");
					return false;
				}
				if(!this.ruleform.book_num){
					return this.getError("请选择出生年份");
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
				
				// if(!this.open && !this.ruleform.phone && this.ruleform.phone_require){
				// 	this.getError("電話不能為空");
				// 	return false;
				// }
				// if (this.ruleform.phone) {
				// 	var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
				// 	if (!phoneReg.test(this.ruleform.phone)) {
				// 		this.getError("手机格式不正确");
				// 		return false;
				// 	}
				// }
				// if (this.ruleform.address_require && !this.ruleform.bless_address) {
				// 	this.getError('地址不能为空');
				// 	return false;
				// }
				// if(this.ruleform.remark.length >=40){
				// 	this.getError("备注栏限制20个字内，谢谢")
				// 	return false;
				// }
				this.ruleform.project_id = this.data.detail.id;
				
				this.ruleform.amount = parseFloat(this.amount);
				

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
					this.category = msg.category;
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
