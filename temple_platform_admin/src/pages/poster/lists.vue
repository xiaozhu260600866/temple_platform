<template>
    <section>
        <el-col :span="24" class="toolbar t-search float-r">
            <el-form :inline="true" id="search" :model="searchFields">
                <el-col :span="20">
                    <el-form-item class="input-w300">
                        <el-input placeholder="请输入标题" name="name" v-model="searchFields.name"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="toSearch">查询</el-button>
                    </el-form-item>
                     <el-form-item>
                        <el-switch v-model="data.is_index" on-text="" off-text="" :active-value="1" :inactive-value="0" @change="changeIndex(data.is_index)"> </el-switch>
                        显示\隐藏
                    </el-form-item>
                </el-col>

                <el-form-item>
                    <el-button type="primary" @click="$refs.createEdit.ajax('',type)" >新增{{ type == 3 ? '导航' :'广告图' }}</el-button>
                </el-form-item>
            </el-form>
        </el-col>
         <el-col :span="24">
            <el-tabs v-model="type" type="card" @tab-click="clickStatus">
                <el-tab-pane label="首页幻灯片" :name="''+1"></el-tab-pane>
                <el-tab-pane label="首页导航" :name="''+3"></el-tab-pane>
            </el-tabs>
        </el-col>
        <el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
            <el-table-column type="selection" width="50"> </el-table-column>
            <el-table-column prop="name" label="名称" min-width="100"> </el-table-column>
            <el-table-column prop="url" label="url地址" min-width="200"> </el-table-column>
            <el-table-column prop="sort" label="排序" width="50"> </el-table-column>
			<el-table-column align="center" label="隐藏/显示" width="100">
				<template scope="scope">
					<el-switch v-model="scope.row.is_index " on-text="" off-text="" :active-value="1" :inactive-value="0" @change="editField(scope.row,'is_index')"> </el-switch>
				</template>
			</el-table-column>
            <el-table-column label="日期" width="160">
                <template scope="scope">{{ scope.row.created_at }}</template>
            </el-table-column>
            <el-table-column label="操作" width="170">
                <template scope="scope">
                    <el-button type="primary" size="mini" @click="$refs.createEdit.ajax(scope.row,type)">编辑</el-button>
                    <el-button size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="toolbar foot-tool">
            <el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
            </el-pagination>
        </div>
        <my-create-edit ref="createEdit"></my-create-edit>
    </section>
</template>
<script type="text/javascript">
export default {
    data() {
        return {
            formAction: '/admin/poster/lists',
            data: this.formatData(this),
            siteName: this.getSiteName(),
            tableName: 'posters',
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
		editField(row, field) {
			this.postAjax("/admin/poster/editField", {
				id: row.id,
				field: field,
				value: row[field]
			}, msg => {
				if (msg.data.status == 3) {
					row[field] = 0;
				}
			});
		},
        changeIndex(val){
            this.postAjax("/admin/poster/changeIndex",{type:this.type,val:val},msg=>{

            });
        },
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
        'my-create-edit': resolve => require(['./create_edit'], resolve),
    }

}

</script>
