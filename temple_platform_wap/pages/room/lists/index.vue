<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="time-group mb8" @click="$refs.calendar.thisCalendar=true">
				<view class="item">
					<view class="txt">入住</view>
					<view class="time">8月11日<text class="week">周三</text></view>
				</view>
				<view class="item">
					<view class="txt">离店</view>
					<view class="time">8月12日<text class="week">周四</text></view>
				</view>
				<view class="right">
					<view class="count">共<text class="Arial plr3">1</text>晚</view>
					<view class="icon dxi-icon dxi-icon-right2"></view>
				</view>
			</view>
			<view class="room-lists">
				<view class="room-item" v-for="item in roomLists">
					<view class="cover">
						<image class="img" :src="item.cover" mode="aspectFill"></image>
					</view>
					<view class="info" @click="goto('/pages/room/order/buy/index',1)">
						<view class="w-b100">
							<view class="name fs-17 fw-bold">{{item.name}}</view>
							<view class="tips fs-14 fc-7 mt8">{{item.remark}}</view>
						</view>
						<view class="price w-b100 fs-20 mt10"><text class="fs-14">￥</text>{{item.price}}</view>
					</view>
					<view class="btn" @click="goto('/pages/room/order/buy/index',1)">
						<view class="to">订</view>
					</view>
				</view>
			</view>
			<calendar :is-show="false" :start-date="startDate" :end-date="endDate" mode="2" theme-color="#ff721f" :init-month="2" @callback="getDate" ref="calendar"></calendar>
		</view>
	</view>
</template>

<script>
	import Calendar from '@/components/Calendar/Calendar.vue'
	export default {
		components:{Calendar},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				roomLists:[
					{
						cover:'https://temple.doxinsoft.com/upload/images/project/300_nJNOlp39jP.jpg',
						name:'豪华大床房',
						content: '含早餐 25m 大床 2人入住 有窗',
						price:'99'
					},{
						cover:'https://temple.doxinsoft.com/upload/images/project/800_1E6bb9lZ61.jpg',
						name:'豪华双床房',
						content: '含早餐 20~28m 双床 2人入住 有窗',
						price:'99'
					}
				],
				startDate:'',
				endDate:'',
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
			//this.ajax();
		},
		onShow(){
			console.log(123)
			this.onShow(this);
		},
		methods: {
			getDate(date){
				console.log(date)
			},
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