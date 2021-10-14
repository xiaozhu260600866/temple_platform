<template>
	<section>
		<div class="toolbar t-search">
			<el-form :inline="true" id="search" class="ts-group" :model="data.query">
				<el-form-item label="ID">
					<el-input placeholder="会员ID" name="id" v-model="data.query.id"></el-input>
				</el-form-item>
				<el-form-item class="input-w300" label="分销商">
					<el-input placeholder="请输入昵称/姓名/电话" name="name" v-model="data.query.searchFields"></el-input>
				</el-form-item>
				<el-form-item label="成为分销商时间">
					<el-date-picker type="daterange" placeholder="选择日期范围" v-model="data.query.created_at"> </el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="toSearch">查询</el-button>
				</el-form-item>
			</el-form>
		</div>
		<el-col :span="24">
			<el-tabs v-model="data.query.status" type="card" @tab-click="clickStatus">
				<el-tab-pane label="全部" :name="''+12"></el-tab-pane>
				<el-tab-pane label="未审核" :name="''+0"></el-tab-pane>
				<el-tab-pane label="已审核" :name="''+1"></el-tab-pane>
			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading" class="dis-list">
			<el-table-column type="selection" width="40"> </el-table-column>
			<el-table-column prop="id" label="会员ID" width="100"> </el-table-column>
			<el-table-column label="昵称" width="100">
				<template scope="scope">
					<div v-html="scope.row.getUser.nickname"></div>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="姓名/手机号码" min-width="100">
				<template scope="scope">{{ scope.row.name }}
					<br>{{ scope.row.phone }}</template>
			</el-table-column>
			<el-table-column label="推荐人" min-width="100">
				<template scope="scope">
					<div v-html="scope.row.getReferrer"></div>
				</template>
			</el-table-column>

			<el-table-column prop="amount" label="累计佣金" width="100"> </el-table-column>
			<el-table-column label="下级" width="100">
				<template scope="scope">一级：{{ scope.row.downCount.one }}<br><span v-if="scope.row.downCount.two"></span></template>
			</el-table-column>
			<el-table-column align="center" prop="clientCount" label="客户数" width="70"> </el-table-column>
			<el-table-column align="center" prop="orderCount" label="订单数" width="70"> </el-table-column>
			<el-table-column align="center" label="状态" width="100" v-if="status == 12">
				<template scope="scope">
					<div v-if="scope.row.status == 0">
						<el-button size="mini" type="primary" @click="changeStatus(scope.$index, scope.row,'1')">通过</el-button>
						未审核
					</div>
					<div v-else>已审核</div>
				</template>
			</el-table-column>
			<el-table-column label="日期" width="160">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template scope="scope">
					<el-dropdown>
						<el-button type="primary" size="small">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="$router.push('/vueadmin/user/info?user_id='+scope.row.user_id)">会员详情</el-dropdown-item>
							<el-dropdown-item @click.native="showDownDis(scope.$index, scope.row)" v-if="scope.row.downCount.one>0">团长</el-dropdown-item>
							<el-dropdown-item @click.native="showClient(scope.$index, scope.row)">客户</el-dropdown-item>
							<el-dropdown-item @click.native="showOrder(scope.$index, scope.row)">分销订单</el-dropdown-item>
							<el-dropdown-item @click.native="handleDel(scope.$index, scope.row)">删除</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>
		<div class="toolbar foot-tool">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 ">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
			</el-pagination>
		</div>
		<el-dialog :title="disTitle" :visible.sync="dialogTableVisible" size="large">
			<my-down-dis ref="mytable"> </my-down-dis>
		</el-dialog>
		<el-dialog :title="clientTitle" :visible.sync="dialogClientVisible" size="large">
			<my-client-info ref="myclient"> </my-client-info>
		</el-dialog>
		<el-dialog :title="orderTitle" :visible.sync="dialogOrderVisible" size="large">
			<my-order-info ref="myOrder"> </my-order-info>
		</el-dialog>
		<my-status ref="status" style="width:100%" formAction="/admin/shop/dis/change-status" />
		<my-changeParent ref="changeParent"> </my-changeParent>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/shop/dis/lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'distributions',
			dialogTableVisible: false,
			dialogClientVisible: false,
			dialogOrderVisible: false,
			clientTitle: '',
			orderTitle: '',
			disTitle: '查看下级分销商',
			sels: [], //列表选中列,
			searchFields: {
				name: '',
			}
		}
	},
	mounted() {
		this.status = this.getOptions('status');
		this.ajax();
	},
	methods: {
		clickStatus(tab, event) {
			this.data.query.status = tab.name;
			this.ajax();
		},
		ajax() {
			this.getAjax(this, {}, msg => {});
		},
		showDownDis(index, item) {
			this.disTitle = item.name + '的下级分销商';
			let fid = item.id;
			this.dialogTableVisible = true;
			setTimeout(() => {
				this.$refs.mytable.ajax(fid);
			}, 500)
		},
		selsChange: function(sels) {
			this.sels = sels;
		},
		toSearch() {
			this.searchField(this);
		},
		showClient(index, item) {
			this.clientTitle = item.name + '所属客户';
			this.dialogClientVisible = true;
			setTimeout(() => {
				this.$refs.myclient.ajax(item.id);
			}, 500)
		},
		showOrder(index, item) {
			this.orderTitle = item.name + '的分销订单';
			this.dialogOrderVisible = true;
			setTimeout(() => {
				this.$refs.myOrder.ajax(item.id);
			}, 500)
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
		changeStatus(index, item, status) {
			this.$refs.status.ajax({ id: item.id, status: status });
		},
		searchCallBack(res) {
			this.searchFields.fid = res.id;
		},
	},
	components: {
		'my-down-dis': resolve => require(['./layouts/lists_info_table'], resolve),
		'my-client-info': resolve => require(['./layouts/client_info'], resolve),
		'my-order-info': resolve => require(['./layouts/order_lists'], resolve),
		'my-status': resolve => require(['xiaozhu/vue/components/admin/status.vue'], resolve),
		'my-changeParent': resolve => require(['./layouts/changeParent'], resolve),
	}

}

</script>
