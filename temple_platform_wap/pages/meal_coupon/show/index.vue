<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="showBox">
				<view class="top-box main-bg">
					<view class="cash-info">
						<view class="price fc-white"><text class="fs-14">￥</text>{{data.detail.amount}}</view>
						<view class="coupon-title fs-16 lh-20 mt10">{{data.detail.getName}}</view>
					</view>
					<image class="status-img" src="https://456.doxinsoft.com/images/wap/used-state.png" v-if="data.detail.status == 1"></image>
					<image class="status-img" src="https://456.doxinsoft.com/images/wap/date-state.png" v-if="data.detail.status == 2"></image>
				</view>
				<view class="con-box">
					<view class="qrcode">
						<image :src="getSiteName + '/upload/images/dinnerTicket/'+data.detail.id+ '.png'" class="img"></image>
						<view class="txt">电子餐券二维码</view>
					</view>
					<view class="cinfo">
						<view class="row">
							<view class="llabel">订单号：</view>
							<view class="rvalue Arial">{{data.detail.order_no}}</view>
						</view>
						<view class="row">
							<view class="llabel">有限期至：</view>
							<view class="rvalue Arial">{{data.detail.end_at}}</view>
						</view>
						<view class="row" v-if="data.order">
							<view class="llabel">使用者：</view>
							<view class="rvalue">{{data.order.bless_name}}</view>
						</view>
						<view class="row" v-if="data.order">
							<view class="llabel">电话：</view>
							<view class="rvalue Arial">{{data.order.phone}}</view>
						</view>
					</view>
					<view class="explain">
						<dx-title name="使用须知" borderColor="#A98853" :borderWidth="30" :borderR="4" nameColor="#333" :nameSize="16" nameBold="bold" Bline></dx-title>
						<view class="content" v-if="data.order">仅用于{{data.order.amount == 10 ? '大斋堂' : '清凉斋'}}节假日适用</view>
					</view>
				</view>
			</view>
			<!-- <view class="m12" @click="phone('0750-3663581')">
				<dx-button type="primary" btnBg="#A98853" btnBd="#A98853" size="lg" block>电话预约</dx-button>
			</view> -->
			<view id="footer-btn" class="p0 bd-te pl10">
				<view class="Bitem text-center" @click="goto('/pages/index/index',2)">
					<view class="ticon">
						<i class="iconfont icon-home"></i>
					</view>
					<view class="bname">首页</view>
				</view>
				<view class="Bitem text-center" @click="phone('13542193716')">
					<view class="ticon">
						<i class="iconfont icon-tel"></i>
					</view>
					<view class="bname">电话预约</view>
				</view>
				<view class="flex1 pr10 ptb5 ml20">
					<view class="f-dx-btn dx-btn-orange text-center f-pay-btn" @click="goto('/pages/meal_coupon/appointment/create_edit',1)">线上预约</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dxButton from "doxinui/components/button/button"　
	import dxTitle from "doxinui/components/title/title"
	export default {
		components:{dxButton,dxTitle},
		data() {
			return {
				formAction: '/project/order/dinnerTicketShow',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				detail:{
					amount:'100',
					name:'清凉斋电子餐券',
					end_at:'2021-12-31',
					status:1,
					img:'https://temple.doxinsoft.com/images/3033.jpg',
					deal_detail: '仅用于清凉斋，节假日适用'
				},
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
@import url("index.css");
@import "../buy/index.css";
</style>