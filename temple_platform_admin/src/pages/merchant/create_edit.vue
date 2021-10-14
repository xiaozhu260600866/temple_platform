<template>
    <el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" :top="top" width="500px" :before-close="handleClose">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm create-box">
            <el-form-item label="联系人" prop="name" :rules="[{ required: true, message: '客户姓名不能为空'},]">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex" :rules="[{ required: true, message: '性别不能为空'}]">
                <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                    <el-option label="男" value="0"></el-option>
                    <el-option label="女" value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="电话" prop="phone" :rules="[{ required: true, message: '电话不能为空'}]">
                <el-input v-model="ruleForm.phone" style="margin-right: 5px"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model="ruleForm.remark" style="margin-right: 5px" type="textarea"></el-input>
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
    props: ['top'],
    data() {
        return {
            ruleForm: {},
            formAction: '',
            dialogFormVisible: false,
            role: [],
            cityArr:[],
            integral: 0,
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
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
        ajax: function(params, role,cityArr) {
            console.log(params);
            this.role = role;
            this.cityArr = cityArr;
            this.dialogFormVisible = true;
            if (params) {
                this.formAction = '/admin/shop/dis/edit?id=' + params.id;
                this.ruleForm = params;
            } else {
                this.ruleForm = { role_id: '', sort: 0 };
                this.formAction = '/admin/shop/dis/create';
            }
        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
    components: {

    }
}

</script>
