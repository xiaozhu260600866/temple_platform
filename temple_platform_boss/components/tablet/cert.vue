<template>
	<view v-if="show">
		<image src="/static/receipt-bg3.jpg" @load="imageLoad" hidden v-if="url=='pages/user/order/project'"></image>
		<image src="/static/receipt-bg3.jpg" @load="imageLoad" hidden v-if="url!='pages/user/order/project'"></image>
		<canvas :style="'width: '+width+'px; height: 400rpx;left:-1300px'" canvas-id="firstCanvas" > </canvas>
		<img :src="tempFilePath" preview="1" id="temp"  />
	</view>
</template>

<script>
	//import poster from '../../../components/poster_html.vue';
	export default {
		components: {
			//poster
		},
		data() {
			return {
				posterShow:true,
				formAction: '/project/order/detail',
				width:400,
				tempFilePath:'',
				show:false,
				height:600,
				rpx:0,	
				images:[],
				data: this.formatData(this),
				price: '1888.88',
				order:{},
				url:'',
				open:true,
				images2:{},
				priceArr:[]
			}
		},
		onLoad() {	
		},
		methods: {
			imageLoad2(e){
				var $width = e.detail.width, //获取图片真实宽度
					$height =200,
					
					ratio = $width / $height; //图片的真实宽高比例
					console.log(e);
				var viewWidth = this.width, //如:375 i6屏宽
					viewHeight = this.width / ratio; //计算的高度值
				var image = {};
				//将图片的datadata-index作为image对象的key,然后存储图片的宽高值
				image = {
					width: viewWidth,
					height: 200
				}
				console.log(image);
				console.log(124);
				this.images2 = image;	
			},
			ajax(order,open) {
				var pages = getCurrentPages();    //获取加载的页面
				var currentPage = pages[pages.length - 1];  //获取当前页面的对象
				this.url = currentPage.route;  //当前页面url
				
				this.open = open;
				if(!this.tempFilePath){
					uni.getSystemInfo({
						success:res=> {
							this.width = res.windowWidth
							this.height = res.windowHeight
							this.rpx = res.windowWidth/375;
						}
					});
					
					this.order = order;
					this.price = order.amount;
					let date = new Date(order.created_at.replace(new RegExp(/-/gm) ,"/"));
					this.order.year = date.getFullYear();
					this.order.month = date.getMonth() +1 ;
					this.order.month = this.order.month < 10? "0"+this.order.month : this.order.month;
					this.order.date = date.getDate();
					
					this.order.date = this.order.date < 10? "0" + this.order.date : this.order.date;
					this.show = true;
					this.convertCurrency(this.price);
					if(this.open){
						uni.showLoading({
							title: '加载中',
						})
					}
					
				}else{
					setTimeout(()=>{
						//document.getElementById("temp").click();
						uni.previewImage({
							current: this.tempFilePath, // 当前显示图片的http链接
							urls: [this.tempFilePath] // 需要预览的图片http链接列表
						})
					},500);
				}
				
				
			},
			
			imageLoad(e){
				var $width = e.detail.width, //获取图片真实宽度
				$height = e.detail.height,
				ratio = $width / $height; //图片的真实宽高比例
				var viewWidth = this.width, //如:375 i6屏宽
				viewHeight = this.width / ratio; //计算的高度值
				
				let ctx = uni.createCanvasContext('firstCanvas')
				console.log(viewHeight);
				//广告图
				if(this.url == 'pages/user/order/project'){
					ctx.drawImage('/static/receipt-bg3.jpg', 0, 0, viewWidth, viewHeight)
				}else{
					ctx.drawImage('/static/receipt-bg3.jpg', 0, 0, viewWidth, viewHeight)
				}
				
				let rpx = this.rpx;
				//年
				ctx.setFontSize(10)
				ctx.setFillStyle('#603217')
				ctx.fillText(this.order.year, 125 * rpx, 48 * rpx)
				
				//月
				ctx.setFontSize(10)
				ctx.setFillStyle('#603217')
				ctx.fillText(this.order.month, 170 * rpx, 48 * rpx)
				
				//日
				ctx.setFontSize(10)
				ctx.setFillStyle('#603217')
				ctx.fillText(this.order.date, 200 * rpx, 48 * rpx)
				
				//No.
				ctx.setFontSize(9)
				ctx.setFillStyle('#ff0000')
				ctx.fillText('GD'+this.order.order_no, 278 * rpx, 49 * rpx)
				
				//姓名
				ctx.setFontSize(10)
				ctx.setFillStyle('#603217')
				ctx.fillText(this.order.cert_name, 90  * rpx, 78 * rpx)
				
				//中文
				ctx.setFontSize(10)
				ctx.setFillStyle('#603217')
				let convertCurrency = this.convertCurrency(this.price)
				ctx.fillText(convertCurrency, 110 * rpx, 104 * rpx)
				
				//备注
				if(this.order.tablet_name){
					ctx.setFontSize(10)
					ctx.setFillStyle('#603217')
					ctx.fillText(this.order.tablet_name, 70 * rpx, 127 * rpx)
				}
				
				//支付方式
				ctx.setFontSize(10)
				ctx.setFillStyle('#603217')
				ctx.fillText('微信支付', 275 * rpx, 78 * rpx)
				
				
				//金额小写
				ctx.setFontSize(10)
				ctx.setFillStyle('#603217')
				ctx.fillText('￥'+this.price, 290 * rpx, 104 * rpx)
				
				
				ctx.draw();
				this.show = true;
				
				setTimeout(()=>{
					uni.canvasToTempFilePath({
					canvasId: 'firstCanvas',
					success:res=> {
						console.log(res);
						this.tempFilePath = res.tempFilePath;
						if(this.open){
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
						}
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
				// 控制最多显示3行
				if (b < 3) {
					ctx.fillText(row[b], x, y + b * 19);
				}
				}
				let _len = row.length > 3 ? 3 : row.length
				return y + (_len - 1) * 19
			},
			
			convertCurrency(n) {
				var unit = "仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
				n += "00";  
				var a = n.indexOf('-');
				if(a != -1){
					n = n.substring(1);
					var indexpoint = n.indexOf('.');  // 如果是小数，截取小数点前面的位数
					if (indexpoint >= 0){
						n = n.substring(0, indexpoint) + n.substr(indexpoint+1, 2);   // 若为小数，截取需要使用的unit单位
					}		    
					unit = unit.substr(unit.length - n.length);  // 若为整数，截取需要使用的unit单位
					for (var i=0; i < n.length; i++){
						str += "".charAt(n.charAt(i)) + unit.charAt(i);  //遍历转化为大写的数字
					}
					return "负数"+str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万/g, "$1").replace(/^元零?|零分/g, "").replace(/元$/g, "元整").replace(/角$/g, "角整"); // 替换掉数字里面的零字符，得到结果
				}else{
					var indexpoint = n.indexOf('.');  // 如果是小数，截取小数点前面的位数
					if (indexpoint >= 0){
						n = n.substring(0, indexpoint) + n.substr(indexpoint+1, 2);   // 若为小数，截取需要使用的unit单位
					}	    
					unit = unit.substr(unit.length - n.length);  // 若为整数，截取需要使用的unit单位
					for (var i=0; i < n.length; i++){
						str += "零壹贰叁肆伍陆柒捌玖".charAt(n.charAt(i)) + unit.charAt(i);  //遍历转化为大写的数字
					}
					return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万/g, "$1").replace(/^元零?|零分/g, "").replace(/元$/g, "元整").replace(/角$/g, "角整"); // 替换掉数字里面的零字符，得到结果
				}
			}
			
		  //   num2Chinaese(_num){
				// if(_num == 0) return '零';
				// if(_num == 1) return '壹';
				// if(_num == 2) return '贰';
				// if(_num == 3) return '叁';
				// if(_num == 4) return '肆';
				// if(_num == 5) return '伍';
				// if(_num == 6) return '陆';
				// if(_num == 7) return '柒';
				// if(_num == 8) return '捌';
				// if(_num == 9) return '玖';
		  //   },
		  //   convertCurrency(n) {
				// let nArr = n.split("."); //[1234,56]
				// let nLeft = (Array(7).join(0) + nArr[0]).slice(-7) // 0001234
				// let nLeftArr = nLeft.split('');//[0,0,0,1,2,3,4]
				// let nRight = nArr[1]; //56
				// let nRightArr = nRight.split(''); //[5,6]
				// //console.log(nLeftArr)
				// //for(let i=0;i<nLeftArr.length;i++){
				// let index = 0;
				// nLeftArr.forEach((element)=>{
				// 	this.priceArr[index] = this.num2Chinaese(element);
				// 	index++;
				// 	//res += this.num2Chinaese(element);
				// })
				// nRightArr.forEach((element)=>{
				// 	this.priceArr[index] = this.num2Chinaese(element);
				// 	index++;
				// })
				// return 1;
		  //   }
		}
	}
</script>
