<template>
    <section>
        <el-col :span="24" class="toolbar t-search">
            <el-form :inline="true" :model="searchFields">
                <el-form-item>
                    <el-input placeholder="请输入优惠券名称" name="name" v-model="searchFields.name"></el-input>
                </el-form-item>
                 <el-form-item>
                    <el-input placeholder="呢称" v-model="searchFields.nickname"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="姓名" v-model="searchFields.user_name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="电话" v-model="searchFields.user_phone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="toSearch">查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24" v-if="data.show">
            <el-tabs v-model="data.query.status" type="card" @tab-click="ajax">
                <el-tab-pane :label="'使用中('+data.status0Num+')'" :name="''+0"></el-tab-pane>
                <el-tab-pane :label="'已使用('+data.status1Num+')'" :name="''+1"></el-tab-pane>
            </el-tabs>
        </el-col>
        <el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column prop="nickName" label="微信昵称" min-width="80"> </el-table-column>
            <el-table-column prop="name" label="优惠券名称" min-width="120"> </el-table-column>
            <el-table-column prop="amount" label="优惠券金额" width="100"> </el-table-column>
            <el-table-column label="有效期" width="175">
                <template scope="scope">{{ scope.row.expiredDate }}</template>
            </el-table-column>
           
            <el-table-column prop="getType" label="类型" min-width="80"> </el-table-column>
            <el-table-column label="操作" width="170">
                <template scope="scope">
                    <el-button type="primary" size="mini" @click="changeStatus(scope.row)" v-if="scope.row.status == 0">兑换</el-button>
                    <el-button size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="toolbar foot-tool">
            <el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">删除所选</el-button>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
            </el-pagination>
        </div>
        <!-- 规格组件开始 -->
        <!-- 规格组件结束 -->
    </section>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            formAction: '/admin/user/coupon-record',
            data: this.formatData(this),
            siteName: this.getSiteName(),
            tableName: 'coupon_users',
            status: 0,
            sels: [], //列表选中列,
            searchFields: {
                user_id: '',
                nickname: '',
            }
        }
    },
    mounted() {
        this.ajax();
    },
    methods: {
        ajax() {
            this.getAjax(this, {}, msg => {});
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
        changeStatus(row) {
            this.getConfirm("是否兑换优惠券", msg => {
                this.postAjax("/admin/user/changestatus-couponuser", { id: row.id }, msg => {
                    this.ajax();
                });
            });
        },
        handleDel(index, item) {
            this.del_vuex(item, index, this)
        },
        clickStatus: function(tab, event) {
            this.status = tab.name;
            this.ajax();
        },
        delAll() { /*批量删除*/
            this.deleteAll(this);
        },
        searchCallBack(res) {
            this.searchFields.user_id = res.id;
        }
    },
    components: {

    }

}

</script>
