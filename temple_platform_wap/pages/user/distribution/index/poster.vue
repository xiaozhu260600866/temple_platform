<template>
	<view v-if="data.show"><!-- left:-1300px -->
		<canvas :style="'width: '+width+'px; height: '+height+'px;'" canvas-id="firstCanvas" v-if="!posterShow"></canvas>
		<image src="/static/fx-poster.jpg" @load="imageLoad" hidden></image>
		<image :src="tempFilePath" class="w-b100" mode="widthFix" alt="" v-if="posterShow"></image>
		<!-- <view class="reminder flex-middle flex-center" @click="open">
			<image class="img" src="/static/fingerprint.png"></image>
			<view class="name">{{reminder}}</view>
		</view> -->
		<view class="text-center mtb30"><dx-button type="primary" size="lg" btnBg="#f79" btnBd="#f79" round @click="open">保存二维码海报到相册</dx-button></view>
		<!-- <button @click="open">单击</button> -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			formAction: '/shop/dis',
			mpType: 'page', //用来分清父和子组件
			data: this.formatData(this),
			getSiteName: this.getSiteName(),
			posterShow:false,
			width: 375,
			height: 500,
			images:[],
			title: '将海报发给好友，推广有回报',
			username: '东信科技',
			remark: '最新资讯，与你共享',
			reminder: '长按图片保存到相册',
			tempFilePath:''
		}
	},
	onLoad() {
		uni.getSystemInfo({
			success:res=> {
				this.width = res.windowWidth
				this.height = res.windowHeight
				//this.height = res.screenHeight;
			}
		});
		this.ajax();
	},
	methods: {
		open(){
			uni.previewImage({
				current: this.tempFilePath, // 当前显示图片的http链接
				urls: [this.tempFilePath] ,
				
			})
		},
		ajax() {
			this.getAjax(this).then(msg => {
				console.log(this.data);
			});
		},
		imageLoad(e){
			var $width = e.detail.width, //获取图片真实宽度
			$height = e.detail.height,
			ratio = $width / $height; //图片的真实宽高比例
			var viewWidth = this.width, //如:375 i6屏宽
			viewHeight = this.width / ratio; //计算的高度值
			
			let ctx = uni.createCanvasContext('firstCanvas')
			this.height = $height+40;
			
			console.log($height)
			
			//广告图
			ctx.drawImage('../../../static/fx-poster.jpg', 0, 0, viewWidth, viewHeight)
			
			//脚部背景
			ctx.setFillStyle('#fff')
			ctx.fillRect(0, viewHeight, viewWidth, 170)
			
			// 头像
			ctx.drawImage(this.data.distribution.heder_img, 50, viewHeight+25, 70, 70)
			ctx.drawImage('../../../static/prohead-bg.png', 50, viewHeight+25, 70, 70)
			
			//昵称
			ctx.setFontSize(16)
			ctx.setFillStyle('#333')
			ctx.fillText(this.data.distribution.name, 170/2-this.data.distribution.name.length*8, viewHeight+120)
			
			//备注
			ctx.setFontSize(12)
			ctx.setFillStyle('#666')
			ctx.fillText(this.remark, 170/2-this.remark.length*6, viewHeight+142)
			
			//二维码
			ctx.drawImage(this.data.disQrcode, viewWidth-150, viewHeight+16, 110, 110)
		
			ctx.draw();
			
			setTimeout(()=>{
				uni.canvasToTempFilePath({
				canvasId: 'firstCanvas',
				success:res=> {
					this.tempFilePath = res.tempFilePath;
					uni.hideLoading();
					this.posterShow = true;
					//this.open();
				},
				fail:res=>{
					console.log(res);
				}
			})
			},200)
			
		},
	}
}
</script>
<style scoped="">
.reminder .img{width: 40upx;height: 40upx;display: flex;margin-right: 30upx;}
.reminder .name{font-size: 36upx;color: #666;}
</style>