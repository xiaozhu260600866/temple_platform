<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="room_order">
				<view class="room_order_item" v-for="item in data.lists.data">
					<view class="top_date p10">
						<view class="time fs-15 fc-6 lh-20">
							<view>下单日期：<text class="Arial">{{item.payed_at}}</text></view>
							<view>订单编号：<text class="Arial">{{item.order_no}}</text></view>
						</view>
						<view class="state flex-middle">
							<view class="fc-orange fs-15 pr8">{{item.status_message}}</view>
						</view>
					</view>
					<view class="con_info">
						<view class="cover" v-if="item.room">
							<image class="img" :src="item.room.coverPic" mode="aspectFill"></image>
						</view>
						<view class="info fs-15 lh-20">
							<view class="w-b100 name">{{item.room.name}}{{item.num}}间，{{item.name}}</view>
							<view class="w-b100 date">{{item.start_date}} - {{item.end_date}}</view>
							<view class="w-b100 price fc-3">总价：<text class="Arial">{{item.amount}}</text></view>
							<view class="w-b100 price fc-3">房号：<text class="Arial">{{item.house ? item.house.name :null}}</text></view>
						</view>
					</view>
					<view class="btn-group ptb8 plr10">
						<view class="btn-item">
							<view class="btn-nav" @click="goto('/pages/room/order/buy/index?order_no='+item.order_no,1)">查看详情</view>
						</view>
					</view>
				</view>
				<view class="p50 text-center fc-9 fs-14" v-if="data.lists.data.length == 0">暂无数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formAction: '/roomAppointment/order/lists?status=3',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				roomOrder:[
					{
						payed_at:'2021-08-01 09:33:08',
						order_no:'2021080100003',
						status_message:'已消费',
						cover:'https://temple.doxinsoft.com/upload/images/project/300_nJNOlp39jP.jpg',
						num:1,
						name:'豪华大床房',
						star_date:'2021-08-02',
						end_date:'2021-08-03',
						price:'150'
					}
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