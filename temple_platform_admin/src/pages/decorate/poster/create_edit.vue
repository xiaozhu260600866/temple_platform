<template>
    <el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" :top="top" width="800px" :before-close="handleClose">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm create-box">
            <el-form-item label="名称" prop="name" :rules="[{ required: true, message: '名称不能为空'},]">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="URL地址" prop="url" :rules="[{ required: true, message: 'URL地址不能为空'},]">
                <el-input v-model="ruleForm.url"></el-input>
            </el-form-item>
            <el-form-item label="跳转类型">
                <el-select v-model="ruleForm.redirect_type" placeholder="请选择跳转类型" :rules="[{ required: true, message: 'URL地址不能为空'},{ type: 'number', message: '必须为数字值'}]">
                    <el-option label="本页面" :value="0"></el-option>
                    <el-option label="新建页面" :value="1"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="sort" :rules="[{ required: true, message: 'URL地址不能为空'},{ type: 'number', message: '必须为数字值'}]">
                <el-input v-model.number="ruleForm.sort"></el-input>
            </el-form-item>
            <my-cropUpload v-model="ruleForm.cover" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'poster',allowUploadNum:1,widthRatio:'不限制',heightRatio:'不限制'}}" message="不限制" label="上传图片" ></my-cropUpload>
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
        ajax: function(params,type) {
            this.dialogFormVisible = true;
            if (params) {
                this.formAction = '/admin/decorate/poster/edit?id=' + params.id;
                this.ruleForm = params;
                this.ruleForm.cover = this.ruleForm.pic ? this.splitCover(this.ruleForm.pic, "poster") : []
            } else {
                this.ruleForm = { cover: [], sort: 0,type:type,redirect_type:1 };
                this.formAction = '/admin/decorate/poster/create';
            }
        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
}

</script>
