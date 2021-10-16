<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
			<div class="login-list m15" >
				<div class="login02">
					<view class="login-info">
						<weui-input v-model="ruleform.username" placeholder="帐号" type="text" myclass="plr0" name="username" datatype="require">
							<view slot="left" class="slot-icon">
								<view class="iconfont icon-login-phone"></view>
							</view>
						</weui-input>
						<weui-input v-model="ruleform.password" placeholder="密码" type="password" myclass="plr0" name="password" datatype="require">
							<view slot="left" class="slot-icon">
								<view class="iconfont icon-login-passwork"></view>
							</view>
						</weui-input>
					</view>
					<div class="login-btn mt20">
						<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="formSubmit" myclass="dx-btn dx-btn-big dx-btn-green bdr4 w-b100 fs-17"
						 title="登录"></myform>
					</div>
				</div>
			</div>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/user',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				showType: 1,
				ruleform: {
					password: ''
				},
				vaildate: {}
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
			//return this.shareSource(this, '商城');
		},
		onLoad(options) {
			//this.ajax();
		},
		methods: {
			ajax() {
				this.getAjax(this).then(msg => {
					this.setTitle(msg.merchantName);
				});
			},
			formSubmit(unionId) {
				this.postAjax("/staff/login", this.ruleform).then(msg => {
					if (msg.data.status == 2) {
						uni.setStorageSync('site_name', msg.data.user.site_name);	
						return this.goto("/pages/staff/index/index");
					}
				});
			}
		}
	}
</script>
