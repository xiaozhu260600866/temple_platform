<template class="user-body">
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view v-if="data.show">
			<view class="shop_order">
				<view class="order_item" v-for="v in data.lists.data">
					<view class="top_date plr10">
						<view class="time fs-14 fc-6 lh-18">
							<view>下单日期：<text class="Arial">{{v.payed_at}}</text></view>
							<view>订单序号：<text class="Arial">{{v.order_no}}</text></view>
						</view>
						<view class="state flex-middle">
							<!-- <view class="fc-orange fs-14 pr8">{{parent.status_message}}</view> -->
						</view>
					</view>
					<orderPro :data="v.products"></orderPro>
					<view class="btn-group ptb8 plr10">
						<view class="btn-item">
							<view class="btn-nav" @click="openDiag = true;$refs.receipt.ajax(v,true)">电子收据</view>
							<view class="btn-nav" @click="openDiag = true;$refs.cert.ajax(v,true)">功德证书</view>
						</view>
					</view>
				</view>
			</view>
			<hasMore :parentData="data"></hasMore>
			
			<receipt ref="receipt"></receipt>
			<cert ref="cert"></cert>
			<view class="p50 text-center fc-9 fs-14" v-if="data.lists.data.length == 0 && status ==1">暂无数据</view>
		</view>
		
	</view>
</template>

<script>
	import "./index.css";
	import receipt from "@/components/receipt.vue";
	import cert from "@/components/cert.vue";
	import dxTabs from "doxinui/components/tabs/tabs"
	import orderPro from "@/components/orderPro";
	export default {
		components:{cert,receipt,dxTabs,orderPro},
		data() {
			return {
				formAction: '/shop/user/order-lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				openDiag:false,
				status: 3,
				message: false,
				tabs: [{
					name: "按项目归类",
					value:0,
				}, {
					name: "按时间排列",
					value:1
				}]
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
		onShow(){
			if(this.openDiag){
				window.location.reload();
			}
			this.onShow(this,1);
		},
		
		methods: {
			change(e) {
				this.ajax();
			},
			ajax() {
				// this.$nextTick(()=>{
				// 	this.$refs.page.share('观音开库','https://temple.doxinsoft.com/images/3033.jpg','日行一善');
				// })
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
