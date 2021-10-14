<template>
	<el-dialog title="新增" :visible.sync="dialogFormEdit" width="800px" top="10px" :before-close="handleClose">
		<el-form :model="ruleForm" ref="ruleForm" label-width="120px" class="demo-ruleForm">
		<!-- 	<el-form-item label="ID" prop="id">
				<el-input v-model="ruleForm.id"></el-input>
			</el-form-item> -->
			<el-form-item label="功德主姓名" prop="name" :rules="[{ required: true, message: '姓名不能为空'},]">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="功德主手机" prop="phone" >
				<el-input v-model="ruleForm.phone"></el-input>
			</el-form-item>
			<el-form-item label="功德主手机2" prop="phone2" >
				<el-input v-model="ruleForm.phone2"></el-input>
			</el-form-item>
			<el-form-item label="功德主地址" prop="address">
				<el-input v-model="ruleForm.address" style="width: 90%;"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>
<script>
	export default {
		props: [''],
		data() {
			return {
				ruleForm: {},
				formAction: '',
				dialogFormEdit: false,
				siteName: this.getSiteName(),
			};
		},
		methods: {
			submitForm(formName) {
			    this.$refs[formName].validate((valid) => {
			        if (valid) {
			            this.postAjax("/admin/user/create", this.ruleForm, msg => {
			                if (msg.data.status == 2) {
								this.dialogFormEdit = false;
			                   setTimeout(()=>{
			                   		window.location.reload();
			                   },3000);
			                }
			            })
			        } else {
			            console.log('error submit!!');
			            return false;
			        }
			    });
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			ajax: function() {
				this.dialogFormEdit = true;

			},
			handleClose() {
				this.dialogFormEdit = false;
			}
		},
	}
</script>
<style type="text/css" scoped="">
	.el-input,
	.el-cascader,
	.el-select {
		width: 210px;
	}
</style>
