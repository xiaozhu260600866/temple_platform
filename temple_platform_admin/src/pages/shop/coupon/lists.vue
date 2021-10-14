<template>
	<section>
		<el-col :span="24" class="toolbar t-search">
			<el-form :inline="true" id="search" :model="searchFields">
				<el-col :span="20">
					<el-form-item class="input-w300">
						<el-input placeholder="请输入优惠券名称" name="name" v-model="searchFields.name"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="toSearch">查询</el-button>
					</el-form-item>
				</el-col>
				<el-form-item>
					<el-button type="primary" @click="$router.push({path: '/vueadmin/shop/coupon/coupon-create'})" >新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column prop="name" label="优惠券名称" min-width="100"> </el-table-column>
			<el-table-column prop="amount" label="优惠券金额" width="100"> </el-table-column>
			<el-table-column label="有效期" width="170">
				<template scope="scope">{{ scope.row.start_date }} ~ {{ scope.row.end_date }}</template>
			</el-table-column>
			<el-table-column label="首页是否显示" width="80">
				<template scope="scope">
					 <el-switch v-model="scope.row.is_index " on-text="" off-text="" :active-value="1" :inactive-value="0" @change="editField(scope.row,'is_index')"> </el-switch>
				</template>
			</el-table-column>
			<el-table-column prop="getType" label="类型" width="120"> </el-table-column>
			<el-table-column prop="getProduct" label="指定产品使用" min-width="100"> </el-table-column>
			<el-table-column label="操作" width="180">
				<template scope="scope">
					<el-button type="primary" @click="$router.push({path: '/vueadmin/shop/coupon/coupon-create?id='+scope.row.id})" >编辑</el-button>
					<el-button size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="toolbar foot-tool">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 " v-if="data.auth.canDel">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[6]" :page-size="6" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
			</el-pagination>
		</div>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/shop/coupon/lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'coupons',
			sels: [], //列表选中列,
			searchFields: {
				user_id: '',
				name: '',
			}
		}
	},
	mounted() {
		this.ajax();
	},
	methods: {
		editField(row,field){
			this.postAjax("/admin/shop/coupon/editField", { id:row.id,field:field,value:row[field] }, msg => {
				if (msg.data.status == 3) {
					row[field] =0;
				}
			});
		},
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

	}

}

</script>
