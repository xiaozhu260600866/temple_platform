<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<dx-tabs selectedColor="#EB0909" sliderBgColor="#EB0909" @change="changeStatus" v-model="status" :tabs="[
				{value: 3,name: '待使用',},
				{value: 9,name: '已使用',}
			]"></dx-tabs>
			
			
			<view class="pro_info block-sec" v-for="(item,key) in data.listsIntegral.data">
				<view class="order_date fs-14 plr10 bd-be">
					<view class="time">
						<text>下单日期：</text>
						<text class="Arial">{{item.created_at}}</text>
					</view>
					<!-- <view class="state fs-color">{{item.status_message}}</view> -->
				</view>
				<view class="order_info p10 pb5" v-if="item.products">
					<view class="pro_img">
						<image class="img" :src="item.products.firstCover" />
					</view>
					<view class="txt fs-14 nowrap">{{ item.products.name }}</view>
				</view>
				<view class="order_count fs-14 bd-be plr10 pb8">已抵扣：<text class="price">{{item.integral}}</text>莲花</view>
				<!-- <view class="btn-group ptb8 plr10">
					<view class="btn-item">
						<view class="btn-nav" @click="goto('/pages/user/distribution/integral/shop/order/buy/index?order_no='+item.order_no,1)">订单详情</view>
					</view>
					<view class="btn-item" @click="changeOrder(item)" :data-id="item.id" :data-status="0" v-if="item.status!=0">
						<view class="btn-nav">取消订单</view>
					</view>
				</view> -->
			</view>
			<hasMore :parentData="data" source="order"></hasMore>
		</view>
	</view>
</template>

<script>
	import dxTabs from "doxinui/components/tabs/tabs"
	export default {
		components:{
			dxTabs
		},
		data() {
			return {
				formAction: '/shop/integral/lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				status: 3,
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
			this.status = options.status;
			this.ajax();
		},
		methods: {
			changeStatus() {
				
				this.data.nextPage = 1;
				this.ajax();
			},
			changeOrder(item) {
				this.getConfirm("您确认要取消订单吗？", () => {
					this.postAjax("/shop/integral/change-integral-status", {
						id: item.id,
						status: 0
					}).then(msg=>{
						if (msg.data.status == 2) {
							this.data.nextPage = 1;
							this.ajax();
						}
					});
				});
			},
			ajax() {
				this.getAjax(this,{ status: this.status }).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style scoped="">
@import url("./index.css");
</style>