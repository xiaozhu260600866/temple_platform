<template>
    <el-dialog title="预约记录" :visible.sync="dialogFormVisible" :top="top" :before-close="handleClose">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm create-box" style="width: 60%;">
            <div v-for="v in data">
                <el-form-item :label="v.name" v-if="v.type !='上传图片'">
                    <el-input v-model="v.value" :disabled="true"></el-input>
                </el-form-item>
                <div class="el-form-item" v-if="v.type == '上传图片'">
                    <label class="el-form-item__label" style="width:100px">上传图片</label>
                    <my-upload upurl="appointment" :uploadLength="1" :fileList="v.value" :sizearr="300"></my-upload>
                </div>
            </div>
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
            data:{},
            dialogFormVisible: false,
            integral: 0,
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.type = this.getOptions('type');
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
        ajax: function(data) {
            this.data = data;
            this.dialogFormVisible = true;
            this.data.forEach(v=>{
                if(v.type == '上传图片' && v.value){
                    v.value = this.splitCover(v.value, "appointment")
                }
            });
            console.log(this.data);
        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
}

</script>
