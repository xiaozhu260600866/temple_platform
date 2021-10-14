<template>
    <section>
        <el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" v-loading="data.listLoading">
             <el-table-column label="分销商" width="150" v-if="order_no">
                <template scope="scope">
                    <div>{{ scope.row.dis ?   scope.row.dis.name : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="分销商电话" width="150" v-if="order_no">
                <template scope="scope">
                    <div>{{ scope.row.dis ?   scope.row.dis.phone : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="购买人" width="150">
                <template scope="scope">
                    <div>{{ scope.row.getOrder ? scope.row.getOrder.addr_name : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="产品" width="150">
                <template scope="scope">
                    <div>{{ scope.row.getOrder ?   scope.row.getOrder.product_str : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="订单金额" width="150">
                <template scope="scope">
                    <div>{{ scope.row.getOrder.amount ? scope.row.getOrder.amount : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="佣金" width="150">
                <template scope="scope">
                    <div>{{ scope.row.amount ? scope.row.amount : '' }}</div>
                </template>
            </el-table-column>
              <el-table-column label="状态" width="150">
                <template scope="scope">
                    <div>{{ scope.row.getStatus ? scope.row.getStatus : '' }}</div>
                </template>
            </el-table-column>
            <el-table-column label="时间" width="200">
                <template scope="scope">{{ scope.row.created_at }}</template>
            </el-table-column>
        </el-table>
    </section>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            listDataDown: [],
            order_no:'',
            data: this.formatData(this),
            formAction: '/admin/shop/dis/commission'
        }
    },
    methods: {
        handleDel: function(index, item) {
            this.del_vuex(item, index, this);
        },
        ajax(id,order_no) {
            if(order_no){
                this.order_no = order_no;
                this.getAjax(this, { order_no: order_no}, msg => {});
            }else{
                 this.getAjax(this, { dis_id: id}, msg => {});
            }
           
        }
    },
}

</script>
