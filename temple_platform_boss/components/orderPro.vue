<template>
	<view :class="['order_pro', myclass ? myclass : '']">
		<view class="order_info" v-for="(item,key) in data">
			<view class="opro_img">
				<image class="img" :src="item.getProduct.firstCover" mode="aspectFill" />
			</view>
			<view class="opro_info">
				<view class="Titem">
					<view class="left">
						<view class="name">{{item.getProduct.name}}</view>
						<view class="specs" v-if="item.attribute">{{item.attribute}}</view>
					</view>
					<view class="right">
						<view class="price">￥{{toFixed(item.amount / item.num ) }}</view>
						<view class="num">x {{item.num}}</view>
					</view>
				</view>
				<view class="scount fs-14">小计：<text class="Arial">{{item.amount}}</text>元</view>
			</view>
		</view>
	</view>
</template>
<script type="text/javascript">
export default {
	props: ['data','myclass'],
	data() {
		return {
			
		}
	},
	methods: {
		getAttribute(value) {
			let res = [];
			value.split(",").forEach((v, key) => {
				if (key != 0) {
					res.push(v)
				}
			})
			return res.join(',');
		},
		toProduct(item){
			console.log(item);
			return this.goto(this.url+item.getProduct.id,1)
		}
	}
}

</script>
<style>
.order_pro{padding: 0 20upx;}
.order_info{display: flex;padding: 20upx 0;border-bottom: 1upx #F5F5F5 dashed;}
.order_info:last-child{border-bottom: 0;}
.order_info .opro_img{padding-right: 20upx;}
.order_info .opro_img .img{width: 140upx;height: 140upx;display: flex;border-radius: 6upx;}
.order_info .opro_info{flex: 1;overflow: hidden;display: flex;flex-wrap: wrap;align-content: space-between;}
.order_info .Titem{display: flex;justify-content: space-between;width: 100%;line-height: 40rpx;font-size: 30rpx;color: #333;}
.order_info .Titem .left{flex: 1;overflow: hidden;}
.order_info .Titem .right{text-align: right;padding-left: 20rpx;}
.order_info .Titem .name{font-size: 32rpx;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;}
.order_info .Titem .specs{overflow: hidden;white-space: nowrap;text-overflow: ellipsis;color: #666;}
.order_info .Titem .price{}
.order_info .Titem .num{color: #666;}
.order_info .scount{text-align: right;width: 100%;}
</style>