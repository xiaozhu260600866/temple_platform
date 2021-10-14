<template>
	<div>
		<dx-table :data="data" :globalData="globalData" @submitBeforeCallBack="submitBeforeCallBack" operateWidth="200px"> </dx-table>
	</div>
</template>
<script type="text/javascript">
	import globalData from "./layouts/share.js";

	export default {
		data() {
			return {
				formAction: "/admin/activity/share-lists",
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
