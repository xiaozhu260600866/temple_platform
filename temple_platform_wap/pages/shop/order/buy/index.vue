<template>
	<div>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view class="pay detail">
			<view class="block-sec people-info">
				<!-- <view class="Btitle plr15 pt10">
					<view class="name fs-16 lh-30">功德主资料 </view>
				</view> -->
				<weui-input v-model="ruleform.bless_name" label="功德主姓名" type="text" name="bless_name" datatype="require"
				 :maxlength="6"></weui-input>
				<weui-input v-model="ruleform.phone" label="功德主手机" type="number" name="phone" datatype="require">
				</weui-input>

				<dx-address v-model="ruleform.bless_address" datatype="require" ref="address"
				 @change="selectAddressCallBack" labeltxt="所在地区"></dx-address>
				 <weui-input v-model="ruleform.bless_address2" type="text" name="bless_address2" placeholder="请输入地址" label="地址" datatype="require"></weui-input>
				<weui-input v-model="ruleform.remark" type="textarea" name="remark" placeholder="请输入备注"></weui-input>
				<weui-input v-model="ruleform.is_post" type="switch" name="is_post" label="邮寄" v-if="ruleform.can_post">
				</weui-input>
				<weui-input v-model="ruleform.is_post" label="邮寄" name="is_post" changeField="value" type="radio"
				 dataKey="sendTypeArr" :radioType="false" v-if="ruleform.can_post"></weui-input>
				<weui-input v-model="ruleform.post_address" type="text" name="post_address" label="邮寄地址"
				 datatype="require" v-if="ruleform.can_post && ruleform.is_post  ==1"></weui-input>
			</view>
			<view class="block-sec">
				<orderPro :data="data.detail.products"></orderPro>
			</view>
			<view id="calculation" class="block-sec">
				<view class="list-group">
					<view class="txt">运费</view>
					<view class="value fs-16 price">￥{{parseFloat(yunfei)}}</view>
				</view>
				<view class="list-group">
					<view class="txt">合计随喜</view>
					<view class="value fs-16 price">{{parseFloat(ruleform.amount) + parseFloat(yunfei)}}<text class="fc-3 pl3">元</text>
					</view>
				</view>
			</view>
			<!-- <view class="block-sec content">
				<view class="Btitle plr15 pt10">
					<view class="name fs-16 lh-30">回向文</view>
				</view>
				<view class="plr15 ptb8">
					<textarea style="height: 100px;" @click="ruleform.evaluate = ''" class="remark" name="evaluate"
						id="evaluate" title="请输入您的回向文" placeholder="输入您的回向文，可先小回向(若有)，再大回向" cols="" rows=""
						v-model="ruleform.evaluate"></textarea>
				</view>
			</view> -->
			<view class="m20">
				<view class="dx-btn dx-btn-lg dx-btn-red-gradual w-b100 bdr25" @click="formSubmit()">微信支付结缘</view>
			</view>
		</view>
	</div>
</template>

<script>
	import "../../../../public/css/buycss.css";
	import "./index.css";
	import uParse from '@/components/gaoyia-parse/parse.vue'
	import orderPro from "@/components/orderPro";
	export default {
		components: {
			uParse,
			orderPro
		},
		data() {
			return {
				formAction: '/shop/order/detail',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				amountArr: [],
				showType: 0,
				ruleform: {
					name: '',
					phone: '',
					amount: 20,
					otheramount: '',
					is_post: 3,
					type: 1,
					evaluate: ''
				},
				vaildate: {},
				open: false,
				yunfei:0,
				getSiteName: this.getSiteName(),
				sendTypeArr: [{
						label: '需要',
						value: 1
					},
					{
						label: '不需要',
						value: 2
					},
				],
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


		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},

		methods: {
			selectAddressCallBack(e) {
				if (this.ruleform.yunfei != "-1.00") {
					if (e.provinceName != '广东省') {
						this.yunfei = 20;
					} else {
						this.yunfei = 12;
					}
				}
			},
			formSubmitForH5(config, order_no) {
				this.updateUrl(["/pages/index/index"]);
				this.payUniapp(config, msg => {
					return this.goto("/pages/shop/order/payed/index?order_no=" + order_no);
				}, msg => {
					return this.goto("/pages/shop/order/payed/index?order_no=" + order_no);
				});
			},
			formSubmit() {
				if (!this.ruleform.bless_address) {
					this.getError("请选择所在地区");
					return false;
				}
				if (!this.ruleform.bless_address2) {
					this.getError("地址不能为空");
					return false;
				}
			
				if (this.ruleform.can_post && this.ruleform.is_post == 3) {
					this.getError("请选择是否需要邮寄");
					return false;
				}

				if (!this.ruleform.bless_name) {
					this.getError("功德主不能为空");
					return false;
				}


				if (!this.open && !this.ruleform.phone && this.ruleform.phone_require) {
					this.getError("電話不能為空");
					return false;
				}
				if (this.ruleform.phone) {
					var phoneReg = /(^1[3|4|5|7|8|9]\d{9}$)|(^09\d{8}$)/;
					if (!phoneReg.test(this.ruleform.phone)) {
						this.getError("手机格式不正确");
						return false;
					}
				}
				if (this.ruleform.address_require && !this.ruleform.bless_address) {
					this.getError('地址不能为空');
					return false;
				}
			
				this.ruleform.yunfei = this.yunfei;
				this.ruleform.bless_address +=  this.ruleform.bless_address2;
				this.postAjax(this.formAction, this.ruleform).then(msg => {
					if (msg.data.status == 2) {
						this.formSubmitForH5(msg.data.config, msg.data.detail.order_no);
					}
				});
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.ruleform = msg.detail;
					this.ruleform.evaluate = msg.product.evaluate
					if (this.ruleform.yunfei == "-1.00") {
						this.yunfei = 0;
					} else {
						this.yunfei = 12;
					}


				});
			}
		}
	}
</script>
