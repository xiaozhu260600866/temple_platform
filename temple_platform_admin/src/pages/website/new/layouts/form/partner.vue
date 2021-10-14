<!-- 合作伙伴 -->
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
			<el-form-item label="样式选择"><span class="fs12 font_666">(切换样式将导致当前的内容丢失)</span>
			</el-form-item>
			<div class="chose_box">
				<div :class="['items',ruleForm.styleType == 0 ? 'is-active' : '']" @click="ruleForm.styleType = 0">
					<div class="r_style_box"><img src="https://website.doxinsoft.com/images/website/style1.png" alt=""></div> <span>横版LOGO</span>
					</div>
					<div :class="['items',ruleForm.styleType == 1 ? 'is-active' : '']" @click="ruleForm.styleType = 1">
						<div class="r_style_box hover_i"><img src="https://website.doxinsoft.com/images/website/style2.png" alt="" class="png_i"></div> <span>竖版LOGO</span>
						</div>
					</div>
					<!-- 横版LOGO -->
					<div v-if="ruleForm.styleType == 0">
						<my-cropUpload v-model="ruleForm.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:12,widthRatio:10,heightRatio:4.28}}" message="最佳尺寸：210*90px" label="图片"></my-cropUpload>
					</div>
					<!-- 竖版LOGO -->
					<div v-if="ruleForm.styleType == 1">
						<my-cropUpload v-model="ruleForm.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:12,widthRatio:10,heightRatio:10}}" message="最佳尺寸：135*135px" label="图片"></my-cropUpload>
					</div>
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
