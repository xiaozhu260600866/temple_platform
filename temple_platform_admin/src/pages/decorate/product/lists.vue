<template>
	<section v-if="data.show">
		<el-col :span="24" class="toolbar t-search">
			<el-form :inline="true" id="search" :model="data.query">
				<el-col :span="20">
					<el-form-item class="input-w300">
						<el-input placeholder="请输入产品名称\分类" name="name" v-model="data.query.name"></el-input>
					</el-form-item>
					<el-form-item  >
						<el-select v-model="data.query.fclassForIndex" placeholder="请输入分类">
							<el-option v-for="v in data.fclass" :label="v.label" :value="v.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item  label="上传时间">
					 	<el-date-picker type="daterange" placeholder="选择日期范围" v-model="data.query.created_at"> </el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="ajax">查询</el-button>
						<el-button type="primary" @click="$refs.category.ajax()" v-if="data.auth.canClass">类别管理</el-button>
					</el-form-item>
				</el-col>
				<el-form-item class="mr0">                    
					<el-button type="primary" @click="$router.push({path: '/vueadmin/decorate/product/create'})" v-if="data.auth.canCreate">新增产品</el-button>
				</el-form-item>
			</el-form>
		</el-col>
	
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>
			<el-table-column prop="name" label="产品名称"  min-width="200"> </el-table-column>
			<el-table-column label="url" width="170">
				<template scope="scope">{{ scope.row.is_group ? '/pages/shop/group/show/main?id='+ scope.row : '/pages/shop/product/show/main?id='+scope.row.id}}</template>
			</el-table-column>
			<el-table-column prop="fclassname" label="分类名称" width="150"> </el-table-column>
			<el-table-column label="日期" width="160">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column prop="price" label="价格" width="100"> </el-table-column>
		   
		  
			<el-table-column prop="num" label="库存" width="70"> </el-table-column>
		
		
			
			<el-table-column label="是否上架" width="80">
				<template scope="scope">
					 <el-switch v-model="scope.row.putaway " on-text="" off-text="" :active-value="1" :inactive-value="0" @change="editField(scope.row,'putaway')"> </el-switch>
				</template>
			</el-table-column>
			
			<el-table-column label="操作" width="240">
				<template scope="scope">
					<el-button type="primary" size="mini" @click="$router.push({path:'/vueadmin/decorate/product/edit?id='+scope.row.id})" v-if="data.auth.canEdit">编辑</el-button>
					<el-button size="mini" @click="handleDel(scope.$index, scope.row)" v-if="data.auth.canDel">删除</el-button>
				
				</template>
			</el-table-column>
		</el-table>
		<div class="toolbar foot-tool">
			<el-button type="danger" @click="delAll" :disabled="this.sels.length===0 " v-if="data.auth.canDel">批量删除</el-button>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.thisPage" :page-sizes="[15]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" :total="data.total">
			</el-pagination>
		</div>
		<my-class top="2%" ref="category" :type="0" :formAction="'/admin/decorate/product/'" :sizearr="300"></my-class>
		
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/decorate/product/lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'decorate_products',
			is_group:0,
			sels: [], //列表选中列,
			
		}
	},
	mounted() {
	
		this.ajax();
	},
	methods: {
		changeGroup(tab){
			this.is_group = tab.name;
			this.ajax();
		},
		editField(row,field){
			this.postAjax("/admin/decorate/product/editField", { product_id:row.id,field:field,value:row[field] }, msg => {
				if (msg.data.status == 3) {
					row[field] =0;
				}
			});
		},
		ajax() {
			this.getAjax(this, {is_group:this.is_group}, msg => {});
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
			this.searchFields.user_id = res.id;
		}
	},
	components: {
		"my-class": resolve => require(['xiaozhu/vue/components/admin/class.vue'], resolve),
		
	}

}

</script>
