<!-- 企业资讯 -->
<template>
	<section>
		<!-- 如果是列表 -->
		<el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" v-if="showType == 'lists'">
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
			<h2>资讯列表：</h2>
			<el-table :data="ruleForm.children" style="width: 100%">
				<el-table-column prop="title" label="资讯标题"></el-table-column>
				<el-table-column label="资讯封面">
					<template scope="scope">
						<img :src="scope.row.cover_pic[0].url" height="50" width="50" v-if="scope.row.cover_pic.length">
					</template>
				</el-table-column>
				<el-table-column prop="published_at" label="发布时间"></el-table-column>
				<el-table-column label="状态">
					<template scope="scope">
						<el-switch v-model="scope.row.status" on-text="" off-text="" :active-value="1" :inactive-value="0"> </el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作" min-width="90">
					<template scope="scope">
						<el-button-group>
							<el-button icon="el-icon-edit" size="mini" @click="edit(scope.row)"></el-button>
							<el-button size="mini" icon="el-icon-delete" @click="del(scope.row,scope.$index)"></el-button>
						</el-button-group>
					</template>
				</el-table-column>
			</el-table>
			<el-form-item class="mt20">
				<el-button type="primary" @click="add()">添加资讯</el-button>
			</el-form-item>
		</el-form>
		<!-- 如果是列表end -->
		<!-- 如果是createOrEdit -->
		<el-dialog title="资讯模板" :visible.sync="dialogFormVisible" top="141px" width="780px" :before-close="handleClose">
			<el-form :model="ruleFormCreateOrEdit" ref="ruleFormCreateOrEdit" label-width="100px" class="demo-ruleForm">
				<el-form-item label="标题" prop="title" :rules="[{ required: true, message: '标题不能为空'},]">
					<el-input v-model="ruleFormCreateOrEdit.title" style="width: 60%;"></el-input>
				</el-form-item>
				<my-cropUpload v-model="ruleFormCreateOrEdit.cover_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'website',allowUploadNum:1,widthRatio:10,heightRatio:7.87}}" message="最佳尺寸：188*148px" label="封面"></my-cropUpload>
				<div class="el-form-item" style="padding-left: 100px">
					<div class="el-form-item__content" style="width:100%">
						<myeditor :content="ruleFormCreateOrEdit.content ? ruleFormCreateOrEdit.content : ''" ref="editor"></myeditor>
					</div>
				</div>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleFormCreateOrEdit')">立即创建</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</section>
</template>
<script type="text/javascript">
import myeditor from "@/components/editor.vue";
export default {
	props: ["ruleForm"],
	data() {
		return {
			siteName: this.getSiteName(),
			showType: 'lists',
			auth: 'add',
			dialogFormVisible: false,
			ruleFormCreateOrEdit: {}
		}
	},
	methods: {
		edit(row) {
			this.auth = "edit";
			this.ruleFormCreateOrEdit = row;
			this.dialogFormVisible = true;
			setTimeout(() => {
				this.$refs.editor.setContent(row.content);
			}, 500)
		},
		changeStatus(row) {
			console.log(row);
		},
		add() {
			this.auth = "add";
			this.dialogFormVisible = true;
			this.ruleFormCreateOrEdit = { cover_pic: [], status: 0, published_at: this.getDate(new Date()) }
			this.ruleForm.children.push(this.ruleFormCreateOrEdit);
			setTimeout(() => {
				this.$refs.editor.setContent("");
			}, 500)
		},
		del(v, index) {
			this.getConfirm("是否删除?", msg => {
				this.ruleForm.children.splice(index, 1);
			});
		},
		handleClose() {
			this.dialogFormVisible = false;
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.ruleFormCreateOrEdit.content = this.$refs.editor.getContent();
					//this.ruleFormCreateOrEdit.published_at = this.getDate(new Date());
					if (this.auth == 'add') this.ruleFormCreateOrEdit.status = 0;
					/*if(this.auth == "edit"){
						 this.ruleForm.children[this.ruleForm.children.length-1]=this.ruleFormCreateOrEdit;
					}else{
						 this.ruleForm.children.push(this.ruleFormCreateOrEdit);
					}*/

					this.dialogFormVisible = false;
				}
			});
		},
	},
	components: {
		myeditor
	}
}

</script>
