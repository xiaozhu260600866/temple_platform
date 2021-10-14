<template>
	<section>
		<el-col :span="24" class="toolbar t-search float-r">
			<el-form :inline="true" id="search" :model="searchFields">
				<el-col :span="20">
					<el-col :span="6">
						  <el-input v-model="searchFields.user_name" placeholder="请输入员工"></el-input>   
					</el-col>
					<el-col :span="6">
						  <el-input v-model="searchFields.to_user_name" placeholder="请输入访客名称"></el-input>   
					</el-col>
					<el-form-item>
						<el-button type="primary" @click="toSearch">查询</el-button>
					
					</el-form-item>
				</el-col>
				<el-form-item>
					<el-button type="success" @click="exportExcel">导出数据</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column label="序号" width="60">
				<template scope="scope">{{ scope.$index+1 }}</template>
			</el-table-column>
			<el-table-column label="员工" width="100">
				<template scope="scope">{{ scope.row.getUser ? scope.row.getUser.userInfo.name :'已删除' }}</template>
			</el-table-column>
			<el-table-column label="访客" width="130">
				<template scope="scope">{{ scope.row.toUser.userInfo ? scope.row.toUser.userInfo.name :'已删除' }}</template>
			</el-table-column>
			<el-table-column label="内容" min-width="170">
					<template scope="scope">{{ scope.row.content }}</template>
			</el-table-column>
			
			<el-table-column label="日期" width="170">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="80">
				<template scope="scope">
					<el-button size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="toolbar foot-tool">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
			</el-pagination>
		</div>
	
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/card/message-record',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'business_card_records',
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
		 delAll() { /*批量删除*/
            this.deleteAll(this);
        },
		exportExcel() {
			window.location.href = this.siteName + "admin/card/export?api_token=" + this.getUser().api_token+"&site_name="+this.getUser().site_name;
		},
		 handleDel(index, item) {
            this.del_vuex(item, index, this)
        },
		searchCallBack(res) {
			this.searchFields.user_id = res.id;
		}
	},
	components: {
		
	}

}

</script>
