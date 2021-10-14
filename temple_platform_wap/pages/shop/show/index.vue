<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view class="detail pb60" v-if="data.show">
			<view class="banner">
				<myswiper :lists="data.covers" purl="product"></myswiper>
			</view>
			<view class="Dtop">
				<view class="title">{{data.detail.name}}</view>
				<view class="amount bg-f">
					<view class="count flex-between flex-end">
						<view class="p">
							<block v-if="data.detail.price !=0">
								<text class="fs-24 price pr3">{{getAmount(data.detail.price)}}</text>份
							</block>
						</view>
						<!-- <view class="p">已捐 <span class="fc-red plr3"> {{getAmount(data.detail.orderSum)}} </span> 份</view> -->
						<view class="p">随喜次数<span>{{data.orderCount}}</span>人</view>
					</view>
				</view>
			</view>
			<!-- <view class="buy-num plr15 ptb10 flex-between bd-te bg-f">
				<view class="fs-15 lh-30">选购数量</view>
				<tui-numberbox :value="num" @change="change"></tui-numberbox>
			</view> -->
			<view class="content bg-f mt10">
				<view class="tit">
					<view class="txt" @click="showType=0" :class="[showType==0?'hover':'']">法物流通详情</view>
					<!-- <view class="txt" @click="showType=1" :class="[showType==1?'hover':'']">留言(<text class="fc-red Arial">{{data.orderCount}}</text>)</view> -->
				</view>
				<!-- 详情 -->
				<view v-if="showType == 0" class="p10 con-detail">
					<u-parse :content="data.detail.content" />
				</view>
				<!-- 留言 -->
				<view v-if="showType ==1">
					<view class="fs-16 ml15 mr20 lh-30">参与善士</view>
					<view class="list mlr15">
						<view class="items">
							<view class="li" v-for="v in data.lists.data">
								<!-- <view class="tou"><img class="lazy" :src="v.user.headimgurl"></view> -->
								<view class="wenzi ml0">
									<view class="gaiup flex">
										<view class="gai1 fs-16">{{v.bless_name ? v.bless_name : v.user.nickname}}
										</view>
										<view class="gai2 fs-16">行善 <span class="fs-16">{{getAmount(v.amount)}}</span> 份
										</view>
									</view>
									<view class="gaidown fs-16">{{v.evaluate}}</view>
									<view class="gaitime fs-16">{{v.payed_at}}</view>
								</view>
							</view>
						</view>
						<hasMore :parentData="data"></hasMore>
					</view>
				</view>
			</view>
			<view id="footer-btn" class="p0 pl10 bd-te">
				<view class="Bitem" @click="goto('/pages/index/index',2)">
					<view class="icon">
						<i class="iconfont icon-home fs-20"></i>
					</view>
					<view class="txt">首页</view>
				</view>
				<!-- <view class="Bitem" @click="phone('0750-3663581')">
					<view class="icon">
						<i class="iconfont icon-service fs-20"></i>
					</view>
					<view class="txt">客堂电话</view>
				</view> -->
			<!-- 	<view class="Bitem cart" hover-class="none" @click="toCart">
					<view class="icon">
						<i class="iconfont icon-luckBag fs-20"></i>
					</view>
					<view class="txt">福袋</view>
					<block v-if="data.cartNum >= 1">
						<view class="sum">{{ data.cartNum }}</view>
					</block>
				</view> -->
				<view class="flex1 flex-middle plr5">
					<!-- <view class="f-dx-btn text-center dx-btn-yellow" @click="addCart">
						加入福袋
					</view> -->
					<view class="f-dx-btn text-center dx-btn-red" @click="toBuy">
						我要结缘
					</view>
				</view>
			</view>
			<info :productInfo="data.productInfo" @callback="infoCallBack" ref="productInfo"></info>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import info from './layouts/info'
	import tuiNumberbox from "xiaozhu/uniapp/thorui/components/numberbox/numberbox"
	export default {
		components: {
			uParse,
			info,
			tuiNumberbox
		},
		data() {
			return {
				formAction: '/shop/product/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				showType: 0,
				selectKey: 0,
				num: 1,
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
			infoCallBack(cartNum) {
				this.data.cartNum = cartNum;
			},
			toCart(){
				this.$store.state.mutations.historyUrl=true;
				this.goto('/pages/shop/cart/index?historyUrl=del',1)
			},
			addCart() {
				this.$store.state.mutations.cart = true;
				this.$refs.productInfo.showType = 'addCart';
				if (this.data.productInfo.length > 0) {
					this.$refs.productInfo.toggleInfoDiag();
				} else {
					this.$refs.productInfo.addCartAjax({
						id: this.data.detail.id,
						num: this.num,
						is_info: 0
					});
				}
			},
			toBuy() {
				this.$refs.productInfo.showType = '';
				if (this.data.productInfo.length > 0) {
					this.$refs.productInfo.toggleInfoDiag();
				} else {
					this.$refs.productInfo.addCartAjax({
						id: this.data.detail.id,
						num: this.num,
						is_info: 0
					});
				}
			},
			change: function(e) {
				this.index = e.index;
				this.current = e.index;
				this.num = e.value
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.setTitle(msg.detail.name);
					this.$refs.page.share(msg.detail.name, msg.detail.firstCover, this.data.siteConfig
						.share_descript);
				});
			}
		}
	}
</script>
<style scoped="">
	@import './index.css';
</style>
