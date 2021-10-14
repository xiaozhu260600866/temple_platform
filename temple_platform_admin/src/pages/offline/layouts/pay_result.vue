<template>
	<el-dialog title="结算" :visible.sync="dialogFormEdit" width="800px" top="10px" :before-close="handleClose">
		<el-form :inline="true" :model="ruleForm" ref="ruleForm" label-width="140px" class="demo-ruleForm validform_ajax pay-list" >
            <div class="pay-con">
                <div class="re-title"><span>收款成功</span></div>
                <el-form-item label="应收金额：" prop="name" >
                    <div class="num">{{ ruleForm.amount }}</div>
                </el-form-item>
                <el-form-item label="现金：" prop="name" v-if="ruleForm.pay_method1">
                    <div class="num">{{ ruleForm.pay_method1 }}</div>
                </el-form-item>
                <el-form-item label="微信支付：" prop="name" v-if="ruleForm.pay_method2">
                    <div class="num">{{ ruleForm.pay_method2 }}</div>
                </el-form-item>
                <el-form-item label="银联：" prop="name" v-if="ruleForm.pay_method3">
                    <div class="num">{{ ruleForm.pay_method3 }}</div>
                </el-form-item>
                <el-form-item label="悦农e付3040：" prop="name" v-if="ruleForm.pay_method4">
                    <div class="num">{{ ruleForm.pay_method4 }}</div>
                </el-form-item>
                <el-form-item label="悦农e付3041：" prop="name" v-if="ruleForm.pay_method5">
                    <div class="num">{{ ruleForm.pay_method5 }}</div>
                </el-form-item>
                <el-form-item label="作废单：" prop="name" v-if="ruleForm.pay_method6">
                    <div class="num">{{ ruleForm.pay_method6 }}</div>
                </el-form-item>
            </div>
            <el-form-item class="pay_btn">
                <el-button class="danger" @click="handleClose">取消</el-button>
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
				dialogFormEdit: true,
				siteName: this.getSiteName(),
			};
		},
		methods: {
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			ajax: function(params) {
				this.user_id = params.user_id;
				this.siteName = params.site_name;
				this.dialogFormVisible = true;

			},
			handleClose() {
				this.dialogFormEdit = false;
			}
		},
	}
</script>
<style type="text/css">
.pay-list .pay-con{width: 200px;margin: 0 auto;}
.pay-list .el-form-item{width: 100%;}
.pay-list .el-button{margin: 0 15px;}
</style>