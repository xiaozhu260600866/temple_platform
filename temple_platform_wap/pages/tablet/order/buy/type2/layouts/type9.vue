<template>
	<div>
		<div v-if="!text">
			<!-- <weui-input v-model="ruleform['name_'+mykey]" label="疾病名" type="text" :name="'name_'+mykey" datatype="require|chinese|max:10|min:1" ></weui-input> -->
			<weui-input v-model="ruleform['yname_'+mykey]" label="阳上人姓名" placeholder="请输入阳上人（限2-4个字）" type="text" :name="'yname_'+mykey" datatype="require|chinese|max:4|min:2" maxlength="4"></weui-input>
			<weui-input v-model="ruleform['address_'+mykey]" label="地址" type="text" :name="'address_'+mykey" datatype="require" ></weui-input>
		</div>
		<div class="tablet_order" v-else>
			<!-- <div class="list" v-if="ruleform.name">疾病名:{{ruleform.name}}</div> -->
			<div class="list" v-if="ruleform.yname">阳上人姓名:{{ruleform.yname}}</div>
			<div class="list" v-if="ruleform.address">地址:{{ruleform.address}}</div>
		</div>
		
	</div>
</template>

<script>
	export default{
		props:["ruleform","vaildate","mykey","text"],
		components:{
			
		},
		data(){
			return {
				
			}
		}
	}
</script>

<style>
</style>
