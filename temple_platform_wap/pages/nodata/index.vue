<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pt100 fs-24 fw-bold text-center">通告</view>
		<view class="pt20 plr50 fs-20 text-center lh-2">线上平台现已停止使用<br>愿以此功德，庄严佛净土<br>上报四重恩，下济三途苦<br>若有见闻者，悉发菩提心<br>尽此一报身，同生极乐国</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/project/wapindex',
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
					this.setTitle(this.data.siteConfig.web_name+'(日行一善)');
					console.log(this.data);
				});
			}
		}
	}
</script>
<style>
@import "./index.css";
</style>