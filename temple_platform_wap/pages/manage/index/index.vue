<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="manage-head main-bg">
				<view class="head-box">
					<view class="head">
						<image class="img" src="https://boss.doxinsoft.com/images/nouser01.png"></image>
					</view>
					<view class="info">
						<view class="position">清凉斋</view>
						<view class="name">林生</view>
					</view>
				</view>
			</view>
			<dx-nav-class :data="navGroup" @click="checkAuth" myclass="block-sec" :iconSize="32" iconColor="#A98853" :nameSize="15" nameColor="#666" :num="3"></dx-nav-class>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	import dxNavClass from "doxinui/components/nav-class/nav-class"
	export default {
		components:{dxNavClass},
		data() {
			return {
				formAction: '/shop/product/class',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				navGroup: [{
					url:"/pages/manage/reserve/lists/index",
					type:1,
					icon:"iconfont icon-manage-reserve",
					name:"今日预定"
				},{
					url:"/pages/manage/order/lists/index",
					type:1,
					icon:"iconfont icon-manage-order",
					name:"订单管理"
				},{
					url:"/pages/member/lists",
					type:1,
					icon:"iconfont icon-manage-scan",
					name:"扫一扫"
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
			checkAuth(v){
				return this.goto(v.url,v.type);
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
