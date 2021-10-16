<template>
	<view class="bg-f" v-if="show">
		<canvas :style="'width: '+width+'px; height: '+height+'px;left:-1300px'" canvas-id="firstCanvas"></canvas><!-- left:-1300px -->
		<image src="/static/printf_bg.jpg" @load="imageLoad" hidden></image>
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
			peopleNum:2, //人数
			no:'A001', //人数
			name1:'梁敏英',
			//name1:'梁敏英女',
			//name1:'梁敏英女妇',
			//name1:'梁敏英女妇林',
			name2:'梁敏芝',
			name3:'梁敏强',
			name4:'梁敏伟',
			item:{},
			rpx:0,
			address:'江门市蓬江区建设路92号建行大厦8楼806室'
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
			let nameArr = [name,name2,name3,name4];
			let nameSize = 0
			nameArr.forEach(v=>{
					if(v.length > nameSize){
						nameSize = v.length
					}
			});
			this.nameSize = nameSize;
		
			this.name1 = name;
			this.name2 = name2;
			this.name3 = name3;
			this.name4 = name4;
			this.peopleNum = peopleNum;
			this.address = item.address;
			this.show = true;
			this.no = item.no;
		},
		imageLoad(e){
			var $width = e.detail.width, //获取图片真实宽度
			$height = e.detail.height,
			ratio = $width / $height; //图片的真实宽高比例
			var viewWidth = this.width, //如:375 i6屏宽
			viewHeight = this.width / ratio; //计算的高度值
			
			this.height = viewHeight
			console.log(this.peopleNum);
			
			let ctx = uni.createCanvasContext('firstCanvas')
			let rpx = this.rpx;
			
			//广告图
			ctx.drawImage('/static/printf_bg.jpg', 0, 0, viewWidth, viewHeight)
			
			// 编号
			ctx.setFontSize(16)
			ctx.setFillStyle('#000')
			ctx.fillText('No：'+this.no, 10*rpx, 30*rpx)
			
			// 地址
			ctx.setFillStyle('#000')
			ctx.font = 'bold 14px 微软雅黑'
			ctx.setTextAlign('center')
			let address = this.drawArticle(ctx, this.address , 14*rpx, viewWidth-50*rpx,255*rpx)
			
			ctx.setFillStyle('#000')
			if(this.nameSize <= 3 && this.peopleNum == 1){
				//一人三字
				ctx.font = 'bold 36px 微软雅黑'
				let name13 = this.drawArticle(ctx, this.name1, 50*rpx, viewWidth/2,355*rpx)
			} else if(this.nameSize == 4 && this.peopleNum == 1){
				//一人四字
				ctx.font = 'bold 34px 微软雅黑'
				let name14 = this.drawArticle(ctx, this.name1, 40*rpx, viewWidth/2,345*rpx)
			} else if(this.nameSize == 5 && this.peopleNum == 1){
				//一人五字
				ctx.font = 'bold 32px 微软雅黑'
				let name15 = this.drawArticle(ctx, this.name1, 34*rpx, viewWidth/2,340*rpx)
			} else if(this.nameSize == 6 && this.peopleNum == 1){
				//一人六字
				ctx.font = 'bold 28px 微软雅黑'
				let name15 = this.drawArticle(ctx, this.name1, 30*rpx, viewWidth/2,330*rpx)
			} else if(this.nameSize <= 3 && this.peopleNum == 2){
				//二人三字
				ctx.font = 'bold 36px 微软雅黑'
				let name231 = this.drawArticle(ctx, this.name1, 50*rpx, viewWidth/2-25,355*rpx)
				let name232 = this.drawArticle(ctx, this.name2, 50*rpx, viewWidth/2+25,355*rpx)
			} else if(this.nameSize == 4 && this.peopleNum == 2){
				//二人四字
				ctx.font = 'bold 34px 微软雅黑'
				let name241 = this.drawArticle(ctx, this.name1, 40*rpx, viewWidth/2-24,345*rpx)
				let name242 = this.drawArticle(ctx, this.name2, 40*rpx, viewWidth/2+24,345*rpx)
			} else if(this.nameSize == 5 && this.peopleNum == 2){
				//二人五字
				ctx.font = 'bold 32px 微软雅黑'
				let name251 = this.drawArticle(ctx, this.name1, 34*rpx, viewWidth/2-22,340*rpx)
				let name252 = this.drawArticle(ctx, this.name2, 34*rpx, viewWidth/2+22,340*rpx)
			} else if(this.nameSize == 6 && this.peopleNum == 2){
				//二人六字
				ctx.font = 'bold 28px 微软雅黑'
				let name261 = this.drawArticle(ctx, this.name1, 28*rpx, viewWidth/2-20,330*rpx)
				let name262 = this.drawArticle(ctx, this.name2, 28*rpx, viewWidth/2+20,330*rpx)
			} else if(this.nameSize <= 3 && this.peopleNum == 3){
				//三人三字
				ctx.font = 'bold 36px 微软雅黑'
				let name331 = this.drawArticle(ctx, this.name1, 50*rpx, viewWidth/2-50,355*rpx)
				let name332 = this.drawArticle(ctx, this.name2, 50*rpx, viewWidth/2,355*rpx)
				let name333 = this.drawArticle(ctx, this.name3, 50*rpx, viewWidth/2+50,355*rpx)
			} else if(this.nameSize == 4 && this.peopleNum == 3){
				//三人四字
				ctx.font = 'bold 34px 微软雅黑'
				let name341 = this.drawArticle(ctx, this.name1, 40*rpx, viewWidth/2-50,345*rpx)
				let name342 = this.drawArticle(ctx, this.name2, 40*rpx, viewWidth/2,345*rpx)
				let name343 = this.drawArticle(ctx, this.name3, 40*rpx, viewWidth/2+50,345*rpx)
			} else if(this.nameSize == 5 && this.peopleNum == 3){
				//三人五字
				ctx.font = 'bold 32px 微软雅黑'
				let name351 = this.drawArticle(ctx, this.name1, 34*rpx, viewWidth/2-44,340*rpx)
				let name352 = this.drawArticle(ctx, this.name2, 34*rpx, viewWidth/2,340*rpx)
				let name353 = this.drawArticle(ctx, this.name3, 34*rpx, viewWidth/2+44,340*rpx)
			} else if(this.nameSize == 6 && this.peopleNum == 3){
				//三人六字
				ctx.font = 'bold 26rpx 微软雅黑'
				let name361 = this.drawArticle(ctx, this.name1, 28*rpx, viewWidth/2-40,330*rpx)
				let name362 = this.drawArticle(ctx, this.name2, 28*rpx, viewWidth/2,330*rpx)
				let name363 = this.drawArticle(ctx, this.name3, 28*rpx, viewWidth/2+40,330*rpx)
			} else if(this.nameSize <= 3 && this.peopleNum == 4){
				//四人三字
				ctx.font = 'bold 24px 微软雅黑'
				let name431 = this.drawArticle(ctx, this.name1, 26*rpx, viewWidth/2-20,330*rpx)
				let name432 = this.drawArticle(ctx, this.name2, 26*rpx, viewWidth/2+20,330*rpx)
				if(this.name1.length >= this.name2.length){
					let name433 = this.drawArticle(ctx, this.name3, 26*rpx, viewWidth/2-20,(330+this.name1.length*30)*rpx)
					let name434 = this.drawArticle(ctx, this.name4, 26*rpx, viewWidth/2+20,(330+this.name1.length*30)*rpx)
				}else{
					let name433 = this.drawArticle(ctx, this.name3, 26*rpx, viewWidth/2-20,(330+this.name2.length*30)*rpx)
					let name434 = this.drawArticle(ctx, this.name4, 26*rpx, viewWidth/2+20,(330+this.name2.length*30)*rpx)
				}
			} else if(this.nameSize == 4 && this.peopleNum == 4){
				//四人四字
				ctx.font = 'bold 20px 微软雅黑'
				let name441 = this.drawArticle(ctx, this.name1, 20*rpx, viewWidth/2-20,325*rpx)
				let name442 = this.drawArticle(ctx, this.name2, 20*rpx, viewWidth/2+20,325*rpx)
				if(this.name1.length >= this.name2.length){
					let name443 = this.drawArticle(ctx, this.name3, 20*rpx, viewWidth/2-20,(325+this.name1.length*24)*rpx)
					let name444 = this.drawArticle(ctx, this.name4, 20*rpx, viewWidth/2+20,(325+this.name1.length*24)*rpx)
				}else{
					let name443 = this.drawArticle(ctx, this.name3, 20*rpx, viewWidth/2-20,(325+this.name2.length*24)*rpx)
					let name444 = this.drawArticle(ctx, this.name4, 20*rpx, viewWidth/2+20,(325+this.name2.length*24)*rpx)
				}
			} else if(this.nameSize == 5 && this.peopleNum == 4){
				//四人五字
				ctx.font = 'bold 16px 微软雅黑'
				let name451 = this.drawArticle(ctx, this.name1, 16*rpx, viewWidth/2-18,320*rpx)
				let name452 = this.drawArticle(ctx, this.name2, 16*rpx, viewWidth/2+18,320*rpx)
				if(this.name1.length >= this.name2.length){
					let name453 = this.drawArticle(ctx, this.name3, 16*rpx, viewWidth/2-18,(320+this.name1.length*18)*rpx)
					let name454 = this.drawArticle(ctx, this.name4, 16*rpx, viewWidth/2+18,(320+this.name1.length*18)*rpx)
				}else{
					let name453 = this.drawArticle(ctx, this.name3, 16*rpx, viewWidth/2-18,(320+this.name2.length*18)*rpx)
					let name454 = this.drawArticle(ctx, this.name4, 16*rpx, viewWidth/2+18,(320+this.name2.length*18)*rpx)
				}
				
			} else if(this.nameSize == 6 && this.peopleNum == 4) {
				//四人六字
				ctx.font = 'bold 14px 微软雅黑'
				let name451 = this.drawArticle(ctx, this.name1, 14*rpx, viewWidth/2-18,318*rpx)
				let name452 = this.drawArticle(ctx, this.name2, 14*rpx, viewWidth/2+18,318*rpx)
				if(this.name1.length >= this.name2.length){
					let name453 = this.drawArticle(ctx, this.name3, 14*rpx, viewWidth/2-18,(318+this.name1.length*16)*rpx)
					let name454 = this.drawArticle(ctx, this.name4, 14*rpx, viewWidth/2+18,(318+this.name1.length*16)*rpx)
				}else{
					let name453 = this.drawArticle(ctx, this.name3, 14*rpx, viewWidth/2-18,(318+this.name2.length*16)*rpx)
					let name454 = this.drawArticle(ctx, this.name4, 14*rpx, viewWidth/2+18,(318+this.name2.length*16)*rpx)
				}
				
			}
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
						},100);
					
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