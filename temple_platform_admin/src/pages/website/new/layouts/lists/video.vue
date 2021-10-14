<template>
	<section>
		<!-- <div class="module-video module_m">
			<div class="mod-big-video">
				<div class="view-big-video" v-for="cover in v.cover_pic" :style="'background: url('+cover.url+') center center / cover'">
					<img src="https://resource.aijiatui.com/13632945694/company/website/04f5a86a9ee48e6ba143d7137caa56aa.png" class="video-big-mask">
				</div> 
				<p>{{ v.title }}</p>
			</div>
		</div> -->
		<div class="video-sec p15">
			<div class="video-box box-shadow">
				<div class="video-img" v-for="cover in v.cover_pic" :style="'background: url('+cover.url+') center center / cover'">
					<img src="https://resource.aijiatui.com/13632945694/company/website/04f5a86a9ee48e6ba143d7137caa56aa.png" class="play-icon">
				</div> 
				<p class="ptb12 plr15 fs15">{{ v.title }}</p>
			</div>
		</div>
	</section>
</template>
<style type="text/css" scoped="">
.video-img{position: relative;height: 200px;}
.video-img .play-icon{position: absolute;top: 50%;left: 50%;margin-top: -30px;margin-left: -30px;width: 60px;height: 60px;}
</style>
<script type="text/javascript">
export default{
	props:["v"]
}	
</script>