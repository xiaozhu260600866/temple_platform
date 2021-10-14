<template>
    <section>
   <!--  <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin:20px;width:60%;min-width:600px;">
        <el-form-item label="显示\隐藏" prop="can_company" :rules="[{ required: true, message: '是否热销不能为空'}, ]">
               <el-switch v-model="ruleForm.can_company" on-text="" off-text="" active-value="1" inactive-value="0"> </el-switch>
       </el-form-item>
       <div class="el-form-item">
           <label class="el-form-item__label" style="width:100px">上传图片</label>
           <my-upload upurl="product" :uploadLength="1" :fileList="ruleForm.company_logo" :sizearr="300"></my-upload>
       </div>
       <div class="el-form-item" style="padding-left: 100px">
           <label class="el-form-item__label" style="width:100px;margin-left: -100px;">公司简介</label>
           <div class="el-form-item__content" style="">
               <myeditor :content="ruleForm.content ? ruleForm.content : ''" ref="editor"></myeditor>
           </div>
       </div>
       <el-form-item>
           <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
           <el-button @click="resetForm('ruleForm')">重置</el-button>
       </el-form-item>
   </el-form> -->
    </section>
</template>
<style type="text/css" scoped=""></style>
<script>
import myeditor from "@/components/editor.vue";
export default {
    mounted: function() {
       
        this.ajax();
    },
     watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": "ajax"
    },
    data() {
        return {
            ruleForm: { order_deadline: 0, order_autook: 0, is_make_menu: false, is_siginin: false },
            formAction: '/admin/system/config',
            activeName2: 'first',
            dialogVisible: false,
            type:1,
            getSiteName: this.getSiteName(),
            data: this.formatData(this)
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if(this.type == 1)this.ruleForm.content = this.$refs.editor.getContent();
                    if(this.type == 2)this.ruleForm.wenhua_content = this.$refs.editor.getContent();
                    this.postAjax(this.formAction, this.ruleForm, function(msg) {})
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        toBing() {
            this.dialogVisible = true;
            this.$refs.qrcode.getQrcode();
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        ajax: function() {
             this.type = this.getOptions('type');
            this.getAjax(this, {}, msg => {
                if ("detail" in msg) {
                    this.ruleForm = msg.detail;
                    this.ruleForm.company_logo = this.ruleForm.company_logo ? this.splitCover(this.ruleForm.company_logo, "product") : [];
                  
                    this.ruleForm.can_company = this.ruleForm.can_company ?  this.ruleForm.can_company :'1';

                     this.ruleForm.wenhua_logo = this.ruleForm.wenhua_logo ? this.splitCover(this.ruleForm.wenhua_logo, "product") : [];
                  
                    this.ruleForm.can_wenhua = this.ruleForm.can_wenhua ?  this.ruleForm.can_wenhua :'1';

                }
            });

        },
    },
    components: {
        myeditor
    }
}

</script>
