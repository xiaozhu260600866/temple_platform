<template>
    <el-dialog title="查看二维码1" :visible.sync="dialogFormVisible" :top="top" :before-close="handleClose">
        <div>
            <img :src="'https://boss.doxinsoft.com/userQrcode?user_id='+user_id+'&site_name='+siteName">

        </div>
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
            siteName: this.getSiteName(),
            user_id: 0,
        };
    },
    methods: {
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        ajax: function(params) {
            this.user_id = params.user_id;
            this.siteName = params.site_name;
            this.dialogFormVisible = true;
          
        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
}

</script>
