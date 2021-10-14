<template>
	<view class="bg-f" v-if="show">
		<canvas :style="'width: '+width+'px; height: '+height+'px;left:-1300px'" canvas-id="firstCanvas"></canvas>
		<image src="/static/printf_bg2.jpg" @load="imageLoad" hidden></image>
	</view>
</template>

<script>
export default {
	data() {
		return {
			posterShow:true,
			width: 375,
			show:false,
			height: 600,
			nameSize: 3, //名称字数
			peopleNum:1, //人数
			no:'A001', //人数
			death1: '李美琼',
			death2: '陈得占',
			name1:'陈敏英',
			// name2:'陈敏芝',
			// name3:'陈敏强',
			// name4:'陈敏伟',
			address:'江门市蓬江区建设路92号建行大厦8楼806室',
			rpx:0
		}
	},
	mounted() {
		uni.getSystemInfo({
			success:res=> {
				this.width = res.windowWidth
				this.height = res.windowHeight
				this.rpx = res.windowWidth/375;
				//this.height = res.screenHeight;
			}
		});
		let a="财源茂盛";
		console.log(a.length,123)
		
	},
	
	methods: {
		init(name,name2,name3,name4,peopleNum,item){
			this.name1 = name;
			// this.name2 = name2;
			// this.name3 = name3;
			// this.name4 = name4;
			this.peopleNum = peopleNum;
			this.address = item.address;
			this.death1 = item.name;
			this.death2 = item.name2;
			this.no = item.no;
			this.show = true;
		},
		imageLoad(e){
			var $width = e.detail.width, //获取图片真实宽度
			$height = e.detail.height,
			ratio = $width / $height; //图片的真实宽高比例
			var viewWidth = this.width, //如:375 i6屏宽
			viewHeight = this.width / ratio; //计算的高度值
			
			this.height = viewHeight
			
			let ctx = uni.createCanvasContext('firstCanvas')
			let rpx = this.rpx
			
			//广告图
			ctx.drawImage('/static/printf_bg2.jpg', 0, 0, viewWidth, viewHeight)
			ctx.drawImage('/static/impress2-70.png', viewWidth/2-75, 325*rpx, 150, 150)
			
			// 编号
			ctx.setFontSize(16)
			ctx.setFillStyle('#000')
			ctx.fillText('No：'+this.no, 20*rpx, 30*rpx)
			
			// 地址
			ctx.font = 'bold 16px 微软雅黑'
			ctx.setTextAlign('center')
			let address = this.drawArticle(ctx, this.address, 16*rpx , viewWidth-35*rpx,285*rpx)
			
			// 宗姓
			ctx.font = 'bold 30px 微软雅黑'
			if(this.death1.length >0 && this.death2.length == 0){
				let death1 = this.drawArticle(ctx, this.death1+'　大人', 28*rpx, viewWidth/2,375*rpx)
			}else{
				let death1 = this.drawArticle(ctx, this.death1+'　大人', 28*rpx, viewWidth/2-28,375*rpx)
				let death2 = this.drawArticle(ctx, this.death2+'　大人', 28*rpx, viewWidth/2+22,375*rpx)
			}
			
			// // 阳上人
			// ctx.font = 'bold 20px 微软雅黑'
			// if(this.name1.length >= this.name2.length){
			// 	if(this.name3.length >= this.name4.length){
			// 		let yang = this.drawArticle(ctx, '阳上人:', 22, 25 ,viewHeight-400-this.name3.length*22-this.name1.length*22)
			// 	}else{
			// 		let yang = this.drawArticle(ctx, '阳上人:', 22, 25 ,viewHeight-400-this.name4.length*22-this.name1.length*22)
			// 	}
			// }else{
			// 	if(this.name3.length >= this.name4.length){
			// 		let yang = this.drawArticle(ctx, '阳上人:', 22, 25 ,viewHeight-400-this.name3.length*22-this.name2.length*22)
			// 	}else{
			// 		let yang = this.drawArticle(ctx, '阳上人:', 22, 25 ,viewHeight-400-this.name4.length*22-this.name2.length*22)
			// 	}
			// }
			
			// // 姓名
			// if(this.name1.length >= 1 && this.name2.length == 0 && this.name3.length == 0 && this.name4.length == 0){
			// 	ctx.font = 'bold 20px 微软雅黑'
			// 	let name451 = this.drawArticle(ctx, this.name1, 20, 25,(viewHeight-300-this.name3.length*22-this.name1.length*22))
			// }else{
			// 	ctx.font = 'bold 18px 微软雅黑'
			// 	if(this.name3.length >= this.name4.length){
			// 		if(this.name1.length >= this.name2.length){
			// 			let name451 = this.drawArticle(ctx, this.name1, 19, 15,(viewHeight-300-this.name3.length*22-this.name1.length*22))
			// 			let name452 = this.drawArticle(ctx, this.name2, 19, 35,(viewHeight-300-this.name3.length*22-this.name1.length*22))
			// 		}else{
			// 			let name451 = this.drawArticle(ctx, this.name1, 19, 15,(viewHeight-300-this.name3.length*22-this.name2.length*22))
			// 			let name452 = this.drawArticle(ctx, this.name2, 19, 35,(viewHeight-300-this.name3.length*22-this.name2.length*22))
			// 		}
			// 		let name453 = this.drawArticle(ctx, this.name3, 19, 15,(viewHeight-300-this.name3.length*22))
			// 		let name454 = this.drawArticle(ctx, this.name4, 19, 35,(viewHeight-300-this.name3.length*22))
			// 	}else{
			// 		if(this.name1.length >= this.name2.length){
			// 			let name451 = this.drawArticle(ctx, this.name1, 19, 15,(viewHeight-300-this.name4.length*22-this.name1.length*22))
			// 			let name452 = this.drawArticle(ctx, this.name2, 19, 35,(viewHeight-300-this.name4.length*22-this.name1.length*22))
			// 		}else{
			// 			let name451 = this.drawArticle(ctx, this.name1, 19, 15,(viewHeight-300-this.name4.length*22-this.name2.length*22))
			// 			let name452 = this.drawArticle(ctx, this.name2, 19, 35,(viewHeight-300-this.name4.length*22-this.name2.length*22))
			// 		}
			// 		let name453 = this.drawArticle(ctx, this.name3, 19, 15,(viewHeight-300-this.name4.length*22))
			// 		let name454 = this.drawArticle(ctx, this.name4, 19, 35,(viewHeight-300-this.name4.length*22))
			// 	}
			// }
			
			// 阳上人
			ctx.font = 'bold 22px 微软雅黑'
			let yang = this.drawArticle(ctx, '阳上人:', 22,  25 ,viewHeight-420-this.name1.length*22)
			
			// 姓名
			ctx.font = 'bold 22px 微软雅黑'
			let name = this.drawArticle(ctx, this.name1, 22 , 25,viewHeight-320-this.name1.length*22)
			
			// 合家
			ctx.font = 'bold 20px 微软雅黑'
			let he = this.drawArticle(ctx, '合家', 22, 25 ,viewHeight-300)
			let jing = this.drawArticle(ctx, '敬荐', 22, 25 ,viewHeight-250)
			
			ctx.draw();
			
			setTimeout(()=>{
				uni.canvasToTempFilePath({
				canvasId: 'firstCanvas',
				success:res=> {
					// alert(1)
					
					this.tempFilePath = res.tempFilePath;
					
						uni.hideLoading();
						
						setTimeout(()=>{
							//document.getElementById("temp").click();
							this.updateUrl(["/pages/user/index/index"]);
							uni.previewImage({
								current: this.tempFilePath, // 当前显示图片的http链接
								urls: [this.tempFilePath] ,
								
							})
							this.show = false;
						},500);
					
				},
				fail:res=>{
					console.log(res);
				}
			})
			},200)
			
		},
		drawArticle(ctx, kl, width, x, y) {
			let chr = kl.split('') // 分割为字符串数组
			let temp = ''
			let row = []
			for (let a = 0; a < chr.length; a++) {
				row.push(chr[a])
			}
			for (var b = 0; b < row.length; b++) {
				// 控制最多显示100行
				if (b < 100) {
					ctx.fillText(row[b], x, y + b * width);
				}
			}
			let _len = row.length > 2 ? 2 : row.length
			return y + (_len - 1) * 20
		},
	}
}
</script>