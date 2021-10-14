<template>
    <section>
        <el-form-item label="秒杀开关" prop="is_miaosha">
            <el-switch v-model="ruleForm.is_miaosha" on-text="" off-text=""  :active-value="1"  :inactive-value="0"> </el-switch>
        </el-form-item>
        <div v-show="ruleForm.is_miaosha">
             <el-form-item label="价格" :rules="[{ required: true, message: '价格不能为空'},]">
                <el-input v-model="ruleForm.miaosha_price" class="width80"></el-input>
                <span class="font_grey pl3">元 </span>
            </el-form-item>
            <el-form-item label="秒杀库存" :rules="[{ required: true, message: '价格不能为空'},]">
                <el-input v-model="ruleForm.miaosha_num" class="width80"></el-input>
                <span class="font_grey pl3">件 </span>
            </el-form-item>
             <el-form-item label="秒杀结束时间">
                <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.miaosha_start_date"></el-date-picker>
            </el-form-item>
             <el-form-item label="秒杀结束时间">
                <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.miaosha_end_date"></el-date-picker>
            </el-form-item>
        </div>
    </section>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            siteName:this.getSiteName()
        }
    },
    props: ['ruleForm'],
    methods: {

    }
}
</script>
<style type="text/css" scoped="">
.width150 {
    width: 150px
}

.width80 {
    width: 80px
}
</style>
