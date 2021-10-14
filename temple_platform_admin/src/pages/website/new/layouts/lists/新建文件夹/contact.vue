<template>
	<section>
		<div class="items" v-for="children in v.children">
			<div class="name">
				<p class="s_n">{{ children.name }}</p>
				<div class="link_icon">
					<p>{{ children.value }}</p>
					<div class="link_icon_address"><span></span>
						<img :src="children.type == 0 ? 'https://resource.aijiatui.com/18682013979/company/website/5975d440bc4ef859bfeb382ac617dfa0.png' : 'https://resource.aijiatui.com//company/moments/b3d862e2434c9340bf0942d336f96656.png'" draggable="false" style="width:30px;height:26px">
						</div>
					</div>
				</div>
			</div>
		<div class="clearfix"></div>
		<div v-if="v.children.length == 0" class="companylink-none">
			从右侧设置栏添加地址及电话
		</div>
	</section>
</template>
<script type="text/javascript">
export default{
	props:["v"]
}	
</script>