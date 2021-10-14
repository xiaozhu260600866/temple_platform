<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view class="mca-lists">
			<dx-tabs v-model="data.query.status" :tabs="tabs" selectedColor="#A98853" sliderBgColor="#A98853" :size="32" :selectedSize="32" :height="88"></dx-tabs>
			<view class="mca-item block-sec" v-for="v in appLists">
				<view class="item-top">
					<view>预约编号：<text class="Arial">{{ v.order_no }}</text></view>
					<view>预约时间：<text class="Arial">{{ v.time }}</text></view>
				</view>
				<view class="item-con">
					<view class="c-row">
						<view class="llabel">斋堂：</view>
						<view class="rvalue">{{ v.meal }}</view>
					</view>
					<view class="c-row">
						<view class="llabel">用餐人数：</view>
						<view class="rvalue Arial">{{ v.num }}</view>
					</view>
					<view class="c-row">
						<view class="llabel">用餐日期：</view>
						<view class="rvalue"><text class="Arial mr5">{{ v.date }}</text>{{v.meal_time}}</view>
					</view>
					<view class="c-row">
						<view class="llabel">留言：</view>
						<view class="rvalue">{{ v.remark }}</view>
					</view>
				</view>
				<!-- 只是未确认显示 -->
				<view class="item-btn">
					<view class="nav on" @click="goto('/pages/meal_coupon/appointment/create_edit',1)">修改预约</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	import dxButton from "doxinui/components/button/button"
	import dxTabs from "doxinui/components/tabs/tabs"
	export default {
		components:{dxButton,dxTabs},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				ruleform:{},
				tabs: [
					{name: "未确认",value:0,},
					{name: "已确认",value:1},
				],
				appLists:[{
					order_no:'202103062262336',
					time:'2021-03-06 08:50:32',
					meal:'清凉斋',
					num: 5,
					date:'2021-03-07',
					meal_time:'午餐',
					remark: '是否可以按排同一桌'
				}]
			}
		},
		onShareAppMessage() {
			return this.shareSource(this, '观音寺');
		},
		onLoad(options) {
			//this.ajax();
		},
		onShow(){
			this.onShow(this);
		},
		methods: {
			
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
					this.amountArr = this.amount_str.split(",");
					this.ruleform.amount = this.amountArr[0];
				});
			}
		}
	}
</script>
