<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="withdraw p15 bg-f mb12">
				<view class="fs-17 fc-3 mb10">账户余额<text class="Arial plr5">{{data.price.toFixed(2)}}</text>元</view>
				<view class="withdraw-box">
					<view class="box-label">提现金额</view>
					<weui-input v-model="ruleform.amount" myclass="input" errorMessage="提现金额" placeholder="请输入提现金额" type="text" name="amount" datatype="require|price"></weui-input>
				</view>
			</view>
			<view class="bg-f type">
				<view class="fs-17 p15 pb5">填写银行卡信息</view>
				<weui-input v-model="ruleform.blank_client_name" label="姓名" placeholder="请输入姓名" type="text" name="blank_client_name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.blank_name" name="blank_name" label="选择银行" changeField="value" type="select" :dataKey="'bankTypeArr'" datatype="require"></weui-input>
				<weui-input v-model="ruleform.blank_cardno" label="银行卡号" placeholder="请输入银行卡号" type="text" name="blank_cardno" datatype="require"></weui-input>
			</view>
			<view class="m20">
				<dx-button type="primary" size="lg" round btnBg="#BA9A5D" btnBd="#BA9A5D" block @click="submit">提现</dx-button>
			</view>
			<view class="fs-14 fc-6 mt10 text-center">满50元可申请提现</view>
		</view>
	</view>
</template>

<script>
	import dxButton from "doxinui/components/button/button"
	import '../../../provider.js';
	export default {
		components:{dxButton},
		data() {
			return {
				formAction: '/staff/do-money',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform: {},
				vaildate:{},
				bankTypeArr: [
					{label: '中国工商银行',value: '中国工商银行'},
					{label: '中国建设银行',value: '中国建设银行'},
					{label: '中国银行',value: '中国银行'},
					{label: '招商银行',value: '招商银行'},
					{label: '中国农业银行',value: '中国农业银行'},
					{label: '平安银行',value: '平安银行'},
					{label: '浦发银行',value: '浦发银行'},
					{label: '中国光大银行',value: '中国光大银行'},
					{label: '兴业银行',value: '兴业银行'},
					{label: '交通银行',value: '交通银行'},
					{label: '中国民生银行',value: '中国民生银行'},
					{label: '中信银行',value: '中信银行'},
					{label: '中国邮政储蓄银行',value: '中国邮政储蓄银行'},
					{label: '农村商业银行',value: '农村商业银行'},
					{label: '发展银行',value: '发展银行'},
					{label: '其他银行',value: '其他银行'},
				],
				searchType:'today',
				putaway0amount:0,
				putaway1amount:0,
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		onShow(){
			console.log(123)
			this.onShow(this);
		},
		methods: {
			submit(){
				setTimeout(()=>{
					this.vaildForm(this, res => {
						if (res) {
							if(this.ruleform.amount <50){
								return this.getError("必须要大于50元才能够提现");
							}
							this.postAjax(this.formAction,this.ruleform).then(msg=>{
								if(msg.data.status == 2){
									return this.goto('/pages/staff/withdraw/result',1)
								}
							})
							
						}
					})
				},100);
				
			},
			ajax() {
				this.getAjax(this,{  }).then(msg => {
					
				});
			}
		}
	}
</script>
<style>
@import "./index.css";
</style>