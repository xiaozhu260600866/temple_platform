<template>
    <div v-if="data.show">
          <el-tabs v-model="data.query.type" @tab-click="ajax">
            <el-tab-pane label="祈福订单" :name="0">
                <dx-table :data="data" :globalData="type0"  operateWidth="150">
                    <div slot="header2" class="p10 fs-20">
                        随喜金额{{data.orderAmount}}份；
                    </div>
                    <div slot="operate" slot-scope="scope">
                        <el-button size="small" type="primary" @click="printf(scope.row)">打印</el-button>
                    </div>
                 </dx-table>
            </el-tab-pane>
            <el-tab-pane label="阶段性祈福牌位" :name="100">
                <dx-table :data="data" :globalData="type100"  operateWidth="150">
                    <div slot="header2" class="p10 fs-20">
                        随喜金额{{data.orderAmount}}份；
                    </div>
                    <div slot="operate" slot-scope="scope">
                        <el-button size="small" type="primary" @click="printf(scope.row)">打印</el-button>
                    </div>
                 </dx-table>
            </el-tab-pane>
            <el-tab-pane :label="v.label + '订单'" :name="v.value" v-for="v in data.typeArr">
                <dx-table :data="data" :globalData="$data['type' + v.value]"  operateWidth="150">
                    <div slot="header2" class="p10 fs-20">
                        随喜金额{{data.orderAmount}}份；
                    </div>
                    <div slot="operate" slot-scope="scope">
                        <el-button type="primary" size="small" @click="printf(scope.row)">打印</el-button>
                    </div>
                 </dx-table>

            </el-tab-pane>
          </el-tabs>
    </div>
</template>
<script type="text/javascript">
    import type0 from "./layouts/order/type0.js";
    import type1 from "./layouts/order/type1.js";
    import type2 from "./layouts/order/type2.js";
    import type3 from "./layouts/order/type3.js";
    import type4 from "./layouts/order/type4.js";
    import type5 from "./layouts/order/type5.js";
    import type6 from "./layouts/order/type6.js";
    import type7 from "./layouts/order/type7.js";
    import type8 from "./layouts/order/type8.js";
    import type9 from "./layouts/order/type9.js";
    import type10 from "./layouts/order/type10.js";
    import type11 from "./layouts/order/type11.js";
    import type12 from "./layouts/order/type12.js";
    import type100 from "./layouts/order/type100.js";

    export default {
        data() {
            return {
                formAction: "/admin/tablet/order-lists",
                data: this.formatData(this),
                siteName: this.getSiteName(),
                type0: type0,
                type1: type1,
                type2: type2,
                type3:type3,
                type4:type4,
                type5:type5,
                type6:type6,
                type7:type7,
                type8:type8,
                type9:type9,
                type10:type10,
                type11:type11,
                type12:type12,
                type100:type100,
                ruleForm:{},
                type:0
            }
        },
        mounted() {
            this.ajax();
        },
        watch: {
            //"$route": "ajax"
        },
        methods: {
            printf(row){
               window.open(this.siteName + '/printf.html?id='+row.id);
            },
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
