<template>
    <el-dialog title="新建\编辑" :visible.sync="dialogFormVisible" :top="top" :before-close="handleClose">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm create-box" style="width:60%;">
            <el-form-item label="城市名称" prop="name" :rules="[{ required: true, message: '城市名称不能为空'},]">
                <el-select v-model="ruleForm.city" placeholder="请选择城市">
                        <el-option label="江门市" value="江门市"></el-option>
                        <el-option label="恩平市" value="恩平市"></el-option>
                        <el-option label="开平市" value="开平市"></el-option>
                        <el-option label="新会市 " value="新会市 "></el-option>
                        <el-option label="台山市" value="台山市"></el-option>
                        <el-option label="广西百色市" value="广西百色市"></el-option>
                        <el-option label="广西柳州市" value="广西柳州市"></el-option>
                        <el-option label="广西南宁市" value="广西南宁市"></el-option>
                    </el-select>
            </el-form-item>
            <el-form-item label="社区名称" prop="name" :rules="[{ required: true, message: '社区名称不能为空'},]">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
             <el-form-item label="公司地址" prop="address" :rules="[{ required: true, message: '社区名称不能为空'},]">
                <el-input v-model="ruleForm.address" class="CinputWidth"></el-input>
                <el-button @click.prevent="chooseLocation()">重新定位</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
         <chooseLocation ref="chooseLocation" @callBack="locationCallBack"></chooseLocation>
    </el-dialog>
</template>
<script>
import chooseLocation from "xiaozhu/vue/components/admin/chooseLocation";;
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
         chooseLocation() {
            this.$refs.chooseLocation.ajax();
        },
        locationCallBack(res) {
            if (res.latlng) {
                this.$refs.chooseLocation.handleClose();
                this.$set(this.ruleForm,"address",res.poiaddress);
                this.ruleForm.location_y = res.latlng.lng;
                this.ruleForm.location_x = res.latlng.lat;

            }
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
                this.formAction = '/admin/community/edit?id=' + params.id;
                this.ruleForm = params;
            } else {
                this.ruleForm = { cover: [], sort: 0,product_str:"",upgrade_type:0 };
                this.formAction = '/admin/community/create';
            }

        },
        handleClose() {
            this.dialogFormVisible = false;
        }
    },
    components: {
        chooseLocation,
       
    }
}

</script>
