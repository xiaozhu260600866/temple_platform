<template>
    <!-- 上传规格 -->
    <el-dialog title="请选择工程师" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin:20px;width:60%;min-width:300px;">
            <div >
                <el-form-item label="工程师" prop="engineer_userid" :rules="[{ required: true, message: '快递不能为空'},]">
                    <el-select v-model="ruleForm.engineer_userid" placeholder="请选择工程师">
                        <el-option :label="v.user.userInfo.name" :value="v.user_id" v-for="v in engineer"></el-option>
                    </el-select>
                </el-form-item>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer pull-right">
          <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            formAction: "/admin/decorate/order/engineer",
            ruleForm:{},
            engineer:[],
            dialogVisible: false,
        }
    },
    props: [], //父类的数据
    methods: {
        handleClose: function(done) {
            this.dialogVisible = false;
        },
        ajax(engineer,ruleForm) {
            this.$nextTick(()=>{
                this.engineer = engineer;
                this.ruleForm = ruleForm;
                console.log(this.ruleForm);
                this.dialogVisible = true;
            });
           
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.postAjax(this.formAction, this.ruleForm, msg => {
                        if (msg.data.status == 2) {
                            this.getSuccess("操作成功");
                            this.$parent.ajax();
                            this.dialogVisible = false;
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        /*商品规格结束*/
    },


}

</script>
