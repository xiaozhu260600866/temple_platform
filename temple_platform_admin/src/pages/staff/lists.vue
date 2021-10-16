<template>
	<section>
		<el-col :span="24" class="toolbar t-search float-r">
			<el-form :inline="true" id="search" :model="searchFields">
				<el-col :span="20">
					<el-form-item>
						<el-input placeholder="姓名" v-model="searchFields.user_name"></el-input>
					</el-form-item>
					<el-form-item>
						<el-input placeholder="电话" v-model="searchFields.user_phone"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="toSearch">查询</el-button>
						<!-- <el-button type="primary" @click="$refs.category.ajax()">部门</el-button> -->
                    <!--    <el-button type="primary" @click="synchronize">同步企业微信</el-button> -->
					</el-form-item>
				</el-col>
				<el-form-item>
					<el-button type="primary" @click="$refs.createEdit.ajax('',data.merchantLists,data.department,data.productClass,data.roleArr)">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column label="姓名" min-width="60">
				<template scope="scope">{{ scope.row.user.userInfo.name }}</template>
			</el-table-column>
			 <el-table-column label="帐号" min-width="140">
				<template scope="scope">{{ scope.row.user.username }}</template>
			</el-table-column>
			<el-table-column label="电话" width="120">
				<template scope="scope">{{ scope.row.user.userInfo.phone }}</template>
			</el-table-column>
			<el-table-column label="日期" width="170">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="320">
				<template scope="scope">
					<el-button type="default" size="mini" @click="scope.row.user.userInfo.fclass =scope.row.user.fclass;scope.row.user.userInfo.role_id =scope.row.user.role_id;scope.row.user.userInfo.username =scope.row.user.username;scope.row.user.userInfo.see =scope.row.user.see;scope.row.user.userInfo.userid =scope.row.user.weixin_userid;$refs.createEdit.ajax(scope.row.user.userInfo,data.merchantLists,data.department,data.productClass,data.roleArr)">编辑</el-button>
					<el-button size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="toolbar foot-tool">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
			</el-pagination>
		</div>
		<my-create-edit ref="createEdit"></my-create-edit>
		<my-qrcode ref="qrcode"></my-qrcode>
		<my-share ref="share"></my-share>
		<my-class top="2%" ref="category" :type="0" :formAction="'/admin/department/'" :sizearr="300"></my-class>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/card/lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'business_cards',
			sels: [], //列表选中列,
			searchFields: {
				name: '',
				user_id: 0
			}
		}
	},
	mounted() {
		this.ajax();
	},
	watch: {
		// 如果路由有变化，会再次执行该方法
		//"$route": "ajax"
	},
	methods: {
        synchronize() {
        	this.getConfirm("是否同步企业微信？", msg => {
        		this.postAjax("/admin/card/synchronize", {}, msg => {
        			this.ajax();
        		});
        	});
        },
		ajax() {
			this.getAjax(this, { type: this.getOptions('type') }, msg => {});
		},
		editField(user, field) {
			if (field == "see") {
				var user_id = user.id;
			} else {
				var user_id = user.user_id;
			}
			this.postAjax("/admin/card/editField", { user_id: user_id, field: field, value: user[field] }, msg => {
				if (msg.data.status == 3) {
					user[field] = 0;
				}
			});
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
				this.postAjax("/admin/card/del", { id: item.user_id }, msg => {
					if (msg.data.status == 2) {
						this.data.lists.splice(index, 1);
						this.getSuccess("删除成功");
					}
				});
			});

		},
		searchCallBack(res) {
			this.searchFields.user_id = res.id;
		}
	},
	components: {
		'my-create-edit': resolve => require(['./create_edit'], resolve),
		'my-qrcode': resolve => require(['./layouts/qrcode'], resolve),
		'my-share': resolve => require(['./layouts/share'], resolve),
		"my-class": resolve => require(['xiaozhu/vue/components/admin/class.vue'], resolve),
	}

}

</script>
