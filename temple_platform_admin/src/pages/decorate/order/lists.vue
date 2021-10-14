<template>
	<section>
		<el-col :span="24" class="toolbar t-search">
			<el-form :inline="true" :model="data.query" >
				<el-col :span="4">
					<el-input placeholder="订单编号" v-model="data.query.order_no"></el-input>
				</el-col>
				<el-col :span="4">
					<el-input placeholder="商品名称"  v-model="data.query.product"></el-input>
				</el-col>
				<el-col :span="4">
					<el-input placeholder="姓名" v-model="data.query.addr_name"></el-input>
				</el-col>
				<el-col :span="4">
					<el-input placeholder="电话" v-model="data.query.addr_phone"></el-input>
				</el-col>
				
				<el-form-item>
					<el-button type="primary" @click="ajax">查询</el-button>
					<el-button type="success" @click="exportExcel">导出</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		  <el-col :span="24" v-if="data.show">
			<el-tabs v-model="data.query.status" type="card" @tab-click="ajax">
				<el-tab-pane :label="'已提交('+data.status1Num+')'" :name="''+1"></el-tab-pane>
				<el-tab-pane :label="'报修中('+data.status5Num+')'" :name="''+5"></el-tab-pane>
				<el-tab-pane :label="'报修完成('+data.status9Num+')'" :name="''+9"></el-tab-pane>
				<el-tab-pane :label="'售后('+data.status10Num+')'" :name="''+10"></el-tab-pane>
			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column prop="order_no" label="订单编号" width="130"> </el-table-column>
			<el-table-column prop="addr_name" label="姓名" width="70"> </el-table-column>
			<el-table-column label="呢称" width="100">
				<template scope="scope">{{ scope.row.user ? scope.row.user.nickname :'已被删除' }}</template>
			</el-table-column>
			<el-table-column prop="addr_phone" label="电话" width="120"> </el-table-column>
			<el-table-column label="地址" min-width="150">
				<template scope="scope"> {{ scope.row.addr_city }}-{{ scope.row.addr_area }}-{{ scope.row.addr_address }}</template>
			</el-table-column>
			<el-table-column label="商品" min-width="150">
				<template scope="scope">{{ scope.row.product }} </template>
			</el-table-column>
			<el-table-column label="日期" width="160">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" min-width="200">
				<template scope="scope">
					<el-button type="primary" size="mini" @click="$refs.engineer.ajax(data.staff,scope.row)">分配工程师</el-button>
					<el-button type="primary" size="mini" @click="$router.push({path:'/vueadmin/decorate/order-info?id='+scope.row.id})">详情</el-button>
					<el-button size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="toolbar foot-tool">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
			</el-pagination>
		</div>
		
		<engineer ref="engineer"></engineer>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/decorate/order/lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'decorate_orders',
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
			this.getAjax(this, {  }, msg => {});
		},
		exportExcel() {
			window.location.href = this.siteName + "/admin/decorate/order/export?api_token=" + this.getUser().api_token;
		},
		selsChange: function(sels) {
			this.sels = sels;
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
			this.data.query.dis_id = res.id;
		},
		clickStatus(tab, event) {
			this.status = tab.name;
			this.ajax();
		}
	},
	components: {
		"engineer": resolve => require(['./layouts/engineer'], resolve),
	}

}

</script>
