<template>
	<div>
		<div v-if="!text">
			
			<weui-input v-model="ruleform['selectType_'+mykey]" datatype="array" errorMessage="请选择类型" :name="'selectType_'+mykey"  changeField="label" type="checkbox" dataKey="typeArr" :row="true"></weui-input>
			<weui-input v-model="ruleform['surname_'+mykey]" label="姓氏" placeholder="请输入姓氏（限1个字）" type="text" :name="'surname_'+mykey" datatype="require|chinese|max:1|min:1" maxlength="1"></weui-input>
			<weui-input v-model="ruleform['yname_'+mykey]" label="阳上人姓名" placeholder="请输入阳上人（限2-4个字）" type="text" :name="'yname_'+mykey" datatype="require|chinese|max:4|min:2" maxlength="4"></weui-input>
			<weui-input v-model="ruleform['address_'+mykey]" label="地址" type="text" :name="'address_'+mykey" datatype="require" ></weui-input>
		</div>
		<div class="tablet_order" v-else>
			<div class="list" v-if="ruleform.selectType">类型:{{ruleform.selectType}}</div>
			<div class="list" v-if="ruleform.surname">姓氏:{{ruleform.surname}}</div>
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
