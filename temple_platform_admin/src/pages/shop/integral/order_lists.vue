<template>
    <section>
        <el-col :span="24" class="toolbar t-search float-r">
            <el-form :inline="true" :model="data.query">
                <el-col :span="4">
                    <el-input placeholder="姓名" v-model="data.query.addr_name"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-input placeholder="电话" v-model="data.query.addr_phone"></el-input>
                </el-col>
                <el-form-item>
                    <el-button type="primary" @click="ajax">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
         <el-col :span="24" v-if="data.show">
			<el-tabs v-model="data.query.status" type="card" @tab-click="ajax">
				<el-tab-pane :label="'已付款('+data.status3Num+')'" :name="''+3"></el-tab-pane>
			<!-- 	<el-tab-pane :label="'发货中('+data.status5Num+')'" :name="''+5"></el-tab-pane> -->
				<el-tab-pane :label="'已完成('+data.status9Num+')'" :name="''+9"></el-tab-pane>
			</el-tabs>
		</el-col>
        <el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column prop="order_no" label="编号" width="110"> </el-table-column>
            <el-table-column prop="bless_name" label="功德主姓名" width="80"> </el-table-column>
            <el-table-column prop="phone" label="功德主手机" width="80"> </el-table-column>
            <el-table-column prop="bless_address" label="功德主地址" width="200"> </el-table-column>
            <el-table-column prop="remark" label="备注" width="200"> </el-table-column>
            <el-table-column label="呢称" width="100">
                <template scope="scope">{{ scope.row.user?scope.row.user.nickname :'该用户已被删除' }}</template>
            </el-table-column>
            <el-table-column label="商品" min-width="120">
                <template scope="scope"> <span>{{ scope.row.products ? scope.row.products.name :'该产品已被删除'}}</span></template>
            </el-table-column>
            <el-table-column label="日期" width="165">
                <template scope="scope">{{ scope.row.created_at }}</template>
            </el-table-column>
            <el-table-column label="操作" width="170">
                <template scope="scope">
                       <el-button type="primary" size="mini" @click="changeStatus(scope.row,9)" v-if="scope.row.status!=9">完成</el-button>
                   <!-- <el-button type="primary" size="mini" @click="$router.push({path:'/vueadmin/integral/order-info?id='+scope.row.id})">详情</el-button> -->
                    <el-button size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="toolbar foot-tool">
            <el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[6]" :page-size="6" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
            </el-pagination>
        </div>
    </section>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            formAction: '/admin/shop/integral/order-lists',
            data: this.formatData(this),
            siteName: this.getSiteName(),
            tableName: 'integral_orders',
            status: this.getOptions("status"),
            sels: [], //列表选中列,
            searchFields: {
                addr_name: '',
            }
        }
    },
    mounted() {
        this.ajax();
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": "ajax"
    },
    methods: {
        changeStatus(item,status) {
            let title = status == 0 ? '关闭订单' : '确认收货';
            this.getConfirm(title, () => {
                this.postAjax("/admin/shop/integral/change-order-status", { id: item.id, status: status }, msg => {
                    if (msg.data.status == 2) {
                        this.ajax();
                    }
                });
            });
        },
        ajax() {
            this.getAjax(this, { status: this.data.query.status }, msg => {});
        },
        selsChange: function(sels) {
            this.sels = sels;
        },
        toSearch() {
            this.searchField(this);
        },
        handleSizeChange(val) {
            this.data.nextPage = val;
            this.ajax();
        },
        handleCurrentChange(val) {
            this.data.nextPage = val;
            this.ajax();
        },
        handleDel(index, item) {
            this.del_vuex(item, index, this)
        },
        delAll() { /*批量删除*/
            this.deleteAll(this);
        },
        searchCallBack(res) {
            this.searchFields.user_id = res.id;
        },
        clickStatus(tab, event) {
            this.status = tab.name;
            this.ajax();
        }
    },
    components: {

    }

}

</script>
