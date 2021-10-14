<template>
	<section>
		<el-col :span="24" class="toolbar t-search">
			<el-form :inline="true" :model="searchFields">
				<el-col :span="4">
					<el-input placeholder="订单编号" name="order_no" v-model="searchFields.order_no"></el-input>
				</el-col>
				<el-form-item>
					<el-button type="primary" @click="toSearch">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column prop="order_no" label="订单号" width="130"> </el-table-column>
			<el-table-column label="评价人" width="80">
				<template scope="scope">{{ scope.row.getUser ? scope.row.getUser.nickname :'已被删除' }}</template>
			</el-table-column>
			<el-table-column label="商品" min-width="170">
				<template scope="scope">{{ scope.row.getProduct ? scope.row.getProduct.name :'已被删除' }}</template>
			</el-table-column>
			<el-table-column prop="suggestContent1" label="评价内容" min-width="130"> </el-table-column>
			<el-table-column prop="suggestContent2" label="追评内容" min-width="130"> </el-table-column>
			<el-table-column label="日期" width="170">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="90">
				<template scope="scope">
					<el-button size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="toolbar foot-tool">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
			</el-pagination>
		</div>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/shop/order/evaluate-lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'orders',
			status:this.getOptions("status"),
			sels: [], //列表选中列,
			searchFields: {
				
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
			this.getAjax(this, { status: this.status }, msg => {});
		},
		exportExcel() {
			window.location.href = this.siteName + "admin/shop/order/export?api_token=" + this.getUser().api_token;
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
			this.del_vuex(item, index, this,"admin/shop/order/evaluate-del")
		},
		searchCallBack(res) {
			this.searchFields.card_user_id = res.id;
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
