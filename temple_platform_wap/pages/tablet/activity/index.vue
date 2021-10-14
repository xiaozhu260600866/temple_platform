<template>
	<view class="pb50">
		<page :parentData="data" :formAction="formAction" ref="page">
		</page>
		<view v-if="data.show">
			<view class="detail" v-if="data.show && data.detail.putaway">
				<view class="select-group block-sec">
					<view class="sg-title">选择登记牌位时间</view>
					<view class="sg-group">
						<view class="sg-nav" :class="amount==time.value?'cur':''" v-for="(time,key) in time"
							@click="amount=time.value">{{ time.name }}{{time.value}}元</view>
					</view>
				</view>
				<view class="show-tablet block-sec">
					<view v-if="!data.canActivity">
						<div class="plr15 pb15">
							<weui-input v-model="ruleform.surname" label="祖先姓氏" placeholder="请输入祖先姓氏（限2个字）" type="text"
								name="surname" datatype="require|chinese|max:2|min:1" maxlength="2"></weui-input>
							<view class="tip">填写示范：林，或欧阳。因牌位有特定书写要求，请不能写Ｘ门、Ｘ氏或２个姓氏</view>
							<weui-input v-model="ruleform.fName" label="先父" placeholder="先父的姓名（限2-4个字）" type="text"
								name="fName" datatype="chinese|max:4|min:2" maxlength="4" myclass="nostar"></weui-input>
							<weui-input v-model="ruleform.mName" label="先母" placeholder="先母的姓名（限2-4个字）" type="text"
								name="mName" datatype="chinese|max:4|min:2" maxlength="4" myclass="nostar"></weui-input>
							<weui-input v-model="ruleform.yname" label="阳上人" placeholder="供奉牌位人的姓名（限2-4个字）" type="text"
								name="yname" datatype="require|chinese|max:4|min:2" maxlength="4"></weui-input>
							<weui-input v-model="ruleform.phone" label="电话" type="number" name="phone"
								datatype="require|phone"></weui-input>
							<weui-input v-model="ruleform.address" label="地址" type="text" name="address"
								datatype="require"></weui-input>
							<view class="tip">写供奉祖先牌位的地址，老家或自家都有供奉祖先牌位，则写其中一个地址；没有供奉祖先牌位，则写“吉祥地”三个字，代表祖先所在的地方。</view>
							<!-- <view class="show_textarea ptb10">
								<view class="title fs-16 lh-30">回向文</view>
								<weui-input v-model="ruleform.evaluate" type="textarea" name="evaluate" datatype="require"></weui-input>
							</view> -->
						</div>
					</view>
					<view class="text-center pt10 pb30" v-else>
						<view class="iconfont icon-pay-yes" style="font-size: 80px;"></view>
						<view class=" fs-18 fc-3">你已登记1元牌位<br>每位用户只能享受一次1元牌位登记</view>
						<dx-button myclass="mt20 plr50" type="primary" round btnBd="#A98853" btnBg="#A98853"
							@click="goto('/pages/tablet/order/buy/type2/video/index?tablet_id=5',1)">其他牌位登记</dx-button>
					</view>
				</view>
				<view class="m12">
					<dx-button block round type="danger" size="lg" btnBg="#FF721F" btnBd="#FF721F" @click="submit">提交
					</dx-button>
				</view>
				<view class="block-sec ptb12 plr20 noticeBg">
					<view class="text-center fs-18 fw-bold mtb12">愿力接力通告</view>
					<view class="fc-3 fs-15">
						<view style="text-indent: 2em;margin-bottom: 5px;">
							江门观音寺常住法师慈悲，为弘扬孝道报老祖宗的恩德，于2018年发愿要做999场报恩祈福法会，至今已完成82场，场场殊胜圆满。</view>
						<view style="text-indent: 2em;margin-bottom: 5px;">
							今年受疫情影响，报恩祈福法会暂无法进行，为了不忘弘扬孝道的初心，保持与老祖宗的链接，报答祖宗的恩德，让老祖宗去往西方极乐世界的资粮不断，常住法师再次发愿：逢农历初一、十五，所有有缘人均可随喜一元，在线上登记超度祖先牌位，让所有的老祖宗来应供，以此利益大众。
						</view>
						<view style="text-indent: 2em;margin-bottom: 5px;">
							愿大众与常住法师愿力同步，打开链接，为老祖宗献上您的一份孝心。请将您的这份孝心以法布施形式分享给身边的亲朋好友，也许他们会需要！阿弥陀佛！</view>
					</view>
				</view>
				<!-- 分享提示层 -->
				<dx-share ref="share"></dx-share>

				<view id="footer-btn" class="p0 bd-te">
					<view class="Bitem text-center" @click="goto('/pages/index/index',2)">
						<view class="lh-28 h-28">
							<i class="iconfont icon-home fs-20"></i>
						</view>
						<view class="fs-12 lh-18">首页</view>
					</view>
					<view class="flex-middle pr10 BtnG flex1">
						<dx-button block round type="success" myclass="mr5" size="lg" btnBg="#A98853" btnBd="#A98853"
							@click="$refs.share.show = true">分享</dx-button>
						<dx-button block round type="success" myclass="mr5" size="lg"
							@click="goto('/pages/tablet/order/buy/type2/video/index?tablet_id=12',1)">其他牌位</dx-button>
					</view>
				</view>
			</view>
			<view class="ptb40 text-center" v-else>
				<view class="iconfont icon-pay-no" style="font-size: 80px;"></view>
				<view class=" fc-6 fs-20">牌位活动暂未开始<br>活动时间初一、十五</view>
				<dx-button myclass="mlr50 mt20" block type="success" size="lg" @click="goto('/pages/index/index',2)">
					返回首页</dx-button>
			</view>
			<view class="detail block-sec">
				<view class="box">
					<view class="desc">
						<view class="tt flex">
							<span id="two1" @click="showType =0"
								:class="['name',showType == 0 ? 'hover' : '']">牌位详情</span>
							<span id="two3" @click="showType = 1"
								:class="['name',showType == 1 ? 'hover' : '']">留言</span>
						</view>
						<!-- 详情 -->
						<view v-if="showType == 0" class="p10 con-detail">
							<u-parse :content="data.detail.content" />
						</view>
						<!-- 留言 -->
						<view v-if="showType ==1">

							<view class="list ml15 mr20">
								<view class="items">
									<view class="li" v-for="v in data.lists.data">
										<view class="wenzi ml0">
											<view class="gaiup flex">
												<view class="gai1 fs-16">{{v.yname ? v.yname : v.nickname}}</view>
												<view class="gai2 fs-16">行善 <span
														class="fs-16">{{getAmount(v.amount)}}</span> 份</view>
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
		<dx-diag title="愿力接力通告" :titSize="18" :OFFicon="false" width="94%" ref="notice" myclass="noticeDiag"
			:lrPadding="25">
			<!--  -->
			　<view class="fc-3 fs-15 mt10">
				<view style="text-indent: 2em;margin-bottom: 5px;">
					江门观音寺惭愧僧释印弘，为弘扬孝道报老祖宗的恩德，于2018年发愿要做999场报恩祈福法会，至今已完成82场，场场殊胜圆满。</view>
				<view style="text-indent: 2em;margin-bottom: 5px;">
					今年受疫情影响，报恩祈福法会暂无法进行，为了不忘弘扬孝道的初心，保持与老祖宗的链接，报答祖宗的恩德，让老祖宗去往西方极乐世界的资粮不断，惭愧僧再次发愿：逢农历初一、十五，所有有缘人均可随喜一元，在线上登记超度祖先牌位，让所有的老祖宗来应供，以此利益大众。
				</view>
				<view style="text-indent: 2em;margin-bottom: 5px;">
					愿大众与师父愿力同步，打开链接，为老祖宗献上您的一份孝心。请将您的这份孝心以法布施形式分享给身边的亲朋好友，福泽子孙！您愿意吗？愿意请打√。</view>
			</view>
			<view class="flex-between mt15 mb8">
				<dx-button myclass="plr35 ptb0 lh-44 h-44" size="lg" @click="goto('/pages/index/index',2)">返回
				</dx-button>
				<dx-button myclass="plr55 ptb0 lh-44 h-44" size="lg" type="success" txtSize="36rpx" btnBd="#28bf70"
					btnBg="#28bf70" @click="$refs.notice.thisDiag = false">我愿意√</dx-button>
			</view>
		</dx-diag>
	</view>
</template>

<script>
	import "../show/index.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import dxDivider from "doxinui/components/divider/divider"
	import dxButton from "doxinui/components/button/button"
	import dxShare from "doxinui/components/share/share"
	import dxTitle from "doxinui/components/title/title"
	import dxDiag from "doxinui/components/diag/diag"
	export default {
		components: {
			uParse,
			dxDivider,
			dxButton,
			dxShare,
			dxTitle,
			dxDiag
		},
		data() {
			return {
				formAction: '/activity/show?id=6',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				showType: 0,
				selectKey: 0,
				ruleform: {
					price: '1份'
				},
				vaildate: {},
				getSiteName: this.getSiteName(),
				registerTablet: true,
				amount: 1,
				time: [
					{name: '1日',value: 1},
					{name: '30日',value: 30},
					{name: '180日',value: 180},
					{name: '1年',value: 365},
				]
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
			this.$nextTick(() => {
				//this.$refs.notice.thisDiag = true;
			})
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
			share(title, logo, desc) {
				setTimeout(() => {

					let url = "https://temple.doxinsoft.com/h5/#/pages/tablet/activity/index?user_id=" + this.data
						.user.id;
					console.log(url);
					this.$refs.page.wx.ready(() => {
						this.$refs.page.wx.onMenuShareAppMessage({
							title: title,
							link: url,
							imgUrl: logo,
							desc: desc,
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
							imgUrl: logo,
							desc: desc,
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
			submit() {
				this.vaildForm(this, res => {
					if (res) {
						this.ruleform.amount = this.amount;
						this.postAjax(this.formAction, this.ruleform).then(msg => {
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
					this.share(msg.detail.name, msg.detail.firstCover, this.data.siteConfig.share_descript);

					if (msg.activityOrder) {

						this.ruleform = msg.activityOrder;
						delete this.ruleform.id;
						console.log(this.ruleform);

					} else {
						this.ruleform.evaluate = msg.detail.evaluate;
					}

				});
			}
		}
	}
</script>
