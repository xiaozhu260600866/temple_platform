<template>
    <el-form :model="ruleForm" ref="ruleForm" label-width="170px" class="demo-ruleForm">
        <el-form-item label="业务员拥金（比例%）" prop="first_distor" :rules="[{ required: true, message: '业务员拥金（比例%）不能为空'},]">
            <el-input v-model="ruleForm.first_distor" :class="['width80']"></el-input><span class="pl5">% </span>
            <span class="pl20 pr5">赠送</span><el-input v-model="ruleForm.first_integral" :class="['width80']"></el-input><span class="pl5">积分</span>
        </el-form-item>
        <el-form-item label="团长拥金（比例%）" prop="second_distor" :rules="[{ required: true, message: '团长拥金（比例%）不能为空'},]">
            <el-input v-model="ruleForm.second_distor" :class="['width80']"></el-input><span class="pl5">% </span>
            <span class="pl20 pr5">赠送</span><el-input v-model="ruleForm.second_integral" :class="['width80']"></el-input><span class="pl5">积分</span>
        </el-form-item>
        <el-form-item label="提现金额（元）" prop="withdraw_amount" :rules="[{ required: true, message: '提现金额不能为空'},]">
            <el-input v-model="ruleForm.withdraw_amount" :class="['width80']"></el-input><span class="pl5">元，最少提现金额1元以上</span>
        </el-form-item>
         <el-form-item label="订单完成后" prop="finish_day">
             <el-input v-model="ruleForm.finish_day" :class="['width80']"></el-input><span class="pl5">天，(每晚00：00发放佣金)</span>
         </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>
<style type="text/css" scoped>
.width80 {
    width: 80px;
}

.red {
    color: red;
    margin-right: 30px;
    padding-left: 5px
}

</style>
<script>
export default {
    mounted() {
        this.ajax();
    },
    data() {
        return {
            ruleForm: {
                first_distor: 0,
                first_integral: 0,
                second_distor: 0,
                second_integral: 0,
                third_integral: 0,
                third_distor: 0,
                can_dis: 0,
                withdraw_amount: 0

            },
            data: this.formatData(this),
            formAction: '/admin/shop/dis/config',
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.postAjax(this.formAction, this.ruleForm, msg => {
                        if (msg.data.status == 2) {

                        }
                    }, )
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
                for (var i in msg.detail) {
                    this.ruleForm[i] = msg.detail[i];
                }
            });
        },
    },
}

</script>
