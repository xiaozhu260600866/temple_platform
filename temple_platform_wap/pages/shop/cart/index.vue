<template>
	<view>
		<page :parentData="data" :formAction="formAction"></page>
		<view v-if="data.show">
			<view class="cart_lists">
				<view class="have_pro">
					<view class="cart_item" v-for="(item,key) in data.lists" :key="item.product_id"
						v-if="item.putaway == 1">
						<view class="zheng">
							<checkbox-group @change="checkboxChange($event,item,key)">
								<checkbox value="1" :checked="item.is_check==1 ? true :false" :data-price="item.price"
									:data-is_check="isCheck" :data-key="key" />
							</checkbox-group>
						</view>
						<view class="pro_img">
							<image class="img" :src="item.cover"></image>
						</view>
						<view class="info">
							<view class="w-b100">
								<view class="title wrap2">{{item.name}}</view>
								<view class="type" v-if="item.is_info">{{item.attribute}}</view>
							</view>
							<view class="w-b100 flex-between flex-middle">
								<view class="price fs-16">￥{{item.price}}</view>
								<tui-numberbox v-model="item.num"></tui-numberbox>
							</view>
						</view>
						<view class="del bg-f2 dxi-icon dxi-icon-del fs-14 fc-7" @click="del(item.product_id)"></view>
					</view>
				</view>
			</view>
			<!-- 	<view class="no_pro">
				<view class="cart_item" v-for="(item,key) in lists" :key="item.product_id" v-if="item.putaway == 0">
					<view class="no-tag">已下架</view>
					<view class="pro_img">
						<image class="img" :src="item.cover"></image>
					</view>
					<view class="info">
						<view class="w-b100">
							<view class="title wrap2">{{item.name}}</view>
							<view class="type" v-if="item.is_info">{{item.attribute}}</view>
						</view>
						<view class="del bg-f2 dxi-icon dxi-icon-del fs-14 fc-7" @click="del(item.product_id)"></view>
					</view>
				</view>
			</view> -->
			<view class="cart-empty pt50" v-if="data.length == 0">
				<image class="img" src="https://boss.doxinsoft.com/images/order/cart02.png" />
				<view class="fs-18 mt10">您的福袋空空的</view>
				<view class="fs-13 fc-9 mt5">赶紧去挑些喜欢的填满它吧</view>
				<view class="btn mt10" @click="goto('/pages/shop/lists/index',1)">去逛逛</view>
			</view>
			<view id="cartfooter">
				<view class="lInfo fs-15">
					<view class="group">
						<view class="zheng">
							<checkbox-group @change="checkboxAll">
								<checkbox />
							</checkbox-group>
						</view>
						<view class="txt">全选</view>
					</view>
					<view class="group right plr10">
						<view class="count">合计：</view>
						<view class="price fs-18 fw-bold"><span class="fs-14">￥</span>{{amount}}</view>
					</view>
				</view>
				<view class="submit sub-btn fs-18 fs-white" @click="cartSubmit"
					:style="checkLength == 0 ? 'background: #ddd' :'background:#FF4351'">我要结缘</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tuiNumberbox from "xiaozhu/uniapp/thorui/components/numberbox/numberbox"
	export default {
		components: {
			tuiNumberbox
		},
		computed: {
			amount() {
				let amount = 0;
				this.checkLength = 0;
				for (var i = 0; i < this.data.lists.length; i++) {
					var v = this.data.lists[i];
					if (v.is_check) {
						amount += parseFloat(v.price) * parseInt(v.num);
						this.checkLength++;
					}
				}
				return amount.toFixed(2);
			}
		},
		data() {
			return {
				formAction: '/shop/cart/lists',
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),

			}
		},
		onPullDownRefresh() {
			this.ajax();
		},
		onShareAppMessage() {
			return this.shareSource(this, '商城');
		},
		onLoad(options) {
			this.ajax();
		},
		methods: {
			vaild(num) {
				console.log(num);
				if (isNaN(num) || num < 1) {
					this.getError('数据不合法');
					return false;
				} else {
					return true;
				}
			},
			cartSubmit() {
				if (this.checkLength == 0) {
					this.getError("请勾选项目");
					return false;
				}
				for (var i = 0; i < this.data.lists.length; i++) {
					let v = this.data.lists[i];
					if (v.is_check && !this.vaild(v.num)) {
						return false;
					}
				}
				this.postAjax("/shop/cart/add", {
					data: this.data.lists
				}).then(msg => {
					if (msg.data.status == 2) {
						this.goto('/pages/shop/order/buy/index?order_no=' + msg.data.order_no, 1);
						return false;
					}
				});

			},
			del(id) {
				this.getConfirm("真的确认删除吗？", () => {
					this.postAjax("/shop/cart/del-all", {
						id: id
					}).then(msg => {
						if (msg.data.status == 2) {
							//this.delHistoryUrl(this.data.historyUrl);
							this.ajax();
						}
					});
				});
			},
			checkboxChange(e, item, key) {
				console.log(1);
				let isCheck = e.mp.detail.value.length > 0 ? 1 : 0;
				this.data.lists[key].is_check = isCheck;
			},
			checkboxAll(e) {
				let isCheck = e.mp.detail.value.length > 0 ? 1 : 0;

				for (var i = 0; i < this.data.lists.length; i++) {
					var v = this.data.lists[i];
					v.is_check = isCheck;
				}
			},
			ajax() {
				this.getAjax(this).then(msg => {
					console.log(this.data);
				});
			}
		}
	}
</script>
<style>
	@import "./index.css";
</style>
