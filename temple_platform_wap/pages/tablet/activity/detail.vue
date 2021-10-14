<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view class="detail" v-if="data.show && data.detail.putaway">
			<view class="content bg-f mt0">
				<view class="box">
					<view class="desc">
						<view class="tt flex">
							<span id="two1" @click="showType =0" :class="[showType == 0 ? 'hover' : '']">详情</span>
							<span id="two3" @click="showType = 1" :class="[showType == 1 ? 'hover' : '']">留言</span>
						</view>
						<!-- 详情 -->
						<view v-if="showType == 0" class="p20 con-detail">
							<u-parse :content="data.detail.content" />
						</view>
						<!-- 留言 -->
						<view v-if="showType ==1">
							
							<view class="list ml15 mr20">
								<view class="items">
									<view class="li" v-for="v in data.lists.data" >
										<view class="wenzi ml0">
											<view class="gaiup flex">
												<view class="gai1 fs-16">{{v.yname ? v.yname : v.nickname}}</view>
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
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import "../show/index.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		components:{uParse},
		data() {
			return {
				formAction: '/activity/show?id=6',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				showType: 0,
				selectKey:0,
				ruleform: {
					price: '1份'
				},
				vaildate: {},
				getSiteName: this.getSiteName(),
				registerTablet: true
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
			share(title,logo,desc) {
				setTimeout(() => {
					
					let url="https://temple.doxinsoft.com/h5/#/pages/tablet/activity/detail?user_id="+this.data.user.id;
					console.log(url);
					this.$refs.page.wx.ready(() => {
						this.$refs.page.wx.onMenuShareAppMessage({
							title: title,
							link: url,
							imgUrl:logo,
							desc:desc,
							success: function(res) {
								//alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
							},
							fail: function(res) {
								alert(JSON.stringify(res));
							}
						});
						this.$refs.page.wx.onMenuShareTimeline({
							title: title,
							link: url,
							imgUrl:logo,
							desc:desc,
							success: function(res) {
								//alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
							},
							fail: function(res) {
								alert(JSON.stringify(res));
							}
						});
						this.$refs.page.wx.showMenuItems({
							menuList: [
								'menuItem:copyUrl', // 复制链接,
								'menuItem:share:appMessage', // 发送给朋友
								'menuItem:share:timeline' // 发送给朋友圈
							],
							success: function(res) {
								//alert('已隐藏“阅读模式”，“分享到朋友圈”，“复制链接”等按钮');
							},
							fail: function(res) {
								alert(JSON.stringify(res));
							}
						});
			
					});
			
				}, 2000)
			
			},
			formSubmitForH5(config, order_no) {
				this.updateUrl(["/pages/index/index"]);
				this.payUniapp(config, msg => {
					return this.goto("/pages/tablet/activity/payed/index?order_no=" + order_no);
				}, msg => {
					return this.goto("/pages/tablet/activity/payed/index?order_no=" + order_no);
				});
			},
			submit(){
				this.vaildForm(this, res => {
					if(res){
						this.postAjax(this.formAction,this.ruleform).then(msg=>{
							 if (msg.data.status == 2) {
							 	this.formSubmitForH5(msg.data.config, msg.data.detail.order_no);
							 }
						});
					}
				});	
			},
			
			ajax() {
				this.getAjax(this).then(msg => {
					this.setTitle(msg.detail.name);
					this.share(msg.detail.name,msg.detail.firstCover,this.data.siteConfig.share_descript);
					this.ruleform.evaluate = msg.detail.evaluate;
				});
			}
		}
	}
</script>
