<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view class="detail pb50" v-if="data.show">
			<view class="banner">
				<myswiper :lists="data.covers" purl="project"></myswiper>
			</view>
			<view class="Dtop"> 
				<view class="title">{{data.detail.name}}</view>
				<view class="amount bg-f">
					<view class="count flex-between">
						<view class="p">已捐 <span class="fc-red plr3"> {{getAmount(data.detail.orderSum)}} </span> 份</view>
						<view class="p">随喜次数<span>{{data.detail.orderNum}}</span>人</view>
					</view>
					<!-- <view class="pro flex">
						<view class="sel-box flex w-b100"><view class="sel" :style="'width:'+data.detail.orderProgress+'%'"></view></view>
						<view class="prov">{{data.detail.orderProgress}}%</view>
					</view>
					<view class="count flex-between">
						<view class="tt tl">
							<view class="p">目标 {{data.detail.target_amount}} 元</view>
							<view class="p">已捐 <span> {{getAmount(data.detail.orderSum)}} </span> 元</view>
						</view>
						<view class="tt tr">
							<view class="p">随喜次数</view>
							<view class="p"><span>{{data.detail.orderNum}}</span>人</view>
						</view>
					</view> -->
				</view>
				<!-- <view class="tip">供佛斋僧积累大福报</view> -->
			</view>
			
			<!-- <view class="desca" v-if="data.lists.data.length" >
				<view class="tt ptb10 fs-16">感恩<span>389</span>位爱心传播者和<span>678</span>位善士</view>
				<view class="ctx flex-between">
					<view class="imgs flex flex1 w-b100">
						<view :class="['li',selectKey == key ? 'ed' : '']" id="one1" @click="selectKey = key" v-for="(v,key) in data.lists.data" v-if="v.user">
							<img class="head lazy" :src="v.user.headimgurl"style="display: inline-block;">
						</view>
					</view>
					<view class="arr" @click="goto('/pages/project/record/index?project_id='+data.detail.id,1)">
						<span class="iconfont icon-right"></span>
					</view>
				</view>
				<view class="ms" id="con_one_1" style="display:block">
					<view class="ms1">{{data.lists.data[selectKey].bless_name ? data.lists.data[selectKey].bless_name : data.lists.data[selectKey].user.nickname}} 随喜<span>{{getAmount(data.lists.data[selectKey].amount)}}</span><span></span>份
					</view>
					<view class="ms2">{{data.lists.data[selectKey].evaluate}}</view>
				</view>
			</view> -->
			
			<view class="content mt10 bg-f">
				<view class="tt">
					<view class="name" @click="showType =0" :class="[showType == 0 ? 'hover' : '']">详情</view>
					<view class="name" @click="showType = 1" :class="[showType == 1 ? 'hover' : '']">留言(<text class="Arial fc-red">{{data.orderCount}}</text>)</view>
				</view>
				<!-- 详情 -->
				<view v-if="showType == 0" class="p20 con-detail">
					<u-parse :content="data.detail.content" />
				</view>
				<!-- 留言 -->
				<view v-if="showType ==1">
					<view class="fs-16 ml15 mr20 lh-30">参与善士</view>
					<view class="list ml15 mr20">
						<view class="items">
							<view class="li" v-for="v in data.lists.data" >
								<!-- <view class="tou"><img class="lazy" :src="v.user.headimgurl"></view> -->
								<view class="wenzi ml0">
									<view class="gaiup flex">
										<view class="gai1 fs-16">{{formatName(v.bless_name ? v.bless_name : v.nickname)}}</view>
										<view class="gai2 fs-16">行善 <span class="fs-16">{{getAmount(v.amount)}}</span> 份</view>
									</view>
									<view class="gaidown fs-16" v-if="v.evaluate">{{v.evaluate}}</view>
									<view class="gaitime fs-16">{{v.payed_at}}</view>
								</view>
							</view>
						</view>
						<hasMore :parentData="data"></hasMore>
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
					<view class="f-dx-btn dx-btn-orange text-center" @click="toBuy">
						<text class="iconfont icon-like-circle fc-white fs-18 pr5"></text>我要随喜
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
				formAction: '/tablet/show',
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
			toBuy(){
				if(this.data.detail.type == 1){
					return this.goto('/pages/tablet/order/buy/type'+this.data.detail.type+'/index?tablet_id='+this.data.detail.id,1)
				}else if(this.data.detail.type == 2){
				    return this.goto('/pages/tablet/order/buy/type2/video/index?tablet_id='+this.data.detail.id,1);	
				}else{
					return this.goto('/pages/tablet/order/buy/type'+this.data.detail.type+'/index?tablet_id='+this.data.detail.id,1)
				}
			
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.setTitle(msg.detail.name);
					this.$refs.page.share(msg.detail.name,msg.detail.firstCover,this.data.siteConfig.share_descript);
				});
			}
		}
	}
</script>
