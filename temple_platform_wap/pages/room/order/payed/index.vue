<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<dx-results txt="支付成功" tips="一觉觉入住预订成功，我们将与您联系！" :tipsSize="16" tipsColor="#666" @click="goto('/pages/index/index',2)" v-if="data.detail.status ==3"></dx-results>
			<dx-results txt="支付失败" :success="false" @click="goto('/pages/index/index',2)"  v-else></dx-results>
		</view>
	</view>
</template>

<script>
	import dxResults from "doxinui/components/results/results"
	export default {
		components:{dxResults},
		data() {
			return {
				formAction: '/roomAppointment/order/detail',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
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
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style>
	@import "./index.css";
</style>