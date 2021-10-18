<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<div v-if="data.show">
			<view class="pay-top" v-if="data.detail.status == 3">
				<view class="iconfont icon-pay-yes"></view>
				<view class="p">感恩您的发心！</view>
				<view class="p">您已成功随喜 {{data.detail.amount}} 元</view>
			</view>
			<view class="pay-top" v-else>
				<view class="iconfont icon-pay-no"></view>
				<view class="p">支付失败</view>
			</view>
			<view class="m20 mt0">
				<view class="dx-btn dx-btn-lg dx-btn-orange w-b100 mr10" @click="toIndex">返回首页</view>
				<view class="mt10 flex">
					<view class="dx-btn dx-btn-lg dx-btn-green w-b100" @click="$refs.cert.ajax(data.detail,true)">功德证书</view>
					<view class="dx-btn dx-btn-lg dx-btn-green w-b100 ml10" @click="$refs.receipt.ajax(data.detail,true)">电子收据</view>
					<view class="dx-btn dx-btn-lg dx-btn-green w-b100 ml10" @click="goto('/pages/meal_coupon/lists/index',1)" v-if="data.detail.project_type ==2">电子餐券</view>
				</view>
			</view>
			<view class="line-title flex-middle plr15 ptb10">
				<view class="line lline mr15"></view>
				<view class="name fs-12 fc-9 lh-20 text-center">看看其他行善积福内容</view>
				<view class="line rline ml15"></view>
			</view>
			<projectLists :lists="data.lists"></projectLists>
			<receipt ref="receipt"></receipt>
			<cert ref="cert"></cert>
		</div>
	</view>
</template>

<script>
	import "./index.css";
	import projectLists from "@/components/project_lists.vue";
	import receipt from "@/components/receipt.vue";
	import cert from "@/components/cert.vue";
	export default {
		components:{
			projectLists,
			receipt,
			cert
		},
		data() {
			return {
				formAction: '/project/order/detail',
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
				return this.goto("/pages/index/index",2);
				window.location.href="https://temple-platform.doxinsoft.com/h5?site_name="+uni.getStorageSync('site_name');
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
