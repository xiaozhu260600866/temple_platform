<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view v-if="data.show" class="home">
			<!-- <view class="Irecord">
				<view class="item flex-between flex-middle plr15 ptb8">
					<view class="lh-30 fs-18 fw-bold">{{data.siteConfig.web_name}}</view>
					<view class="flex">
						<view class="t_num fs-16 lh-20">{{ data.orderAmount }}</view>
						<view class="name">份随喜</view>
					</view>
				</view>
			</view> -->
			<view class="banner">
				<myswiper :lists="data.silders.data"></myswiper>
			</view>
			<view class="topShare" v-if="shareTopBtn">
				<view class="left fs-15">点击按钮分享朋友圈</view>
				<dxButton type="primary" size="small" round @click="showShare">立即分享</dxButton>
			</view>
			<view class="shareTip" v-if="shareFriend">
				<view class="share-overlay" @click="closeShare"></view>
				<image class="img" :src="getSiteName+'/images/share-tip.png'" mode="widthFix"></image>
			</view>
			<view class="index-nav">
				<view class="INav_btn item_4 mb5 p5">
					<view class="item ptb10" v-for="item in data.location.data" @click="goto(item.url,1)">
						<view class="Nav_img">
							<image class="img" :src="item.cover"></image>
						</view>
						<view class="txt">{{item.name}}</view>
					</view>
					
				</view>
			</view>
			<!-- <wx-open-launch-weapp id="launch-btn" username="gh_9c4cbc85d5c3"  path="pages/index/index" @error="handleErrorFn" @launch="handleLaunchFn">
				<script type="text/wxtag-template">
						<style>.btn { display: flex;align-items: center; }</style>
						<div><button class="wx-btn">跳转小程序</button></div>
				</script>
			</wx-open-launch-weapp> -->

			<!-- <view class="Imenu flex flex-wrap bg-f"> 
				<view class="Mitem" v-for="v in data.location.data">
					<view class="li" @click="goto(v.url,1)">
						<img :src="v.cover" class="icon flex" />
						<view class="name">{{v.name}}</view>
					</view>
				</view>
			</view> -->
			<view class="v1-qf-list fc-3 fs-13 plr10 lh-20 flex" v-if="data.orderLists.data.length">
				<marquee id="order_list" direction="up" scrollamount="2" width="95%" height="80px" onmouseover="this.stop()"
				 onmouseout="this.start()">
					<view class="v1-qf-list-item " v-for="v in data.orderLists.data" v-if="v.projects">
						<view class="name">{{formatName(v.bless_name)}}：{{v.projects.name}}供养{{getAmount(v.amount)}}份。</view>
					</view>
				</marquee>
			</view>
			<view>
				<view class="duan mt5" v-if="data.activityLists.data.length">
					<view class="title">一元牌位</view>
				</view>
				<activityLists :lists="data.activityLists"></activityLists>
			</view>
			
			<!-- <view>
				<view class="duan" v-if="data.activityLists.data.length">
					<view class="title">祈福登记</view>
				</view>
				<projectLists :lists="projectListsNew"></projectLists>
			</view> -->
			
			<view v-if="data.tabletLists.data.length">
				<view class="duan">
					<view class="title">牌位登记</view>
				</view>
				<tabletLists :lists="data.tabletLists"></tabletLists>
			</view>
			<view v-for="(v,key) in data.lists.data">
				<view class="duan">
					<view class="title">{{v.name}}</view>
				</view>
				<view v-if="key == 1">
					<wx-open-launch-weapp id="launch-btn" username="gh_9c4cbc85d5c3" path="pages/index/index" @error="handleErrorFn" @launch="handleLaunchFn" style="display: block;">
						<script type="text/wxtag-template">
							<view class="gongdang" style="display: flex;padding: 15px;background: #fff;border-bottom: 1px solid #ebebeb;">
								<view class="limg" style="margin-right: 15px;">
									<img class="img" src="https://temple.doxinsoft.com/images/wap/gongdang.jpg" style="width: 120px;height: 92px;border-radius: 6px;display: flex;">
								</view>
								<view class="rtxt" style="flex: 1;display: flex;min-height: 92px;align-content: space-between;flex-wrap: wrap;">
									<view class="tt" style="color: #333;font-size: 17px;line-height: 20px;width: 100%;">供文殊菩萨灯</view>
									<view class="rtb" style="width: 100%;line-height: 1;color: #666;font-size: 14px;display: flex;">
										<img class="img" src="https://temple.doxinsoft.com/images/wap/heart.png" style="width: 14px;height: 14px;display: flex;margin-right: 3px;">共<span class="num" style="color: #fd6512;margin: 0 3px;font-size: 15px;">8968</span>份随喜
									</view>
								</view>
							</view>
						</script>
					</wx-open-launch-weapp>
				</view>
				<projectLists :lists="v.projects"></projectLists>
			</view>
			<view v-if="data.productLists.data.length">
				<view class="duan">
					<view class="title">法物流通</view>
				</view>
				<shopProductLists :lists="data.productLists"></shopProductLists>
			</view>
			<view class="ptb30 text-center fc-9 fs-14">
				<text class="fs-15 Arial pr5">© {{dateYear}}</text>
				<text class="name">{{data.siteConfig.web_name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import "./index.css";
	import projectLists from "@/components/project_lists.vue";
	import tabletLists from "@/components/tablet_lists.vue";
	import activityLists from "@/components/activity_lists.vue";
	import shopProductLists from "@/components/shop_product_lists.vue";
	import dxNavClass from "doxinui/components/nav-class/nav-class";
	export default {
		components:{
			projectLists,
			tabletLists,
			activityLists,
			shopProductLists,
			dxNavClass
		},
		data() {
			return {
				formAction: '/project/wapindex',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				dateYear:'',
				wxOpenTags:'',
				projectListsNew:[],
				shareFriend: false,
				shareTopBtn: false,
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
			this.year();
			this.postAjax("/projectLists.html",{show_index:1}).then(msg=>{
				this.projectListsNew = msg.data.lists;
			})
			if(!uni.getStorageSync("shareTopBtn")){
				this.shareTopBtn = true;
			};
		},
		
		onShow() {
			if(this.data.siteConfig){
				this.$nextTick(()=>{
					this.setTitle(this.data.siteConfig.web_name+'(日行一善)');
					this.$refs.page.share(this.data.siteConfig.share_title,this.getSiteName + '/upload/images/product/300_'+this.data.siteConfig.share_logo,this.data.siteConfig.share_descript);
				})
			}
			this.onShow(this);
		},
		methods: {
			closeShare(){
				this.shareFriend = false;
				uni.setStorageSync("shareTopBtn", 1);
			},
			showShare(){
				this.shareFriend = true;
				this.shareTopBtn = false;
				
			},
			handleErrorFn(e){
			        console.log('fail', e.detail);
			    },
			
			    handleLaunchFn(e){
			        console.log('success');
			    },
			checkAuth(v){
				return this.goto(v.url,1);
			},
			year() {
				let nowDate = new Date();
				let yy = nowDate.getFullYear();
				this.dateYear = yy;
				console.log(5555,yy);
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.setTitle(this.data.siteConfig.web_name+'(日行一善)');
					this.$nextTick(()=>{
						console.log(this.getSiteName + '/upload/images/product/300_'+this.data.siteConfig.share_logo);
						this.$refs.page.share(this.data.siteConfig.share_title,this.getSiteName + '/upload/images/product/300_'+this.data.siteConfig.share_logo,this.data.siteConfig.share_descript);
					})
				});
			}
		}
	}
</script>
