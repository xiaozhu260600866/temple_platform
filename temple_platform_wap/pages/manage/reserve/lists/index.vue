<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<dx-tabs :tabs="navbar" selectedColor="#A98853" sliderBgColor="#A98853"></dx-tabs>
			<view class="morder">
				<view class="morder-list block-sec" v-for="item in morderL">
					<view class="morder-top">
						<view class="left">
							<view>日期：<text>{{ item.created_at }}</text></view>
							<view>订单号：<text>{{ item.order_no }}</text></view>
						</view>
						<view class="status"></view>
					</view>
					<view class="morder-con">
						<view class="crow">
							<view class="llabel">斋堂：</view>
							<view class="rvalue">{{ item.site }}</view>
						</view>
						<view class="crow">
							<view class="llabel">姓名：</view>
							<view class="rvalue">{{ item.name }}</view>
						</view>
						<view class="crow">
							<view class="llabel">电话：</view>
							<view class="rvalue Arial">{{ item.phone }}</view>
						</view>
						<view class="crow">
							<view class="llabel">预约时间：</view>
							<view class="rvalue Arial">{{ item.time }}</view>
						</view>
					</view>
					<view class="morder-nav">
						<view class="nav main-bg">马上核销</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	import dxTabs from "doxinui/components/tabs/tabs"
	export default {
		components:{dxTabs},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				navbar: [
					{value: 0,name: "待确认",num: 3},
					{value: 1,name: "已确认"},
				],
				morderL:[{
					created_at: '2021-02-04 11:36:40',
					order_no: 2021030032000523,
					site:'清凉斋',
					name:'林生',
					phone:'13380951183',
					time: '2021-02-04 18:00:00',
				}]
			}
		},
		onReachBottom() {
			this.hasMore(this);
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			//this.ajax();
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
