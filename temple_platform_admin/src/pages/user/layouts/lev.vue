<template>
    <el-dialog title="新建\编辑升级会员" :visible.sync="dialogFormVisible" :top="top" :before-close="handleClose">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="name">
                <el-col :span="10">
                    <el-input v-model="ruleForm.nickname" :disabled="true"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="优惠券" prop="member_id" :rules="[{ required: true, message: '优惠券不能为空'},]">
                <el-col :span="8">
                    <el-select v-model="ruleForm.member_id" placeholder="请选择优惠券">
                            <el-option :label="v.name" :value="v.id" v-for="v in lev"></el-option>
                    </el-select>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
export default {
    props: ['top'],
    data() {
        return {
            ruleForm: {end_at:'',coupon_id:''},
            formAction: '',
            dialogFormVisible: false,
            end_at:'',
            lev:[]
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.postAjax(this.formAction, this.ruleForm, msg=> {
                        if (msg.data.status == 2) {
                            this.dialogFormVisible = false;
                            this.$parent.ajax();
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
    
        ajax: function(params,lev) {
        	this.dialogFormVisible = true;
            this.lev  =lev;
            if (params) {
                this.formAction = '/admin/user/lev';
                this.ruleForm.nickname = params.nickname;
                this.ruleForm.user_id = params.id;
                this.$set(this.ruleForm,"member_id",params.member_id);
                //this.ruleForm.member_id = params.member_id;
               
            }
        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
}
</script>