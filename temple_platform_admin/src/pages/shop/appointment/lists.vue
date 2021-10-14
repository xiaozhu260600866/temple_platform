<template>
    <section>
        <el-col :span="24" class="toolbar t-search float-r">
            <el-form :inline="true" id="search" :model="searchFields">
                <el-col :span="20">
                    <el-form-item class="input-w300">
                        <el-input placeholder="请输入提交人" name="name" v-model="searchFields.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="toSearch">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-col>
        <el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column prop="name" label="提交人" min-width="200"> 
                   <template scope="scope"> {{ scope.row.getUser.nickname }} </template>
            </el-table-column>
             <el-table-column prop="name" label="提交时间" min-width="200"> 
                   <template scope="scope"> {{ scope.row.created_at }} </template>
            </el-table-column>
            <el-table-column label="操作" width="250">
                <template scope="scope">
                     <el-button type="primary" size="mini" @click="$refs.info.ajax(scope.row.info)">详细</el-button>
                    <el-button size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="toolbar foot-tool">
            <el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
            </el-pagination>
        </div>
       <my-info ref="info"></my-info>
    </section>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            formAction: '/admin/shop/appointment/lists',
            data: this.formatData(this),
            siteName: this.getSiteName(),
            tableName: 'appointment_orders',
            sels: [], //列表选中列,
            type:this.getOptions('type'),
            searchFields: {
                name: '',
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
        
        ajax() {
            this.getAjax(this, { type:this.type }, msg => {});
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
            this.type = tab.name;
            this.ajax();
        }
    },
    components: {
        'my-info': resolve => require(['./layouts/info'], resolve),
    }

}

</script>
