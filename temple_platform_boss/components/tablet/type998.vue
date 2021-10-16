<template>
	<view class="bg-f" v-if="show">
		<canvas :style="'width: '+width+'px; height: '+height+'px; left:-999px'" canvas-id="firstCanvas"></canvas>
		<image src="/static/printf_bg2.jpg" @load="imageLoad" hidden></image>
	</view>
</template>

<script>
export default {
	props:["notOpenPic"],
	data() {
		return {
			posterShow:true,
			width: 375,
			height: 600,
			show:false,
			nameSize: 3, //名称字数
			peopleNum:1, //人数
			no:'A001', //人数
			name:'梁敏英',
			address:'江门市蓬江区建设路92号建行大厦8楼806室',
			rpx:0,
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
		console.log("llu")
		console.log(a.length,123)
		
	},
	
	methods: {
		init(name,name2,name3,name4,peopleNum,item){
			 this.name1 = name;
			
			// this.familyName = item.surname;
			// this.peopleNum = peopleNum;
			 this.address = item.address;
			// this.fName = item.fName;
			// this.mName = item.mName;
			console.log(this.name4);
			this.show = true;
			this.no = item.no;
		},
		imageLoad(e){
			var $width = e.detail.width, //获取图片真实宽度
			$height = e.detail.height,
		
			ratio = $width / $height; //图片的真实宽高比例
			console.log("deviceWidth",$width)
			console.log("deviceHeigth",$width)
			var viewWidth = this.width, //如:375 i6屏宽
			viewHeight = this.width / ratio; //计算的高度值
			
			this.height = viewHeight
			console.log(this.name4);
			let ctx = uni.createCanvasContext('firstCanvas')
			let rpx = this.rpx;
			console.log("imageRatio",viewWidth / viewHeight);
			//广告图
			setTimeout(()=>{
				ctx.drawImage('/static/printf_bg.jpg', 0, 0, viewWidth, viewHeight)
				// ctx.drawImage('/static/impress2-70.png', viewWidth/2-76, 380*rpx, 150, 150)
				
				// 编号
				ctx.setFontSize(16)
				ctx.setFillStyle('#000')
				ctx.setTextAlign('left')
				ctx.fillText('No：'+this.no, 20*rpx, 30*rpx)
				
				// 地址
				ctx.font = 'bold 16rpx 微软雅黑'
				ctx.setTextAlign('center')
				if(this.address){
					let address = this.drawArticle(ctx, this.address, 16*rpx , viewWidth-50*rpx,285*rpx)
				}
				
				
				// 姓名
				ctx.font = 'bold 27rpx 微软雅黑'
				let familyName = this.drawArticle(ctx, this.name1, 27*rpx, viewWidth/2,370*rpx)
				
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
								if(!this.notOpenPic){
									uni.previewImage({
										current: this.tempFilePath, // 当前显示图片的http链接
										urls: [this.tempFilePath] ,
										
									})
								}else{
									
								}
								this.$emit("callBack",this.tempFilePath)
								
							},500);
						this.show = false;
					},
					fail:res=>{
						console.log(res);
					}
				})
				},200)
			},500);
			
			
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