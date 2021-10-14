<template>
	<section>
		<div class="text p15">
			<div :class="['text-box','box-shadow','plr15','ptb12',v.textAlign == 'center' ? 'text-center' : '']">
				<p class="mainTitle fs16" v-if="source == 'app' ? v.title : in_array('主标题', v.titleType)"> {{ v.title }}</p>
				<p class="subTitle fs14 mtb10" v-if="source == 'app' ? v.title2 : in_array('副标题', v.titleType)"> {{ v.title2 }}</p>
				<p class="con fs15">{{ v.content }}</p>
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
export default{ 
	props: ["v", "source"],
}	
</script>
<style type="text/css" scoped="">

.text .text-box .con{line-height: 1.8;text-align: justify;}
.text .text-center ._p{text-align: center;}

</style>