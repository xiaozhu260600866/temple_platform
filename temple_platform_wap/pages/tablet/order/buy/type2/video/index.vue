<template class="video-bg1">
	<view v-if="data.show" class="video-bg">
		<view class="tablet_list">
			<view class="item" v-for="v in typeData">
				<view class="box"><view class="fbox" @click="v.url ? goto(v.url,1) :goto('/pages/tablet/order/buy/type2/video2/index?type='+v.value+'&tablet_id='+tablet_id+'&keys='+v.keys,1)">{{v.label}}</view></view>
			</view>
		</view>
		<!-- <view>
			<dxLists :name="key+1+' '+v.label" arrow nameSize="17" @click="goto('/pages/tablet/order/buy/type2/index?type='+v.value+'&tablet_id='+tablet_id,1)"
			 v-for="(v,key) in data.typeArr"></dxLists>
		 </view> -->
	</view>
</template>

<script>
	import dxButon from "doxinui/components/button/button"
	import dxLists from "doxinui/components/list-cell/list-cell";
	import dxtitle from "doxinui/components/title/title";
	export default{
		components:{
			dxButon,
			dxLists,
			dxtitle
		},
		onLoad(options){
			this.tablet_id= options.tablet_id;
			this.ajax();
		},
		methods:{
			ajax() {
				this.getAjax(this).then(msg => {
					this.typeData.push(
						{value:'1',label:'祖先',url:'/pages/tablet/order/buy/type2/index?type=1'+'&tablet_id='+this.tablet_id},
						{value:'2',label:'先人',url:'/pages/tablet/order/buy/type2/index?type=2'+'&tablet_id='+this.tablet_id},
						{value:'3',label:'婴灵',url:"",keys:"4,5"},
						{value:'4',label:'冤亲债主',url:"",keys:'7,8,9'},
						{value:'5',label:'十方众生',url:'/pages/tablet/order/buy/type2/index?type=12'+'&tablet_id='+this.tablet_id},
						{value:'6',label:'地基主',url:'/pages/tablet/order/buy/type2/index?type=3'+'&tablet_id='+this.tablet_id},
					
					);
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
				//goto('/pages/tablet/order/buy/type2/index?type='+v.value+'&tablet_id='+tablet_id,1)
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
/* body.pages-tablet-order-buy-type2-video-index{background: url('https://temple.doxinsoft.com/images/wap/cdjz-bg.jpg') no-repeat;background-size: cover;} */
uni-page-body{height: 100%;}
.video-bg{height: 100%;position: relative;width: 100%;}
.video-bg::before{content: "";display: block;position: absolute;top: 0;left: 0;bottom: 0;right: 0;background: url('https://temple.doxinsoft.com/images/wap/cdjz-bg3.jpg') no-repeat center;background-size: cover;opacity: 0.3;z-index: 0;}
.tablet_list{display: flex;flex-wrap: wrap;padding: 15px 15px 0;height: 100%;align-content: flex-end;justify-content: center;position: relative;z-index: 1;padding-bottom: 70px;}
.tablet_list .item{width: 50%;display: flex;align-items: center;justify-content: center;margin-bottom: 35px;}
.tablet_list .box{display: inline-block;width: 80%;height: 46px;padding: 2px 10px;background-color: rgba(169, 136, 83,1);border-radius: 6px;}
.tablet_list .fbox{font-size: 22px;width: 100%;line-height: 1.2;height: 100%;font-weight: bold;display: flex;justify-content: center;align-items: center;text-align: center;color: #fff;/* border: 1px #fff solid;background-color: rgba(169, 136, 83,0.8); */}
</style>
