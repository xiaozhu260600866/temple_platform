<template>
	<view>
		<canvas :style="'width: '+width+'px; height: '+height+'px;'" canvas-id="firstCanvas"></canvas>
		<image src="../../../static/cert.jpg" @load="imageLoad" hidden></image>
	</view>
</template>

<script>
export default {
	props:[
		
	],
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
			ctx.drawImage('../../../static/cert.jpg', 0, 0, viewWidth, viewHeight)
			
			//收福人
			ctx.setFontSize(16)
			ctx.setFillStyle('#603217')
			ctx.fillText('收福人姓名：', 54, 178)
			
			//姓名
			ctx.setFontSize(16)
			ctx.setFillStyle('#000')
			ctx.fillText('王益东', 154, 178)
			
			//文
			ctx.setFontSize(16)
			ctx.setFillStyle('#000')
			let drawArticle = this.drawArticle(ctx, '祝愿黄益东生意兴隆，财运绵长，运气亨通，财源茂盛', this.width - 125 ,  54, 220)
			
			//
			ctx.setFontSize(16)
			ctx.setFillStyle('#666')
			ctx.fillText('随喜信息', 54, 280)
			
			//
			ctx.setFontSize(16)
			ctx.setFillStyle('#666')
			ctx.fillText('地点：', 54, 305)
			
			//
			ctx.setFontSize(16)
			ctx.setFillStyle('#666')
			ctx.fillText('江门市叱石观音寺', 104, 305)
			
			//
			ctx.setFontSize(16)
			ctx.setFillStyle('#666')
			ctx.fillText('项目：', 54, 330)
			
			//
			ctx.setFontSize(16)
			ctx.setFillStyle('#666')
			ctx.fillText('二月初八供斋供灯', 104, 330)
			
			//
			ctx.setFontSize(16)
			ctx.setFillStyle('#666')
			ctx.fillText('时长：', 54, 355)
			
			//
			ctx.setFontSize(16)
			ctx.setFillStyle('#666')
			ctx.fillText('1年', 104, 355)
			
			//
			ctx.setFontSize(16)
			ctx.setFillStyle('#666')
			ctx.fillText('捐赠数量：', 54, 380)
			
			//
			ctx.setFontSize(16)
			ctx.setFillStyle('#666')
			ctx.fillText('100份', 134, 380)
			
			//
			ctx.setFontSize(16)
			ctx.setFillStyle('#666')
			ctx.fillText('随喜时间：', 54, 405)
			
			//
			ctx.setFontSize(16)
			ctx.setFillStyle('#666')
			ctx.fillText('2020-03-02', 134, 405)
			
			//
			ctx.setFontSize(11)
			ctx.setFillStyle('#603217')
			ctx.fillText('2020-03-02', 158, 495)
			
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
