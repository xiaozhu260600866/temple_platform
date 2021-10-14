<template>
	<div>
		<dx-table :data="data" :globalData="globalData" @submitBeforeCallBack="submitBeforeCallBack" operateWidth="180px">
            <div slot="operate" slot-scope="scope">
                <el-button type="primary" size="small" v-if="scope.row.status == 0" @click="agree(scope.row)">确认预约</el-button>
            </div>
		 </dx-table>

	</div>
</template>
<script type="text/javascript">
	import globalData from "./layouts/appointment.js";

	export default {
		data() {
			return {
				formAction: "/admin/appointment/lists",
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
            agree(row){
                this.getConfirm("是否确认预约成功?",msg=>{
                   this.postAjax("/admin/appointment/changeStatus", { id:row.id}, msg => {
                        if (msg.data.status == 2) {
                            this.ajax();
                        }
                   }); 
                })
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
