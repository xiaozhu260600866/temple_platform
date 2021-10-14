<template>
	<div>
		<div v-if="!text">
			<weui-input v-model="ruleform['name_'+mykey]" label="家庭姓氏" placeholder="请输入姓氏（限1个字）" type="text" :name="'name_'+mykey" datatype="require|chinese|max:1|min:1" maxlength="1"></weui-input>
			<weui-input v-model="ruleform['selectType_'+mykey]"  :name="'selectType_'+mykey"  changeField="label" type="checkbox" dataKey="typeArr" :row="true"></weui-input>
			<weui-input v-model="ruleform['yname_'+mykey]" label="阳上人姓名" placeholder="请输入阳上人（限2-4个字）" type="text" :name="'yname_'+mykey" datatype="require|chinese|max:4|min:2" maxlength="4"></weui-input>
			<weui-input v-model="ruleform['yname2_'+mykey]" label="阳上人姓名" placeholder="请输入阳上人（限2-4个字）" type="text" :name="'yname2_'+mykey" datatype="chinese|max:4|min:2" maxlength="4"></weui-input>
			<weui-input v-model="ruleform['yname3_'+mykey]" label="阳上人姓名" placeholder="请输入阳上人（限2-4个字）" type="text" :name="'yname3_'+mykey" datatype="chinese|max:4|min:2" maxlength="4"></weui-input>
			<weui-input v-model="ruleform['yname4_'+mykey]" label="阳上人姓名" placeholder="请输入阳上人（限2-4个字）" type="text" :name="'yname4_'+mykey" datatype="chinese|max:4|min:2" maxlength="4"></weui-input>
			<weui-input v-model="ruleform['address_'+mykey]" label="地址" type="text" :name="'address_'+mykey" datatype="require" ></weui-input>
		</div>
		<div class="tablet_order" v-else>
			<div class="list" v-if="ruleform.name">家庭姓氏:{{ruleform.name}}</div>
			<div class="list" v-if="ruleform.selectType">类型:{{ruleform.selectType}}</div>
			<div class="list" v-if="ruleform.yname">阳上人姓名:{{ruleform.yname}}</div>
			<div class="list" v-if="ruleform.yname2">阳上人姓名:{{ruleform.yname2}}</div>
			<div class="list" v-if="ruleform.yname3">阳上人姓名:{{ruleform.yname3}}</div>
			<div class="list" v-if="ruleform.yname4">阳上人姓名:{{ruleform.yname4}}</div>
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
