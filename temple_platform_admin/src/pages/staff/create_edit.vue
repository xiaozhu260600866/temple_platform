<template>
	<el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" width="800px" :top="top" :before-close="handleClose">
		<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<div class="group-item flex">
				<el-form-item label="姓名" prop="name" :rules="[{ required: true, message: '姓名不能为空'},]">
					<el-input v-model="ruleForm.name"></el-input>
				</el-form-item>
				<el-form-item label="电话" prop="mobile" :rules="[{ required: true, message: '电话不能为空'}]">
					<el-input v-model="ruleForm.mobile"></el-input>
				</el-form-item>
			</div>
			<div class="group-item flex">
				<el-form-item label="帐号" prop="username" :rules="[{ required: true, message: '帐号不能为空'}]">
                	<el-input v-model="ruleForm.username" style="margin-right: 5px" ></el-input>
          		  </el-form-item>
	            <el-form-item label="密码" prop="password" :rules="[!ruleForm.id ? { required: true, message: '密码不能为空'} : '']">
	                <el-input v-model="ruleForm.password" style="margin-right: 5px" type="password"></el-input>
	            </el-form-item>
			</div>
            <el-form-item label="角色"  :rules="[{ required: true, message: '角色不能为空'}]">
            	<el-select v-model="ruleForm.role_id" placeholder="请选择角色">
            		<el-option :label="v.name" :value="v.id" v-for="v in roleArr"></el-option>
            	</el-select>
            </el-form-item>
			<div class="group-item flex">
				<el-form-item label="所属饭堂">
					<el-select v-model="ruleForm.dinner_house" placeholder="请选择所属饭堂">
						<el-option label="清凉斋" value="清凉斋"></el-option>
						<el-option label="大斋堂" value="大斋堂"></el-option>
					</el-select>
				</el-form-item>
			</div>
		<!-- 	<div class="group-item flex">
				<el-form-item label="性别">
					<el-select v-model="gender" placeholder="请选择性别">
						<el-option label="男" :value="1"></el-option>
						<el-option label="女" :value="2"></el-option>
					</el-select>
				</el-form-item>
			</div> -->
			<!-- <div class="group-item flex">
				<el-form-item label="部门" prop="department" :rules="[{ required: true, message: '部门不能为空'},]">
					<el-cascader expand-trigger="hover" :options="departmentArr" v-model="ruleForm.department">
					</el-cascader>
				</el-form-item>
				<el-form-item label="职务" prop="position" class="mr20" :rules="[{ required: true, message: '职务不能为空'},]">
					<el-input v-model="ruleForm.position"></el-input>
				</el-form-item>
			</div> -->
		<!-- 	<div class="group-item flex">
				<el-form-item label="微信号" prop="wechat" :rules="[{ required: true, message: '微信号不能为空'},]">
					<el-input v-model="ruleForm.wechat"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email" class="mr20">
					<el-input v-model="ruleForm.email"></el-input>
				</el-form-item>
			</div> -->
           <!-- <el-form-item label="分类权限" :rules="[{ required: true, message: '排序'},]">
               <el-select v-model="fclass" multiple placeholder="请选择">
                   <el-option v-for="v  in fclassArr" :label="v.label" :value="''+v.value"></el-option>
                 </el-select>
            </el-form-item> -->
			<!-- <el-form-item label="个人简介" prop="remark">
				<el-input v-model="ruleForm.remark" style="margin-right: 5px" type="textarea"></el-input>
			</el-form-item> -->
			<div class="clearfix"></div>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</el-dialog>
</template>
<script>
	export default {
	props: ['top'],
	data() {
		return {
			ruleForm: {},
			formAction: '',
			dialogFormVisible: false,
			merchantLists: [],
			status: 0,
			gender: 1,
			tags:[],
            fclassArr:[],
            roleArr:[],
            fclass:[],
			departmentArr: [],
		};
	},
	methods: {

	submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					this.ruleForm.status = this.status;
					this.ruleForm.gender = this.gender;
					this.ruleForm.see = this.see;
					this.ruleForm.tags = this.tags;
                    this.ruleForm.fclass = this.fclass;
					delete this.ruleForm.site_name;
					this.postAjax(this.formAction, this.ruleForm, msg => {
						if (msg.data.status == 2) {
							this.dialogFormVisible = false;
							this.$parent.ajax();
						}

					});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},

		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		ajax: function(params, merchantLists, departmentArr,fclassArr,roleArr) {
            this.$nextTick(()=>{
                this.fclassArr = fclassArr;
                this.merchantLists = merchantLists;
                this.departmentArr = departmentArr;
                this.roleArr = roleArr;
                this.dialogFormVisible = true;
                if (params) {
                    console.log(params);
                    this.formAction = '/admin/card/edit?id=' + params.id;

                    //this.ruleForm = { role_id: '', sort: 0, status: 0, gender: '' };
                    this.ruleForm = params;
                    this.status = this.ruleForm.status == 2 ? 0 : 1;
                    this.gender = this.ruleForm.sex;
                    this.see = this.ruleForm.see ? true :false;
                    //this.$set(this.ruleForm,"role_id",params.role_id);
                    this.ruleForm.mobile = this.ruleForm.phone;
                } else {
                    this.ruleForm = { role_id: '', sort: 0, status: 0, gender: '',fclass:[] };
                    this.formAction = '/admin/card/create';
                }
                this.ruleForm.department = this.ruleForm.getDepartmentArr;

                this.ruleForm.gender = this.ruleForm.sex;

                    if(this.ruleForm.fclass){
                        this.fclass = this.ruleForm.fclass.split(',')
                    }else{
                        this.fclass  = []
                    }
            });
		},
		handleClose() {
			this.dialogFormVisible = false;
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

.el-upload-list--picture-card .el-upload-list__item {
	width: 100px;
	height: 100px;
}

.styleImg {
	width: 100px;
}

.v-link .el-input {
	width: 100%;
}

</style>
