<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<div v-if="data.show">
			<view class="pay-top" v-if="data.detail.status == 3">
				<view class="iconfont icon-pay-yes"></view>
				<view class="p">牌位登记成功，感恩您的发心！</view>
				<view class="p">您已成功随喜 {{data.detail.amount}} 元</view>
			</view>
			<view class="pay-top" v-else>
				<view class="iconfont icon-pay-no"></view>
				<view class="p">支付失败</view>
			</view>
			<view class="m20 mt0 flex-between">
				<view class="dx-btn dx-btn-lg dx-btn-orange w-b100 mr10" @click="toIndex">返回首页</view>
				<view class="dx-btn dx-btn-lg dx-btn-orange w-b100 mr10" @click="goto('/pages/user/order/tablet',1)">我的牌位</view>
			</view>
			<view class="line-title flex-middle plr15 ptb10">
				<view class="line lline mr15"></view>
				<view class="name fs-12 fc-9 lh-20 text-center">看看其他行善积福内容</view>
				<view class="line rline ml15"></view>
			</view>
			<tablet_lists :lists="data.lists"></tablet_lists>
		</div>
	</view>
</template>

<script>
	import "./index.css";
	import tablet_lists from "@/components/tablet_lists.vue";
	export default {
		components:{
			tablet_lists,
		},
		data() {
			return {
				formAction: '/tablet/order/detail',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
			}
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
		onLoad() {
			this.ajax();
		},
		onShow() {
			this.onShow(this);
		},
		methods: {
			toIndex(){
				window.location.href="https://temple.doxinsoft.com/h5";
			},
			ajax() {
				this.getAjax(this).then(msg => {
					//this.$refs.receipt.ajax(this.data.detail,false);
					//this.$refs.cert.ajax(this.data.detail,false);
				});
			}
		}
	}
</script>
