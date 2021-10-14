<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view>
			<view class="pay-top" v-if="status = 1">
				<view class="iconfont icon-pay-yes"></view>
				<view class="p">牌位登记成功，感恩您的发心！</view>
				<view class="p">您已成功随喜 {{amount}} 元</view>
			</view>
			<view class="pay-top" v-else>
				<view class="iconfont icon-pay-no"></view>
				<view class="p">支付失败</view>
			</view>
			<view class="m20 mt0">
				<view class="dx-btn dx-btn-lg dx-btn-orange w-b100" @click="toIndex">返回首页</view>
				<view class="mtb10 flex">
					<view class="dx-btn dx-btn-lg dx-btn-green w-b100 mr10" @click="$refs.cert.ajax(data.detail,true)">电子收据</view>
					<view class="dx-btn dx-btn-lg dx-btn-green w-b100" @click="$refs.type998.show = true">电子牌位</view>
				</view>
			</view>
			<cert ref="cert"></cert>
			<tabletType998 ref="type998" @callBack="resTablet"></tabletType998>
		</view>
	</view>
</template>
<script>
	import cert from "@/components/tablet/cert.vue";
	import tabletType998 from "@/components/tablet/type998.vue";
	export default {
		components:{cert,tabletType998},
		data() {
			return {
				formAction: '',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				status: 1,
				amount: 300,
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
			//this.ajax();
		},
		onShow() {
			//this.onShow(this);
		},
		methods: {
			
			toIndex(){
				window.location.href="https://temple.doxinsoft.com/h5";
			},
			ajax() {
				this.getAjax(this).then(msg => {
					
				});
			}
		}
	}
</script>