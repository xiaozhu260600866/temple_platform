<template>
	<section>
		<el-col :span="24" class="toolbar t-search float-r">
			<el-form :inline="true" id="search" :model="searchFields">
				<el-col :span="20">
					<el-form-item class="input-w300">
						<el-input placeholder="请输入新闻名称" name="title" v-model="searchFields.title"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="toSearch">查询</el-button>
						<el-button type="primary" @click="$refs.category.ajax()" >类别管理</el-button>
					</el-form-item>
				</el-col>
				<el-form-item class="mr0">
					<el-button type="primary" @click="$router.push({path: '/vueadmin/decorate/article-create'})" >发布动态</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" min-width="55"> </el-table-column>
			<el-table-column prop="title" label="新闻标题" min-width="100"> </el-table-column>
			<el-table-column prop="fclassname" label="分类名称" width="120"> </el-table-column>
			<el-table-column label="日期" width="170">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column prop="views" label="点击量" width="80"> </el-table-column>
			<el-table-column label="操作" width="170">
				<template scope="scope">
					<el-button type="primary" size="mini" @click="$router.push({path:'/vueadmin/decorate/article-edit?id='+scope.row.id})" >编辑</el-button>
					<el-button size="mini" @click="handleDel(scope.$index, scope.row)" >删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="toolbar foot-tool">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 " >批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
			</el-pagination>
		</div>
		<my-class top="2%" ref="category" :type="0" :formAction="'/admin/decorate/article/'" :sizearr="300"></my-class>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/decorate/article/lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'decorate_articles',
			sels: [], //列表选中列,
			searchFields: {
				title: '',
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
		handleDel(index, item) {
			this.del_vuex(item, index, this)
		},
		delAll() { /*批量删除*/
			this.deleteAll(this);
		},
		searchCallBack(res) {
			this.searchFields.user_id = res.id;
		}
	},
	components: {
		"my-class": resolve => require(['xiaozhu/vue/components/admin/class.vue'], resolve),
	}

}

</script>
