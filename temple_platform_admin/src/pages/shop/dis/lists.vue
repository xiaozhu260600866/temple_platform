<template>
    <section>
        <el-col :span="24" class="toolbar t-search">
            <el-form :inline="true" id="search" :model="searchFields">
                <el-col :span="24">
                    <el-form-item>
                        <el-input placeholder="请输入姓名" name="name" v-model="searchFields.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="请输入电话" name="name" v-model="searchFields.phone"></el-input>
                    </el-form-item>
                   	 <el-form-item>
                        <my-search placeholder="推荐人" tablename="distributions" searchfield="name" v-model="searchFields.distribution_name" ref="searchClient" style="width:100%" :formAction="'/ajax/vue-search'" @callback="searchCallBack" :fieldArr="[
					   {prop:'name',label:'姓名'},
					   {prop:'created_at',label:'时间'} 
					 ]" />
					 </el-form-item>
                   
                    <el-form-item>
                        <el-select v-model="searchFields.status" placeholder="请选择状态">
                            <el-option label="审核中" value="0"></el-option>
                            <el-option label="审核通过" value="1"></el-option>
                            <el-option label="审核拒绝" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-date-picker type="daterange" placeholder="选择日期范围" v-model="searchFields.searchDate"> </el-date-picker>
                    <el-form-item>
                        <el-button type="primary" @click="toSearch">查询</el-button>
                    </el-form-item>
                </el-col>
                <el-form-item></el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24">
            <el-tabs v-model="status" type="card" @tab-click="clickStatus">
                <el-tab-pane label="审核中" :name="''+0"></el-tab-pane>
                <el-tab-pane label="审核通过" :name="''+1"></el-tab-pane>
                <el-tab-pane label="审核拒绝" :name="''+2"></el-tab-pane>
            </el-tabs>
        </el-col>
        <el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading" class="dis-list">
            <el-table-column type="selection" width="40"> </el-table-column>
            <el-table-column prop="name" label="姓名/手机号码" min-width="140">
                <template scope="scope">{{ scope.row.name }}
                    <br>{{ scope.row.phone }}</template>
            </el-table-column>
         <!--    <el-table-column label="推荐人" min-width="100">
             <template scope="scope">
                 <div v-html="scope.row.getReferrer"></div>
             </template>
         </el-table-column> -->
            <el-table-column prop="getStatus" label="状态" width="80"> </el-table-column><!-- 
            <el-table-column prop="amount" label="累计佣金" width="100"> </el-table-column>
            <el-table-column prop="downCount" label="下级分销商" width="100"> </el-table-column> -->
            <el-table-column label="日期" width="170">
                <template scope="scope">{{ scope.row.created_at }}</template>
            </el-table-column>
            <el-table-column label="操作" width="280">
                <template scope="scope">
                    <el-button size="mini" type="primary" @click="changeStatus(scope.$index, scope.row,'1')" v-if="scope.row.status!=1">审核通过</el-button>
                    <el-button size="mini" type="primary" @click="changeStatus(scope.$index, scope.row,'2')" v-if="scope.row.status!=2">审核拒绝</el-button>
                    <el-button size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="toolbar foot-tool">
            <el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
            </el-pagination>
        </div>
        <my-status ref="status" style="width:100%" formAction="/admin/shop/dis/change-status" />
    </section>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            formAction: '/admin/shop/dis/lists',
            data: this.formatData(this),
            siteName: this.getSiteName(),
            tableName: 'distributions',
            status: 0,
            sels: [], //列表选中列,
            searchFields: {
                searchDate: '',
                name: '',
                status: ''
            }
        }
    },
    mounted() {
        this.status = this.getOptions('status');
        this.ajax();
    },
    watch: {
        // 如果路由有变化，会再次执行该方法
        "$route": "ajax"
    },
    methods: {
        ajax() {
            this.getAjax(this, { status: this.status }, msg => {});
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
            this.searchFields.fid = res.id;
        },
        changeStatus(index, item, status) {
            this.$refs.status.ajax({ id: item.id, status: status });
        },
        clickStatus(tab, event) {
            this.status = tab.name;
            this.ajax();
        }
    },
    components: {
        'my-status': resolve => require(['xiaozhu/vue/components/admin/status.vue'], resolve),
    }

}

</script>
