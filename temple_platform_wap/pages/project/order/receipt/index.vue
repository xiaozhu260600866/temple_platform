<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view class="receipt">
			<view class="re-title fs-20 lh-50 text-center ptb20">江门市叱石观音寺电子收据</view>
			<view class="re-box mlr15 bd-e bg-f bdr6">
				<view class="re-ul bd-be ptb8">
					<view class="re-li">
						<view class="re-label">编号：</view>
						<view class="re-value">{{data.detail.order_no}}</view>
					</view>
					<view class="re-li">
						<view class="re-label">日期：</view>
						<view class="re-value">{{data.detail.payed_at}}</view>
					</view>
					<view class="re-li" v-if="data.detail.projects">
						<view class="re-label">项目：</view>
						<view class="re-value"> {{data.detail.projects.name}}</view>
					</view>
					<view class="re-li">
						<view class="re-label">金额：</view>
						<view class="re-value">{{data.detail.amount}}</view>
					</view>
					<view class="re-li">
						<view class="re-label">支付方式：</view>
						<view class="re-value">微信支付</view>
					</view>
				</view>
				<view class="re-ul ptb8">
					<view class="re-li">
						<view class="re-label">收款单位：</view>
						<view class="re-value">江门市叱石观音寺</view>
					</view>
				</view>
			</view>
			<view class="m15">
				<view class="dx-btn dx-btn-lg dx-btn-default-o w-b100 bd-e fc-3" @click="goto('/pages/index/index',2)">返回首页</view>
			</view>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		components:{
			
		},
		data() {
			return {
				formAction: '/project/order/detail',
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
		onLoad() {
			this.ajax();
		},
		onShow() {
			this.onShow(this);
		},
		methods: {
			ajax() {
				
				this.getAjax(this).then(msg => {
					//let desc = "当八周年庆典遇上双“十一”活动，全年仅此一次，不容错过，11元开团，可2-5人组团报名，低至六折";
					//this.$refs.page.share('嫣艺舞蹈','https://yy-dance.doxinsoft.com/upload/images/product/G5UVwKktkv.jpeg',desc);
				});
			}
		}
	}
</script>
