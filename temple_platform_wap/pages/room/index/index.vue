<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view v-if="data.show">
		<!-- 	<view class="banner bannerSwiper">
				<myswiper :lists="[
					{cover:'https://temple.doxinsoft.com/upload/images/poster/zzAIwDlDrc.jpg'},
					{cover:'https://temple.doxinsoft.com/upload/images/poster/HLcldRIPJZ.jpg'}
				]"></myswiper>
			</view>
			<view class="title fs-20 fw-bold plr15 ptb10 bg-f">一觉觉</view>
			<view class="time-group mt8" @click="$refs.calendar.thisCalendar=true">
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
			</view> -->
			<view class="room-lists">
				<view class="room-item" v-for="item in data.lists.data" @click="goto('/pages/room/show/index?id='+item.id,1)">
					<view class="cover">
						<image class="img" :src="item.coverPic" mode="aspectFill"></image>
					</view>
					<view class="info">
						<view class="w-b100">
							<view class="name fs-17 fw-bold pt3">{{item.name}}</view>
							<!-- <view class="tips fs-14 fc-7 mt5 wrap2">{{item.remark}}</view> -->
						</view>
						<view class="price w-b100 fs-20 mt10"><text class="fs-14">￥</text>{{item.price}}</view>
					</view>
					<view class="btn">
						<view class="to">订</view>
					</view>
				</view>
			</view>
		<!-- 	<view class="content bg-f mt8">
				<view class="tt flex">
					<view id="two1" class="name hover">详情</view>
				</view>
				<view class="p10 con-detail">
					<u-parse :content="content" />
				</view>
			</view> -->
		</view>
		<calendar :is-show="false" :start-date="startDate" :end-date="endDate" mode="2" theme-color="#ff721f" :init-month="2" @callback="getDate" ref="calendar">
			<template v-slot:footer>
				<dxftButton type="primary" size="lg" btnBg="#ff721f" btnBd="#ff721f" @click="$refs.calendar.thisCalendar=false">确认</dxftButton>
			</template>
		</calendar>
	</view>
</template>

<script>
	import Calendar from '@/components/Calendar/Calendar.vue'
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{Calendar,dxftButton},
		data() {
			return {
				formAction: '/roomAppointment/room/lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				content: {},
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
			
			this.ajax();
		},
		onShow(){
			
			this.onShow(this);
		},
		methods: {
			getDate(date){
				console.log(date)
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
					this.$nextTick(()=>{
						console.log("aa1")
						this.$refs.page.share('一觉覺禅居',this.getSiteName + '/images/wap/room-share.jpg','一觉覺，睡好觉');
					})
				});
			}
		}
	}
</script>
<style>
@import "../index/index.css";
</style>