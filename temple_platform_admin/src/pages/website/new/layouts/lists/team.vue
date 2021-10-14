<template>
	<section>
		<div class="team-sec">
			<div class="team_box box-shadow" v-for="(children,childrenKey) in v.children">
				<div class="box_item">
					<div class="box_img" :style="'background: url('+cover.url+') center center / cover'" v-for="cover in children.cover_pic"  @click="previewImage(cover.name,'website')">
					</div>
					<div class="box_con plr10">
						<div class="info ptb10 bd-be">
							<p class="in fs15">{{ children.name }}</p>
							<p class="ip fs14 font_666">{{ children.position }}</p>
						</div>
						<div class="ptb10">
							<div class="conList fs13">{{ children.content }}</div>
						</div>
					</div>
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
.team-sec{display:-webkit-box;display:-ms-flexbox;display:flex;overflow:auto;flex-wrap:wrap;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;padding: 0 15px 0 3px;}
.team_box{max-width: 166px;min-width: 166px;margin: 0 0 12px 12px;}
.team_box .box_item{width:100%;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;display:block;float:left;text-align:left;}
.team_box .box_img{display:block;width:100%;height:130px;border-radius: 6px 6px 0 0;}
.team_box .box_con{overflow: auto;}

</style>