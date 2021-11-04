<template class="user-body">
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view v-if="data.show">
			<view class="Uhead-info bg-f">
				<view class="Uhead-bg">
					<image class="img" src="/static/mine-bg.png" mode="aspectFill"></image>
				</view>
				<!-- 未登录/游客显示 -->
				<view class="Utop plr20" @click="toWechatUser" v-if="data.user.nickname == '微信用户'">
					<view class="header-img">
						<image class="img" :src="getSiteName +'/images/nouserW.png'" ></image>
					</view>
					<view class="login-nav pl20 pr15 lh-28 fc-white fs-14 bdr14">点击授权<span class="iconfont icon-right fs-10 fc-white pl3"></span></view>
				</view>
				<!-- 已登录显示 -->
				<view class="Utop plr20" v-else>
					<view class="header-img">
						<image class="img" :src="data.user.headimgurl ? data.user.headimgurl :''"></image>
					</view>
					<view>
						<view class="fs-18 mt8 fc-white lh-28">{{data.user.username}}</view>
						<!-- <view class="fs-16 lh-22 fc-white">您已随喜善款 {{data.orderSum}} 份</view> -->
					</view>
				</view>
			</view>
			<view class="block-sec top-sec">
				<dx-nav-class :data="[
					{url:'/pages/user/order/project',type: 1,icon:'iconfont icon-user-record',name:'我的功德'},
					//{url:'/pages/user/order/tablet',type: 1,icon:'iconfont icon-user-tablet',name:'我的牌位'},
					{url:'/pages/user/order/shop?status=3',type: 1,icon:'dxi-icon dxi-icon-order',name:'法物流通订单'},
					//{url:'/pages/user/order/room',type: 1,icon:'iconfont icon-user-room',name:'我的客房'},
					//{url:'/pages/user/distribution/index/index',type: 1,cover:'http://temple.doxinsoft.com/images/wap/wap-user04.png',name:'我的分享'},
					//{url:'',type: 1,cover:'http://temple.doxinsoft.com/images/wap/wap-user06.png',name:'一键导航'},
					//{url:'',type: 1,cover:'http://temple.doxinsoft.com/images/wap/wap-user07.png',name:'客堂电话'},
					//{url:'',type: 1,cover:'http://temple.doxinsoft.com/images/wap/wap-user08.png',name:'客堂手机/微信'},
					//{url:'/pages/room/index/index',type: 1,cover:'http://temple.doxinsoft.com/images/wap/wap-user05.png',name:'客房'},
				]" @click="checkAuth" myclass="mtb10" :num="2" iconColor="#A98853" :nameSize="15" :iconSize="28" :imgWidth="42" :imgHeight="42" :imgR="14">
				
				</dx-nav-class>
			</view>
			<view class="block-sec">
			<!-- 	<dx-list-cell arrow name="我的分享" :nameSize="16" slotLeft="true" @click="goto('/pages/user/distribution/index/index',1)">
					<view slot="left"><i class="dxi-icon dxi-icon-share-empty main-color fs-20"></i></view>
				</dx-list-cell>
				<dx-list-cell arrow name="一觉覺预定" :nameSize="16" slotLeft="true" @click="goto('/pages/user/order/room',1)">
					<view slot="left"><i class="iconfont icon-user-room main-color fs-20"></i></view>
				</dx-list-cell> -->
				<dx-list-cell arrow name="一键导航" :nameSize="16" slotLeft="true" @click="location(data.siteConfig.location_y, data.siteConfig.location_x, data.siteConfig.address)">
					<view slot="left"><i class="dxi-icon dxi-icon-location main-color fs-20"></i></view>
				</dx-list-cell>
				<dx-list-cell arrow name="客堂电话" :nameSize="16" slotLeft="true" @click="phone(data.siteConfig.phone)">
					<view slot="left"><i class="dxi-icon dxi-icon-tel main-color fs-20"></i></view>
					<view slot="right"><text class="fs-15 Arial fc-3">{{data.siteConfig.phone}}</text></view>
				</dx-list-cell>
				<dx-list-cell arrow name="客堂手机/微信" :nameSize="16" slotLeft="true" @click="phone(data.siteConfig.phone2)">
					<view slot="left"><i class="dxi-icon dxi-icon-phone main-color fs-20"></i></view>
					<view slot="right"><text class="fs-15 Arial fc-3">{{data.siteConfig.phone2}}</text></view>
				</dx-list-cell>
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
				formAction: '/project/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				status: 1,
				message: false
			}
		},

		onPullDownRefresh() {
			this.data.nextPage = 1;
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.$preview.on('close',()=>{//close只是众多事件名的其中一个，更多请查看文档
			    window.location.reload();
			})
			this.ajax();
		},
		onShow(){
			this.onShow(this,1);
		},
		
		methods: {
			toWechatUser(){
				var args = new Object();
				var url1 = window.location.href;
				var url1 = url1.substr(url1.indexOf("?") + 1);
				
				var pairs = url1.split("&"); //在逗号处断开
				for (var i = 0; i < pairs.length; i++) {
					let pos = pairs[i].indexOf('='); //查找name=value
					if (pos == -1) { //如果没有找到就跳过
						continue;
					}
					var argname = pairs[i].substring(0, pos); //提取name
					var value = pairs[i].substring(pos + 1); //提取value
					if (argname != 'openid' && argname != "nickname" && argname != "source" && argname != "headimgurl") {
						args[argname] = unescape(value); //存为属性
					}
				
				}
				let newUrl = window.location.href.substr(0, window.location.href.indexOf("?") + 1);
				let pages = "/pages/user/index/index";
				for (let key1 in args) {
					pages += key1 + '=' + args[key1] + '&';
				}
				//let source = siteName + '/h5/';
				let source = window.location.href.split("#")[0];
				var url = this.getSiteName + '/openidForWechatUser?page=' + pages + '&source=' + source;
				//alert(url);
				let newUrl_ = url.replace("/?from=singlemessage#", "");
				console.log(newUrl_);

				window.location.href = newUrl_;
			},
			ajax() {
				// this.$nextTick(()=>{
				// 	this.$refs.page.share('观音开库','https://temple.doxinsoft.com/images/3033.jpg','日行一善');
				// })
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			},
			// checkAuth(v){
			// 	return this.goto(v.url,v.type);
			// },
			checkAuth(v){
				console.log(v)
				if(v.name == '客堂电话'){
					return this.phone('0750-3663581');
				}
				if(v.name == '客堂手机/微信'){
					return this.phone('18088893041');
				}
				if(v.name == '一键导航'){
					return this.location(22.581670, 113.007105, '江门市蓬江区杜阮镇叱石风景区内');
				}
				return this.goto(v.url,v.type);
			},
		}
	}
</script>
<style scoped="">
@import url("./index.css");
</style>