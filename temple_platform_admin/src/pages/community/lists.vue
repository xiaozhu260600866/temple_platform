<template>
	<section>
		<el-col :span="24" class="toolbar t-search">
			<el-form :inline="true" id="search" :model="data.query">
				<el-col :span="20">
					<el-form-item class="input-w300">
						<el-input placeholder="请输入会员等级" name="name" v-model="data.query.name"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="ajax()">查询</el-button>
					</el-form-item>
				</el-col>
				<el-form-item>
					<el-button type="primary" @click="$refs.createEdit.ajax()" >新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column prop="name" label="社区名称" min-width="100"> </el-table-column>
			<el-table-column prop="city" label="城市" min-width="100"> </el-table-column>
			<el-table-column prop="address" label="地址" min-width="50"> </el-table-column>
			<el-table-column label="日期" width="160">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="170">
				<template scope="scope">
					<el-button type="primary" size="mini" @click="$refs.createEdit.ajax(scope.row)" >编辑</el-button>
					<el-button size="mini" @click="handleDel(scope.$index, scope.row)" >删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="toolbar foot-tool">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 " >批量删除</el-button>
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
			formAction: '/admin/community/lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'community',
			sels: [], //列表选中列,
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
			this.getAjax(this, { type: this.getOptions('type') }, msg => {});
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
			this.del_vuex(item, index, this,'/admin/community/del')
		},
		delAll() { /*批量删除*/
			this.deleteAll(this,'/admin/community/delAll');
		},
		searchCallBack(res) {
			this.searchFields.user_id = res.id;
		}
	},
	components: {
		'my-create-edit': resolve => require(['./create_edit'], resolve),
	}

}

</script>
