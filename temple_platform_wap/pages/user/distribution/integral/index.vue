<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="integral-head">
				<image class="bg flex" src="https://temple.doxinsoft.com/images/wap/wap-integral-bg.png" mode="widthFix"></image>
				<view class="count">
					<view class="num">{{ data.user.integral}} / {{ data.IntegralCount }}</view>
					<view class="fs-14 fc-6">现有莲花/总莲花</view>
				</view>
			</view>
			<view class="flex-between bg-f integral-time flex-middle">
				<!-- <dx-tabs :tabs="tabs" selectedColor="#EB0909" sliderBgColor="#EB0909" @change="change"></dx-tabs> -->
				<view class="flex1"><dx-tabs-scroll v-model="type" :tabs="tabs" :height="50" :nameSize="15"></dx-tabs-scroll></view>
				<view class="select-date">
					<weui-input v-model="ruleform.date" myclass="ptb0" name="date" changeField="value" type="select" dataKey="dateArr"></weui-input>
					<view class="other-time" v-if="ruleform.date == 'other'">
						<weui-input v-model="ruleform.start_date" type="date" name="start_date"></weui-input>
						<view class="and">—</view>
						<weui-input v-model="ruleform.end_date" type="date" name="end_date" @callback="search_"></weui-input>
					</view>
				</view>
			</view>
			<view class="bg-f">
				<dx-list-msg :name="v.getOrder? v.getOrder.getActivity.name+'('+v.getOrder.getUser.nickname+')' :''" :content="v.created_at" v-for="(v,key) in data.inLists" v-if="type == 0">
					<view slot="right">
						<view class="Arial fs-17" :class="[v.status == 1 ?'fc-red': '']">
							<text class="pr3">+</text>
							<text>{{ v.integral }}</text>
						</view>
					</view>
				</dx-list-msg>
				<dx-list-msg :name="v.source" :content="v.created_at" v-for="(v,key) in data.outLists" v-if="type == 1">
					<view slot="right">
						<view class="Arial fs-17" :class="[v.status == 1 ?'fc-red': '']">
							<text class="pr3">-</text>
							<text>{{ v.integral }}</text>
						</view>
					</view>
				</dx-list-msg>
			</view>
		
		</view>
	</view>
</template>

<script>
	import "./index.css";
	import dxListMsg from "doxinui/components/list-cell/list-msg"
	import dxTabsScroll from "doxinui/components/tabs/tabs_scroll"
	export default {
		components:{dxListMsg,dxTabsScroll},
		data() {
			return {
				formAction: '/user/shareCount',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				dataShow: false,
				type:0,
				integral:{
					nowNum: 1,
					amount: 2
				},
				ruleform:{
					date: 1
				},
				integralArr:[{
					title: '签到有礼',
					time: '2020-07-24 17:50:36',
					status: 0,
					integral: 10
				},{
					title: '积分过期',
					time: '2020-07-24 8:00:00',
					status: 1,
					integral: 5
				}],
				tabs: [
					{value: 0,name: "收入",},
					{value: 1,name: "支出"}
				],
				dateArr: [
					{label: '全部',value: 1},
					{label: '今日',value: 2},
					{label: '昨日',value: 3},
					{label: '本月',value: 4},
					{label: '自定义',value: 'other'}
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
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
