<template>
	<section>
		<el-col :span="24" class="toolbar t-search">
			<el-form :inline="true" :model="searchFields">
				<!-- <el-form-item>
					 <el-input v-model="searchFields.nickname" placeholder="请输入呢称"></el-input>
				</el-form-item> -->
				<el-form-item>
					 <el-input v-model="searchFields.name" placeholder="请输入姓名"></el-input>
				</el-form-item>
				  <el-form-item>
					 <el-input v-model="searchFields.phone" placeholder="请输入电话"></el-input>
				</el-form-item>
				<!-- 	<el-form-item>
						<el-select v-model="searchFields.shareSource" placeholder="来源:">
							<el-option label="全部" value="0"></el-option>
							<el-option label="扫码" value="扫码"></el-option>
							<el-option label="转发" value="转发"></el-option>
							<el-option label="搜索" value="搜索"></el-option>
						</el-select>
					</el-form-item> -->
					<!-- <el-form-item>
						<el-select v-model="searchFields.member_lev" placeholder="会员等级:">
							 <el-option :label="'普通会员'" value=""></el-option>
							<el-option :label="v.name" :value="v.name" v-for="v in data.lev"></el-option>
						</el-select>
					</el-form-item> -->
					<el-button type="primary" @click="toSearch">查询</el-button>
				</el-form-item>
				<el-form-item>
					<!--  <el-button type="primary" @click="$router.push({path: '/admin/vueadmin/user/create'})" v-if="data.auth.canCreate">新增</el-button> -->
				<!-- 	<el-button type="success" @click="exportExcel">导出数据</el-button> -->
				</el-form-item>
			</el-form>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column align="center" type="selection" width="40"> </el-table-column>
			<!-- <el-table-column align="center" label="ID" width="80">
				<template scope="scope">{{ scope.row.userInfo.user_id }}</template>
			</el-table-column> -->
		<!-- 	<el-table-column prop="phone" label="推荐人" width="140">
				<template scope="scope">{{ scope.row.source }}</template>
			</el-table-column> -->
			
			  <el-table-column prop="nickname" label="呢称" min-width="180"> </el-table-column>
		<!-- 	 <el-table-column align="center" label="会员等级" width="80">
				<template scope="scope">{{ scope.row.member_lev ? scope.row.member_lev :'普通会员' }}</template>
			</el-table-column> -->

		<!-- 	<el-table-column prop="phone" label="电话" width="150">
			
			</el-table-column>
		 -->
			
			<el-table-column align="center" label="访问时间" width="160">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<!-- <el-table-column align="center" label="积分" width="60">
				<template scope="scope">{{ scope.row.clickNum }}</template>
			</el-table-column>
			<el-table-column align="center" label="余额" width="100">
				<template scope="scope">{{ scope.row.amount }}</template>
			</el-table-column>
			<el-table-column align="center" label="成交订单" width="80">
				<template scope="scope">{{ scope.row.orderCount }}</template>
			</el-table-column>
			<el-table-column align="center" label="成交金额" width="100">
				<template scope="scope">{{ scope.row.orderSum }}</template>
			</el-table-column> -->
			<el-table-column label="操作" width="160">
				<template scope="scope">
					<!-- <el-button type="primary" size="mini" @click="$router.push('/admin/vueadmin/user/edit?id='+scope.row.id)" v-if="data.auth.canEdit">编辑</el-button> -->
					<el-button size="mini" @click="handleDel(scope.$index, scope.row)" v-if="data.auth.canDel">删除</el-button>
					<!-- <el-dropdown>
						<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native="$router.push('/vueadmin/user/info?user_id='+scope.row.id)">会员详情</el-dropdown-item>
							<el-dropdown-item @click.native="$refs.table.ajax('/admin/shop/order/lists?user_id='+scope.row.id)">购买记录</el-dropdown-item>
							<el-dropdown-item @click.native="$refs.coupon.ajax(scope.row,data.coupon)" >赠送优惠券</el-dropdown-item>
							<el-dropdown-item @click.native="$refs.lev.ajax(scope.row,data.lev)" >升级会员</el-dropdown-item>
							<el-dropdown-item @click.native="$router.push('/admin/vueadmin/user/edit?id='+scope.row.id)" v-if="data.auth.canEdit">编辑</el-dropdown-item>
							<el-dropdown-item @click.native="handleDel(scope.$index, scope.row)" v-if="data.auth.canDel">删除</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown> -->
				</template>
			</el-table-column>
		</el-table>
	   <div class="toolbar foot-tool">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 " v-if="data.auth.canDel">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[60]" :page-size="60" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
			</el-pagination>
	   </div>
		<my-table :searchFields="{order_no:'',searchDate:[]}" tableName="orders" ref="table" style="width:100%" :fieldArr="[
			   {prop:'order_no',label:'订单号'},
			   {prop:'getShipping',label:'购买方式'},
			   {prop:'status_message',label:'状态'},
			   {prop:'productInfo',label:'商品'}
		   ]" />
		<my-rechargeCoupon top="10%" ref="coupon"></my-rechargeCoupon>
		<my-lev top="10%" ref="lev"></my-lev>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/user/lists?online=1',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'users',
			sels: [], //列表选中列,
			searchFields: {
				user_id: '',
				shareSource: '',
				nickname: '',
			}
		}
	},
	mounted() {
		this.ajax();
	},
	methods: {
		editField(row, field) {
		   console.log(row)
			this.postAjax("/admin/user/editField", {
				id: row.id,
				field: field,
				value: row[field]
			}, msg => {
				if (msg.data.status == 3) {
					row[field] = 0;
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
		exportExcel() {
			window.location.href = this.siteName + "admin/user/export?api_token=" + this.getUser().api_token;
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
		addDis(row) {
			this.getConfirm("是否升级为经销商？", msg => {
				this.postAjax("/admin/user/add-dis", { id: row.id }, msg => {
					if (msg.data.status == 2) {
						this.ajax();
					}
				});
			});
		},
		searchCallBack(res) {
			this.searchFields.user_id = res.id;
		}
	},
	components: {
		'my-rechargeCoupon': resolve => require(['./layouts/rechargeCoupon.vue'], resolve),
		'my-lev': resolve => require(['./layouts/lev.vue'], resolve),
	}

}

</script>
