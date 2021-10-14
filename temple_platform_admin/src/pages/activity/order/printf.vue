<template>
	<div>
		<dx-table :data="data" :globalData="globalData" @submitBeforeCallBack="submitBeforeCallBack" operateWidth="100">
            <div slot="operate" slot-scope="scope">
                <el-button type="primary" size="small" @click="printf(scope.row)">打印</el-button>
            </div>
			<div slot="tableLeft" slot-scope="scope">
				 <el-button type="primary"  @click="printfAll(scope.row)" style="margin-left:10px;padding: 12px 40px;" :disabled="scope.row.length===0 " >批量打印</el-button>
			</div>
        </dx-table>
	</div>
</template>
<script type="text/javascript">
	import globalData from "./layouts/printf.js";

	export default {
		data() {
			return {
				formAction: "/admin/activity/order-lists",
				data: this.formatData(this),
				siteName: this.getSiteName(),
				globalData: globalData,
				ruleForm:{},
				firstRow:{},
				timer2:"",
			}
		},
		mounted() {
			if(this.timer2){
			}else{
				this.ajax();
				//this.timeAjax();
			}
		},
		watch: {
			//"$route": "ajax"
		},
		methods: {
			timeAjax(){
				this.timer2 = setInterval(()=>{
					this.postAjax(this.formAction,this.firstRow,msg=>{
						if(msg.data.status ==2){
							msg.data.detail.forEach(v=>{
								if(v.id && v.id!=undefined){
									setTimeout(()=>{
										window.open(this.siteName + '/printf.html?id='+v.id+'&type=199');
									},100);
								}
								
							})
							this.firstRow = msg.data.detail[0];
						}
					},"notloading")
				},1000 * 10);
			},
			printfAll(rowArr){
				rowArr.forEach(v=>{
					setTimeout(()=>{
						window.open(this.siteName + '/printf.html?id='+v.id+'&type=199');
					},100);
				})
				setTimeout(()=>{
					this.getAjax(this, {}, msg => {});
				},2500);
			},
            printf(row){
               window.open(this.siteName + '/printf.html?id='+row.id+'&type=199');
			   setTimeout(()=>{
				   this.ajax();
			   },2500);
            },
			submitBeforeCallBack(ruleform){
				delete ruleform.api_token;
			},
			ajax() {
				this.getAjax(this, {}, msg => {
					this.firstRow = msg.firstRow;
					
				});
			},
		},
		components: {
			"dx-table": resolve => require(["xiaozhu/vue/components/admin/dx_table.vue"], resolve),

		}
	}
</script>
