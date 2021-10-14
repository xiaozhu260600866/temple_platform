<template>
	<view>
		<canvas :style="'width: '+width+'px; height: '+height+'px;'" canvas-id="firstCanvas"></canvas>
		<image src="/static/fenxiaobg.jpg" @load="imageLoad" hidden></image>
	</view>
</template>

<script>
export default {
	data() {
		return {
			posterShow:true,
			width: 375,
			height: 530,
			images:[]
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
		
	},
	
	methods: {
		imageLoad(e){
			var $width = e.detail.width, //获取图片真实宽度
			$height = e.detail.height,
			ratio = $width / $height; //图片的真实宽高比例
			var viewWidth = this.width, //如:375 i6屏宽
			viewHeight = this.width / ratio; //计算的高度值
			
			
			let ctx = uni.createCanvasContext('firstCanvas')
			
			//广告图
			ctx.drawImage('../../../../static/fenxiaobg.jpg', 0, 0, viewWidth, viewHeight)
			
			
			
			//脚部背景
			ctx.setFillStyle('#fff')
			ctx.fillRect(0, viewHeight, viewWidth, 130)
			
			//二维码
			ctx.drawImage('https://boss.doxinsoft.com/images/wap/qrcode.jpg', 15, viewHeight+15, 100, 100)
			
			// // 文字背景
			// ctx.setFillStyle('rgba(0, 0, 0, 0.65)')
			// ctx.fillRect(viewWidth/2-100, viewHeight+225, 200, 30)
			
			
			//商家名称
			ctx.setFontSize(20)
			ctx.setFillStyle('#F17E2A')
			ctx.fillText('大牛时间', 130, viewHeight+55)
			
			
			//长按扫码抢优惠
			ctx.setFontSize(13)
			ctx.setFillStyle('#333')
			ctx.fillText('长按扫码抢优惠', 130, viewHeight+80)
		
			
			ctx.draw();
			
		},
		drawArticle(ctx, kl, width, x, y) {
			let chr = kl.split('') // 分割为字符串数组
			let temp = ''
			let row = []
			for (let a = 0; a < chr.length; a++) {
			if (ctx.measureText(temp).width < width) {
				temp += chr[a]
			} else {
				a--
				row.push(temp)
				temp = ''
			}
			}
			row.push(temp)
	
			for (var b = 0; b < row.length; b++) {
			// 控制最多显示2行
			if (b < 2) {
				ctx.fillText(row[b], x, y + b * 20);
			}
			}
			let _len = row.length > 2 ? 2 : row.length
			return y + (_len - 1) * 20
		},
	}
}
</script>