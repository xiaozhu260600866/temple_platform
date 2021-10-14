<!-- 图片 -->
<template>
	<section>
		<el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
			<el-form-item label="样式选择" prop="picType"><span class="fs12 font_666">(切换样式将导致当前的内容丢失)</span></el-form-item>
			<div class="chose_box">
				<div :class="['items',ruleForm.picType == 0 ? 'is-active' : '' ]" @click="ruleForm.picType = 0;addPic(1)">
					<div class="r_style_box">
						<img  src="https://website.doxinsoft.com/images/website/pic1.png" alt="" />
					</div>
						<span >单图</span>
				</div>
				<div :class="['items',ruleForm.picType == 1 ? 'is-active' : '' ]" @click="ruleForm.picType = 1;addPic(2)">
						<div class="r_style_box">
							<img  src="https://website.doxinsoft.com/images/website/pic2.gif" alt="" />
						</div>
						<span >滑块图</span>
				</div>
				<div :class="['items',ruleForm.picType == 2 ? 'is-active' : '' ]" @click="ruleForm.picType = 2;addPic(3)">
					<div class="r_style_box">
						<img  src="https://website.doxinsoft.com/images/website/pic3.png"alt="" />
					</div>
						<span >三图</span>
				</div>
				<div :class="['items',ruleForm.picType == 3 ? 'is-active' : '' ]" @click="ruleForm.picType = 3;addPic(4)">
						<div class="r_style_box">
							<img  src="https://website.doxinsoft.com/images/website/pic4.png"alt="" />
						</div>
						<span >宫格图</span>
				</div>
				<div :class="['items',ruleForm.picType == 4 ? 'is-active' : '' ]" @click="ruleForm.picType = 4;addPic(1)">
					<div class="r_style_box">
						<img  src="https://website.doxinsoft.com/images/website/pic1.png"alt="" />
					</div>
						<span >全屏单图</span>
				</div>
			</div>
			<!-- <el-form-item label="图片编辑"> </el-form-item> -->
			<div v-if="ruleForm.picType == 3" class="mb20">
				<span class="pr10">行数</span>
				<el-input-number v-model="ruleForm.rowNum" controls-position="right" :min="1" :max="4" @change="changeNum"></el-input-number>
				<span class="pl20 pr10">列数</span>
				<el-input-number v-model="ruleForm.columnNum" controls-position="right" :min="2" :max="4" @change="changeNum"></el-input-number>
			</div>

				<!-- 如果 是单图 -->
			<div v-if="ruleForm.picType == 0">
				<my-cropUpload v-model="ruleForm.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:uploadNum(),widthRatio:10,heightRatio:5.79}}" message="最佳尺寸：690*400px" label="图片"></my-cropUpload>
			</div>
				<!-- 如果 是滑块图 -->
			<div v-if="ruleForm.picType == 1">
				<my-cropUpload v-model="ruleForm.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:uploadNum(),widthRatio:10,heightRatio:5.78}}" message="最佳尺寸：450*260px" label="图片"></my-cropUpload>
			</div>
				<!-- 如果 是三图 -->
			<div v-if="ruleForm.picType == 2">
				<my-cropUpload v-model="ruleForm.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:uploadNum(),widthRatio:10,heightRatio:8.33}}" message="最佳尺寸：420*350px" label="图片"></my-cropUpload>
			</div>
				<!-- 如果 是宫格图 -->
			<div v-if="ruleForm.picType == 3">
				<my-cropUpload v-model="ruleForm.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:uploadNum(),widthRatio:10,heightRatio:5.79}}" message="最佳尺寸：690*400px" label="图片" v-if="ruleForm.columnNum == 2"></my-cropUpload>
				<my-cropUpload v-model="ruleForm.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:uploadNum(),widthRatio:10,heightRatio:10}}" message="最佳尺寸：220*220px" label="图片" v-if="ruleForm.columnNum == 3"></my-cropUpload>
				<my-cropUpload v-model="ruleForm.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:uploadNum(),widthRatio:10,heightRatio:10}}" message="最佳尺寸：162*162px" label="图片" v-if="ruleForm.columnNum == 4"></my-cropUpload>
			</div>
			<div v-if="ruleForm.picType == 4">
				<my-cropUpload v-model="ruleForm.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:1,widthRatio:'不限制',heightRatio:'不限制'}}" message="最佳尺寸：不限制" label="图片"></my-cropUpload>
			</div>
		</el-form>
	</section>
</template>
<style type="text/css" scoped="">
.el-input-number{width: 150px;}
</style>
<script type="text/javascript">
export default {
	props: ["ruleForm"],
	data() {
		return {
			siteName: this.getSiteName(),
		}
	},
	methods: {
		uploadNum() {
			if (this.ruleForm.picType == 0) {
				return 1;
			} else if (this.ruleForm.picType == 1) {
				return 10;
			} else if (this.ruleForm.picType == 2) {
				return 3
			} else if (this.ruleForm.picType == 3) {
				return this.ruleForm.columnNum * 2;
			}
		},
		changeNum() {
			let num = this.ruleForm.rowNum * this.ruleForm.columnNum;
			this.addPic(num);
		},
		addPic(num) {
			this.getConfirm("切换样式将导致当前的图片丢失", () => {
				//判断是否大于图片数量，如果有的话，就删除
				if (this.ruleForm.cover_pic.length > num) {
					for (let i = this.ruleForm.cover_pic.length; i >= num; i--) {
						this.ruleForm.cover_pic.splice(i);
					}
				}
				for (let i = this.ruleForm.cover_pic.length; i < num; i++) {
					this.ruleForm.cover_pic.push({ name: 'pic.png', url: 'https://website.doxinsoft.com//upload/images/website/pic.png' });
				}
			});

		}

	}
}

</script>
