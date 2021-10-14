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
            <el-form-item label="商品标价" prop="new_price" :rules="[{ required: true, message: '商品标价不能为空'}, ]" v-if="getSiteName != 'https://lj.doxinsoft.com' ">
                <el-input v-model="ruleForm.new_price" style="width:80px"></el-input>
            </el-form-item>
            <el-form-item label="赠送积分" prop="integral" :rules="[{ required: true, message: '赠送积分不能为空'}, ]">
                <el-input v-model="ruleForm.integral" style="width:80px"></el-input>
            </el-form-item>
            <el-form-item label="是否热销" prop="is_hot" :rules="[{ required: true, message: '是否热销不能为空'}, ]">
                <el-switch v-model="ruleForm.is_hot" on-text="" off-text="" :active-value="1" :inactive-value="0"> </el-switch>
            </el-form-item>
            <el-form-item label="是否最新" prop="is_new" :rules="[{ required: true, message: '是否热销不能为空'}, ]">
                <el-switch v-model="ruleForm.is_new" on-text="" off-text="" :active-value="1" :inactive-value="0"> </el-switch>
            </el-form-item>
            <el-form-item label="是否上架" prop="putaway" :rules="[{ required: true, message: '是否上架不能为空'}, ]">
                <el-switch v-model="ruleForm.putaway" on-text="" off-text="" :active-value="1" :inactive-value="0"> </el-switch>
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
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.published_at" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="商品排序" prop="sort" :rules="[{ required: true, message: '商品售价不能为空'}, ]">
                <el-input v-model="ruleForm.sort" style="width:80px"></el-input><span class="red">数值越大，排名越高</span>
            </el-form-item>
            <el-form-item label="备注" prop="intro">
                <el-input v-model="ruleForm.intro" style="width:280px" type="textarea"></el-input>
            </el-form-item>
            <my-cropUpload v-model="ruleForm.thumb_pic" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'product',allowUploadNum:1,widthRatio:'不限制',heightRatio:'不限制'}}" message="不限制" label="缩略图" ></my-cropUpload>
            
                    <my-cropUpload v-model="ruleForm.cover" :data="{action:'/ajax/uploadpic',data:{thumbsize: 300,upurl:'product',allowUploadNum:5,widthRatio:'不限制',heightRatio:'不限制'}}" message="不限制" label="滚动图片" ></my-cropUpload>
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
            this.formAction = '/admin/website/product/edit?id=' + this.getOptions("id");

        } else {
            this.formAction = '/admin/website/product/create';
        }
        this.ajax();
    },
    data() {
        return {
            ruleForm: {
                fclass: [],
                published_at: '',
                is_share_distribution: 1,
                member_update_distribution: 0,
                can_distribution: 1,
                is_update_member: 0,
                is_distribution_ratio: 0,
                can_coupon: true,
                is_hot: 0,
                is_new: 0,
                is_favourable: 0,
                putaway: 1,
                give_coupon: 0,
                sort: 0,
                cover: [],
                thumb_pic: [],
                can_buy: 1,
                integral: 0
            },
            formAction: '',
            getSiteName: this.getSiteName(),
            data: this.formatData(this),
            activeName2: 'first',
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.ruleForm.content = this.$refs.editor.getContent();
                    this.postAjax(this.formAction, this.ruleForm, msg => {
                        if (msg.data.status == 2) {
                            this.$router.push({ path: '/vueadmin/website/product-lists' });
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
                }
            });
        },
    },
    components: {
        myeditor,
        
    }
}

</script>
