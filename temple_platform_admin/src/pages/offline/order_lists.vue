<template>
	<div>
		<dx-table :data="data" :globalData="globalData" @submitBeforeCallBack="submitBeforeCallBack" operateWidth="160">
			<div slot="header2" class="p10 fs20">
				随喜金额{{data.orderAmount}}份；
			</div>
			<div slot="append_table_post_address" slot-scope="scope">
				<div v-if="scope.row.is_post">
					{{scope.row.post_address ? '是/'+scope.row.post_address:'否'}}
				</div>
			</div>
			<div slot="append_table_phone" slot-scope="scope">
				<div>{{ scope.row.phone }}</div>
				<div>{{ scope.row.phone2 }}</div>
			</div>
			<div slot="append_table_up" slot-scope="scope">
				<el-switch v-model="scope.row.putaway " on-text="" off-text="" :active-value="1" :inactive-value="0" @change="editField(scope.row,'putaway')"> </el-switch>
			</div>
			<div slot="append_table_sort" slot-scope="scope">
				<el-input v-model="scope.row.sort"  @change="editField(scope.row,'sort')"></el-input>
			</div>
			<div slot="append_form_is_post" slot-scope="scope">
				<el-radio v-model="scope.row.is_post" :label="2">邮寄(否)</el-radio>
				<el-radio v-model="scope.row.is_post" :label="1">邮寄(是)</el-radio>
				<div v-if="scope.row.is_post == 1">
					<el-form-item label="邮寄地址" >
						<el-input v-model="scope.row.post_address"></el-input>
					</el-form-item>
				</div>
			</div>
			<div slot="append_form_selectType" slot-scope="scope">
				<el-radio v-model="scope.row.selectType" :label="2">线下</el-radio>
				<el-radio v-model="scope.row.selectType" :label="1">线上</el-radio>
				<div v-if="scope.row.selectType == 2">
					<el-form-item label="功德主名称" >
						<el-input v-model="scope.row.bless_name"></el-input>
					</el-form-item>
					<el-form-item label="功德主电话" >
						<el-input v-model="scope.row.phone"></el-input>
					</el-form-item>
					<el-form-item label="功德主地址" >
						<el-input v-model="scope.row.bless_address"></el-input>
					</el-form-item>
				</div>
				<div v-if="scope.row.selectType == 1">
					<el-button @click="searchRadio(scope.row)">选择功德主</el-button>
					<el-form-item label="功德主名称" v-if="scope.row.bless_name">
						<el-input v-model="scope.row.bless_name" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="功德主电话" v-if="scope.row.phone">
						<el-input v-model="scope.row.phone" :disabled="true"></el-input>
					</el-form-item>
					<el-form-item label="功德主地址" v-if="scope.row.bless_address">
						<el-input v-model="scope.row.bless_address"></el-input>
					</el-form-item>
				</div>
			</div>
		 </dx-table>
		 <searchAll  ref="searchAll" @callBack="searchCallBack"/>
	</div>
</template>

<script type="text/javascript">
	import globalData from "./layouts/offline_orders.js";
	import searchAll from "xiaozhu/vue/components/admin/searchAll";
	export default {
		data() {
			return {
				formAction: "/admin/project/order-lists",
				data: this.formatData(this),
				siteName: this.getSiteName(),
				globalData: globalData,
				ruleForm:{}
			}
		},
		mounted() {
			this.ajax();
		},
		watch: {
			//"$route": "ajax"
		},
		methods: {
			searchCallBack(res){
				if(res.length){
					res.forEach((v,key)=>{
						this.$set(this.ruleForm,"bless_name",v.bless_name);
						this.$set(this.ruleForm,"bless_address",v.bless_address);
						this.$set(this.ruleForm,"user_id",v.user_id);
						this.$set(this.ruleForm,"phone",v.phone);
					});

				}else{
					this.getError("您还没有选择");
					return false;
				}
				console.log(this.ruleForm);
			},
			searchRadio(ruleForm){
				this.ruleForm = ruleForm;
				let row = {prop:'user_id',name:'bless_name',rowName:'bless_name',label:'选择功德主',type:"searchRadio",url:'/admin/project/order-lists?status=3&type=search',tableFields:[
				  {prop:'bless_name',label:'功德主姓名',width:"200"},
				  {prop:'phone',label:'功德主电话',width:"200"},
				  {prop:'bless_address',label:'功德主地址',width:"200"},
				  {prop:'user.nickname',label:'呢称',width:"200"},

			],searchFields:[
				 {prop:'content',label:'功德主姓名/功德主电话'},
			]}
				this.$refs.searchAll.ajax(row,'user_id');
			},
			editField(row,field){
				this.postAjax("/admin/song/editField", { id:row.id,field:field,value:row[field] }, msg => {
					if (msg.data.status == 3) {
						row[field] =0;
					}
					if (msg.data.status == 2) {
						this.ajax();
					}
				});
			},
			submitBeforeCallBack(ruleform){
				delete ruleform.api_token;
			},

			ajax() {
				this.getAjax(this, {}, msg => {});
			},
		},
		components: {
			"dx-table": resolve => require(["xiaozhu/vue/components/admin/dx_table.vue"], resolve),
			searchAll

		}
	}
</script>
