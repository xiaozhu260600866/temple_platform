<template>
	<section>
		<div class="partner-sec bgf pt15 pr3 pl15 mlr15 box-shadow">
			<div :class="['pb15','pr12',v.styleType == 1 ? 'fourPic' : 'threePic'] " v-for="pic in v.cover_pic">
				<div class="img" :style="'background: url('+pic.url+') center center / cover'"></div>
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
export default{
	props:["v"]
}	
</script>

<style type="text/css" scoped="">
.partner-sec {display: flex;flex-wrap: wrap;}
.partner-sec .threePic{width: 33.333%;}
.partner-sec .threePic .img{width: 100%;height: 52px;}
.partner-sec .fourPic{width: 25%;padding-right: 12px;}
.partner-sec .fourPic .img{width: 100%;height: 75px;}


</style>