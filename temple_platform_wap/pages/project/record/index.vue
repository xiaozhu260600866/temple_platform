<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view class="detail" v-if="data.show">
			<view class="top">
				<view class="yqjrank">
					<view class="tt">感恩<span>{{data.detail.orderNum}}</span>位爱心传播者</view>
				</view>
			</view>
			<view class="add">
				<view class="item" v-for="v in data.lists.data">
					<view class="row flex-middle plr15 pt10">
						<view class="tou"><img class="img" :src="v.user.headimgurl"></view>
						<view class="zi flex1 pl15">
							<view class="tt">{{v.bless_name ? v.bless_name : v.user.nickname}}</view>
							<view class="td">行善<span class="Arial">{{getAmount(v.amount)}}</span>份</view>
						</view>
					</view>
					<view class="tp">{{v.evaluate}}</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import "./index.css";
	export default {
		data() {
			return {
				formAction: '/project/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				showType: 1,
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
			this.ajax();
		},

		methods: {
			ajax() {
				
				this.getAjax(this).then(msg => {

				});
			}
		}
	}
</script>
