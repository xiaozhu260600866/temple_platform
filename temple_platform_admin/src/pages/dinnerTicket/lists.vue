<template>
	<div>
		<dx-table :data="data" :globalData="globalData" @submitBeforeCallBack="submitBeforeCallBack" operateWidth="160px">
			<div slot="header">

			</div>
			<div slot="append_table_up" slot-scope="scope">
				<el-switch v-model="scope.row.putaway " on-text="" off-text="" :active-value="1" :inactive-value="0" @change="editField(scope.row,'putaway')"> </el-switch>
			</div>
			<div slot="append_table_sort" slot-scope="scope">
				<el-input v-model="scope.row.sort"  @change="editField(scope.row,'sort')"></el-input>
			</div>
			<div slot="append_form_address_require" slot-scope="scope">
				<el-radio v-model="scope.row.address_require" :label="0">否</el-radio>
				<el-radio v-model="scope.row.address_require" :label="1">是</el-radio>
			</div>
            <div slot="append_form_show_other_price" slot-scope="scope">
            	<el-radio v-model="scope.row.show_other_price" :label="0">否</el-radio>
            	<el-radio v-model="scope.row.show_other_price" :label="1">是</el-radio>
            </div>
		 </dx-table>

	</div>
</template>
<script type="text/javascript">
	import globalData from "./layouts/projects.js";

	export default {
		data() {
			return {
				formAction: "/admin/project/lists?online=1&type=2",
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
			editField(row,field){
				this.postAjax("/admin/project/editField", { id:row.id,field:field,value:row[field] }, msg => {
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
				ruleform.type = 2;
			},

			ajax() {
				this.getAjax(this, {}, msg => {});
			},
		},
		components: {
			"dx-table": resolve => require(["xiaozhu/vue/components/admin/dx_table.vue"], resolve),

		}
	}
</script>
