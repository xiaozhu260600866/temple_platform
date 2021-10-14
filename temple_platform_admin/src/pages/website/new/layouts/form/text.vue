<!-- 企业简介 -->
<template>
	<section>
		<el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
			<el-form-item label="内容设置：" prop="title">
				 <el-checkbox-group v-model="ruleForm.titleType" @change="changeTitleType(ruleForm)">
				    <el-checkbox label="主标题"></el-checkbox>
				    <el-checkbox label="副标题"></el-checkbox>
  				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="文字对齐位置：">
				 <el-radio v-model="ruleForm.textAlign" label="left">左侧对齐</el-radio>
  				 <el-radio v-model="ruleForm.textAlign" label="center">水平居中</el-radio>
			</el-form-item>
			<el-form-item label="主标题：" prop="title" v-if="in_array('主标题', ruleForm.titleType)">
				<el-input v-model="ruleForm.title" style="width:60%" maxlength="32"> </el-input>
			</el-form-item>
				<el-form-item label="副标题：" prop="title2" v-if="in_array('副标题', ruleForm.titleType)">
				<el-input v-model="ruleForm.title2" style="width:60%" maxlength="32"> </el-input>
			</el-form-item>
				
			
			<el-form-item label="内容">
				<el-input type="textarea" v-model="ruleForm.content" :autosize="{ minRows: 10, maxRows: 11}"></el-input>
			</el-form-item>
		</el-form>
	</section>
</template>
<script type="text/javascript">
export default {
	props: ["ruleForm"],
	data() {
		return {
			siteName: this.getSiteName(),
		}
	},
	methods:{
		changeTitleType(v){
			let titleArr = v.titleType;
			if(!this.in_array("主标题",titleArr)){
				v.title = "";
			}
			if(!this.in_array("副标题",titleArr)){
				v.title2 = "";
			}
		},
	}
}

</script>
