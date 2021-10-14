<template>
	<section class="pb15">
		<div class="contact-box plr15">
			<div class="contact-group box-shadow mb15 bgf" v-for="children in v.children" @click="contact(children)">
				<p class="fs15 label plr5">{{ children.name }}</p>
				<p :class="['con','fs16','pr10',children.type == 1 ? 'Arial': '']">{{ children.value }}</p>
				<p :class="['fs18','iconfont',children.type == 1 ? 'icon-website-tel' : 'icon-location']"></p>
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
export default{
	props:["v","source"],
	methods:{
		contact(children){
			console.log(children);
			if(children.type == 1 && this.source == 'app'){
				this.phone(children.value);
			}else if(children.type == 0 && this.source == 'app' && children.location_x){
				this.location(children.location_y,children.location_x,children.value)
			}
		}
	}
}	
</script>

<style type="text/css" scoped="">

.contact-box .contact-group{display: flex;padding: 18px 0;}
.contact-box .contact-group ._p{line-height: 20px;}
.contact-box .contact-group .label{width: 80px;text-align: center;color: #666;}
.contact-box .contact-group .con{width: 100%;color: #34343e;flex: 1;overflow: hidden;}
.contact-box .contact-group .iconfont{width: 44px;color: #666;text-align: center;border-left: 1px #acb6b7 solid;}
.contact-box .contact-group:last-child{margin-bottom: 0!important;}
</style>