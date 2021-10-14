<template>
    <el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" :top="top" :before-close="handleClose">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm create-box" style="width:60%;">
            <el-form-item label="等级" prop="lev" :rules="[{ required: true, message: '等级名称不能为空'},]">
                <el-select v-model="ruleForm.lev" placeholder="请选择等级">
                    <el-option :label="v" :value="v" v-for="v in levArr()"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="等级名称" prop="name" :rules="[{ required: true, message: '等级名称不能为空'},]">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="折扣" prop="ratio" :rules="[{ required: true, message: '折扣不能为空'}]">
                <el-input v-model.num="ruleForm.ratio" style="width:80px;margin-right: 5px"></el-input>
                <el-tag>折</el-tag><span>规则为:如9.6折</span>
            </el-form-item>
            <el-form-item label="升级条件" prop="upgrade_type" :rules="[{ required: true, message: '升级条件'}]">
                <el-radio v-model="ruleForm.upgrade_type" :label="0">订单金额/数量</el-radio>
                <el-radio v-model="ruleForm.upgrade_type" :label="1">购买指定商品</el-radio>
            
                <br>
                <div v-if="ruleForm.upgrade_type == 0">
                   完成订单金额满：<el-input v-model="ruleForm.amount" style="width:100px;margin-right: 5px"></el-input>
                    <el-tag>元</el-tag>
                </div>
                <div v-if="ruleForm.upgrade_type == 1">
                    <el-input v-model="ruleForm.product_name" style="width:180px;margin-right: 5px" :disabled="true"></el-input>
                    <el-button @click="$refs.searchProduct.ajax(ruleForm.product_str)">选择商品</el-button>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
         <my-searchProduct  ref="searchProduct" @callBack="searchCallBack"/>
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
        searchCallBack(res){
            let product_str = [];
            let product_name = [];
            res.forEach(v=>{
                product_str.push(v.id);
                product_name.push(v.name);
            });
            this.ruleForm.product_str = product_str.join(",");
            this.ruleForm.product_name = product_name.join(",");
            console.log(this.ruleForm);

        },
        levArr() {
            let arr = [];
            for (var i = 0; i <= 100; i++) {
                arr[i] = i;
            }

            return arr;

        },
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
        ajax: function(params) {
            this.dialogFormVisible = true;
            if (params) {
                this.formAction = '/admin/userLev/edit?id=' + params.id;
                this.ruleForm = params;
            } else {
                this.ruleForm = { cover: [], sort: 0,product_str:"",upgrade_type:0 };
                this.formAction = '/admin/userLev/create';
            }

        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
    components: {
     
        'my-searchProduct':resolve => require(['xiaozhu/vue/components/admin/searchShopProduct.vue'], resolve),
    }
}

</script>
