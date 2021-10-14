<template>
	<section>
		<div class="p15 pt0 qyzx" v-for="children in v.children" v-if="children.status == 1" @click="show(children)">
			<div class="zx-sec box-shadow p15">
				<div class="zxInfo">
					<p class="title nowrap fs15">{{ children.title }}</p>
					<p class="time fs13 font_grey pt30">发布时间：<span class="Arial">{{ children.published_at }}</span></p>
				</div>
				<div class="img ml15" :style="'background: url('+cover.url+') center center / cover'" v-for="(cover,coverIndex) in children.cover_pic"></div>
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
export default{
	props:["v","source"],
	methods:{
		show(v){
			if(this.source == 'app'){
				this.$parent.item = v;
				this.goto('/pages/user/website/info/main',1);
			}
		}
	}
}	
</script>

<style type="text/css" scoped="">
.qyzx:last-child{margin-bottom: 0!important;}
.zx-sec{white-space: pre-line;word-break: break-all;word-wrap: break-word;display: flex;justify-content: space-between;}
.zx-sec .zxInfo{width: 100%;flex: 1;overflow: hidden;}
.zx-sec .zxInfo .title{font-size: 15px;line-height: 24px;}
.zx-sec .zxInfo .time{line-height: 16px;}
.zx-sec .img{width: 70px;height: 70px;}
</style>