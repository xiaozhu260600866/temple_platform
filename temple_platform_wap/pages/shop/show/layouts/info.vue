<template>
    <view>
		<view class="share-overlay" @click="toggleInfoDiag" v-if="infoDiag"></view>
		<view v-if="infoDiag">
			<view class="bd-t infoanimation choose">
				<view class="choose-floor">
					<view class="choose-sit">
						<view class="pro-img">
							  <image :src="siteName+'/upload/images/product/'+productInfo[infokey].pic" class="info-pic"></image>
						</view>
						<view class="choose-del" @click="toggleInfoDiag()">
							<span class="iconfont icon-off"></span>
						</view>
						<view class="choose-detail">
							<view class="pro-name h-40 lh-20 mb10">{{ productInfo[infokey].name }}</view>
							<view class="pro-price w-b100 fs-12 lh-20 flex-end"><text class="price fs-20 pr3">{{ productInfo[infokey].price  }}</text>份</view>
						</view>
					</view>
					<scroll-view scroll-y class="choose-scroll">
						<view class="pb30" style="overflow: hidden auto;">
							<view class="choose-class">
								<view class="class-h4">规格</view>
								<view class="arr-box">
									<block>
										<span :class="['item',key==infokey ?  'yes-act' :'no-act']"  v-for="(item,key) in productInfo" :key="key" @click="infokey = key">{{item.name}}</span>
									
									</block>
								</view>
							</view>
							<view class="buy-num pt10 flex-between bg-f">
								<view class="lh-30">
									<text class="fs-16 fw-bold fc-3">数量</text>
									<text class="fs-15 fc-6">（每天限恭请一份）</text>
								</view>
								<tui-numberbox :max="100" :min="1" v-model="infonum" :iconsize="32"></tui-numberbox>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="button">
					<view class="sure-btn" @click="infoSubmit">确认</view>
				</view>
			</view>
		</view>
    </view>
</template>
<script>
	import tuiNumberbox from "xiaozhu/uniapp/thorui/components/numberbox/numberbox";
	export default {
		props: ['productInfo'],
		components: {
			tuiNumberbox
		},
		data() {
			return {
				infoDiag: false,
				siteName: this.getSiteName(),
				info:{
					pic:'../../../../static/impress1.png',
					price:'19',
					num:'999'
				},
				value: 1,
				infokey: 0,
				infonum: 1,
				cartNum: 0,
				showType: ''
			}
		},
		onLoad() {
			this.infoDiag = false;
		},
		methods: {
			 infoSubmit() {
				let info = this.productInfo[this.infokey];
				info.bnum = this.infonum;
				this.addCartAjax({ infoId: info.id, num: info.bnum, type: "add", is_info: 1,id:info.product_id });
			 },
			 addCartAjax(data) {
				 let showType = this.showType;
				 let url = "";
				 if (showType == "addCart") {
					 url = "/shop/cart/to-add-cart"
				 } else {
					 url = "/shop/product/show";
				 }
				this.postAjax(url,data).then(msg=>{
					this.updateUrl(["/pages/user/cart/index","/pages/index/index","/pages/user/index/index",'/pages/product/search/index']);
					if (msg.data.status == 2) {
						if (showType != "addCart") {
							this.infoDiag = false;
							this.goto('/pages/shop/order/buy/index?order_no=' + msg.data.order_no,1);
							return false;
						}
						this.cartNum = msg.data.num;
						if (this.productInfo.length > 0) {
							this.toggleInfoDiag();
						}
						this.$emit('callback', this.cartNum);
					}
				});
			            
			 },
			toggleInfoDiag(e){
			    this.infoDiag = !this.infoDiag;
			},
			change: function(e) {
				this.value = e.value
			},
		}

	}
</script>
<style scoped>
@import url("info.css");
</style>