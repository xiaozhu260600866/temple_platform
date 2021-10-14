<template>
	<section>
		<el-col :span="24" class="toolbar t-search float-r">
			<el-form :inline="true" id="search" :model="searchFields">
				<el-col :span="24">
					<el-form-item>
						<my-search placeholder="请输入经销商电话" tablename="distributions" searchfield="name" v-model="searchFields.name" ref="searchClient" style="width:100%" :formAction="'/ajax/vue-search'" @callback="searchCallBack" :fieldArr="[
						   {prop:'name',label:'姓名'},
						   {prop:'phone',label:'电话'},
						   {prop:'created_at',label:'时间'} 
						 ]" />
					</el-form-item>
					<el-form-item>
						<el-select v-model="searchFields.lev" placeholder="请选择状态">
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
			</el-form>
		</el-col>
		<el-col :span="24">
			<el-tabs v-model="status" type="card" @tab-click="clickStatus">
				<el-tab-pane label="审核中" :name="''+0"></el-tab-pane>
				<el-tab-pane label="审核通过" :name="''+1"></el-tab-pane>
				<el-tab-pane label="审核拒绝" :name="''+2"></el-tab-pane>
			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column label="分销商名称" min-width="200"> 
					<template scope="scope">{{ scope.row.getDis.name }}</template>	
			</el-table-column>
			<el-table-column label="分销商电话" min-width="200"> 
					<template scope="scope">{{ scope.row.getDis.phone }}</template>	
			</el-table-column>
			<el-table-column label="提现类型" min-width="200"> 
					<template scope="scope">{{ scope.row.payType == 1 ? '微信' :'银行卡' }}</template>	
			</el-table-column>
			<el-table-column prop="blank_name" label="提现人银行" width="100"> </el-table-column>
			<el-table-column prop="blank_cardno" label="提现人银行卡号" width="100"> </el-table-column>
			<el-table-column prop="blank_client_name" label="提现人姓名" width="100"> </el-table-column>
			<el-table-column prop="amount" label="提现金额" width="100"> </el-table-column>
			<el-table-column label="日期" width="160">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="300">
				<template scope="scope">
					<el-button type="primary" size="mini" @click="changeStatus(scope.$index, scope.row,'1')" v-if="scope.row.status!=1">审核通过</el-button>
					<el-button type="primary" size="mini" @click="changeStatus(scope.$index, scope.row,'2')" v-if="scope.row.status!=2">审核拒绝</el-button>
					<el-button size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="toolbar foot-tool">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[6]" :page-size="6" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
			</el-pagination>
		</div>
		<my-status ref="status" style="width:100%" formAction="/admin/shop/dis/change-come-out-info-status" />
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/shop/dis/come-out-lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'distribution_incomes',
			status: 0,
			sels: [], //列表选中列,
			searchFields: {
				searchDate: '',
				name: '',
				dis_id: ''
			}
		}
	},
	mounted() {
		this.status = this.getOptions('status');
		this.ajax();
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
			this.searchFields.dis_id = res.id;
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
