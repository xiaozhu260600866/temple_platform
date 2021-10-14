<template>
	<section>
		<div class="recruitment p15 pt0" v-for="children in v.children" v-if="children.status==1">
			<div class="re-box p15 bgf box-shadow">
				<div class="re-top bd-be pb10 mb10">
					<p class="fs16">{{ children.position }}</p>
					<p class="fs16 Arial main-color">{{ children.salary }}</p>
				</div>
				<div class="re-info">
					<p class="fs14 font_666">{{ children.work_city }}</p>
					<p class="fs14 font_666">{{ children.need }}</p>
					<p class="fs14 font_666">{{ children.need2 }}</p>
				</div>
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
.re-box{width: 100%;}
.re-box .re-top{display: flex;justify-content: space-between;line-height: 20px;}
.re-box .re-info{display: flex;justify-content: space-between;}
.re-box .re-info ._p{width: 100%;text-align: center;border-right: 1px #eee solid;line-height: 18px;}
.re-box .re-info ._p:last-child{border-right: 0;}
</style>