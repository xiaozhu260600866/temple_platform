<template>
	<view>
		<page :parentData="data" :formAction="formAction" Fbottom="bottom: 25px">
			<view slot="floatBtn">
				<view @click="goto('/pages/shop/cart/index',1)">
					<floatBtn icon="icon-luckBag-fill" myclass="topFloat float-nav-red main-bg main-bd" iSize="fs-23" openType="contact" shadow></floatBtn>
				</view>
			</view>
		</page>
		<view v-if="data.show">
			<shopProductLists :lists="data.productLists"></shopProductLists>
		</view>
	</view>
</template>

<script>
	import shopProductLists from "@/components/shop_product_lists.vue";
	export default {
		components:{shopProductLists},
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
<style scoped="">
@import "./index.css";	
</style>