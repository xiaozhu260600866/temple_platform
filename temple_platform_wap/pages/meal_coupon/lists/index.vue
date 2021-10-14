<template>
	<view class="pb60">
		<page :parentData="data" :formAction="formAction" Fbottom="bottom:45px">
			<!-- <view slot="floatBtn">
				<view @click="goto('/pages/index/index',2)">
					<floatBtn iSize="fs-22" myclass="goindex" shadow title="返回首页" nSize="fs-15"></floatBtn>
				</view>
			</view> -->
		</page>
		<view v-if="data.show">
			<dx-tabs :tabs="[
					{value: 0,name: '待使用',num: data.count0},
					{value: 1,name: '已使用',num:data.count1},
					{value: 2,name: '已过期',num: data.count2},
				]" selectedColor="#A98853" :selectedSize="34" :size="32" :height="96" sliderBgColor="#A98853" v-model="data.query.status" @change="ajax"></dx-tabs>
			<view class="meal-list p10">
				<view class="list_box" v-for="v in data.lists.data">
					<view class="list_item" @click="goto('/pages/meal_coupon/show/index?id='+v.id,1)">
						<view class="item_left fc-white">
							<view class="w-b100 pt5 fs-16">放生功德</view>
							<view class="w-b100 flex-baseline flex-center"><span class="fs-30">{{v.amount}}</span><span class="fs-14">份</span></view>
						</view>
						<view class="item_right">
							<view class="w-b100 coupon-title fs-16 lh-20 wrap2 main-color">{{ v.getName }}</view>
							<view class="w-b100 ir-bottom mt8 fs-14 lh-16 fc-3">
								<view class="tips mb5">提示：需要提前预约后才能使用</view>
								<view class="time">订单日期：<text class="Arial">{{ v.created_at }}</text></view>
								<view class="time" v-if="!v.date">有效期至<text class="Arial">{{ v.end_at }}</text></view>
								<view class="time" v-if="v.date && data.query.status != 1">已预约：<text class="Arial pr5">{{ v.date }}</text>{{ v.meal_time }}</view>
								<view class="time" v-if="data.query.status == 1">使用日期：<text class="Arial">{{ v.updated_at }}</text>{{ v.meal_time }}</view>
							</view>
						</view>
						<view class="status-icon">
							<image class="img" src="https://temple.doxinsoft.com/images/wap/used-state.png" v-if="v.status == 1"></image>
							<image class="img" src="https://temple.doxinsoft.com/images/wap/date-state.png" v-if="v.status == 2"></image>
						</view>
					</view>
					<view class="status" v-if="v.status == 0">
						<!-- <view class="nav" @click="goto('/pages/meal_coupon/appointment/create_edit',1)">线上预约</view>
						<view class="nav" @click="phone('13542193716')">电话预约</view> -->
						<view class="nav on" @click="goto('/pages/meal_coupon/show/index?id='+v.id,1)" v-if="!v.date">立即使用</view>
						<view class="nav obtn" @click="chanelAppointment(v)" v-if="v.date">取消预约</view>
					</view>
				</view>
				<hasMore :parentData="data" source="nodata" message="暂无优惠券"></hasMore>
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
			<!-- <dxftButton type="primary" size="lg" btnBg="#A98853" btnBd="#A98853" @click="goto('/pages/meal_coupon/appointment/create_edit',1)">线上预约</dxftButton> -->
		</view>
	</view>
</template>

<script>
	import "./index.css";
	import "../buy/index.css";
	import dxTabs from "doxinui/components/tabs/tabs"
	import dxftButton from "doxinui/components/button/footer-button"
	export default {
		components:{dxTabs,dxftButton},
		data() {
			return {
				formAction: '/project/order/dinnerTicketLists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				couponL:[
					{amount:'100',name:'清凉斋电子餐券',end_at:'2021-12-31',status:0},
					{amount:'10',name:'大斋堂电子餐券',end_at:'2021-12-31',status:1},
				],
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
			chanelAppointment(v){
				this.getConfirm("是否取消预约",msg=>{
					this.postAjax("/user/dinnerOrderCancel",v).then(msg=>{
						if(msg.data.status == 2){
							this.ajax();
						}
					});
				})
			},
			ajax() {
				this.getAjax(this).then(msg => {
				
				});
			}
		}
	}
</script>
