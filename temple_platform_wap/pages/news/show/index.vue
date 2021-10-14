<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<div class="content" v-if="data.show">
			<!-- <p class="fs-18 fc-3 lh-24 p15">{{ data.detail.title }}</p> -->
			<div class="con p15 pt5">
				<u-parse :content="data.detail.content" />
			</div>
		</div>
	</view>
</template>

<script>
	import "@/components/gaoyia-parse/parse.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import "./index.css";
	export default {
		components: {
			uParse,
		},
		data() {
			return {
				formAction: '/article/edit',
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
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			ajax() {
			
				this.getAjax(this).then(msg => {
					this.setTitle(this.data.detail.title);
					console.log(this.data);
				});
			}
		}
	}
</script>
