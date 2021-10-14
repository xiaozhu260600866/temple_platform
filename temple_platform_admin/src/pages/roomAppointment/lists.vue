<template>
	<div>
		<dx-table :data="data" :globalData="globalData" @submitBeforeCallBack="submitBeforeCallBack" operateWidth="280">
				<div slot="operate" slot-scope="scope">
					<el-button size="small" @click="$refs.house.ajax(scope.row.houses,scope.row.id)">房号管理</el-button>
				</div>
		 </dx-table>
			<my-house ref="house"></my-house>
	</div>
</template>
<script type="text/javascript">
	import globalData from "./layouts/room_appointment.js";

	export default {
		data() {
			return {
				formAction: "/admin/roomAppointment/lists",
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
				//delete ruleform.api_token;
			},

			ajax() {
				this.getAjax(this, {}, msg => {});
			},
		},
		components: {
			"dx-table": resolve => require(["xiaozhu/vue/components/admin/dx_table.vue"], resolve),
				"my-house": resolve => require(['./layouts/house.vue'], resolve)

		}
	}
</script>
