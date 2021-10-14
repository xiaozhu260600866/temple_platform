<template>
    <section v-if="data.show">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm create-box">
            <!-- 基础设置开始 -->
            <el-form-item label="商品名称" prop="name" :rules="[{ required: true, message: '商品名称不能为空'},]">
                <el-input v-model="ruleForm.name" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="请选择分类" prop="fclass" :rules="[{ required: true, message: '分类不能为空'},]">
                <el-cascader placeholder="请输入分类" expand-trigger="hover" :options="data.fclass" v-model="ruleForm.fclass"></el-cascader>
            </el-form-item>
            <el-form-item label="积分" prop="integral" :rules="[{ required: true, message: '积分不能为空'}, ]">
                <el-input v-model="ruleForm.integral" style="width:80px"></el-input>
            </el-form-item>
            <el-form-item label="请选择优惠券" prop="coupon_id" v-if="ruleForm.give_coupon">
                <el-select v-model="ruleForm.coupon_id" placeholder="请选择优惠券">
                    <el-option label="请选择优惠券" :value="0"> </el-option>
                    <el-option v-for="v in data.coupon" :label="v.name" :value="v.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品售价" prop="price" :rules="[{ required: true, message: '商品售价不能为空'}, ]">
                <el-input v-model="ruleForm.price" style="width:80px"></el-input>
            </el-form-item>
            <el-form-item label="产品库存" prop="num" :rules="[{ required: true, message: '产品库存不能为空'},{ type: 'number', message: '必须为数字值'}]">
                <el-input v-model.number="ruleForm.num" style="width:80px"></el-input>
            </el-form-item>
            <el-form-item label="发表时间" required>
                <el-col :span="11">
                    <el-form-item prop="date1">
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.published_at" style="width:200px"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <my-cropUpload v-model="ruleForm.thumb_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'product',allowUploadNum:1,widthRatio:'不限制',heightRatio:'不限制'}}" message="不限制" label="缩略图"></my-cropUpload>
            <my-cropUpload v-model="ruleForm.cover" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'product',allowUploadNum:5,widthRatio:'不限制',heightRatio:'不限制'}}" message="不限制" label="滚动图片"></my-cropUpload>
            <div class="el-form-item" style="padding-left: 100px">
                <div class="el-form-item__content" style="">
                    <myeditor :content="ruleForm.content ? ruleForm.content : ''" ref="editor"></myeditor>
                </div>
            </div>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </section>
</template>
<script>
import myeditor from "@/components/editor.vue";

export default {
    mounted: function() {
        if (this.getOptions("id")) {
            this.formAction = '/admin/shop/integral/edit?id=' + this.getOptions("id");

        } else {
            this.formAction = '/admin/shop/integral/create';
        }
        this.ajax();
    },
    data() {
        return {
            ruleForm: {
                fclass: [],
                published_at: '',
                integral: 0,
                cover: [],
                thumb_pic: []
            },
            formAction: '',
            getSiteName: this.getSiteName(),
            data: this.formatData(this),
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.content = this.$refs.editor.getContent();
                    this.ruleForm.disConfig = this.data.disConfig;
                    this.postAjax(this.formAction, this.ruleForm, msg => {
                        if (msg.data.status == 2) {
                            this.$router.push({ path: '/vueadmin/integral/lists' });
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
            this.getAjax(this, {}, msg => {
                if ("detail" in msg) {
                    this.ruleForm = msg.detail;
                    this.ruleForm.cover = this.ruleForm.cover ? this.splitCover(this.ruleForm.cover, "product") : [];
                    this.ruleForm.thumb_pic = this.ruleForm.thumb_pic ? this.splitCover(this.ruleForm.thumb_pic, "product") : [];
                    this.ruleForm.fclass = this.ruleForm.fclassArr;
                    this.$nextTick(()=>{
                    	this.$refs.editor.setContent(this.ruleForm.content,1);
                    });
                }else{
                    this.$nextTick(()=>{
                    	this.$refs.editor.setContent('',1);
                    });
                }
            });
        },
    },
    components: {
        myeditor,

    }
}

</script>
