<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="pro-list" v-if="data.show">
			<view class="info-header">
				<view class="ih-item" @click="goto('/pages/user/distribution/integral/index',1)">
					<view class="row num">{{data.integral}}</view>
					<view class="name">我的莲花</view>
				</view>
				<view class="ih-item" @click="goto('/pages/user/distribution/integral/shop/order/lists/index?status=3',1)">
					<view class="row iconfont icon-intergral-order"></view>
					<view class="name">兑换订单</view>
				</view>
			</view>
			<view class="porducts">
				<view class="pro-div pb5" v-for="item in data.lists.data">
					<view class="pro-box" @click="goto('/pages/user/distribution/integral/shop/show/index?id='+item.id,1)">
						<view class="cms_cover">
							<image class="img" :src="item.firstCover" mode="aspectFill"/>
						</view>
						<view class="cms_title nowrap">{{item.name}}</view>
						<view class="cms_price">
							<view class="price fs-16 flex-baseline lh-24">{{item.integral}}<text class="fs-12 fc-9 pl3"> 莲花</text></view>
						</view>
					</view>
				</view>
			
			</view>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/shop/integral/lists?type=0',
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
					console.log(this.data);
				});
			}
		}
	}
</script>
<style scoped>
@import url("./index.css");
</style>