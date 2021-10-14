<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view v-for="v in data.lists.data">
				<projectLists :lists="v.projects"></projectLists>
			</view>
		</view>
	</view>
</template>

<script>
	import projectLists from "@/components/project_lists.vue";
	export default {
		components:{projectLists},
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
					console.log(this.data);
					if(this.data.query.title){
							this.setTitle(this.data.query.title);
					}else{
						if(msg.lists.data.length){
							this.setTitle(msg.lists.data[0].name);
						}
					}
					
				});
			}
		}
	}
</script>
<style scoped>
@import "./index.css";
</style>