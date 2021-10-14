<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view class="detail" v-if="data.show">
			<view class="banner">
				<myswiper :lists="data.covers" purl="room"></myswiper>
			</view>
			<view class="Dtop bg-f"> 
				<view class="title">{{data.detail.name}}</view>
				<view class="price plr15 fs-24 pb10"><text class="fs-14">￥</text>{{data.detail.price}}</view>
			</view>
			<view class="content pb50 bg-f mt10">
				<view class="box">
					<view class="desc">
						<view class="tt flex">
							<span id="two1" class="hover">详情介绍</span>
						</view>
						<view v-if="showType == 0" class="p10 con-detail">
							<!-- <div v-html="data.detail.content"></div> -->
							<u-parse :content="data.detail.content" />
						</view>
					</view>
				</view>
			</view>
			<view id="footer-btn" class="p0 bd-te">
				<view class="Bitem text-center" @click="goto('/pages/index/index',2)">
					<view class="lh-28 h-28">
						<i class="iconfont icon-home fs-20"></i>
					</view>
					<view class="fs-12 lh-18">首页</view>
				</view>
				<view class="Bitem text-center" @click="phone('0750-3663581')">
					<view class="lh-28 h-28">
						<i class="iconfont icon-service fs-20"></i>
					</view>
					<view class="fs-12 lh-18">客堂电话</view>
				</view>
			
				<view class="flex1 pr10 ptb5 ml10">
					<view class="f-dx-btn dx-btn-orange text-center" @click="goto('/pages/room/order/buy/index?id='+data.detail.id,1)">
						<text class="iconfont icon-like-circle fc-white fs-18 pr5"></text>我要订房
					</view>
				</view>
			</view>
			<view class="btn"></view>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components:{
			uParse
		},
		data() {
			return {
				formAction: '/roomAppointment/room/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				showType: 0,
				selectKey:0,
				ruleform: {},
				vaildate: {},
				getSiteName: this.getSiteName(),
			}
		},
		computed: {
			amount() {
				let amount = 0;
				if (this.ruleform.amount) {
					amount += parseFloat(this.ruleform.amount);
				}
				if (this.ruleform.amount && this.ruleform.is_top) {
					amount += parseFloat(this.ruleform.top_price);
				}
				return amount.toFixed(2);
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
			let obj = {};
						// #ifdef MP-WEIXIN
						obj = wx.getMenuButtonBoundingClientRect();
						// #endif
						// #ifdef MP-BAIDU
						obj = swan.getMenuButtonBoundingClientRect();
						// #endif
						// #ifdef MP-ALIPAY
						my.hideAddToDesktopMenu();
						// #endif
						uni.getSystemInfo({
							success: (res) => {
								this.width = obj.left || res.windowWidth;
								this.height_ = obj.top ? (obj.top + obj.height + 8) : (res.statusBarHeight + 44);
								this.top = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
								this.scrollH = res.windowWidth
								this.width_ = res.windowWidth
								this.height = res.windowHeight
							}
						})
			this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					this.setTitle(msg.detail.name);
					this.$refs.page.share(msg.detail.name,msg.detail.firstCover,this.data.siteConfig.share_descript);
				});
			}
		}
	}
</script>
