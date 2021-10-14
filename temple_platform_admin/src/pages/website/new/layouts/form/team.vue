<!-- 管理团队 -->
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
			<div class="edit-item" v-for="(v,index) in ruleForm.children">
				<div class="auth text-right" v-if="ruleForm.children.length>1">
					<a href="javascript:;" class="iconfont icon-arrow-up fs20 pr20" v-if="index != ruleForm.children.length -1" @click="toDown(index)"></a>
					<a href="javascript:;" class="iconfont icon-arrow-down fs20 pr20" v-if="index != 0" @click="toUp(index)"></a>
					<a href="javascript:;" class="iconfont icon-off fs20" @click="del(v,index)"></a>
				</div>
				<my-cropUpload source="delImage" v-model="v.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:1,widthRatio:10,heightRatio:8.49}}" message="最佳尺寸：330*280px" label="头像"></my-cropUpload>
				<el-form-item label="姓名：" prop="name">
					<el-input v-model="v.name" style="width:60%" maxlength="32"> </el-input>
				</el-form-item>
				<el-form-item label="职位：" prop="position">
					<el-input v-model="v.position" style="width:60%" maxlength="32"> </el-input>
				</el-form-item>
				<el-form-item label="简介">
					<el-input type="textarea" v-model="v.content" :autosize="{ minRows: 5, maxRows: 6}"></el-input>
				</el-form-item>
			</div>
			<el-form-item>
				<el-button type="primary" @click="add()">添加人员</el-button>
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
	methods: {
		del(v, index) {
			this.getConfirm("是否删除?", msg => {
				this.ruleForm.children.splice(index, 1);
			});
		},
		add() {
			this.ruleForm.children.push({ name: '姓名', cover: 'noData.png', cover_pic: this.splitCover("noData.png", "website"), content: '简介', position: '职位' });
		},
		toDown(index) {
			let temp = this.ruleForm.children[index + 1];
			this.$set(this.ruleForm.children, index + 1, this.ruleForm.children[index]);
			this.$set(this.ruleForm.children, index, temp);
		},
		toUp(index) {
			let temp = this.ruleForm.children[index - 1];
			this.$set(this.ruleForm.children, index - 1, this.ruleForm.children[index]);
			this.$set(this.ruleForm.children, index, temp);
		}
	}
}

</script>
