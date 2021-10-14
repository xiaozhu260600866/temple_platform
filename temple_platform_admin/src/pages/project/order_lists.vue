<template>
    <div>
        <dx-table :data="data" :globalData="globalData" @submitBeforeCallBack="submitBeforeCallBack" operateWidth="100">
            <div slot="header2" class="p10 fs20">
                随喜金额{{data.orderAmount}}份；
            </div>
            <div slot="append_table_post_address" slot-scope="scope">
                <div>
                    {{scope.row.is_post ==1? '是/'+scope.row.post_address:'否'}}
                </div>
            </div>
            <div slot="append_form_is_post" slot-scope="scope">
                <div class="flex flex-middle">
                 	<el-switch v-model="scope.row.is_post " on-text="" off-text="" :active-value="1" :inactive-value="0"> </el-switch>
                    <el-input v-if="scope.row.is_post" v-model="scope.row.post_address" placeholder="请输入邮寄地址"></el-input>
                </div>
            </div>
            <div slot="append_table_up" slot-scope="scope">
              	 <el-switch v-model="scope.row.putaway " on-text="" off-text="" :active-value="1" :inactive-value="0" @change="editField(scope.row,'putaway')"> </el-switch>
            </div>
            <div slot="append_table_sort" slot-scope="scope">
              	 <el-input v-model="scope.row.sort"  @change="editField(scope.row,'sort')"></el-input>
            </div>
         </dx-table>

    </div>
</template>
<script type="text/javascript">
    import globalData from "./layouts/project_orders.js";

    export default {
        data() {
            return {
                formAction: "/admin/project/order-lists",
                data: this.formatData(this),
                siteName: this.getSiteName(),
                globalData: globalData,
                ruleForm:{}
            }
        },
        mounted() {
            this.ajax();
        },
        watch: {
            //"$route": "ajax"
        },
        methods: {
            editField(row,field){
            	this.postAjax("/admin/song/editField", { id:row.id,field:field,value:row[field] }, msg => {
            		if (msg.data.status == 3) {
            			row[field] =0;
            		}
                    if (msg.data.status == 2) {
                    	this.ajax();
                    }
            	});
            },
            submitBeforeCallBack(ruleform){
                delete ruleform.api_token;
            },

            ajax() {
                this.getAjax(this, {}, msg => {});
            },
        },
        components: {
            "dx-table": resolve => require(["xiaozhu/vue/components/admin/dx_table.vue"], resolve),

        }
    }
</script>
