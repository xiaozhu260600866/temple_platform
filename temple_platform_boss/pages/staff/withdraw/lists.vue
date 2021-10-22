<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="brecord-list bg-f p10 mb10 flex-between lh-26" v-for="item in data.lists.data">
				<view class="group fs-16">
					<view>提现</view>
					<view class="Arial fc-red">-{{item.amount}}</view>
				</view>
				<view class="group text-right fc-9 fs-14">
					<view class="Arial">{{item.created_at}}</view>
					<view>{{item.getStatus}}</view>
				</view>
			</view>
			<hasMore :parentData="data"></hasMore>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/staff/come-out-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				lists:[
					{amount:'100.00',created_at:'2020-12-09 17:33:23',getStatus:'审核中'}
				]
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