<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<dx-results txt="提交成功" @click="goto('/pages/staff/index/index',1)" tips="我们会在24小时内与您联系！" :tipsSize="16" tipsColor="#666" btntxt="返回"></dx-results>
		</view>
	</view>
</template>

<script>
	import dxResults from "doxinui/components/results/results"
	export default {
		components:{dxResults},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
			}
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