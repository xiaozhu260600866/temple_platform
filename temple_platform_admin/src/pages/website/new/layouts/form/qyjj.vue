<!-- 企业简介 -->
<template>
	<section>
		<el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
			<el-form-item label="组件标题：" prop="title">
				<el-input v-model="ruleForm.title" style="width:60%" maxlength="32"> </el-input>
			</el-form-item>
			<el-form-item label="选择图标：">
				<el-col :span="18">
					<div class="ivu-input-wrapper ivu-input-type" v-for="(v,key) in 10">
						<div :class="['config-out', 'config-out-click', (key+1) == ruleForm.icon ?  'checkedIcon' :'']" @click="ruleForm.icon = (key+1)">
							<img :src="siteName+'/images/website/chooseIcon'+(key+1)+'.png'" class="config-icon">
               				</div>
						</div>
				</el-col>
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
}

</script>
