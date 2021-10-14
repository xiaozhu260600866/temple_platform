<!-- 图片 -->
<template>
	<section>
		<el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
			<my-cropUpload v-model="ruleForm.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:3,widthRatio:10,heightRatio:5.33}}" message="最佳尺寸：750*400px" label="图片："></my-cropUpload>
			
		</el-form>
	</section>
</template>

<script type="text/javascript">


export default {
	props: ["ruleForm"],
	data() {
		return {
			siteName: this.getSiteName(),
			actIndex:0,
			fileList:[]
		}
	},
	methods:{
		
	},
	components:{
		
	}
}

</script>
