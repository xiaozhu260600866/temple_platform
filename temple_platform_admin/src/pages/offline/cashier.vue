<template>
	<div class="cash-box">
		<div class="cash-left">
			<div class="edit">
				<el-button type="primary" @click="$refs.formEdit.ajax()">新增</el-button>
			</div>
			<div class="cash-left-top">
				<div class="form_info">
					<div class="row_group">
						<div class="row_item">
							<div class="label">姓名</div>
							<div class="searchInput value plr0">
								<searchClient @callback="searchClientCallBack" ref="searchMember" myclass="cl-search">
								</searchClient>
							</div>
						</div>
						<div class="row_item">
							<div class="label">手机号码</div>
							<div class="value phone">
							
							
								<p>	<el-input v-model="clientInfo.phone" :disabled="!clientInfo.id ? false : true" :placeholder="clientInfo.id ? '' :'请输入手机号码'"></el-input></p>
							</div>
						</div>
					</div>
					<div class="row_group">
						<div class="row_item">
							<div class="label">地址</div>
							<div class="value">	<el-input v-model="clientInfo.address" :disabled="!clientInfo.id ? false : true" :placeholder="clientInfo.id ? '' :'请输入地址'"></el-input></div>
						</div>
						<div class="row_item">
							<div class="label">手机号码2</div>
							<div class="value">	<el-input v-model="clientInfo.phone2" :disabled="!clientInfo.id ? false : true" :placeholder="clientInfo.id ? '' :'请输入手机号码2'"></el-input></div>
						</div>
					</div>
				</div>
				<el-form :inline="true" :model="ruleForm" ref="ruleForm" label-width="80px">
					<div class="orderInfo">
						<div class="flex">
							<el-form-item label="结算日期：" prop="name">
								<el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date"
									value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
							</el-form-item>
							<el-form-item label="单号：" prop="order_no">
								<el-input v-model="ruleForm.order_no" placeholder="请输入单号" type="text"></el-input>
							</el-form-item>
						</div>
					</div>

				</el-form>
				<div class="select-people">
					<el-form :inline="true" :model="ruleForm" ref="ruleForm" label-width="80px">
						<div class="select-people-group">
							<div class="llabel">收款方式：</div>
							<el-radio-group v-model="ruleForm.pay_method">
								<el-radio :label="1" :value="1">微信</el-radio>
								<el-radio :label="2" :value="2">现金</el-radio>
								<el-radio :label="3" :value="3">银行收讫</el-radio>
								<el-radio :label="4" :value="4">悦农e付3040</el-radio>
								<el-radio :label="5" :value="5">悦农e付3041</el-radio>
								<el-radio :label="6" :value="6">作废单</el-radio>
							</el-radio-group>
						</div>
						<div class="select-people-group">
							<div class="llabel">出纳：</div>
							<el-radio-group v-model="ruleForm.cashier">
								<el-radio label="赵萍">赵萍</el-radio>
								<el-radio label="区冬梅">区冬梅</el-radio>
								<el-radio label="妙艳">妙艳</el-radio>
								<el-radio label="其他">其它</el-radio>
							</el-radio-group>
						</div>
						<div class="other" v-if="ruleForm.cashier == '其他'">
							<div class="llabel">其他出纳：</div>
							<el-input v-model="ruleForm.cashier_other" placeholder="请输入出纳"></el-input>
						</div>
						<div class="select-people-group">
							<div class="llabel">经办人：</div>
							<el-radio-group v-model="ruleForm.operator">
								<el-radio label="崔艳芳">崔艳芳</el-radio>
								<el-radio label="林丽">林丽</el-radio>
								<el-radio label="恒此师父">恒此师父</el-radio>
								<el-radio label="谭蕾">谭蕾</el-radio>
								<el-radio label="梁典静">梁典静</el-radio>
								<el-radio label="温秀蓉">温秀蓉</el-radio>
								<el-radio label="其他">其它</el-radio>
							</el-radio-group>
						</div>
						<div class="other" v-if="ruleForm.operator == '其他'">
							<div class="llabel">其他经办人：</div>
							<el-input v-model="ruleForm.operator_other" placeholder="请输入经办人"></el-input>
						</div>
						<div class="select-people-group">
							<div class="llabel">是否邮寄：</div>
							<el-radio-group v-model="ruleForm.is_post">
								<el-radio :label="0">否</el-radio>
								<el-radio :label="1">是</el-radio>
							</el-radio-group>
						</div>
						<div class="other address" v-if="ruleForm.is_post">
							<div class="llabel">邮寄地址：</div>
							<el-input v-model="ruleForm.post_address" placeholder="请输入地址"></el-input>
						</div>
					</el-form>
				</div>

				<div class="orderInfo">
					<el-form :inline="true" :model="ruleForm" ref="ruleForm" label-width="80px">
						<el-form-item label="牌位号：" prop="no">
							<el-input v-model="ruleForm.no" placeholder="请输入牌位号" type="text"></el-input>
						</el-form-item>
						<el-form-item label="备注：" prop="remark">
							<el-input v-model="ruleForm.remark" placeholder="请输入备注" type="textarea"></el-input>
						</el-form-item>
					</el-form>
				</div>

			</div>
			<div class="cash-left-bottom">
				<el-table :data="tableData" border :height="150" style="width: 100%">
					<el-table-column prop="name" label="项目名称" min-width="80"></el-table-column>
					<el-table-column label="数量" width="210">
						<template slot-scope="scope">
						
							 <el-input-number v-model="scope.row.buyNum" @change="handleChange" :min="1" :max="1000" ></el-input-number>
						</template>
					</el-table-column>
					<el-table-column label="单价" width="100">
						<template slot-scope="scope">
							<el-input size="small" v-model="scope.row.price"></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="amount" label="总金额" width="100">
						<template slot-scope="scope">
							{{scope.row.buyNum * scope.row.price}}
						</template>
					</el-table-column>
					<el-table-column label="操作" width="60" align="center">
						<template slot-scope="scope">
							<a @click="tableData.splice(scope.$index,1)" href="javascript:;"><i class="el-icon-delete"
									style="font-size: 17px;"></i></a>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="cash-right">
			<div class="search">
				<el-input placeholder="搜索项目名称" prefix-icon="el-icon-search" v-model="searchName"
					@keyup.enter.native="searchProject"></el-input>
			</div>
			<div class="tabs">
				<el-tabs v-model="selectKey" type="card" @tab-click="handleClick">
					<el-tab-pane :label="v.name" :name="key" v-for="(v,key) in data.class.data"></el-tab-pane>
				</el-tabs>
			</div>
			<div class="cash-right-item">
				<div class="cash-right-item-box">
					<div class="pro-sec-item" v-for="v in data.class.data[selectKey].projects.data"
						@click="toAddCart(v)">
						<div class="pitem-cover"><img class="img"
								:src="v.firstCover=='https://temple.doxinsoft.com/images/nopic.jpg'?'https://temple.doxinsoft.com/images/proPic.jpg':v.firstCover">
						</div>
						<div class="pitem-info">
							<p class="pi-name">{{ v.name }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="cash-account">
			<!-- <div class="account">合计：￥<span class="Arial">300.00</span></div> -->
			<div class="btn" @click="toPay">
				<el-button type="danger">提交</el-button>
			</div>
		</div>
		<pay-confirm ref="payConfirm"></pay-confirm>
		<create-edit ref="formEdit"></create-edit>
	</div>
</template>
<style type="text/css">
	@import "cashier.css";
</style>
<script type="text/javascript">
	import globalData from "./layouts/offline_orders.js";
	import searchAll from "xiaozhu/vue/components/admin/searchAll";
	import searchClient from "@/components/searchClient";
	export default {
		components: {
			"dx-table": resolve => require(["xiaozhu/vue/components/admin/dx_table.vue"], resolve),
			searchAll,
			'pay-confirm': resolve => require(['./layouts/pay_confirm'], resolve),
			'create-edit': resolve => require(['./layouts/create_edit'], resolve),
			searchClient
		},
		data() {
			return {
				formAction: "/admin/project/order-add",
				data: this.formatData(this),
				siteName: this.getSiteName(),
				globalData: globalData,
				ruleForm: {
					is_post: 0,
					post_address: '',
					cashier: '赵萍',
					operator: '崔艳芳',
					date: new Date(),
					no: '',
					remark: '',
					pay: ''
				},
				clientInfo: {},
				selectKey: 0,
				record: 1,
				teller: 1,
				express: 1,
				searchName: '',
				responsible: 1,
				activeName: '1',
				tableData: [

				],
				itemLists: [{
						name: '如意斋'
					},
					{
						name: '吉祥斋'
					},
					{
						name: '上堂斋'
					},
					{
						name: '罗汉斋'
					},
				]
			}
		},
		mounted() {
			this.ajax();
		},
		watch: {
			//"$route": "ajax"
		},
		methods: {
			searchProject() {
				this.postAjax("/admin/project/lists", {
					online: 0,
					name: this.searchName,
					page: 1
				}, '', 'notLoading').then(msg => {
					this.data.class.data[this.selectKey].projects.data = [];
					this.data.class.data[this.selectKey].projects.data = msg.data.lists.data;
				});
			},
			toPay() {

				if (this.tableData.length == 0) {
					return this.getError("您还没有选择项目");
				}
				for (var i = 0; i < this.tableData.length; i++) {
					if (!this.tableData[i].price) {
						return this.getError("您还没有填写价格");
					}
				}
				if (!this.clientInfo.username) {
					return this.getError("您还没有填写或选择姓名");
				}
				if (!this.ruleForm.cashier) {
					return this.getError("请输入出纳");
				}
				if (!this.ruleForm.operator) {
					return this.getError("请输入经办人");
				}
				if (!this.ruleForm.pay_method) {
					return this.getError("支付方式不能为空");

				}
				
				if (!this.ruleForm.order_no) {
					return this.getError("单号不能为空");

				}
				if (this.ruleForm.order_no.length != 7) {
					return this.getError("单号不是7位");

				}
				this.postAjax("/admin/project/order-add", {
					clientInfo: this.clientInfo,
					tableData: this.tableData,
					parentData: this.ruleForm
				}).then(msg => {
					if (msg.data.status == 2) {
						setTimeout(() => {
							window.location.reload();
						}, 3000);
					}
				})

				//this.$refs.payConfirm.ajax(this.clientInfo, this.tableData, this.ruleForm);
			},
			toAddCart(item) {
				// if (this.tableData.length >= 1) {
				// 	return this.getError("只能添加一条")
				// }
				this.tableData.push({
					name: item.name,
					buyNum: 1,
					price: item.price2,
					id: item.id,
					amount: item.price2
				});
			},
			ajax() {
				this.getAjax(this, {
					name: this.searchName
				}, msg => {});
			},
			searchClientCallBack(item) {
				console.log(item)
				this.clientInfo = item;
				if(item.id){
					item.address = item.getAddress ? item.getAddress.province + item.getAddress.city + item.getAddress
						.area + item.getAddress.address : item.userInfo.address;
					item.phone = item.getAddress ? item.getAddress.phone : item.phone;
				}
				
				console.log(this.clientInfo);
			}
		}
	}
</script>
