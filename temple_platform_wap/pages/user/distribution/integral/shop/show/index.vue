<template>
	<view class="mb50">
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<div class="show_banner">
				<myswiper :lists="data.covers" purl="product"></myswiper>
			</div>
			<div class="pro-info bgf mb8">
				<p class="pro-name fs16 plr15 ptb5">{{data.product.name}}</p>
				<p class="pro-price fs18 plr15 pb10"><span class="Arial">{{data.product.integral}}</span><span class="fs14 font_grey pl5">朵</span></p>
				<!-- <div class="alert-danger" v-if="data.integral < data.product.integral ">当前积分为{{data.integral}}分，不足以兑换此商品哦</div>
			<div class="alert-success" v-else>当前积分为{{data.integral}}分，可以兑换此商品哦！</div> -->
			</div>
			<div class="pro-title plr15 bd-b bgf">
				<text class="fs16">兑换详情</text>
			</div>
			<div class="pro-content p15">
				<div class="pro-con-main">
					<uParse :content="data.product.content" />
				</div>
			</div>
		
			
			<view id="footer-btn">
				<button class="f-dx-btn dx-btn-red" v-if="data.integral < data.product.integral ">当前莲花为<text class="Arial">{{data.integral}}</text>朵，不足以兑换此礼品</button>
			    <button @click="toBuy" class="f-dx-btn dx-btn-red" v-else>立即兑换</button>
			    <!-- @click="toBuy" -->
			   </view>


		</view>
	</view>
</template>

<script>
	import "./index.css";
	import "@/components/gaoyia-parse/parse.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	export default {
		data() {
			return {
				formAction: '/shop/integral/show',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
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
		methods: {
			toBuy() {
				this.postAjax(this.formAction, {
					id: this.data.product.id,
					num: 1,
					is_info: 0
				}).then(msg=>{
					if (msg.data.status == 2) {
						this.goto("/pages/user/distribution/integral/shop/order/buy/index?order_no=" + msg.data.order_no);
					}
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		},
		components: {
			uParse
		}
	}
</script>
