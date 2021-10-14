<template>
	<section>
		<el-col :span="24" class="toolbar t-search float-r">
			<el-form :inline="true" :model="searchFields">
			   
				   <el-col :span="6">
						  <el-input v-model="searchFields.article" placeholder="请输入标题"></el-input>   
					</el-col>
				
				<el-form-item>
					<el-button type="primary" @click="toSearch">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			  <el-table-column label="标题" min-width="100">
				<template scope="scope">{{scope.row.getArticle ?  scope.row.getArticle.title :'' }}</template>
			</el-table-column>
			<el-table-column prop="content" label="论评内容" min-width="150"> </el-table-column>
			 <el-table-column label="评论人" width="100">
				<template scope="scope">{{ scope.row.getUser ? scope.row.getUser.nickname :'该评论人已删除' }}</template>
			</el-table-column>
			<el-table-column label="日期" width="170">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
		  
			<el-table-column label="操作" width="80">
				<template scope="scope">
					<el-button size="mini" @click="handleDel(scope.$index, scope.row)" >删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="toolbar foot-tool">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 " v-if="data.auth.canDel">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
			</el-pagination>
		</div>
	  
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/website/article/comment',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'website_articles',
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
			this.getConfirm("此操作将永久删除该文件, 是否继续?", () => {
			   this.postAjax("/admin/website/article/comment-del", { id: item.id}, msg => {
					this.data.lists.splice(index, 1);
					this.getSuccess("删除成功");
				});
			});
		},
		delAll() { /*批量删除*/
			return false;
			this.deleteAll(this);
		},
		searchCallBack(res) {
			this.searchFields.article_id = res.id;
		}
	},
	components: {
	  
	}

}

</script>
