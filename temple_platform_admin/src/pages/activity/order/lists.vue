<template>
	<div>
		<dx-table :data="data" :globalData="globalData" @submitBeforeCallBack="submitBeforeCallBack" operateWidth="160px">
            <div slot="operate" slot-scope="scope">
                <el-button type="primary" size="small" @click="printf(scope.row)">打印</el-button>
            </div>
        </dx-table>
	</div>
</template>
<script type="text/javascript">
	import globalData from "./layouts/order.js";

	export default {
		data() {
			return {
				formAction: "/admin/activity/order-lists",
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
            printf(row){
               window.open(this.siteName + '/printf.html?id='+row.id+'&type=199');
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

		}
	}
</script>
