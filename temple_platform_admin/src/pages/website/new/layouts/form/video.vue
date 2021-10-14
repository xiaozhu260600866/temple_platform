<!-- 企业简介 -->
<template>
	<section>
		<el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
			<el-form-item label="视频地址：" prop="video">
				<el-input type="textarea" v-model="ruleForm.url" :autosize="{ minRows: 5, maxRows: 5}" style="width:70%"></el-input>
			</el-form-item>
			<el-form-item label="视频标题：" prop="title">
				<el-input v-model="ruleForm.title" style="width:70%" maxlength="32"> </el-input>
			</el-form-item>
			<my-cropUpload v-model="ruleForm.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:1,widthRatio:10,heightRatio:5.79}}" message="最佳尺寸：690*400px" label="视频封面"></my-cropUpload>
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
