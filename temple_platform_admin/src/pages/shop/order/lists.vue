<template>
	<section>
		<el-col :span="24" class="toolbar t-search">
			<el-form :inline="true" :model="data.query" class="ts-group">
				<el-form-item >
					<el-input placeholder="订单编号" v-model="data.query.order_no" style="width:180px"></el-input>
				</el-form-item>
				<el-form-item >
					<el-input placeholder="商品名称"  v-model="data.query.product_str" style="width:180px"></el-input>
				</el-form-item>

				<el-form-item >
					<el-input placeholder="姓名/电话" v-model="data.query.searchFields" style="width:180px"></el-input>
				</el-form-item>
				<el-form-item label="订单日期">
					<el-date-picker type="daterange" placeholder="选择日期范围" v-model="data.query.created_at" > </el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="ajax">查询</el-button>
					<el-button type="success" @click="exportExcel">导出</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		  <el-col :span="24" v-if="data.show">
			<el-tabs v-model="data.query.status" type="card" @tab-click="ajax">
				<el-tab-pane :label="'全部('+data.statusAll+')'" :name="''+12"></el-tab-pane>
				<el-tab-pane :label="'已付款('+data.status3Num+')'" :name="''+3"></el-tab-pane>
				<!-- <el-tab-pane :label="'发货中('+data.status5Num+')'" :name="''+5"></el-tab-pane> -->
				<el-tab-pane :label="'已完成('+data.status9Num+')'" :name="''+9"></el-tab-pane>
			<!-- 	<el-tab-pane :label="'售后('+data.status10Num+')'" :name="''+10"></el-tab-pane> -->
			</el-tabs>
		</el-col>
		<el-table ref="multipleTable" :data="data.lists" border tooltip-effect="dark" style="width: 100%" @selection-change="selsChange" v-loading="data.listLoading">
			<el-table-column type="selection" width="50"> </el-table-column>

			<el-table-column prop="order_no" label="订单编号" width="120"> </el-table-column>
			<el-table-column label="商品" width="250">
				<template scope="scope">
					<div class="order_info p5 bg-f5 mtb5" v-for="product in scope.row.products" v-if="product.getProduct">
						<div class="pro_img pr10">
							<img class="img" :src="product.getProduct.firstCover" />
						</div>
						<div class="pro_right w-b100">
							<div class="tInfo">
								<p class="fs-14 lh-20 wrap2">{{product.getProduct.name}}</p>
								<p class="nowrap fs-12 mt5" v-if="product.attribute">{{product.attribute}}</p>
							</div>
							<div class="flex-between mt5">
								<p class="fs-12 fc-9"><span class="Arial">{{product.num}}</span>件</p>
								<p class="fs-12 fc-9">小计：<span class="Arial">{{product.amount}}</span></p>
							</div>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="支付/配送方式" width="80">
				<template scope="scope">
					<p>{{ scope.row.getPayMethod }}</p>
					<p>{{ scope.row.getShipping }}</p>
				</template>
			</el-table-column>
			<el-table-column label="应付" width="180">
				<template scope="scope">
					<p>商品小计：<span class="Arial">￥{{ scope.row.amount }}</span></p>
					<p>运　　费：<span class="Arial">￥{{ scope.row.yunfei }}</span></p>
					<p>折　　扣：-<span class="Arial">￥{{scope.row.payed_amount }}</span></p>
					<p>应　　收：<span class="Arial">￥{{ (parseFloat(scope.row.amount)  +  parseFloat(scope.row.yunfei)) - parseFloat(scope.row.payed_amount)}}</span></p>
				</template>
			</el-table-column>
			<el-table-column align="center" prop="num" label="数量" width="50"> </el-table-column>
			<el-table-column label="呢称" width="120">
				<template scope="scope">
					<p class="fs13">{{scope.row.user.nickname }}</p>
				</template>
			</el-table-column>
			<el-table-column label="功德主地址" min-width="120">
				<template scope="scope" >
				
					<span v-if="scope.row.bless_address">{{ scope.row.bless_address }}</span>
				</template>
			</el-table-column>
			<el-table-column label="功德主手机" min-width="120">
				<template scope="scope" >
					<span v-if="scope.row.phone">{{ scope.row.phone }}</span>
				</template>
			</el-table-column>
			<el-table-column label="功德主姓名" min-width="120">
				<template scope="scope" >
					<span v-if="scope.row.bless_name">{{ scope.row.bless_name }}</span>
				</template>
			</el-table-column>
			<el-table-column prop="status_message" label="状态" width="120" v-if="data.query.status == 12"> </el-table-column>
			<el-table-column  label="完成时间" width="120" v-if="data.query.status == 9">
                           <template scope='scope'>
                                {{scope.row.finish_date}} {{scope.row.finishName}}
                           </template>
              </el-table-column>
			<el-table-column label="日期" width="160">
				<template scope="scope">{{ scope.row.created_at }}</template>
			</el-table-column>
			<el-table-column label="操作" width="100">
				<template scope="scope">
					<el-dropdown>
						<el-button type="primary" size="mini">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
						<el-dropdown-menu slot="dropdown">
							<!-- <el-dropdown-item @click.native="$router.push({path:'/vueadmin/shop/order-info?id='+scope.row.id})">订单详情</el-dropdown-item> -->
                             <el-dropdown-item @click.native="changeOrder(scope.row,9)" v-if="scope.row.status<9">核销完成</el-dropdown-item>
							<!-- <el-dropdown-item @click.native="$refs.suggest.ajax(scope.row.products);" v-if="scope.row.suggestStatus >  0">评价</el-dropdown-item> -->
						<!-- 	<el-dropdown-item @click.native="$refs.after.ajax(scope.row);" v-if="scope.row.status >  9">售后</el-dropdown-item> -->
							<!-- <el-dropdown-item @click.native="showDisOrder(scope.$index, scope.row)" v-if="scope.row.getDis">分销订单</el-dropdown-item> -->
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
		<my-create-edit ref="createEdit"></my-create-edit>
		 <my-after ref="after"></my-after>
		<my-suggest ref="suggest"></my-suggest>
		 <el-dialog title="佣金" :visible.sync="dialogOrderVisible" size="large" append-to-body>
			<my-order-info ref="myOrder"> </my-order-info>
		</el-dialog>
	</section>
</template>
<script type="text/javascript">
export default {
	data() {
		return {
			formAction: '/admin/shop/order/lists',
			data: this.formatData(this),
			siteName: this.getSiteName(),
			tableName: 'orders',
			dialogOrderVisible:false,
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
        changeOrder(res,status){
            this.getConfirm("是否确认收货？",msg=>{
                this.postAjax("/admin/shop/order/change-order-status", { id: res.id, status: status }, msg => {
                	if (msg.data.status == 2) {
                		this.ajax();
                	}
                });
            });
        },
		ajax() {
			this.getAjax(this, {  }, msg => {});
		},
		exportExcel() {
			let url = this.urlApendOpenid("/admin/shop/order/export", this);

			window.open(this.siteName+url);
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
		showDisOrder(index,item){
			this.dialogOrderVisible = true;
			setTimeout(() => {
				this.$refs.myOrder.ajax('',item.order_no);
			}, 500)
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
		'my-create-edit': resolve => require(['./create_edit'], resolve),
		 'my-after': resolve => require(['./layouts/after'], resolve),
		'my-suggest': resolve => require(['./layouts/suggest'], resolve),
		 'my-order-info': resolve => require(['../dis/layouts/order_lists'], resolve),
	}

}

</script>
<style type="text/css" scoped="">
.order_info{display: flex;}
.order_info .pro_img .img{width: 40px;height: 40px;display: flex;border-radius: 5px;}
</style>
