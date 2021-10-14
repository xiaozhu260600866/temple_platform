<template>
	<view v-if="data.show">
		<view class="Vlist-box" v-for="(v,key) in typeData">
			<dxLists :name="key+1+' '+v.label" arrow nameSize="17" nameColor="#fff" @click="goto('/pages/tablet/order/buy/type2/index?type='+v.value+'&tablet_id='+tablet_id,1)"
			></dxLists>
		 </view>
	</view>
</template>

<script>
	import dxLists from "doxinui/components/list-cell/list-cell";
	export default{
		components:{
			dxLists,
		},
		onLoad(options){
			this.tablet_id= options.tablet_id;
			this.ajax();
		},
		methods:{
			ajax() {
				this.getAjax(this).then(msg => {
						let keys = this.data.query.keys.split(',');
						for (var i = 0; i < keys.length; i++) {
							let v  = keys[i];
							this.data.typeArr.forEach(v2=>{
								 if(v2.value == v){
									 this.typeData.push(v2);
								 }
							});
						}
				});
			},
			next(){
				this.vaildForm(this, res => {
					if (res) {
						this.goto("/pages/tablet/order/buy/type2/index?type="+this.ruleform.type+'&tablet_id='+this.tablet_id,1);
					}
				})
			}
		},
		data(){
			return {
				typeData:[
					
				],
				ruleform:{},
				vaildate:{},
				tablet_id:0,
				mpType: 'page', //用来分清父和子组件
				data: this.formatData(this),
				getSiteName: this.getSiteName(),
				formAction: '/tablet/video',
				
			}
		}
	}
</script>

<style>
.Vlist-box{background-color: #A98853;margin: 20upx;border-radius: 12upx;}
.Vlist-box .dxi-list-cell.dxi-cell-arrow::before{border-color: #fff!important;}
</style>
