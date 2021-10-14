<template>
	<view>
		<page :parentData="data" :formAction="formAction" ref="page"></page>
		<view class="mt12 pb50">
			<view class="order_pro block-sec">
				<view class="pro_img">
					<image class="img" :src="ruleform.products.firstCover" mode="aspectFill" />
				</view>
				<view class="pro_info">
					<view class="name">{{ruleform.products.name}}</view>
				</view>
			</view>
			<view class="block-sec no" v-if="ruleform.shipping == 2">
				<weui-input v-model="ruleform.bless_name" label="功德主姓名" type="text" name="bless_name" datatype="require" :maxlength="6"></weui-input>
				<weui-input v-model="ruleform.phone" label="功德主手机" type="number" name="phone" datatype="require"></weui-input>
				<weui-input v-model="ruleform.bless_address" label="功德主地址" type="text" name="bless_address"
				 datatype="require"></weui-input>
				<weui-input v-model="ruleform.remark" type="textarea" name="remark" placeholder="请输入备注"></weui-input>
			</view>
				<!-- <view class="box-item content">
					<view class="Btitle plr15 pt10">
						<view class="name fs-16 lh-30">回向文</view>
					</view>
					<weui-input v-model="ruleform.evaluate" type="textarea" name="remark"></weui-input>
					<view class="plr15 ptb8">
						<textarea style="height: 100px;" @click="ruleform.evaluate = ''" class="remark" name="remarks" id="remarks" title="请输入您的回向文"
						 placeholder="输入您的回向文，可先小回向(若有)，再大回向" cols="" rows="" v-model="ruleform.evaluate"></textarea>
					</view>
				</view>
				<weui-input v-model="ruleform.addr_name" label="姓名" type="text" :disabled="ruleform.status >=3 ? true :false" name="addr_name" datatype="require"></weui-input>
				<weui-input v-model="ruleform.addr_phone" label="电话" type="text" :disabled="ruleform.status >=3 ? true :false" name="addr_phone" datatype="require|phone"></weui-input>
			<view class="block-sec">
				<weui-input v-model="ruleform.shipping" name="shipping" datatype="require" label="送货方式" changeField="value" type="select"
				 :dataKey="'shippingData'" :disabled="true"></weui-input>
				<weui-input v-model="ruleform.remark" label="买家留言" type="text" name="remark" placeholder="点击给商家留言"
				 :disabled="ruleform.status >=3 ? true :false"></weui-input>
			</view> -->
			<view id="calculation" class="block-sec">
				<view class="list-group">
					<view class="txt fs-14">抵扣</view>
					<view class="flex-baseline">
						<view class="fs-16 price">- {{ruleform.integral}}</view>
						<view class="fs-12 fc-9 pl3"> 莲花</view>
					</view>
					
				</view>
			</view>
			<!-- <view class="block-sec no">
				<weui-input label="订单编号" v-model="ruleform.order_no" type="txt" name="name"></weui-input>
				<weui-input label="订单日期" v-model="ruleform.created_at" type="txt" name="name"></weui-input>
			</view>
			<view class="block-sec no" v-if="ruleform.express_name">
				<weui-input label="快递公司" v-model="ruleform.express_name" type="txt" name="name"></weui-input>
				<weui-input label="快递单号" v-model="ruleform.express_no" type="txt" name="name"></weui-input>
				<weui-input label="发货时间" v-model="ruleform.express_at" type="txt" name="name"></weui-input>
			</view> -->
			
			<view id="it_footer">
				<view class="f_right" @click="goto('/pages/order/pay_center/main',1)">
					<myform :ruleform="ruleform" :vaildate="vaildate" @callBack="submit" myclass="nav" title="提交订单"></myform>
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
				formAction: '/shop/integral/detail',
				shippingData:[
					{label:'邮寄',value:1},
					{label:'自提',value:2},
					{label:'物流',value:3},
				],
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				address: {},
				ruleform: {},
				vaildate:{}
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
			if (options.order_no) {
				this.order_no = options.order_no;
				if (options.address_id) {
					this.formAction += "&address_id=" + options.address_id + "&order_no=" + options.order_no;
				} else {
					this.formAction += "?order_no=" + options.order_no;
				}
			}
			this.ajax();
		},

		methods: {
			submit(e) {
				let ruleform = this.ruleform;
				this.receipt("确认兑换吗");
			},
			radioChange(event) {
				this.ruleform.shipping = event.mp.detail.value;
			},
			addressLists() {
				if (this.ruleform.status >= 3) {
					return false;
				}
				uni.setStorageSync('order_no', this.ruleform.order_no);
				this.goto('/pages/user/address/lists/index?order_no=' + this.ruleform.order_no);
			},
			ajax() {
				this.getAjax(this).then(msg => {
					this.address = msg.address;
					this.ruleform = msg.detail;
				});
			},
			canReceipt() {
				this.receipt("确认收货吗");
			},
			receipt(title) {
				
				uni.showModal({
					title: '提示',
					content: title,
					success: res => {
						if (res.confirm) {
							this.postAjax("/shop/integral/change-integral-status", this.ruleform).then(msg => {
								if (msg.data.status == 2) {
									this.goto("/pages/user/distribution/integral/shop/order/lists/index?historyUrl=del&status=" + msg.data.detail.status);
								}
							});
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			createAddress() {
				if (this.ruleform.status >= 3) {
					return false;
				}
				uni.setStorageSync('order_no', this.ruleform.order_no);
				this.$refs.page.createAddress(res => {
					if (res) {
						this.ajax();
					} else {
						this.goto("/pages/user/address/create_edit/index", 1);
					}
				});
			},
		}
	}
</script>