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
			height: 600,
			show:false,
			nameSize: 3, //名称字数
			peopleNum:1, //人数
			no:'A001', //人数
			familyName: '李',
			typeName:'堕胎婴灵,流产婴灵,夭折婴灵',
			name:'李敏英',
			address:'江门市蓬江区建设路92号建行大厦8楼806室',
			rpx: 0
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
			console.log(0);
			this.name = name;
			this.typeName = item.selectType;
			this.peopleNum = peopleNum;
			this.address = item.address;
			this.familyName = item.surname;
			this.no = item.no;
			this.typeName = item.selectType;
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
			
			let typeName = this.typeName.split(",");
			console.log(typeName)
			
			//广告图
			ctx.drawImage('/static/printf_bg2.jpg', 0, 0, viewWidth, viewHeight)
			ctx.drawImage('/static/impress2-70.png', viewWidth/2-75, 355*rpx, 150, 150)
			
			// 编号
			ctx.setFontSize(16)
			ctx.setFillStyle('#000')
			ctx.fillText('No：'+this.no, 20*rpx, 30*rpx)
			
			// 地址
			ctx.font = 'bold 16px 微软雅黑'
			ctx.setTextAlign('center')
			let address = this.drawArticle(ctx, this.address, 16*rpx , viewWidth-35*rpx,285*rpx)
			
			// 宗姓
			ctx.font = 'bold 26px 微软雅黑'
			let familyName = this.drawArticle(ctx, this.familyName+'氏所有', 30*rpx, viewWidth/2-3,350*rpx)
			
			//类型
			ctx.font = 'bold 26px 微软雅黑'
			if( typeName.length == 1){
				let type0 = this.drawArticle(ctx, typeName[0], 30*rpx, viewWidth/2-3,(this.familyName.length*30+450)*rpx)
			}else if(typeName.length == 2){
				let type0 = this.drawArticle(ctx, typeName[0], 30*rpx, viewWidth/2-28,(this.familyName.length*30+450)*rpx)
				let type1 = this.drawArticle(ctx, typeName[1], 30*rpx, viewWidth/2+23,(this.familyName.length*30+450)*rpx)
			}else{
				let type0 = this.drawArticle(ctx, typeName[0], 30*rpx, viewWidth/2-38,(this.familyName.length*30+450)*rpx)
				let type1 = this.drawArticle(ctx, typeName[1], 30*rpx, viewWidth/2-3,(this.familyName.length*30+450)*rpx)
				let type2 = this.drawArticle(ctx, typeName[2], 30*rpx, viewWidth/2+33,(this.familyName.length*30+450)*rpx)
			}
			
			// 阳上人
			ctx.font = 'bold 22px 微软雅黑'
			let yang = this.drawArticle(ctx, '阳上人:', 22,  25 ,viewHeight-360-this.name.length*22)
			
			// 姓名
			ctx.font = 'bold 22px 微软雅黑'
			let name = this.drawArticle(ctx, this.name, 22 , 25,viewHeight-260-this.name.length*22)
			
			// 敬荐
			ctx.font = 'bold 22px 微软雅黑'
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