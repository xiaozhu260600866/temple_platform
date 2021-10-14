<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view>
			<view class="Uinfo main-bg">
				<view class="header-img pr15">
					<image class="img" :src="data.user.headimgurl ? data.user.headimgurl :''" mode="aspectFill" />
				</view>
				<view class="flex1 flex-between flex-middle">
					<view class="info fc-white flex1">
						<view class="fs-18">{{ data.user.nickname }}</view>
						<view class="fs-16" v-if="data.user.userInfo.name &&　data.user.userInfo.name!=data.user.nickname && data.user.userInfo.name != '游客'">{{ data.user.userInfo.name }}</view><!-- 登记资料后显示真实姓名 -->
					</view>
					<view class="info-nav" @click="goto('/pages/user/distribution/info/index',1)" v-if="!writeInfo">登记资料<span class="iconfont icon-right fs-10 pl3"></span></view>
				</view>
			</view>
			<view class="head-count block-sec">
				<view class="c-item" @click="goto('/pages/user/distribution/integral/index',1)">
					<view class="name">我的莲花</view>
					<view class="num">{{data.user.integral}}</view>
				</view>
				<view class="c-item" @click="goto('/pages/user/distribution/people/index',1)">
					<view class="name">我的朋友</view>
					<view class="num">{{data.shareUsers}}</view>
				</view>
			</view>
			<view class="block-sec">
				<dx-nav-class @click="checkAuth" myclass="mtb10" :iconSize="26" :nameSize="14" :num="3" :data="[
					{url:'/pages/user/distribution/share/index',type:1,icon:'iconfont icon-dis-share',name:'我的分享'},
					{url:'/pages/user/distribution/integral/index',type:1,icon:'iconfont icon-dis-integral',name:'我的莲花'},
					{url:'/pages/user/distribution/people/index',type:1,icon:'iconfont icon-dis-people',name:'我的朋友'},
					{url:'/pages/user/distribution/integral/shop/lists/index',type:1,icon:'iconfont icon-dis-integral-shop',name:'莲花兑换'}
				]"></dx-nav-class>
			</view>
		</view>
	</view>
</template>

<script>
	import dxListCell from "doxinui/components/list-cell/list-cell"
	import dxNavClass from "doxinui/components/nav-class/nav-class"
	export default {
		components:{dxListCell,dxNavClass},
		data() {
			return {
				formAction: '/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				distribution:{
					heder_img: '/static/cert.jpg',
					nickName: '叱石观音寺',
					name: '观音寺',
					phone: 13380951183
				},
				amount:{
					integral: 30,
					people: 13
				},
				writeInfo: false,
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
			this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		onShow(){
			
			this.ajax();
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
<style scoped="">
	@import url("./index.css");
</style>