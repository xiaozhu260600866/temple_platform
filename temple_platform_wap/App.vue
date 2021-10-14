<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
/* 脚部 */
uni-tabbar .uni-tabbar{background: #fff!important;height: 56px;}
uni-tabbar .uni-tabbar__icon{margin-top: 2px;height: 28px;width: 28px;}
uni-tabbar .uni-tabbar__label {font-size: 13px !important;color: #333!important;line-height: 20px;}

/* 提示词 */
uni-toast .uni-simple-toast__text{font-size: 16px;padding: 12px 20px;}

/* 轮播标点 */
.index-nav uni-swiper .uni-swiper-dot{width: 32rpx;height: 4rpx;border-radius: 2rpx;background-color: rgba(169,136,83,0.3);}
.index-nav uni-swiper .uni-swiper-dots-horizontal .uni-swiper-dot{margin-right: 8rpx;}
.index-nav uni-swiper .uni-swiper-dot-active{background-color: rgba(169,136,83,1);}
</style>
